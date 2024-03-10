import { FC, SVGProps } from 'react';
import { cx } from '@emotion/css';

import { GAMEPAD_INPUT_KEYS } from '@/types/input';
import { use4k } from '@/hooks/use-4k';
import { useInput, UseInputState } from '@/hooks/use-gamepad';
import { MaterialIcon, MaterialIconSvg } from '@/components/icon';
import { TextOffset } from '@/components/text';

import CircleSvg from '@public/input-shapes/circle.svg';
import LeftBumperSvg from '@public/input-shapes/left-bumper.svg';
import RightBumperSvg from '@public/input-shapes/right-bumper.svg';

type ReactSvg = FC<SVGProps<SVGSVGElement>>;
type ShapeName = 'circle' | 'left-bumper' | 'right-bumper' | '';

const SHAPE_MAP: { [key in GAMEPAD_INPUT_KEYS]: ShapeName } = {
  A: 'circle',
  B: 'circle',
  X: 'circle',
  Y: 'circle',
  LB: 'left-bumper',
  RB: 'right-bumper',
  LT: '',
  RT: '',
  SELECT: 'circle',
  START: 'circle',
  L3: '',
  R3: '',
  DPAD_UP: '',
  DPAD_DOWN: '',
  DPAD_LEFT: '',
  DPAD_RIGHT: '',
  GUIDE: 'circle',
  LEFT_STICK_UP: '',
  LEFT_STICK_DOWN: '',
  LEFT_STICK_RIGHT: '',
  LEFT_STICK_LEFT: '',
  RIGHT_STICK_UP: '',
  RIGHT_STICK_DOWN: '',
  RIGHT_STICK_RIGHT: '',
  RIGHT_STICK_LEFT: '',
};

const SHAPE_SVGS: Partial<{ [key in ShapeName]: ReactSvg }> = {
  'circle': CircleSvg,
  'left-bumper': LeftBumperSvg,
  'right-bumper': RightBumperSvg,
};

// Partial<> is needed unless/until all keys satisfied.
// Update: Which won't happen because of the "uses text" buttons.
const ICON_MAP: Partial<{ [key in GAMEPAD_INPUT_KEYS]: MaterialIconSvg }> = {
  // A: '', // Uses text.
  // B: '', // Uses text.
  // X: '', // Uses text.
  // Y: '', // Uses text.
  // LB: '', // Uses text.
  // RB: '', // Uses text.
  // LT: '',
  // RT: '',
  SELECT: 'grid_view',
  START: 'menu',
  // L3: '',
  // R3: '',
  // DPAD_UP: '',
  // DPAD_DOWN: '',
  // DPAD_LEFT: '',
  // DPAD_RIGHT: '',
  // GUIDE: '',
  // LEFT_STICK_UP: '',
  // LEFT_STICK_DOWN: '',
  // LEFT_STICK_RIGHT: '',
  // LEFT_STICK_LEFT: '',
  // RIGHT_STICK_UP: '',
  // RIGHT_STICK_DOWN: '',
  // RIGHT_STICK_RIGHT: '',
  // RIGHT_STICK_LEFT: '',
};

type InputButtonProps = {
  className?: string;
  input: GAMEPAD_INPUT_KEYS;
  state?: UseInputState;
  width: number;
  height: number;
  portal?: string;
  allowMobile?: boolean;
  shadowed?: boolean;
  callback: () => void;
};

export const InputButton = ({
  className,
  input,
  state = 'press',
  width,
  height,
  portal,
  allowMobile = true,
  shadowed = false,
  callback,
}: InputButtonProps) => {
  const css = use4k();

  useInput({ input, state, portal, callback });

  const icon = ICON_MAP[input];
  const iconBg = SHAPE_MAP[input];
  const IconSvg = SHAPE_SVGS[iconBg];
  const filter = shadowed
    ? 'drop-shadow(0.075vh 0.075vh 0.025vh black)'
    : 'none';

  if (!IconSvg) {
    throw new Error(`Unknown SVG icon for InputButton: ${input}, ${iconBg}`);
  }

  const ariaLabel = `${input.toLowerCase().replace('_', '')} Button`;

  // To support tab and keyboard navigation, this component:
  //   - Needs to be a focusable link, so default navigation focus can work
  //     with input buttons.
  //   - Does not trigger a router push (that's up to callback() to decide),
  //     so we use a plain <a> tag with tabIndex=0 instead of <Link />.
  //   - Runs callback() (i.e. onClick handler) when the Enter key is pressed.
  return (
    <a
      tabIndex={0}
      className={cx(
        css`
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          color: ${shadowed ? 'hsl(0, 0%, 20%)' : 'hsl(0, 0%, 40%)'};
          cursor: pointer;
          user-select: none;
          filter: ${filter};

          svg {
            transition: filter 200ms ease-out;
          }

          &:focus svg {
            filter: drop-shadow(0 0 0.5vh var(--halo-highlight-blue));
          }

          @media (orientation: portrait) {
            display: ${allowMobile ? 'flex' : 'none'};
          }
        `,
        !!width && css`width: ${String(width)}vh;`,
        !!height && css`height: ${String(height)}vh;`,
        className,
      )}
      onClick={callback}
      onKeyDown={(e) => e.key === 'Enter' && callback()}
    >
      <div
        role="button"
        aria-label={ariaLabel}
        className={css`
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 100%;
        `}
      >
        <IconSvg className={css`position: absolute; width: 100%; height: 100%;`} />
        {!!icon ? (
          // pos:relative for stacking context, no explicit z-index needed.
          <MaterialIcon
            className={css`position: relative; width: 60%; height: 60%;`}
            icon={icon}
          />
        ) : (
          <span className={css`font-size: 1.5vh;`}>
            <TextOffset top="0.139vh">{input}</TextOffset>
          </span>
        )}
      </div>
    </a>
  );
};
