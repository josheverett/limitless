import { Teko, Titillium_Web } from 'next/font/google';

// Copy font.
// TODO: I think there might actually be second copy font in some places.
const TitilliumFont_ = Titillium_Web({
  subsets: ['latin'],
  weight: ['300', '400'],
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

type FontVariant = {
  className?: string;
  fontSize?: string;
  fontWeight?: string;
  fontStyle?: string;
  letterSpacing?: string;
  whiteSpace?: string;
  textTransform?: string;
  textShadow?: string;
};

const titillium = {
  className: TitilliumFont_.className,
  textTransform: 'none',
};

const titillium_description = {
  ...titillium,
  fontSize: '1.8vh', // eyeballed
  fontStyle: 'italic',
  fontWeight: '400',
  letterSpacing: '0.15vh', // eyeballed
};

const teko = {
  className: TekoFont_.className,
  textTransform: 'uppercase',
};

const teko_wide = {
  ...teko,
  letterSpacing: '0.5vh',
};

const teko_extra_wide = {
  ...teko,
  letterSpacing: '0.7vh',
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

const shadow_crisp = {
  textShadow: '0.1vh 0.1vh 0 hsla(0, 0%, 0%, 0.8)',
};

const shadow_soft = {
  textShadow: '0.1vh 0.1vh 0.25vh hsla(0, 0%, 0%, 0.2)',
};

const FONT_VARIANTS: { [key: string]: FontVariant } = {
  titillium,
  titillium_description,

  teko,
  teko_wide,
  teko_extra_wide,
  teko_2_3,
  teko_2_3_wide,
  teko_2_3_wide_light,

  shadow_crisp,
  shadow_soft,
};

type TemplateTag = (strings: TemplateStringsArray, ...args: string[]) => string;

// You must pass in the raw css template tag (mine, not the emotion one!)
// function directly. Font variants can be stacked and stuff when needed.
// The return value is meant to be used in cx().
// Do not use the vanilla 'classnames' cx(), or the styles will be out of order!
export const getFontVariant = (
  css: TemplateTag,
  variantName: string,
) => {
  const {
    className,
    fontSize,
    fontWeight,
    fontStyle,
    letterSpacing,
    whiteSpace,
    textTransform,
    textShadow,
  } = FONT_VARIANTS[variantName];

  let cssString = '';
  if (fontSize) cssString += `font-size: ${fontSize};`;
  if (fontWeight) cssString += `font-weight: ${fontWeight};`;
  if (fontStyle) cssString += `font-style: ${fontStyle};`;
  if (letterSpacing) cssString += `letter-spacing: ${letterSpacing};`;
  if (whiteSpace) cssString += `white-space: ${whiteSpace};`;
  if (textTransform) cssString += `text-transform: ${textTransform};`;
  if (textShadow) cssString += `text-shadow: ${textShadow};`;

  const emotionClassName = css`${cssString}`;

  return [className, emotionClassName];
};
