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

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <ListBox
        className={css`
          width: 37.222vh;
          margin-top: 35.324vh;

          @media (orientation: portrait) {
            width: auto;
          }
        `}
        items={LIST_ITEMS}
        descriptionWidthPortrait={80}
        navigationFocusPathname="/multiplayer/play"
        portal="PlayTabListBox"
        portalTargets={[
          { target: 'MultiplayerAppTabs', direction: 'U' },
        ]}
      />
    </motion.div>
  );
}
