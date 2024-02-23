import { css } from '@emotion/css';

// fourk() is meant to be used as a template tag, like this:
//
//   fourk`my template literal string, with ${vars} n stuff`
//
// If vw or vh units are found in the resulting string, they will be
// replaced with fixed px values when forced 4k mode is enabled.
//
// The result is then passed on to emotion's `css` template tag. :D
//
// This tag exists so that all dimensions can be defined in vw/vh units,
// which get automatically converted to fixed pixel sizes when the app is
// set to forced 4k mode. transform:scale() does not play nicely with
// vw/vh units, so here we are.

const FOURK_WIDTH = 3840;
const FOURK_HEIGHT = 2160;

const VIEWPORT_VALUE_REGEX = /(\d+\.?\d*)(vw|vh)/gm;

const vwCssTo4k = (vwCss: string) => {
  const vw = parseFloat(vwCss.replace('vw', ''));
  const px = (vw / 100) * FOURK_WIDTH;
  return `${Math.round(px * 100) / 100}px`;
};

const vhCssTo4k = (vhCss: string) => {
  const vh = parseFloat(vhCss.replace('vh', ''));
  const px = (vh / 100) * FOURK_HEIGHT;
  return `${Math.round(px * 100) / 100}px`;
};

export const viewportCssTo4k = (css: string) => {
  return css.replace(VIEWPORT_VALUE_REGEX, (str) => {
    return str.includes('vw') ? vwCssTo4k(str) : vhCssTo4k(str);
  });
};

// Note that if a template string starts and/or ends with an interpolation,
// the TemplateStringsArray (stringArray1) will start and/or end with an
// empty string. Thus stringArray1.length is ALWAYS stringArray2.length + 1.
export const stitchStrings = (stringArray1: string[], stringArray2: string[]) => {
  let compoundString = '';
  for (let i = 0; i < stringArray1.length; i++) {
    if (stringArray2[i]) compoundString += stringArray1[i] + stringArray2[i];
    else compoundString += stringArray1[i];
  }
  return compoundString;
};

// This helper template tag function exists for unit testing only. The actual
// `fourk` template tag function below returns the result of the `css` template
// tag, which is a class name. :)
export function _fourkHelper (strings: TemplateStringsArray, ...args: string[]) {
  const output = stitchStrings([...strings], args);
  return viewportCssTo4k(output);
}

export function fourk (strings: TemplateStringsArray, ...args: string[]) {
  const output = _fourkHelper(strings, ...args);
  return css`${output}`;
}
