import cx from 'classnames';
import { GAMEPAD_INPUT_KEYS } from '@/types/input';
import { use4k } from '@/hooks/use-4k';
import { UseInputState } from '@/hooks/use-gamepad';
import { MaterialIcon, MaterialIconSvg } from '@/components/icon';
import { TextOffset } from '@/components/text';
import { InputButton } from '@/components/input-button';

type FooterButtonProps = {
  icon: MaterialIconSvg;
  flip?: boolean;
  label?: React.ReactNode;
  input: GAMEPAD_INPUT_KEYS;
  state?: UseInputState;
  callback: () => void;
};

export const FooterButton = ({
  icon,
  flip = false,
  label,
  input,
  state,
  callback,
}: FooterButtonProps) => {
  const _4k = use4k();

  return (
    <div
      className="flex flex-col items-center justify-center h-full"
      style={_4k({ gap: '1.065vh' })}
    >
      <div
        className="flex items-center"
        style={_4k({ height: '1.528vh', gap: '1.111vh' })}
      >
        <MaterialIcon
          icon={icon}
          className={cx(
            'scale-[1.2] h-full text-[hsl(0,0%,90%)]',
            { 'scale-x-[-1.2]': flip }
          )}
        />
        {!!label && (
          <div
            className="relative flex items-center justify-center h-full"
            style={_4k({ fontSize: '1.8vh' })}
          >
            <TextOffset top="0.15vh">{label}</TextOffset>
          </div>
        )}
      </div>
      <InputButton
        input={input}
        state={state}
        callback={callback}
        style={_4k({ width: '2.037vh', height: '2.037vh' })}
      />
    </div>
  );
};
