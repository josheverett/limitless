'use client';

import { motion } from 'framer-motion';

export default function ShopTab() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div>Shop Tab</div>
    </motion.div>
  );
}
