import { Teko, Titillium_Web } from 'next/font/google';

const TitilliumFont_ = Titillium_Web({
  subsets: ['latin'],
  weight: ['300'],
  style: ['normal', 'italic'],
  display: 'swap',
});

const TekoFont_ = Teko({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  display: 'swap',
});

export const TitilliumFont = TitilliumFont_.className;
export const TekoFont = TekoFont_.className;
