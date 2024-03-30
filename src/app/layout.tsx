import type { Metadata } from "next";
import { clsx } from 'clsx'
import { Providers } from '@/components/providers/client';
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "How many commas???",
  description: "One? Two?? THREE???",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className='h-full'>
      <Providers>
        <body className={clsx('h-full', inter.className)}>{children}</body>
      </Providers>
    </html>
  );
}
