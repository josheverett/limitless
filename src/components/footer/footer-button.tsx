import cx from 'classnames';
import { GAMEPAD_INPUT_KEYS } from '@/types/input';
import { UseInputState } from '@/hooks/use-gamepad';
import { MaterialIcon, MaterialIconSvg } from '@/components/icon';
import { InputButton } from '@/components/input-button';
import '@/app/styles/footer.css';

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
  return (
    <div className="footer-button flex flex-col items-center justify-center h-full">
      {/* This div is only necessary for the friends icon because it has text. */}
      <div className="footer-label-container flex items-center">
        <MaterialIcon
          className={cx(
            'footer-label-icon text-[hsl(0,0%,90%)]',
            { 'scale-x-[-1]': flip }
          )}
          icon={icon}
        />
        {!!label && (
          <span className="footer-label flex items-center justify-center">{label}</span>
        )}
      </div>
      <InputButton
        className="footer-input-button"
        input={input}
        state={state}
        callback={callback}
      />
    </div>
  );
};
