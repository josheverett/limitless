'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { cx } from '@emotion/css';
import { use4k } from '@/hooks/use-4k';
import { Image } from '@/components/image';
import { InputButton } from '@/components/input-button';
import { InfiniteLogo } from '@/components/start-screen/infinite-logo';
import { TextOffset } from '@/components/text';
import { getFontVariant } from '@/app/styles/fonts';

const PressAToPlay = () => {
  const router = useRouter();
  const css = use4k();

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
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ ease: 'easeIn', duration: 0.5 }}
      >
        <Link
          href="/multiplayer/play"
          className={css`
            display: flex;
            align-items: center;
            height: 1.759vh;
            margin-top: 5.509vh;
            margin-right: -0.7vh;
          `}
        >
          <TextOffset className={pressAToPlayClassName} smush top="0.2vh">Press</TextOffset>
          <InputButton
            className={css`margin: 0 1.1vh 0 0.7vh;`}
            width={2}
            height={2}
            shadowed
            input="A"
            callback={() => router.push('/multiplayer/play')}
          />
          <TextOffset className={pressAToPlayClassName} smush top="0.2vh">to play</TextOffset>
        </Link>
      </motion.div>
    </AnimatePresence>
  );
};

const SpinnerCorners = () => {
  const css = use4k();

  return (
    <div className={css`
      height: 0.185vh;
      border: solid var(--halo-lightgray);
      border-width: 0 0.185vh;
    `} />
  );
};

type SpinnerCircleProps = {
  position: 'inner' | 'outer';
  diameter: number; // vh units
  duration: number; // seconds
};

// All the gradients below are eyeballed.
const SpinnerCircle = ({
  position,
  diameter,
  duration,
}: SpinnerCircleProps) => {
  const css = use4k();

  const maskStop = position === 'inner' ? 50 : 60;

  const conicGradient = position === 'inner'
    ? `
      conic-gradient(
        from 0deg at center,
        transparent 5deg,
        var(--halo-offwhite) 180deg
      );
    `
    : `
      conic-gradient(
        from 0deg at center,
        transparent 5deg,
        var(--halo-offwhite) 5deg,
        var(--halo-offwhite) 90deg,
        transparent 90deg,
        transparent 95deg,
        var(--halo-mediumgray) 95deg,
        var(--halo-mediumgray) 180deg,
        transparent 180deg,
        transparent 185deg,
        var(--halo-offwhite) 185deg,
        var(--halo-offwhite) 270deg,
        transparent 270deg,
        transparent 275deg,
        var(--halo-mediumgray) 275deg,
        var(--halo-mediumgray) 360deg
      );
    `;

  return (
    <div className={css`
      position: absolute;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
    `}>
      <div className={css`
        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        width: ${String(diameter)}vh;
        height: ${String(diameter)}vh;

        background: ${conicGradient};

        clip-path: circle(50% at center);

        mask-image: radial-gradient(
          circle at center,
          transparent ${String(maskStop)}%,
          black ${String(maskStop)}%
        );
        animation: rotate ${String(duration)}s linear infinite;
      `} />
    </div>
  );
};

const LoadingSpinner = () => {
  const css = use4k();

  // TODO: slide up animation thingy. just use pos:relative

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ ease: 'easeIn', duration: 0.5 }}
    >
      <div className={css`width: 2.778vh;`}>
        <SpinnerCorners />
        <div className={css`
          position: relative;
          height: 2.407vh;
        `}>
          <SpinnerCircle position='outer' diameter={2.315} duration={10} />
          <SpinnerCircle position='inner' diameter={1.574} duration={4} />
        </div>
        <SpinnerCorners />
      </div>
      <div className={css`text-align: center;`}>
        Initializing data
      </div>
    </motion.div>
  );
};

const LOGO_ANIMATION_DELAY = 1.5; // seconds. delay before the whole thing kicks off.

export default function StartScreen() {
  const css = use4k();
  const [shouldRenderLogo, setShouldRenderLogo] = useState(false);
  // TODO: We wanna start preloading right away. But make sure it doesn't impact
  // UI perf, and if so just load it after the logo animation completes
  // or A gets pressed, whichever comes first.
  const [isLoading, setIsLoading] = useState(false);

  // stupid workaround for 4k mode bug
  useEffect(() => {
    setTimeout(() => setShouldRenderLogo(true), LOGO_ANIMATION_DELAY * 1000);
  });

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
              unoptimized
              priority
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
          {shouldRenderLogo ? <InfiniteLogo /> : null }
        </div>
        <PressAToPlay />
        <LoadingSpinner />
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
              font-size: 1.62vh;
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
