'use client';

import { useContext, CSSProperties } from 'react';
import Link from 'next/link';
import cx from 'classnames';
import { css } from '@emotion/css'
import { AppContext } from '@/app/context';
import { use4k, vhCssTo4k } from '@/hooks/use-4k';
import { TextOffset } from '@/components/text';
import { Teko_2_3_Wide } from '@/app/styles/fonts';

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
  const { force4k } = useContext(AppContext);
  const _4k = use4k();

  const transparentEnd = force4k ? vhCssTo4k('0.324vh') : '0.324vh';

  const focusTransparentStart = force4k ? vhCssTo4k('0.324vh') : '0.324vh';
  const focusTransparentEnd = force4k ? vhCssTo4k('0.602vh') : '0.602vh';

  return (
    <li
      className="flex items-center w-full border-solid"
      style={{
        ..._4k({ borderWidth: '0.093vh' }),
        borderImage: `linear-gradient(
            to bottom,
            transparent 0%,
            transparent calc(100% - ${transparentEnd}),
            hsl(0,0%,50%) calc(100% - ${transparentEnd}),
            hsl(0,0%,50%) 100%
          ) 1 stretch
        `,
      }}
    >
      <Link
        href={href}
        className={cx(
          'flex items-center w-full h-full border-solid border-transparent',
          // Ah geez here I go again with the cutout borders...
          css`
            &:hover {
              border-image: linear-gradient(
                to bottom,
                #f4f4f4 0%,
                #f4f4f4 ${focusTransparentStart},
                transparent ${focusTransparentStart},
                transparent ${focusTransparentEnd},
                hsla(0,0%,100%,0.5) ${focusTransparentEnd},
                hsla(0,0%,100%,0.5) calc(100% - ${focusTransparentEnd}),
                transparent calc(100% - ${focusTransparentEnd}),
                transparent calc(100% - ${focusTransparentStart}),
                #f4f4f4 calc(100% - ${focusTransparentStart}),
                #f4f4f4 100%
              ) 1 stretch;
            }
          `
        )}
        style={{
          ..._4k({
            height: '4.907vh',
            borderWidth: '0.093vh',
            paddingLeft: '2.037vh',
            ...Teko_2_3_Wide,
            fontWeight: 400, // TODO: Consider weighted "Wide" fonts.
          }),
        }}
      >
        <TextOffset top="0.2vh">{text}</TextOffset>
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
      className={cx(
        'flex flex-col relative h-full border-solid border-[hsl(0,0%,50%)]',
        className
      )}
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
      <div className="grow bg-[hsla(0,0%,0%,0.5)]">
        <ul
          className="flex flex-col relative"
          style={_4k({
            gap: '0.972vh',
            paddingTop: '1.435vh',
            paddingBottom: '0.741vh',
            paddingLeft: '2.176vh',
            paddingRight: '2.176vh',
          })}
        >
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
