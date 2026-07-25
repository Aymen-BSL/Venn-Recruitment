import type { Metadata } from "next";
import { Host_Grotesk } from "next/font/google";
import "./globals.css";

const hostGrotesk = Host_Grotesk({
  subsets: ["latin"],
  variable: "--font-host-grotesk",
  display: "swap",
});

const siteUrl = new URL("https://venn-recruitment.vercel.app");
const siteTitle = "Venn Recruitment | Talent & Opportunities That Fit";
const siteDescription =
  "Venn Recruitment connects companies with carefully matched talent and helps professionals find opportunities across the Middle East and international markets.";

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: siteTitle,
  description: siteDescription,
  applicationName: "Venn Recruitment",
  creator: "Venn Recruitment",
  publisher: "Venn Recruitment",
  icons: {
    icon: [{ url: "/venn-favicon.svg?v=2", type: "image/svg+xml" }],
    shortcut: "/venn-favicon.svg?v=2",
  },
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    url: "/",
    siteName: "Venn Recruitment",
    images: [
      {
        url: "/social-preview.png",
        width: 1200,
        height: 630,
        alt: "Venn Recruitment — where the right people and opportunities meet",
        type: "image/png",
      },
    ],
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: ["/social-preview.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={hostGrotesk.variable}>
      <body>{children}</body>
    </html>
  );
}
