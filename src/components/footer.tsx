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
  const { force4k } = useContext(AppContext);

  return (
    <div className={
      cx(`
        flex shrink-0 items-center justify-center
        italic bg-black bg-opacity-25
      `, {
        'gap-[32px]': force4k,
        'h-[100px]': force4k,
        'pl-[16px]': force4k,
        'pr-[30px]': force4k,
        'text-[40px]': force4k,
        'gap-[2vh]': !force4k,
        'h-[10vh]': !force4k,
        'pl-[2vh]': !force4k,
        'pr-[3vh]': !force4k,
        'text-[3.8vh]': !force4k,
      })
    }>
      <div className={
        cx('relative', {
          'w-[66px]': force4k,
          'h-[60px]': force4k,
          'w-[6vh]': !force4k,
          'h-[73%]': !force4k,
        })
      }>
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
  const { force4k, setForce4k } = useContext(AppContext);

  return (
    <div className={cx(`
      absolute bottom-0 left-0 right-0
      flex items-center justify-center
    bg-black bg-opacity-40
    `, {
      'gap-[30px]': force4k,
      'h-[157px]': force4k,
      'px-[95px]': force4k,
      'gap-[0.781%]': !force4k,
      'h-[15vh]': !force4k,
      'px-[2.46%]': !force4k,
    })}>
      <div
        className="flex items-center justify-center h-full"
        onClick={() => setForce4k(!force4k)}
      >
        Forced 4K: {force4k ? 'On' : 'Off'}
      </div>
      <div className="grow" />
      <div className={
        cx('flex shrink-0 items-center justify-center h-full bg-white bg-opacity-[0.02]', {
          'gap-[30px]': force4k,
          'gap-[0.781vw]': !force4k,
        })
      }>
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
