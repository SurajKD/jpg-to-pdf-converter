/**
 * Image compression utilities
 */

export interface CompressionOptions {
  quality: number // 0-1
  maxWidth?: number
  maxHeight?: number
  targetSizeKB?: number
}

export async function compressImage(
  file: File,
  options: CompressionOptions
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = (event) => {
      const img = new Image()

      img.onload = async () => {
        const canvas = document.createElement('canvas')
        let width = img.width
        let height = img.height

        // Resize if needed
        if (options.maxWidth && width > options.maxWidth) {
          height = (height * options.maxWidth) / width
          width = options.maxWidth
        }
        if (options.maxHeight && height > options.maxHeight) {
          width = (width * options.maxHeight) / height
          height = options.maxHeight
        }

        canvas.width = width
        canvas.height = height

        const ctx = canvas.getContext('2d')
        if (!ctx) {
          reject(new Error('Could not get canvas context'))
          return
        }

        ctx.drawImage(img, 0, 0, width, height)

        // Determine output format
        const format = file.type === 'image/png' ? 'image/jpeg' : file.type === 'image/webp' ? 'image/webp' : 'image/jpeg'
        let quality = options.quality

        // If target size specified, adjust quality
        if (options.targetSizeKB) {
          // Binary search for appropriate quality
          let minQuality = 0.1
          let maxQuality = 1
          const targetBytes = options.targetSizeKB * 1024

          for (let i = 0; i < 10; i++) {
            const testQuality = (minQuality + maxQuality) / 2
            const blob = await createBlobFromCanvas(canvas, format, testQuality)
            if (blob.size > targetBytes) {
              maxQuality = testQuality
            } else {
              minQuality = testQuality
            }
          }
          quality = (minQuality + maxQuality) / 2
        }

        const compressedBlob = await createBlobFromCanvas(canvas, format, quality)
        resolve(compressedBlob)
      }

      img.onerror = () => reject(new Error('Failed to load image'))
      img.src = event.target?.result as string
    }

    reader.onerror = () => reject(new Error('Failed to read file'))
    reader.readAsDataURL(file)
  })
}

function createBlobFromCanvas(
  canvas: HTMLCanvasElement,
  format: string,
  quality: number
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) {
        resolve(blob)
      } else {
        reject(new Error('Failed to create compressed blob'))
      }
    }, format, quality)
  })
}

/**
 * Get image dimensions
 */
export async function getImageDimensions(
  file: File
): Promise<{ width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = (event) => {
      const img = new Image()
      img.onload = () => {
        resolve({ width: img.width, height: img.height })
      }
      img.onerror = () => reject(new Error('Failed to load image'))
      img.src = event.target?.result as string
    }

    reader.onerror = () => reject(new Error('Failed to read file'))
    reader.readAsDataURL(file)
  })
}

/**
 * Calculate compression statistics
 */
export function calculateCompressionStats(
  originalSize: number,
  compressedSize: number
): { ratio: number; savings: number; savingsPercent: number } {
  const ratio = originalSize / compressedSize
  const savings = originalSize - compressedSize
  const savingsPercent = (savings / originalSize) * 100

  return { ratio, savings, savingsPercent }
}

/**
 * Validate file type
 */
export function validateFileType(
  file: File,
  allowedTypes: string[]
): { valid: boolean; error?: string } {
  if (!allowedTypes.includes(file.type)) {
    return {
      valid: false,
      error: `Invalid file type. Allowed: ${allowedTypes.join(', ')}`,
    }
  }
  return { valid: true }
}

/**
 * Validate file size
 */
export function validateFileSize(
  file: File,
  maxSizeMB: number
): { valid: boolean; error?: string } {
  const maxBytes = maxSizeMB * 1024 * 1024
  if (file.size > maxBytes) {
    return {
      valid: false,
      error: `File exceeds ${maxSizeMB}MB limit. Your file: ${(file.size / 1024 / 1024).toFixed(2)}MB`,
    }
  }
  return { valid: true }
}

/**
 * Convert image to different format
 */
export async function convertImageFormat(
  file: File,
  targetFormat: 'image/jpeg' | 'image/png' | 'image/webp'
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = (event) => {
      const img = new Image()

      img.onload = () => {
        const canvas = document.createElement('canvas')
        canvas.width = img.width
        canvas.height = img.height

        const ctx = canvas.getContext('2d')
        if (!ctx) {
          reject(new Error('Could not get canvas context'))
          return
        }

        ctx.drawImage(img, 0, 0)

        canvas.toBlob((blob) => {
          if (blob) {
            resolve(blob)
          } else {
            reject(new Error('Failed to convert image'))
          }
        }, targetFormat)
      }

      img.onerror = () => reject(new Error('Failed to load image'))
      img.src = event.target?.result as string
    }

    reader.onerror = () => reject(new Error('Failed to read file'))
    reader.readAsDataURL(file)
  })
}

/**
 * Create thumbnail from image
 */
export async function createThumbnail(
  file: File,
  maxWidth: number = 150,
  maxHeight: number = 150
): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = (event) => {
      const img = new Image()

      img.onload = () => {
        let width = img.width
        let height = img.height

        if (width > height) {
          if (width > maxWidth) {
            height *= maxWidth / width
            width = maxWidth
          }
        } else {
          if (height > maxHeight) {
            width *= maxHeight / height
            height = maxHeight
          }
        }

        const canvas = document.createElement('canvas')
        canvas.width = width
        canvas.height = height

        const ctx = canvas.getContext('2d')
        if (!ctx) {
          reject(new Error('Could not get canvas context'))
          return
        }

        ctx.drawImage(img, 0, 0, width, height)
        resolve(canvas.toDataURL('image/jpeg', 0.8))
      }

      img.onerror = () => reject(new Error('Failed to load image'))
      img.src = event.target?.result as string
    }

    reader.onerror = () => reject(new Error('Failed to read file'))
    reader.readAsDataURL(file)
  })
}
