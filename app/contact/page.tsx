import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact — AnyFileConverter.online",
  description:
    "Contact the AnyFileConverter team — send feedback, request features, or report issues.",
  alternates: { canonical: "https://anyfileconverter.online/contact" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  "url": "https://anyfileconverter.online/contact",
  "name": "Contact AnyFileConverter",
  "description": "Send feedback, request new features, or report issues.",
};

export default function ContactPage() {
  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="max-w-4xl mx-auto px-4 py-10">
        <article className="prose prose-lg">
          <h1 className="text-3xl font-semibold">Contact Us</h1>

          <p className="text-gray-600">
            We appreciate your feedback, bug reports, and feature suggestions. If something
            isn’t working or you want to request a new tool, just drop us a message using
            the form below.
          </p>

          <h2 className="text-2xl font-semibold">Contact Form</h2>

          <form
            action="https://formcarry.com/s/RXbeO77FW4"
            method="POST"
            acceptCharset="UTF-8"
            className="flex flex-col gap-6 mt-4"
          >
            <div className="flex flex-col">
              <label className="font-medium">Your name</label>
              <input
                name="name"
                type="text"
                placeholder="Optional"
                className="border border-gray-300 rounded-lg px-3 py-2 mt-1 focus:outline-none focus:ring focus:ring-blue-200"
              />
            </div>

            <div className="flex flex-col">
              <label className="font-medium">Your email</label>
              <input
                name="email"
                type="email"
                placeholder="you@example.com"
                className="border border-gray-300 rounded-lg px-3 py-2 mt-1 focus:outline-none focus:ring focus:ring-blue-200"
              />
            </div>

            <div className="flex flex-col">
              <label className="font-medium">Message</label>
              <textarea
                name="message"
                rows={6}
                placeholder="Tell us what's up"
                className="border border-gray-300 rounded-lg px-3 py-2 mt-1 resize-none focus:outline-none focus:ring focus:ring-blue-200"
              ></textarea>
            </div>

            <input type="hidden" name="website" value="https://anyfileconverter.online/" />
            <input type="hidden" name="_gotcha" />

            {/* Button */}
            <div className="mt-2">
              <button
                type="submit"
                className="btn px-4 py-2 rounded-lg text-white font-medium"
              >
                Send
              </button>
            </div>
          </form>
        </article>
      </main>
    </>
  );
}
