import cx from 'classnames';
import { fourk, _fourkHelper } from '@/lib/fourk-css';
import { use4k, use4k_TEST } from '@/hooks/use-4k';
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

  const css = use4k_TEST();

  return (
    // <div
    //   className={cx('flex items-center justify-center h-full cursor-pointer', TitilliumFont)}
    //   style={_4k({ gap: '1vh', fontSize: '2vh' })}
    //   onClick={onClick}
    // >
    //   <MaterialIcon icon={icon} style={_4k({ width: '2.5vh', height: '2.5vh' })} />
    //   <div>{label}:</div>
    //   <div>{enabled ? 'On' : 'Off'}</div>
    // </div>
    <div
      className={cx(
        css`
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1vh;
          height: 100%;
          font-size: 2vh;
          cursor: pointer;
        `,
        TitilliumFont
      )}
      // style={_4k({ gap: '1vh', fontSize: '2vh' })}
      onClick={onClick}
    >
      {/* <MaterialIcon icon={icon} style={_4k({ width: '2.5vh', height: '2.5vh' })} /> */}
      <MaterialIcon icon={icon} className={css`width: 2.5vh; height: 2.5vh;`} />
      <div>{label}:</div>
      <div>{enabled ? 'On' : 'Off'}</div>
    </div>
  );
};
