import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions — AnyFileConverter.online",
  description:
    "Terms and conditions for using AnyFileConverter.online. Learn about acceptable use, file handling, privacy, intellectual property, and limitations of liability.",
  alternates: { canonical: "https://anyfileconverter.online/terms" },
};

export default function TermsPage() {
  const today = new Date().toISOString().split("T")[0];

  return (
    <main style={{ padding: 24, maxWidth: 900, margin: "0 auto", lineHeight: 1.7 }}>
      <h1>Terms &amp; Conditions</h1>
      <p style={{ color: "#555" }}>Last updated: {today}</p>

      <section>
        <h2>1. Acceptance of Terms</h2>
        <p>
          By using AnyFileConverter.online (the “Service”), you agree to these Terms &amp; Conditions.
          If you do not agree with any part of these Terms, you should discontinue use immediately.
          We may update these Terms periodically; continued use after changes means you accept the updated version.
        </p>
      </section>

      <section>
        <h2>2. Description of Service</h2>
        <p>
          AnyFileConverter.online provides a variety of free online file tools, including but not limited to:
          image converters, PDF utilities, document converters, compression tools, and file optimizers.
        </p>

        <p>
          Most conversions occur <strong>client-side</strong> in your browser, meaning files typically do
          not leave your device. Some optional features may require temporary server uploads, and these are clearly
          labeled before use.
        </p>

        <p>The Service is provided “as is” and may change or be discontinued at any time.</p>
      </section>

      <section>
        <h2>3. User Responsibilities</h2>
        <ul>
          <li>You are responsible for the files you upload, convert, or share.</li>
          <li>You must have the legal right to use, distribute, or process the files you upload.</li>
          <li>You must not use the Service for unlawful activities, including copyright infringement or distribution of illegal content.</li>
          <li>
            If you use optional upload/share features, you consent to the temporary storage and handling required to provide those features.
          </li>
        </ul>
      </section>

      <section>
        <h2>4. File Handling & Privacy</h2>
        <p>
          By default, conversions are performed locally in your browser, and we do not have access to your files.
          Files are not uploaded unless you opt into a feature that requires it.
        </p>

        <p>For optional upload or share features:</p>
        <ul>
          <li>Files may be uploaded and stored temporarily.</li>
          <li>Retention periods (for example, auto-deletion after 24 hours) are clearly stated during use.</li>
          <li>Files are removed after the retention period or when you manually delete them.</li>
        </ul>

        <p>
          For more details, please review our{" "}
          <a href="/privacy" style={{ color: "#0b74de" }}>
            Privacy Policy
          </a>
          .
        </p>
      </section>

      <section>
        <h2>5. Third-Party Services</h2>
        <p>
          The Service may include links to or integrations with third-party services such as analytics providers,
          advertising networks (e.g., Google AdSense), cloud hosting platforms, or external websites.
        </p>

        <p>
          We are not responsible for the content, policies, or practices of any third-party providers. Your use of their services
          is governed by their respective terms and policies.
        </p>
      </section>

      <section>
        <h2>6. Intellectual Property</h2>
        <p>
          All site content, including text, design, layout, graphics, and code, is owned or licensed by us unless otherwise indicated.
          You may not reproduce, modify, distribute, or republish any part of the Service without written permission.
        </p>

        <p>
          You retain full ownership of any files you upload. We make no claims over your original content.
        </p>
      </section>

      <section>
        <h2>7. Limitation of Liability</h2>
        <p>
          To the fullest extent permitted by law, AnyFileConverter.online and its operators are not liable for any damages,
          including but not limited to loss of data, loss of business, file corruption, or inability to use the Service.
        </p>

        <p>You use the Service entirely at your own risk.</p>
      </section>

      <section>
        <h2>8. No Warranties</h2>
        <p>
          The Service is provided without warranties of any kind, express or implied. We do not guarantee:
        </p>

        <ul>
          <li>Uninterrupted or error-free operation</li>
          <li>Accuracy or suitability for any specific purpose</li>
          <li>Security of uploaded files beyond reasonable measures</li>
        </ul>

        <p>
          If you use the Service for sensitive or critical files, you should verify results and maintain backups.
        </p>
      </section>

      <section>
        <h2>9. Acceptable Use & Prohibited Activities</h2>
        <p>You agree NOT to use the Service to:</p>

        <ul>
          <li>Upload or convert illegal, harmful, or defamatory content</li>
          <li>Infringe on intellectual property rights</li>
          <li>Harass, exploit, or harm others</li>
          <li>Attempt to bypass or disrupt site security</li>
          <li>Automate high-volume or abusive requests</li>
        </ul>

        <p>
          We may suspend or terminate access for violations of these Terms or applicable law.
        </p>
      </section>

      <section>
        <h2>10. Termination</h2>
        <p>
          We reserve the right to suspend or terminate the Service, or your access to it, at any time and for any reason,
          including misuse, breach of terms, or operational necessity.
        </p>

        <p>
          Sections that logically survive termination (e.g., liability limits, intellectual property) will remain in effect.
        </p>
      </section>

      <section>
        <h2>11. Governing Law</h2>
        <p>
          These Terms are governed by the laws applicable in the jurisdiction of the site operator.
          If any provision is found unenforceable, remaining sections remain in full effect.
        </p>
      </section>

      <section>
        <h2>12. Changes to These Terms</h2>
        <p>
          We may update these Terms as needed. Updated versions will be posted on this page along with a revised
          “Last updated” date. It is your responsibility to review Terms periodically.
        </p>
      </section>

      <section>
        <h2>13. Contact</h2>
        <p>
          For questions about these Terms, please contact us via the{" "}
          <a href="/contact" style={{ color: "#0b74de" }}>
            Contact page
          </a>
          .
        </p>
      </section>

      <p style={{ marginTop: 28, color: "#666", fontSize: 13 }}>
        These Terms are designed to reflect common standards for utility websites and online tools. They are not legal advice;
        for legally binding or region-specific requirements, please consult an attorney.
      </p>
    </main>
  );
}
