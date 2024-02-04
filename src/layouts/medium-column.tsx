import { CSSProperties } from 'react';
import { use4k } from '@/hooks/use-4k';

type MediumColumnProps = {
  className?: string;
  styles?: CSSProperties;
  children: React.ReactNode;
};

export const MediumColumn = ({
  className,
  styles,
  children,
}: MediumColumnProps) => {
  const _4k = use4k();

  return (
    <div
      className={className}
      // vw is correct
      style={{ ..._4k({ width: '27.292vw' }), ...styles}}
    >
      {children}
    </div>
  );
};
