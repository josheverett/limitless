'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Tabs } from '@/components/tabs';

type LayoutProps = {
  children: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  const tabs = [
    { title: 'Play', href: '/multiplayer/play' },
    { title: 'Customize', href: '/multiplayer/customize' },
    { title: 'Community', href: '/multiplayer/community' },
    { title: 'Shop', href: '/multiplayer/shop' },
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <Tabs tabs={tabs}></Tabs>
      <div>tab content start</div>
      {children}
      <div>tab content end</div>
      <div>footer</div>
    </motion.div>
  );
};
