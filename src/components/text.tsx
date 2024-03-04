import { cx } from '@emotion/css';
import { use4k } from '@/hooks/use-4k';

// Often ALL CAPS titles need to be offset to fit perfectly in a tight
// design. This component makes that less painful.
// Note that all `top` values are eyeballed _by definition_.
// Also, every font-size is eyeballed (to the correct height).
// I need to stop commenting those lmao.

type TextOffsetProps = {
  className?: string;
  top?: string; // vh units
  left?: string; // vh units
  truncate?: boolean;
  smush?: boolean; // experimental Teko smoooshing
  italic?: boolean; // experimental Teko skewing because the italics are extreme lol
  children: React.ReactNode;
};

export const TextOffset = ({
  className,
  top,
  left,
  truncate = false,
  smush = false,
  italic = false,
  children,
}: TextOffsetProps) => {
  const css = use4k();

  const transforms = [];

  if (smush) transforms.push('scaleY(0.75)');
  if (italic) transforms.push('skewX(-3.5deg)');

  return (
    <span className={cx(
      css`
        position: relative;
        display: inline-block;

        ${!!top ? `top: ${top};` : ''};
        ${!!left ? `left: ${left};` : ''};

        ${truncate ? `width: 100%;` : ''};
        ${truncate ? `overflow: hidden;` : ''};
        ${truncate ? `text-overflow: ellipsis;` : ''};
        ${truncate ? `white-space: nowrap;` : ''};

        ${smush ? `font-size: 1.2em;` : ''};

        transform: ${transforms.length ? transforms.join(' ') : 'none'};
      `,
      className,
    )}>
      {children}
    </span>
  );
};
