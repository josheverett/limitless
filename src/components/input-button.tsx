import { CSSProperties } from 'react';
import cx from 'classnames';
import { GAMEPAD_INPUT_KEYS } from '@/types/input';
import { useInput, UseInputState } from '@/hooks/use-gamepad';
import { Image } from '@/components/image';
import { MaterialIcon, MaterialIconSvg } from '@/components/icon';

const SHAPE_MAP: { [key in GAMEPAD_INPUT_KEYS]: string } = {
  A: 'circle',
  B: 'circle',
  X: 'circle',
  Y: 'circle',
  LB: 'circle', // TEMP!
  RB: 'circle', // TEMP!
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
const ICON_MAP: Partial<{ [key in GAMEPAD_INPUT_KEYS]: MaterialIconSvg }> = {
  // A: '',
  // B: '',
  // X: '',
  // Y: '',
  // LB: '',
  // RB: '',
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
  callback: () => void;
  style?: CSSProperties;
};

// TODO: Animated circle ring for chat view button where you
// hold down the button or whatever?

export const InputButton = ({
  className,
  input,
  state = 'press',
  callback,
  style,
}: InputButtonProps) => {
  useInput(input, state, callback);

  const icon = ICON_MAP[input];
  const iconBg = SHAPE_MAP[input];

  return (
    <div
      className={cx(`
          relative
          flex items-center justify-center
          text-center drop-shadow-sm
          text-[hsl(0,0%,40%)]
        `,
        className
      )}
      onClick={callback}
      style={style}
    >
      <Image
        className="w-full h-full"
        fill
        src={`/input-shapes/${iconBg}.svg`}
        alt={input} />
        {!!icon ? (
          // `relative` for stacking context, no explicit z-index needed.
          <MaterialIcon className="relative w-[60%] h-[60%]" icon={icon} />
        ) : (
          <div className="relative">{input}</div>
        )}
    </div>
  );
};
