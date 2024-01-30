'use client';

import { motion } from 'framer-motion';
import { MultiplayerLayout } from '@/components/layouts/multiplayer-layout';

export default function CommunityTab() {
  return (
    <MultiplayerLayout>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <div>Community Tab</div>
      </motion.div>
    </MultiplayerLayout>
  );
}
