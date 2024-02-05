'use client';

import { CSSProperties } from 'react';
import cx from 'classnames';
import { use4k } from '@/hooks/use-4k';
import {
  getTargetForDirection,
  useDirectionalInputs,
  useInputPortal,
  PortalTarget,
} from '@/hooks/use-gamepad';
import { useNavigationFocus } from '@/hooks/use-navigation-focus';
import { ListBoxItem, ListBoxItemProps } from './list-box-item';
import { ListBoxNotch } from './list-box-notch';

type ListBoxProps = {
  className?: string;
  items: ListBoxItemProps[];
  navigationFocusPathname?: string;
  portal?: string;
  portalTargets?: PortalTarget[];
  style?: CSSProperties;
};

export const ListBox = ({
  className,
  items,
  navigationFocusPathname,
  portal,
  portalTargets = [],
  style,
}: ListBoxProps) => {
  const _4k = use4k();

  const defaultFocusRef = useNavigationFocus(navigationFocusPathname, portal);
  const { focusContainerRef, teleport } = useInputPortal({
    name: portal, defaultFocusRef
  });

  useDirectionalInputs({
    portal,
    callback: (direction) => {
      if (!focusContainerRef.current) return;

      let portalTarget: PortalTarget | undefined;

      const links = Array.from(focusContainerRef.current.querySelectorAll('a'));
      const focusedIndex = links.findIndex((link) => link === document.activeElement);
      const isAtStart = focusedIndex <= 0;
      const isAtEnd = focusedIndex >= links.length - 1;

      let indexToFocus = focusedIndex;

      switch (direction) {
        // For any listbox, left and right can ONLY teleport (when available).
        case 'L':
        case 'R': {
          portalTarget = getTargetForDirection(portalTargets, direction);
          if (!!portalTarget) teleport(portalTarget.target);
          return;
        }
        // Up and down teleport only when the edge is reached (and a
        // portal is available).
        case 'U': {
          portalTarget = getTargetForDirection(portalTargets, 'U');
          if (!!portalTarget && isAtStart) return teleport(portalTarget.target);
          indexToFocus = isAtStart ? focusedIndex : focusedIndex - 1;
          break;
        }
        case 'D': {
          portalTarget = getTargetForDirection(portalTargets, 'D');
          if (!!portalTarget && isAtEnd) return teleport(portalTarget.target);
          indexToFocus = isAtEnd ? focusedIndex : focusedIndex + 1;
          break;
        }
      }

      links[indexToFocus]?.focus();
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
