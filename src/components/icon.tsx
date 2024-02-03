import cx from 'classnames';
import Fourk from '@material-design-icons/svg/filled/4k.svg';
import Fullscreen from '@material-design-icons/svg/filled/fullscreen.svg';

const ICONS = {
  '4k': Fourk,
  fullscreen: Fullscreen,
};

type MaterialIconProps = {
  className: string;
  icon: keyof typeof ICONS;
};

export const MaterialIcon = ({
  className,
  icon,
}: MaterialIconProps) => {
  const IconComponent = ICONS[icon];

  return (
    <div className={cx('flex items-center justify-center', className)}>
      <IconComponent className="material-icon-svg" />
    </div>
  );
};
