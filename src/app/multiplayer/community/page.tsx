'use client';

import { motion } from 'framer-motion';
import { use4k } from '@/hooks/use-4k';
import {
  getTargetForDirection,
  useDirectionalInputs,
  useInputPortal,
  PortalTarget,
} from '@/hooks/use-gamepad';
import { BrightBoxListItem } from '@/layouts/bright-box-list-item';
import { ResponsiveMediumColumn } from '@/layouts/medium-column';
import { ListBox } from '@/components/list-box/list-box';
import { NotchedHeading } from '@/components/notched-heading';

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

// This stuff is gonna have to get abstracted to a hook at some point when
// we have another grid. Directional inputs, erethang.
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

type FileShareListProps = {
  portalTargets: PortalTarget[];
};

const FileShareList = ({ portalTargets }: FileShareListProps) => {
  const css = use4k();

  const { focusContainerRef, defaultFocusRef, teleport } = useInputPortal<HTMLUListElement>({
    name: 'CommunityTabGrid',
  });;

  useDirectionalInputs({
    portal: 'CommunityTabGrid',
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
    <div className={css`margin: 2.963vh 0;`}>
      <ul
        ref={focusContainerRef}
        className={css`
          // position:relative required for correct 'edges' calculations.
          position: relative;
          display: grid;
          grid-template-columns: 1fr 1fr;
          column-gap: 2.969vw; // vw is correct.
          row-gap: 2.963vh;

          @media (orientation: portrait) {
            display: block;

            li {
              margin: inherit;
            }
          }
        `}
        >
        {FILE_SHARE_ITEMS.map((item, i) => {
          return (
            <li key={item.href}>
              <BrightBoxListItem
                // This is how we make sure the first item is selected by default.
                defaultFocusRef={i === 0 ? defaultFocusRef : undefined}
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
  );
};

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

export default function CommunityTab() {
  const css = use4k();

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className={css`
        display: flex;
        gap: 3.646vw; // vw is correct.
      `}>
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
                { target: 'CommunityTabGrid', direction: 'R' },
              ]}
            />
          </ResponsiveMediumColumn>
        </div>
        <div className={css`
          flex-grow: 1; margin-top: 4.444vh;

          @media (orientation: portrait) {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        `}>
          {/* This wrapping div is so grid directional input calculations
              can ignore margin/padding/border. */}
          <div>
            <NotchedHeading title="Community File Share" />
            <FileShareList portalTargets={[
              { target: 'MultiplayerAppTabs', direction: 'U' },
              // TODO: teleport to button
              // { target: '...', direction: 'D' },
              { target: 'CommunityTabListBox', direction: 'L' },
            ]} />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
