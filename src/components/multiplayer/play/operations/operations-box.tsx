import Link from 'next/link';
import { cx } from '@emotion/css';
import { use4k } from '@/hooks/use-4k';
import {
  useDirectionalInputs,
  useInputPortal,
} from '@/hooks/use-gamepad';
import { useLinkFocus } from '@/hooks/use-link-focus';
import { BrightBox } from '@/layouts/bright-box';
import { TextOffset } from '@/components/text';
import { InputButton } from '@/components/input-button';
import { getFontVariant } from '@/app/styles/fonts';
import { OperationsLevel } from './operations-level';

type OperationsBoxProps = {
  className?: string;
};

export const OperationsBox = ({
  className,
}: OperationsBoxProps) => {
  const css = use4k();

  const { focusContainerRef, defaultFocusRef, teleport } = useInputPortal({
    name: 'PlayTabOperations',
  });
  const { ref: linkRef, isFocused } = useLinkFocus({ ref: defaultFocusRef });

  useDirectionalInputs({
    portal: 'PlayTabOperations',
    directions: ['U', 'D', 'L'],
    callback: (direction) => {
      switch (direction) {
        case 'U':
          return teleport('MultiplayerAppTabs');
        case 'D':
          return teleport('PlayTabChallenges');
        case 'L':
          return teleport('PlayTabCarousel');
      }
    },
  });

  return (
    <div
      ref={focusContainerRef}
      className={cx(css`position: relative;`, className)}
    >
      <Link
        ref={linkRef}
        href="/TODO"
      >
        <BrightBox isFocused={isFocused}>
          <div className={cx(
            css`
              width: 100%;
              height: 100%;
              background: url('/operations/spirit-of-fire.jpg') center center;
              background-size: 100%;
              transition-property: background-size;
              transition-duration: 150ms;
              transition-timing-function: ease-out;
            `,
            isFocused && css`background-size: 110%;`,
          )}>
            <div className={css`
              padding: 2.269vh 1.852vh;
              background: linear-gradient(90deg, hsla(0, 0%, 0%, 0.8) 0%, hsla(0, 0%, 0%, 0.525) 100%);
              background-origin: border-box;
            `}>
              <div className={css`display: flex; align-items: stretch; gap: 1.991vh;`}>
                <OperationsLevel className={css`flex-grow: 1`} />
                <div className={css`
                  display: flex;
                  flex-direction: column;
                  justify-content: space-between;
                  gap: 1.343vh;
                  padding: 0.833vh 0 1.157vh 0;
                  width: 70%; /* NOT eyeballed! Really was 70% exactly lmao. */
                `}>
                  <div className={css`display: flex;`}>
                    <div className={cx(
                      css`
                        display: inline-block;
                        max-width: 90%; /* portrait orientation safety belt */
                        height: 1.944vh;
                        /* The teko font has a super annoying pseudo-space at the
                          end of a string of text. So we eyeball an offset here. */
                        padding: 0 1vh 0 1.528vh;
                        font-size: 2.4vh; /* eyeballed */
                        color: black;
                        background: var(--halo-white);
                      `,
                      getFontVariant(css, 'teko_2_3_wide_light'),
                    )}>
                      <TextOffset smush truncate top="-0.93vh">Operation</TextOffset>
                    </div>
                  </div>
                  <div className={cx(
                    css`
                      height: 1.667vh;
                      font-size: 2.7vh;
                    `,
                    getFontVariant(css, 'teko_extra_wide'),
                    getFontVariant(css, 'shadow_soft'),
                  )}>
                    <TextOffset smush truncate top="-1.4vh">Spirit of Fire</TextOffset>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </BrightBox>
      </Link>
      <InputButton
        input="Y"
        allowMobile={false}
        callback={() => console.log('DERP Y BUTTON PRESSED!')}
        className={css`
          position: absolute;
          top: 50%;
          right: -3.565vh;
          width: 2.037vh;
          height: 2.037vh;
          margin-top: -1.019vh;
        `}
      />
    </div>
  );
};
