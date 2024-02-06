import { use4k_new } from '@/hooks/use-4k';

// Often ALL CAPS titles need to be offset to fit perfectly in a tight
// design. This component makes that less painful.

type TextOffsetProps = {
  top?: string; // vh units
  ellipsize?: boolean;
  smush?: boolean; // experimental Teko smoooshing
  children: React.ReactNode;
};

export const TextOffset = ({
  top,
  ellipsize,
  smush,
  children
}: TextOffsetProps) => {
  const css = use4k_new();

  return (
    <span className={css`
      position: relative;
      top: ${!!top ? top : 'auto'};

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
