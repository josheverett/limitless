import { cx } from '@emotion/css';
import { use4k } from '@/hooks/use-4k';
import { MaterialIcon, MaterialIconSvg } from '@/components/icon';
import { getFontVariant } from '@/app/styles/fonts';

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
  const css = use4k();

  return (
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
        getFontVariant(css, 'titillium'),
      )}
      onClick={onClick}
    >
      <MaterialIcon icon={icon} className={css`width: 2.5vh; height: 2.5vh;`} />
      <div>{label}:</div>
      <div>{enabled ? 'On' : 'Off'}</div>
    </div>
  );
};
