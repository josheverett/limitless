'use client';

import { motion } from 'framer-motion';
import { use4k } from '@/hooks/use-4k';
import { ResponsiveMediumColumn } from '@/layouts/medium-column';
import { ListBox } from '@/components/list-box/list-box';
import { OperationsBox } from '@/components/multiplayer/play/operations/operations-box';
import { PlayTabCarousel } from '@/components/multiplayer/play/carousel';
import { Challenges } from '@/components/multiplayer/play/challenges/challenges';
import { PlayTabBackground } from '@/components/3d/multiplayer/play-bg';

const LIST_ITEMS = [
  {
    href: '/campaign',
    text: 'Campaign',
    description: 'Unravel the mysteries of Zeta Halo through Solo or Co-Op play.',
  },
  {
    href: '/multiplayer/play/multiplayer',
    text: 'Multiplayer',
    description: 'Play matches against other online players.',
  },
  {
    href: '/multiplayer/play/academy',
    text: 'Acadmey',
    description: 'Build your own legend, Spartan.',
  },
  {
    href: '/multiplayer/play/custom',
    text: 'Custom Games',
    description: 'Browse available community games or create your own custom match.',
  },
  {
    href: '/multiplayer/play/forge',
    text: 'Forge',
    description: 'Build content to play and share with other players.',
  },
];

export default function PlayTab() {
  const css = use4k();

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className={css`
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        // height: 100%;
        height: 100vh;
        z-index: 1;
      `}>
        <PlayTabBackground />
      </div>
      <div className={css`
        position: relative;
        display: flex;
        justify-content: space-between;
        margin-top: 4.167vh;
        z-index: 2;
      `}>
        <ResponsiveMediumColumn>
          <PlayTabCarousel />
          <ListBox
            className={css`margin-top: 1.713vh;`}
            bordered
            items={LIST_ITEMS}
            navigationFocusPathname="/multiplayer/play"
            portal="PlayTabListBox"
            portalTargets={[
              { target: 'PlayTabCarousel', direction: 'U' },
              { target: 'PlayTabOperations', direction: 'R' },
            ]}
          />
        </ResponsiveMediumColumn>
        <ResponsiveMediumColumn>
          <OperationsBox />
          <Challenges className={css`margin-top: 3.287vh`} />
        </ResponsiveMediumColumn>
      </div>
    </motion.div>
  );
}
