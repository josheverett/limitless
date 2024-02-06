'use client';

import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { cx } from '@emotion/css';
import { use4k_new } from '@/hooks/use-4k';
import {
  getTargetForRoute,
  useDirectionalInputs,
  useInputPortal,
  PortalTarget,
} from '@/hooks/use-gamepad';
import { useLinkFocus } from '@/hooks/use-link-focus';
import { TextOffset } from '@/components/text';
import { InputButton } from '@/components/input-button';
import { getFontVariant } from '@/app/styles/fonts';

// lol at the "_". I think the typical way to sovle this is just have
// the types in a separate file then import them with "as"?
// Alas, my inventory of fucks is limited.
type Tab_ = {
  title: string;
  href: string;
};

type TabProps = {
  defaultFocusRef?: React.RefObject<HTMLAnchorElement>;
  tab: Tab_;
  isSelected?: boolean;
};

const Tab = ({
  defaultFocusRef,
  tab,
  isSelected,
}: TabProps) => {
  const { ref, isFocused } = useLinkFocus({ ref: defaultFocusRef });
  const css = use4k_new();

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

type TabsProps = {
  className?: string;
  tabs: Tab_[];
  portal: string;
  portalTargets: PortalTarget[];
};

// TODO: In the real thing the downward tab portal remembers
// where you were when you focused into the tabs. P3 territory.

// Important reminder: selected and focused are not the same!
// selected = matches current route
// focused = hover/focus/navigation/etc.
export const Tabs = ({
  className,
  tabs,
  portal,
  portalTargets = [],
}: TabsProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const css = use4k_new();

  const { defaultFocusRef, focusContainerRef, teleport } = useInputPortal({
    name: portal
  });

  const selectNextTab = () => {
    const currentIndex = tabs.findIndex((tab) => tab.href === pathname);
    const newIndex = currentIndex >= tabs.length - 1 ? 0 : currentIndex + 1;
    const { href } = tabs[newIndex];
    router.push(href);
  };

  const selectPreviousTab = () => {
    const currentIndex = tabs.findIndex((tab) => tab.href === pathname);
    const newIndex = currentIndex <= 0 ? tabs.length - 1 : currentIndex - 1;
    const { href } = tabs[newIndex];
    router.push(href);
  };

  useDirectionalInputs({
    portal,
    directions: ['D', 'L', 'R'],
    callback: (direction) => {
      if (!focusContainerRef.current) return;

      let portalTarget: PortalTarget | undefined;

      const links = Array.from(focusContainerRef.current.querySelectorAll('a'));
      const focusedIndex = links.findIndex((link) => link === document.activeElement);
      const isAtStart = focusedIndex <= 0;
      const isAtEnd = focusedIndex >= links.length - 1;

      let indexToFocus = focusedIndex;

      switch (direction) {
        // Going down means teleporting somewhere.
        case 'D':
          portalTarget = getTargetForRoute(portalTargets, pathname);
          if (!!portalTarget) teleport(portalTarget.target);
          return;
        // Going left or right cycles tabs. Wraps.
        case 'L':
          indexToFocus = isAtStart ? links.length - 1 : focusedIndex - 1;
          break;
        case 'R':
          indexToFocus = isAtEnd ? 0 : focusedIndex + 1;
          break;
      }

      links[indexToFocus]?.focus();
    },
  });

  return (
    <div
      ref={focusContainerRef}
      // TODO: In the end, I may be eyeballing the margin-left down 0.1-0.2vh.
      // We'll wait for the screenshot overlay tests at the very end of the
      // project, if I do those.
      className={cx(
        css`
          position: relative;
          display: flex;
          align-items: center;
          gap: 1.991vh;
          height: 3.704vh;
          margin-left: -5.695vh; /* button width + gap */
        `,
        className
      )}
    >
      <InputButton
        input="LB"
        callback={selectPreviousTab}
        className={css`
          width: 3.704vh;
          height: 1.944vh;
        `}
      />
      <ul className={css`
        display: flex;
        align-items: center;
        gap: 1.481vh;
        height: 100%;
      `}>
        {tabs.map((tab) => {
          const isSelected = tab.href === pathname;
          return (
            <li key={tab.href} className={css`height: 100%;`}>
              <Tab
                defaultFocusRef={isSelected ? defaultFocusRef : undefined}
                tab={tab}
                isSelected={isSelected}
              />
            </li>
          );
        })}
      </ul>
      <InputButton
        input="RB"
        callback={selectNextTab}
        className={css`width: 3.704vh; height: 1.944vh;`}
      />
    </div>
  );
};
