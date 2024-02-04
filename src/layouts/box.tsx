import cx from 'classnames';
import { useContext, CSSProperties } from 'react';
import { AppContext } from '@/app/context';
import { use4k, vhCssTo4k } from '@/hooks/use-4k';

type BrightBoxProps = {
  className?: string;
  styles?: CSSProperties;
  children: React.ReactNode;
};

export const BrightBox = ({
  className,
  styles,
  children,
}: BrightBoxProps) => {
  const { force4k } = useContext(AppContext);
  const _4k = use4k();

  const transparentStart = force4k ? '4vh' : vhCssTo4k('4vh');
  const transparentEnd = force4k ? '5.5vh' : vhCssTo4k('5.5vh');

  return (
    <div
      className={cx('border-solid', className)}
      style={{
        ..._4k({
          width: '27.292vw', // vw is correct
          borderWidth: '0.231vh',
        }),
        // Forgive me lord for what I am about to do...
        // This is a suuuper special case, not worth updating use4k for.
        // Prototyped at: https://codepen.io/puglr/pen/bGZMmJq
        ...{
          borderImage: `linear-gradient(
              to bottom,
              #f4f4f4 0%,
              #f4f4f4 ${transparentStart},
              transparent ${transparentStart},
              transparent ${transparentEnd},
              hsla(0,0%,100%,0.5) ${transparentEnd},
              hsla(0,0%,100%,0.5) calc(100% - ${transparentEnd}),
              transparent calc(100% - ${transparentEnd}),
              transparent calc(100% - ${transparentStart}),
              #f4f4f4 calc(100% - ${transparentStart}),
              #f4f4f4 100%
            ) 1 stretch
          `,
        },
        ...styles,
      }}
    >
      {children}
    </div>
  );
};
