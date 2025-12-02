import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — AnyFileConverter.online",
  description:
    "Learn how AnyFileConverter.online handles your data. We prioritize privacy by default: most conversions run client-side and files are not stored unless you opt in.",
  alternates: { canonical: "https://anyfileconverter.online/privacy" },
};

export default function PrivacyPage() {
  const lastUpdated = new Date().toISOString().split("T")[0];

  return (
    <main style={{ padding: 24, maxWidth: 900, margin: "0 auto", lineHeight: 1.7 }}>
      <h1>Privacy Policy</h1>
      <p style={{ color: "#555" }}>Last updated: {lastUpdated}</p>

      <section>
        <h2>1. Introduction</h2>
        <p>
          Your privacy matters to us. This Privacy Policy explains what information we may collect, how we use it,
          and the choices you have when using AnyFileConverter.online (the “Service”). Our core principle: provide
          useful conversion tools while keeping your files private and under your control.
        </p>
      </section>

      <section>
        <h2>2. File processing (Images, PDFs & other files)</h2>
        <p>
          By default, most conversion operations on AnyFileConverter.online occur <strong>entirely in your browser</strong>.
          This means your files are processed locally on your device and <strong>are not uploaded to our servers</strong>
          unless you explicitly choose a feature that requires server-side handling (for example, temporary public sharing).
        </p>

        <p>This default approach means:</p>
        <ul>
          <li>We do <strong>not</strong> receive, view, or store your files during client-side conversions.</li>
          <li>Conversions are fast and run on the device to maximize privacy.</li>
          <li>If you opt into an upload/share feature, we will clearly state what is uploaded and for how long it will be stored.</li>
        </ul>
      </section>

      <section>
        <h2>3. Personal data we collect</h2>
        <p>
          We do not collect personal data unless you voluntarily provide it (for example, via a contact form). Minimal
          technical data may be collected automatically to help us improve the Service.
        </p>

        <ul>
          <li>
            <strong>Basic technical data</strong> — browser type, OS, screen size, and aggregate usage statistics used
            for performance and debugging.
          </li>
          <li>
            <strong>Anonymous analytics</strong> — aggregated visitor counts and page usage. These analytics do not include
            your uploaded files or personally identifying file contents.
          </li>
          <li>
            <strong>Contact information</strong> — only if you use the contact form or email us directly; we use this
            information strictly to respond to your inquiry.
          </li>
        </ul>
      </section>

      <section>
        <h2>4. Cookies & analytics</h2>
        <p>
          We may use cookies and analytics tools (such as Google Analytics) to gather anonymous usage data. Cookies help
          us improve the website and measure performance. These cookies do not track the content of your files.
        </p>

        <p>
          You can disable cookies in your browser settings. If you prefer not to be included in analytics, you can
          opt out using browser controls or advertising opt-out tools provided by third parties.
        </p>
      </section>

      <section>
        <h2>5. Advertising & third-party services</h2>
        <p>
          The Service may display advertisements (e.g., Google AdSense) to fund the project. Third-party ad providers
          may use cookies or device identifiers to serve relevant ads and measure performance.
        </p>

        <p>
          To opt out of personalized advertising, visit:
          <br />
          <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer">
            https://www.google.com/settings/ads
          </a>
        </p>

        <p>
          Ads are placed thoughtfully and are not embedded inside tool input areas where accidental clicks could occur.
          We follow ad provider policies and industry best practices.
        </p>
      </section>

      <section>
        <h2>6. Third-party links & services</h2>
        <p>
          AnyFileConverter.online may contain links to third-party websites or use third-party services (CDNs, analytics,
          ad networks). We are not responsible for the privacy practices of those third parties. Please review their
          privacy policies separately.
        </p>
      </section>

      <section>
        <h2>7. Temporary uploads & sharing (optional features)</h2>
        <p>
          Some optional features (for example, creating a temporary public link to share a converted file) require files
          to be uploaded to our server or cloud storage. These features are strictly opt-in and will include a clear notice
          and retention period. We will remove such files automatically after the stated retention period (for example,
          24 hours) unless you delete them earlier.
        </p>

        <p>
          If you use any upload or sharing feature, we recommend you avoid uploading sensitive information unless you are
          comfortable with the temporary storage and retention policy shown at the time of upload.
        </p>
      </section>

      <section>
        <h2>8. Data security</h2>
        <p>
          Because client-side conversion is the default, your files typically never traverse the network during processing,
          which reduces exposure. Any server interactions (for optional features) use HTTPS to protect data in transit.
        </p>

        <p>
          We take reasonable measures to protect data and infrastructure, but no system can be guaranteed 100% secure.
          If you have specific security concerns, please contact us via the Contact page.
        </p>
      </section>

      <section>
        <h2>9. Children’s privacy</h2>
        <p>
          The Service is not intended for children under 13. We do not knowingly collect personal information from children.
          If you believe a child has provided us with personal data, please contact us.
        </p>
      </section>

      <section>
        <h2>10. Your rights</h2>
        <p>Where applicable, you have the right to:</p>
        <ul>
          <li>Request access to the personal data you provided (if any).</li>
          <li>Request deletion of any personal data you voluntarily shared.</li>
          <li>Opt out of analytics and cookies where possible.</li>
        </ul>
      </section>

      <section>
        <h2>11. Changes to this policy</h2>
        <p>
          We may update this Privacy Policy as the Service evolves. We will post the updated policy here with a revised
          “Last updated” date.
        </p>
      </section>

      <section>
        <h2>12. Contact</h2>
        <p>
          If you have questions about this Privacy Policy or your data, please visit our <a href="/contact">Contact page</a>
          or email us at the address listed there.
        </p>
      </section>

      <p style={{ marginTop: 32, color: "#666", fontSize: 13 }}>
        This policy is designed to be compatible with common ad network policies and privacy best practices. It is for
        informational purposes and does not constitute legal advice. If you need legal advice, consult a qualified attorney.
      </p>
    </main>
  );
}
