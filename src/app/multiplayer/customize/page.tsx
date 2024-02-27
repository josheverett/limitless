'use client';

import { motion } from 'framer-motion';
import { use4k } from '@/hooks/use-4k';
import { ListBox } from '@/components/list-box/list-box';
import { CustomizeTabBackground } from '@/components/3d/multiplayer/customize-bg';


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
      <div className={css`
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        // height: 100%;
        height: 100vh;
        z-index: 1;
      `}>
        <CustomizeTabBackground />
      </div>
      <ListBox
        className={css`
          position: relative;
          width: 37.222vh;
          margin-top: 36.204vh;
          z-index: 2;

          @media (orientation: portrait) {
            width: auto;
          }
        `}
        items={LIST_ITEMS}
        descriptionWidthPortrait={80}
        navigationFocusPathname="/multiplayer/customize"
        portal="CustomizeTabListBox"
        portalTargets={[
          { target: 'MultiplayerAppTabs', direction: 'U' },
        ]}
      />
    </motion.div>
  );
}
