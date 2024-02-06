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

// TODO: Most of this needs to be deleted after emotion css refactor.

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

type FontVariant = {
  className: string;
  fontSize?: string;
  fontWeight?: string;
  letterSpacing?: string;
};

const titillium = {
  className: TitilliumFont_.className,
};

const teko = {
  className: TekoFont_.className,
};

const teko_2_3 = {
  ...teko,
  fontSize: '2.3vh',
  letterSpacing: '0.3vh',
};

const teko_2_3_wide = {
  ...teko_2_3,
  letterSpacing: '0.5vh',
};

const teko_2_3_wide_light = {
  ...teko_2_3_wide,
  fontWeight: '300',
};

const FONT_VARIANTS: { [key: string]: FontVariant } = {
  titillium,
  teko,
  teko_2_3,
  teko_2_3_wide,
  teko_2_3_wide_light,
};

type TemplateTag = (strings: TemplateStringsArray, ...args: string[]) => string;

// You must pass in the raw css (mine, not emotion's) template
// tag function directly.
// The return value is meant to be spread into EMOTON's cx().
// Do not use the vanilla 'classnames' cx, the styles will end
// up out of order!
export const getFontVariant = (
  css: TemplateTag,
  variantName: string,
) => {
  const {
    className,
    fontSize,
    fontWeight,
    letterSpacing
  } = FONT_VARIANTS[variantName];

  let cssString = '';
  if (fontSize) cssString += `font-size: ${fontSize || 'inherit'};`;
  if (fontWeight) cssString += `font-weight: ${String(fontWeight) || 'inherit'};`;
  if (letterSpacing) cssString += `letter-spacing: ${letterSpacing || 'inherit'};`;

  const emotionClassName = css`${cssString}`;

  return [className, emotionClassName];
};
