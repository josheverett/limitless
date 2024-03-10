import Link from 'next/link';
import { motion, Variants } from 'framer-motion';
import { cx } from '@emotion/css';
import { use4k } from '@/hooks/use-4k';
import { useLinkFocus } from '@/hooks/use-link-focus';
import { BrightBox } from '@/layouts/bright-box';
import { Image } from '@/components/image';
import { TextOffset } from '@/components/text';
import { getFontVariant } from '@/app/styles/fonts';

export type BrightBoxListItemProps = {
  className?: string;
  defaultFocusRef?: React.RefObject<HTMLAnchorElement>;
  hidden?: boolean;
  src: string;
  href: string;
  text: string;
  textHeight: number; // vh units
  height: number; // vh units
  padding: number; // vh units
  portraitHeight?: number; // vh units
  motionVariants?: Variants;
};

export const BrightBoxListItem = ({
  className,
  defaultFocusRef,
  hidden = false,
  src,
  href,
  text,
  textHeight,
  height,
  padding,
  portraitHeight,
  motionVariants,
}: BrightBoxListItemProps) => {
  const { ref, isFocused } = useLinkFocus({ ref: defaultFocusRef });
  const css = use4k();

  const portraitHeight_ = portraitHeight || height;

  return (
    <motion.li className={className} hidden={hidden} variants={motionVariants}>
      <Link
        ref={ref}
        href={href}
      >
        <BrightBox notched paddingSize="small" isFocused={isFocused}>
          {/*
            Need an extra wrapping div so abs pos and padding don't collide.
            It also gets a height because BrightBox needs content with dimensions
            to work, and having everything absolutely positioned is a no-no.
            That height used to be applied to the UL, now it's here because it
            makes the layout here easier as well. :)
          */}
          <div className={css`
            position: relative;
            height: ${String(height)}vh;

            @media (orientation: portrait) {
              height: ${String(portraitHeight_)}vh;
            }
          `}>
            <Image
              fill
              objectFit="cover"
              src={src}
              alt={text}
            />
            <div
              className={css`
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: linear-gradient(0deg, hsla(0,0%,0%,0.9) 0%, hsla(0,0%,0%,0) 25%);
              `}
            />
            <div className={cx(
              css`
                position: absolute;
                bottom: 0;
                left: 0;
                right: 0;
                display: flex;
                align-items: center;
                height: ${String(textHeight)}vh; // config here
                padding: 0 ${String(padding)}vh;
                color: ${isFocused ? 'black' : 'inherit'};
                background: ${isFocused ? 'var(--halo-white)' : 'transparent'};
              `,
              getFontVariant(css, 'teko_2_3_wide_light'),
              // One-off (for now?) letter-spacing override for this variant.
              // If like, 2 more components need this it'll become a variant.
              css`letter-spacing: 0.4vh;`,
            )}>
              <TextOffset truncate smush top="0.25vh">{text}</TextOffset>
            </div>
          </div>
        </BrightBox>
      </Link>
    </motion.li>
  );
};
