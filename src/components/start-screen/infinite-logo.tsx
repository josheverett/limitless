import { Line, LineTree, CAP_HEIGHT } from '@/components/start-screen/line';

// This shit is exactly as hilarious as it looks.

// LOGO_LINES is more readable than the plain JSX.
// Other than position and width/height, all values are eyeballed.
const LOGO_LINES: LineTree[] = [
  // I
  {
    type: 'vertical', startXY: [10, 0.25],
    initialHeight: CAP_HEIGHT/2, transformOrigin: 'bottom left', delay: 0.2,
  },

  // N
  {
    type: 'vertical', position: [3.611, 0], startXY: [8, -0.25], initialHeight: CAP_HEIGHT/5,
    children: [{ type: 'diagonal' }],
  },
  {
    type: 'vertical', position: [7.037, 0], startXY: [6, 0.25], initialHeight: CAP_HEIGHT/5,
    transformOrigin: 'bottom left',
  },

  // F
  {
    type: 'vertical', position: [10.602, 0], startXY: [4, -0.25], initialHeight: CAP_HEIGHT/5,
    children: [
      { type: 'horizontal', width: 3.38 },
      { type: 'horizontal', width: 2.824, position: [0, 2.407] },
    ],
  },

  // I
  {
    type: 'vertical', position: [16.435, 0], startXY: [2, 0.25], initialHeight: CAP_HEIGHT/2,
    transformOrigin: 'bottom left', delay: 0.2,
  },

  // N
  {
    type: 'vertical', position: [19.954, 0], startXY: [-2, -0.25], initialHeight: CAP_HEIGHT/2,
    delay: 0.1,
    children: [{ type: 'diagonal', delay: 0.1 }],
  },
  {
    type: 'vertical', position: [23.38, 0], startXY: [-4, 0.25], initialHeight: CAP_HEIGHT/2,
    transformOrigin: 'bottom left', delay: 0.1,
  },

  // I
  {
    type: 'vertical', position: [26.898, 0], startXY: [-6, -0.25], initialHeight: CAP_HEIGHT/3,
  },

  // T
  {
    type: 'vertical', position: [31.528, 0], startXY: [-8, 0.25], initialHeight: CAP_HEIGHT/5,
    transformOrigin: 'bottom left', delay: 0.2,
    children: [
      {
        type: 'horizontal', width: 3.472, position: [-1.528, 0],
        transformOrigin: 'top center', delay: 0.2,
      },
    ],
  },

  // E
  {
    type: 'vertical', position: [36.065, 0], startXY: [-10, -0.25], initialHeight: CAP_HEIGHT * (2/3),
    delay: 0.3,
    children: [
      { type: 'horizontal', width: 3.241, delay: 0.3 },
      { type: 'horizontal', width: 2.824, position: [0, 2.407], delay: 0.6 },
      { type: 'horizontal', width: 3.241, position: [0, 4.769], delay: 0.3 },
    ],
  },
];

export const InfiniteLogo = () => {
  return LOGO_LINES.map((parentLine, i) => {
    const { children, ...parentProps } = parentLine;
    // It's ok to use indexes as keys here, everything is static.
    return (
      <Line key={`line-parent-${i}`} {...parentProps}>
        {children?.map((childLine, ii) => {
          // Even though there's no children it needs to be destructured
          // lest we try to set children={[]} on a react component.
          const { children: _, ...childProps } = childLine;
          return <Line key={`line-child-${ii}`} {...childProps} />;
        })}
      </Line>
    );
  });
};
