import cx from 'classnames';
import { GAMEPAD_INPUT_KEYS } from '@/types/input';
import { use4k_new } from '@/hooks/use-4k';
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
  const css = use4k_new();

  return (
    <div className={css`
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 1.065vh;
      height: 100%;
    `}>
      <div className={css`
        display: flex;
        align-items: center;
        gap: 1.111vh;
        height: 1.528vh;
      `}>
        <MaterialIcon
          icon={icon}
          className={cx(
            css`
              height: 100%;
              color: hsl(0, 0%, 90%);
              transform: scale(1.2);
            `,
            flip && css`
              transform: scale(-1.2, 1.2);
            `,
          )}
        />
        {!!label && (
          <div className={css`
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100%;
            font-size: 1.8vh;
          `}>
            <TextOffset top="0.15vh">{label}</TextOffset>
          </div>
        )}
      </div>
      <InputButton
        input={input}
        state={state}
        callback={callback}
        className={css`width: 2.037vh; height: 2.037vh;`}
      />
    </div>
  );
};
