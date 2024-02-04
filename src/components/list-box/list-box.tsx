'use client';

import { useRef, CSSProperties } from 'react';
import cx from 'classnames';
import { use4k } from '@/hooks/use-4k';
import { useDirectionalInputs, InputDirection } from '@/hooks/use-gamepad';
import { ListBoxItem, ListBoxItemProps } from './list-box-item';
import { ListBoxNotch } from './list-box-notch';

type ListBoxProps = {
  className?: string;
  items: ListBoxItemProps[];
  style?: CSSProperties;
};

export const ListBox = ({
  className,
  items,
  style,
}: ListBoxProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const _4k = use4k();

  // TODO: NEED TO FOCUS FIRST ITEM BY DEFAULT OMG THIS IS IMPORTANT

  useDirectionalInputs(['U', 'D'], (direction) => {
    if (!ref.current) return;
    const links = Array.from(ref.current.querySelectorAll('a'));
    const focusedLinkIndex = links.findIndex((link) => {
      return link === document.activeElement;
    });
    const focusedLink = links[focusedLinkIndex];
    if (!focusedLink) return;
    let linkIndexToFocus;
    if (direction === 'D') {
      linkIndexToFocus = focusedLinkIndex >= links.length - 1 ?
        0 : focusedLinkIndex + 1;
    } else {
      linkIndexToFocus = focusedLinkIndex <= 0 ?
        links.length - 1 : focusedLinkIndex - 1;
    }
    links[linkIndexToFocus]?.focus();
  });

  return (
    <div
      ref={ref}
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
