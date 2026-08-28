import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Telemedicine Video Portal",
  description: "Offline-resilient low-bandwidth telemedicine app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-slate-900 text-white font-sans">
        {children}
      </body>
    </html>
  );
}