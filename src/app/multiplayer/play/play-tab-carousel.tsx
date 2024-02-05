'use client';

import { useState, CSSProperties } from 'react';
import Link from 'next/link';
import { use4k } from '@/hooks/use-4k';
import { useDirectionalInputs, useInputPortal } from '@/hooks/use-gamepad';
import { useLinkFocus } from '@/hooks/use-link-focus';
import { BrightBox } from '@/layouts/bright-box';
import { Image } from '@/components/image';
import { MaterialIcon } from '@/components/icon';
import { Teko_2_3_Medium } from '@/app/styles/fonts';

const CAROUSEL_ITEMS = [
  {
    src: '/multiplayer/play/january-update.jpg',
    href: '/multiplayer/shop',
    text: 'JANUARY UPDATE',
  },
  {
    src: '/multiplayer/play/illusion.jpg',
    href: '/multiplayer/shop',
    text: 'NEW MAP - ILLUSION',
  },
  {
    src: '/multiplayer/play/spirit-of-fire.jpg',
    href: '/multiplayer/shop',
    text: 'OPERATION: SPIRIT OF FIRE',
  },
  {
    src: '/multiplayer/play/lone-wolves.jpg',
    href: '/multiplayer/shop',
    text: 'HELL YEAH BROTHER - CHEERS FROM IRAQ',
  },
];

type PlayTabCarouselItemProps = {
  defaultFocusRef?: React.RefObject<HTMLAnchorElement>;
  selected?: boolean;
  src: string;
  href: string;
  text: string;
};

const PlayTabCarouselItem = ({
  defaultFocusRef,
  selected,
  src,
  href,
  text,
}: PlayTabCarouselItemProps) => {
  const { ref, isFocused } = useLinkFocus({ ref: defaultFocusRef });
  const _4k = use4k();

  return (
    <li className="relative" hidden={!selected}>
      <Link
        ref={ref}
        href={href}
      >
        <BrightBox notched isFocused={isFocused}>
          {/*
            Need an extra wrapping div so abs pos and padding don't collide.
            It also gets a height because BrightBox needs content with dimensions
            to work. That height used to be applied to the UL, now it's here.
          */}
          <div className="relative" style={_4k({ height: '26.852vh' })}>
            <Image
              className="w-full h-full"
              fill
              objectFit="cover"
              src={src}
              alt={text} />
            <div
              className="absolute top-0 left-0 w-full h-full"
              style={{
                background: 'linear-gradient(0deg, hsla(0,0%,0%,0.9) 0%, hsla(0,0%,0%,0) 25%)',
              }}
            />
            <div
              className="absolute bottom-0 left-0 right-0 flex items-center"
              // TODO: white hover shit
              style={_4k({
                // bottom: '0.45vh', // eyeballed for text alignment
                // left: '1.4vh', // eyeballed for text alignment
                height: '4.537vh',
                paddingLeft: '1.435vh',
                paddingRight: '1.435vh',
                ...Teko_2_3_Medium,
              })}
            >
              {text}
            </div>
          </div>
        </BrightBox>
      </Link>
    </li>
  );
};

type PlayTabCarouselProps = {
  style?: CSSProperties;
};

export const PlayTabCarousel = ({
  style,
}: PlayTabCarouselProps) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const _4k = use4k();

  const { defaultFocusRef, focusContainerRef, teleport } = useInputPortal({
    name: 'PlayTabCarousel'
  });

  const nextItem = () => {
    const newIndex = selectedIndex >= CAROUSEL_ITEMS.length - 1 ? 0 : selectedIndex + 1;
    setSelectedIndex(newIndex);
  }

  const previousItem = () => {
    const newIndex = selectedIndex <= 0 ? CAROUSEL_ITEMS.length - 1 : selectedIndex - 1;
    setSelectedIndex(newIndex);
  }

  useDirectionalInputs({
    portal: 'PlayTabCarousel',
    callback: (direction) => {
      if (!focusContainerRef.current) return;

      switch (direction) {
        case 'U':
          // teleport('MultiplayerTabs'); // TODO
          return console.log('DERP I WANNA TELEPORT BUT CAAAAAAANNNT');
        case 'D':
          return teleport('PlayTabListBox');
        // L/R cycle the carousel, but rather than wrapping on the right
        // edge, we teleport to the operations box thingy.
        case 'L':
        case 'R':
          // TEMP HAX for testing. Needs to be operations box when ready.
          return teleport('PlayTabPortalTest');
      }
    },
  });

  return (
    <div ref={focusContainerRef} style={style}>
      <ul>
        {CAROUSEL_ITEMS.map((item, i) => {
          return (
            <PlayTabCarouselItem
              key={item.src}
              // defaultFocusRef should always be the current active item
              defaultFocusRef={i === selectedIndex ? defaultFocusRef : undefined}
              selected={i === selectedIndex}
              src={item.src}
              href={item.href}
              text={item.text}
            />
          );
        })}
      </ul>
      <div
        className="flex items-center justify-center"
        style={_4k({ gap: '0.833vh', marginTop: '0.972vh' })}
      >
        <div
          className="w-full h-full scale-x-[2.5] scale-y-[1.2]"
          style={_4k({ width: '1.019vh', height: '1.019vh' })}
          onClick={previousItem}
        >
          <MaterialIcon className="w-full h-full" icon="arrow_left" />
        </div>
        <ul className="flex" style={_4k({ gap: '0.833vh' })}>
          {CAROUSEL_ITEMS.map((item, i) => {
            const icon = i === selectedIndex
              ? 'radio_button_checked'
              : 'radio_button_unchecked';
            return (
              <li
                key={item.src}
                style={_4k({ width: '1.019vh', height: '1.019vh' })}
                onClick={() => setSelectedIndex(i)}
              >
                <MaterialIcon className="w-full h-full" icon={icon} />
              </li>
            );
          })}
        </ul>
        <div
          className="w-full h-full scale-x-[2.5] scale-y-[1.2]"
          style={_4k({ width: '1.019vh', height: '1.019vh' })}
          onClick={nextItem}
        >
          <MaterialIcon className="w-full h-full" icon="arrow_right" />
        </div>
      </div>
    </div>
  );
};
