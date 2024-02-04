import { use4k } from '@/hooks/use-4k';

// Often ALL CAPS titles need to be offset to fit perfectly in a tight
// design. This component makes that less painful.

type TextOffsetProps = {
  top: string; // vh units
  children: React.ReactNode;
};

export const TextOffset = ({ top, children }: TextOffsetProps) => {
  const _4k = use4k();

  return (
    <span className="relative" style={_4k({ top })}>
      {children}
    </span>
  );
};
