'use client';

import { use4k } from '@/hooks/use-4k';

type ListBoxNotchProps = {
  type: 'top' | 'bottom';
};

export const ListBoxNotch = ({ type }: ListBoxNotchProps) => {
  const _4k = use4k();
  const isTop = type === 'top';

  return (
    <div className="flex" style={_4k({ height: '0.556vh' })}>
    <div className="h-full bg-[hsla(0,0%,0%,0.5)]" style={_4k({ width: '17.778vh' })} />
    <div
      className="w-0 h-0 border-solid border-[hsla(0,0%,0%,0.5)]"
      style={_4k({
        borderRightColor: 'transparent',
        borderRightWidth: '0.6vh', // eyeballed
        borderBottomWidth: isTop ? '0.6vh' : undefined, // eyeballed
        borderTopWidth: !isTop ? '0.6vh' : undefined, // eyeballed
      })}
    />
    <div className="grow"></div>
    <div
      className="w-0 h-0 border-solid border-[hsla(0,0%,0%,0.5)]"
      style={_4k({
        borderLeftColor: 'transparent',
        borderLeftWidth: '0.6vh', // eyeballed
        borderBottomWidth: isTop ? '0.6vh' : undefined, // eyeballed
        borderTopWidth: !isTop ? '0.6vh' : undefined, // eyeballed
      })}
    />
    <div className="h-full bg-[hsla(0,0%,0%,0.5)]" style={_4k({ width: '17.778vh' })} />
  </div>
  );
};
