'use client';

import Link from 'next/link';
import { cx } from '@emotion/css';
import { use4k } from '@/hooks/use-4k';
import { useLinkFocus } from '@/hooks/use-link-focus';
import { TextOffset } from '@/components/text';
import { getFontVariant } from '@/app/styles/fonts';

export type ListBoxItemProps = {
  defaultFocusRef?: React.RefObject<HTMLAnchorElement>;
  href: string;
  text: string;
  // Not used in list items themselves. When a list has descriptions for its
  // items, they show up somewhere adjacent to the list, usually below.
  description?: string;
};

export const ListBoxItem = ({
  defaultFocusRef,
  href,
  text,
}: ListBoxItemProps) => {
  const { ref, isFocused } = useLinkFocus({ ref: defaultFocusRef });
  const css = use4k();

  const transparentEnd = '0.324vh';
  const focusTransparentStart = '0.324vh';
  const focusTransparentEnd = '0.602vh';

  return (
    // <li> has no styles because we need to rely on :focus for erethang.
    <li>
      {/* This <Link> includes the bottom "tray" border. */}
      <Link
        ref={ref}
        href={href}
        className={css`
          position: relative;
          display: flex;
          align-items: center;
          width: 100%;
          border-style: solid;
          border-width: 0.093vh;
          border-image: linear-gradient(
            to bottom,
            transparent 0%,
            transparent calc(100% - ${transparentEnd}),
            hsl(0,0%,50%) calc(100% - ${transparentEnd}),
            hsl(0,0%,50%) 100%
          ) 1 stretch;
        `}
      >
        {/* This <div> is the cutout stroke border. */}
        <div className={cx(
          css`
            display: flex;
            align-items: center;
            width: 100%;
            height: 4.907vh;
            padding: 0.231vh;
            border-style: solid;
            border-width: 0.093vh;
            border-color: transparent;
            transition-property: transform;
            transition-duration: 200ms;
          `,
          isFocused && css`
            color: black;
            transform: translate(-0.463vh, -0.324vh);
            border-image: linear-gradient(
              to bottom,
              #f4f4f4 0%,
              #f4f4f4 ${focusTransparentStart},
              transparent ${focusTransparentStart},
              transparent ${focusTransparentEnd},
              hsla(0,0%,100%,0.5) ${focusTransparentEnd},
              hsla(0,0%,100%,0.5) calc(100% - ${focusTransparentEnd}),
              transparent calc(100% - ${focusTransparentEnd}),
              transparent calc(100% - ${focusTransparentStart}),
              #f4f4f4 calc(100% - ${focusTransparentStart}),
              #f4f4f4 100%
            ) 1 stretch;
          `,
          ...getFontVariant(css, 'teko_2_3_wide_light'),
        )}>
          {/* Text padding. */}
          <div className={cx(
            // The padding below has the padding from the parent subtracted
            // from it. Now that the CSS has been refactored, this could be
            // updated to use calc().
            css`
              display: flex;
              align-items: center;
              width: 100%;
              height: 100%;
              padding: 0 1.806vh;
            `,
            isFocused && css`
              background: var(--halo-white);
            `
          )}>
            <TextOffset ellipsize smush top="0.2vh">{text}</TextOffset>
          </div>
        </div>
      </Link>
    </li>
  );
};
