import { cx } from '@emotion/css';
import { use4k } from '@/hooks/use-4k';
import { BrightBox } from '@/layouts/bright-box';
import { TextOffset } from '@/components/text';
import { getFontVariant } from '@/app/styles/fonts';


type ChallengeBoxProps = {
  className?: string;
  type?: 'default' | 'teal' | 'blue-steel' | 'battle-pass',
  // TODO: large
  size?: 'small' | 'medium';
  title: string;
  description: string;
  value: number;
  max: number;
};

// The BG colors here are FUCKING HARD to figure out. They have somewhere in
// the range of 80-90% opacity but getting the color right is friggin tough.
// I may end up deciding to make these opaque, as it'll better match visually
// than a tiny bit of transparency with the wrong colors.
export const ChallengeBox = ({
  className,
  type = 'default',
  size = 'small',
  title,
  description,
  value,
  max
}: ChallengeBoxProps) => {
  const css = use4k();

  return (
    <div className={cx(
      css`
        display: flex;
        flex-direction: column;
        gap: 1.343vh;
        padding: 0.972vh 1.898vh 1.389vh 1.898vh;
        border-top: 0.463vh solid hsl(200, 10%, 15%);
        background: hsla(200, 5%, 30%, 0.8);
      `,
      size === 'medium' && css`
        //
      `,
      getFontVariant(css, 'shadow_soft'),
      className,
    )}>
      <div className={cx(css`
          height: 1.25vh;
          font-size: 2.0vh;
          letter-spacing: 0.35vh;
        `,
        'truncate',
        getFontVariant(css, 'teko_light'),
      )}>
        <TextOffset smush truncate top="-1vh">{title}</TextOffset>
      </div>
      <div className={cx(
        css`
          display: flex;
          justify-content: space-between;
          gap: 1.898vh;
          height: 1.563vh;
          margin-bottom: -0.232vh;
          color: var(--halo-offwhite);
        `,
        getFontVariant(css, 'titillium_description_small'),
      )}>
        <TextOffset
          truncate
          top="-0.35vh"
          className={css`height: 2.2vh;`}
        >
          {description}
        </TextOffset>
        <TextOffset top="-0.65vh" className={css`font-size: 1.85vh;`}>
          {value}/{max}
        </TextOffset>
      </div>
    </div>
  );
};

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
      <BrightBox notched className={css`margin-top: 1.574vh`}>
        <div className={css`
          padding: 1.389vh;
          background: hsla(0, 0%, 0%, 0.25);
        `}>
          <div className={cx(
            getFontVariant(css, 'teko_2_3_wide_light'),
            css`
              display: flex;
              justify-content: space-between;
              height: 1.343vh;
              font-size: 2.05vh;
            `,
          )}>
            <div>
              <TextOffset smush top="-1vh">Daily</TextOffset>
            </div>
            <div>clock</div>
          </div>
          <ChallengeBox
            className={css`margin-top: 1.944vh`}
            title="Spoils of Sparta"
            description="Play any Match Play any Match Play any Match Play any Match Play any Match Play any Match"
            value={19}
            max={250}
          />
          <ChallengeBox
            className={css`margin-top: 1.944vh`}
            title="Spartan Branch Management"
            description="Complete Matches"
            value={19}
            max={250}
          />
          <ChallengeBox
            className={css`margin-top: 1.204vh`}
            title="MOAR SCORE!"
            description="Earn Cumulative Personal Score"
            value={19}
            max={250}
          />
          <ChallengeBox
            className={css`margin-top: 1.204vh`}
            title="Valor in Victory"
            description="Win Matches"
            value={19}
            max={250}
          />
        </div>
      </BrightBox>
    </div>
  );
};
