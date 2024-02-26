'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { use4k } from '@/hooks/use-4k';

type BG = { pathname: string, src: string, animated: boolean };

const BGS: BG[] = [
  {
    pathname: '/multiplayer/play',
    src: '/multiplayer/play/play-bg.jpg',
    animated: false,
  },
  {
    pathname: '/multiplayer/customize',
    src: '/multiplayer/customize/bg.jpg',
    animated: true,
  },
];

type BackgroundImageProps = {
  bg: BG;
};

const BackgroundImage = ({ bg }: BackgroundImageProps) => {
  const css = use4k();
  const bgCss = bg.src ? `url("${bg.src}")` : 'none';

  return (
    <div className={css`
      width: 100%;
      height: 100%;
      background: black center / cover no-repeat;
      background-image: ${bgCss};
      // This single rule grinds Safari to a halt. So BGs that need to
      // be blurred will need to do it manually as part of the image.
      // filter: blur(0.15vh);
    `} />
  );
};

type FadeProps = {
  children: React.ReactNode;
};

const Fade = ({ children }: FadeProps) => {
  const css = use4k();

  // Had some trouble with 100% instead of vw/vh, unsure why. Only this div lol.
  return (
    <motion.div
      className={css`
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
      `}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.25 }}
    >
      {children}
    </motion.div>
  );
};

type CompassDirection = { x: string; y: string };

const COMPASS_DIRECTIONS: { [key: string]: CompassDirection } = {
  NE: { x: '5%', y: '-5%' },
  SE: { x: '5%', y: '5%' },
  SW: { x: '-5%', y: '5%' },
  NW: { x: '-5%', y: '-5%' },
};

type Animation = [CompassDirection, CompassDirection];

const ANIMATIONS: Animation[] = [
  [COMPASS_DIRECTIONS.NE, COMPASS_DIRECTIONS.SW],
  [COMPASS_DIRECTIONS.SW, COMPASS_DIRECTIONS.NE],
  [COMPASS_DIRECTIONS.NW, COMPASS_DIRECTIONS.SE],
  [COMPASS_DIRECTIONS.SE, COMPASS_DIRECTIONS.NW],
];

const randomAnimation = () => {
  console.log('DERP', Math.floor(Math.random() * ANIMATIONS.length));
  return ANIMATIONS[Math.floor(Math.random() * ANIMATIONS.length)];
};

type PanProps = {
  children: React.ReactNode;
};

const Pan = ({ children }: PanProps) => {
  const [animation, setAnimation] = useState<Animation>(ANIMATIONS[0]);
  const css = use4k();

  const [initial, animate] = animation;

  useEffect(() => setAnimation(randomAnimation()), [setAnimation]);

  return (
    <motion.div
      className={css`width: 100%; height: 100%;`}
      // scale() must be part of these props, because motion takes
      // over the `transition` prop and will clobber stuff.
      initial={{ ...initial, scale: 1.2 }}
      animate={{ ...animate, scale: 1.2 }}
      transition={{
        duration: 45,
        // duration: 5, // debug
        ease: 'linear',
        repeat: Infinity,
        repeatType: 'mirror',
      }}
    >
      {children}
    </motion.div>
  );
};

export const MultiplayerBackground = () => {
  const pathname = usePathname();
  const bg = BGS.find((bg) => bg.pathname === pathname);

  if (!bg) return null;

  if (bg.animated) {
    return (
      <Fade>
        <Pan>
          <BackgroundImage bg={bg} />
        </Pan>
      </Fade>
    );
  }

  return (
    <Fade>
      <BackgroundImage bg={bg} />
    </Fade>
  );
};
