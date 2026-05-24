'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Youtube, Download, Copy, ExternalLink, History, RefreshCw, Layers } from 'lucide-react'
import { Card, EmptyState } from '../ui/Card'
import { useToast, useLocalStorage } from '../../lib/hooks'
import { ToastContainer } from '../ui/Toast'

interface ThumbnailResolution {
  id: string
  label: string
  url: string
  dimensions: string
  width: number
  height: number
}

// Robust helper function to extract Video ID from various YouTube URLs
export function extractYoutubeVideoId(url: string): string | null {
  if (!url) return null
  const cleanUrl = url.trim()
  
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|shorts\/|live\/)([^#\&\?]*).*/
  const match = cleanUrl.match(regExp)
  
  if (match && match[2].length === 11) {
    return match[2]
  }
  
  try {
    const parsed = new URL(cleanUrl)
    if (parsed.hostname.includes('youtu.be')) {
      const id = parsed.pathname.slice(1)
      if (id.length === 11) return id
    }
    if (parsed.hostname.includes('youtube.com')) {
      const paths = parsed.pathname.split('/')
      const shortsIndex = paths.indexOf('shorts')
      if (shortsIndex !== -1 && paths[shortsIndex + 1]?.length === 11) {
        return paths[shortsIndex + 1]
      }
      const liveIndex = paths.indexOf('live')
      if (liveIndex !== -1 && paths[liveIndex + 1]?.length === 11) {
        return paths[liveIndex + 1]
      }
      const embedIndex = paths.indexOf('embed')
      if (embedIndex !== -1 && paths[embedIndex + 1]?.length === 11) {
        return paths[embedIndex + 1]
      }
      const v = parsed.searchParams.get('v')
      if (v && v.length === 11) return v
    }
  } catch (e) {
    // Ignore invalid url parser formats
  }
  
  return null
}

export default function YoutubeThumbnailDownloaderClient() {
  const [url, setUrl] = useState('')
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [resolutions, setResolutions] = useState<ThumbnailResolution[]>([])
  const [recentUrls, setRecentUrls] = useLocalStorage<string[]>('yt-recent-urls', [])
  
  const toast = useToast()

  const resolutionsConfig = [
    { id: 'maxres', label: 'Max Resolution (HD)', fileName: 'maxresdefault.jpg', dimensions: '1280x720', w: 1280, h: 720 },
    { id: 'sd', label: 'Standard (SD)', fileName: 'sddefault.jpg', dimensions: '640x480', w: 640, h: 480 },
    { id: 'hq', label: 'High Quality (HQ)', fileName: 'hqdefault.jpg', dimensions: '480x360', w: 480, h: 360 },
    { id: 'mq', label: 'Medium Quality', fileName: 'mqdefault.jpg', dimensions: '320x180', w: 320, h: 180 },
    { id: 'default', label: 'Default Quality', fileName: 'default.jpg', dimensions: '120x90', w: 120, h: 90 },
  ]

  // Check if thumbnail actually exists on YouTube's servers using naturalWidth detection
  const checkThumbnailAvailability = (imgUrl: string, configId: string): Promise<boolean> => {
    return new Promise((resolve) => {
      const img = new Image()
      img.onload = () => {
        // Missing higher-res images fallback to a 120x90 gray no-image placeholder
        if (img.naturalWidth === 120 && img.naturalHeight === 90 && configId !== 'default') {
          resolve(false)
        } else {
          resolve(true)
        }
      }
      img.onerror = () => {
        resolve(false)
      }
      img.src = imgUrl
    })
  }

  const handleFetchThumbnails = async (targetUrl: string) => {
    const videoId = extractYoutubeVideoId(targetUrl)
    if (!videoId) {
      toast.error('Invalid YouTube URL. Please check the link and try again.')
      return
    }

    setLoading(true)
    setActiveVideoId(videoId)

    // Save to local history
    if (!recentUrls.includes(targetUrl)) {
      setRecentUrls((prev) => [targetUrl, ...prev.slice(0, 4)])
    }

    try {
      const validatedResolutions: ThumbnailResolution[] = []

      for (const config of resolutionsConfig) {
        const imgUrl = `https://img.youtube.com/vi/${videoId}/${config.fileName}`
        const isAvailable = await checkThumbnailAvailability(imgUrl, config.id)
        if (isAvailable) {
          validatedResolutions.push({
            id: config.id,
            label: config.label,
            url: imgUrl,
            dimensions: config.dimensions,
            width: config.w,
            height: config.h,
          })
        }
      }

      setResolutions(validatedResolutions)
      toast.success('Thumbnails fetched successfully!')
    } catch (err) {
      console.error(err)
      toast.error('Something went wrong while validating thumbnails.')
    } finally {
      setLoading(false)
    }
  }

  const handleDownload = async (imgUrl: string, label: string) => {
    try {
      const response = await fetch(`/api/download-thumbnail?url=${encodeURIComponent(imgUrl)}`)
      if (!response.ok) throw new Error('Download failed')
      
      const blob = await response.blob()
      const downloadLinkUrl = URL.createObjectURL(blob)
      
      const a = document.createElement('a')
      a.href = downloadLinkUrl
      a.download = `${label.toLowerCase().replace(/[^a-z0-9]/g, '-')}.jpg`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(downloadLinkUrl)
      
      toast.success(`${label} thumbnail downloaded!`)
    } catch (err) {
      console.error(err)
      toast.error('Direct download failed. Try opening the image in a new tab.')
    }
  }

  const handleDownloadAll = async () => {
    if (resolutions.length === 0) return
    toast.info('Starting bulk download...')

    for (let i = 0; i < resolutions.length; i++) {
      const res = resolutions[i]
      await handleDownload(res.url, `${res.label}-${res.dimensions}`)
      if (i < resolutions.length - 1) {
        // Delay to prevent browser blocking multiple simultaneous downloads
        await new Promise((resolve) => setTimeout(resolve, 600))
      }
    }
    toast.success('All available thumbnails downloaded!')
  }

  const handleCopyUrl = async (imgUrl: string) => {
    try {
      await navigator.clipboard.writeText(imgUrl)
      toast.success('Image URL copied to clipboard!')
    } catch {
      toast.error('Failed to copy URL.')
    }
  }

  return (
    <div className="space-y-8">
      <ToastContainer toasts={toast.toasts} onClose={toast.remove} />

      {/* Main Control Card */}
      <Card className="p-6">
        <div className="space-y-4">
          <label className="block text-sm font-semibold text-gray-700 dark:text-slate-200">
            Paste YouTube Video, Short, or Live URL
          </label>
          <div className="flex flex-col md:flex-row gap-3">
            <div className="relative flex-1">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <Youtube className="w-5 h-5 text-red-500" />
              </span>
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://www.youtube.com/watch?v=..."
                className="w-full pl-10 pr-4 py-3 border border-gray-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-950 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              onClick={() => handleFetchThumbnails(url)}
              disabled={loading || !url.trim()}
              className="px-6 py-3 bg-[#0b74de] hover:bg-blue-600 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-5 h-5 animate-spin" />
                  Analyzing...
                </>
              ) : (
                'Extract Thumbnails'
              )}
            </button>
          </div>

          {/* Quick Examples */}
          <div className="flex flex-wrap gap-2 text-xs text-slate-500 mt-2">
            <span>Try:</span>
            <button
              onClick={() => {
                setUrl('https://www.youtube.com/watch?v=aqz-KE-bpKQ')
                handleFetchThumbnails('https://www.youtube.com/watch?v=aqz-KE-bpKQ')
              }}
              className="text-blue-500 hover:underline"
            >
              YouTube Video
            </button>
            <span>•</span>
            <button
              onClick={() => {
                setUrl('https://youtube.com/shorts/pEupc5LwB14')
                handleFetchThumbnails('https://youtube.com/shorts/pEupc5LwB14')
              }}
              className="text-blue-500 hover:underline"
            >
              YouTube Shorts
            </button>
          </div>
        </div>
      </Card>

      {/* History Area */}
      {recentUrls.length > 0 && (
        <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
          <History className="w-4 h-4" />
          <span>Recently Extracted:</span>
          <div className="flex flex-wrap gap-2">
            {recentUrls.map((hUrl, i) => {
              const videoId = extractYoutubeVideoId(hUrl)
              return (
                <button
                  key={i}
                  onClick={() => {
                    setUrl(hUrl)
                    handleFetchThumbnails(hUrl)
                  }}
                  className="bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 px-3 py-1 rounded-full text-xs transition-colors flex items-center gap-1 font-mono text-slate-600 dark:text-slate-300"
                >
                  {videoId}
                </button>
              )
            })}
            <button
              onClick={() => setRecentUrls([])}
              className="text-xs text-red-500 hover:underline"
            >
              Clear
            </button>
          </div>
        </div>
      )}

      {/* Results Area */}
      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          >
            {[1, 2, 3].map((n) => (
              <Card key={n} className="p-4 space-y-4">
                <div className="aspect-video bg-slate-100 dark:bg-slate-800 rounded-lg animate-pulse" />
                <div className="h-4 bg-slate-100 dark:bg-slate-800 rounded w-2/3 animate-pulse" />
                <div className="h-10 bg-slate-100 dark:bg-slate-800 rounded animate-pulse" />
              </Card>
            ))}
          </motion.div>
        ) : resolutions.length > 0 ? (
          <motion.div
            key="results"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
          >
            {/* Header & Bulk Actions */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <Layers className="w-5 h-5 text-blue-500" />
                  Available Thumbnail Resolutions ({resolutions.length})
                </h2>
                <p className="text-sm text-slate-500">
                  Video ID: <span className="font-mono font-bold text-blue-500">{activeVideoId}</span>
                </p>
              </div>
              <button
                onClick={handleDownloadAll}
                className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-lg shadow-sm transition-colors flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                Download All Resolutions
              </button>
            </div>

            {/* Grid of Results */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {resolutions.map((res) => (
                <Card key={res.id} className="p-4 flex flex-col justify-between overflow-hidden group">
                  <div className="space-y-4">
                    {/* Thumbnail Preview Image with Hover Scale */}
                    <div className="aspect-video bg-slate-100 dark:bg-slate-950 rounded-lg overflow-hidden relative border border-slate-100 dark:border-slate-800">
                      <img
                        src={res.url}
                        alt={`${res.label} YouTube thumbnail`}
                        className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300"
                        loading="lazy"
                      />
                      <span className="absolute bottom-2 right-2 bg-slate-900/80 text-white font-mono px-2 py-0.5 rounded text-[10px]">
                        {res.dimensions}
                      </span>
                    </div>

                    <div>
                      <h3 className="font-bold text-gray-900 dark:text-white text-base">
                        {res.label}
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 font-mono mt-0.5">
                        {res.width} × {res.height} px
                      </p>
                    </div>
                  </div>

                  {/* Actions Grid */}
                  <div className="grid grid-cols-2 gap-2 mt-4">
                    <button
                      onClick={() => handleDownload(res.url, res.label)}
                      className="px-3 py-2 bg-[#0b74de] hover:bg-blue-600 text-white text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-1.5"
                    >
                      <Download className="w-3.5 h-3.5" />
                      Download
                    </button>
                    <button
                      onClick={() => handleCopyUrl(res.url)}
                      className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-white text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-1.5"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      Copy URL
                    </button>
                    <a
                      href={res.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="col-span-2 px-3 py-2 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/50 text-slate-700 dark:text-slate-300 text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-1.5"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      Open Image in New Tab
                    </a>
                  </div>
                </Card>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Card className="p-8">
              <EmptyState
                icon={<Youtube className="w-16 h-16 text-slate-300 dark:text-slate-700" />}
                title="Awaiting YouTube Link"
                description="Paste a valid YouTube, Shorts, or Live link above and hit Extract to fetch all standard and high-definition resolutions instantly."
              />
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
