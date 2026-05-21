'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Upload, FileIcon, AlertCircle, X } from 'lucide-react'
import { useDropzone } from 'react-dropzone'

export interface UploadedFile {
    id: string
    file: File
    preview?: string
    error?: string
}

interface UploadZoneProps {
    onFilesAccepted: (files: UploadedFile[]) => void
    onFileRemoved?: (id: string) => void
    accept?: Record<string, string[]>
    maxSize?: number // in bytes
    maxFiles?: number
    multiple?: boolean
    preview?: boolean
    uploadedFiles?: UploadedFile[]
    disabled?: boolean
}

export const UploadZone: React.FC<UploadZoneProps> = ({
    onFilesAccepted,
    onFileRemoved,
    accept = { 'image/*': ['.jpeg', '.jpg', '.png', '.webp'] },
    maxSize = 50 * 1024 * 1024, // 50MB default
    maxFiles = 10,
    multiple = true,
    preview = true,
    uploadedFiles = [],
    disabled = false,
}) => {
    const onDrop = React.useCallback(
        (acceptedFiles: File[], rejectedFiles: any[]) => {
            const newFiles: UploadedFile[] = acceptedFiles.map((file) => {
                const id = Math.random().toString(36).slice(2, 9)
                return {
                    id,
                    file,
                    preview: preview ? URL.createObjectURL(file) : undefined,
                }
            })

            if (newFiles.length > 0) {
                onFilesAccepted(newFiles)
            }

            if (rejectedFiles.length > 0) {
                rejectedFiles.forEach((rejection: any) => {
                    console.warn(`File rejected: ${rejection.file.name}`, rejection.errors)
                })
            }
        },
        [onFilesAccepted, preview]
    )

    const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
        onDrop,
        accept,
        maxSize,
        maxFiles,
        multiple,
        disabled,
    })

    return (
        <div className="space-y-4">
            <motion.div
                whileHover={!disabled ? { scale: 1.02 } : undefined}
                whileTap={!disabled ? { scale: 0.98 } : undefined}
            >
                <div
                    {...getRootProps()}
                    className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all ${isDragActive
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                        : isDragReject
                        ? 'border-red-500 bg-red-50 dark:bg-red-900/20'
                        : 'border-gray-300 hover:border-gray-400 bg-white dark:bg-slate-900'
                    } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                    <input {...getInputProps()} />
                    <motion.div
                        animate={{ scale: isDragActive ? 1.1 : 1 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    >
                        <Upload className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                    </motion.div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                        {isDragActive ? 'Drop files here' : 'Drag & drop files here'}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-slate-300">or click to select files</p>
                    <p className="text-xs text-gray-500 dark:text-slate-400 mt-2">Max {maxSize / 1024 / 1024}MB per file</p>
                </div>
            </motion.div>

            {uploadedFiles.length > 0 && (
                <motion.div
                    className="space-y-2"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ staggerChildren: 0.1 }}
                >
                    {uploadedFiles.map((item, index) => (
                            <motion.div
                                key={item.id}
                                className="flex items-center gap-3 p-3 bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ delay: index * 0.05 }}
                            >
                            {item.preview && (
                                <img
                                    src={item.preview}
                                    alt="preview"
                                    className="w-10 h-10 rounded object-cover"
                                />
                            )}
                            {!item.preview && <FileIcon className="w-5 h-5 text-gray-400" />}

                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{item.file.name}</p>
                                <p className="text-xs text-gray-500 dark:text-slate-300">{formatFileSize(item.file.size)}</p>
                            </div>

                            {onFileRemoved && (
                                <button
                                    onClick={() => onFileRemoved(item.id)}
                                    className="p-1 hover:bg-gray-200 dark:hover:bg-slate-700 rounded transition-colors"
                                    title="Remove file"
                                >
                                    <X className="w-4 h-4 text-gray-600 dark:text-slate-300" />
                                </button>
                            )}
                        </motion.div>
                    ))}
                </motion.div>
            )}
        </div>
    )
}

function formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 B'
    const k = 1024
    const sizes = ['B', 'KB', 'MB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i]
}
