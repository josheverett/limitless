'use client';

import { motion } from 'framer-motion';
import { use4k, useObjectTo4k } from '@/hooks/use-4k';

export type Position = [number, number]; // vh units

// All width/height/x/y units are vh
type LineProps = {
  type: 'vertical' | 'horizontal' | 'diagonal';
  width?: number;
  initialHeight?: number; // vertical only
  position?: Position; // relative to parent
  startXY?: Position; // relative to transformOrigin
  transformOrigin?: string;
  delay?: number; // seconds
  children?: React.ReactNode;
};

// Surely there is a way to clobber `children` without Omit?
export type LineTree = Omit<LineProps, 'children'> & {
  children?: LineTree[];
};

const LINE_WIDTH = 0.417; // vh
export const CAP_HEIGHT = 5.185; // vh
const HEIGHT_DURATION = 1; // seconds, eyeballed
const EASING = [0.33, 0.88, 0.87, 0.95]; // eyeballed

export const Line = ({
  type,
  width = 0,
  initialHeight = 0,
  position = [0, 0],
  startXY = [0, 0],
  transformOrigin = 'top left',
  delay = 0,
  children,
}: LineProps) => {
  const css = use4k();
  const objectTo4k = useObjectTo4k();

  let [posX, posY] = position;
  const [startX, startY] = startXY;
  let [endX, endY] = [0, 0];

  let width_ = width;
  let height = 0;
  let initialHeight_ = initialHeight;
  let rotate = 0;
  let scaleX = 1;
  let scaleY = 1;
  let delay_ = delay;

  switch (type) {
    case 'vertical':
      width_ = LINE_WIDTH;
      height = CAP_HEIGHT;
      scaleY = 0;
      break;
    case 'horizontal':
      height = LINE_WIDTH;
      initialHeight_ = height;
      scaleX = 0;
      delay_ += HEIGHT_DURATION;
      break;
    // I'm sure the adjustments below can be derived with math
    // and not eyeballs buy yeah wtf is math lol.
    case 'diagonal':
      posX = posX + 0.09; // eyeballed
      posY = posY + 0.23; // eyeballed
      width_ = LINE_WIDTH;
      height = CAP_HEIGHT + 0.75; // eyeballed
      rotate = -34; // eyeballed
      delay_ += HEIGHT_DURATION;
      break;
  }

  return (
    // Position, scale, rotation, opacity.
    <motion.div
      className={css`
        position: absolute;
        top: ${String(posY)}vh;
        left: ${String(posX)}vh;
        width: ${String(width_)}vh;
      `}
      initial={objectTo4k({
        height: initialHeight_ + 'vh',
        opacity: type === 'vertical' ? 0 : 1,
        rotate,
        scaleX,
        scaleY,
        transformOrigin,
      })}
      animate={objectTo4k({
        height: height + 'vh',
        opacity: 1,
        scaleX: 1,
        scaleY: 1,
      })}
      transition={{
        duration: HEIGHT_DURATION,
        ease: EASING,
        delay: delay_,
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
          delay: delay_,
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
            delay: delay_,
          }}
        >
          {children}
        </motion.div>
      </motion.div>
    </motion.div>
  );
};
