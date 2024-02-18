'use client';

import { motion } from 'framer-motion';
import { use4k } from '@/hooks/use-4k';

type Position = [number, number]; // vh units

// All width/height/x/y units are vh
type LineProps = {
  type: 'vertical' | 'horizontal' | 'diagonal';
  width?: number;
  initialHeight?: number; // vertical only
  position: Position; // relative to parent
  startXY: Position; // relative to transformOrigin
  transformOrigin?: string;
  animationOffset?: number; // ms
  children?: React.ReactNode;
};

const LINE_WIDTH = 0.417; // vh
export const CAP_HEIGHT = 5.185; // vh
const HEIGHT_DURATION = 1; // seconds, eyeballed
const EASING = [0.33, 0.88, 0.87, 0.95];

export const Line = ({
  type,
  width = 0,
  initialHeight,
  position,
  startXY,
  transformOrigin = 'top left',
  animationOffset = 0, // is this getting used?
  children,
}: LineProps) => {
  const css = use4k();

  let [posX, posY] = position;
  const [startX, startY] = startXY;
  let [endX, endY] = [0, 0];

  let width_ = width;
  let height = 0;
  let rotate = 0;
  let scaleX = 1;
  let scaleY = 1;

  switch (type) {
    case 'vertical':
      width_ = LINE_WIDTH;
      height = CAP_HEIGHT;
      scaleY = 0;
      break;
    case 'horizontal':
      height = LINE_WIDTH;
      scaleX = 0;
      break;
    // I'm sure the adjustments below can be derived with math
    // and not eyeballs buy yeah wtf is math lol.
    case 'diagonal':
      posX = posX + 0.09; // eyeballed
      posY = posY + 0.23; // eyeballed
      width_ = LINE_WIDTH;
      height = CAP_HEIGHT + 0.75; // eyeballed
      rotate = -34; // eyeballed
      break;
  }

  const initialHeight_ = type === 'horizontal' ? height : (initialHeight || 0);
  const delay = type === 'vertical' ? 0 : HEIGHT_DURATION;

  // TODO: This needs use4k!!!!

  return (
    // Position, scale, rotation, opacity.
    <motion.div
      className={css`
        position: absolute;
        top: ${String(posY)}vh;
        left: ${String(posX)}vh;
        width: ${String(width_)}vh;
      `}
      initial={{
        height: initialHeight_ + 'vh',
        opacity: 0,
        rotate,
        scaleX,
        scaleY,
        transformOrigin,
      }}
      animate={{
        height: height + 'vh',
        opacity: 1,
        scaleX: 1,
        scaleY: 1,
      }}
      transition={{
        duration: HEIGHT_DURATION,
        ease: EASING,
        delay,
        animationOffset,
      }}
    >
      {/* x axis animation. */}
      <motion.div
        className={css`position: absolute; top: 0; left: 0; width: 100%; height: 100%;`}
        initial={{
          x: (startX * 100) + '%',
        }}
        animate={{
          x: (endX * 100) + '%',
        }}
        transition={{
          duration: HEIGHT_DURATION * 3, // eyeballed
          ease: EASING,
          animationOffset,
        }}
      >
        {/* y axis animation (and white color). */}
        <motion.div
          className={css`position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: white;`}
          initial={{
            y: (startY * 100) + '%',
          }}
          animate={{
            y: (endY * 100) + '%',
          }}
          transition={{
            duration: HEIGHT_DURATION, // eyeballed
            ease: EASING,
            animationOffset,
          }}
        >
          {children}
        </motion.div>
      </motion.div>
    </motion.div>
  );
};
