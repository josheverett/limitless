import cx from 'classnames';
import { use4k } from '@/hooks/use-4k';
import { MaterialIcon, MaterialIconSvg } from '@/components/icon';
import { TitilliumFont } from '@/app/styles/fonts';

type MetaButtonProps = {
  icon: MaterialIconSvg;
  label: string;
  enabled: boolean;
  onClick: () => void;
};

export const MetaButton = ({
  icon,
  label,
  enabled,
  onClick,
}: MetaButtonProps) => {
  const _4k = use4k();

  return (
    <div
      className={cx('flex items-center justify-center h-full cursor-pointer', TitilliumFont)}
      style={_4k({ gap: '1vh', fontSize: '2vh' })}
      onClick={onClick}
    >
      <MaterialIcon icon={icon} style={_4k({ width: '2.5vh', height: '2.5vh' })} />
      <div>{label}:</div>
      <div>{enabled ? 'On' : 'Off'}</div>
    </div>
  );
};
