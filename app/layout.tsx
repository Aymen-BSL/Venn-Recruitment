import type { Metadata } from "next";
import { Host_Grotesk } from "next/font/google";
import "./globals.css";

const hostGrotesk = Host_Grotesk({
  subsets: ["latin"],
  variable: "--font-host-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://example.com"),
  title: "Venn Recruitment | [Page title]",
  description: "[Meta description for Venn Recruitment]",
  icons: {
    icon: [{ url: "/venn-favicon.svg?v=2", type: "image/svg+xml" }],
    shortcut: "/venn-favicon.svg?v=2",
  },
  openGraph: {
    title: "Venn Recruitment | [Open Graph title]",
    description: "[Open Graph description]",
    images: [{ url: "/social-preview.svg", width: 1200, height: 630 }],
    type: "website",
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
