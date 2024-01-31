import { useContext } from 'react';
import { AppContext } from '@/app/context';

const Separator = () => {
  return <div className="w-px h=[0.56%]" />;
};

type FooterProps = {};

// WIP: Font sizes need percentages.

export const Footer = ({}: FooterProps) => {
  const { force4k, setForce4k } = useContext(AppContext);

  return (
    <div className={`
      absolute bottom-0 left-0 right-0
      flex h-[7.26%] px-[2.5%]
    bg-black bg-opacity-40
    `}>
      <div
        className="flex items-center justify-center h-full"
        onClick={() => setForce4k(!force4k)}
      >
        Forced 4K: {force4k ? 'On' : 'Off'}
      </div>
      <div className="grow" />
      <div className="flex">
        <div>foo</div>
        <div>foo</div>
        <div>foo</div>
        <div>foo</div>
      </div>
    </div>
  );
};
