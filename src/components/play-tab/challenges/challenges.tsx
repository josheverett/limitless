import Link from 'next/link';
import { cx } from '@emotion/css';
import { use4k } from '@/hooks/use-4k';
import { useDirectionalInputs, useInputPortal } from '@/hooks/use-gamepad';
import { useLinkFocus } from '@/hooks/use-link-focus';
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

  const { defaultFocusRef, focusContainerRef, teleport } = useInputPortal({
    name: 'PlayTabChallenges'
  });

  const { ref, isFocused } = useLinkFocus({ ref: defaultFocusRef });

  useDirectionalInputs({
    portal: 'PlayTabCarousel',
    directions: ['U', 'L'],
    callback: (direction) => {
      switch (direction) {
        case 'U':
          return teleport('PlayTabOperations');
        case 'L':
          return teleport('PlayTabListBox');
      }
    },
  });

  return (
    <div className={className}>
      <Link ref={ref} href="404">
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
          <BrightBox
            notched
            isFocused={isFocused}
            className={css`margin-top: 1.574vh;`}
          >
            <div className={cx(
              css`
                padding: 1.389vh;
                background: hsla(0, 0%, 0%, 0.35);
                transition-property: color, background-color;
                transition-duration: 150ms;
              `,
              isFocused && css`
                color: black;
                background: var(--halo-white);
              `
            )}>
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
                isFocused={isFocused}
              />
            </div>
          </BrightBox>
      </Link>
    </div>
  );
};
