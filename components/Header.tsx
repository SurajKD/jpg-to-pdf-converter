'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'

export default function Header() {
  const [navOpen, setNavOpen] = useState(false)
  const [toolsOpen, setToolsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement | null>(null)
  const buttonRef = useRef<HTMLButtonElement | null>(null)

  const toggleNav = () => setNavOpen(prev => !prev)
  const toggleTools = () => setToolsOpen(prev => !prev)

  const closeAll = () => {
    setNavOpen(false)
    setToolsOpen(false)
  }

  // Close tools dropdown when clicking outside
  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      const target = e.target as Node
      if (!dropdownRef.current) return
      if (
        dropdownRef.current.contains(target) ||
        (buttonRef.current && buttonRef.current.contains(target))
      ) {
        // click inside dropdown or on the toggle button — keep open / handled by toggle
        return
      }
      setToolsOpen(false)
    }
    if (toolsOpen) {
      document.addEventListener('click', onDocClick)
    }
    return () => document.removeEventListener('click', onDocClick)
  }, [toolsOpen])

  // Close mobile nav when route changes (optional) — Next Link will handle navigation but this helps UX
  useEffect(() => {
    function onRoute() {
      setNavOpen(false)
      setToolsOpen(false)
    }
    // no router import to keep simple; if you want auto close on route change, import useRouter and listen to events.
    return () => {}
  }, [])

  return (
    <nav className="bg-white border-b border-slate-200 fixed w-full z-20 top-0 left-0">
      <div className="max-w-6xl flex flex-wrap items-center justify-between mx-auto px-4 py-3">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
          onClick={closeAll}
        >
          <img
            src="/anyfileconverterLogo.png"
            alt="AnyFileConverter Logo"
            className="h-9 w-auto object-contain"
          />
        </Link>

        {/* Mobile burger */}
        <button
          type="button"
          onClick={toggleNav}
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-slate-700 rounded-lg md:hidden hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-300"
          aria-controls="main-nav"
          aria-expanded={navOpen}
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-6 h-6"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeWidth="2"
              d="M5 7h14M5 12h14M5 17h14"
            />
          </svg>
        </button>

        {/* Desktop / mobile nav */}
        <div
          id="main-nav"
          className={`${navOpen ? 'block' : 'hidden'} w-full md:block md:w-auto`}
        >
          <ul className="flex flex-col md:flex-row md:items-center font-medium p-4 md:p-0 mt-4 md:mt-0 border border-slate-200 md:border-0 rounded-lg bg-slate-50 md:bg-transparent md:space-x-6 m-0">
            {/* Tools dropdown */}
            <li className="relative">
              <button
                ref={buttonRef}
                type="button"
                onClick={toggleTools}
                aria-haspopup="true"
                aria-expanded={toolsOpen}
                className="flex items-center justify-between w-full md:w-auto py-2 px-3 rounded-md text-slate-800 hover:bg-slate-100 md:hover:bg-transparent md:hover:text-[#0b74de] md:px-0"
              >
                Tools
                <svg
                  className="w-4 h-4 ms-1.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 9-7 7-7-7"
                  />
                </svg>
              </button>

              {/* Dropdown menu */}
              <div
                ref={dropdownRef}
                className={`${toolsOpen ? 'block' : 'hidden'} md:absolute md:top-9 md:left-0 z-20 w-52 bg-white border border-slate-200 rounded-lg shadow-lg`}
              >
                <ul className="py-2 text-sm text-slate-700 ml-3 mb-1">
                  <li>
                    <Link
                      href="/tools/jpg-to-pdf"
                      onClick={closeAll}
                      className="inline-flex items-center w-full px-3 py-2 hover:bg-slate-100 hover:text-slate-900"
                    >
                      JPG → PDF
                    </Link>
                  </li>

                  <li>
                    <Link
                      href="/tools/compress-pdf"
                      onClick={closeAll}
                      className="inline-flex items-center w-full px-3 py-2 hover:bg-slate-100 hover:text-slate-900"
                    >
                      Compress PDF
                    </Link>
                  </li>

                  <li>
                    <Link
                      href="/tools/image-compressor"
                      onClick={closeAll}
                      className="inline-flex items-center w-full px-3 py-2 hover:bg-slate-100 hover:text-slate-900"
                    >
                      Image Compressor
                    </Link>
                  </li>

                  {/* <li>
                    <Link
                      href="/tools/bg-remover"
                      onClick={closeAll}
                      className="inline-flex items-center w-full px-3 py-2 hover:bg-slate-100 hover:text-slate-900"
                    >
                      Background Remover
                    </Link>
                  </li> */}

                  <li>
                    <Link
                      href="/tools/pdf-to-word"
                      onClick={closeAll}
                      className="inline-flex items-center w-full px-3 py-2 hover:bg-slate-100 hover:text-slate-900"
                    >
                      PDF → Word
                    </Link>
                  </li>

                  {/* <li>
                    <Link
                      href="/tools/ai-pdf-summarizer"
                      onClick={closeAll}
                      className="inline-flex items-center w-full px-3 py-2 hover:bg-slate-100 hover:text-slate-900"
                    >
                      AI PDF Summarizer
                    </Link>
                  </li> */}
                </ul>
              </div>
            </li>

            {/* Blog */}
            <li>
              <Link
                href="/blog"
                onClick={closeAll}
                className="block py-2 px-3 text-slate-800 rounded-md hover:bg-slate-100 md:hover:bg-transparent md:hover:text-[#0b74de] md:px-0"
              >
                Blog
              </Link>
            </li>

            {/* About */}
            <li>
              <Link
                href="/about"
                onClick={closeAll}
                className="block py-2 px-3 text-slate-800 rounded-md hover:bg-slate-100 md:hover:bg-transparent md:hover:text-[#0b74de] md:px-0"
              >
                About
              </Link>
            </li>

            {/* Contact */}
            <li>
              <Link
                href="/contact"
                onClick={closeAll}
                className="block py-2 px-3 text-slate-800 rounded-md hover:bg-slate-100 md:hover:bg-transparent md:hover:text-[#0b74de] md:px-0"
              >
                Contact
              </Link>
            </li>

            {/* Privacy */}
            <li>
              <Link
                href="/privacy"
                onClick={closeAll}
                className="block py-2 px-3 text-slate-800 rounded-md hover:bg-slate-100 md:hover:bg-transparent md:hover:text-[#0b74de] md:px-0"
              >
                Privacy
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}
