'use client';

import { motion } from 'framer-motion';
import { ShopList } from '@/components/multiplayer/shop/shop-list';

// TODO: These are the carousel images, just placeholders here.
const FILE_SHARE_ITEMS = [
  {
    src: '/multiplayer/play/january-update.jpg',
    href: '/multiplayer/lol404/community/recommended',
    text: 'Shop Item 1',
  },
  {
    src: '/multiplayer/play/illusion.jpg',
    href: '/multiplayer/lol404/community/maps',
    text: 'Shop Item 2',
  },
  {
    src: '/multiplayer/play/spirit-of-fire.jpg',
    href: '/multiplayer/lol404/community/modes',
    text: 'Shop Item 3',
  },
  {
    src: '/multiplayer/play/lone-wolves.jpg',
    href: '/multiplayer/lol404/community/prefabs',
    text: 'Shop Item 4',
  },
];

export default function ShopTab() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <ShopList
        portal="ShopTabGrid"
        portalTargets={[
          { target: 'MultiplayerAppTabs', direction: 'U' },
        ]}
        items={FILE_SHARE_ITEMS}
        itemHeight={69.444}
        itemPadding={2.778}
        itemTextHeight={5.556}
        itemPortraitHeight={10}
        navigationFocusPathname="/multiplayer/shop"
      />
    </motion.div>
  );
}
