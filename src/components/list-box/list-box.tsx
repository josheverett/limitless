'use client';

import { useState, useEffect } from 'react';
import { cx } from '@emotion/css';
import { use4k } from '@/hooks/use-4k';
import {
  getTargetForDirection,
  useDirectionalInputs,
  useInputPortal,
  PortalTarget,
} from '@/hooks/use-gamepad';
import { useNavigationFocus } from '@/hooks/use-navigation-focus';
import { getFontVariant } from '@/app/styles/fonts';
import { ListBoxItem, ListBoxItemProps } from './list-box-item';
import { ListBoxNotch } from './list-box-notch';

type ListBoxProps = {
  className?: string;
  items: ListBoxItemProps[];
  navigationFocusPathname?: string;
  portal?: string;
  portalTargets?: PortalTarget[];
};

export const ListBox = ({
  className,
  items,
  navigationFocusPathname,
  portal,
  portalTargets = [],
}: ListBoxProps) => {
  // Selected != focused. This is set when a link receives focus so we
  // know what description text to display below the box.
  const [selectedIndex, setSelectedIndex] = useState(0);

  const css = use4k();

  const defaultFocusRef = useNavigationFocus(navigationFocusPathname, portal);
  const { focusContainerRef, teleport } = useInputPortal({
    name: portal, defaultFocusRef
  });

  const handleFocusIn = () => {
    if (!focusContainerRef.current) return;
    const links = Array.from(focusContainerRef.current.querySelectorAll('a'));
    const focusedIndex = links.findIndex((link) => link === document.activeElement);
    setSelectedIndex(focusedIndex);
  };

  // Can't directly handle focusin via React.
  // TODO: Consider exposing an onFocusIn in the returned props
  // from useInputPortal? If only listbox needs it then nah.
  useEffect(() => {
    if (!focusContainerRef.current) return;
    const current = focusContainerRef.current;
    current.addEventListener('focusin', handleFocusIn);
    return () => current.removeEventListener('focusin', handleFocusIn);
    // TODO: I need to better understand the error that pops up when you
    // include `handleFocusIn` in the useEffect deps array below.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [focusContainerRef]);

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

  const description = items[selectedIndex].description;

  // Instances of hsl(0, 0%, 50%) below ought to be hsla(0, 0%, 0%, 50%)
  // But this causes some jank, so opaque colors it is.
  return (
    <div className={className}>
      <div
        ref={focusContainerRef}
        className={css`
          position: relative;
          display: flex;
          flex-direction: column;
          border: 0.093vh solid hsl(0, 0%, 50%);
          padding: 0.463vh;
        `}
      >
        {/*
          This is that little extra-wide piece of the left border.
          The `left` below is eyeballed, but I'm confused why that was needed.
          Perhaps natural jank from the very (and variably) thin borders?
        */}
        <div className={css`
          position: absolute;
          top: 50%;
          left: -0.175vh;
          width: 0.278vh;
          height: 7.222vh;
          margin-top: -3.611vh;
          background: hsl(0, 0%, 50%);
        `}/>
        <ListBoxNotch type="top" />
        <div className={css`
          flex-grow: 1;
          background: hsla(0, 0%, 0%, 0.5);
        `}>
          <ul className={css`
            position: relative;
            display: flex;
            flex-direction: column;
            gap: 0.972vh;
            padding-top: 1.435vh;
            padding-bottom: 0.741vh;
            padding-left: 2.176vh;
            padding-right: 2.176vh;
          `}>
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
      <div
        hidden={!description}
        // The 40vw width below allows the description text to spill out of
        // any containing columns for the list. This value is eyeballed and
        // was chosen to work well with portrait-oriented screens, where the
        // text will wrap if needed. It is likely that this will need to be
        // configurable by the parent component as I employ ListBox in more
        // places.
        className={cx(
          css`
            position: absolute;
            display: flex;
            align-items: center;
            height: 1.296vh;
            width: 40vw;
            margin-top: 2.222vh;
            margin-left: 1.991vh;
          `,
          getFontVariant(css, 'titillium_description'),
          getFontVariant(css, 'shadow_crisp'),
        )}
      >
        {description}
      </div>
    </div>
  );
};
