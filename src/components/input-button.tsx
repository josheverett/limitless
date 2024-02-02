import { useContext } from 'react';
import cx from 'classnames';
import { GAMEPAD_INPUT_KEYS } from '@/types/input';
import { AppContext } from '@/app/context';
import { useInput, UseInputState } from '@/hooks/use-gamepad';
import { Image } from '@/components/image';

const FOURK_WIDTH = 3840;
const FOURK_HEIGHT = 2160;

type InputButtonProps = {
  className?: string;
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
  const fourkWidth = Math.round((width_ / 100) * FOURK_WIDTH);
  const fourkHeight = Math.round((height / 100) * FOURK_HEIGHT);
  const units = force4k ? 'px' : 'vh';

  return (
    <div
      className={cx('relative drop-shadow-sm', className)}
      style={{
        width: `${force4k ? fourkWidth : width_}${units}`,
        height: `${force4k ? fourkHeight : height}${units}`,
      }}
      onClick={callback}
    >
      <Image
        className="w-full h-full"
        fill
        src={`/inputs/${input}.svg`}
        alt={input} />
    </div>
  );
};
