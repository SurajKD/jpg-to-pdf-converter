/**
 * Encoding and decoding utilities
 */

/**
 * Decode JWT token
 */
export function decodeJWT(token: string): {
  header: any
  payload: any
  signature: string
  isValid: boolean
  isExpired?: boolean
  expiresAt?: Date
} {
  try {
    const parts = token.split('.')
    if (parts.length !== 3) {
      throw new Error('Invalid JWT format')
    }

    const header = JSON.parse(atob(parts[0]))
    const payload = JSON.parse(atob(parts[1]))
    const signature = parts[2]

    let isExpired = false
    let expiresAt: Date | undefined

    if (payload.exp) {
      expiresAt = new Date(payload.exp * 1000)
      isExpired = expiresAt < new Date()
    }

    return {
      header,
      payload,
      signature,
      isValid: !isExpired,
      isExpired,
      expiresAt,
    }
  } catch (error) {
    throw new Error(`Failed to decode JWT: ${error instanceof Error ? error.message : 'Unknown error'}`)
  }
}

/**
 * Encode Base64
 */
export function encodeBase64(text: string): string {
  try {
    return btoa(unescape(encodeURIComponent(text)))
  } catch (error) {
    throw new Error('Failed to encode Base64')
  }
}

/**
 * Decode Base64
 */
export function decodeBase64(encoded: string): string {
  try {
    return decodeURIComponent(escape(atob(encoded)))
  } catch (error) {
    throw new Error('Failed to decode Base64')
  }
}

/**
 * Encode file to Base64
 */
export async function encodeFileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = () => {
      const result = reader.result as string
      resolve(result.split(',')[1] || result)
    }

    reader.onerror = () => reject(new Error('Failed to read file'))

    reader.readAsDataURL(file)
  })
}

/**
 * Decode Base64 to file
 */
export function decodeBase64ToFile(base64: string, fileName: string, mimeType: string): Blob {
  try {
    const byteCharacters = atob(base64)
    const byteNumbers = new Array(byteCharacters.length)

    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i)
    }

    const byteArray = new Uint8Array(byteNumbers)
    return new Blob([byteArray], { type: mimeType })
  } catch (error) {
    throw new Error('Failed to decode Base64')
  }
}

/**
 * Validate Base64 string
 */
export function isValidBase64(str: string): boolean {
  try {
    return btoa(atob(str)) === str
  } catch (err) {
    return false
  }
}

/**
 * URL encode
 */
export function encodeURL(text: string): string {
  return encodeURIComponent(text)
}

/**
 * URL decode
 */
export function decodeURL(encoded: string): string {
  try {
    return decodeURIComponent(encoded)
  } catch (error) {
    throw new Error('Failed to decode URL')
  }
}

/**
 * Text to Hex
 */
export function textToHex(text: string): string {
  let hex = ''
  for (let i = 0; i < text.length; i++) {
    hex += text.charCodeAt(i).toString(16).padStart(2, '0')
  }
  return hex.toUpperCase()
}

/**
 * Hex to Text
 */
export function hexToText(hex: string): string {
  let text = ''
  for (let i = 0; i < hex.length; i += 2) {
    text += String.fromCharCode(parseInt(hex.substr(i, 2), 16))
  }
  return text
}

/**
 * JSON stringify with pretty print
 */
export function prettyJSON(obj: any, indent: number = 2): string {
  try {
    return JSON.stringify(obj, null, indent)
  } catch (error) {
    throw new Error('Failed to stringify JSON')
  }
}

/**
 * Parse JSON safely
 */
export function parseJSONSafely(
  text: string
): { success: boolean; data?: any; error?: string } {
  try {
    const data = JSON.parse(text)
    return { success: true, data }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Invalid JSON',
    }
  }
}

/**
 * Validate JSON
 */
export function isValidJSON(text: string): boolean {
  try {
    JSON.parse(text)
    return true
  } catch {
    return false
  }
}

/**
 * Minify JSON
 */
export function minifyJSON(text: string): string {
  try {
    const parsed = JSON.parse(text)
    return JSON.stringify(parsed)
  } catch (error) {
    throw new Error('Invalid JSON')
  }
}
