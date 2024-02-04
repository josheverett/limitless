'use client';

import { motion } from 'framer-motion';
import { use4k } from '@/hooks/use-4k';
import { MediumColumn } from '@/layouts/medium-column';
import { PlayTabCarousel } from './play-tab-carousel';

export default function PlayTab() {
  const _4k = use4k();

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <MediumColumn styles={_4k({ marginTop: '4.167vh' })}>
        <PlayTabCarousel />
        <div>listbox</div>
        <div>text</div>
      </MediumColumn>
    </motion.div>
  );
}
