import NextImage, { ImageProps as NextImageProps } from 'next/image';

type ImageProps = NextImageProps & {
  className?: string;
  aspectRatio?: number;
  objectFit?: 'fill' | 'contain' | 'cover' | 'none' | 'scale-down';
};

export const Image = ({
  className = '',
  aspectRatio,
  objectFit = 'contain',
  ...props
}: ImageProps) => {
  if (aspectRatio) {
    const paddingTop = Math.round(aspectRatio * 100) + '%';
    return (
      <div className="relative h-full" style={{ paddingTop }}>
        <div className="absolute top-0 bottom-0 left-0 right-0">
          <NextImage style={{ objectFit }} {...props} />
        </div>
      </div>
    );
  }

  return <NextImage style={{ objectFit }} {...props} />;
};
