import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import StyledJsxRegistry from "./registry";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Ordrji — The Restaurant Operating System of the Future",
  description: "Beyond POS. Run your entire restaurant—POS, QR Ordering, Kitchen Display, Billing, CRM, Inventory, and Analytics—from a single dashboard. Designed for premium dining.",
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        {/* Global ambient background effects */}
        <div style={{ position: "fixed", inset: 0, overflow: "hidden", pointerEvents: "none", zIndex: 0 }}>
          <div className="ambient-glow-blob" style={{ top: '-10%', left: '-10%', animationDelay: '0s' }} />
          <div className="ambient-glow-blob" style={{ top: '40%', right: '-15%', background: 'radial-gradient(circle, rgba(227,6,19,0.035) 0%, transparent 70%)', animationDelay: '-5s' }} />
          <div className="ambient-glow-blob" style={{ bottom: '-5%', left: '20%', background: 'radial-gradient(circle, rgba(227,6,19,0.03) 0%, transparent 70%)', animationDelay: '-10s' }} />
        </div>
        <StyledJsxRegistry>{children}</StyledJsxRegistry>
      </body>
    </html>
  );
}
