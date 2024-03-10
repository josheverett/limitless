'use client';

import { motion } from 'framer-motion';
import { use4k } from '@/hooks/use-4k';
import { ResponsiveMediumColumn } from '@/layouts/medium-column';
import { PortalGrid } from '@/layouts/portal-grid';
import { ListBox } from '@/components/list-box/list-box';
import { NotchedHeading } from '@/components/notched-heading';

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
          <NotchedHeading title="Community File Share" />
          <div className={css`margin: 2.963vh 0;`}>
            <PortalGrid
              portal="CommunityTabGrid"
              portalTargets={[
                { target: 'MultiplayerAppTabs', direction: 'U' },
                // TODO: teleport to button
                // { target: '...', direction: 'D' },
                { target: 'CommunityTabListBox', direction: 'L' },
              ]}
              items={FILE_SHARE_ITEMS}
              itemHeight={24.537}
              itemPortraitHeight={10}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
