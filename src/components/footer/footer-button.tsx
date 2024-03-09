import { cx } from '@emotion/css';
import { GAMEPAD_INPUT_KEYS } from '@/types/input';
import { use4k } from '@/hooks/use-4k';
import { UseInputState } from '@/hooks/use-gamepad';
import { MaterialIcon, MaterialIconSvg } from '@/components/icon';
import { InputButton } from '@/components/input-button';
import { TextOffset } from '@/components/text';
import { getFontVariant } from '@/app/styles/fonts';

type FooterButtonProps = {
  input: GAMEPAD_INPUT_KEYS;
  icon: MaterialIconSvg;
  height: number;
  label?: React.ReactNode;
  state: UseInputState;
  animate?: boolean;
  strokeDegrees?: number;
  callback: () => void;
};

export const FooterButton = ({
  input,
  icon,
  height,
  label,
  state,
  strokeDegrees = 0,
  callback,
}: FooterButtonProps) => {
  const css = use4k();

  const isComment = icon === 'comment';
  const isGroup = icon === 'group';
  const isSettings = icon === 'settings';

  return (
    <div className={css`
      position: ${isComment ? 'relative': 'static'};
      top: ${isComment ? '0.463vh': '0'};
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: ${isComment ? '0.139vh': '1.065vh'};
    `}>
      <div className={css`
        display: flex;
        align-items: center;
        gap: ${isComment ? '0': '1.065vh'};
        height: ${isComment ? '100%': '1.528vh'};
      `}>
        <div className={css`
          display: flex;
          align-items: center;
          height: 1.528vh;
        `}>
          <div className={cx(
            isComment && css`
              display: flex;
              align-items: center;
              height: 1.528vh;
            `
          )}>
            <MaterialIcon
              className={cx(css
                `
                  height: ${String(height)}vh;
                  color: hsl(0, 0%, 90%);
                `,
                isComment && css`transform: scale(-1.35, 1.15);`,
                isGroup && css`
                  // margin-left necessary due to scaling.
                  margin-left: 0.278vh;
                  transform: scale(1.5);
                `,
                isSettings && css`transform: scale(1.25);`,
              )}
              icon={icon}
            />
          </div>
        </div>
        {!!label && (
          <div className={cx(
            css`
              position: relative;
              display: flex;
              align-items: center;
              justify-content: center;
              height: 100%;
              font-size: 1.8vh;
            `,
            getFontVariant(css, 'titillium'),
          )}>
            <TextOffset top="-0.0370vh">{label}</TextOffset>
          </div>
        )}
      </div>
      <div className={cx(
        !!isComment && css`
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 4.167vh;
          height: 4.167vh;
        `
      )}>
        <div className={cx(
          !!isComment && css`
            position: absolute;
            bottom: 0;
            left: 0;
            width: 4.167vh;
            height: 4.167vh;
            // There's a very narrow set of solutions to make an animated ring
            // that fills in clockwise. Apparently using border-radius and
            // border-image (which can be animated these days, as evidenced by
            // BrightBox and ListBox) used to work, but it doesn't anymore.
            // Old tutorial codepens with screenshots don't render the same
            // anymore in at least blink and firefox. Bizarre. So anyway gotta
            // just use requestAnimationFrame and animate it that way. Whatevs.
            // strokeDegress comes from parent and handles this.
            background: conic-gradient(
              from 0deg at center,
              var(--halo-highlight-blue) ${String(strokeDegrees)}deg,
              hsla(0, 0%, 0%, 0.25) ${String(strokeDegrees)}deg,
              hsla(0, 0%, 0%, 0.25) 360deg
            );
            clip-path: circle(50% at center);
            mask-image: radial-gradient(circle at center, transparent 62.5%, black 57%);
          `
        )} />
        <InputButton
          input={input}
          state={state}
          width={2.13}
          height={2.13}
          callback={callback}
        />
      </div>
    </div>
  );
};
