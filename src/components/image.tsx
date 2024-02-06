import NextImage, { ImageProps as NextImageProps } from 'next/image';
import { use4k_new } from '@/hooks/use-4k';

type ImageProps = NextImageProps & {
  className?: string;
  aspectRatio?: number;
  unoptimized?: boolean;
  objectFit?: 'fill' | 'contain' | 'cover' | 'none' | 'scale-down';
};

export const Image = ({
  className = '',
  aspectRatio,
  unoptimized,
  objectFit = 'contain',
  ...props
}: ImageProps) => {
  const css = use4k_new();

  if (!aspectRatio) return <NextImage style={{ objectFit }} {...props} />;

  const paddingTop = Math.round(aspectRatio * 100) + '%';

  return (
    <div className={css`
      position: relative;
      height: 100%;
      padding-top: ${paddingTop};
    `}>
      <div className={css`
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
      `}>
        <NextImage unoptimized={unoptimized} style={{ objectFit }} {...props} />
      </div>
    </div>
  );
};
