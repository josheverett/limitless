'use client';

import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { use4k } from '@/hooks/use-4k';

const BGS = [
  {
    pathname: '/multiplayer/play',
    src: '/multiplayer/play/play-bg.jpg',
  },
  {
    pathname: '/multiplayer/customize',
    src: '/multiplayer/customize/bg.jpg',
  },
];

type MultiplayerBackgroundProps = {
  // TODO
};

// TODO: threejs stuff
export const MultiplayerBackground = ({}: MultiplayerBackgroundProps) => {
  const pathname = usePathname();
  const css = use4k();

  const src = BGS.find((bg) => bg.pathname === pathname)?.src;
  const bgCss = src ? `url("${src}")` : 'none';

  if (!src) return null;

  return (
    <motion.div
      key={pathname}
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
      <motion.div
        className={css`width: 100%; height: 100%;`}
        // initial={{ left: '20%', top: '20%' }}
        // animate={{ left: -'20%', top: -'20%' }}
        transition={{
          // duration: 5,
          // duration: 1,
          // ease: 'easeInOut',
          // repeat: Infinity,
          // repeatType: 'mirror'
        }}
      >
        <div className={css`
          width: 100%;
          height: 100%;
          background: black center / cover no-repeat;
          background-image: ${bgCss};
        `} />
      </motion.div>
    </motion.div>
  );
};
