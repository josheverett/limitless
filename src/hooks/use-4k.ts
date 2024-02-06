import { CSSProperties, useContext } from 'react';
import { css } from '@emotion/css';
import { fourk, stitchStrings } from '@/lib/fourk-css';
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
  'bottom',
  'fontSize',
  'gap',
  'height',
  'left',
  'letterSpacing',
  'margin',
  'marginBottom',
  'marginLeft',
  'marginRight',
  'marginTop',
  'minHeight',
  'minWidth',
  'outlineWidth',
  'padding',
  'paddingBottom',
  'paddingLeft',
  'paddingRight',
  'paddingTop',
  'right',
  'top',
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
    // valueHasV: ghetto af but handles % cases etc. well enough for this app
    const valueHasV = String(value).includes('v');
    const value_ = valueHasV && FOURK_PROPS.includes(prop)
      ? viewportCssTo4k(value)
      : value;
    fourkStyles[prop] = value_;
  }

  return fourkStyles;
};

// This explicitly does not support shorthand properties when
// using multiple values, e.g. `padding: 5px 10px`
export const use4k = () => {
  const { force4k } = useContext(AppContext);

  return (styles: CSSProperties) => {
    return force4k ? __4k(styles) : styles;
  };
};

export const use4k_new = () => {
  const { force4k } = useContext(AppContext);

  // This is a context-infused template tag function. :o
  return function (strings: TemplateStringsArray, ...args: string[]) {
    const output = stitchStrings(Array.from(strings), args);
    return force4k ? fourk`${output}` : css`${output}`;
  };
};
