'use client';

import { motion } from 'framer-motion';
import { use4k } from '@/hooks/use-4k';
import { ResponsiveMediumColumn } from '@/layouts/medium-column';
import { ListBox } from '@/components/list-box/list-box';
import { NotchedHeading } from '@/components/notched-heading';

const GAP = '3.646vw'; // vw is correct.

const LIST_ITEMS = [
  {
    href: 'multiplayer/community/browser',
    text: 'Customs Browser',
    description: 'Find and join custom games hosted by other players.',
  },
  {
    href: 'multiplayer/community/theater',
    text: 'Theater',
    description: 'View films and post-game results of multiplayer matches.',
  },
  {
    href: 'multiplayer/community/bookmarks',
    text: 'My Bookmarks',
    description: 'View your bookmarked files.',
  },
  {
    href: 'multiplayer/community/files',
    text: 'My Files',
    description: 'View your files.',
  },
];

export default function CommunityTab() {
  const css = use4k();

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className={css`display: flex; gap: ${GAP};`}>
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
        <div className={css`flex-grow: 1; margin-top: 4.444vh;`}>
          <NotchedHeading title="Community File Share" />
        </div>
      </div>
    </motion.div>
  );
}
