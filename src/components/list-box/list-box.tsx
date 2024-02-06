'use client';

import { cx } from '@emotion/css';
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
};

export const ListBox = ({
  className,
  items,
  navigationFocusPathname,
  portal,
  portalTargets = [],
}: ListBoxProps) => {
  const css = use4k();

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

  // Instances of hsl(0, 0%, 50%) below ought to be hsla(0, 0%, 0%, 50%),
  // but this causes some jank so opaque colors it is.
  return (
    <div
      ref={focusContainerRef}
      className={cx(
        css`
          position: relative;
          display: flex;
          flex-direction: column;
          border: 0.093vh solid hsl(0, 0%, 50%);
          padding: 0.463vh;
        `,
        className,
      )}
    >
      {/*
        This is that little extra-wide piece of the left border.
        The `left` below is eyeballed, but confused why it was needed.
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
        background: hsla(0, 0%, 0%, 50%);
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
  );
};
