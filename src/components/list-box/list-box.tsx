'use client';

import { CSSProperties } from 'react';
import cx from 'classnames';
import { use4k } from '@/hooks/use-4k';
import {
  useDirectionalInputs,
  useInputPortal,
  InputPortal,
} from '@/hooks/use-gamepad';
import { useDefaultFocus } from '@/hooks/use-default-focus';
import { ListBoxItem, ListBoxItemProps } from './list-box-item';
import { ListBoxNotch } from './list-box-notch';

type ListBoxProps = {
  className?: string;
  items: ListBoxItemProps[];
  defaultFocusPathname?: string;
  portal?: string;
  targetPortals?: InputPortal[];
  style?: CSSProperties;
};

export const ListBox = ({
  className,
  items,
  defaultFocusPathname,
  portal,
  targetPortals = [],
  style,
}: ListBoxProps) => {
  const _4k = use4k();

  const defaultFocusRef = useDefaultFocus(defaultFocusPathname, portal);
  const { focusContainerRef, teleport } = useInputPortal({
    name: portal, defaultFocusRef
  });

  useDirectionalInputs({
    portal,
    callback: (direction) => {
      if (!focusContainerRef.current) return;

      // Left / Right (always a teleport for ListBox)

      const leftPortal = targetPortals.find((portal) => portal.direction === 'L');
      if (!!leftPortal && direction === 'L') return teleport(leftPortal);

      const rightPortal = targetPortals.find((portal) => portal.direction === 'R');
      if (!!rightPortal && direction === 'R') return teleport(rightPortal);

      // Up / Down (only a teleport if U/D portal AND top/bottom of list reached)

      // TODO: NEED PORTAL INSTEAD OF WRAPAROUND WHEN MATCING UDLR!!!
      // like if you have a U portal and scroll up past it you need to teleport
      // and not cycle, but otherwise you can cycle.

      // OHHHHHH check the real thing, it might be the case that no lists with
      // portals can cycle at all!

      const links = Array.from(focusContainerRef.current.querySelectorAll('a'));
      const focusedLinkIndex = links.findIndex((link) => {
        return link === document.activeElement;
      });

      const focusedLink = links[focusedLinkIndex];
      if (!focusedLink) return;

      let linkIndexToFocus = direction === 'D' ? focusedLinkIndex + 1 : focusedLinkIndex - 1;
      if (linkIndexToFocus <= 0) linkIndexToFocus = 0;
      if (linkIndexToFocus >= links.length - 1) linkIndexToFocus = links.length - 1;

      links[linkIndexToFocus]?.focus();
    },
  });

  return (
    <div
      ref={focusContainerRef}
      className={cx(
        'flex flex-col relative border-solid border-[hsl(0,0%,50%)]',
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
          {items.map((item, i) => {
            return (
              <ListBoxItem
                key={item.href}
                // This is how we make sure the first item is selected by default.
                defaultFocusRef={i === 0 ? defaultFocusRef : undefined}
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
