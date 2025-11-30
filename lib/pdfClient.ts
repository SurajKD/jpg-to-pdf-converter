import { PDFDocument, rgb } from 'pdf-lib'

export async function imagesToPdf(files: File[], options?: { format?: 'A4'|'Letter', quality?: number }): Promise<Blob> {
  const pdfDoc = await PDFDocument.create()
  const fmt = options?.format || 'A4'
  const quality = options?.quality ?? 0.8
  const pageSizes: Record<string, { w: number; h: number }> = {
    A4: { w: 595.28, h: 841.89 },
    Letter: { w: 612, h: 792 }
  }
  const pageSize = pageSizes[fmt]
  for (const file of files) {
    const imgBitmap = await createImageBitmap(await file.arrayBuffer().then(buf => new Blob([buf])))
    // draw to canvas to possibly resize / compress
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')!
    const ratio = Math.min(pageSize.w / imgBitmap.width, pageSize.h / imgBitmap.height, 1)
    canvas.width = Math.floor(imgBitmap.width * ratio)
    canvas.height = Math.floor(imgBitmap.height * ratio)
    ctx.drawImage(imgBitmap, 0, 0, canvas.width, canvas.height)
    const dataUrl = canvas.toDataURL('image/jpeg', quality)
    const imageBytes = await (await fetch(dataUrl)).arrayBuffer()
    const ext = file.type === 'image/png' ? 'png' : 'jpg'
    let embedded
    if (ext === 'png') {
      embedded = await pdfDoc.embedPng(imageBytes)
    } else {
      embedded = await pdfDoc.embedJpg(imageBytes)
    }
    const page = pdfDoc.addPage([pageSize.w, pageSize.h])
    const { width, height } = embedded.scaleToFit(pageSize.w, pageSize.h)
    page.drawImage(embedded, { x: (pageSize.w - width) / 2, y: (pageSize.h - height) / 2, width, height })
  }
  const pdfBytes = await pdfDoc.save()
  return new Blob([Buffer.from(pdfBytes)], { type: 'application/pdf' })
}
