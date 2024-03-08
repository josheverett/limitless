'use client';

import { motion } from 'framer-motion';
import { cx } from '@emotion/css';
import { use4k } from '@/hooks/use-4k';
import {
  getTargetForDirection,
  useDirectionalInputs,
  useInputPortal,
  PortalTarget,
} from '@/hooks/use-gamepad';
import { useNavigationFocus } from '@/hooks/use-navigation-focus';
import { BrightBoxListItem } from '@/layouts/bright-box-list-item';
import { ResponsiveMediumColumn } from '@/layouts/medium-column';
import { ListBox } from '@/components/list-box/list-box';
import { NotchedHeading } from '@/components/notched-heading';

const GAP = '3.646vw'; // vw is correct.

const LIST_ITEMS = [
  {
    href: '/multiplayer/community/browser',
    text: 'Customs Browser',
    description: 'Find and join custom games hosted by other players.',
  },
  {
    href: '/multiplayer/community/theater',
    text: 'Theater',
    description: 'View films and post-game results of multiplayer matches.',
  },
  {
    href: '/multiplayer/community/bookmarks',
    text: 'My Bookmarks',
    description: 'View your bookmarked files.',
  },
  {
    href: '/multiplayer/community/files',
    text: 'My Files',
    description: 'View your files.',
  },
];

// TODO: These are the carousel images, just placeholders here.
const FILE_SHARE_ITEMS = [
  {
    src: '/multiplayer/play/january-update.jpg',
    href: '/multiplayer/community/recommended',
    text: 'Recommended',
  },
  {
    src: '/multiplayer/play/illusion.jpg',
    href: '/multiplayer/community/maps',
    text: 'Popular Maps',
  },
  {
    src: '/multiplayer/play/spirit-of-fire.jpg',
    href: '/multiplayer/community/modes',
    text: 'Popular Modes',
  },
  {
    src: '/multiplayer/play/lone-wolves.jpg',
    href: '/multiplayer/community/prefabs',
    text: 'Popular Prefabs',
  },
];

const PORTAL_NAME = 'CommunityTabGrid';

const PORTAL_TARGETS: PortalTarget[] = [
  { target: 'PlayTabCarousel', direction: 'U' },
  { target: 'PlayTabOperations', direction: 'R' },
];

export default function CommunityTab() {
  const css = use4k();

  useNavigationFocus('/multiplayer/community', PORTAL_NAME);

  const { focusContainerRef, teleport } = useInputPortal<HTMLUListElement>({
    name: PORTAL_NAME,
  });

  // 1. Are we on an edge?
  // 2. Left edge --> list box
  // 3. Right --> nothing
  // 4. Bottom edge --> Browse All button
  // 5. Top edge --> tabs
  //
  // If L/R and not edge, ez pz just find the next/prev item with the same
  // offsetTop, then prev()/next()
  //
  // If U/D not on each, little harder. See ChatGPT grid chat.
  useDirectionalInputs({
    portal: PORTAL_NAME,
    callback: (direction) => {
      if (!focusContainerRef.current) return;

      let portalTarget: PortalTarget | undefined;

      const links = Array.from(focusContainerRef.current.querySelectorAll('a'));
      const focusedIndex = links.findIndex((link) => link === document.activeElement);

      // TODO: remove these
      const isAtStart = focusedIndex <= 0;
      const isAtEnd = focusedIndex >= links.length - 1;

      let indexToFocus = focusedIndex;

      switch (direction) {
        case 'L':
        case 'R': {
          portalTarget = getTargetForDirection(PORTAL_TARGETS, direction);
          if (portalTarget) return teleport(portalTarget.target);
          break;
        }
        // Up and down teleport only when the edge is reached (and a
        // portal is available).
        case 'U': {
          portalTarget = getTargetForDirection(PORTAL_TARGETS, 'U');
          if (!!portalTarget && isAtStart) return teleport(portalTarget.target);
          indexToFocus = isAtStart ? focusedIndex : focusedIndex - 1;
          break;
        }
        case 'D': {
          portalTarget = getTargetForDirection(PORTAL_TARGETS, 'D');
          if (!!portalTarget && isAtEnd) return teleport(portalTarget.target);
          indexToFocus = isAtEnd ? focusedIndex : focusedIndex + 1;
          break;
        }
      }

      links[indexToFocus]?.focus();
    },
  });

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className={css`display: flex; gap: ${GAP};`}>
        <div className={css`flex-shrink: 0;`}>
          <ResponsiveMediumColumn>
            <ListBox
              className={css`margin-top: 40.509vh;`}
              items={LIST_ITEMS}
              descriptionWidthLandscape={26}
              navigationFocusPathname="/multiplayer/community"
              portal="CommunityTabListBox"
              portalTargets={[
              { target: 'MultiplayerAppTabs', direction: 'U' },
            ]}
          />
          </ResponsiveMediumColumn>
        </div>
        <div className={cx(
          css`flex-grow: 1; margin-top: 4.444vh;`,
          'truncate'
        )}>
          <NotchedHeading title="Community File Share" />
          <ul
            ref={focusContainerRef}
            className={css`
              display: grid;
              grid-template-columns: 1fr 1fr;
              column-gap: 2.969vw; // vw is correct.
              row-gap: 2.963vh;
              margin: 2.963vh 0;

              @media (orientation: portrait) {
                display: block;

                li {
                  margin: inherit;
                }
              }
            `}
            >
            {FILE_SHARE_ITEMS.map((item) => {
              return (
                <li key={item.href}>
                  <BrightBoxListItem
                    src={item.src}
                    href={item.href}
                    text={item.text}
                    height={24.537}
                    portraitHeight={10}
                  />
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </motion.div>
  );
}
