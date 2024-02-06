import { cx } from '@emotion/css';
import { use4k_new } from '@/hooks/use-4k';

type MediumColumnProps = {
  className?: string;
  children: React.ReactNode;
};

export const MediumColumn = ({
  className,
  children,
}: MediumColumnProps) => {
  const css = use4k_new();

  return (
    // vw is correct
    <div className={cx(css`width: 27.292vw;`, className)} >
      {children}
    </div>
  );
};
