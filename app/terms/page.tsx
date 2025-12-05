// app/terms/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import dynamic from "next/dynamic";
import React from "react";

const AdPlaceholder = dynamic(() => import("../../components/AdPlaceholder"), {
  ssr: false,
  loading: () => <div className="h-24" />,
});

export const metadata: Metadata = {
  title: "Terms & Conditions — AnyFileConverter.online",
  description:
    "Terms and conditions for using AnyFileConverter.online. Learn about acceptable use, file handling, privacy, intellectual property, and limitations of liability.",
  alternates: { canonical: "https://anyfileconverter.online/terms" },
};

export default function TermsPage() {
  const today = new Date().toISOString().split("T")[0];

  const pageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "url": "https://anyfileconverter.online/terms",
    "name": "Terms & Conditions — AnyFileConverter",
    "description":
      "Terms and conditions for using AnyFileConverter.online including acceptable use, file handling and liability limits."
  };

  const tosJsonLd = {
    "@context": "https://schema.org",
    "@type": "TermsOfService",
    "url": "https://anyfileconverter.online/terms",
    "name": "AnyFileConverter Terms & Conditions",
    "datePublished": today
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(tosJsonLd) }} />

      <main className="max-w-4xl mx-auto px-4 py-10">
        <article className="prose prose-lg">
          <header>
            <h1 className="text-3xl font-semibold mt-0">Terms &amp; Conditions</h1>
            <p className="text-gray-600">Last updated: {today}</p>
          </header>

          <section>
            <h2 className="text-2xl font-semibold">1. Acceptance of Terms</h2>
            <p>
              By using AnyFileConverter.online (the “Service”), you agree to these Terms &amp; Conditions.
              If you do not agree with any part of these Terms, discontinue use immediately. We may update
              these Terms periodically; continued use after changes indicates acceptance of the updated version.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold">2. Description of Service</h2>
            <p>
              AnyFileConverter.online provides free online file tools, including image converters, PDF utilities,
              document converters, compression tools, and file optimizers. Most conversions occur <strong>client-side</strong>
              in your browser, meaning files typically do not leave your device. Some optional features may require temporary
              server uploads and are clearly labeled before use.
            </p>
            <p>The Service is provided "as is" and may change or be discontinued at any time.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold">3. User Responsibilities</h2>
            <ul>
              <li>You are responsible for the files you upload, convert, or share.</li>
              <li>You must have the legal right to use, distribute, or process the files you upload.</li>
              <li>You must not use the Service for unlawful activities, including copyright infringement or distribution of illegal content.</li>
              <li>If you use optional upload/share features, you consent to the temporary storage and handling required to provide those features.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold">4. File Handling &amp; Privacy</h2>
            <p>
              By default, conversions are performed locally in your browser, and we do not have access to your files unless you opt into
              a feature that requires uploads. For optional upload features, retention periods (for example, auto-deletion after 24 hours)
              are clearly stated during use.
            </p>
            <p>
              For more details, please review our <Link href="/privacy" className="underline">Privacy Policy</Link>.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold">5. Third-Party Services</h2>
            <p>
              The Service may include links to or integrations with third-party services such as analytics providers,
              advertising networks (for example, Google AdSense), cloud hosting platforms, or external websites. We are not
              responsible for the content, policies, or practices of those third parties.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold">6. Intellectual Property</h2>
            <p>
              All site content — text, design, layout, graphics, and code — is owned or licensed by us unless otherwise indicated.
              You may not reproduce, modify, distribute, or republish any part of the Service without written permission.
            </p>
            <p>You retain ownership of any files you upload. We make no claims over your original content.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold">7. Limitation of Liability</h2>
            <p>
              To the fullest extent permitted by law, AnyFileConverter.online and its operators are not liable for damages,
              including but not limited to loss of data, loss of business, file corruption, or inability to use the Service.
            </p>
            <p>You use the Service entirely at your own risk.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold">8. No Warranties</h2>
            <p>
              The Service is provided without warranties of any kind, express or implied. We do not guarantee uninterrupted or
              error-free operation, accuracy or suitability for a specific purpose, or absolute security of uploaded files.
            </p>
            <p>
              If you use the Service for sensitive files, verify results and maintain backups.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold">9. Acceptable Use &amp; Prohibited Activities</h2>
            <p>You agree NOT to use the Service to:</p>
            <ul>
              <li>Upload or convert illegal, harmful, or defamatory content</li>
              <li>Infringe on intellectual property rights</li>
              <li>Harass, exploit, or harm others</li>
              <li>Attempt to bypass or disrupt site security</li>
              <li>Automate high-volume or abusive requests</li>
            </ul>
            <p>We may suspend or terminate access for violations of these Terms or applicable law.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold">10. Termination</h2>
            <p>
              We reserve the right to suspend or terminate the Service, or your access to it, at any time and for any reason,
              including misuse, breach of terms, or operational necessity. Sections that logically survive termination (for example,
              liability limits and intellectual property) will remain in effect.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold">11. Governing Law</h2>
            <p>
              These Terms are governed by the laws applicable in the jurisdiction of the site operator. If any provision is found
              unenforceable, remaining sections remain in full effect.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold">12. Changes to These Terms</h2>
            <p>
              We may update these Terms as needed. Updated versions will be posted on this page along with a revised “Last updated”
              date. It is your responsibility to review Terms periodically.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold">13. Contact</h2>
            <p>
              For questions about these Terms, please contact us via the <Link href="/contact" className="underline">Contact page</Link>.
            </p>
          </section>

          <p className="mt-8 text-gray-600 text-sm">
            These Terms are intended to reflect common standards for utility websites and online tools. They are not legal advice;
            for legally binding or region-specific requirements, consult an attorney.
          </p>

          <div className="mt-6">
            <Link href="/contact"><button className="btn px-4 py-2 rounded-lg text-white font-medium">Contact us</button></Link>
          </div>
        </article>

        <div className="mt-8">
          <AdPlaceholder />
        </div>
      </main>
    </>
  );
}
