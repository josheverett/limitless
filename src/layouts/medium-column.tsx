import { cx } from '@emotion/css';
import { use4k, TABBED_PAGE_PADDING_X } from '@/hooks/use-4k';

type MediumColumnProps = {
  className?: string;
  children: React.ReactNode;
};

export const MediumColumn = ({
  className,
  children,
}: MediumColumnProps) => {
  const css = use4k();

  return (
    // vw is correct
    <div className={cx(css`width: 27.292vw;`, className)} >
      {children}
    </div>
  );
};

type ResponsiveMediumColumnProps = {
  children: React.ReactNode;
};

export const ResponsiveMediumColumn = ({
  children,
}: ResponsiveMediumColumnProps) => {
  const css = use4k();

  return (
    <MediumColumn className={css`
      @media (orientation: portrait) {
        // vw is correct.
        width: calc(50vw - (${TABBED_PAGE_PADDING_X} * 1.5));
      }
    `}>
      {children}
    </MediumColumn>
  );
};
