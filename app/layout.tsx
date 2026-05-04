import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const inconsolata = localFont({
  src: "../assets/fonts/Inconsolata-VariableFont_wdth,wght.ttf",
  variable: "--font-inconsolata",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Conference Ticket Generator",
  description: "Generate your personalized Coding Conf 2025 ticket.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inconsolata.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
