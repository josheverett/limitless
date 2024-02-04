import { useContext, CSSProperties } from 'react';
import cx from 'classnames';
import { AppContext } from '@/app/context';
import { use4k, vhCssTo4k } from '@/hooks/use-4k';

type BrightBoxProps = {
  className?: string;
  style?: CSSProperties;
  children: React.ReactNode;
};

export const BrightBox = ({
  className,
  style,
  children,
}: BrightBoxProps) => {
  const { force4k } = useContext(AppContext);
  const _4k = use4k();

  const transparentStart = force4k ? vhCssTo4k('1.343vh') : '1.343vh';
  const transparentEnd = force4k ? vhCssTo4k('1.759vh') : '1.759vh';

  return (
    <div
      className={cx('border-solid', className)}
      style={{
        ..._4k({
          width: '27.292vw', // vw is correct
          borderWidth: '0.231vh',
          paddingTop: '0.37vh',
          paddingBottom: '0.37vh',
          paddingLeft: '0.37vh',
          paddingRight: '0.37vh',
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
        ...style,
      }}
    >
      {children}
    </div>
  );
};
