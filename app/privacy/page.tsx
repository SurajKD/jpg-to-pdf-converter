import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — JPG to PDF Converter",
  description:
    "Learn how JPG to PDF Converter handles your data. We use client-side processing, store no uploaded files, and prioritize your privacy.",
  alternates: { canonical: "https://anyfileconverter.online/privacy" },
};

export default function PrivacyPage() {
  return (
    <main style={{ padding: 24, maxWidth: 900, margin: "0 auto", lineHeight: 1.7 }}>
      <h1>Privacy Policy</h1>
      <p style={{ color: "#555" }}>Last updated: {new Date().toISOString().split("T")[0]}</p>

      <section>
        <h2>1. Introduction</h2>
        <p>
          Your privacy is extremely important to us. This Privacy Policy explains what information we collect,
          how we use it, and what rights you have when using the JPG → PDF Converter (“Service”).  
          Our goal is to keep your data safe, private, and fully within your control.
        </p>
      </section>

      <section>
        <h2>2. File processing (Images & PDFs)</h2>
        <p>
          The JPG → PDF conversion happens <strong>directly in your browser</strong>.
          Your images are processed locally on your device and <strong>never uploaded to our servers by default</strong>.
        </p>

        <p>This means:</p>
        <ul>
          <li>We do <strong>not</strong> store your images.</li>
          <li>We do <strong>not</strong> monitor, access, or view your files.</li>
          <li>No one (including us) sees your documents.</li>
        </ul>

        <p>
          If we introduce optional cloud features in the future (like “share PDF online” or “store file temporarily”),
          these features will be <strong>opt-in</strong>, clearly labeled, and include separate data handling explanations.
        </p>
      </section>

      <section>
        <h2>3. Personal data we collect</h2>
        <p>We do not collect personal information unless you voluntarily contact us.</p>

        <p>The Service may collect:</p>
        <ul>
          <li><strong>Basic device data</strong> (browser type, screen size, OS) — used for performance optimization only.</li>
          <li>
            <strong>Anonymous analytics</strong>, such as number of visitors — used to improve the site.
            These do not include your uploaded files or personally identifiable information.
          </li>
        </ul>
      </section>

      <section>
        <h2>4. Cookies & analytics</h2>
        <p>
          We may use analytics tools (e.g., Google Analytics or privacy-friendly alternatives) to collect anonymous data
          about site usage. These cookies do <strong>not</strong> track your documents or personal identity.
        </p>

        <p>You can disable cookies in your browser at any time.</p>
      </section>

      <section>
        <h2>5. Google AdSense & third-party advertising</h2>
        <p>
          This website may display ads through Google AdSense. Google may use cookies such as
          <strong> DoubleClick / Personalized Ads cookies</strong> to:
        </p>

        <ul>
          <li>Show relevant advertisements</li>
          <li>Limit repetitive ad display</li>
          <li>Measure ad performance</li>
        </ul>

        <p>
          You can opt out of personalized advertising at:
          <br />
          <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer">
            https://www.google.com/settings/ads
          </a>
        </p>

        <p>
          No ads are placed inside tool interfaces where accidental clicks may occur, in compliance with AdSense policies.
        </p>
      </section>

      <section>
        <h2>6. Third-party links</h2>
        <p>
          Our Service may link to other websites. We are not responsible for the privacy practices of third-party sites.
          We encourage you to review their privacy policies individually.
        </p>
      </section>

      <section>
        <h2>7. Children’s privacy</h2>
        <p>
          This website is not specifically intended for children under 13. We do not knowingly collect personal data from children.
        </p>
      </section>

      <section>
        <h2>8. Data security</h2>
        <p>
          Because file processing occurs on your device, your documents never travel across the internet during conversion.
          This provides a high level of data protection.
        </p>
        <p>
          Any optional server interactions (if introduced later) will use HTTPS for secure communication.
        </p>
      </section>

      <section>
        <h2>9. Your rights</h2>
        <p>You have the right to:</p>
        <ul>
          <li>Request deletion of any information you voluntarily shared with us</li>
          <li>Opt out of cookies or analytics</li>
          <li>Request information about stored data (if any)</li>
        </ul>
      </section>

      <section>
        <h2>10. Future updates</h2>
        <p>
          We may update this privacy policy if new features or regulations require changes.
          Updated policies will be posted on this page with a new "Last updated" date.
        </p>
      </section>

      <section>
        <h2>11. Contact us</h2>
        <p>If you have any questions about this Privacy Policy, contact us: <a href="/contact">our contact page</a></p>
      </section>

      <p style={{ marginTop: 32, color: "#666", fontSize: 13 }}>
        This policy was written to comply with AdSense, GDPR-friendly guidelines, and privacy best practices.
      </p>
    </main>
  );
}
