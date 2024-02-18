'use client';

import { cx } from '@emotion/css';
import { use4k } from '@/hooks/use-4k';
import { Line, CAP_HEIGHT } from '@/components/start-screen/line';

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
      {/* All instances of initialHeight, startXY, and offsets are eyeballed. */}
      <div className={css`position: relative; width: 39.259vh; height: 8.056vh;`}>
        {/* "I" */}
        <Line type="vertical" position={[0, 0]} startXY={[10, 0.25]} initialHeight={CAP_HEIGHT/2} transformOrigin="bottom left" delay={0.2} />

        {/* "N" */}
        <Line type="vertical" position={[3.611, 0]} startXY={[8, -0.25]} initialHeight={CAP_HEIGHT/5}>
          <Line type="diagonal" position={[0, 0]} startXY={[0, 0]} />
        </Line>
        <Line type="vertical" position={[7.037, 0]} startXY={[6, 0.25]} initialHeight={CAP_HEIGHT/5} transformOrigin="bottom left" />

        {/* "F" */}
        <Line type="vertical" position={[10.602, 0]} startXY={[4, -0.25]} initialHeight={CAP_HEIGHT/5}>
          <Line type="horizontal" width={3.38} position={[0, 0]} startXY={[0, 0]} />
          <Line type="horizontal" width={2.824} position={[0, 2.407]} startXY={[0, 0]} />
        </Line>

        {/* "I" */}
        <Line type="vertical" position={[16.435, 0]} startXY={[2, 0.25]} initialHeight={CAP_HEIGHT/2} transformOrigin="bottom left" delay={0.2} />

        {/* "N" */}
        <Line type="vertical" position={[19.954, 0]} startXY={[-2, -0.25]} initialHeight={CAP_HEIGHT/2} delay={0.1}>
          <Line type="diagonal" position={[0, 0]} startXY={[0, 0]} delay={0.1} />
        </Line>
        <Line type="vertical" position={[23.38, 0]} startXY={[-4, 0.25]} initialHeight={CAP_HEIGHT/2} transformOrigin="bottom left" delay={0.1} />

        {/* "I" */}
        <Line type="vertical" position={[26.898, 0]} startXY={[-6, -0.25]} initialHeight={CAP_HEIGHT/3} />

        {/* "T" */}
        <Line type="vertical" position={[31.528, 0]} startXY={[-8, 0.25]} initialHeight={CAP_HEIGHT/5} transformOrigin="bottom left" delay={0.2}>
          <Line type="horizontal" width={3.472} position={[-1.528, 0]} startXY={[0, 0]} transformOrigin="top center" delay={0.2} />
        </Line>

        {/* "E" */}
        <Line type="vertical" position={[36.065, 0]} startXY={[-10, -0.25]} initialHeight={CAP_HEIGHT * (2/3)} delay={0.3}>
          <Line type="horizontal" width={3.241} position={[0, 0]} startXY={[0, 0]} delay={0.3} />
          <Line type="horizontal" width={2.824} position={[0, 2.407]} startXY={[0, 0]} delay={0.6} />
          <Line type="horizontal" width={3.241} position={[0, 4.769]} startXY={[0, 0]} delay={0.3} />
        </Line>
      </div>
    </main>
  );
}
