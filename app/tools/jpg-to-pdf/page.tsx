import dynamic from 'next/dynamic'
import AdPlaceholder from '../../../components/AdPlaceholder'
const DropzoneClient = dynamic(() => import('../../../components/DropzoneClient'), { ssr: false })

export const metadata = {
  title: 'JPG to PDF Converter Tool | Free Online Conversion',
  description: 'Instantly convert JPG and PNG images to PDF. Reorder images, adjust quality, and download. No uploads, completely private conversion in your browser.'
}

export default function ToolPage() {
  return (
    <>
      <section>
        <h1>JPG to PDF Converter Tool</h1>
        <p className="small">Drag & drop JPG/PNG files, reorder, and convert to a single PDF document instantly.</p>
        
        <div className="card" style={{marginTop:12}}>
          <DropzoneClient />
        </div>
        
        <div style={{marginTop:12}}>
          <AdPlaceholder />
        </div>

        <article style={{marginTop:32, lineHeight: 1.6}}>
          <h2>How to Use the JPG to PDF Converter</h2>
          <p>
            Our tool makes it simple to convert your JPG images to PDF format. The process is intuitive and requires just a few clicks. All conversion happens directly in your browser, ensuring your images remain completely private and secure.
          </p>

          <h3>Step-by-Step Instructions</h3>
          <ol style={{marginLeft: 20}}>
            <li><strong>Upload Images:</strong> Drag and drop your JPG or PNG files into the converter area, or click to browse your device and select multiple images at once.</li>
            <li><strong>Preview:</strong> Your images will appear as thumbnails below the upload area so you can verify they're correct.</li>
            <li><strong>Reorder (Optional):</strong> If you need to change the order of your images in the final PDF, simply drag and drop them to rearrange.</li>
            <li><strong>Remove (Optional):</strong> Click the "Remove" button on any image you don't want to include.</li>
            <li><strong>Convert:</strong> Click the "Convert to PDF" button to start the conversion process.</li>
            <li><strong>Download:</strong> Your PDF will download automatically to your device. No email or registration required.</li>
          </ol>

          <h3>Converter Features</h3>
          <ul style={{marginLeft: 20}}>
            <li><strong>Multiple Image Support:</strong> Convert 2, 5, 10, or even 100+ images into a single PDF document.</li>
            <li><strong>Drag & Drop Reordering:</strong> Arrange your images in any order before conversion.</li>
            <li><strong>Page Size Options:</strong> Choose between A4, Letter, and other standard page sizes.</li>
            <li><strong>Quality Control:</strong> Adjust compression settings to balance between file size and image quality.</li>
            <li><strong>Orientation Support:</strong> Automatically detect and maintain proper portrait or landscape orientation.</li>
            <li><strong>Format Support:</strong> Works with JPG, JPEG, and PNG image formats.</li>
            <li><strong>Instant Download:</strong> Get your PDF immediately after conversion completes.</li>
          </ul>

          <h3>Why Choose Our Tool?</h3>
          <p>
            Unlike other online converters, our tool prioritizes your privacy. Everything happens on your device using advanced browser technology. We never upload, store, or process your images on our servers. Your data stays yours.
          </p>
          <p>
            The conversion is also incredibly fast. Most PDFs generate in just a few seconds, regardless of how many images you're converting. And it's completely free—no hidden charges, no premium accounts, no limits.
          </p>

          <h3>Common Uses</h3>
          <ul style={{marginLeft: 20}}>
            <li>Scanning documents and combining them into a single PDF</li>
            <li>Creating photo albums or portfolios</li>
            <li>Preparing images for printing</li>
            <li>Converting receipts and invoices to digital format</li>
            <li>Archiving old photographs</li>
            <li>Creating presentations or ebooks</li>
            <li>Organizing screenshots and documentation</li>
          </ul>

          <h3>Tips for Best Results</h3>
          <ul style={{marginLeft: 20}}>
            <li>Ensure your images are clear and properly lit before conversion</li>
            <li>Arrange images in the correct order before clicking convert</li>
            <li>Use high-quality source images for the best PDF output</li>
            <li>Consider your needs when adjusting quality settings (higher quality = larger file size)</li>
            <li>Test with a small batch if converting many images for the first time</li>
          </ul>
        </article>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "JPG to PDF Converter",
        "description": "Convert JPG and PNG images to PDF online. Secure, private, and instant conversion in your browser.",
        "url": "https://jpg-to-pdf-convert.netlify.app/tools/jpg-to-pdf",
        "applicationCategory": "Utility",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        }
      })}} />
    </>
  )
}
