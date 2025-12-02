import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Terms & Conditions — JPG to PDF Converter",
  description:
    "Terms and conditions for using the JPG to PDF Converter. Read about acceptable use, file handling, privacy, and limitations of liability.",
  alternates: { canonical: "https://jpg-to-pdf-convert.netlify.app/terms" },
}

export default function TermsPage() {
  return (
    <main style={{ padding: 24, maxWidth: 900, margin: "0 auto", lineHeight: 1.7 }}>
      <h1>Terms &amp; Conditions</h1>

      <p style={{ color: "#555" }}>
        Last updated: {new Date().toISOString().split("T")[0]}
      </p>

      <section>
        <h2>1. Acceptance of terms</h2>
        <p>
          By using the JPG → PDF Converter website (the “Service”), you agree to these Terms &amp; Conditions. If you do not agree,
          please do not use the Service. We may update these terms from time to time; continued use after changes means you accept
          the updated terms.
        </p>
      </section>

      <section>
        <h2>2. Description of service</h2>
        <p>
          The Service lets users convert image files (for example JPG, JPEG, PNG) into PDF documents. Conversion is performed
          client-side by default — meaning files are processed in your browser unless you explicitly choose a server-side option.
          The Service is provided "as is" and may change, be suspended, or discontinued at any time.
        </p>
      </section>

      <section>
        <h2>3. User responsibilities</h2>
        <ul>
          <li>You are responsible for the content of files you upload or convert.</li>
          <li>Do not upload or convert content that you do not have the right to use, share, or distribute.</li>
          <li>Do not use the Service for unlawful activities, including but not limited to copyright infringement, harassment,
            or distribution of illegal content.</li>
          <li>If you choose to share converted files using any built-in upload or share feature, you consent to that action.</li>
        </ul>
      </section>

      <section>
        <h2>4. File handling & privacy</h2>
        <p>
          By default, our tool performs conversions locally in your browser so files do not leave your device. If you opt into any
          server-side features (for example, temporary cloud hosting or share links), such files may be uploaded and stored temporarily.
          Any server-side storage is described at the time of the action and will include retention information. If you have concerns
          about file handling, please contact us at<a href="/contact"> our contact page</a>.
        </p>
      </section>

      <section>
        <h2>5. Third-party services</h2>
        <p>
          The Service may include or link to third-party tools, services, or websites. We are not responsible for the privacy practices,
          content, or terms of those third parties. Use of any linked service is at your own risk and governed by that third party's terms.
        </p>
      </section>

      <section>
        <h2>6. Intellectual property</h2>
        <p>
          All content on the site (design, text, code, graphics) is owned or licensed by us unless otherwise noted. You may not copy,
          reproduce, modify, or republish site content without our prior written permission. You retain ownership of the files you upload.
        </p>
      </section>

      <section>
        <h2>7. Limitation of liability</h2>
        <p>
          To the maximum extent permitted by law, the site, its owners, operators, and contributors are not liable for any direct,
          indirect, incidental, consequential, or punitive damages arising from your use of the Service. This includes damages from
          loss of data, loss of business, or inability to use the Service. Use the Service at your own risk.
        </p>
      </section>

      <section>
        <h2>8. No warranties</h2>
        <p>
          The Service is provided without warranties of any kind, express or implied. We do not guarantee error-free operation, suitability
          for a particular purpose, or uninterrupted availability.
        </p>
      </section>

      <section>
        <h2>9. Acceptable use & prohibited content</h2>
        <p>
          You must not use the Service to upload, convert, or distribute illegal, defamatory, obscene, or infringing content. We reserve
          the right to remove content or suspend access if we believe the Service is being used in violation of these terms or applicable law.
        </p>
      </section>

      <section>
        <h2>10. Termination</h2>
        <p>
          We may suspend or terminate the Service (or your access to it) at any time for any reason, including breach of these Terms,
          illegal activity, or abuse. Sections that by their nature should survive termination (such as limitation of liability, intellectual
          property, and governing law) will continue to apply.
        </p>
      </section>

      <section>
        <h2>11. Governing law</h2>
        <p>
          These Terms are governed by the laws of the jurisdiction in which the site operator is located. If any part of these Terms
          is found to be invalid, the remaining provisions will continue in full force and effect.
        </p>
      </section>

      <section>
        <h2>12. Changes to these terms</h2>
        <p>
          We may update these Terms occasionally. We will post changes on this page with an updated "Last updated" date. It is your
          responsibility to review the Terms periodically.
        </p>
      </section>

      <section>
        <h2>13. Contact</h2>
        <p>
          If you have questions or concerns about these Terms, please contact us:<a href="/contact"> our contact page</a>.
        </p>
      </section>

      <p style={{ marginTop: 28, color: "#666", fontSize: 13 }}>
        These terms were generated to reflect common practices for lightweight utility sites. They are not a substitute for legal advice.
        If you need guaranteed legal compliance (for example for business or regional regulations), please consult a qualified attorney.
      </p>
    </main>
  )
}
