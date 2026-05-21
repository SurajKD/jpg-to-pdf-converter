'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Image as ImageIcon } from 'lucide-react'
import { Card, EmptyState } from '../ui/Card'
import { UploadZone, UploadedFile } from '../ui/UploadZone'
import { useToast } from '../../lib/hooks'
import { ToastContainer } from '../ui/Toast'

interface ScreenshotToPDFState {
  uploadedFiles: UploadedFile[]
  pageSize: string
  isProcessing: boolean
}

/**
 * Screenshot to PDF
 * 
 * TODO:
 * 1. Create lib/screenshotPdf.ts with:
 *    - Multi-image PDF creation (using pdf-lib)
 *    - Page size selection
 *    - Image ordering/reordering
 * 2. Implement drag-to-reorder
 * 3. Add page size presets (A4, Letter, custom)
 * 4. Create preview
 * 5. Add merge/download
 */
const ScreenshotToPDFClient: React.FC = () => {
  const [state, setState] = useState<ScreenshotToPDFState>({
    uploadedFiles: [],
    pageSize: 'A4',
    isProcessing: false,
  })

  const toast = useToast()

  const handleFilesAccepted = (files: UploadedFile[]) => {
    setState((prev) => ({
      ...prev,
      uploadedFiles: [...prev.uploadedFiles, ...files],
    }))
  }

  const handleFileRemoved = (id: string) => {
    setState((prev) => ({
      ...prev,
      uploadedFiles: prev.uploadedFiles.filter((f) => f.id !== id),
    }))
  }

  const handleCreatePDF = async () => {
    if (state.uploadedFiles.length === 0) {
      toast.warning('Please upload at least one screenshot')
      return
    }

    toast.info('Screenshot to PDF feature coming soon')
  }

  return (
    <div className="min-h-screen  py-12 px-4">
      <ToastContainer toasts={toast.toasts} onClose={toast.remove} />

      <div className="max-w-4xl mx-auto">
        {/* Hero */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex justify-center mb-4">
            <div className="bg-gradient-to-br from-cyan-500 to-cyan-600 p-3 rounded-xl">
              <ImageIcon className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-3">Screenshot to PDF</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Merge multiple screenshots into a single PDF. Reorder pages, choose page size,
            and download. All processing on your device.
          </p>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Upload */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <div className="p-12">
                <UploadZone
                  onFilesAccepted={handleFilesAccepted}
                  onFileRemoved={handleFileRemoved}
                  uploadedFiles={state.uploadedFiles}
                  accept={{ 'image/*': ['.jpg', '.png', '.webp'] }}
                  maxSize={50 * 1024 * 1024}
                />
              </div>
            </Card>

            {/* Page Preview */}
            {state.uploadedFiles.length > 0 && (
              <Card>
                <div className="p-6">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Pages ({state.uploadedFiles.length})</h3>
                  <div className="space-y-2">
                    {state.uploadedFiles.map((file, idx) => (
                      <div
                        key={file.id}
                        className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200"
                      >
                        <div className="text-sm font-medium text-gray-600 w-6">
                          {idx + 1}
                        </div>
                        {file.preview && (
                          <img
                            src={file.preview}
                            alt="preview"
                            className="w-16 h-16 rounded object-cover"
                          />
                        )}
                        <span className="text-sm text-gray-700">{file.file.name}</span>
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-gray-500 mt-3">
                    💡 Drag to reorder (coming soon)
                  </p>
                </div>
              </Card>
            )}
          </div>

          {/* Settings */}
          <Card>
            <div className="p-6 space-y-4">
              <h3 className="font-semibold text-gray-900 dark:text-white">Settings</h3>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Page Size
                </label>
                <select
                  value={state.pageSize}
                  onChange={(e) => setState((prev) => ({ ...prev, pageSize: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg"
                >
                  <option value="A4">A4 (210x297mm)</option>
                  <option value="Letter">Letter (8.5x11in)</option>
                  <option value="A5">A5 (148x210mm)</option>
                  <option value="A3">A3 (297x420mm)</option>
                </select>
              </div>

              <motion.button
                onClick={handleCreatePDF}
                disabled={state.uploadedFiles.length === 0}
                className="w-full bg-gradient-to-r from-cyan-500 to-cyan-600 text-white font-semibold py-3 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Create PDF
              </motion.button>

              <div className="bg-cyan-50 border border-cyan-200 rounded-lg p-3">
                <p className="text-xs text-cyan-900">
                  💡 Coming soon - multi-page PDF generation
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default ScreenshotToPDFClient;