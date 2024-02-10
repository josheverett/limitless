import Link from 'next/link';
import { cx } from '@emotion/css';
import { use4k } from '@/hooks/use-4k';
import { useLinkFocus } from '@/hooks/use-link-focus';
import { TextOffset } from '@/components/text';
import { getFontVariant } from '@/app/styles/fonts';

export type TabLink = {
  title: string;
  href: string;
};

type TabProps = {
  defaultFocusRef?: React.RefObject<HTMLAnchorElement>;
  tab: TabLink;
  isSelected?: boolean;
};

export const Tab = ({
  defaultFocusRef,
  tab,
  isSelected,
}: TabProps) => {
  const { ref, isFocused } = useLinkFocus({ ref: defaultFocusRef });
  const css = use4k();

  return (
    <Link
      ref={ref}
      href={tab.href}
      // TODO: This min-width is probably 0.37vh off. If and when
      // I do screenshot overlays we'll see.
      className={cx(
        css`
          display: flex;
          align-items: center;
          min-width: 19.444vh;
          width: 100%;
          height: 100%;
          outline-style: solid;
          outline-offset: 0;
          outline-width: ${isSelected ? '0.37' : '0.185'}vh;
          outline-color: var(--halo-${isSelected ? 'white' : 'offwhite'});
          color: var(--halo-${isSelected ? 'white' : 'offwhite'});

          @media (orientation: portrait) {
            min-width: 0;
          }
        `,
        ...getFontVariant(css, 'teko_2_3_wide_light'),
      )}
    >
      <div className={css`
        width: 100%;
        height: 100%;
        padding: 0.37vh;
      `}>
        <div className={cx(
          css`
            display: flex;
            height: 100%;
            padding: 0 1.481vh;
          `,
          isFocused && css`
            color: black;
            background: var(--halo-white);
          `,
        )}>
          <TextOffset smush top="-0.324vh">{tab.title.toUpperCase()}</TextOffset>
        </div>
      </div>
    </Link>
  );
};
