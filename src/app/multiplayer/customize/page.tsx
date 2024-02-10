'use client';

import { motion } from 'framer-motion';
import { use4k } from '@/hooks/use-4k';
import { ResponsiveMediumColumn } from '@/layouts/medium-column';
import { ListBox } from '@/components/list-box/list-box';


const LIST_ITEMS = [
  {
    href: '/customize/armor',
    text: 'Armor Hall',
    description: 'Customize your armor for multiplayer.',
  },
  {
    href: '/customize/weapons',
    text: 'Weapons Bench',
    description: 'Customize your weapon accessories for multiplayer.',
  },
  {
    href: '/customize/vehicles',
    text: 'Vehicle Bay',
    description: 'Customize your vehicle accessories for multiplayer.',
  },
  {
    href: '/customize/body',
    text: 'Body & AI',
    description: 'Customize how your Spartan and AI appear in multiplayer.',
  },
  {
    href: '/customize/id',
    text: 'Spartan ID',
    description: 'Customize your nameplate, stance, and more.',
  },
];

export default function CustomizeTab() {
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
        position: relative;
        display: flex;
        justify-content: space-between;
        margin-top: 4.167vh;
      `}>
        <ResponsiveMediumColumn>
          {/* TODO: The black box around the list needs to be abstracted
              to "DarkBox" or similar. */}
          <ListBox
            className={css`margin-top: 1.713vh;`}
            items={LIST_ITEMS}
            navigationFocusPathname="/multiplayer/play"
            portal="PlayTabListBox"
            portalTargets={[
              { target: 'MultiplayerAppTabs', direction: 'U' },
            ]}
          />
        </ResponsiveMediumColumn>
      </div>
    </motion.div>
  );
}
