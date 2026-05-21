'use client'

import React, { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Zap, Download, Copy } from 'lucide-react'
import QRCode from 'qrcode.react'
import { Card, EmptyState } from '../ui/Card'
import { DownloadButton, CopyButton } from '../ui/Buttons'
import { useToast, useDownload } from '../../lib/hooks'
import { ToastContainer } from '../ui/Toast'

type QRType = 'text' | 'url' | 'email' | 'wifi'

interface QRState {
  type: QRType
  value: string
  size: number
  color: string
  bgColor: string
  errorCorrection: 'L' | 'M' | 'Q' | 'H'
}

const QRCodeGeneratorClient: React.FC = () => {
  const [state, setState] = useState<QRState>({
    type: 'text',
    value: '',
    size: 300,
    color: '#000000',
    bgColor: '#FFFFFF',
    errorCorrection: 'M',
  })

  const qrRef = useRef<HTMLDivElement>(null)
  const toast = useToast()
  const { download } = useDownload()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setState((prev) => ({
      ...prev,
      value: e.target.value,
    }))
  }

  const getPlaceholder = (): string => {
    switch (state.type) {
      case 'url':
        return 'https://example.com'
      case 'email':
        return 'user@example.com'
      case 'wifi':
        return 'Network Name (SSID)'
      case 'text':
      default:
        return 'Enter text here...'
    }
  }

  const handleDownload = () => {
    if (!state.value.trim()) {
      toast.warning('Please enter some content first')
      return
    }

    if (qrRef.current) {
      const canvas = qrRef.current.querySelector('canvas') as HTMLCanvasElement
      if (canvas) {
        const url = canvas.toDataURL('image/png')
        const link = document.createElement('a')
        link.href = url
        link.download = `qr-code-${Date.now()}.png`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        toast.success('QR code downloaded!')
      }
    }
  }

  const handleCopyValue = async () => {
    try {
      await navigator.clipboard.writeText(state.value)
      toast.success('Copied to clipboard!')
    } catch {
      toast.error('Failed to copy')
    }
  }

  const isValidInput = (): boolean => {
    if (!state.value.trim()) return false

    if (state.type === 'url') {
      try {
        new URL(state.value)
        return true
      } catch {
        return false
      }
    }

    if (state.type === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      return emailRegex.test(state.value)
    }

    return true
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
          {/* Preview */}
          <div className="lg:col-span-2">
            <Card>
              <div className="p-8 flex flex-col items-center justify-center min-h-[500px]">
                {isValidInput() ? (
                  <motion.div
                    ref={qrRef}
                    className="bg-white dark:bg-slate-950 p-4 rounded-lg shadow-lg dark:shadow-none"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  >
                    <QRCode
                      value={state.value}
                      size={state.size}
                      bgColor={state.bgColor}
                      fgColor={state.color}
                      level={state.errorCorrection}
                      includeMargin={true}
                    />
                  </motion.div>
                ) : (
                  <EmptyState
                    icon={<Zap className="w-16 h-16 text-gray-300" />}
                    title="Enter content to generate QR code"
                    description={`Paste a ${state.type} above to see the preview`}
                  />
                )}
              </div>
            </Card>

            {/* Input Area */}
            <Card className="mt-6">
              <div className="p-6">
                {state.type === 'wifi' ? (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-slate-200 mb-2">
                        Network Name (SSID)
                      </label>
                      <input
                        type="text"
                        placeholder="My WiFi Network"
                        onChange={(e) => setState((prev) => ({ ...prev, value: e.target.value }))}
                        className="w-full px-4 py-2 border border-gray-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-950 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-slate-200 mb-2">
                        Password
                      </label>
                      <input
                        type="password"
                        placeholder="WiFi Password"
                        onChange={(e) =>
                          setState((prev) => ({
                            ...prev,
                            value: `WIFI:T:WPA;S:${state.value.split(':')[1] || ''};P:${e.target.value};;`,
                          }))
                        }
                        className="w-full px-4 py-2 border border-gray-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-950 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                ) : (
                  <textarea
                    value={state.value}
                    onChange={handleInputChange}
                    placeholder={getPlaceholder()}
                    className="w-full h-32 p-4 border border-gray-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-950 text-gray-900 dark:text-white resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                )}
              </div>
            </Card>
          </div>

          {/* Settings */}
          <Card>
            <div className="p-6 space-y-6 max-h-[calc(100vh-200px)] overflow-y-auto">
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Settings</h3>
              </div>

              {/* Type Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-slate-200 mb-2">Type</label>
                <select
                  value={state.type}
                  onChange={(e) => setState((prev) => ({ ...prev, type: e.target.value as QRType }))}
                  className="w-full px-3 py-2 border border-gray-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-950 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="text">Text</option>
                  <option value="url">URL</option>
                  <option value="email">Email</option>
                  <option value="wifi">WiFi</option>
                </select>
              </div>

              {/* Size */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-slate-200 mb-2">
                  Size: {state.size}px
                </label>
                <input
                  type="range"
                  min="150"
                  max="500"
                  value={state.size}
                  onChange={(e) => setState((prev) => ({ ...prev, size: Number(e.target.value) }))}
                  className="w-full"
                />
              </div>

              {/* Colors */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-slate-200 mb-2">
                  QR Code Color
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={state.color}
                    onChange={(e) => setState((prev) => ({ ...prev, color: e.target.value }))}
                    className="w-10 h-10 rounded cursor-pointer"
                  />
                  <span className="text-sm text-gray-600">{state.color}</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-slate-200 mb-2">
                  Background Color
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={state.bgColor}
                    onChange={(e) => setState((prev) => ({ ...prev, bgColor: e.target.value }))}
                    className="w-10 h-10 rounded cursor-pointer"
                  />
                  <span className="text-sm text-gray-600">{state.bgColor}</span>
                </div>
              </div>

              {/* Error Correction */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-slate-200 mb-2">
                  Error Correction
                </label>
                <select
                  value={state.errorCorrection}
                  onChange={(e) =>
                    setState((prev) => ({
                      ...prev,
                      errorCorrection: e.target.value as 'L' | 'M' | 'Q' | 'H',
                    }))
                  }
                  className="w-full px-3 py-2 border border-gray-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-950 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="L">Low (7%)</option>
                  <option value="M">Medium (15%)</option>
                  <option value="Q">Quartile (25%)</option>
                  <option value="H">High (30%)</option>
                </select>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-4 border-t border-gray-200">
                <motion.button
                  onClick={handleDownload}
                  disabled={!isValidInput()}
                  className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-2 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Download className="w-4 h-4" />
                  Download PNG
                </motion.button>
                <CopyButton
                  text={state.value}
                  onCopy={() => toast.success('Value copied!')}
                  label="Copy Content"
                />
              </div>

              {/* Info */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 dark:bg-blue-950/60 dark:border-blue-500/40">
                <p className="text-xs text-blue-900 dark:text-blue-200">
                  💡 Generated QR codes work with any scanner app on phones and tablets
                </p>
              </div>
            </div>
          </Card>
      </motion.div>
    </div>
  )
}
export default QRCodeGeneratorClient;
