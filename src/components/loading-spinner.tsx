'use client';

import { use4k } from '@/hooks/use-4k';

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

export const LoadingSpinner = () => {
  const css = use4k();

  return (
    <div className={css`width: 2.778vh;`}>
      <SpinnerCorners />
      <div className={css`position: relative; height: 2.407vh;`}>
        <SpinnerCircle position='outer' diameter={2.315} duration={10} />
        <SpinnerCircle position='inner' diameter={1.574} duration={4} />
      </div>
      <SpinnerCorners />
    </div>
  );
};
