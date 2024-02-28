'use client';

import { useState, useEffect } from 'react';
import { motion, Variants } from 'framer-motion';
import { cx } from '@emotion/css';
import { use4k } from '@/hooks/use-4k';
import {
  getTargetForDirection,
  useDirectionalInputs,
  useInputPortal,
  PortalTarget,
} from '@/hooks/use-gamepad';
import { useNavigationFocus } from '@/hooks/use-navigation-focus';
import { TextOffset } from '@/components/text';
import { getFontVariant } from '@/app/styles/fonts';
import { ListBoxItem, ListBoxItemProps } from './list-box-item';
import { ListBoxNotch } from './list-box-notch';

const LIST_VARIANTS: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
    }
  }
};

export const ITEM_VARIANTS: Variants = {
  hidden: { opacity: 0, x: '10%' },
  show: {
    opacity: 1,
    x: '0%',
    transition: {
      duration: 0.3,
      ease: 'easeOut',
    },
  },
};

// re: descriptionWidths
// The default values of 40vw below allow the description text to spill out of
// any containing columns for the list, while still wrapping at a reasonable
// spot (that, importantly, results in the correct line breaks in 4k mode).
// This default value is eyeballed based on good results in both landscape and
// portrait orientations. These widths might need to be adjusted for some use
// cases, hence these props.

type ListBoxProps = {
  className?: string;
  items: ListBoxItemProps[];
  bordered?: boolean;
  descriptionWidthLandscape?: number; // vw units! not vh!
  descriptionWidthPortrait?: number; // vw units! not vh!
  navigationFocusPathname?: string;
  portal?: string;
  portalTargets?: PortalTarget[];
};

export const ListBox = ({
  className,
  items,
  bordered = false,
  descriptionWidthLandscape = 40,
  descriptionWidthPortrait = 40,
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

  // selectedIndex exists only to determine what description text to display.
  // This function makes sure it gets set correctly whenever a listbox item
  // receives focus.
  const handleFocusIn = () => {
    if (!focusContainerRef.current) return;
    const links = Array.from(focusContainerRef.current.querySelectorAll('a'));
    const focusedIndex = links.findIndex((link) => link === document.activeElement);
    setSelectedIndex(focusedIndex);
  };

  // Can't directly handle focusin via React.
  // TODO: Consider exposing an onFocusIn in the returned props
  // from useInputPortal? If only listbox needs it then nah.
  // Reminder: As mentioned above, listbox needs this to set the correct
  // selectedIndex, used for the "detached" description display. That
  // description text isn't part of the <ul> -- hence the need for
  // special handling on top of the normal focus/input patterns.
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
          if (portalTarget) return teleport(portalTarget.target);
          break;
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
          border: ${bordered ? '0.093vh solid hsl(0, 0%, 50%)' : 'none'};
          padding: ${bordered ? '0.463vh' : '0'};
        `}
      >
        {bordered && (
          <>
            {/*
              This div is that little extra-wide piece of the left border.
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
          </>
        )}
        <div className={css`
          flex-grow: 1;
          background: ${bordered ? 'hsla(0, 0%, 0%, 0.5)': 'none'};
        `}>
          <motion.ul
            className={css`
              position: relative;
              display: flex;
              flex-direction: column;
              gap: 0.787vh;
              padding: ${bordered ? '1.296vh 2.176vh 0.741vh': '0'};
            `}
            variants={LIST_VARIANTS}
            initial="hidden"
            animate="show"
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
          </motion.ul>
        </div>
        {bordered && <ListBoxNotch type="bottom" />}
      </div>
      <div hidden={!description} className={css`position: relative; height: 0;`}>
        {/* Have to wrap */}
        <div
          className={cx(
            css`
              position: fixed;
              bottom: 18.935vh;
              // vw is correct.
              left: 5.156vw;
              height: 1.25vh;
              // vw is correct.
              width: ${String(descriptionWidthLandscape)}vw;
              // Matches padding of list items.
              padding-left: 1.991vh;

              @media (orientation: portrait) {
                // vw is correct.
                width: ${String(descriptionWidthPortrait)}vw;
              }
            `,
            getFontVariant(css, 'titillium_description'),
            getFontVariant(css, 'shadow_crisp'),
          )}
        >
          {/* <TextOffset top="-0.741vh"> */}
          <TextOffset top="-0.787vh">
            {description}
          </TextOffset>
        </div>
      </div>
    </div>
  );
};
