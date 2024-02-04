import { CSSProperties } from 'react';
import cx from 'classnames';
import _4k from '@material-design-icons/svg/filled/4k.svg';
import arrow_left from '@material-design-icons/svg/filled/arrow_left.svg';
import arrow_right from '@material-design-icons/svg/filled/arrow_right.svg';
import comment from '@material-design-icons/svg/filled/comment.svg';
import fullscreen from '@material-design-icons/svg/filled/fullscreen.svg';
import grid_view from '@material-design-icons/svg/filled/grid_view.svg';
import group from '@material-design-icons/svg/filled/group.svg';
import menu from '@material-design-icons/svg/filled/menu.svg';
import radio_button_checked from '@material-design-icons/svg/filled/radio_button_checked.svg';
import radio_button_unchecked from '@material-design-icons/svg/filled/radio_button_unchecked.svg';
import settings from '@material-design-icons/svg/filled/settings.svg';

const ICONS = {
  '4k': _4k,
  arrow_left,
  arrow_right,
  comment,
  fullscreen,
  grid_view,
  group,
  menu,
  radio_button_checked,
  radio_button_unchecked,
  settings,
};

export type MaterialIconSvg = keyof typeof ICONS;

type MaterialIconProps = {
  className?: string;
  icon: MaterialIconSvg;
  style?: CSSProperties;
};

export const MaterialIcon = ({
  className,
  icon,
  style
}: MaterialIconProps) => {
  const IconComponent = ICONS[icon];

  return (
    <div
      className={cx('flex items-center justify-center', className)}
      style={style}
    >
      <IconComponent className="material-icon-svg" />
    </div>
  );
};
