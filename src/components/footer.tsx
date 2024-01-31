import { useAppContext } from '@/hooks/use-app-context';

type FooterProps = {};

export const Footer = ({}: FooterProps) => {
  const { force4k, setForce4k } = useAppContext();

  return (
    <div className="flex h-[7.26%] bg-black bg-opacity-40">
    <div onClick={() => setForce4k(!force4k)}>
      click to toggle forced 4k
    </div>
    footer
  </div>
  );
};
