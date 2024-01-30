'use client';

import { motion } from 'framer-motion';

export default function CommunityTab() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div>Community Tab</div>
    </motion.div>
  );
}
