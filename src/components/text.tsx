import cx from 'classnames';
import { use4k } from '@/hooks/use-4k';

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
  const _4k = use4k();

  return (
    <span
      className={cx(
        'relative',
        {
          'w-full': ellipsize,
          'truncate': ellipsize,
          'scale-y-[0.75]': smush,
          'text-[1.2em]': smush,
        }
      )}
      style={_4k({ top })}
    >
      {children}
    </span>
  );
}
