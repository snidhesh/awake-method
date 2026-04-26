import type { Metadata } from "next";
import { Inter, Playfair_Display, DM_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  style: ["normal", "italic"],
});

const dmMono = DM_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: {
    default: "The AWAKE Method — Cecilia Reinaldo",
    template: "%s | AWAKE Method",
  },
  description:
    "Customer Experience is the Strategy. Cecilia Reinaldo helps you review your customer journey, convert more sales, and build loyalty that lasts.",
  keywords: [
    "customer experience",
    "sales coaching",
    "AWAKE method",
    "Cecilia Reinaldo",
    "keynote speaker",
    "Dubai",
    "CX training",
    "hospitality",
    "real estate",
  ],
  openGraph: {
    title: "The AWAKE Method — Cecilia Reinaldo",
    description:
      "Customer Experience is the Strategy. Presence Is the Product.",
    url: "https://awake-method.com",
    siteName: "The AWAKE Method",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "The AWAKE Method — Cecilia Reinaldo",
    description:
      "Customer Experience is the Strategy. Presence Is the Product.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} ${dmMono.variable}`}
    >
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
