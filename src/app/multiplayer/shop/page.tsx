'use client';

import { motion } from 'framer-motion';
import { MultiplayerLayout } from '@/components/layouts/multiplayer-layout';

export default function ShopTab() {
  return (
    <MultiplayerLayout>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <div>Shop Tab</div>
      </motion.div>
    </MultiplayerLayout>
  );
}
