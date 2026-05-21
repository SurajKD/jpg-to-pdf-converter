'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRightLeft } from 'lucide-react'
import { Card, ErrorState, SuccessState } from '../ui/Card'
import { CopyButton, DownloadButton } from '../ui/Buttons'
import { useToast } from '../../lib/hooks'
import {
  csvToJSON,
  jsonToCSV,
  detectCSVDelimiter,
  getCSVHeaders,
  getJSONFields,
} from '../../lib/csv'
import { parseJSONSafely, prettyJSON } from '../../lib/encoding'
import { ToastContainer } from '../ui/Toast'

type ConversionMode = 'csv-to-json' | 'json-to-csv'

interface ConverterState {
  mode: ConversionMode
  input: string
  output: string | null
  error: string | null
  delimiter: string
  preview: any[] | null
}

 const JSONCSVConverterClient: React.FC = () => {
  const [state, setState] = useState<ConverterState>({
    mode: 'csv-to-json',
    input: '',
    output: null,
    error: null,
    delimiter: ',',
    preview: null,
  })

  const toast = useToast()

  const handleModeChange = (mode: ConversionMode) => {
    setState((prev) => ({
      ...prev,
      mode,
      input: '',
      output: null,
      error: null,
      preview: null,
    }))
  }

  const handleConvert = () => {
    setState((prev) => ({ ...prev, error: null, output: null, preview: null }))

    if (!state.input.trim()) {
      setState((prev) => ({ ...prev, error: 'Please enter some content' }))
      return
    }

    try {
      let result: string
      let preview: any[] | null = null

      if (state.mode === 'csv-to-json') {
        const csvResult = csvToJSON(state.input, {
          hasHeader: true,
          delimiter: state.delimiter,
        })

        if (csvResult.error) {
          throw new Error(csvResult.error)
        }

        result = prettyJSON(csvResult.data)
        preview = csvResult.data.slice(0, 5)
      } else {
        const parsed = parseJSONSafely(state.input)
        if (!parsed.success) {
          throw new Error(parsed.error)
        }

        const jsonResult = jsonToCSV(Array.isArray(parsed.data) ? parsed.data : [parsed.data], {
          includeHeader: true,
          delimiter: state.delimiter,
        })

        if (jsonResult.error) {
          throw new Error(jsonResult.error)
        }

        result = jsonResult.csv
        preview = Array.isArray(parsed.data) ? parsed.data.slice(0, 5) : [parsed.data]
      }

      setState((prev) => ({
        ...prev,
        output: result,
        preview,
      }))
      toast.success('Conversion successful!')
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Conversion failed'
      setState((prev) => ({ ...prev, error: errorMsg }))
      toast.error(errorMsg)
    }
  }

  const handleDownload = () => {
    if (!state.output) return

    const fileName =
      state.mode === 'csv-to-json'
        ? `data-${Date.now()}.json`
        : `data-${Date.now()}.csv`

    const blob = new Blob([state.output], {
      type: state.mode === 'csv-to-json' ? 'application/json' : 'text/csv',
    })

    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = fileName
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)

    toast.success(`Downloaded ${fileName}`)
  }

  return (
    <div className="space-y-6">
      <ToastContainer toasts={toast.toasts} onClose={toast.remove} />

      <motion.div
        className="grid gap-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
          {/* Mode Selector */}
          <div className="grid grid-cols-2 gap-4">
            <Card
              hover
              onClick={() => handleModeChange('csv-to-json')}
              className={state.mode === 'csv-to-json' ? 'ring-2 ring-blue-500 dark:ring-blue-400' : ''}
            >
              <div className="p-6 text-center">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">CSV → JSON</h3>
                <p className="text-xs text-gray-600 dark:text-slate-300">Convert spreadsheet data to JSON</p>
              </div>
            </Card>

            <Card
              hover
              onClick={() => handleModeChange('json-to-csv')}
              className={state.mode === 'json-to-csv' ? 'ring-2 ring-blue-500 dark:ring-blue-400' : ''}
            >
              <div className="p-6 text-center">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">JSON → CSV</h3>
                <p className="text-xs text-gray-600 dark:text-slate-300">Convert JSON to spreadsheet data</p>
              </div>
            </Card>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-2 gap-6 lg:grid-cols-3">
            {/* Input */}
            <div className="lg:col-span-1">
              <Card>
                <div className="p-6 h-full flex flex-col">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
                    {state.mode === 'csv-to-json' ? 'CSV Input' : 'JSON Input'}
                  </h3>

                  <textarea
                    value={state.input}
                    onChange={(e) => setState((prev) => ({ ...prev, input: e.target.value }))}
                    placeholder={
                      state.mode === 'csv-to-json'
                        ? 'name,age,email\nJohn,30,john@example.com'
                        : '[{"name":"John","age":30}]'
                    }
                    className="flex-1 p-3 border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-gray-900 dark:text-white rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-xs"
                  />

                  {state.mode === 'csv-to-json' && (
                    <div className="mt-3">
                      <label className="block text-xs font-medium text-gray-700 dark:text-slate-200 mb-2">
                        Delimiter
                      </label>
                      <select
                        value={state.delimiter}
                        onChange={(e) => setState((prev) => ({ ...prev, delimiter: e.target.value }))}
                        className="w-full px-2 py-1 border border-gray-200 dark:border-slate-700 rounded text-xs bg-white dark:bg-slate-950 text-gray-900 dark:text-white"
                      >
                        <option value=",">Comma (,)</option>
                        <option value=";">Semicolon (;)</option>
                        <option value="\t">Tab (\t)</option>
                        <option value="|">Pipe (|)</option>
                      </select>
                    </div>
                  )}

                  <motion.button
                    onClick={handleConvert}
                    disabled={!state.input.trim()}
                    className="mt-4 w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-2 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Convert
                  </motion.button>
                </div>
              </Card>
            </div>

            {/* Output & Preview */}
            <div className="lg:col-span-2 space-y-4">
              {state.error && (
                <ErrorState
                  message={state.error}
                  onDismiss={() => setState((prev) => ({ ...prev, error: null }))}
                />
              )}

              {state.output && (
                <>
                  <SuccessState
                    title="Conversion Complete"
                    message={`Successfully converted to ${state.mode === 'csv-to-json' ? 'JSON' : 'CSV'}`}
                  />

                  <Card>
                    <div className="p-6">
                      <div className="flex justify-between items-center mb-3">
                        <h3 className="font-semibold text-gray-900 dark:text-white">
                          {state.mode === 'csv-to-json' ? 'JSON Output' : 'CSV Output'}
                        </h3>
                        <DownloadButton
                          onClick={handleDownload}
                          fileName="Download"
                          variant="secondary"
                        />
                      </div>

                      <div className="bg-gray-100 dark:bg-slate-950 rounded-lg p-3 mb-3">
                        <pre className="font-mono text-xs overflow-auto max-h-48 break-all text-gray-900 dark:text-slate-100">
                          {state.output}
                        </pre>
                      </div>

                      <CopyButton text={state.output} label="Copy Output" />
                    </div>
                  </Card>

                  {/* Preview Table */}
                  {state.preview && state.preview.length > 0 && (
                    <Card>
                      <div className="p-6">
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Preview (First 5 rows)</h3>

                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                              <thead>
                                <tr className="border-b border-gray-200">
                                  {Object.keys(state.preview[0] || {}).map((key) => (
                                    <th
                                      key={key}
                                      className="text-left px-3 py-2 font-semibold text-gray-700 dark:text-slate-200"
                                    >
                                      {key}
                                    </th>
                                  ))}
                                </tr>
                              </thead>
                              <tbody>
                                {state.preview.map((row, idx) => (
                                  <tr key={idx} className="border-b border-gray-100 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-900">
                                    {Object.values(row).map((val, colIdx) => (
                                      <td key={colIdx} className="px-3 py-2 text-gray-600 dark:text-slate-300">
                                        {String(val)}
                                      </td>
                                    ))}
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                      </div>
                    </Card>
                  )}
                </>
              )}
            </div>
          </div>
      </motion.div>
    </div>
  )
}
export default JSONCSVConverterClient;
