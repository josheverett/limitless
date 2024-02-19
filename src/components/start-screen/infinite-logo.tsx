import { Line, LineTree } from '@/components/start-screen/line';

type InfiniteLogoProps = {
  lines: LineTree[];
};

export const InfiniteLogo = ({ lines }: InfiniteLogoProps) => {
  return lines.map((parentLine, i) => {
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
