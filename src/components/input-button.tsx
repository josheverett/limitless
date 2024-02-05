import { CSSProperties } from 'react';
import cx from 'classnames';
import { GAMEPAD_INPUT_KEYS } from '@/types/input';
import { use4k } from '@/hooks/use-4k';
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
  const _4k = use4k();

  // TODO: DO NOT KEEP TRUE, NEEDS COMPONENT FOCUS THING
  useInput({ input, state, callback });

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
        unoptimized
        src={`/input-shapes/${iconBg}.svg`}
        alt={input} />
        {!!icon ? (
          // `relative` for stacking context, no explicit z-index needed.
          <MaterialIcon className="relative w-[60%] h-[60%]" icon={icon} />
        ) : (
          <span style={_4k({ fontSize: '1.5vh' })}>
            <TextOffset top="0.15vh">{input}</TextOffset>
          </span>
        )}
    </div>
  );
};
