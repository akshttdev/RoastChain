// app/layout.tsx
import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import { WalletProvider } from "@/components/web3/wallet-provider";
import { Toaster } from 'react-hot-toast';
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

const toastOptions = {
  style: {
    borderRadius: '0',
    background: '#fff',
    color: '#000',
    fontSize: '12px',
    fontWeight: 'bold',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.1em',
    border: '2px solid #000',
  },
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
        <Toaster position="bottom-right" toastOptions={toastOptions} />
      </body>
    </html>
  );
}