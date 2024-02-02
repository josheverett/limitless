import cx from 'classnames';
import { Image } from '@/components/image';
import { MetaButtons } from '@/components/footer/meta-buttons';
import { FooterButton } from '@/components/footer/footer-button';
import '@/app/styles/footer.css';

type SeparatorProps = { type?: 'middle' | 'end'; };

const Separator = ({ type = 'middle' }: SeparatorProps) => {
  const isMiddle = type == 'middle';
  return (
    <div className={cx('grow-0 shrink-0', {
      'min-w-px': isMiddle,
      'w-[0.052%]': isMiddle,
      'h-[76.433%]': isMiddle,
      'bg-[hsla(216,7%,71%,70%)]': isMiddle,
      'min-w-[2px]': !isMiddle,
      'w-[0.104%]': !isMiddle,
      'h-full': !isMiddle,
      'bg-[hsla(0,0%,100%,15%)]': !isMiddle,
    })} />
  );
};

const FooterNamelate = () => {
  return (
    <div className={`
      footer-nameplate
      flex shrink-0 items-center justify-center
      italic bg-black bg-opacity-25
    `}>
      <div className="footer-avatar relative">
        <Image
          className="w-full h-full"
          fill
          aspectRatio={1}
          src="/helmet-avatar.png"
          alt="Player Icon" />
      </div>
      <div className="shrink-0 text-shadow">a lil pug</div>
    </div>
  );
};

export const Footer = () => {
  return (
    <div className={`
      footer
      absolute bottom-0 left-0 right-0
      flex items-center justify-center
    bg-black bg-opacity-40
    `}>
      <MetaButtons />
      <div className="grow" />
      <div className={`
        footer-buttons
        flex shrink-0 items-center justify-center
        h-full bg-white bg-opacity-[0.02]
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
