'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { FileText, Upload } from 'lucide-react'
import { Card, EmptyState, ErrorState } from '../ui/Card'
import { UploadZone, UploadedFile } from '../ui/UploadZone'
import { LoadingSpinner } from '../ui/Loading'
import { DownloadButton } from '../ui/Buttons'
import { useProgress, useDownload, useToast } from '../../lib/hooks'
import { ToastContainer } from '../ui/Toast'

const PDFJS_CDN_URL = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.6.347/pdf.min.js'
const PDFJS_WORKER_CDN = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.6.347/pdf.worker.min.js'

async function ensurePdfJsLoaded(): Promise<any> {
    if ((window as any).pdfjsLib) return (window as any).pdfjsLib

    await new Promise<void>((resolve, reject) => {
        const existing = document.querySelector(`script[data-pdfjs-cdn="${PDFJS_CDN_URL}"]`)
        if (existing) {
            ; (existing as HTMLScriptElement).addEventListener('load', () => resolve())
                ; (existing as HTMLScriptElement).addEventListener('error', () => reject(new Error('Failed to load pdf.js from CDN')))
            return
        }

        const script = document.createElement('script')
        script.src = PDFJS_CDN_URL
        script.async = true
        script.setAttribute('data-pdfjs-cdn', PDFJS_CDN_URL)
        script.onload = () => resolve()
        script.onerror = () => reject(new Error('Failed to load pdf.js from CDN'))
        document.head.appendChild(script)
    })

    const pdfjsLib = (window as any).pdfjsLib
    if (!pdfjsLib) throw new Error('pdfjsLib not available after CDN load')

    try {
        pdfjsLib.GlobalWorkerOptions.workerSrc = PDFJS_WORKER_CDN
    } catch {
        // ignore if pdfjs version does not expose GlobalWorkerOptions
    }

    return pdfjsLib
}

interface PDFPage {
    pageNum: number
    selected: boolean
}

interface PDFSplitterState {
    uploadedFile: UploadedFile | null
    pages: PDFPage[]
    selectedPages: Set<number>
    rangeStart: number | null
    rangeEnd: number | null
    totalPages: number
    error: string | null
}

const PDFSplitterClient: React.FC = () => {
    const [state, setState] = useState<PDFSplitterState>({
        uploadedFile: null,
        pages: [],
        selectedPages: new Set(),
        rangeStart: null,
        rangeEnd: null,
        totalPages: 0,
        error: null,
    })

    const { isLoading, start, complete, fail } = useProgress()
    const { download } = useDownload()
    const toast = useToast()

    const handleFilesAccepted = async (files: UploadedFile[]) => {
        if (files.length === 0) return

        const file = files[0]
        setState((prev) => ({ ...prev, uploadedFile: file, error: null }))

        start()
        try {
            const arrayBuffer = await file.file.arrayBuffer()
            const pdfjsLib = await ensurePdfJsLoaded()
            const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer })
            const pdf = await loadingTask.promise
            const totalPages = pdf.numPages

            const pages: PDFPage[] = Array.from({ length: totalPages }, (_, i) => ({
                pageNum: i + 1,
                selected: false,
            }))

            setState((prev) => ({
                ...prev,
                pages,
                totalPages,
                selectedPages: new Set(),
            }))

            toast.success(`PDF loaded: ${totalPages} pages`)
            complete()
        } catch (err) {
            const errorMsg = 'Failed to load PDF'
            setState((prev) => ({ ...prev, error: errorMsg }))
            toast.error(errorMsg)
            fail(errorMsg)
        }
    }

    const togglePage = (pageNum: number) => {
        setState((prev) => {
            const newSelected = new Set(prev.selectedPages)
            if (newSelected.has(pageNum)) {
                newSelected.delete(pageNum)
            } else {
                newSelected.add(pageNum)
            }
            return { ...prev, selectedPages: newSelected }
        })
    }

    const selectRange = () => {
        if (!state.rangeStart || !state.rangeEnd) {
            toast.warning('Please enter both start and end pages')
            return
        }

        const start = Math.min(state.rangeStart, state.rangeEnd)
        const end = Math.max(state.rangeStart, state.rangeEnd)
        const newSelected = new Set<number>()

        for (let i = start; i <= end; i++) {
            newSelected.add(i)
        }

        setState((prev) => ({ ...prev, selectedPages: newSelected }))
        toast.success(`Selected pages ${start}-${end}`)
    }
    const handleDownload = async () => {
        if (!state.uploadedFile) return

        start()

        try {
            const { PDFDocument } = await import('pdf-lib')

            const existingPdfBytes = await state.uploadedFile.file.arrayBuffer()

            const pdfDoc = await PDFDocument.load(existingPdfBytes)
            const newPdf = await PDFDocument.create()

            const selectedPages = Array.from(state.selectedPages)
                .sort((a, b) => a - b)
                .map((page) => page - 1)

            const copiedPages = await newPdf.copyPages(pdfDoc, selectedPages)

            copiedPages.forEach((page) => {
                newPdf.addPage(page)
            })

            const pdfBytes = await newPdf.save()
            //@ts-ignore
            const blob = new Blob([pdfBytes], {
                type: 'application/pdf',
            })

            const originalName =
                state.uploadedFile.file.name.replace(/\.pdf$/i, '') || 'split'

            download(blob, `${originalName}-split.pdf`)

            toast.success('PDF downloaded successfully')
            complete()
        } catch (error) {
            console.error(error)
            toast.error('Failed to generate PDF')
            fail('Failed to generate PDF')
        }
    }
    return (
        <div className="space-y-6">
            <ToastContainer toasts={toast.toasts} onClose={toast.remove} />

            {!state.uploadedFile ? (
                <Card>
                    <div className="p-12">
                        <UploadZone
                            onFilesAccepted={handleFilesAccepted}
                            accept={{ 'application/pdf': ['.pdf'] }}
                            maxSize={100 * 1024 * 1024}
                            maxFiles={1}
                            multiple={false}
                        />
                    </div>
                </Card>
            ) : isLoading ? (
                <Card>
                    <div className="p-12 text-center">
                        <LoadingSpinner size="lg" text="Loading PDF..." />
                    </div>
                </Card>
            ) : state.error ? (
                <ErrorState message={state.error} onDismiss={() => setState((prev) => ({ ...prev, error: null }))} />
            ) : (
                <motion.div className="space-y-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    {/* File Info */}
                    <Card>
                        <div className="p-6">
                            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{state.uploadedFile?.file.name}</h3>
                            <p className="text-sm text-gray-600">{state.totalPages} pages total</p>
                        </div>
                    </Card>

                    {/* Selection Tools */}
                    <Card>
                        <div className="p-6 space-y-4">
                            <div>
                                <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Select Page Range</h3>
                                <div className="flex gap-2">
                                    <input
                                        type="number"
                                        min="1"
                                        max={state.totalPages}
                                        placeholder="From"
                                        value={state.rangeStart ?? ''}
                                        onChange={(e) =>
                                            setState((prev) => ({
                                                ...prev,
                                                rangeStart: e.target.value ? Number(e.target.value) : null,
                                            }))
                                        }
                                        className="flex-1 px-3 py-2 border border-gray-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-950 text-gray-900 dark:text-white"
                                    />
                                    <input
                                        type="number"
                                        min="1"
                                        max={state.totalPages}
                                        placeholder="To"
                                        value={state.rangeEnd ?? ''}
                                        onChange={(e) =>
                                            setState((prev) => ({
                                                ...prev,
                                                rangeEnd: e.target.value ? Number(e.target.value) : null,
                                            }))
                                        }
                                        className="flex-1 px-3 py-2 border border-gray-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-950 text-gray-900 dark:text-white"
                                    />
                                    <motion.button
                                        onClick={selectRange}
                                        className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        Select
                                    </motion.button>
                                </div>
                            </div>

                            <button
                                onClick={() => setState((prev) => ({ ...prev, selectedPages: new Set(Array.from({ length: prev.totalPages }, (_, i) => i + 1)) }))}
                                className="w-full px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium text-sm"
                            >
                                Select All
                            </button>
                        </div>
                    </Card>

                    {/* Page Grid */}
                    <Card>
                        <div className="p-6">
                            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Select Pages</h3>
                            <div className="grid grid-cols-4 gap-2 md:grid-cols-6">
                                {state.pages.map((page) => (
                                    <motion.button
                                        key={page.pageNum}
                                        onClick={() => togglePage(page.pageNum)}
                                        className={`p-2 rounded-lg font-medium text-sm transition-all ${state.selectedPages.has(page.pageNum)
                                                ? 'bg-blue-600 text-white'
                                                : 'bg-gray-100 text-gray-900 hover:bg-gray-200 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700'
                                            }`}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        {page.pageNum}
                                    </motion.button>
                                ))}
                            </div>
                        </div>
                    </Card>

                    {/* Download */}
                    {state.selectedPages.size > 0 && (
                        <Card>
                            <div className="p-6">
                                <p className="text-sm text-gray-600 mb-4">
                                    {state.selectedPages.size} page{state.selectedPages.size !== 1 ? 's' : ''} selected
                                </p>
                                <DownloadButton
                                    onClick={handleDownload}
                                    fileName="Download PDF"
                                    variant="primary"
                                />
                            </div>
                        </Card>
                    )}
                </motion.div>
            )}
        </div>
    )
}
export default PDFSplitterClient;

