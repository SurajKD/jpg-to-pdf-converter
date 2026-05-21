'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Download, Copy, Check } from 'lucide-react'

interface DownloadButtonProps {
  onClick: () => void
  fileName: string
  fileSize?: number
  isLoading?: boolean
  icon?: React.ReactNode
  variant?: 'primary' | 'secondary'
}

export const DownloadButton: React.FC<DownloadButtonProps> = ({
  onClick,
  fileName,
  fileSize,
  isLoading = false,
  icon,
  variant = 'primary',
}) => {
  const baseClasses =
    'inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all'
  const variantClasses = {
    primary: 'bg-blue-500 hover:bg-blue-600 text-white shadow-lg hover:shadow-xl',
    secondary: 'bg-slate-700 hover:bg-slate-600 text-white dark:bg-slate-700 dark:hover:bg-slate-600',
  }

  return (
    <motion.button
      onClick={onClick}
      disabled={isLoading}
      className={`${baseClasses} ${variantClasses[variant]} disabled:opacity-50 disabled:cursor-not-allowed`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {isLoading ? (
        <div className="animate-spin w-4 h-4 border-2 border-current border-t-transparent rounded-full" />
      ) : (
        icon || <Download className="w-4 h-4" />
      )}
      <span>{fileName}</span>
      {fileSize && <span className="text-xs opacity-75">({formatFileSize(fileSize)})</span>}
    </motion.button>
  )
}

interface CopyButtonProps {
  text: string
  onCopy?: () => void
  label?: string
  copiedText?: string
}

export const CopyButton: React.FC<CopyButtonProps> = ({
  text,
  onCopy,
  label = 'Copy',
  copiedText = 'Copied!',
}) => {
  const [copied, setCopied] = React.useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      onCopy?.()
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  return (
    <motion.button
      onClick={handleCopy}
      className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-sm font-medium transition-colors"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {copied ? (
        <>
          <Check className="w-4 h-4 text-emerald-500" />
          {copiedText}
        </>
      ) : (
        <>
          <Copy className="w-4 h-4" />
          {label}
        </>
      )}
    </motion.button>
  )
}

function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i]
}

export { formatFileSize }
