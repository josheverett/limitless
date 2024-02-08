import { cx } from '@emotion/css';
import { use4k } from '@/hooks/use-4k';
import { BrightBox } from '@/layouts/bright-box';
import { TextOffset } from '@/components/text';
import { getFontVariant } from '@/app/styles/fonts';
import { OperationsLevel } from './operations-level';

// 4. The contents of the level box need to be entirely percentage-based.
//    vh/vw will not suffice here. At least I think?

type OperationsBoxProps = {
  className?: string;
};

export const OperationsBox = ({
  className,
}: OperationsBoxProps) => {
  const css = use4k();

  return (
    <BrightBox notched className={className}>
      <div className={css`
        width: 100%;
        height: 100%;
        background: url('/operations/spirit-of-fire.jpg') center / cover no-repeat;
      `}>
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
                  // I like to put getFontVariant after css, but in this case
                  // we need to override the size. If any other components use
                  // 1.9vh I'll add a 1_9 variant.
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
                  <TextOffset smush ellipsize top="-0.93vh">Operation</TextOffset>
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
                <TextOffset smush ellipsize top="-1.4vh">Spirit of Fire</TextOffset>
              </div>
            </div>
          </div>
        </div>
      </div>
    </BrightBox>
  );
};
