'use client';

import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import cx from 'classnames';
import { use4k } from '@/hooks/use-4k';
import {
  getTargetForRoute,
  useDirectionalInputs,
  useInputPortal,
  PortalTarget,
} from '@/hooks/use-gamepad';
import { useLinkFocus } from '@/hooks/use-link-focus';
import { TextOffset } from '@/components/text';
import { InputButton } from '@/components/input-button';
import { Teko_2_3_Wide_Light } from '@/app/styles/fonts';

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
  const _4k = use4k();

  return (
    <Link
      ref={ref}
      href={tab.href}
      className={
        cx('flex items-center w-full h-full font-medium outline outline-offset-0', {
          'text-halo-white': isSelected,
          'text-halo-offwhite': !isSelected,
          'outline-halo-white': isSelected,
          'outline-halo-offwhite': !isSelected,
        })
      }
      style={_4k({
        // TODO: This minWidth is probably 0.37vh off. If and when
        // I do screenshot overlays we'll see.
        minWidth: '19.444vh',
        outlineWidth: isSelected ? '0.37vh' : '0.185vh',
        ...Teko_2_3_Wide_Light,
      })}
    >
      <div
        className="w-full h-full"
        style={_4k({
          padding: '0.37vh',
        })}
      >
        <div
          className={cx(
            'flex h-full',
            { 'text-black': isFocused, 'bg-halo-white': isFocused }
          )}
          style={_4k({
            paddingLeft: '1.481vh',
            paddingRight: '1.481vh',
          })}
        >
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
  const _4k = use4k();

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
      className={cx('relative flex items-center', className)}
      style={_4k({
        gap: '1.991vh',
        height: '3.704vh',
        // TODO: In the end, I may be eyeballing this down 0.1-0.2vh.
        // We'll wait for the screenshot overlay tests at the very end
        // of the project, if I do those.
        marginLeft: '-5.695vh', // button width + gap
      })}
    >
      <InputButton
        input="LB"
        callback={selectPreviousTab}
        style={_4k({
          width: '3.704vh',
          height: '1.944vh',
        })}
      />
      <ul className="flex items-center h-full" style={_4k({ gap: '1.481vh' })}>
        {tabs.map((tab) => {
          const isSelected = tab.href === pathname;
          return (
            <li className="h-full" key={tab.href}>
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
        style={_4k({ width: '3.704vh', height: '1.944vh' })}
      />
    </div>
  );
};
