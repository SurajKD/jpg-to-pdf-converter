import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "Contact — JPG to PDF Converter",
    description: "Contact page — send feedback, report issues, or request features for the JPG to PDF converter.",
    alternates: { canonical: "https://anyfileconverter.online/contact" },
}

export default function ContactPage() {
    return (
        <main style={{ padding: 24, maxWidth: 700, margin: "0 auto", lineHeight: 1.7 }}>
            <h1>Contact Us</h1>

            <p>
                We welcome feedback, bug reports, and suggestions. If something isn't working or you have an idea for an improvement,
                please drop us a message.
            </p>

            <h2>Contact Form</h2>

            <form action="https://formcarry.com/s/RXbeO77FW4" method="POST" accept-charset="UTF-8" style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <label>
                    Your name
                    <input name="name" type="text" placeholder="Optional" style={{ width: "100%", padding: 8, marginTop: 6 }} />
                </label>

                <label>
                    Your email
                    <input name="email" type="email" placeholder="you@example.com" style={{ width: "100%", padding: 8, marginTop: 6 }} />
                </label>

                <label>
                    Message
                    <textarea name="message" rows={6} placeholder="Tell us what's up" style={{ width: "100%", padding: 8, marginTop: 6 }} />
                </label>
                <input type="hidden" name="website" value="https://anyfileconverter.online/"/>
                <button
                    type="submit"
                    style={{
                        display: "inline-block",
                        marginTop: 8,
                        background: "#0b74de",
                        color: "#fff",
                        padding: "10px 14px",
                        borderRadius: 8,
                        textDecoration: "none",
                        textAlign: "center",
                    }}
                >
                    Send
                </button>

                <input type="hidden" name="_gotcha" />
            </form>
        </main>
    )
}
