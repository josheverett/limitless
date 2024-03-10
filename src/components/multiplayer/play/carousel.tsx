'use client';

import { useState, useEffect } from 'react';
import { use4k } from '@/hooks/use-4k';
import { useDirectionalInputs, useInputPortal } from '@/hooks/use-gamepad';
import { MaterialIcon } from '@/components/icon';
import { BrightBoxListItem } from '@/components/list-box/bright-box-list-item';

const CAROUSEL_ITEMS = [
  {
    src: '/multiplayer/play/january-update.jpg',
    href: '/multiplayer/shop1',
    text: 'January Update',
  },
  {
    src: '/multiplayer/play/illusion.jpg',
    href: '/multiplayer/shop2',
    text: 'New Map - Illusion',
  },
  {
    src: '/multiplayer/play/spirit-of-fire.jpg',
    href: '/multiplayer/shop3',
    text: 'Operation: Spirit of Fire',
  },
  {
    src: '/multiplayer/play/lone-wolves.jpg',
    href: '/multiplayer/shop4',
    text: 'Hell yeah brother, cheers from Iraq!',
  },
];

type PlayTabCarouselProps = {
  className?: string;
};

export const PlayTabCarousel = ({
  className,
}: PlayTabCarouselProps) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const css = use4k();

  const { defaultFocusRef, focusContainerRef, teleport } = useInputPortal({
    name: 'PlayTabCarousel',
  });

  const nextItem = () => {
    const newIndex = selectedIndex >= CAROUSEL_ITEMS.length - 1 ? 0 : selectedIndex + 1;
    setSelectedIndex(newIndex);
  };

  const previousItem = () => {
    const newIndex = selectedIndex <= 0 ? CAROUSEL_ITEMS.length - 1 : selectedIndex - 1;
    setSelectedIndex(newIndex);
  };

  // This is how we keep the current carousel item in focus.
  useEffect(() => {
    if (!focusContainerRef.current) return;
    const links = Array.from(focusContainerRef.current.querySelectorAll('a'));
    const selectedLink = links[selectedIndex];
    selectedLink?.focus();
  }, [selectedIndex, focusContainerRef]);

  useDirectionalInputs({
    portal: 'PlayTabCarousel',
    callback: (direction) => {
      if (!focusContainerRef.current) return;

      const isAtEnd = selectedIndex >= CAROUSEL_ITEMS.length - 1;

      switch (direction) {
        // Up and down teleports.
        case 'U':
          return teleport('MultiplayerAppTabs');
        case 'D':
          return teleport('PlayTabListBox');
        // Left cycles focus, and wraps at the edge.
        case 'L':
          return previousItem();
        // Right cycles focus, and portals to operations box at the edge.
        case 'R':
          if (isAtEnd) return teleport('PlayTabOperations');
          return nextItem();
      }
    },
  });

  return (
    <div ref={focusContainerRef} className={className}>
      <ul>
        {CAROUSEL_ITEMS.map((item, i) => {
          return (
            <li
              key={item.src}
              className={css`position: relative;`}
              hidden={i !== selectedIndex}
            >
              <BrightBoxListItem
                // defaultFocusRef should always be the current active item
                defaultFocusRef={i === selectedIndex ? defaultFocusRef : undefined}
                src={item.src}
                href={item.href}
                text={item.text}
                height={25.833}
              />
            </li>
          );
        })}
      </ul>
      <div className={css`
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.833vh;
        margin-top: 0.972vh;
      `}>
        <div
          className={css`
            width: 1.019vh;
            height: 1.019vh;
            transform: scale(2.5, 1.2);
            cursor: pointer;
          `}
          onClick={previousItem}
        >
          <MaterialIcon className={css`width: 100%; height: 100%;`} icon="arrow_left" />
        </div>
        <ul className={css`display: flex; gap: 0.833vh;`}>
          {CAROUSEL_ITEMS.map((item, i) => {
            const icon = i === selectedIndex
              ? 'radio_button_checked'
              : 'radio_button_unchecked';
            return (
              <li
                key={item.src}
                className={css`width: 1.019vh; height: 1.019vh; cursor: pointer;`}
                onClick={() => setSelectedIndex(i)}
              >
                <MaterialIcon
                  className={css`width: 100%; height: 100%;`}
                  icon={icon}
                />
              </li>
            );
          })}
        </ul>
        <div
          className={css`
            width: 1.019vh;
            height: 1.019vh;
            transform: scale(2.5, 1.2);
            cursor: pointer;
          `}
          onClick={nextItem}
        >
          <MaterialIcon className={css`width: 100%; height: 100%;`} icon="arrow_right" />
        </div>
      </div>
    </div>
  );
};
