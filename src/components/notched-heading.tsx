import { use4k } from '@/hooks/use-4k';
import { TextOffset } from '@/components/text';

// Math gets funky at certain sizes if we don't enforce a limit.
const MIN_HEIGHT = '3px';

type CapProps = {
  position: 'left' | 'right';
};

const Cap = ({ position }: CapProps) => {
  const css = use4k();

  return (
    <div className={css`
      position: absolute;
      ${position}: 0;
      bottom: -0.231vh;
      width: 0.324vh;
      height: 0.324vh;
      // min-height: ${MIN_HEIGHT};
      background: hsl(0,0%,80%);
    `} />
  );
};

type NotchedHeadingProps = {
  title: string;
};

export const NotchedHeading = ({ title }: NotchedHeadingProps) => {
  const css = use4k();

  return (
    <div className={css`
      position: relative;
      height: 2.546vh;
      margin: 0 -2.315vh;
      padding: 0 2.315vh;
      border-bottom: 0.139vh solid hsl(0,0%,80%);
    `}>
      <Cap position="left" />
      <div className={css`
        display: inline-block;
        height: 2.639vh;
        padding-bottom: 1.065vh;
        border-bottom: 0.324vh solid hsl(0,0%,80%);
        font-size: 2.361vh;
        letter-spacing: 0.3vh;
      `}>
        <TextOffset smush top="-1.25vh">{title}</TextOffset>
      </div>
      <Cap position="right" />
    </div>
  );
};
