import { cx } from '@emotion/css';
import { use4k } from '@/hooks/use-4k';
import { Countdown, CountdownPeriod } from '@/components/countdown';
import { TextOffset } from '@/components/text';
import { getFontVariant } from '@/app/styles/fonts';

type ChallengeHeadingProps = {
  className?: string;
  countdownPeriod?: CountdownPeriod;
  title: string;
};

// The BG colors here are FUCKING HARD to figure out. They have somewhere in
// the range of 80-90% opacity but getting the color right is friggin tough.
// I may end up deciding to make these opaque, as it'll better match visually
// than a tiny bit of transparency with the wrong colors.
export const ChallengeHeading = ({
  className,
  countdownPeriod,
  title,
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
        <TextOffset smush top="-1.2vh">{title}</TextOffset>
      </div>
      {!!countdownPeriod && <Countdown period={countdownPeriod} />}
    </div>
  );
};
