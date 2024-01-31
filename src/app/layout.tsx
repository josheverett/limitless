import type { Metadata } from 'next';
// import { Inter } from 'next/font/google';
import { Context } from '@/app/context';
import './globals.css';

// const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Halo Infinite',
  description: 'A recreation of the Halo Infinite menu in React.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Context>
      <html lang="en" className="w-full h-full overflow-hidden">
        <body className="flex items-center justify-center w-full h-full overflow-hidden">
          {children}
        </body>
      </html>
    </Context>
  );
}
