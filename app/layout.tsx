import '../styles/globals.css'
import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'

export const metadata = {
    title: 'JPG to PDF Converter',
    description: 'Convert JPG images to PDF client-side. Privacy-first and fast.'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <head>
                <meta name="google-site-verification" content="exdUbiV7-HG63XFZG8s1_VA0yBIdJYTcvuSDe9RrH1c" />
                <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2307056257132100"
                    crossOrigin="anonymous"></script>
            </head>
            <body>
                <Header />
                <main className="container">{children}</main>
                <Footer />
            </body>
        </html>
    )
}
