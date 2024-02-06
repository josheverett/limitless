import cx from 'classnames';
import { useContext } from 'react';
import { AppContext } from '@/app/context';
import { use4k_new } from '@/hooks/use-4k';
import { useInput } from '@/hooks/use-gamepad';
import { Image } from '@/components/image';
import { MetaButton } from '@/components/footer/meta-button';
import { FooterButton } from '@/components/footer/footer-button';
import { TitilliumFont } from '@/app/styles/fonts';

type SeparatorProps = { type?: 'middle' | 'end'; };

const Separator = ({ type = 'middle' }: SeparatorProps) => {
  const css = use4k_new();

  // TODO: We sure about the hue on this...? lol
  if (type == 'middle') {
    return (
      <div className={css`
        flex-grow: 0;
        flex-shrink: 0;
        min-width: 1px;
        width: 0.093vh;
        height: 5.556vh;
        background: hsla(216, 7%, 71%, 70%);
      `} />
    );
  }

  return (
    <div className={css`
      flex-grow: 0;
      flex-shrink: 0;
      min-width: 2px;
      width: 0.185vh;
      height: 100%;
      background: hsla(0, 0%, 100%, 15%);
    `} />
  );
};

const FooterNamelate = () => {
  const css = use4k_new();

  return (
    <div
      className={cx(
        css`
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1.481vh;
          height: 4.63vh;
          padding-left: 0.741vh;
          padding-right: 1.389vh;
          font-size: 1.9vh;
          font-style: italic;
          background: hsla(0, 0%, 0%, 0.25);
        `,
        TitilliumFont
      )}
    >
      <div className={css`position: relative; width: 3.1vh;`}>
        <Image
          className={css`width: 100%; height: 100%;`}
          fill
          unoptimized
          aspectRatio={1}
          src="/helmet-avatar.png"
          alt="Player Icon"
        />
      </div>
      <div className={cx(css`flex-shrink: 0;`, 'text-shadow')}>a lil pug</div>
    </div>
  );
};

export const Footer = () => {
  const {
    force4k,
    setForce4k,
    fullscreen,
    setFullscreen
  } = useContext(AppContext);

  const css = use4k_new();

  useInput({
    input: 'GUIDE',
    state: 'press',
    callback: () => setFullscreen(!fullscreen),
  });

  return (
    <div className={css`
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 3vh;
      height: 7.315vh;
      padding: 0 4.398vh;
      background: hsla(0, 0%, 0%, 0.4);
    `}>
      <MetaButton
        icon="4k"
        label="Force 4k"
        enabled={force4k}
        onClick={() => setForce4k(!force4k)}
      />
      <MetaButton
        icon="fullscreen"
        label="Fullscreen"
        enabled={fullscreen}
        onClick={() => setFullscreen(!fullscreen)}
      />
      <div className={css`flex-grow: 1`} />
      <div className={css`
        display: flex;
        flex-shrink: 0;
        align-items: center;
        justify-content: center;
        gap: 1.389vh;
        height: 100%;
        background: hsla(0, 0%, 100%, 0.02);
      `}>
        <Separator type="end" />
        <FooterNamelate />
        <Separator />
        <FooterButton
          flip
          icon="comment"
          input="START"
          state="hold"
          callback={() => {
            console.log('DERP START INPUT BUTTON HELD');
          }}
        />
        <Separator />
        <FooterButton
          icon="group"
          label={16}
          input="SELECT"
          callback={() => {
            console.log('DERP SELECT INPUT BUTTON');
          }}
        />
        <Separator />
        <FooterButton
          icon="settings"
          input="START"
          state="release"
          callback={() => {
            // TODO: Need an app context prop to keep track if chat window
            // is open. If so, this callback is a no-op. That will gracefully
            // handle the case where we want holding the button for N ms to
            // open the chat window but not also open the settings screen.
            console.log('DERP START INPUT BUTTON RELEASED');
          }}
        />
        <Separator type="end" />
      </div>
    </div>
  );
};
