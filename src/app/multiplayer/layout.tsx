'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Tabs } from '@/components/tabs';

const FOURK_WIDTH = 3840;
const FOURK_HEIGHT = 2160;
const FOURK_MARGIN = 40;

type MultiplayerLayoutProps = {
  children: React.ReactNode;
};

export default function MultiplayerLayout({ children }: MultiplayerLayoutProps) {
  const ref = useRef<HTMLElement>(null);
  // TOOFUTURE: It could be interesting to get _really_ fancy
  // and fill the viewport while also scaling to a size that
  // looks proportional. math tho. plus eyeballed magic numbers.
  const [force4k, setForce4k] = useState(false);
  const [resizeCounter, setResizeCounter] = useState(0);

  const tabs = [
    { title: 'Play', href: '/multiplayer/play' },
    { title: 'Customize', href: '/multiplayer/customize' },
    { title: 'Community', href: '/multiplayer/community' },
    { title: 'Shop', href: '/multiplayer/shop' },
  ];

  useEffect(() => {
    if (!ref.current) return;
    // oh god oh fuck i have to do math
    // help me high school algebra, you're my only hope
    // 1. Take % of 4k width, % of 4k height, then use whichever is smaller.
    // 2. Subtract N pixels from that (for a margin), then get the ratio to full 4k size.
    // 3. Multiplay that by 4k size of the other dimension. Now you have target w and h.
    // 4. scale = targetWidth/4kWidth
    // 5. Set ref div to target scale.
    // 6. Phew!
    let scale = 1;
    if (window.innerWidth < FOURK_WIDTH || window.innerHeight < FOURK_HEIGHT) {
      const viewportTo4kWidthRatio = window.innerWidth / FOURK_WIDTH;
      const viewportTo4kHeightRatio = window.innerHeight / FOURK_HEIGHT;
      const isWidthRatioGreater = viewportTo4kWidthRatio > viewportTo4kHeightRatio;
      let targetWidth = isWidthRatioGreater
        ? window.innerHeight * (FOURK_WIDTH / FOURK_HEIGHT)
        : window.innerWidth;
      targetWidth = Math.min(targetWidth, FOURK_WIDTH); // clamp to full 4k
      targetWidth -= FOURK_MARGIN * 2;
      scale = Math.round((targetWidth / FOURK_WIDTH) * 100) / 100;
    }

    ref.current.style.transform = force4k ? `scale(${scale})` : '';
    ref.current.style.width = force4k ? `${FOURK_WIDTH}px` : '';
    ref.current.style.height = force4k ? `${FOURK_HEIGHT}px` : '';
  }, [force4k, resizeCounter]);

  useEffect(() => {
    const resizeObserver = new ResizeObserver(() => {
      setResizeCounter(resizeCounter + 1);
    });
    resizeObserver.observe(document.body);
    return () => resizeObserver.unobserve(document.body);
  }, [resizeCounter]);

  // If screen is larger than 4k, default to scaled mode.
  useEffect(() => {
    if (window.innerWidth > FOURK_WIDTH && window.innerHeight > FOURK_HEIGHT) {
      setForce4k(true);
    }
  }, []);

  // I'd prefer to handle the 4k toggle in the app layout, but that file needs
  // to be a server component. Luckily it's a non-issue for the start screen.
  return (
    <main ref={ref} className="grow-0 shrink-0 w-full h-full transition-transform">
      <motion.div
        className="w-full h-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <Tabs tabs={tabs}></Tabs>
        <div>tab content start</div>
        {children}
        <div>tab content end</div>
        <div className="flex h-[7.26%] bg-black bg-opacity-40">
          <div onClick={() => setForce4k(!force4k)}>
            click to toggle forced 4k
          </div>
          footer
        </div>
      </motion.div>
    </main>
  );
};
