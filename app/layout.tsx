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
                <link rel="icon" href="https://anyfileconverter.online/favicon.ico" />
                <link rel="icon" type="image/png" href="https://anyfileconverter.online/favicon-96x96.png" sizes="96x96" />
                <link rel="icon" type="image/svg+xml" href="https://anyfileconverter.online/favicon.svg" />
                <link rel="shortcut icon" href="https://anyfileconverter.online/favicon.ico" />
                <link rel="apple-touch-icon" sizes="180x180" href="https://anyfileconverter.online/apple-touch-icon.png" />
                <link rel="manifest" href="https://anyfileconverter.online/site.webmanifest" />


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
