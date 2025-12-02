import '../styles/globals.css'
import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <head>
                <meta name="google-site-verification" content="exdUbiV7-HG63XFZG8s1_VA0yBIdJYTcvuSDe9RrH1c" />
                <link rel="icon" href="/favicon.ico" type="image/x-icon"></link>
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
