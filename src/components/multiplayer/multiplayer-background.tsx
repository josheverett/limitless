'use client';

import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { use4k } from '@/hooks/use-4k';

type BG = { pathname: string, src: string };

const BGS: BG[] = [
  {
    pathname: '/multiplayer/play',
    src: '/multiplayer/play/play-bg.jpg',
  },
  {
    pathname: '/multiplayer/customize',
    // TODO: Darken and blur a bit.
    src: '/multiplayer/customize/bg.jpg',
  },
  {
    pathname: '/multiplayer/community',
    src: '/multiplayer/community/community-bg.webp',
  },
  {
    pathname: '/multiplayer/shop',
    src: '/multiplayer/shop/shop-bg.webp',
  },
];

type BackgroundImageProps = {
  bg: BG;
};

const BackgroundImage = ({ bg }: BackgroundImageProps) => {
  const css = use4k();
  const bgCss = bg.src ? `url("${bg.src}")` : 'none';

  return (
    <div
      className={css`
        width: 100%;
        height: 100%;
        background: black center / cover no-repeat;
        background-image: ${bgCss};
        // This single rule grinds Safari to a halt. So BGs that need to
        // be blurred will need to do it manually as part of the image.
        // filter: blur(0.15vh);
      `}
    />
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

export const MultiplayerBackground = () => {
  const pathname = usePathname();
  const bg = BGS.find((bg) => bg.pathname === pathname);

  if (!bg) return null;

  return (
    <Fade key={pathname}>
      <BackgroundImage bg={bg} />
    </Fade>
  );
};
