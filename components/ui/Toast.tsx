'use client'

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, AlertCircle, CheckCircle, Info } from 'lucide-react'

type ToastType = 'success' | 'error' | 'info' | 'warning'

interface ToastProps {
  id: string
  message: string
  type: ToastType
  duration?: number
  onClose: (id: string) => void
}

const Toast: React.FC<ToastProps> = ({ id, message, type, duration = 3000, onClose }) => {
  React.useEffect(() => {
    const timer = setTimeout(() => onClose(id), duration)
    return () => clearTimeout(timer)
  }, [id, duration, onClose])

  const bgColors = {
    success:
      'bg-emerald-50 border-emerald-200 text-emerald-900 dark:bg-emerald-950/60 dark:border-emerald-500/40 dark:text-emerald-200',
    error:
      'bg-red-50 border-red-200 text-red-900 dark:bg-red-950/60 dark:border-red-500/40 dark:text-red-200',
    info:
      'bg-blue-50 border-blue-200 text-blue-900 dark:bg-blue-950/60 dark:border-blue-500/40 dark:text-blue-200',
    warning:
      'bg-amber-50 border-amber-200 text-amber-900 dark:bg-amber-950/60 dark:border-amber-500/40 dark:text-amber-200',
  }

  const icons = {
    success: <CheckCircle className="w-5 h-5 text-emerald-500 dark:text-emerald-300" />,
    error: <AlertCircle className="w-5 h-5 text-red-500 dark:text-red-300" />,
    info: <Info className="w-5 h-5 text-blue-500 dark:text-blue-300" />,
    warning: <AlertCircle className="w-5 h-5 text-amber-500 dark:text-amber-300" />,
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, x: 100 }}
      animate={{ opacity: 1, y: 0, x: 0 }}
      exit={{ opacity: 0, y: 20, x: 100 }}
      transition={{ duration: 0.3 }}
      className={`rounded-lg border px-4 py-3 flex items-start gap-3 max-w-sm ${bgColors[type]}`}
    >
      {icons[type]}
      <div className="flex-1">
        <p className="text-sm font-medium">{message}</p>
      </div>
      <button
        onClick={() => onClose(id)}
        className="text-gray-400 hover:text-gray-600 transition-colors dark:text-slate-400 dark:hover:text-slate-100"
      >
        <X className="w-4 h-4" />
      </button>
    </motion.div>
  )
}

interface ToastContainerProps {
  toasts: Array<{
    id: string
    message: string
    type: ToastType
    duration?: number
  }>
  onClose: (id: string) => void
}

export const ToastContainer: React.FC<ToastContainerProps> = ({ toasts, onClose }) => {
  return (
    <div className="fixed top-4 right-4 z-50 space-y-2 pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => (
          <div key={toast.id} className="pointer-events-auto">
            <Toast {...toast} onClose={onClose} />
          </div>
        ))}
      </AnimatePresence>
    </div>
  )
}

// Hook for using toasts
export const useToast = () => {
  const [toasts, setToasts] = React.useState<
    Array<{ id: string; message: string; type: ToastType; duration?: number }>
  >([])

  const show = (message: string, type: ToastType = 'info', duration?: number) => {
    const id = Math.random().toString(36).slice(2, 9)
    setToasts((prev) => [...prev, { id, message, type, duration }])
  }

  const remove = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }

  return {
    toasts,
    show,
    remove,
    success: (msg: string, duration?: number) => show(msg, 'success', duration),
    error: (msg: string, duration?: number) => show(msg, 'error', duration),
    info: (msg: string, duration?: number) => show(msg, 'info', duration),
    warning: (msg: string, duration?: number) => show(msg, 'warning', duration),
  }
}
