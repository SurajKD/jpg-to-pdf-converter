import { useState, useCallback, useRef } from 'react'
import { UploadedFile } from '../components/ui/UploadZone'

/**
 * Hook for managing file uploads with validation
 */
export const useFileUpload = (options?: {
  maxSize?: number
  maxFiles?: number
  onError?: (error: string) => void
}) => {
  const [files, setFiles] = useState<UploadedFile[]>([])
  const [error, setError] = useState<string | null>(null)
  const fileCountRef = useRef(0)

  const addFiles = useCallback(
    (newFiles: UploadedFile[]) => {
      setError(null)

      // Check total file count
      if (options?.maxFiles) {
        if (fileCountRef.current + newFiles.length > options.maxFiles) {
          const msg = `Maximum ${options.maxFiles} files allowed`
          setError(msg)
          options.onError?.(msg)
          return
        }
      }

      // Validate file sizes
      const validFiles = newFiles.filter((f) => {
        if (options?.maxSize && f.file.size > options.maxSize) {
          const msg = `File ${f.file.name} exceeds maximum size`
          setError(msg)
          options.onError?.(msg)
          return false
        }
        return true
      })

      setFiles((prev) => [...prev, ...validFiles])
      fileCountRef.current += validFiles.length
    },
    [options]
  )

  const removeFile = useCallback((id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id))
    fileCountRef.current = Math.max(0, fileCountRef.current - 1)
  }, [])

  const clear = useCallback(() => {
    setFiles([])
    fileCountRef.current = 0
    setError(null)
  }, [])

  return { files, error, addFiles, removeFile, clear }
}

/**
 * Hook for managing loading/progress state
 */
export const useProgress = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState<string | null>(null)

  const start = useCallback((initialProgress = 0) => {
    setIsLoading(true)
    setProgress(initialProgress)
    setError(null)
  }, [])

  const update = useCallback((newProgress: number) => {
    setProgress(Math.min(Math.max(newProgress, 0), 100))
  }, [])

  const complete = useCallback(() => {
    setProgress(100)
    setIsLoading(false)
  }, [])

  const fail = useCallback((errorMsg: string) => {
    setError(errorMsg)
    setIsLoading(false)
  }, [])

  const reset = useCallback(() => {
    setIsLoading(false)
    setProgress(0)
    setError(null)
  }, [])

  return { isLoading, progress, error, start, update, complete, fail, reset }
}

/**
 * Hook for download management
 */
export const useDownload = () => {
  const download = useCallback((blob: Blob, fileName: string) => {
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = fileName
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }, [])

  const downloadMultiple = useCallback(async (files: Array<{ blob: Blob; name: string }>) => {
    // For multiple files, create a zip (requires JSZip)
    // For now, download sequentially
    for (const file of files) {
      download(file.blob, file.name)
      // Add small delay between downloads
      await new Promise((resolve) => setTimeout(resolve, 500))
    }
  }, [download])

  return { download, downloadMultiple }
}

/**
 * Hook for clipboard operations
 */
export const useClipboard = (timeout = 2000) => {
  const [copied, setCopied] = useState(false)

  const copy = useCallback(
    async (text: string) => {
      try {
        await navigator.clipboard.writeText(text)
        setCopied(true)
        setTimeout(() => setCopied(false), timeout)
        return true
      } catch (err) {
        console.error('Failed to copy:', err)
        return false
      }
    },
    [timeout]
  )

  return { copied, copy }
}

/**
 * Hook for local storage with SSR safety
 */
export const useLocalStorage = <T,>(key: string, initialValue: T) => {
  const [storedValue, setStoredValue] = useState<T>(initialValue)

  // Initialize from localStorage on mount
  const [isInitialized, setIsInitialized] = useState(false)

  if (!isInitialized && typeof window !== 'undefined') {
    try {
      const item = window.localStorage.getItem(key)
      if (item) {
        setStoredValue(JSON.parse(item) as T)
      }
    } catch (error) {
      console.error(`Error reading from localStorage:`, error)
    }
    setIsInitialized(true)
  }

  const setValue = useCallback(
    (value: T | ((val: T) => T)) => {
      try {
        const valueToStore = value instanceof Function ? value(storedValue) : value
        setStoredValue(valueToStore)
        if (typeof window !== 'undefined') {
          window.localStorage.setItem(key, JSON.stringify(valueToStore))
        }
      } catch (error) {
        console.error(`Error writing to localStorage:`, error)
      }
    },
    [key, storedValue]
  )

  return [storedValue, setValue] as const
}

type ToastType = 'success' | 'error' | 'info' | 'warning'

interface Toast {
  id: string
  message: string
  type: ToastType
}

export const useToast = (duration = 3000) => {
  const [toasts, setToasts] = useState<Toast[]>([])

  const remove = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }, [])

  const showToast = useCallback(
    (message: string, type: ToastType = 'info') => {
      const id = crypto.randomUUID()

      const newToast: Toast = {
        id,
        message,
        type,
      }

      setToasts((prev) => [...prev, newToast])

      setTimeout(() => {
        remove(id)
      }, duration)
    },
    [duration, remove]
  )

  return {
    toasts,
    remove,
    showToast,
    success: (message: string) => showToast(message, 'success'),
    error: (message: string) => showToast(message, 'error'),
    info: (message: string) => showToast(message, 'info'),
    warning: (message: string) => showToast(message, 'warning'),
  }
}