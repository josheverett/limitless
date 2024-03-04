import { cx } from '@emotion/css';
import { use4k } from '@/hooks/use-4k';
import { MaterialIcon } from '@/components/icon';
import { TextOffset } from '@/components/text';
import { getFontVariant } from '@/app/styles/fonts';

type ChallengeBattlePassBoxProps = {
  isFocused: boolean;
};

const ChallengeBattlePassBox = ({
  isFocused,
}: ChallengeBattlePassBoxProps) => {
  const css = use4k();

  return (
    <div className={cx(
      css`
        display: flex;
        align-items: center;
        height: 6.713vh;
        margin-top: 1.62vh;
        padding: 0 2.222vh;
        border: 0.185vh solid hsla(210, 11%, 80%, 0.4);
      `,
      isFocused && css`border-color: black;`,
    )}>
      <div className={cx(
        css`display: flex; align-items: center; gap: 1.111vh; width: 100%;`,
        getFontVariant(css, 'titillium_description')
      )}>
        <MaterialIcon
          icon="lock"
          className={cx(
            css`
              height: 1.759vh;
              width: 1.759vh;
              transform: scale(1.2);
            `,
          )}
        />
        <TextOffset truncate>
          Requires <span className={css`color: var(--halo-highlight-blue);`}>Premium</span> Battle Pass
        </TextOffset>
      </div>
    </div>
  );
};

type ChallengeBoxProps = {
  className?: string;
  color?: 'default' | 'teal' | 'blue-steel' | 'battle-pass',
  // TODO: large
  size?: 'small' | 'medium';
  title?: string;
  description?: string;
  value?: number;
  max?: number;
  isFocused?: boolean;
};

export const ChallengeBox = ({
  className,
  color = 'default',
  size = 'small',
  title,
  description,
  value,
  max,
  isFocused = false,
}: ChallengeBoxProps) => {
  const css = use4k();

  if (color === 'battle-pass') {
    return <ChallengeBattlePassBox isFocused={isFocused} />;
  }

  return (
    <div className={cx(
      css`
        display: flex;
        flex-direction: column;
        gap: 1.343vh;
        padding: 0.972vh 1.898vh 1.389vh 1.898vh;
        border-top: 0.463vh solid hsl(200, 7%, 21%);
        color: var(--halo-white);
        background: hsla(200, 5%, 28%, 0.9);
      `,
      color === 'teal' && css`
        border-top-color: hsl(200, 70%, 30%);
        background: hsla(200, 70%, 42%, 0.95);
      `,
      color === 'blue-steel' && css`
        border-top-color: hsl(200, 20%, 20%);
        background: hsla(200, 40%, 24%, 0.8);
      `,
      size === 'medium' && css`
        padding-top: 1.62vh;
        padding-bottom: 2.037vh;
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
          top="-0.5vh"
          className={css`height: 2.2vh;`}
        >
          {description}
        </TextOffset>
        <TextOffset
          top="-0.65vh"
          className={css`
            font-size: 1.85vh;

            @media (orientation: portrait) {
              display: none;
            }
          `}
        >
          {value}/{max}
        </TextOffset>
      </div>
    </div>
  );
};
