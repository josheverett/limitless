import { cx } from '@emotion/css';
import { use4k_new } from '@/hooks/use-4k';

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
};

export const MaterialIcon = ({
  className,
  icon,
}: MaterialIconProps) => {
  const css = use4k_new();
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
