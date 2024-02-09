import type { Metadata } from 'next';
import { AppContextProvider } from '@/app/context';
import { Resize } from '@/components/resize';
import { Gamepad } from '@/components/gamepad';
import { TekoFont } from '@/app/styles/fonts';
import '@/app/styles/globals.css';

export const metadata: Metadata = {
  title: 'Limitless',
  description: 'A lovingly faithful recreation of the Halo Infinite menu in React.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
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
}
