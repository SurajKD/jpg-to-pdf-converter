import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Script from 'next/script'
import './globals.css'

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <head>
                {/* Favicon */}
                <link rel="icon" href="/favicon.ico" type="image/x-icon" />

                {/* Google Analytics */}
                <Script
                    async
                    src="https://www.googletagmanager.com/gtag/js?id=G-VHBD43982P"
                    strategy="lazyOnload"
                />

                <Script id="google-analytics" strategy="lazyOnload">
                    {`
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());
                        gtag('config', 'G-VHBD43982P');
                    `}
                </Script>
            </head>

             <body className="pt-16 bg-[var(--bg)]">
                <Header />
                <main className="container">{children}</main>
                <Footer />
            </body>
        </html>
    )
}
