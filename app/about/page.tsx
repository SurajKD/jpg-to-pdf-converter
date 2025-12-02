import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About — AnyFileConverter.online",
  description:
    "Learn about AnyFileConverter.online – a fast, private, and secure set of file conversion tools built to help users convert, compress, and manage files easily.",
  alternates: { canonical: "https://anyfileconverter.online/about" },
};

export default function AboutPage() {
  return (
    <main
      style={{
        padding: 24,
        maxWidth: 900,
        margin: "0 auto",
        lineHeight: 1.7,
      }}
    >
      <h1>About AnyFileConverter</h1>

      <p style={{ color: "#555" }}>
        AnyFileConverter.online was created with a simple goal — to offer fast,
        reliable, and privacy-focused tools for converting and managing files.
        What started as a small JPG → PDF converter has grown into a broader
        platform designed to help students, professionals, designers, and anyone
        who needs quick, no-signup utilities directly in the browser.
      </p>

      <h2>Our Mission</h2>
      <p>
        We believe that basic digital tools should be <strong>free</strong>,
        <strong>easy to use</strong>, and <strong>privacy-friendly</strong>.
        Many online converters upload your files to a server, process them
        remotely, and store them unnecessarily. We take a different approach.
      </p>

      <h2>Privacy-First Approach</h2>
      <p>
        Most conversions on AnyFileConverter happen completely in your browser
        (client-side). This means:
      </p>

      <ul>
        <li>
          <strong>Your files never leave your device</strong> during normal
          conversions.
        </li>
        <li>
          <strong>No accounts or sign-ups</strong> are needed — just convert and
          download.
        </li>
        <li>
          <strong>No file retention</strong> — nothing is stored on our servers
          unless you explicitly use a tool that requires temporary uploads.
        </li>
      </ul>

      <h2>Why it’s Free</h2>
      <p>
        The project is supported through lightweight, policy-compliant ads. This
        allows us to keep all essential file tools free to use while funding
        platform improvements and new tools. Our goal is to keep the experience
        simple, clean, and accessible to everyone.
      </p>

      <h2>Tools We Provide</h2>
      <p>
        We are constantly expanding our list of tools. Current and upcoming
        utilities include:
      </p>

      <ul>
        <li>JPG → PDF Converter</li>
        <li>PNG → JPG Converter</li>
        <li>PDF Merge & Split tools</li>
        <li>Compress PDF</li>
        <li>PDF → JPG</li>
        <li>Word ↔ PDF Converters</li>
        <li>Image optimizers & more</li>
      </ul>

      <h2>Our Commitment</h2>
      <p>
        Speed, simplicity, and security are the foundation of
        AnyFileConverter.online. Whether you're a student submitting assignments
        or a professional working with documents, we want to save you time and
        make file management effortless.
      </p>

      <h2>Want to Help?</h2>
      <p>
        If you enjoy using our tools, please share the site or send feedback
        through the Contact page. Your support helps small projects grow and
        keeps free tools alive.
      </p>

      <p style={{ marginTop: 28, color: "#666" }}>— The AnyFileConverter Team</p>
    </main>
  );
}
