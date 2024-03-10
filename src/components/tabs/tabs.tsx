import { useEffect, useRef } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useSwipeable } from 'react-swipeable';
import { cx } from '@emotion/css';
import { use4k, TABBED_PAGE_PADDING_X } from '@/hooks/use-4k';
import { useDirectionalInputs, useInputPortal } from '@/hooks/use-gamepad';
import { InputButton } from '@/components/input-button';
import { useOnResize } from '@/components/resize';
import { Tab, TabLink } from './tab';

type TabsProps = {
  className?: string;
  tabs: TabLink[];
  portal: string;
};

// TODO: Swiping stuff needs to be abstracted when we have more swipeable things.

// Important reminder: selected and focused are not the same!
// selected = matches current route
// focused = hover/focus/navigation/etc.
export const Tabs = ({
  className,
  tabs,
  portal,
}: TabsProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const css = use4k();

  const { defaultFocusRef, focusContainerRef, back } = useInputPortal({
    name: portal,
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

      const links = Array.from(focusContainerRef.current.querySelectorAll('a'));
      const focusedIndex = links.findIndex((link) => link === document.activeElement);
      const isAtStart = focusedIndex <= 0;
      const isAtEnd = focusedIndex >= links.length - 1;

      let indexToFocus = focusedIndex;

      switch (direction) {
        // Going down always means going back to the last focused portal.
        case 'D':
          return back();
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

  const startPosRef = useRef(0);
  const swipeRef = useRef<HTMLDivElement>(null);

  // This uses native DOM APIs and a <number> ref for perf, so we dont rerender
  // the component when swiping.
  const handlers = useSwipeable({
    onSwipeStart: () => {
      if (!swipeRef.current) return;
      // This can be perfed up with data-attrs, regex is probably more expensive.
      const transform = swipeRef.current.style.transform;
      const matches = transform.match(/translateX\((-?\d+\.?\d*)px\)/);
      startPosRef.current = matches ? Number(matches[1]) : startPosRef.current;
    },
    onSwiping: (eventData) => {
      if (!swipeRef.current) return;
      const newPos = startPosRef.current + eventData.deltaX;
      const maxTranslateX = window.innerWidth - (swipeRef.current?.offsetWidth || 0);
      const clampedTranslateX = Math.min(Math.max(newPos, maxTranslateX), 0);
      swipeRef.current.style.transform = `translateX(${clampedTranslateX}px)`;
    },
    trackMouse: false,
  });

  useEffect(() => {
    if (!swipeRef.current) return;
    swipeRef.current.dataset.viewportSize = JSON.stringify(
      [window.innerWidth, window.innerHeight]
    );
  });

  useOnResize((width, height) => {
    if (!swipeRef.current) return;
    const newViewportSize = JSON.stringify([width, height]);
    if (newViewportSize === swipeRef.current.dataset.viewportSize ) return;
    swipeRef.current.style.transform = `translateX(0px)`;
  });

  return (
    <div
      ref={focusContainerRef}
      className={cx(
        css`
          --tabs-x-gap: 1.991vh;
          --tab-x-padding: 1.481vh;

          position: relative;
          display: flex;
          align-items: center;
          gap: var(--tabs-x-gap);
          height: 3.704vh;
          margin-left: calc(-1 * (var(--tab-x-padding) + (var(--tabs-x-gap) * 2)));

          @media (orientation: portrait) {
            margin-left: 0;
          }
        `,
        className
      )}
    >
      <InputButton
        input="LB"
        allowMobile={false}
        width={3.704}
        height={1.944}
        callback={selectPreviousTab}
      />
      {/* This div exists purely for swipe UX, because handlers.ref isn't
          a normal react ref and we need to measure the width of the <ul>. */}
      <div
        ref={swipeRef}
        className={css`
          height: 100%;
          transition: transform 0.1s ease-out; // prevents jank
          touch-action: pan-y;
        `}
      >
        <ul
          {...handlers}
          className={css`
            display: flex;
            align-items: center;
            gap: 1.481vh;
            height: 100%;
            touch-action: pan-x;
            pointer-events: none;

            li {
              pointer-events: all;
            }

            @media (orientation: portrait) {
              // This is necessary to clip the max scroll position at the
              // horizontal padding width rather than the viewport width.
              padding-right: calc(${TABBED_PAGE_PADDING_X} * 2);
            }
          `}
        >
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
      </div>
      <InputButton
        input="RB"
        allowMobile={false}
        width={3.704}
        height={1.944}
        callback={selectNextTab}
      />
    </div>
  );
};
