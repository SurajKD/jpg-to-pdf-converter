'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { FileImage } from 'lucide-react'
import { Card, EmptyState } from '../ui/Card'
import { UploadZone, UploadedFile } from '../ui/UploadZone'
import { useToast, useProgress } from '../../lib/hooks'
import { ToastContainer } from '../ui/Toast'

interface HEICConverterState {
  uploadedFiles: UploadedFile[]
  convertedFiles: any[]
  isConverting: boolean
}

/**
 * HEIC to JPG Converter
 * 
 * TODO:
 * 1. Install heic2any package: npm install heic2any
 * 2. Create lib/heic.ts with conversion logic
 * 3. Implement batch conversion
 * 4. Add progress tracking
 * 5. Add ZIP download for multiple files
 */
 const HEICConverterClient: React.FC = () => {
  const [state, setState] = useState<HEICConverterState>({
    uploadedFiles: [],
    convertedFiles: [],
    isConverting: false,
  })

  const toast = useToast()
  const { isLoading, progress, start, update, complete } = useProgress()

  const handleFilesAccepted = (files: UploadedFile[]) => {
    setState((prev) => ({
      ...prev,
      uploadedFiles: [...prev.uploadedFiles, ...files],
    }))
  }

  const handleConvert = async () => {
    if (state.uploadedFiles.length === 0) {
      toast.warning('Please upload at least one HEIC image')
      return
    }

    start()
    toast.info('HEIC conversion coming soon - feature in development')
    complete()
  }

  return (
    <div className="min-h-screen  py-12 px-4">
      <ToastContainer toasts={toast.toasts} onClose={toast.remove} />

      <div className="max-w-4xl mx-auto">
        {/* Hero Section */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex justify-center mb-4">
            <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-3 rounded-xl">
              <FileImage className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-3">HEIC to JPG Converter</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Convert HEIC/HEIF images to JPG format. Batch conversion with preview. 
            Fully client-side processing.
          </p>
        </motion.div>

        {/* Upload Area */}
        <Card>
          <div className="p-12">
            <UploadZone
              onFilesAccepted={handleFilesAccepted}
              uploadedFiles={state.uploadedFiles}
              accept={{ 'image/heic': ['.heic'], 'image/heif': ['.heif', '.heic'] }}
              maxSize={100 * 1024 * 1024}
            />
          </div>
        </Card>

        {/* Empty State */}
        {state.uploadedFiles.length === 0 && (
          <Card className="mt-8">
            <EmptyState
              icon={<FileImage className="w-16 h-16 text-gray-300" />}
              title="No images selected"
              description="Upload HEIC or HEIF images to convert to JPG"
            />
          </Card>
        )}

        {/* Convert Button */}
        {state.uploadedFiles.length > 0 && (
          <motion.button
            onClick={handleConvert}
            className="mt-8 w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold py-3 rounded-lg transition-all"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Convert to JPG
          </motion.button>
        )}

        {/* Note */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
          <p className="text-sm text-blue-900">
            💡 Feature in development - coming soon to AnyFileConverter
          </p>
        </div>
      </div>
    </div>
  )
}
export default HEICConverterClient;
