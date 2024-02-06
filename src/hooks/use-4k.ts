import { useContext } from 'react';
import { css } from '@emotion/css';
import { fourk, stitchStrings } from '@/lib/fourk-css';
import { AppContext } from '@/app/context';

// This hook exists so that all dimensions can be defined in vw/vh units,
// which get automatically converted to fixed pixel sizes when the app is
// set to forced 4k mode. transform:scale() does not play nicely with
// vw/vh units, so here we are.
//
// The hook returns a `css` template tag for className that you can use in
// place of emotion css' template tag.

export const use4k = () => {
  const { force4k } = useContext(AppContext);

  // This is a context-infused template tag function. :o
  return function (strings: TemplateStringsArray, ...args: string[]) {
    const output = stitchStrings(Array.from(strings), args);
    return force4k ? fourk`${output}` : css`${output}`;
  };
};
