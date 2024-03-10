import { cx } from '@emotion/css';
import { use4k } from '@/hooks/use-4k';
import { TextOffset } from '@/components/text';
import { getFontVariant } from '@/app/styles/fonts';
import { OperationsNotch } from './operations-notch';

type OperationsLevelProps = {
  className?: string;
};

export const OperationsLevel = ({
  className,
}: OperationsLevelProps) => {
  const css = use4k();

  return (
    <div className={cx(
      css`
        padding: 0.185vh;
        border: 0.185vh solid var(--halo-white);
      `,
      className,
    )}>
      <div className={css`
        position: relative;
        display: flex;
        align-items: stretch;
        justify-content: center;
        height: 100%;
        border: 0.093vh solid hsl(0, 0%, 56%);
        background: hsl(0, 0%, 18%);
        overflow: hidden;
      `}>
        {/* This is that 45deg rotated square in the background. */}
        <div
          className={css`
            position: absolute;
            top: 50%;
            left: 50%;
            /* This width is a real number it's not eyeballed lmao.
              It's absolutely stupid how well this CSS works.
              I never knew you could use translate to simplify
              centering rotated elements. Thanks ChatGPT! */
            width: 66.857%;
            aspect-ratio: 1;
            border: 0.093vh solid hsl(0, 0%, 31%);
            transform: translate(-50%, -50%) rotate(45deg);
          `}
        />
        <div className={css`
          display: flex;
          flex-direction: column;
          width: 100%;
        `}>
          <OperationsNotch type="top" />
          <div className={cx(
            css`
              flex-grow: 1;
              width: 100%;
              height: 2.593vh;
              font-size: 4.6vh;
              letter-spacing: 0.3vh;
              text-align: center;
            `,
            getFontVariant(css, 'teko'),
          )}>
            {/* <TextOffset smush top="-2.55vh" left="0.1vh">00</TextOffset> */}
            <TextOffset smush top="-1.05vh" left="0.1vh">42</TextOffset>
          </div>
          <OperationsNotch type="bottom" />
        </div>
      </div>
    </div>
  );
};
