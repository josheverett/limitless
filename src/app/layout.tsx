import type { Metadata } from 'next';
import cx from 'classnames';
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
