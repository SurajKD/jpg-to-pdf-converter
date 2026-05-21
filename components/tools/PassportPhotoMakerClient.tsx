'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Camera } from 'lucide-react'
import { Card, EmptyState } from '../ui/Card'
import { UploadZone, UploadedFile } from '../ui/UploadZone'
import { useToast } from '../../lib/hooks'
import { ToastContainer } from '../ui/Toast'

interface PassportPhotoMakerState {
  uploadedFile: UploadedFile | null
  selectedFormat: string
  backgroundColor: string
}

/**
 * Passport Photo Maker
 * 
 * TODO:
 * 1. Create lib/passportPhoto.ts with:
 *    - Face detection (ml5.js or face-api)
 *    - Auto cropping
 *    - Format templates (2x2, 1.5x1.5, 4x6, etc.)
 * 2. Implement background adjustment
 * 3. Add sheet layout generation
 * 4. Create printable PDF output
 */
const PassportPhotoMakerClient: React.FC = () => {
  const [state, setState] = useState<PassportPhotoMakerState>({
    uploadedFile: null,
    selectedFormat: '2x2',
    backgroundColor: '#FFFFFF',
  })

  const toast = useToast()

  const formats = [
    { id: '2x2', name: '2x2 inches', width: 2, height: 2 },
    { id: '1x1', name: '1x1 inches', width: 1, height: 1 },
    { id: '4x6', name: '4x6 inches', width: 4, height: 6 },
  ]

  const handleFileAccepted = (files: UploadedFile[]) => {
    if (files.length > 0) {
      setState((prev) => ({ ...prev, uploadedFile: files[0] }))
    }
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
            <div className="bg-gradient-to-br from-green-500 to-green-600 p-3 rounded-xl">
              <Camera className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-3">Passport Photo Maker</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Create professional passport photos with automatic face detection and cropping.
            Support for multiple formats and printable sheets.
          </p>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Upload */}
          <div className="lg:col-span-2">
            <Card>
              <div className="p-12">
                <UploadZone
                  onFilesAccepted={handleFileAccepted}
                  uploadedFiles={state.uploadedFile ? [state.uploadedFile] : []}
                  accept={{ 'image/*': ['.jpg', '.png', '.webp'] }}
                  maxSize={50 * 1024 * 1024}
                  maxFiles={1}
                  multiple={false}
                />
              </div>
            </Card>
          </div>

          {/* Settings */}
          <Card>
            <div className="p-6 space-y-4">
              <h3 className="font-semibold text-gray-900 dark:text-white">Settings</h3>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Photo Format
                </label>
                <select
                  value={state.selectedFormat}
                  onChange={(e) => setState((prev) => ({ ...prev, selectedFormat: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg"
                >
                  {formats.map((fmt) => (
                    <option key={fmt.id} value={fmt.id}>
                      {fmt.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Background Color
                </label>
                <div className="flex gap-2">
                  <input
                    type="color"
                    value={state.backgroundColor}
                    onChange={(e) => setState((prev) => ({ ...prev, backgroundColor: e.target.value }))}
                    className="w-10 h-10 rounded cursor-pointer"
                  />
                  <span className="text-sm text-gray-600 py-1">{state.backgroundColor}</span>
                </div>
              </div>

              <motion.button
                className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold py-3 rounded-lg"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Create Passport Photo
              </motion.button>

              <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                <p className="text-xs text-green-900">
                  💡 Coming soon - auto face detection & cropping
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default PassportPhotoMakerClient;
