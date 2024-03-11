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
import {
  BrightBoxListItem,
  BrightBoxListItemProps,
} from '@/components/list-box/bright-box-list-item';

const LIST_VARIANTS: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

// TODO: Animation for the stacked first two cells will need a different variant.
// Start with a separate variants obj, then see if they can be combined into
// one with separate vairante keys here. I think that works?
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

type ShopListItemProps = Omit<BrightBoxListItemProps, 'height' | 'padding' | 'textHeight' | 'portraitHeight'>;

type ShopListProps = {
  portal: string;
  portalTargets: PortalTarget[];
  items: ShopListItemProps[];
  itemHeight: number;
  itemPadding: number;
  itemTextHeight: number;
  itemPortraitHeight: number;
  navigationFocusPathname?: string;
};

// This component exists in part because I was burning too much time on trying
// to get the PortalGrid to play nice with css grid row stretching/spanning.
export const ShopList = ({
  portal,
  portalTargets,
  items,
  itemHeight,
  itemPadding,
  itemTextHeight,
  itemPortraitHeight,
  navigationFocusPathname,
}: ShopListProps) => {
  const css = use4k();

  const defaultFocusRef = useNavigationFocus(navigationFocusPathname, portal);

  const { focusContainerRef, teleport } = useInputPortal<HTMLUListElement>({
    name: portal, defaultFocusRef,
  });

  // TODO: This is just copypasta from ListBox. Figure out what
  // (if any) changes are needed then abstract this to a common place.
  // Oh one difference would be horizontal vs. vertical.
  // Ah crap an annoying different is the first two items being stacked/special.
  // In any case yeah see what can be abstracted if anything.
  useDirectionalInputs({
    portal,
    directions: ['U', 'L', 'R'],
    callback: (direction) => {
      if (!focusContainerRef.current) return;

      let portalTarget: PortalTarget | undefined;

      const links = Array.from(focusContainerRef.current.querySelectorAll('a'));
      const focusedIndex = links.findIndex((link) => link === document.activeElement);
      const isAtStart = focusedIndex <= 0;
      const isAtEnd = focusedIndex >= links.length - 1;

      let indexToFocus = focusedIndex;

      switch (direction) {
        // This can just be teleport('MultiplayerAppTabs') but I wanna facilitate
        // abstracting this to share with ListBox so keeping getTargetForDirection,
        // at least for now. We'll see.
        // Also, when abstracted we'll need to add back the "L or R" case.
        // Pretty sure we can still use directions prop with only some values,
        // should just work.
        case 'U': {
          portalTarget = getTargetForDirection(portalTargets, direction);
          if (portalTarget) return teleport(portalTarget.target);
          break;
        }

        // Related to above, these getTargetForDirection will always undefined
        // (that's expected and fine), but ListBox will need them.
        // ALSO: Combine the L and R switch cases, use `let` for indexToFocus,
        // then determine calc for indexToFocus value based on L/R.
        case 'L': {
          portalTarget = getTargetForDirection(portalTargets, 'U');
          if (!!portalTarget && isAtStart) return teleport(portalTarget.target);
          indexToFocus = isAtStart ? focusedIndex : focusedIndex - 1;
          break;
        }
        case 'R': {
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
    <motion.ul
      ref={focusContainerRef}
      className={css`
        display: flex;
        gap: 0.926vh;
        height: 69.444vh;
        margin-top: 5.093vh;

        // The grid stuff above and this media query needs to be configurable
        // or whatever once we have other grid types
        @media (orientation: portrait) {
          display: flex;
          flex-direction: column;
          gap: 3vh;
          width: 100%;
        }
      `}
      variants={LIST_VARIANTS}
      initial="hidden"
      animate="show"
    >
      {/* The first two items are special, as they are stacked on top of each other. */}
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
            className={css` width: 100%; `}
          />
        );
      })}
    </motion.ul>
  );
};
