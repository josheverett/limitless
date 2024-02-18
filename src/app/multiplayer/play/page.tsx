'use client';

import { motion } from 'framer-motion';
import { use4k, TABBED_PAGE_PADDING_X } from '@/hooks/use-4k';
import { MediumColumn } from '@/layouts/medium-column';
import { ListBox } from '@/components/list-box/list-box';
import { OperationsBox } from '@/components/play-tab/operations/operations-box';
import { PlayTabCarousel } from '@/components/play-tab/carousel';
import { Challenges } from '@/components/play-tab/challenges/challenges';
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

type ResponsiveMediumColumnProps = {
  children: React.ReactNode;
};

// If this adjustment is made outside of this particular page it
// needs to become a feature of the MediumColumn component.
const ResponsiveMediumColumn = ({
  children,
}: ResponsiveMediumColumnProps) => {
  const css = use4k();

  return (
    <MediumColumn className={css`
      @media (orientation: portrait) {
        // vw is correct.
        width: calc(50vw - (${TABBED_PAGE_PADDING_X} * 1.5));
      }
    `}>
      {children}
    </MediumColumn>
  );
};

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
