'use client';

import { cx } from '@emotion/css';
import { use4k } from '@/hooks/use-4k';

type OperationsNotchProps = {
  type: 'top' | 'bottom';
};

export const OperationsNotch = ({ type }: OperationsNotchProps) => {
  const css = use4k();

  const isBottom = type === 'bottom';

  // The zero width/height divs below are CSS triangles.
  // The height of this thing should use percentages (0.278vh), but border-width
  // weirdly does not support percentages! So vh it is. Oh well.
  return (
    <div className={css`display: flex; height: 0.278vh;`}>
      <div className={css`
        width: 0.88vh;
        height: 100%;
        background: hsl(0, 0%, 56%);
      `} />
      <div className={cx(
        css`
          width: 0;
          height: 0;
          border-style: solid;
          border-color: hsl(0, 0%, 56%);
          border-right-color: transparent;
          border-right-width: 0.278vh;
          border-top-width: 0.278vh;
        `,
        isBottom && css`
          border-top-width: 0;
          border-bottom-width: 0.278vh;
        `
      )}/>
      <div className={css`flex-grow: 1;`} />
      <div className={cx(
        css`
          width: 0;
          height: 0;
          border-style: solid;
          border-color: hsl(0, 0%, 56%);
          border-left-color: transparent;
          border-left-width: 0.278vh;
          border-top-width: 0.278vh;
        `,
        isBottom && css`
          border-top-width: 0;
          border-bottom-width: 0.278vh;
        `
      )}/>
      <div className={css`
        width: 0.88vh;
        height: 100%;
        background: hsl(0, 0%, 56%);
      `}/>
    </div>
  );
};
