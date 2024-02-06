'use client';

import { motion } from 'framer-motion';
import { use4k_new } from '@/hooks/use-4k';
import { MediumColumn } from '@/layouts/medium-column';
import { BrightBox } from '@/layouts/bright-box';
import { ListBox } from '@/components/list-box/list-box';
import { PlayTabCarousel } from './play-tab-carousel';

export default function PlayTab() {
  const css = use4k_new();

  const listItems = [
    { href: '/campaign', text: 'CAMPAIGN' },
    { href: '/multiplayer/play/multiplayer', text: 'MULTIPLAYER' },
    { href: '/multiplayer/play/academy', text: 'ACADEMY' },
    { href: '/multiplayer/play/custom', text: 'CUSTOM GAMES' },
    { href: '/multiplayer/play/forge', text: 'FORGE' },
  ];

  // TODO: Add fade out. There's that wrapper element thing for this, the
  // one that adds the `exit` prop to the motion div.
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      {/* This div with gap:30px is just here for debug/testing. */}
      <div className={css`display: flex; gap: 30px;`}>
        <MediumColumn>
          <PlayTabCarousel className={css`margin-top: 4.167vh;`} />
          <ListBox
            className={css`margin-top: 1.713vh;`}
            items={listItems}
            navigationFocusPathname="/multiplayer/play"
            portal='PlayTabListBox'
            portalTargets={[
              { target: 'PlayTabCarousel', direction: 'U' },
              { target: 'PlayTabPortalTest', direction: 'R' }, // debug
            ]}
          />
          <div>text</div>
        </MediumColumn>

        {/* MediumColumn below is temp for testing input portals. */}
        <MediumColumn>
          <ListBox
            className={css`margin-top: 1.713vh;`}
            items={listItems}
            portal='PlayTabPortalTest'
            portalTargets={[{ target: 'PlayTabListBox', direction: 'L' }]}
          />
        </MediumColumn>

        {/* MediumColumn below is temp for testing */}
        <MediumColumn>
          <BrightBox>
            <p>what in the hell</p>
            <p>what in the hell</p>
            <p>what in the hell</p>
            <p>what in the hell</p>
            <p>what in the hell</p>
            <p>what in the hell</p>
            <p>what in the hell</p>
          </BrightBox>
        </MediumColumn>

      </div>
    </motion.div>
  );
}
