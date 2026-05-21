'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Copy, Key, AlertCircle, CheckCircle } from 'lucide-react'
import { Card, ErrorState, SuccessState } from '../ui/Card'
import { CopyButton } from '../ui/Buttons'
import { useToast } from '../../lib/hooks'
import { decodeJWT, prettyJSON } from '../../lib/encoding'
import { ToastContainer } from '../ui/Toast'

interface JWTDecodeResult {
  header: any
  payload: any
  signature: string
  isValid: boolean
  isExpired?: boolean
  expiresAt?: Date
  issuedAt?: Date
}

const JWTDecoderClient: React.FC = () => {
  const [token, setToken] = useState('')
  const [result, setResult] = useState<JWTDecodeResult | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<'header' | 'payload' | 'signature'>('payload')
  const toast = useToast()

  const handleDecode = () => {
    setError(null)
    setResult(null)

    if (!token.trim()) {
      setError('Please paste a JWT token')
      return
    }

    try {
      const decoded = decodeJWT(token.trim())
      setResult(decoded)

      if (!decoded.isValid) {
        toast.warning('Token is expired')
      } else {
        toast.success('Token decoded successfully')
      }
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Invalid JWT'
      setError(errorMsg)
      toast.error(errorMsg)
    }
  }

  const handleClear = () => {
    setToken('')
    setResult(null)
    setError(null)
  }

  const formatDate = (date?: Date): string => {
    if (!date) return 'N/A'
    return date.toLocaleString()
  }

  const getTabContent = (): any => {
    if (!result) return null
    switch (activeTab) {
      case 'header':
        return result.header
      case 'payload':
        return result.payload
      case 'signature':
        return result.signature
      default:
        return null
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
          {/* Input Panel */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <div className="p-6">
                <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-3">
                  Paste JWT Token
                </label>
                <textarea
                  value={token}
                  onChange={(e) => setToken(e.target.value)}
                  placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
                  className="w-full h-40 p-4 border border-gray-200 rounded-lg font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <div className="flex gap-2 mt-4">
                  <motion.button
                    onClick={handleDecode}
                    disabled={!token.trim()}
                    className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-3 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Decode Token
                  </motion.button>
                  <motion.button
                    onClick={handleClear}
                    className="px-4 py-3 bg-gray-200 hover:bg-gray-300 text-gray-900 font-semibold rounded-lg transition-colors dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-white"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Clear
                  </motion.button>
                </div>
              </div>
            </Card>

            {/* Error State */}
            {error && (
              <ErrorState
                message={error}
                onDismiss={() => setError(null)}
              />
            )}

            {/* Success State */}
            {result && result.isValid && !error && (
              <SuccessState
                title="Valid Token"
                message="Token signature and expiration verified"
                icon={<CheckCircle className="w-5 h-5 text-emerald-500" />}
              />
            )}

            {/* Expired Token */}
            {result && result.isExpired && !error && (
              <motion.div
                className="rounded-lg bg-amber-50 border border-amber-200 p-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="text-sm font-semibold text-amber-900">Token Expired</h3>
                    <p className="text-sm text-amber-800 mt-1">
                      Expired on {formatDate(result.expiresAt)}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Decoded Content */}
            {result && (
              <Card>
                <div className="border-b border-gray-200">
                  <div className="flex">
                    {['header', 'payload', 'signature'].map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab as any)}
                        className={`flex-1 px-4 py-4 font-medium text-sm uppercase tracking-wide transition-colors ${
                          activeTab === tab
                            ? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-300'
                            : 'text-gray-600 dark:text-slate-300 hover:text-gray-900 dark:hover:text-white'
                        }`}
                      >
                        {tab}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="p-6">
                  {activeTab === 'signature' ? (
                    <div className="space-y-3">
                      <div className="bg-gray-100 dark:bg-slate-950 rounded-lg p-4 font-mono text-xs text-slate-900 dark:text-slate-100 break-all">
                          {result.signature}
                        </div>
                      <CopyButton text={result.signature} label="Copy Signature" />
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <pre className="bg-gray-100 dark:bg-slate-950 rounded-lg p-4 overflow-auto max-h-96 font-mono text-xs text-slate-900 dark:text-slate-100">
                        {prettyJSON(getTabContent(), 2)}
                      </pre>
                      <CopyButton
                        text={prettyJSON(getTabContent(), 2)}
                        label={`Copy ${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}`}
                      />
                    </div>
                  )}
                </div>
              </Card>
            )}
          </div>

          {/* Info Panel */}
          <Card>
            <div className="p-6 space-y-6">
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Token Information</h3>
              </div>

              {result ? (
                <>
                  <div>
                    <p className="text-xs text-gray-600 uppercase tracking-wide font-semibold">
                      Status
                    </p>
                    <div className="mt-2 flex items-center gap-2">
                      <div
                        className={`w-3 h-3 rounded-full ${
                          result.isValid ? 'bg-emerald-500' : 'bg-red-500'
                        }`}
                      />
                      <span
                        className={`font-semibold ${
                          result.isValid ? 'text-emerald-600' : 'text-red-600'
                        }`}
                      >
                        {result.isExpired ? 'Expired' : result.isValid ? 'Valid' : 'Invalid'}
                      </span>
                    </div>
                  </div>

                  {result.issuedAt && (
                    <div>
                        <p className="text-xs text-gray-600 dark:text-slate-300 uppercase tracking-wide font-semibold">
                          Issued At
                        </p>
                        <p className="text-sm text-gray-900 dark:text-white mt-1">{formatDate(result.issuedAt)}</p>
                      </div>
                  )}

                  {result.expiresAt && (
                      <div>
                      <p className="text-xs text-gray-600 dark:text-slate-300 uppercase tracking-wide font-semibold">
                        Expires At
                      </p>
                      <p className="text-sm text-gray-900 dark:text-white mt-1">{formatDate(result.expiresAt)}</p>
                    </div>
                  )}

                  {result.payload.aud && (
                      <div>
                      <p className="text-xs text-gray-600 dark:text-slate-300 uppercase tracking-wide font-semibold">
                        Audience
                      </p>
                      <p className="text-sm text-gray-900 dark:text-white mt-1 break-all">
                        {result.payload.aud}
                      </p>
                    </div>
                  )}

                  {result.payload.iss && (
                      <div>
                      <p className="text-xs text-gray-600 dark:text-slate-300 uppercase tracking-wide font-semibold">
                        Issuer
                      </p>
                      <p className="text-sm text-gray-900 dark:text-white mt-1 break-all">
                        {result.payload.iss}
                      </p>
                    </div>
                  )}
                </>
              ) : (
                <div className="space-y-3 text-sm text-gray-600 dark:text-slate-300">
                  <p>🔐 Paste a JWT token above to decode it</p>
                  <p>All decoding happens in your browser - no server communication</p>
                </div>
              )}

              {/* Info Box */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 dark:bg-blue-950/60 dark:border-blue-500/40">
                <p className="text-xs text-blue-900 dark:text-blue-200">
                  💡 JWT tokens contain three parts separated by dots: header.payload.signature
                </p>
              </div>
            </div>
          </Card>
      </motion.div>
    </div>
  )
}
export default JWTDecoderClient;
