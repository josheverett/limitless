'use client';

import { motion } from 'framer-motion';
import { use4k, TABBED_PAGE_PADDING_X } from '@/hooks/use-4k';
import { MediumColumn } from '@/layouts/medium-column';
import { ListBox } from '@/components/list-box/list-box';
import { OperationsBox } from '@/components/play-tab/operations/operations-box';
import { PlayTabCarousel } from '@/components/play-tab/carousel';
import { Challenges } from '@/components/play-tab/challenges/challenges';
import { PlayTabBackground } from '@/components/3d/multiplayer/play-bg';

export default function StartScreen() {
  const css = use4k();

  return (
    <main className="start-screen">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <div className={css`
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100vh;
        `}>
          dffdf
        </div>
      </motion.div>
    </main>
  );
}
