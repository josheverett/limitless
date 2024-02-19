'use client';

import { cx } from '@emotion/css';
import { motion } from 'framer-motion';
import { use4k } from '@/hooks/use-4k';
import { Image } from '@/components/image';
import { Line, LineTree, CAP_HEIGHT } from '@/components/start-screen/line';

// This shit is exactly as hilarious as it looks.

// LOGO_LINES is more readable than the plain JSX.
// Other than position and width/height, all values are eyeballed.
const LOGO_LINES: LineTree[] = [
  // I
  {
    type: 'vertical', startXY: [10, 0.25],
    initialHeight: CAP_HEIGHT/2, transformOrigin: 'bottom left', delay: 0.2,
  },

  // N
  {
    type: 'vertical', position: [3.611, 0], startXY: [8, -0.25], initialHeight: CAP_HEIGHT/5,
    children: [{ type: 'diagonal' }],
  },
  {
    type: 'vertical', position: [7.037, 0], startXY: [6, 0.25], initialHeight: CAP_HEIGHT/5,
    transformOrigin: 'bottom left',
  },

  // F
  {
    type: 'vertical', position: [10.602, 0], startXY: [4, -0.25], initialHeight: CAP_HEIGHT/5,
    children: [
      { type: 'horizontal', width: 3.38 },
      { type: 'horizontal', width: 2.824, position: [0, 2.407] },
    ]
  },

  // I
  {
    type: 'vertical', position: [16.435, 0], startXY: [2, 0.25], initialHeight: CAP_HEIGHT/2,
    transformOrigin: 'bottom left', delay: 0.2,
  },

  // N
  {
    type: 'vertical', position: [19.954, 0], startXY: [-2, -0.25], initialHeight: CAP_HEIGHT/2,
    delay: 0.1,
    children: [{ type: 'diagonal', delay: 0.1 }],
  },
  {
    type: 'vertical', position: [23.38, 0], startXY: [-4, 0.25], initialHeight: CAP_HEIGHT/2,
    transformOrigin: 'bottom left', delay: 0.1,
  },

  // I
  {
    type: 'vertical', position: [26.898, 0], startXY: [-6, -0.25], initialHeight: CAP_HEIGHT/3
  },

  // T
  {
    type: 'vertical', position: [31.528, 0], startXY: [-8, 0.25], initialHeight: CAP_HEIGHT/5,
    transformOrigin: 'bottom left', delay: 0.2,
    children: [
      {
        type: 'horizontal', width: 3.472, position: [-1.528, 0],
        transformOrigin: 'top center', delay: 0.2,
      },
    ]
  },

  // E
  {
    type: 'vertical', position: [36.065, 0], startXY: [-10, -0.25], initialHeight: CAP_HEIGHT * (2/3),
    delay: 0.3,
    children: [
      { type: 'horizontal', width: 3.241, delay: 0.3 },
      { type: 'horizontal', width: 2.824, position: [0, 2.407], delay: 0.6 },
      { type: 'horizontal', width: 3.241, position: [0, 4.769], delay: 0.3 },
    ]
  },
];

const LOGO_ANIMATION_DELAY = 1.5; // seconds. delay before the whole thing kicks off.

export default function StartScreen() {
  const css = use4k();

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <main className={cx(
        'start-screen',
        css`
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100vh;
        `
      )}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ ease: 'easeIn', duration: 1.5 }}
        >
          <div className={css`position: relative; width: 27.593vh; height: 4.028vh;`}>
            <Image
              className={css`width: 100%; height: 100%;`}
              unoptimized
              fill
              src="/start-screen/halo.svg"
              alt="Halo"
            />
          </div>
        </motion.div>
        <div
          className={css`
            position: relative;
            width: 39.259vh;
            height: 5.185vh;
            margin-top: 2.13vh;
          `}
          role="img"
          aria-label="Infinite"
        >
          {LOGO_LINES.map((parentLine, i) => {
            const { delay, children, ...parentProps } = parentLine;
            const delay_ = (delay || 0) + LOGO_ANIMATION_DELAY;
            // It's ok to use indexes as keys here, everything is static.
            return (
              <Line key={`line-parent-${i}`} delay={delay_} {...parentProps}>
                {children?.map((childLine, ii) => {
                  // Even though there's no children it needs to be destructured
                  // lest we try to set children={[]} on a react component.
                  const { delay, children: _, ...childProps } = childLine;
                  const delay_ = (delay || 0) + LOGO_ANIMATION_DELAY;
                  return <Line key={`line-child-${ii}`} delay={delay_} {...childProps} />;
                })}
              </Line>
            );
          })}
        </div>
        <div className={css`margin-top: 5.509vh`}>Press a to play</div>
      </main>
    </motion.div>
  );
}
