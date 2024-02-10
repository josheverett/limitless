import { cx } from '@emotion/css';
import { use4k } from '@/hooks/use-4k';
import { TextOffset } from '@/components/text';
import { getFontVariant } from '@/app/styles/fonts';

type ChallengeHeadingProps = {
  className?: string;
  title: string;
  endDate: Date; // This will probably become moment.Date
};

// The BG colors here are FUCKING HARD to figure out. They have somewhere in
// the range of 80-90% opacity but getting the color right is friggin tough.
// I may end up deciding to make these opaque, as it'll better match visually
// than a tiny bit of transparency with the wrong colors.
export const ChallengeHeading = ({
  className,
  title,
  endDate,
}: ChallengeHeadingProps) => {
  const css = use4k();

  return (
    <div className={cx(
      getFontVariant(css, 'teko_light'),
      css`
        display: flex;
        justify-content: space-between;
        height: 1.343vh;
        font-size: 2.25vh;
        letter-spacing: 0.25vh;
      `,
      className,
    )}>
      <div>
        <TextOffset smush top="-1.2vh" className={css``}>{title}</TextOffset>
      </div>
      {/* temp obviously lol */}
      <div className={css`
        @media (orientation: portrait) {
          display: none;
        }
      `}>
        [clock] {endDate.getHours()}
      </div>
    </div>
  );
};
