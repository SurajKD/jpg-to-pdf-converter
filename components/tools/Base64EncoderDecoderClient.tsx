'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Lock } from 'lucide-react'
import { Card, ErrorState, SuccessState } from '../ui/Card'
import { CopyButton } from '../ui/Buttons'
import { useToast } from '../../lib/hooks'
import { encodeBase64, decodeBase64, encodeFileToBase64, isValidBase64 } from '../../lib/encoding'
import { UploadZone, UploadedFile } from '../ui/UploadZone'
import { ToastContainer } from '../ui/Toast'

type Mode = 'encode' | 'decode'

interface Base64State {
  mode: Mode
  input: string
  output: string | null
  error: string | null
  uploadedFile: UploadedFile | null
}

const Base64EncoderDecoderClient: React.FC = () => {
  const [state, setState] = useState<Base64State>({
    mode: 'encode',
    input: '',
    output: null,
    error: null,
    uploadedFile: null,
  })

  const toast = useToast()

  const handleInputChange = (value: string) => {
    setState((prev) => ({
      ...prev,
      input: value,
      output: null,
      error: null,
    }))
  }

  const handleProcess = () => {
    setState((prev) => ({ ...prev, error: null, output: null }))

    if (!state.input.trim()) {
      setState((prev) => ({ ...prev, error: 'Please enter some content' }))
      return
    }

    try {
      let result: string
      if (state.mode === 'encode') {
        result = encodeBase64(state.input)
      } else {
        if (!isValidBase64(state.input)) {
          throw new Error('Invalid Base64 string')
        }
        result = decodeBase64(state.input)
      }

      setState((prev) => ({ ...prev, output: result }))
      toast.success(`Successfully ${state.mode}d!`)
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : `Failed to ${state.mode}`
      setState((prev) => ({ ...prev, error: errorMsg }))
      toast.error(errorMsg)
    }
  }

  const handleFileUpload = async (files: UploadedFile[]) => {
    if (files.length === 0) return

    const file = files[0]
    setState((prev) => ({ ...prev, uploadedFile: file, error: null, output: null }))

    try {
      const base64 = await encodeFileToBase64(file.file)
      setState((prev) => ({ ...prev, output: base64 }))
      toast.success('File encoded successfully!')
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Failed to encode file'
      setState((prev) => ({ ...prev, error: errorMsg }))
      toast.error(errorMsg)
    }
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
            {/* Mode Tabs */}
            <Card>
              <div className="flex">
                {(['encode', 'decode'] as const).map((mode) => (
                  <button
                    key={mode}
                    onClick={() =>
                      setState((prev) => ({
                        ...prev,
                        mode,
                        input: '',
                        output: null,
                        error: null,
                      }))
                    }
                    className={`flex-1 px-4 py-4 font-semibold text-sm uppercase tracking-wide transition-colors border-b-2 ${
                      state.mode === mode
                        ? 'border-blue-500 text-blue-600 dark:text-blue-300'
                        : 'border-transparent text-gray-600 dark:text-slate-300 hover:text-gray-900 dark:hover:text-white'
                    }`}
                  >
                    {mode === 'encode' ? 'Encode to Base64' : 'Decode from Base64'}
                  </button>
                ))}
              </div>
            </Card>

            {/* Input Options */}
            <div className="grid grid-cols-2 gap-4">
              <Card
                hover
                onClick={() => {
                  const el = document.getElementById('text-input') as HTMLTextAreaElement
                  el?.focus()
                }}
              >
                <div className="p-4 text-center">
                  <h3 className="font-semibold text-gray-900 dark:text-white">Text Input</h3>
                  <p className="text-xs text-gray-600 dark:text-slate-300 mt-1">Paste or type text</p>
                </div>
              </Card>

              {state.mode === 'encode' && (
                <Card
                  hover
                  onClick={() => {
                    const el = document.getElementById('file-upload')
                    el?.click()
                  }}
                >
                  <div className="p-4 text-center">
                    <h3 className="font-semibold text-gray-900 dark:text-white">File Input</h3>
                    <p className="text-xs text-gray-600 mt-1">Upload a file</p>
                  </div>
                </Card>
              )}
            </div>

            {/* Input Area */}
            {!state.uploadedFile ? (
              <Card>
                <div className="p-6">
                  <label className="block text-sm font-medium text-gray-700 dark:text-slate-200 mb-2">
                    {state.mode === 'encode' ? 'Text to Encode' : 'Base64 to Decode'}
                  </label>
                  <textarea
                    id="text-input"
                    value={state.input}
                    onChange={(e) => handleInputChange(e.target.value)}
                    placeholder={
                      state.mode === 'encode'
                        ? 'Enter text here...'
                        : 'Paste Base64 string here...'
                    }
                    className="w-full h-40 p-4 border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-gray-900 dark:text-white rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
                  />
                  <motion.button
                    onClick={handleProcess}
                    disabled={!state.input.trim()}
                    className="mt-4 w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-3 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {state.mode === 'encode' ? 'Encode' : 'Decode'}
                  </motion.button>
                </div>
              </Card>
            ) : (
              <Card>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-gray-900 dark:text-white">{state.uploadedFile.file.name}</h3>
                    <button
                      onClick={() => setState((prev) => ({ ...prev, uploadedFile: null }))}
                      className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-300"
                    >
                      Change
                    </button>
                  </div>
                  <p className="text-sm text-gray-600">
                    {(state.uploadedFile.file.size / 1024).toFixed(2)} KB
                  </p>
                  <motion.button
                    onClick={handleProcess}
                    className="mt-4 w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-3 rounded-lg transition-all"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Encode File
                  </motion.button>
                </div>
              </Card>
            )}

            {/* File Upload (hidden) */}
            <input
              id="file-upload"
              type="file"
              onChange={(e) => {
                const file = e.target.files?.[0]
                if (file) {
                  handleFileUpload([{
                    id: Math.random().toString(36).slice(2, 9),
                    file,
                    preview: undefined,
                  }])
                }
              }}
              className="hidden"
            />

            {/* Error State */}
            {state.error && (
              <ErrorState
                message={state.error}
                onDismiss={() => setState((prev) => ({ ...prev, error: null }))}
              />
            )}

            {/* Success and Output */}
            {state.output && (
              <>
                <SuccessState
                  title={state.mode === 'encode' ? 'Encoded Successfully' : 'Decoded Successfully'}
                  message={`Output ready to copy or download`}
                />

                <Card>
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="font-semibold text-gray-900 dark:text-white">Output</h3>
                      <span className="text-xs text-gray-600">
                        {(state.output.length / 1024).toFixed(2)} KB
                      </span>
                    </div>
                    <div className="bg-gray-100 dark:bg-slate-950 rounded-lg p-4 mb-4">
                      <pre className="font-mono text-xs overflow-auto max-h-48 break-all whitespace-pre-wrap text-gray-900 dark:text-slate-100">
                        {state.output}
                      </pre>
                    </div>
                    <CopyButton text={state.output} label="Copy Output" />
                  </div>
                </Card>
              </>
            )}
          </div>

          {/* Side Panel */}
          <Card>
            <div className="p-6 space-y-6">
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-4">About</h3>
              </div>

              <div className="space-y-4 text-sm text-gray-600">
                <p>Base64 is a standard encoding scheme that converts binary data into text format.</p>

                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white text-xs uppercase tracking-wide mb-1">
                    Use Cases
                  </h4>
                  <ul className="space-y-1 text-xs">
                    <li>✓ Embed images in HTML/CSS</li>
                    <li>✓ API data encoding</li>
                    <li>✓ Email attachments</li>
                    <li>✓ Data URLs</li>
                  </ul>
                </div>
              </div>

              {/* Info Box */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 dark:bg-blue-950/60 dark:border-blue-500/40">
                <p className="text-xs text-blue-900 dark:text-blue-200">
                  💡 All encoding/decoding happens in your browser - completely private
                </p>
              </div>
            </div>
          </Card>
      </motion.div>
    </div>
  )
}
export default Base64EncoderDecoderClient;