import type { Metadata } from 'next';
import { Titillium_Web } from 'next/font/google';
import cx from 'classnames';
import { AppContextProvider } from '@/app/context';
import './globals.css';

const TitilliumWebFont = Titillium_Web({
  subsets: ['latin'],
  weight: ['300'],
  display: 'swap',
});

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
    <html lang="en" className="w-full h-full overflow-hidden">
      <body className={
        cx(
          'flex items-center justify-center w-full h-full overflow-hidden',
          TitilliumWebFont.className
        )
      }>
        <AppContextProvider>{children}</AppContextProvider>
      </body>
    </html>
  );
}
