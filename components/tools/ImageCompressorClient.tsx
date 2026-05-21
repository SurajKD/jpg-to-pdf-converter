'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Loader, Image as ImageIcon } from 'lucide-react'
import { UploadZone, UploadedFile } from '../ui/UploadZone'
import { Card, EmptyState, ErrorState, SuccessState } from '../ui/Card'
import { ProgressBar, LoadingSpinner } from '../ui/Loading'
import { DownloadButton, formatFileSize } from '../ui/Buttons'
import { useProgress, useDownload, useToast } from '../../lib/hooks'
import { compressImage, getImageDimensions, calculateCompressionStats } from '../../lib/compression'
import { ToastContainer } from '../ui/Toast'

interface CompressedFile {
  original: UploadedFile
  compressed: Blob
  originalSize: number
  compressedSize: number
  ratio: number
  savings: number
  savingsPercent: number
  dimensions: { width: number; height: number } | null
}

interface ImageCompressorState {
  uploadedFiles: UploadedFile[]
  compressedFiles: CompressedFile[]
  quality: number
  targetSize: number | null
}

 const ImageCompressorClient: React.FC = () => {
  const [state, setState] = useState<ImageCompressorState>({
    uploadedFiles: [],
    compressedFiles: [],
    quality: 0.8,
    targetSize: null,
  })

  const { isLoading, progress, error, start, update, complete, fail, reset } = useProgress()
  const { download } = useDownload()
  const toast = useToast()

  const handleFilesAccepted = React.useCallback((files: UploadedFile[]) => {
    setState((prev) => ({
      ...prev,
      uploadedFiles: [...prev.uploadedFiles, ...files],
      compressedFiles: [],
    }))
  }, [])

  const handleFileRemoved = React.useCallback((id: string) => {
    setState((prev) => ({
      ...prev,
      uploadedFiles: prev.uploadedFiles.filter((f) => f.id !== id),
      compressedFiles: prev.compressedFiles.filter((c) => c.original.id !== id),
    }))
  }, [])

  const handleCompress = async () => {
    if (state.uploadedFiles.length === 0) {
      toast.warning('Please upload at least one image')
      return
    }

    start()
    const newCompressed: CompressedFile[] = []

    try {
      for (let i = 0; i < state.uploadedFiles.length; i++) {
        const file = state.uploadedFiles[i]
        update(((i + 1) / state.uploadedFiles.length) * 50) // 50% for compression

        try {
          const compressed = await compressImage(file.file, {
            quality: state.quality,
            targetSizeKB: state.targetSize || 0,
          })

          const dimensions = await getImageDimensions(file.file)
          const stats = calculateCompressionStats(file.file.size, compressed.size)

          newCompressed.push({
            original: file,
            compressed,
            originalSize: file.file.size,
            compressedSize: compressed.size,
            ...stats,
            dimensions,
          })

          update(50 + ((i + 1) / state.uploadedFiles.length) * 50)
        } catch (err) {
          console.error(`Failed to compress ${file.file.name}:`, err)
          toast.error(`Failed to compress ${file.file.name}`)
        }
      }

      if (newCompressed.length > 0) {
        setState((prev) => ({
          ...prev,
          compressedFiles: newCompressed,
        }))
        complete()
        toast.success(`Successfully compressed ${newCompressed.length} image(s)`)
      } else {
        fail('No images were compressed')
      }
    } catch (err) {
      fail(err instanceof Error ? err.message : 'Compression failed')
      toast.error('Compression failed')
    }
  }

  const handleDownload = (file: CompressedFile) => {
    const ext = file.compressed.type === 'image/png'
      ? 'png'
      : file.compressed.type === 'image/webp'
      ? 'webp'
      : 'jpg'
    const baseName = file.original.file.name.replace(/\.[^/.]+$/, '')
    const newName = `${baseName}-compressed.${ext}`
    download(file.compressed, newName)
    toast.success(`Downloaded ${newName}`)
  }

  const handleQualityChange = (value: number) => {
    setState((prev) => ({
      ...prev,
      quality: value / 100,
    }))
  }

  return (
    <div className="space-y-6">
      <ToastContainer toasts={toast.toasts} onClose={toast.remove} />

      <motion.div
        className="grid gap-8 lg:grid-cols-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
          {/* Main Panel */}
          <div className="lg:col-span-2 space-y-6">
            {/* Upload Zone */}
            <Card>
              <div className="p-6">
                <UploadZone
                  onFilesAccepted={handleFilesAccepted}
                  onFileRemoved={handleFileRemoved}
                  uploadedFiles={state.uploadedFiles}
                  accept={{ 'image/*': ['.jpg', '.jpeg', '.png', '.webp'] }}
                  maxSize={50 * 1024 * 1024}
                />
              </div>
            </Card>

            {/* Results */}
            {state.compressedFiles.length > 0 && (
              <motion.div
                className="space-y-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {state.compressedFiles.map((file, index) => (
                  <Card key={index}>
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 dark:text-white">{file.original.file.name}</h3>
                          <p className="text-sm text-gray-600 dark:text-slate-300 mt-1">
                            {file.dimensions && `${file.dimensions.width}×${file.dimensions.height}px`}
                          </p>
                        </div>
                        <DownloadButton
                          onClick={() => handleDownload(file)}
                          fileName="Download"
                          fileSize={file.compressedSize}
                          variant="primary"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                          <p className="text-xs text-gray-600 uppercase tracking-wide">Original</p>
                          <p className="text-lg font-semibold text-gray-900 dark:text-white">
                            {formatFileSize(file.originalSize)}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-600 uppercase tracking-wide">Compressed</p>
                          <p className="text-lg font-semibold text-emerald-600">
                            {formatFileSize(file.compressedSize)}
                          </p>
                        </div>
                      </div>

                      <div className="bg-gray-100 dark:bg-slate-950 rounded-lg p-3">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-200">Compression</span>
                          <span className="text-sm font-semibold text-emerald-600">
                            {file.savingsPercent.toFixed(1)}% smaller
                          </span>
                        </div>
                        <div className="w-full h-2 bg-gray-200 dark:bg-slate-700 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-emerald-500"
                            style={{ width: `${Math.min(file.savingsPercent, 100)}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </motion.div>
            )}

            {/* Processing State */}
            {isLoading && (
              <Card>
                <div className="p-8">
                  <div className="text-center">
                    <LoadingSpinner size="lg" color="blue" text="Compressing images..." />
                    <div className="mt-6">
                      <ProgressBar progress={progress} label="Progress" color="blue" />
                    </div>
                  </div>
                </div>
              </Card>
            )}

            {/* Error State */}
            {error && (
              <ErrorState
                message={error}
                onRetry={reset}
                onDismiss={reset}
              />
            )}
          </div>

          {/* Settings Panel */}
          <Card>
            <div className="p-6 space-y-6">
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Compression Settings</h3>
              </div>

              {/* Quality Slider */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-slate-200 mb-2">
                  Quality: {Math.round(state.quality * 100)}%
                </label>
                <input
                  type="range"
                  min="10"
                  max="100"
                  value={Math.round(state.quality * 100)}
                  onChange={(e) => handleQualityChange(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer"
                />
                <p className="text-xs text-gray-500 dark:text-slate-300 mt-2">
                  Higher quality means larger file sizes
                </p>
              </div>

              {/* Target Size */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-slate-200 mb-3">
                  Target Size (Optional)
                </label>
                <div className="space-y-2">
                  {[20, 50, 100].map((size) => (
                    <button
                      key={size}
                      onClick={() =>
                        setState((prev) => ({
                          ...prev,
                          targetSize: prev.targetSize === size ? null : size,
                        }))
                      }
                      className={`w-full px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                        state.targetSize === size
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-100 text-gray-900 hover:bg-gray-200 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700'
                      }`}
                    >
                      ≤ {size}KB
                    </button>
                  ))}
                </div>
              </div>

              {/* Compress Button */}
              <motion.button
                onClick={handleCompress}
                disabled={isLoading || state.uploadedFiles.length === 0}
                className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-3 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    <Loader className="w-4 h-4 animate-spin" />
                    Compressing...
                  </div>
                ) : (
                  'Compress Images'
                )}
              </motion.button>

              {/* Info */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 dark:bg-blue-950/60 dark:border-blue-500/40">
                <p className="text-xs text-blue-900 dark:text-blue-200">
                  💡 All processing happens on your device. Your files are never uploaded to our
                  servers.
                </p>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Empty State */}
        {state.uploadedFiles.length === 0 && state.compressedFiles.length === 0 && !isLoading && (
          <motion.div
            className="mt-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Card>
              <EmptyState
                icon={<ImageIcon className="w-16 h-16 text-gray-300" />}
                title="No images selected"
                description="Upload JPG, PNG, or WebP images to get started with compression"
              />
            </Card>
          </motion.div>
        )}
    </div>
  )
}
export default ImageCompressorClient;
