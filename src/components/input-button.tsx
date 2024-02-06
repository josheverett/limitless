import { cx } from '@emotion/css';
import { GAMEPAD_INPUT_KEYS } from '@/types/input';
import { use4k_new } from '@/hooks/use-4k';
import { useInput, UseInputState } from '@/hooks/use-gamepad';
import { Image } from '@/components/image';
import { MaterialIcon, MaterialIconSvg } from '@/components/icon';
import { TextOffset } from '@/components/text';

const SHAPE_MAP: { [key in GAMEPAD_INPUT_KEYS]: string } = {
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
  portal?: string;
  callback: () => void;
};

// TODO: Animated circle ring for chat view button where you
// hold down the button or whatever?

export const InputButton = ({
  className,
  input,
  state = 'press',
  portal,
  callback,
}: InputButtonProps) => {
  const css = use4k_new();

  useInput({ input, state, portal, callback });

  const icon = ICON_MAP[input];
  const iconBg = SHAPE_MAP[input];

  return (
    <div
      className={cx(
        css`
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          color: hsl(0, 0%, 40%);
          cursor: pointer;
          user-select: none;
          filter: drop-shadow(0 1px 1px rgb(0 0 0 / 0.05));
        `,
        className
      )}
      onClick={callback}
    >
      <Image
        className={css`width: 100%; height: 100%;`}
        fill
        unoptimized
        src={`/input-shapes/${iconBg}.svg`}
        alt={input} />
        {!!icon ? (
          // pos:relative for stacking context, no explicit z-index needed.
          <MaterialIcon
            className={css`position: relative; width: 60%; height: 60%;`}
            icon={icon}
          />
        ) : (
          <span className={css`font-size: 1.5vh;`}>
            <TextOffset top="0.15vh">{input}</TextOffset>
          </span>
        )}
    </div>
  );
};
