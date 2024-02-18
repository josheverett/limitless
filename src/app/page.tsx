'use client';

import { cx } from '@emotion/css';
import { motion } from 'framer-motion';
import { use4k } from '@/hooks/use-4k';


type Position = [number, number]; // vh units

// All width/height/x/y units are vh
type LineProps = {
  type: 'vertical' | 'horizontal' | 'diagonal';
  width?: number;
  startHeight?: number; // vertical only
  position: Position;
  startXY: Position;
  endXY: Position;
  positionAnimationOffset?: number; // ms
  opacityAnimationOffset?: number; // ms
};

const LINE_WIDTH = 0.417;
const CAP_HEIGHT = 5.185;

export const Line = ({
  type,
  width = 0,
  startHeight,
  position,
  startXY,
  endXY,
  positionAnimationOffset = 0,
  opacityAnimationOffset = 0,
}: LineProps) => {
  const css = use4k();

  let [posX, posY] = position;
  const [startX, startY] = startXY;
  const [endX, endY] = endXY;

  let width_ = width;
  let height = 0;
  let rotate = 0;
  switch (type) {
    case 'vertical':
      width_ = LINE_WIDTH;
      height = CAP_HEIGHT;
      break;
    case 'horizontal':
      height = LINE_WIDTH;
      break;
    case 'diagonal':
      posX = posX + 0.09; // eyeballed
      posY = posY + 0.23; // eyeballed
      width_ = LINE_WIDTH;
      height = CAP_HEIGHT + 0.75; // eyeballed
      rotate = -34;
      break;
  }

  // TODO: Do we need duration?
  return (
    <motion.div
      className={css`
        position: absolute;
        top: ${String(posY)}vh;
        left: ${String(posX)}vh;
        background: white;
        width: ${String(width_)}vh;
        height: ${String(height)}vh;
      `}
      initial={{ x: startX, y: startY, rotate, transformOrigin: 'top left' }}
      animate={{ x: endX, y: endY }}
      transition={{ delay: positionAnimationOffset }}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: opacityAnimationOffset }}
      />
    </motion.div>
  );
};

export default function StartScreen() {
  const css = use4k();

  return (
    <main className={cx(
      'start-screen',
      css`
        display: flex;
        align-items: center;
        justify-content: center;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100vh;
      `
    )}>
      <div className={css`position: relative; width: 39.259vh; height: 8.056vh;`}>
        {/* "I" */}
        <Line type="vertical" position={[0, 0]} startXY={[0, 0]} endXY={[0, 0]} />
        {/* "N" */}
        <Line type="vertical" position={[3.611, 0]} startXY={[0, 0]} endXY={[0, 0]} />
        <Line type="vertical" position={[7.037, 0]} startXY={[0, 0]} endXY={[0, 0]} />
        <Line type="diagonal" position={[3.611, 0]} startXY={[0, 0]} endXY={[0, 0]} />
        {/* "F" */}
        <Line type="vertical" position={[10.602, 0]} startXY={[0, 0]} endXY={[0, 0]} />
        <Line type="horizontal" width={3.38} position={[10.602, 0]} startXY={[0, 0]} endXY={[0, 0]} />
        <Line type="horizontal" width={2.824} position={[10.602, 2.407]} startXY={[0, 0]} endXY={[0, 0]} />
        {/* "I" */}
        <Line type="vertical" position={[16.435, 0]} startXY={[0, 0]} endXY={[0, 0]} />
        {/* "N" */}
        <Line type="vertical" position={[19.954, 0]} startXY={[0, 0]} endXY={[0, 0]} />
        <Line type="vertical" position={[23.38, 0]} startXY={[0, 0]} endXY={[0, 0]} />
        <Line type="diagonal" position={[19.954, 0]} startXY={[0, 0]} endXY={[0, 0]} />
        {/* "I" */}
        <Line type="vertical" position={[26.898, 0]} startXY={[0, 0]} endXY={[0, 0]} />
        {/* "T" */}
        <Line type="vertical" position={[31.528, 0]} startXY={[0, 0]} endXY={[0, 0]} />
        <Line type="horizontal" width={3.472} position={[30, 0]} startXY={[0, 0]} endXY={[0, 0]} />
        {/* "E" */}
        <Line type="vertical" position={[36.065, 0]} startXY={[0, 0]} endXY={[0, 0]} />
        <Line type="horizontal" width={3.241} position={[36.065, 0]} startXY={[0, 0]} endXY={[0, 0]} />
        <Line type="horizontal" width={2.824} position={[36.065, 2.407]} startXY={[0, 0]} endXY={[0, 0]} />
        <Line type="horizontal" width={3.241} position={[36.065, 4.769]} startXY={[0, 0]} endXY={[0, 0]} />
      </div>
    </main>
  );
}
