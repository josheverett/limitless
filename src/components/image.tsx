import NextImage, { ImageProps as NextImageProps } from 'next/image';
import { use4k } from '@/hooks/use-4k';

type ImageProps = NextImageProps & {
  aspectRatio?: number;
  unoptimized?: boolean;
  priority?: boolean;
  objectFit?: 'fill' | 'contain' | 'cover' | 'none' | 'scale-down';
};

export const Image = ({
  aspectRatio,
  unoptimized,
  priority = true,
  objectFit = 'contain',
  ...props
}: ImageProps) => {
  const css = use4k();

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
        <NextImage unoptimized={unoptimized} priority={priority} style={{ objectFit }} {...props} />
      </div>
    </div>
  );
};
