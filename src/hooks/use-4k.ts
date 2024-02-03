import { CSSProperties, useContext } from 'react';
import { AppContext } from '@/app/context';

// This hook exists so that all dimensions can be defined in vw/vh units,
// which get automatically converted to fixed pixel sizes when the app is
// set to forced 4k mode. transform:scale() does not play nicely with
// vw/vh units, so here we are.

const FOURK_WIDTH = 3840;
const FOURK_HEIGHT = 2160;

const FOURK_PROPS = [
  'border',
  'borderBottom',
  'borderBottomWidth',
  'borderLeft',
  'borderLeftWidth',
  'borderRight',
  'borderRightWidth',
  'borderTop',
  'borderTopWidth',
  'borderWidth',
  'fontSize',
  'gap',
  'height',
  'margin',
  'marginBottom',
  'marginLeft',
  'marginRight',
  'marginTop',
  'padding',
  'paddingBottom',
  'paddingLeft',
  'paddingRight',
  'paddingTop',
  'width',
];

export const vwCssTo4k = (vwCss: string) => {
  const vw = parseFloat(vwCss.replace('vw', ''));
  const px = (vw / 100) * FOURK_WIDTH;
  return `${Math.round(px * 100) / 100}px`;
};

export const vhCssTo4k = (vhCss: string) => {
  const vh = parseFloat(vhCss.replace('vh', ''));
  const px = (vh / 100) * FOURK_HEIGHT;
  return `${Math.round(px * 100) / 100}px`;
};

export const viewportCssTo4k = (css: string) => {
  return css.includes('vw') ? vwCssTo4k(css) : vhCssTo4k(css);
};

export const __4k = (styles: CSSProperties) => {
  // Had trouble using CSSProperties here.
  const fourkStyles: { [key: string]: string } = {};

  for (const [prop, value] of Object.entries(styles)) {
    const value_ = FOURK_PROPS.includes(prop)
      ? viewportCssTo4k(value)
      : value;
    fourkStyles[prop] = value_;
  }

  return fourkStyles;
};

export const use4k = () => {
  const { force4k } = useContext(AppContext);

  return (styles: CSSProperties) => {
    return force4k ? __4k(styles) : styles;
  };
};
