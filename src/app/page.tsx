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
  position: Position; // relative to parent
  startXY: Position; // relative to element origin
  endXY?: Position;
  transformOrigin?: string;
  animationOffset?: number; // ms
  children?: React.ReactNode;
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
  transformOrigin = 'top left',
  animationOffset = 0,
  children,
}: LineProps) => {
  const css = use4k();

  let [posX, posY] = position;
  const [startX, startY] = startXY;
  const [endX, endY] = endXY ? endXY : [0, 0];

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

  // TODO: Do we need duration?
  return (
    <motion.div
      className={css`
        position: absolute;
        top: ${String(posY)}vh;
        left: ${String(posX)}vh;
        width: ${String(width_)}vh;
        background: white;
      `}
      initial={{
        x: (startX * 100) + '%',
        y: (startY * 100) + '%',
        height: (startHeight || height) + 'vh',
        opacity: 0,
        rotate,
        transformOrigin,
      }}
      animate={{
        x: endX || 0,
        y: endY || 0,
        height: height + 'vh',
        opacity: 1,
      }}
      transition={{
        duration: 1,
        ease: [0.33, 0.88, 0.87, 0.95],
        delay:
        animationOffset,
      }}
    >
      {children}
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
      {/* All instances of startHeight, startXY, and offsets are eyeballed. */}
      <div className={css`position: relative; width: 39.259vh; height: 8.056vh;`}>
        {/* "I" */}
        <Line type="vertical" position={[0, 0]} startXY={[10, 0.25]} startHeight={CAP_HEIGHT/2} />
        {/* "N" */}
        <Line type="vertical" position={[3.611, 0]} startXY={[8, -0.25]} startHeight={CAP_HEIGHT/5}>
          <Line type="diagonal" position={[0, 0]} startXY={[0, 0]} startHeight={CAP_HEIGHT/5} />
        </Line>
        <Line type="vertical" position={[7.037, 0]} startXY={[6, 0.25]} startHeight={CAP_HEIGHT/5} />
        {/* "F" */}
        <Line type="vertical" position={[10.602, 0]} startXY={[4, -0.25]} startHeight={CAP_HEIGHT/5}>
          <Line type="horizontal" width={3.38} position={[0, 0]} startXY={[0, 0]} />
          <Line type="horizontal" width={2.824} position={[0, 2.407]} startXY={[0, 0]} />
        </Line>
        {/* "I" */}
        <Line type="vertical" position={[16.435, 0]} startXY={[2, 0.25]} startHeight={CAP_HEIGHT/2} />
        {/* "N" */}
        <Line type="vertical" position={[19.954, 0]} startXY={[-2, -0.25]} startHeight={CAP_HEIGHT/2}>
          <Line type="diagonal" position={[0, 0]} startXY={[0, 0]} />
        </Line>
        <Line type="vertical" position={[23.38, 0]} startXY={[-4, 0.25]} startHeight={CAP_HEIGHT/2} />
        {/* "I" */}
        <Line type="vertical" position={[26.898, 0]} startXY={[-6, -0.25]} startHeight={CAP_HEIGHT/3} />
        {/* "T" */}
        <Line type="vertical" position={[31.528, 0]} startXY={[-8, 0.25]} startHeight={CAP_HEIGHT/5}>
          <Line type="horizontal" width={3.472} position={[-1.528, 0]} startXY={[0, 0]} transformOrigin="top center" />
        </Line>
        {/* "E" */}
        <Line type="vertical" position={[36.065, 0]} startXY={[-10, -0.25]} startHeight={CAP_HEIGHT * 0.667}>
          <Line type="horizontal" width={3.241} position={[0, 0]} startXY={[0, 0]} />
          <Line type="horizontal" width={2.824} position={[0, 2.407]} startXY={[0, 0]} />
          <Line type="horizontal" width={3.241} position={[0, 4.769]} startXY={[0, 0]} />
        </Line>
      </div>
    </main>
  );
}
