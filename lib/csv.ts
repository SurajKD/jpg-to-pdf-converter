/**
 * CSV and JSON conversion utilities
 */

interface CSVParseOptions {
  hasHeader?: boolean
  delimiter?: string
  skipEmptyLines?: boolean
}

interface JSONToCSVOptions {
  includeHeader?: boolean
  delimiter?: string
}

/**
 * Parse CSV string to JSON
 */
export function csvToJSON(
  csvText: string,
  options: CSVParseOptions = {}
): { data: any[]; error?: string } {
  const { hasHeader = true, delimiter = ',', skipEmptyLines = true } = options

  try {
    const lines = csvText.split('\n').filter((line) => (skipEmptyLines ? line.trim() : true))

    if (lines.length === 0) {
      return { data: [] }
    }

    const headers = hasHeader ? parseCSVLine(lines[0], delimiter) : null
    const startIndex = hasHeader ? 1 : 0

    const data = lines.slice(startIndex).map((line, rowIndex) => {
      const values = parseCSVLine(line, delimiter)

      if (hasHeader && headers) {
        const obj: any = {}
        headers.forEach((header, index) => {
          obj[header || `Column ${index + 1}`] = values[index] || ''
        })
        return obj
      } else {
        return values.reduce(
          (obj, value, index) => {
            obj[`Column ${index + 1}`] = value
            return obj
          },
          {} as any
        )
      }
    })

    return { data }
  } catch (error) {
    return {
      data: [],
      error: error instanceof Error ? error.message : 'Failed to parse CSV',
    }
  }
}

/**
 * Convert JSON array to CSV
 */
export function jsonToCSV(
  data: any[],
  options: JSONToCSVOptions = {}
): { csv: string; error?: string } {
  const { includeHeader = true, delimiter = ',' } = options

  try {
    if (!Array.isArray(data) || data.length === 0) {
      return { csv: '' }
    }

    // Get all unique keys
    const keys = new Set<string>()
    data.forEach((obj) => {
      if (typeof obj === 'object' && obj !== null) {
        Object.keys(obj).forEach((key) => keys.add(key))
      }
    })

    const headers = Array.from(keys)
    const lines: string[] = []

    // Add header if requested
    if (includeHeader) {
      lines.push(headers.map((h) => escapeCSVField(h)).join(delimiter))
    }

    // Add data rows
    data.forEach((obj) => {
      const row = headers.map((key) => {
        const value = obj[key] ?? ''
        return escapeCSVField(String(value))
      })
      lines.push(row.join(delimiter))
    })

    return { csv: lines.join('\n') }
  } catch (error) {
    return {
      csv: '',
      error: error instanceof Error ? error.message : 'Failed to convert to CSV',
    }
  }
}

/**
 * Parse a single CSV line respecting quotes
 */
function parseCSVLine(line: string, delimiter: string = ','): string[] {
  const result: string[] = []
  let current = ''
  let insideQuotes = false

  for (let i = 0; i < line.length; i++) {
    const char = line[i]
    const nextChar = line[i + 1]

    if (char === '"') {
      if (insideQuotes && nextChar === '"') {
        current += '"'
        i++ // Skip next quote
      } else {
        insideQuotes = !insideQuotes
      }
    } else if (char === delimiter && !insideQuotes) {
      result.push(current.trim())
      current = ''
    } else {
      current += char
    }
  }

  result.push(current.trim())
  return result
}

/**
 * Escape CSV field
 */
function escapeCSVField(field: string): string {
  if (field.includes(',') || field.includes('"') || field.includes('\n')) {
    return `"${field.replace(/"/g, '""')}"`
  }
  return field
}

/**
 * Detect CSV delimiter
 */
export function detectCSVDelimiter(csvText: string): string {
  const delimiters = [',', ';', '\t', '|']
  const firstLine = csvText.split('\n')[0] || ''

  let maxCount = 0
  let detectedDelimiter = ','

  delimiters.forEach((delimiter) => {
    const count = (firstLine.match(new RegExp(`\\${delimiter}`, 'g')) || []).length
    if (count > maxCount) {
      maxCount = count
      detectedDelimiter = delimiter
    }
  })

  return detectedDelimiter
}

/**
 * Validate CSV
 */
export function validateCSV(csvText: string, options: CSVParseOptions = {}): boolean {
  try {
    const result = csvToJSON(csvText, options)
    return !result.error && result.data.length > 0
  } catch {
    return false
  }
}

/**
 * Validate JSON array
 */
export function validateJSONArray(text: string): boolean {
  try {
    const parsed = JSON.parse(text)
    return Array.isArray(parsed)
  } catch {
    return false
  }
}

/**
 * Get CSV column headers
 */
export function getCSVHeaders(csvText: string, delimiter: string = ','): string[] {
  const lines = csvText.split('\n')
  if (lines.length === 0) return []
  return parseCSVLine(lines[0], delimiter)
}

/**
 * Get JSON keys/fields
 */
export function getJSONFields(text: string): string[] {
  try {
    const parsed = JSON.parse(text)
    if (Array.isArray(parsed) && parsed.length > 0) {
      const obj = parsed[0]
      return typeof obj === 'object' && obj !== null ? Object.keys(obj) : []
    }
    return typeof parsed === 'object' && parsed !== null ? Object.keys(parsed) : []
  } catch {
    return []
  }
}

/**
 * Export data as CSV file
 */
export function downloadCSV(csv: string, fileName: string = 'data.csv'): void {
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const link = document.createElement('a')
  const url = URL.createObjectURL(blob)

  link.setAttribute('href', url)
  link.setAttribute('download', fileName)
  link.style.visibility = 'hidden'

  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)

  URL.revokeObjectURL(url)
}
