import cx from 'classnames';
import { useContext } from 'react';
import { AppContext } from '@/app/context';
import { use4k } from '@/hooks/use-4k';
import { useInput } from '@/hooks/use-gamepad';
import { Image } from '@/components/image';
import { MetaButton } from '@/components/footer/meta-button';
import { FooterButton } from '@/components/footer/footer-button';
import { TitilliumFont } from '@/app/styles/fonts';

type SeparatorProps = { type?: 'middle' | 'end'; };

const Separator = ({ type = 'middle' }: SeparatorProps) => {
  const _4k = use4k();

  if (type == 'middle') {
    return (
      <div
        className="grow-0 shrink-0 min-w-px bg-[hsla(216,7%,71%,70%)]"
        style={_4k({ width: '0.093vh', height: '5.556vh' })}
      />
    );
  }

  return (
    <div
      className="grow-0 shrink-0 min-w-[2px] h-full bg-[hsla(0,0%,100%,15%)]"
      style={_4k({ width: '0.185vh' })}
    />
  );
};

const FooterNamelate = () => {
  const _4k = use4k();

  return (
    <div
      className={cx(
        `
          flex shrink-0 items-center justify-center
          italic bg-black bg-opacity-25
        `,
        TitilliumFont
      )}
      style={_4k({
        gap: '1.481vh',
        height: '4.63vh',
        paddingLeft: '0.741vh',
        paddingRight: '1.389vh',
        fontSize: '1.9vh',
      })}
    >
      <div
        className="relative"
        style={_4k({ width: '3.1vh' })}
      >
        <Image
          className="w-full h-full"
          fill
          unoptimized
          aspectRatio={1}
          src="/helmet-avatar.png"
          alt="Player Icon" />
      </div>
      <div className="shrink-0 text-shadow">a lil pug</div>
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

  const _4k = use4k();

  useInput('GUIDE', 'press', () => setFullscreen(!fullscreen));

  return (
    <div
      className={`
        absolute bottom-0 left-0 right-0
        flex items-center justify-center
        bg-black bg-opacity-40
      `}
      style={_4k({
        gap: '3vh', // This only affects the meta buttons.
        height: '7.315vh',
        paddingLeft: '4.398vh',
        paddingRight: '4.398vh',
      })}
    >
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
      <div className="grow" />
      <div
        className={`
          flex shrink-0 items-center justify-center
          h-full bg-white bg-opacity-[0.02]
        `}
        style={_4k({ gap: '1.389vh' })}
      >
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
