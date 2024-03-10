'use client';

import { motion, Variants } from 'framer-motion';
import { use4k } from '@/hooks/use-4k';
import {
  getTargetForDirection,
  useDirectionalInputs,
  useInputPortal,
  PortalTarget,
} from '@/hooks/use-gamepad';
import { useNavigationFocus } from '@/hooks/use-navigation-focus';
import { BrightBoxListItem, BrightBoxListItemProps } from '@/components/list-box/bright-box-list-item';

const LIST_VARIANTS: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.04,
    },
  },
};

export const ITEM_VARIANTS: Variants = {
  hidden: { opacity: 0, y: '2.5%', scale: 0.975 },
  show: {
    opacity: 1,
    y: '0%',
    scale: 1,
    transition: {
      duration: 0.2,
      ease: 'easeOut',
    },
  },
};

type PortalGridItemProps = Omit<BrightBoxListItemProps, 'height' | 'padding' | 'textHeight' | 'portraitHeight'>;

function getEdges <T extends HTMLElement = HTMLElement>(item: T) {
  const itemEl = item.closest('li');
  const listEl = item.closest('ul');
  if (!itemEl || !listEl) return [];

  const edges = [];

  const { offsetTop, offsetLeft } = itemEl;
  const offsetBottom = listEl.clientHeight - (offsetTop + item.offsetHeight);
  const offsetRight = listEl.clientWidth - (offsetLeft + item.clientWidth);

  if (offsetTop === 0) edges.push('U');
  if (offsetBottom === 0) edges.push('D');
  if (offsetLeft === 0) edges.push('L');
  if (offsetRight === 0) edges.push('R');

  return edges;
};

type PortalGridProps = {
  portal: string;
  portalTargets: PortalTarget[];
  items: PortalGridItemProps[];
  itemHeight: number;
  itemPadding: number;
  itemTextHeight: number;
  itemPortraitHeight: number;
  navigationFocusPathname?: string;
};

export const PortalGrid = ({
  portal,
  portalTargets,
  items,
  itemHeight,
  itemPadding,
  itemTextHeight,
  itemPortraitHeight,
  navigationFocusPathname,
}: PortalGridProps) => {
  const css = use4k();

  const defaultFocusRef = useNavigationFocus(navigationFocusPathname, portal);

  const { focusContainerRef, teleport } = useInputPortal<HTMLUListElement>({
    name: portal, defaultFocusRef,
  });

  useDirectionalInputs({
    portal,
    callback: (direction) => {
      if (!focusContainerRef.current) return;

      const links = Array.from(focusContainerRef.current.querySelectorAll('a'));
      const focusedIndex = links.findIndex((link) => link === document.activeElement);
      const edges = getEdges<HTMLLIElement>(document.activeElement as HTMLLIElement);
      const portalTarget = getTargetForDirection(portalTargets, direction);

      // If we're on an edge but we don't have a portal target just bail.
      // E.g. the right edge of the community file share grid.
      if (edges.includes(direction) && !portalTarget) return;
      if (edges.includes(direction) && portalTarget) return teleport(portalTarget.target);

      const computedStyle = window.getComputedStyle(focusContainerRef.current);
      const columns = computedStyle.gridTemplateColumns.split(' ').length;
      let indexToFocus = focusedIndex;

      switch (direction) {
        case 'U':
          indexToFocus = Math.max(focusedIndex - columns, 0);
          break;
        case 'D':
          indexToFocus = Math.max(focusedIndex + columns, 0);
          break;
        case 'L':
          indexToFocus = Math.max(focusedIndex - 1, 0);
          break;
        case 'R':
          indexToFocus = Math.max(focusedIndex + 1, 0);
          break;
      }

      links[indexToFocus]?.focus();
    },
  });

  return (
    <motion.ul
      ref={focusContainerRef}
      className={css`
        // position:relative required for correct 'edges' calculations.
        position: relative;
        display: grid;
        grid-template-columns: 1fr 1fr;
        column-gap: 2.969vw; // vw is correct.
        row-gap: 2.963vh;

        // The grid stuff above and this media query needs to be configurable
        // or whatever once we have other grid types
        @media (orientation: portrait) {
          display: flex;
          flex-direction: column;

          li {
            margin: inherit;
          }
        }
      `}
      variants={LIST_VARIANTS}
      initial="hidden"
      animate="show"
    >
      {items.map((item, i) => {
        return (
          <BrightBoxListItem
            key={item.href}
            // This is how we make sure the first item is selected by default.
            defaultFocusRef={i === 0 ? defaultFocusRef : undefined}
            src={item.src}
            href={item.href}
            text={item.text}
            textHeight={itemTextHeight}
            height={itemHeight}
            padding={itemPadding}
            portraitHeight={itemPortraitHeight}
            motionVariants={ITEM_VARIANTS}
          />
        );
      })}
    </motion.ul>
  );
};
