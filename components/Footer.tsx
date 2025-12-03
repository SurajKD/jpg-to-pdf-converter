import Link from "next/link";

export default function Footer() {
  return (
    <footer
      className="footerAFC"
      style={{
        marginTop: 40,
        padding: "32px 24px",
        borderTop: "1px solid #eef2f7",
        background: "#fafbfd",
      }}
    >
      <div
        style={{
          maxWidth: 1000,
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          gap: 24,
        }}
      >
        {/* Top Footer Section */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 32,
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >

          {/* Brand Section */}
          <div style={{ flex: "1 1 250px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <img
                src="/anyfileconverterLogo.png"
                alt="AnyFileConverter Logo"
                style={{
                  height: "42px",
                  width: "auto",
                  objectFit: "contain",
                }}
              />
            </div>

            <p style={{ margin: "8px 0 0", color: "#666", fontSize: 14 }}>
              © {new Date().getFullYear()} AnyFileConverter.online<br />
              Fast, secure & privacy-first file tools.
            </p>
          </div>

          {/* Footer Navigation 1 */}
          <nav style={{ flex: "1 1 200px", fontSize: 14 }}>
            <h4 style={{ margin: "0 0 8px", fontWeight: 600, fontSize: 15 }}>
              Quick Links
            </h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, lineHeight: "1.7" }}>
              <li><Link href="/">Home</Link></li>
              <li><Link href="/tools/jpg-to-pdf">JPG → PDF Tool</Link></li>
              <li><Link href="/blog">Blog</Link></li>
            </ul>
          </nav>

          {/* Footer Navigation 2 */}
          <nav style={{ flex: "1 1 200px", fontSize: 14 }}>
            <h4 style={{ margin: "0 0 8px", fontWeight: 600, fontSize: 15 }}>
              Site Info
            </h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, lineHeight: "1.7" }}>
              <li><Link href="/about">About</Link></li>
              <li><Link href="/contact">Contact</Link></li>
              <li><Link href="/privacy">Privacy Policy</Link></li>
              <li><Link href="/terms">Terms & Conditions</Link></li>
            </ul>
          </nav>

        </div>

        {/* Bottom Disclaimer */}
        <div style={{ fontSize: 13, color: "#777", marginTop: 8 }}>
          This site uses client-side processing to keep your files private.  
          No images are uploaded to any server by default.
        </div>
      </div>
    </footer>
  );
}
