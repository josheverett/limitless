'use client';

import { useRef, CSSProperties } from 'react';
import cx from 'classnames';
import { use4k } from '@/hooks/use-4k';
import {
  useDirectionalInputs,
  useInputPortal,
  InputDirection,
  InputPortal,
} from '@/hooks/use-gamepad';
import { useDefaultFocus } from '@/hooks/use-default-focus';
import { ListBoxItem, ListBoxItemProps } from './list-box-item';
import { ListBoxNotch } from './list-box-notch';

type ListBoxProps = {
  className?: string;
  items: ListBoxItemProps[];
  defaultFocusPathname?: string;
  inputPortalName?: string;
  inputPortals?: InputPortal[];
  style?: CSSProperties;
};

export const ListBox = ({
  className,
  items,
  defaultFocusPathname,
  inputPortalName,
  inputPortals = [],
  style,
}: ListBoxProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const _4k = use4k();

  // TODO: PORTAL TEST. Use identical list box in another column to test.

  const defaultFocusRef =
    useDefaultFocus(!!defaultFocusPathname, defaultFocusPathname);

  const { teleport } = useInputPortal(
    !!inputPortalName,
    inputPortalName,
    defaultFocusRef
  );

  // TODO: DO NOT KEEP TRUE, NEEDS COMPONENT FOCUS THING OMG
  // TODO: Consider updating useDirectionalInputs to have convenience
  // shit for portals. yeeee
  // TODO: See about a switch statement here. Separate functions was even worse.
  useDirectionalInputs(true, ['U', 'D', 'L', 'R'], (direction) => {
    if (!containerRef.current) return;

    // Left / Right (always a teleport for ListBox)

    const leftPortal = inputPortals.find((portal) => portal.direction === 'L');
    if (!!leftPortal && direction === 'L') return teleport(leftPortal);

    const rightPortal = inputPortals.find((portal) => portal.direction === 'R');
    if (!!rightPortal && direction === 'R') return teleport(rightPortal);

    // Up / Down (only a teleport if U/D portal AND top/bottom of list reached)

    // TODO: NEED PORTAL INSTEAD OF WRAPAROUND WHEN MATCING UDLR!!!

    const links = Array.from(containerRef.current.querySelectorAll('a'));
    const focusedLinkIndex = links.findIndex((link) => {
      return link === document.activeElement;
    });

    const focusedLink = links[focusedLinkIndex];
    if (!focusedLink) return;

    let linkIndexToFocus = -1;
    if (direction === 'D') {
      linkIndexToFocus = focusedLinkIndex >= links.length - 1 ?
        0 : focusedLinkIndex + 1;
    } else if (direction === 'U') {
      linkIndexToFocus = focusedLinkIndex <= 0 ?
        links.length - 1 : focusedLinkIndex - 1;
    }
    links[linkIndexToFocus]?.focus();
  });

  return (
    <div
      ref={containerRef}
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
