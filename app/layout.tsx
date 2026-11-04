import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", weight: ["400", "500", "600", "700", "800"] });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono", weight: ["400", "500"] });

const description =
  "Mandar Joshi is a software engineer contributing to Supabase, FOSSology and Elixir, and the author of Stampede, a load-testing library for Phoenix.";

export const metadata: Metadata = {
  metadataBase: new URL("https://mandarjoshi.me"),
  title: "Mandar Joshi · Software Engineer",
  description,
  alternates: { canonical: "/" },
  icons: { icon: "/favicon.svg" },
  openGraph: {
    title: "Mandar Joshi · Software Engineer",
    description: "Open source work on Supabase, FOSSology and Elixir, and Stampede, a load-testing library for Phoenix.",
    url: "https://mandarjoshi.me",
    type: "website",
    images: ["/images/profile.jpg"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${mono.variable}`} suppressHydrationWarning>
      <body>
        {children}
        <Script src="/js/app.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
