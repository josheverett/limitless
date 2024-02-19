'use client';

import { useEffect, useState, useRef, useContext } from 'react';
import { AppContext } from '@/app/context';

const FOURK_WIDTH = 3840;
const FOURK_HEIGHT = 2160;
const FOURK_MARGIN = 40;

type ResizeProps = {
  children: React.ReactNode;
};

export const Resize = ({ children }: ResizeProps) => {
  const { force4k, setForce4k } = useContext(AppContext);

  const ref = useRef<HTMLDivElement>(null);
  const [resizeCounter, setResizeCounter] = useState(0);
  const [lastViewportSize, setLastViewportSize] = useState([0, 0]);

  useEffect(() => {
    setLastViewportSize([window.innerWidth, window.innerHeight]);
  }, []);

  // TODO: This viewport / scaling stuff needs to be put into a hook
  // eventually for use in the campaign app.
  useEffect(() => {
    if (!ref.current) return;
    // okay first toggle the className on body
    document.body.classList.toggle('force4k', force4k);

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
    // position:fixed is necessary to work around a scaling bug
    // in webkit and blink (and others?).
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
    <div ref={ref} className="resize-container">
      {children}
    </div>
  );
};
