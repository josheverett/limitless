'use client';

import { motion } from 'framer-motion';
import { use4k } from '@/hooks/use-4k';
import { MediumColumn } from '@/layouts/medium-column';
import { BrightBox } from '@/layouts/bright-box';
import { ListBox } from '@/components/list-box/list-box';
import { PlayTabCarousel } from './play-tab-carousel';

export default function PlayTab() {
  const _4k = use4k();

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
      <div className="flex gap-[30px]">
        <MediumColumn>
          <PlayTabCarousel style={_4k({ marginTop: '4.167vh' })} />
          <ListBox
            items={listItems}
            navigationFocusPathname="/multiplayer/play"
            portal='PlayTabListBox'
            portalTargets={[
              { target: 'PlayTabCarousel', direction: 'U' },
              { target: 'PlayTabPortalTest', direction: 'R' }, // debug
            ]}
            style={_4k({ marginTop: '1.713vh' })}
          />
          <div>text</div>
        </MediumColumn>

        {/* MediumColumn below is temp for testing input portals. */}
        <MediumColumn>
          <ListBox
            items={listItems}
            portal='PlayTabPortalTest'
            portalTargets={[{ target: 'PlayTabListBox', direction: 'L' }]}
            style={_4k({ marginTop: '1.713vh' })}
          />
        </MediumColumn>

        {/* MediumColumn below is temp for testing */}
        <MediumColumn>
          <PlayTabCarousel style={_4k({ marginTop: '4.167vh' })} />
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
