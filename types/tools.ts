/**
 * Shared types for all tools
 */

export interface ToolMetadata {
  id: string
  name: string
  description: string
  icon: string
  category: 'image' | 'pdf' | 'encoding' | 'converter' | 'utility'
  keywords: string[]
  seoTitle: string
  seoDescription: string
  featured: boolean
}

export interface UploadProgress {
  loaded: number
  total: number
  percentage: number
  fileName: string
  status: 'pending' | 'processing' | 'success' | 'error'
  error?: string
}

export interface ProcessingState {
  isProcessing: boolean
  progress: number
  currentFile?: string
  error?: string
  startTime?: number
}

export interface DownloadResult {
  blob: Blob
  fileName: string
  mimeType: string
  size: number
}

export interface FileValidation {
  isValid: boolean
  error?: string
  warning?: string
}

export interface ImageFormat {
  format: 'jpeg' | 'png' | 'webp'
  quality: number
  maxWidth?: number
  maxHeight?: number
  targetSize?: number // in KB
}

export interface CompressionResult {
  original: {
    size: number
    dimensions?: { width: number; height: number }
  }
  compressed: {
    size: number
    dimensions?: { width: number; height: number }
  }
  compressionRatio: number
}

export interface QRCodeOptions {
  type: 'text' | 'url' | 'email' | 'wifi'
  value: string
  size: number
  errorCorrection: 'L' | 'M' | 'Q' | 'H'
  color: {
    dark: string
    light: string
  }
  logo?: {
    url: string
    size: number
  }
}

export interface JWTDecoded {
  header: Record<string, any>
  payload: Record<string, any>
  signature: string
  isValid: boolean
  isExpired?: boolean
  expiresAt?: Date
  issuedAt?: Date
}

export interface CSVToJSONOptions {
  hasHeader: boolean
  delimiter: ',' | ';' | '\t' | '|'
  skipEmptyLines: boolean
}

export interface JSONToCSVOptions {
  includeHeader: boolean
  delimiter: ',' | ';' | '\t' | '|'
}

export interface PassportPhotoFormat {
  name: string
  width: number // mm
  height: number // mm
  dpi: number
  quantity: number // per sheet
}

export interface PDFSplitOptions {
  pageRanges: Array<{ start: number; end: number }>
  outputFormat: 'separate' | 'zip'
}
