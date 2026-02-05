import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { cn } from "@/lib/utils";
import BackgroundWrapper from "@/components/BackgroundWrapper";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains-mono" });

export const metadata: Metadata = {
  title: "Mandar Joshi | Full Stack Developer",
  description: "Portfolio of Mandar Joshi - Full Stack Developer & AI Enthusiast",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={cn(inter.variable, jetbrainsMono.variable, "font-sans antialiased bg-transparent text-foreground overflow-x-hidden selection:bg-primary/30 selection:text-primary-foreground")}>
        <BackgroundWrapper />
        <Navbar />
        {children}
      </body>
    </html>
  );
}
