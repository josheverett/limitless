import type { Metadata } from 'next';
import { cx } from '@emotion/css';
import { AppContextProvider } from '@/app/context';
import { Gamepad } from '@/components/gamepad';
import { TekoFont } from '@/app/styles/fonts';
import '@/app/styles/globals.css';

export const metadata: Metadata = {
  title: 'Halo Infinite',
  description: 'A recreation of the Halo Infinite menu in React.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // This needs to stay tailwind as we're not rendering emotion css server
  // side. It's unclear if that even works with Next 14, as I couldn't find
  // any examples for the App router. The official guides are for Next 13
  // and the Pages router, and don't work for App router.
  return (
    <html lang="en" className="w-full h-full overflow-hidden">
      <body className={
        cx(
          'flex items-center justify-center w-full h-full overflow-hidden',
          TekoFont
        )
      }>
        <AppContextProvider>{children}</AppContextProvider>
        <Gamepad />
      </body>
    </html>
  );
}
