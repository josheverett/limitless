import { cx } from '@emotion/css';
import { use4k } from '@/hooks/use-4k';

import _4k from '@material-design-icons/svg/filled/4k.svg';
import access_time_filled from '@material-design-icons/svg/filled/access_time_filled.svg';
import arrow_left from '@material-design-icons/svg/filled/arrow_left.svg';
import arrow_right from '@material-design-icons/svg/filled/arrow_right.svg';
import comment from '@material-design-icons/svg/filled/comment.svg';
import fullscreen from '@material-design-icons/svg/filled/fullscreen.svg';
import grid_view from '@material-design-icons/svg/filled/grid_view.svg';
import group from '@material-design-icons/svg/filled/group.svg';
import lock from '@material-design-icons/svg/filled/lock.svg';
import menu from '@material-design-icons/svg/filled/menu.svg';
import radio_button_checked from '@material-design-icons/svg/filled/radio_button_checked.svg';
import radio_button_unchecked from '@material-design-icons/svg/filled/radio_button_unchecked.svg';
import settings from '@material-design-icons/svg/filled/settings.svg';

const ICONS = {
  '4k': _4k,
  access_time_filled,
  arrow_left,
  arrow_right,
  comment,
  fullscreen,
  grid_view,
  group,
  lock,
  menu,
  radio_button_checked,
  radio_button_unchecked,
  settings,
};

export type MaterialIconSvg = keyof typeof ICONS;

type MaterialIconProps = {
  className?: string;
  icon: MaterialIconSvg;
};

export const MaterialIcon = ({
  className,
  icon,
}: MaterialIconProps) => {
  const css = use4k();
  const IconComponent = ICONS[icon];

  return (
    <div className={cx(
      css`display: flex; align-items: center; justify-content: center;`,
      className
    )}>
      <IconComponent className="material-icon-svg" />
    </div>
  );
};
