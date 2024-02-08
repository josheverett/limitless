import { cx } from '@emotion/css';
import { use4k } from '@/hooks/use-4k';
import { BrightBox } from '@/layouts/bright-box';
import { TextOffset } from '@/components/text';
import { getFontVariant } from '@/app/styles/fonts';
import { ChallengeHeading } from './challenge-heading';
import { ChallengeBox } from './challenge-box';

type ChallengesProps = {
  className?: string;
};

export const Challenges = ({
  className,
}: ChallengesProps) => {
  const css = use4k();

  return (
    <div className={className}>
      <div className={cx(
        css`
          height: 1.343vh;
          font-size: 2.075vh;
          letter-spacing: 0.35vh;
        `,
        getFontVariant(css, 'teko_light'),
      )}>
        <TextOffset smush top="-1vh">Challenges</TextOffset>
      </div>
      <BrightBox notched className={css`margin-top: 1.574vh;`}>
        <div className={css`
          padding: 1.389vh;
          background: hsla(0, 0%, 0%, 0.35);
        `}>
          <ChallengeHeading title="Daily" endDate={new Date()} />
          <ChallengeBox
            className={css`margin-top: 1.944vh;`}
            color="teal"
            size="medium"
            title="Spoils of Sparta"
            description="Play any Match"
            value={19}
            max={250}
          />
          <ChallengeHeading
            className={css`margin-top: 1.806vh;`}
            title="Weekly"
            endDate={new Date()}
          />
          <ChallengeBox
            className={css`margin-top: 1.944vh;`}
            size="medium"
            title="Spartan Branch Management"
            description="Complete Matches"
            value={19}
            max={250}
          />
          <ChallengeBox
            className={css`margin-top: 1.204vh;`}
            title="MOAR SCORE!"
            description="Earn Cumulative Personal Score"
            value={19}
            max={250}
          />
          <ChallengeBox
            className={css`margin-top: 1.204vh;`}
            color="blue-steel"
            title="Valor in Victory"
            description="Win Matches"
            value={19}
            max={250}
          />
          <ChallengeBox
            className={css`margin-top: 1.62vh;`}
            color="battle-pass"
          />
        </div>
      </BrightBox>
    </div>
  );
};
