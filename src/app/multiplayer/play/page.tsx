'use client';

import { motion } from 'framer-motion';
import { use4k } from '@/hooks/use-4k';
import { MediumColumn } from '@/layouts/medium-column';
import { ListBox } from '@/components/list-box';
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

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <MediumColumn>
        <PlayTabCarousel style={_4k({ marginTop: '4.167vh' })} />
        <ListBox items={listItems} style={_4k({ marginTop: '1.713vh' })} />
        <div>text</div>
      </MediumColumn>
    </motion.div>
  );
}
