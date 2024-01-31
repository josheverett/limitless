import { useContext } from 'react';
import { AppContext } from '@/app/context';

type FooterProps = {};

export const Footer = ({}: FooterProps) => {
  const { force4k, setForce4k } = useContext(AppContext);

  return (
    <div className="flex h-[7.26%] bg-black bg-opacity-40">
      <div onClick={() => setForce4k(!force4k)}>
        click to toggle forced 4k
      </div>
      <div className="grow" />
      <div>buttons</div>
    </div>
  );
};
