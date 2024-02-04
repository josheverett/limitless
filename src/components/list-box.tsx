'use client';

import { CSSProperties } from 'react';
import Link from 'next/link';
import cx from 'classnames';
import { use4k } from '@/hooks/use-4k';
import { Teko_2_3_Normal } from '@/app/styles/fonts';

// These components will see all sorts of updates and new options once I start
// building out more listbox variants. It's mostly borders and bgs.

type ListBoxItemProps = {
  selected?: boolean;
  href: string;
  text: string;
};

const ListBoxItem = ({
  selected,
  href,
  text,
}: ListBoxItemProps) => {
  // const _4k = use4k();

  return (
    <li>
      <Link href={href}>
        {text}
      </Link>
    </li>
  );
};

type ListBoxNotchProps = {
  type: 'top' | 'bottom';
};

const ListBoxNotch = ({ type }: ListBoxNotchProps) => {
  const _4k = use4k();
  const isTop = type === 'top';

  return (
    <div className="flex" style={_4k({ height: '0.556vh' })}>
    <div className="h-full bg-[hsla(0,0%,0%,0.35)]" style={_4k({ width: '17.778vh' })} />
    <div
      className="w-0 h-0 border-solid border-[hsla(0,0%,0%,0.35)]"
      style={_4k({
        borderRightColor: 'transparent',
        borderRightWidth: '0.6vh', // eyeballed
        borderBottomWidth: isTop ? '0.6vh' : undefined, // eyeballed
        borderTopWidth: !isTop ? '0.6vh' : undefined, // eyeballed
      })}
    />
    <div className="grow"></div>
    <div
      className="w-0 h-0 border-solid border-[hsla(0,0%,0%,0.35)]"
      style={_4k({
        borderLeftColor: 'transparent',
        borderLeftWidth: '0.6vh', // eyeballed
        borderBottomWidth: isTop ? '0.6vh' : undefined, // eyeballed
        borderTopWidth: !isTop ? '0.6vh' : undefined, // eyeballed
      })}
    />
    <div className="h-full bg-[hsla(0,0%,0%,0.35)]" style={_4k({ width: '17.778vh' })} />
  </div>
  );
};

type ListBoxProps = {
  className?: string;
  items: ListBoxItemProps[]; // TODO
  style?: CSSProperties;
};

export const ListBox = ({
  className,
  items,
  style,
}: ListBoxProps) => {
  const _4k = use4k();

  return (
    <div
      className={cx('relative border-solid', className)}
      style={{
        ..._4k({
          // Ideally these would be hsla but the "extra-wide piece" of the
          // left border makes it a pain.
          borderColor: 'hsl(0,0%,50%)',
          borderWidth: '0.093vh',
          paddingTop: '0.463vh',
          paddingBottom: '0.463vh',
          paddingLeft: '0.463vh',
          paddingRight: '0.463vh',
        }),
        ...style,
      }}
    >
      {/* This is that little extra-wide piece of the left border. */}
      <div
        className="absolute bg-[hsl(0,0%,50%)]"
        style={_4k({
          top: '50%',
          left: '-0.175vh', // eyeballed, dunno why eyeballing was needed (thin lines jank?)
          width: '0.278vh',
          height: '7.222vh',
          marginTop: '-3.611vh',
        })}
      />
      <ListBoxNotch type="top" />
      <div className="bg-[hsla(0,0%,0%,0.35)]">
        <ul className="relative" style={_4k({ height: '26.852vh' })}>
          {items.map((item) => {
            return (
              <ListBoxItem
                key={item.href}
                href={item.href}
                text={item.text}
              />
            );
          })}
        </ul>
      </div>
      <ListBoxNotch type="bottom" />
    </div>
  );
};
