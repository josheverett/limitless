import { use4k } from '@/hooks/use-4k';

// Often ALL CAPS titles need to be offset to fit perfectly in a tight
// design. This component makes that less painful.
// Note that all `top` values are eyeballed _by definition_.
// Also, every font-size is eyeballed (to the correct height).
// I need to stop commenting those lmao.

type TextOffsetProps = {
  top?: string; // vh units
  left?: string; // vh units
  ellipsize?: boolean;
  smush?: boolean; // experimental Teko smoooshing
  children: React.ReactNode;
};

export const TextOffset = ({
  top,
  ellipsize,
  left,
  smush,
  children
}: TextOffsetProps) => {
  const css = use4k();

  return (
    <span className={css`
      position: relative;
      top: ${!!top ? top : 'auto'};
      left: ${!!left ? left : 'auto'};

      display: inline-block;

      width: ${ellipsize ? '100%' : 'auto'};
      overflow: ${ellipsize ? 'hidden' : 'visible'};
      text-overflow: ${ellipsize ? 'ellipsis' : 'clip'};
      white-space: ${ellipsize ? 'nowrap' : 'normal'};

      font-size: ${smush ? '1.2em' : 'inherit'};
      transform: ${smush ? 'scaleY(0.75)' : 'none'};
    `}>
      {children}
    </span>
  );
}
