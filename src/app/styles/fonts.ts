import { Teko, Titillium_Web } from 'next/font/google';

// Copy font.
const TitilliumFont_ = Titillium_Web({
  subsets: ['latin'],
  weight: ['300'],
  style: ['normal', 'italic'],
  display: 'swap',
});

// Display font.
const TekoFont_ = Teko({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  display: 'swap',
});

export const TitilliumFont = TitilliumFont_.className;
export const TekoFont = TekoFont_.className;

export const Teko_2_3 = {
  fontSize: '2.3vh',
  letterSpacing: '0.3vh',
};

export const Teko_2_3_Light = {
  ...Teko_2_3,
  fontWeight: '300',
};

export const Teko_2_3_Normal = {
  ...Teko_2_3,
  fontWeight: '400',
};

export const Teko_2_3_Medium = {
  ...Teko_2_3,
  fontWeight: '500',
};

export const Teko_2_3_Wide = {
  ...Teko_2_3,
  letterSpacing: '0.5vh',
};

export const Teko_2_3_Wide_Light = {
  ...Teko_2_3_Wide,
  fontWeight: '300',
};

export const Teko_2_3_Wide_Normal = {
  ...Teko_2_3_Wide,
  fontWeight: '400',
};

export const Teko_2_3_Wide_Medium = {
  ...Teko_2_3_Wide,
  fontWeight: '500',
};
