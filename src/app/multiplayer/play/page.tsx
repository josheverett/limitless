'use client';

import { motion } from 'framer-motion';

export default function PlayTab() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div>Play Tab</div>
    </motion.div>
  );
}
