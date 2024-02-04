'use client';

import { motion } from 'framer-motion';

export default function CustomizeTab() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div>Customize Tab</div>
    </motion.div>
  );
}
