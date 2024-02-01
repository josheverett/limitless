import { useContext } from 'react';
import cx from 'classnames';
import { AppContext } from '@/app/context';
import { Image } from '@/components/image';

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
  const {
    force4k,
    setForce4k,
    fullscreen,
    setFullscreen
  } = useContext(AppContext);

  return (
    <div className={`
      footer
      absolute bottom-0 left-0 right-0
      flex items-center justify-center
    bg-black bg-opacity-40
    `}>
      <div
        className="fourk-toggle flex items-center justify-center h-full"
        onClick={() => setForce4k(!force4k)}
      >
        <span className="material-icons">4k</span>
        <span>Force 4K:</span>
        <span>{force4k ? 'On' : 'Off'}</span>
      </div>
      <div
        className="fourk-toggle flex items-center justify-center h-full"
        onClick={() => setFullscreen(!fullscreen)}
      >
        <span className="material-icons">fullscreen</span>
        <span>Fullscreen:</span>
        <span>{fullscreen ? 'On' : 'Off'}</span>
      </div>
      <div className="grow" />
      <div className={`
        footer-buttons
        flex shrink-0 items-center justify-center
        h-full bg-white bg-opacity-[0.02]
      `}>
        <Separator type="end" />
        <FooterNamelate />
        <Separator />
        <div className="">foo</div>
        <Separator />
        <div className="">foo</div>
        <Separator />
        <div className="">foo</div>
        <Separator type="end" />
      </div>
    </div>
  );
};
