import { useContext } from 'react';
import cx from 'classnames';
import { GAMEPAD_INPUT_KEYS } from '@/types/input';
import { AppContext } from '@/app/context';
import { useInput, UseInputState } from '@/hooks/use-gamepad';
import { Image } from '@/components/image';

const FOURK_WIDTH = 3840;
const FOURK_HEIGHT = 2160;

const SHAPE_MAP: { [key in GAMEPAD_INPUT_KEYS]: string } = {
  A: 'circle',
  B: 'circle',
  X: 'circle',
  Y: 'circle',
  LB: '',
  RB: '',
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

// TODO: Dunno how I'm gonna handle text labels yet.
const ICON_MAP: { [key in GAMEPAD_INPUT_KEYS]: string } = {
  A: '',
  B: '',
  X: '',
  Y: '',
  LB: '',
  RB: '',
  LT: '',
  RT: '',
  SELECT: 'grid_view',
  START: 'menu',
  L3: '',
  R3: '',
  DPAD_UP: '',
  DPAD_DOWN: '',
  DPAD_LEFT: '',
  DPAD_RIGHT: '',
  GUIDE: '',
  LEFT_STICK_UP: '',
  LEFT_STICK_DOWN: '',
  LEFT_STICK_RIGHT: '',
  LEFT_STICK_LEFT: '',
  RIGHT_STICK_UP: '',
  RIGHT_STICK_DOWN: '',
  RIGHT_STICK_RIGHT: '',
  RIGHT_STICK_LEFT: '',
};

// TODO: text map where applicable

type InputButtonProps = {
  className?: string; // Might not actually need this.
  height: number; // vh units
  // TODO: When I get to non-1:1 icons, try determining this
  // automatically via a config here.
  width?: number; // vh (NOT vw) units
  input: GAMEPAD_INPUT_KEYS;
  state?: UseInputState;
  callback: () => void;
};

// TODO: Animated circle ring for chat view button where you
// hold down the button or whatever?

export const InputButton = ({
  className,
  height,
  width,
  input,
  state = 'press',
  callback,
}: InputButtonProps) => {
  const { force4k } = useContext(AppContext);

  useInput(input, state, callback);

  const width_ = width || height;
  // Once again, it's correct that we're using vh to calc width.
  const fourkWidth = Math.round((width_ / 100) * FOURK_HEIGHT);
  const fourkHeight = Math.round((height / 100) * FOURK_HEIGHT);
  const units = force4k ? 'px' : 'vh';

  const icon = `${ICON_MAP[input]}`;
  const iconBg = `${SHAPE_MAP[input]}`;
  const fontSize = (force4k ? fourkHeight : height) * 0.375; // magic number

  return (
    <div
      className={cx(`
          input-button relative
          flex items-center justify-center
          text-center drop-shadow-sm
        `,
        className
      )}
      style={{
        width: `${force4k ? fourkWidth : width_}${units}`,
        height: `${force4k ? fourkHeight : height}${units}`,
        fontSize: `${fontSize}${units}`,
        color: 'hsl(0, 0%, 40%)',
      }}
      onClick={callback}
    >
      <Image
        className="w-full h-full"
        fill
        src={`/input-shapes/${iconBg}.svg`}
        alt={input} />
        {/* `relative` for stacking context, no explicit z-index needed. */}
        <span className="material-icons relative">{icon}</span>
    </div>
  );
};
