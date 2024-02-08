'use client';

import { motion } from 'framer-motion';
import { use4k } from '@/hooks/use-4k';
import { MediumColumn } from '@/layouts/medium-column';
import { ListBox } from '@/components/list-box/list-box';
import { OperationsBox } from '@/components/operations/operations-box';
import { PlayTabCarousel } from './play-tab-carousel';

const LIST_ITEMS = [
  {
    href: '/campaign',
    text: 'CAMPAIGN',
    description: 'Unravel the mysteries of Zeta Halo through Solo or Co-Op play.',
  },
  {
    href: '/multiplayer/play/multiplayer',
    text: 'MULTIPLAYER',
    description: 'Play matches against other online players.',
  },
  {
    href: '/multiplayer/play/academy',
    text: 'ACADEMY',
    description: 'Build your own legend, Spartan.',
  },
  {
    href: '/multiplayer/play/custom',
    text: 'CUSTOM GAMES',
    description: 'Browse available community games or create your own custom match.',
  },
  {
    href: '/multiplayer/play/forge',
    text: 'FORGE',
    description: 'Build content to play and share with other players.',
  },
];

export default function PlayTab() {
  const css = use4k();

  // TODO: Add fade out. There's that wrapper element thing for this, the
  // one that adds the `exit` prop to the motion div.
  // Update: The real thing is so friggin janky about page transitions at times.
  // Don't be afraid to go rogue and improve upon the real thing.
  // There are very, very few places in the app where going rogue might make
  // sense, and this is one of them.
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      {/* This div with gap:30px is just here for debug/testing. */}
      <div className={css`
        display: flex;
        justify-content: space-between;
        margin-top: 4.167vh;
      `}>
        <MediumColumn>
          <PlayTabCarousel />
          <ListBox
            className={css`margin-top: 1.713vh;`}
            items={LIST_ITEMS}
            navigationFocusPathname="/multiplayer/play"
            portal='PlayTabListBox'
            portalTargets={[
              { target: 'PlayTabCarousel', direction: 'U' },
              // { target: 'PlayTabPortalTest', direction: 'R' }, // debug
              { target: 'PlayTabOperations', direction: 'R' }, // debug
            ]}
          />
        </MediumColumn>
        <div className={css`flex-grow: 1;`} />
        <MediumColumn>
          <OperationsBox />
        </MediumColumn>
      </div>
    </motion.div>
  );
}
