import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Club Business | Official Site",
  description:
    "Where sound meets soul. Experience the raw energy of alternative rock that pushes boundaries and ignites emotions.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-background font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
