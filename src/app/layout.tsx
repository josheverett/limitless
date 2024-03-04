import { Metadata, Viewport } from 'next';
import Head from 'next/head';
import { Gamepad } from '@/components/gamepad';
import { Resize } from '@/components/resize';
import { TekoFont } from '@/app/styles/fonts';
import { AppContextProvider } from '@/app/context';
import '@/app/styles/globals.css';

export const metadata: Metadata = {
  title: 'Limitless',
  description: 'A lovingly faithful recreation of the Halo Infinite menu in React.',
};

export const viewport: Viewport = {
  initialScale: 1,
  width: 'device-width',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <body className={TekoFont}>
        <AppContextProvider>
          <Resize>
            {children}
          </Resize>
        </AppContextProvider>
        <Gamepad />
      </body>
    </html>
  );
};
