'use client';

import { useState } from 'react';
import { use4k } from '@/hooks/use-4k';
import { BrightBox } from '@/layouts/box';
import { Image } from '@/components/image';
import { MaterialIcon } from '@/components/icon';
import { Teko_2_3_Medium } from '@/app/styles/fonts';

type PlayTabCarouselItemProps = {
  selected?: boolean;
  src: string;
  text: string;
};

const PlayTabCarouselItem = ({
  selected,
  src,
  text,
}: PlayTabCarouselItemProps) => {
  const _4k = use4k();

  return (
    <li className="absolute top-0 left-0 w-full h-full" hidden={!selected}>
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
        className="absolute"
        style={_4k({
          bottom: '0.45vh', // eyeballed for text alignment
          left: '1.4vh', // eyeballed for text alignment
          ...Teko_2_3_Medium,
        })}
      >
        {text}
      </div>
    </li>
  );
};

export const PlayTabCarousel = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const _4k = use4k();

  const items = [
    { src: '/multiplayer/play/january-update.jpg', text: 'JANUARY UPDATE' },
    { src: '/multiplayer/play/illusion.jpg', text: 'NEW MAP - ILLUSION' },
    { src: '/multiplayer/play/spirit-of-fire.jpg', text: 'OPERATION: SPIRIT OF FIRE' },
    { src: '/multiplayer/play/lone-wolves.jpg', text: 'HELL YEAH BROTHER - CHEERS FROM IRAQ' },
  ];

  const nextItem = () => {
    const newIndex = selectedIndex >= items.length - 1 ? 0 : selectedIndex + 1;
    setSelectedIndex(newIndex);
  }

  const previousItem = () => {
    const newIndex = selectedIndex <= 0 ? items.length - 1 : selectedIndex - 1;
    setSelectedIndex(newIndex);
  }

  return (
    <>
      <BrightBox>
        <ul className="relative" style={_4k({ height: '26.852vh' })}>
          {items.map((item, i) => {
            return (
              <PlayTabCarouselItem
                key={item.src}
                selected={i === selectedIndex}
                src={item.src}
                text={item.text}
              />
            );
          })}
        </ul>
      </BrightBox>
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
          {items.map((item, i) => {
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
    </>
  );
};
