'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { LoadingManager } from 'three';
import { cx } from '@emotion/css';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { use4k } from '@/hooks/use-4k';
import { Image } from '@/components/image';
import { InputButton } from '@/components/input-button';
import { LoadingSpinner } from '@/components/loading-spinner';
import { InfiniteLogo } from '@/components/start-screen/infinite-logo';
import { TextOffset } from '@/components/text';
import { getFontVariant } from '@/app/styles/fonts';

type PressAToPlayProps = { callback: () => void; };

const PressAToPlay = ({ callback }: PressAToPlayProps) => {
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

  // This needs to be a focusable link, but not trigger a router push. So we
  // use a plain <a> tag with tabIndex=0. This is an interesting case. If it
  // pops up again I'll need to provide an idomatic way to do this.
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ ease: 'easeIn', duration: 0.5 }}
      >
        <a
          tabIndex={0}
          className={css`
            display: flex;
            align-items: center;
            height: 1.759vh;
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
            callback={callback}
          />
          <TextOffset className={pressAToPlayClassName} smush top="0.2vh">to play</TextOffset>
        </a>
      </motion.div>
    </AnimatePresence>
  );
};

const LoadingMessage = () => {
  const css = use4k();

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ ease: 'easeOut', duration: 0.25 }}
        className={css`
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 3.75vh;
        `}
      >
        <LoadingSpinner />
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ease: 'easeOut', duration: 0.3 }}
        >
          <div className={cx(
            css`
              height: 1.343vh;
              font-size: 1.852vh;
              text-align: center;
              // TODO: This should be a variant, shares some stuff with description variant.
              letter-spacing: 0.15vh;
            `,
            getFontVariant(css, 'titillium'),
            getFontVariant(css, 'shadow_crisp')
          )}>
            <TextOffset top="-0.741vh">Initializing data</TextOffset>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

const preloadModel = (path: string): Promise<string> => {
  const manager = new LoadingManager();
  const gltfLoader = new GLTFLoader(manager);

  return new Promise((resolve) => {
    manager.onLoad = () => resolve(path);
    gltfLoader.load(path, () => {}); // second arg is required
  });
};

const LOGO_ANIMATION_DELAY = 1500; // ms. delay before the whole thing kicks off.
const MIN_LOADING_TIME = 2000; // ms. minimum loading animation time, for ux.

const MODEL_PATHS = [
  '/3d/glb/spartan.glb',
  '/3d/glb/assault_rifle.glb',
  '/3d/glb/battle_rifle.glb',
  '/3d/glb/sniper.glb',
];

export default function StartScreen() {
  const router = useRouter();
  const [shouldRenderLogo, setShouldRenderLogo] = useState(false);
  // isLoading is for ux state. It does not track any actual loading progress.
  // It's only set to true once the A button is pressed. But the 3D models are
  // still preloading in the background at page load.
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStartTime, setLoadingStartTime] = useState(0);
  const [areModelsPreloaded, setAreModelsPreloaded] = useState(false);
  const css = use4k();

  // stupid workaround for 4k mode bug
  useEffect(() => {
    setTimeout(() => setShouldRenderLogo(true), LOGO_ANIMATION_DELAY);
  });

  const modelPaths = useMemo(() => MODEL_PATHS, []);

  useMemo(() => {
    const preloadModels = async () => {
      for (const path of modelPaths) await preloadModel(path);
      setAreModelsPreloaded(true);
    };
    preloadModels();
  }, [modelPaths]);

  const route = '/multiplayer/play';

  useEffect(() => {
    if (!isLoading || !areModelsPreloaded) return;
    const elapsedTime = Date.now() - loadingStartTime;
    // If we've already waited MIN_LOADING_TIME, we good.
    if (elapsedTime >= MIN_LOADING_TIME) return router.push(route);
    // Otherwise we gotta wait for the remaining MIN_LOADING_TIME.
    setTimeout(() => router.push(route), MIN_LOADING_TIME - elapsedTime);
  }, [router, isLoading, areModelsPreloaded, loadingStartTime]);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <main className={cx(
        'start-screen',
        css`
          display: flex;
          flex-direction: column;
          align-items: center;
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
            margin-bottom: 5.509vh;
          `}
          role="img"
          aria-label="Infinite"
        >
          {/* We render null until the setTimeout goes off because it works
              around a tricky bug with scaled transitions. */}
          {shouldRenderLogo ? <InfiniteLogo /> : null }
        </div>
        {!isLoading && <PressAToPlay callback={() => {
          setLoadingStartTime(Date.now());
          setIsLoading(true);
        }} />}
        {isLoading && <LoadingMessage />}
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
