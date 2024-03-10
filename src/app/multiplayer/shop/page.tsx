'use client';

import { motion } from 'framer-motion';
import { PortalGrid } from '@/layouts/portal-grid';

// TODO: These are the carousel images, just placeholders here.
const FILE_SHARE_ITEMS = [
  {
    src: '/multiplayer/play/january-update.jpg',
    href: '/multiplayer/community/recommended',
    text: 'Recommended',
  },
  {
    src: '/multiplayer/play/illusion.jpg',
    href: '/multiplayer/community/maps',
    text: 'Popular Maps',
  },
  {
    src: '/multiplayer/play/spirit-of-fire.jpg',
    href: '/multiplayer/community/modes',
    text: 'Popular Modes',
  },
  {
    src: '/multiplayer/play/lone-wolves.jpg',
    href: '/multiplayer/community/prefabs',
    text: 'Popular Prefabs',
  },
];

export default function ShopTab() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <PortalGrid
        portal="ShopTabGrid"
        portalTargets={[
          { target: 'MultiplayerAppTabs', direction: 'U' },
        ]}
        items={FILE_SHARE_ITEMS}
        itemHeight={24.537}
        itemPortraitHeight={10}
        navigationFocusPathname="/multiplayer/shop"
      />
    </motion.div>
  );
}
