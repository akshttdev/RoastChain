// app/layout.tsx
import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import { WalletProvider } from "@/components/web3/wallet-provider";
import { ToasterClient } from "@/components/ToasterClient";
import { headers } from 'next/headers';
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-space-grotesk",
});

export const metadata: Metadata = {
  title: "RoastChain",
  description: "A decentralized arena for brutal honesty.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookie = (await headers()).get('cookie');
  return (
    <html lang="en">
      <body className={`${spaceGrotesk.variable} font-sans antialiased`}>
        <WalletProvider cookie={cookie}>
          {children}
        </WalletProvider>
        <ToasterClient />
      </body>
    </html>
  );
}