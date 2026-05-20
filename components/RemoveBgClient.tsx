// components/RemoveBgViaCDN.tsx
'use client'

import React, { useEffect, useRef, useState } from 'react'

const MODEL_URL = '/models/bg_remover.onnx'
const MODEL_SIZE = 512
const ORT_CDN = 'https://cdn.jsdelivr.net/npm/onnxruntime-web/dist/ort.min.js' // UMD global: window.ort

declare global {
  interface Window {
    ort: any
  }
}

/** helper to ensure the CDN script is loaded and window.ort is available */
function ensureOrtScript(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined') return reject(new Error('client only'))
    if ((window as any).ort) return resolve()

    const existing = document.querySelector(`script[src="${ORT_CDN}"]`) as HTMLScriptElement | null
    if (existing) {
      existing.addEventListener('load', () => resolve())
      existing.addEventListener('error', (e) => reject(e))
      return
    }

    const s = document.createElement('script')
    s.src = ORT_CDN
    s.async = true
    s.onload = () => {
      setTimeout(() => {
        if ((window as any).ort) resolve()
        else reject(new Error('onnxruntime-web loaded but window.ort missing'))
      }, 0)
    }
    s.onerror = (e) => reject(e)
    document.head.appendChild(s)
  })
}

/** draw image cover -> return canvas AND transform metadata */
function drawImageCoverToCanvas(img: HTMLImageElement, size = MODEL_SIZE) {
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext('2d')!
  ctx.fillStyle = 'black'
  ctx.fillRect(0, 0, size, size)
  const iw = img.naturalWidth
  const ih = img.naturalHeight
  const scale = Math.max(size / iw, size / ih)
  const nw = iw * scale
  const nh = ih * scale
  const dx = (size - nw) / 2
  const dy = (size - nh) / 2
  ctx.drawImage(img, dx, dy, nw, nh)
  return { canvas, iw, ih, nw, nh, dx, dy, scale }
}

/** build float32 CHW tensor */
async function imageToFloat32CHW(img: HTMLImageElement, size = MODEL_SIZE) {
  const { canvas, iw, ih, nw, nh, dx, dy, scale } = drawImageCoverToCanvas(img, size)
  const ctx = canvas.getContext('2d')!
  const d = ctx.getImageData(0, 0, size, size).data
  const px = size * size
  const arr = new Float32Array(1 * 3 * px)
  for (let i = 0; i < px; i++) {
    arr[i] = d[i * 4 + 0] / 255.0
    arr[px + i] = d[i * 4 + 1] / 255.0
    arr[2 * px + i] = d[i * 4 + 2] / 255.0
  }
  return { tensorData: arr, canvas, meta: { iw, ih, nw, nh, dx, dy, scale } }
}

/** convert float alpha array to ImageData */
function alphaToImageData(alpha: Float32Array | number[], size = MODEL_SIZE) {
  const px = size * size
  const out = new ImageData(size, size)
  for (let i = 0; i < px; i++) {
    const v = Math.max(0, Math.min(1, (alpha as any)[i] ?? 0))
    const u = Math.round(v * 255)
    out.data[i * 4 + 0] = u
    out.data[i * 4 + 1] = u
    out.data[i * 4 + 2] = u
    out.data[i * 4 + 3] = 255
  }
  return out
}

/** feather via canvas blur + threshold */
function featherAlpha(alphaImage: ImageData, featherPx = 6, threshold = 0.45) {
  const size = alphaImage.width
  const c1 = document.createElement('canvas')
  c1.width = size
  c1.height = size
  const c1ctx = c1.getContext('2d')!
  c1ctx.putImageData(alphaImage, 0, 0)

  const c2 = document.createElement('canvas')
  c2.width = size
  c2.height = size
  const c2ctx = c2.getContext('2d')!
  c2ctx.filter = `blur(${featherPx}px)`
  c2ctx.drawImage(c1, 0, 0)

  const blurred = c2ctx.getImageData(0, 0, size, size)
  const out = c1ctx.createImageData(size, size)
  const px = size * size
  for (let i = 0; i < px; i++) {
    const v = blurred.data[i * 4] / 255
    const a = Math.max(0, Math.min(1, (v - threshold) / (1 - threshold)))
    const u = Math.round(a * 255)
    out.data[i * 4 + 0] = u
    out.data[i * 4 + 1] = u
    out.data[i * 4 + 2] = u
    out.data[i * 4 + 3] = 255
  }
  return out
}

/** composite final RGBA for arbitrary size */
function compositeWithAlphaSized(srcCanvas: HTMLCanvasElement, alphaImgData: ImageData) {
  const w = srcCanvas.width
  const h = srcCanvas.height
  const out = document.createElement('canvas')
  out.width = w
  out.height = h
  const ctx = out.getContext('2d')!
  ctx.drawImage(srcCanvas, 0, 0, w, h)
  const src = ctx.getImageData(0, 0, w, h)
  const dst = ctx.createImageData(w, h)
  const px = w * h
  for (let i = 0; i < px; i++) {
    const a = alphaImgData.data[i * 4] / 255
    dst.data[i * 4 + 0] = src.data[i * 4 + 0]
    dst.data[i * 4 + 1] = src.data[i * 4 + 1]
    dst.data[i * 4 + 2] = src.data[i * 4 + 2]
    dst.data[i * 4 + 3] = Math.round(a * 255)
  }
  ctx.putImageData(dst, 0, 0)
  return out
}

export default function RemoveBgViaCDN() {
  const [status, setStatus] = useState('idle')
  const [session, setSession] = useState<any | null>(null)
  const [processing, setProcessing] = useState(false)
  const fileRef = useRef<HTMLInputElement | null>(null)
  const imgRef = useRef<HTMLImageElement | null>(null)
  const outRef = useRef<HTMLDivElement | null>(null)
  const [featherPx, setFeatherPx] = useState(6)
  const [threshold, setThreshold] = useState(0.45)
  const [imageSrc, setImageSrc] = useState<string | null>(null)

  useEffect(() => {
    return () => { }
  }, [])

  async function loadModel() {
    try {
      setStatus('loading runtime...')
      await ensureOrtScript()
      setStatus('runtime loaded, fetching model bytes...')
      const absolute = new URL(MODEL_URL, window.location.href).toString()
      const resp = await fetch(absolute)
      if (!resp.ok) throw new Error(`Failed to fetch model ${resp.status}`)
      const buf = await resp.arrayBuffer()
      const bytes = new Uint8Array(buf)
      setStatus('creating session from bytes (wasm)...')
      const s = await (window as any).ort.InferenceSession.create(bytes, { executionProviders: ['wasm'] })
      setSession(s)
      setStatus('model loaded')
      console.log('ORT session ready', s)
      return s
    } catch (err: any) {
      console.error('Failed to load model', err)
      setStatus('Failed to load model: ' + (err?.message ?? err))
      throw err
    }
  }

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0]
    if (!f) return
    const url = URL.createObjectURL(f)
    if (imgRef.current) imgRef.current.src = url
    setImageSrc(url)
    setTimeout(() => URL.revokeObjectURL(url), 20000)
  }

  async function run() {
    if (!imgRef.current) return alert('No image')
    if (!imgRef.current.complete) return alert('Image not loaded yet')
    setProcessing(true)
    setStatus('removing background...')
    try {
      const s = session ?? (await loadModel())
      if (!s) return

      setStatus('preprocessing')
      const { tensorData, canvas, meta } = await imageToFloat32CHW(imgRef.current, MODEL_SIZE)
      const ort = (window as any).ort
      const inputTensor = new ort.Tensor('float32', tensorData, [1, 3, MODEL_SIZE, MODEL_SIZE])
      setStatus('running model')
      let outputs = {}
      try {
        outputs = await s.run({ input: inputTensor })
      } catch (err: any) {
        console.error('run failed', err)
        setStatus('run failed: ' + (err?.message ?? err))
        return
      }
      setStatus('postprocessing')
      const outKey = Object.keys(outputs)[0]
      const alphaTensor: any = (outputs as any)[outKey]
      let alphaArr = alphaTensor.data as Float32Array
      const px = MODEL_SIZE * MODEL_SIZE
      if (alphaArr.length > px) alphaArr = alphaArr.slice(0, px)
      const alphaImage = alphaToImageData(alphaArr, MODEL_SIZE)

      // Remap alpha region from model-square to original image size
      const { iw, ih, nw, nh, dx, dy } = meta
      const alphaModelCanvas = document.createElement('canvas')
      alphaModelCanvas.width = MODEL_SIZE
      alphaModelCanvas.height = MODEL_SIZE
      const actx = alphaModelCanvas.getContext('2d')!
      actx.putImageData(alphaImage, 0, 0)
      const alphaResizedCanvas = document.createElement('canvas')
      alphaResizedCanvas.width = iw
      alphaResizedCanvas.height = ih
      const aResCtx = alphaResizedCanvas.getContext('2d')!
      aResCtx.drawImage(alphaModelCanvas, dx, dy, nw, nh, 0, 0, iw, ih)
      const alphaResizedImageData = aResCtx.getImageData(0, 0, iw, ih)

      // Compose final output at original image size
      const origCanvas = document.createElement('canvas')
      origCanvas.width = iw
      origCanvas.height = ih
      const origCtx = origCanvas.getContext('2d')!
      origCtx.drawImage(imgRef.current, 0, 0, iw, ih)
      const feathered = featherAlpha(alphaResizedImageData, featherPx, threshold)
      const featheredComposed = compositeWithAlphaSized(origCanvas, feathered)

      if (outRef.current) {
        outRef.current.innerHTML = ''
        const im = document.createElement('img')
        im.src = featheredComposed.toDataURL('image/png')
        im.alt = 'foreground'
        im.className = 'rounded-md shadow-sm w-40 md:w-56'
        outRef.current.appendChild(im)
        const a = document.createElement('a')
        a.href = featheredComposed.toDataURL('image/png')
        a.download = 'fg.png'
        a.textContent = 'Download PNG'
        a.className = 'ml-3 inline-block px-3 py-2 bg-sky-600 text-white rounded-md text-sm hover:bg-sky-700'
        outRef.current.appendChild(a)
      }
      setStatus('done')
    } catch (err: any) {
      console.error(err)
      setStatus('Failed: ' + (err?.message ?? err))
    } finally {
      setProcessing(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg md:text-xl font-semibold text-slate-800">Remove BG (CDN ONNX loader)</h3>
        <div className="text-sm">
          <span className="inline-block mr-2 text-slate-600">Status</span>
          <span
            className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${status === 'done'
              ? 'bg-green-100 text-green-800'
              : status.startsWith('loading') || status.startsWith('runtime') || status.startsWith('running')
                ? 'bg-amber-100 text-amber-800'
                : 'bg-gray-100 text-gray-700'
              }`}
          >
            {status}
          </span>
        </div>
      </div>

      <div className="space-y-4">
        {/* Controls */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="md:col-span-2 space-y-3">
            <label className="block text-sm font-medium text-slate-700">Source image</label>
            <div className="md:flex sm:block gap-2 items-center">
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                onChange={handleFile}
                className="text-sm file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-slate-100 file:text-slate-700 cursor-pointer w-full md:w-auto"
              />
              { /* Load model button */}
              <button
                onClick={loadModel}
                className="px-3 py-2 bg-slate-700 text-white rounded-md text-sm hover:bg-slate-800 w-full mt-[8px] md:min-w-[80px] md:w-auto md:mt-0"
                type="button"
              >
                Load model
              </button>
              { /* Run button */}
              <button
                onClick={run}
                disabled={!imageSrc || processing}
                className={`px-3 py-2 text-white rounded-md text-sm w-full mt-[8px] md:min-w-[80px] md:w-auto md:mt-0 btn ${(!imageSrc || processing) ? 'opacity-50 cursor-not-allowed' : 'hover:bg-sky-700'}`}
                type="button"
              >
                {processing ? "Removing background..." : "Remove Background"}
              </button>
              { /* Reset button */}
              <button
                onClick={() => window.location.reload()}
                className="px-3 py-2 bg-slate-400 text-white rounded-md text-sm hover:bg-slate-500 w-full mt-[8px] md:min-w-[80px] md:w-auto md:mt-0"
                type="button"
              >
                Reset
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div>
                <label className="block text-sm text-slate-600 mb-1">Feather: <span className="font-medium">{featherPx}px</span></label>
                <input
                  type="range"
                  min={0}
                  max={30}
                  value={featherPx}
                  onChange={(e) => setFeatherPx(Number(e.target.value))}
                  className="w-full"
                />
              </div>
              <div>
                <label className="block text-sm text-slate-600 mb-1">Threshold: <span className="font-medium">{Math.round(threshold * 100)}%</span></label>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={Math.round(threshold * 100)}
                  onChange={(e) => setThreshold(Number(e.target.value) / 100)}
                  className="w-full"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Input / Output canvases on larger area */}
        <div className="flex flex-col md:flex-row gap-6 items-start">
          <div className="flex-1">
            <p className="text-sm font-medium text-slate-700 mb-2">Input</p>
            <div className="rounded-md border border-slate-200 bg-white p-3 flex items-center justify-center">
              <div className="w-[192px] h-[192px] md:w-[256px] md:h-[256px] bg-gray-50 rounded-md flex items-center justify-center overflow-hidden">
                {/* actual image element (hidden until loaded) */}
                <img
                  ref={imgRef}
                  alt="input"
                  className="object-contain w-full h-full"
                  style={{ display: imageSrc ? undefined : 'none' }}
                />
                {/* placeholder */}
                {!imageSrc && (
                  <div className="text-sm text-slate-400">No image selected</div>
                )}
              </div>
            </div>
          </div>

          <div className="flex-1">
            <p className="text-sm font-medium text-slate-700 mb-2">Output</p>
            <div className="rounded-md border border-slate-200 bg-white p-3 flex items-center justify-center">
              <div className="rounded-md border border-slate-200 bg-white p-3 w-[192px] h-[192px] md:w-[256px] md:h-[256px] flex items-center justify-center" style={{ backgroundImage: 'url(/pngBg.png)' }}>
                <div ref={outRef} className="flex items-center justify-center gap-3 flex-wrap" />
              </div>
            </div>
          </div>
        </div>

        {/* <div className="text-sm text-slate-500">
        Tip: model assets are loaded from <code className="bg-slate-100 px-1 rounded">/models/bg_remover.onnx</code>. For production host your model on a fast CDN.
      </div> */}
      </div>
    </div >
  )
}
