import { CSSProperties } from 'react';
import { use4k } from '@/hooks/use-4k';

type MediumColumnProps = {
  className?: string;
  style?: CSSProperties;
  children: React.ReactNode;
};

export const MediumColumn = ({
  className,
  style,
  children,
}: MediumColumnProps) => {
  const _4k = use4k();

  return (
    <div
      className={className}
      // vw is correct
      style={{ ..._4k({ width: '27.292vw' }), ...style}}
    >
      {children}
    </div>
  );
};
