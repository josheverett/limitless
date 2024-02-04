'use client';

import React, { useEffect, useState, useRef, useContext } from 'react';
import { motion } from 'framer-motion';
import { AppContext } from '@/app/context';
import { use4k } from '@/hooks/use-4k';
import { Tabs } from '@/components/tabs';
import { Footer } from '@/components/footer/footer';

const FOURK_WIDTH = 3840;
const FOURK_HEIGHT = 2160;
const FOURK_MARGIN = 40;

type MultiplayerLayoutProps = {
  children: React.ReactNode;
};

export default function MultiplayerLayout({ children }: MultiplayerLayoutProps) {
  const { force4k, setForce4k } = useContext(AppContext);
  const _4k = use4k();

  const ref = useRef<HTMLElement>(null);
  const [resizeCounter, setResizeCounter] = useState(0);
  const [lastViewportSize, setLastViewportSize] = useState([0, 0]);

  const tabs = [
    { title: 'Play', href: '/multiplayer/play' },
    { title: 'Customize', href: '/multiplayer/customize' },
    { title: 'Community', href: '/multiplayer/community' },
    { title: 'Shop', href: '/multiplayer/shop' },
  ];

  useEffect(() => {
    setLastViewportSize([window.innerWidth, window.innerHeight]);
  }, []);

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
    ref.current.style.position = force4k ? `fixed` : '';
  }, [force4k, resizeCounter]);

  useEffect(() => {
    const resizeObserver = new ResizeObserver(() => {
      const viewportSize = [window.innerWidth, window.innerHeight];
      if (JSON.stringify(lastViewportSize) === JSON.stringify(viewportSize)) return;
      setResizeCounter(resizeCounter + 1);
      setLastViewportSize(viewportSize);
    });
    resizeObserver.observe(document.body);
    return () => resizeObserver.unobserve(document.body);
  }, [resizeCounter, lastViewportSize]);

  // If screen is larger than 4k, default to scaled mode.
  useEffect(() => {
    if (window.innerWidth > FOURK_WIDTH && window.innerHeight > FOURK_HEIGHT) {
      setForce4k(true);
    }
  }, [setForce4k]);

  return (
    // Notice how the FM div doesn't wrap main. That's intentional. This was
    // also just me making sure the thing works, it's just a POC. Temporary.
    <main
      ref={ref}
      // TODO: How to use nextjs optimization on this bg image?
      className="grow-0 shrink-0 w-full h-full transition-transform bg-[url('/multiplayer/play/play-bg.jpg')]"
    >
      <motion.div
        className="w-full h-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div
          className="h-full"
          style={_4k({
            paddingLeft: '5.208vw', // vw is correct
            paddingRight: '5.208vw', // vw is correct
            paddingTop: '6.019vh',
          })}
        >
            <Tabs tabs={tabs} />
            {children}
        </div>
        <Footer />
      </motion.div>
    </main>
  );
};
