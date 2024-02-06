'use client';

import { cx } from '@emotion/css';
import { use4k } from '@/hooks/use-4k';

type ListBoxNotchProps = {
  type: 'top' | 'bottom';
};

export const ListBoxNotch = ({ type }: ListBoxNotchProps) => {
  const css = use4k();

  const isTop = type === 'top';

  // The zero width/height divs below are CSS triangles.
  return (
    <div className={css`display: flex; height: 0.556vh;`}>
      <div className={css`
        width: 37.452%;
        height: 100%;
        background: hsla(0, 0%, 0%, 0.5);
      `} />
      <div className={cx(css`
          width: 0;
          height: 0;
          border-style: solid;
          border-color: hsla(0, 0%, 0%, 0.5);
          border-right-color: transparent;
          border-right-width: 0.6vh; /* eyeballed */
          border-top-width: 0.6vh; /* eyeballed */
        `,
        isTop && css`
          border-top-width: 0;
          border-bottom-width: 0.6vh; /* eyeballed */
        `
      )}/>
      <div className={css`flex-grow: 1;`}></div>
      <div className={cx(
        css`
          width: 0;
          height: 0;
          border-style: solid;
          border-color: hsla(0, 0%, 0%, 0.5);
          border-left-color: transparent;
          border-left-width: 0.6vh; /* eyeballed */
          border-top-width: 0.6vh; /* eyeballed */
        `,
        isTop && css`
          border-top-width: 0;
          border-bottom-width: 0.6vh; /* eyeballed */
        `
      )}/>
      <div className={css`
        width: 37.452%;
        height: 100%;
        background: hsla(0, 0%, 0%, 0.5);
      `}/>
    </div>
  );
};
