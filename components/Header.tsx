'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function Header() {
  const [open, setOpen] = useState(false)

  const toggleMenu = () => setOpen(!open)

  return (
    <header
      style={{
        padding: "12px 24px",
        borderBottom: "1px solid #eef2f7",
        background: "#fff",
        position: "sticky",
        top: 0,
        zIndex: 99,
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {/* Logo */}
        <Link
          href="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            textDecoration: "none",
          }}
        >
          <img
            src="/anyfileconverterLogo.png"
            alt="AnyFileConverter Logo"
            style={{
              height: "42px",
              width: "auto",   // Auto width as you requested
              objectFit: "contain",
            }}
          />
        </Link>

        {/* Desktop Menu */}
        <nav
          style={{
            display: "flex",
            gap: "20px",
            alignItems: "center",
          }}
          className="desktop-nav"
        >
          <Link href="/tools/jpg-to-pdf" style={navLinkStyle}>Tool</Link>
          <Link href="/blog" style={navLinkStyle}>Blog</Link>
          <Link href="/about" style={navLinkStyle}>About</Link>
          <Link href="/contact" style={navLinkStyle}>Contact</Link>
          <Link href="/privacy" style={navLinkStyle}>Privacy</Link>
        </nav>

        {/* Mobile Hamburger */}
        <button
          onClick={toggleMenu}
          aria-label="Toggle menu"
          className="mobile-menu-btn"
          style={{
            display: "none",
            background: "transparent",
            border: 0,
            cursor: "pointer",
            padding: "6px",
          }}
        >
          <div style={burgerLine}></div>
          <div style={burgerLine}></div>
          <div style={burgerLine}></div>
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {open && (
        <nav
          className="mobile-nav"
          style={{
            marginTop: 12,
            display: "flex",
            flexDirection: "column",
            gap: 12,
            padding: "12px 8px",
            background: "#f9fbff",
            borderRadius: 8,
            border: "1px solid #e2e8f0",
          }}
        >
          <Link onClick={() => setOpen(false)} href="/tools/jpg-to-pdf" style={mobileLinkStyle}>Tool</Link>
          <Link onClick={() => setOpen(false)} href="/blog" style={mobileLinkStyle}>Blog</Link>
          <Link onClick={() => setOpen(false)} href="/about" style={mobileLinkStyle}>About</Link>
          <Link onClick={() => setOpen(false)} href="/contact" style={mobileLinkStyle}>Contact</Link>
          <Link onClick={() => setOpen(false)} href="/privacy" style={mobileLinkStyle}>Privacy</Link>
        </nav>
      )}

      {/* Responsive Style Overrides */}
      <style>{`
        @media (max-width: 768px) {
          .desktop-nav {
            display: none !important;
          }
          .mobile-menu-btn {
            display: block !important;
          }
        }
      `}</style>
    </header>
  )
}

const navLinkStyle: React.CSSProperties = {
  color: "#0b74de",
  textDecoration: "none",
  fontSize: "15px",
  fontWeight: 500,
}

const mobileLinkStyle: React.CSSProperties = {
  color: "#0b74de",
  textDecoration: "none",
  fontSize: "16px",
  fontWeight: 600,
  padding: "8px 4px",
}

const burgerLine: React.CSSProperties = {
  width: "26px",
  height: "3px",
  background: "#0b74de",
  marginBottom: "5px",
  borderRadius: 2,
}
