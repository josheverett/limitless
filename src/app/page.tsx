'use client';

import { useEffect, useState } from 'react';
import { cx } from '@emotion/css';
import { motion } from 'framer-motion';
import { use4k } from '@/hooks/use-4k';
import { Image } from '@/components/image';
import { TextOffset } from '@/components/text';
import { InputButton } from '@/components/input-button';
import { LineTree, CAP_HEIGHT } from '@/components/start-screen/line';
import { InfiniteLogo } from '@/components/start-screen/infinite-logo';
import { getFontVariant } from '@/app/styles/fonts';

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
  const [shouldRenderLogo, setShouldRenderLogo] = useState(false);

  // stupid workaround for 4k mode bug
  useEffect(() => {
    setTimeout(() => setShouldRenderLogo(true), LOGO_ANIMATION_DELAY * 1000);
  });

  const pressAToPlayClassName = cx(
    getFontVariant(css, 'teko_2_3_extra_wide_light'),
    // getFontVariant(css, 'shadow_crisp'),
    css`
      font-size: 3.5vh;
      // This is a one-off shadow.
      text-shadow: 0.1vh 0.15vh hsla(0, 0%, 0%, 0.8);
    `,
  );

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <main className={cx(
        'start-screen',
        css`
          display: flex;
          flex-direction: column;
          align-items: center;
          // oh, this stuff isn't actually centered. derpy doo.
          // Minus the "Press A" bit, the "Halo" and "Infinite" *look*
          // centered, but they ain't. Dumb margins it is!
          // justify-content: center;
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100vh;
        `,
      )}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ ease: 'easeIn', duration: 1.5 }}
        >
          <div className={css`
            position: relative;
            width: 27.593vh;
            height: 4.028vh;
            margin-top: 42.176vh;
          `}>
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
          {/* We render null until the setTimeout goes off because it works
              around a tricky bug with scaled transitions. */}
          {shouldRenderLogo ? <InfiniteLogo lines={LOGO_LINES} /> : null }
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ ease: 'easeIn', duration: 0.5 }}
        >
          <div className={css`
            display: flex;
            align-items: center;
            height: 1.759vh;
            margin-top: 5.509vh;
            margin-right: -0.7vh;
          `}>
            <TextOffset className={pressAToPlayClassName} smush top="0.2vh">Press</TextOffset>
            <InputButton
              className={css`width: 2vh; height: 2vh; margin: 0 1.1vh 0 0.7vh`}
              shadowed
              input="A"
              callback={() => { console.log('SUP A'); }}
            />
            <TextOffset className={pressAToPlayClassName} smush top="0.2vh">to play</TextOffset>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ ease: 'easeIn', duration: 0.5 }}
        >
          <div className={cx(
            getFontVariant(css, 'teko_2_3'),
            css`
              position: absolute;
              bottom: 2.269vh;
              // right: 2.731vh;
              right: 3.2vh; // eyeballed to account for italics
              height: 0.972vh;
              font-size: 1.944vh;
              text-transform: none;
            `
          )}>
            <TextOffset smush italic top="-0.833vh">Version 6.10025.15257.0</TextOffset>
          </div>
        </motion.div>
      </main>
    </motion.div>
  );
}
