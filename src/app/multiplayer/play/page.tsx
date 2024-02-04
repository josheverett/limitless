'use client';

import { motion } from 'framer-motion';
import { use4k } from '@/hooks/use-4k';
import { MediumColumn } from '@/layouts/medium-column';
import { BrightBox } from '@/layouts/box';
import { Image } from '@/components/image';
import { Teko_2_3_Medium } from '@/app/styles/fonts';

export default function PlayTab() {
  const _4k = use4k();

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <MediumColumn styles={_4k({ marginTop: '4.167vh' })}>
        <BrightBox>
          <div className="relative" style={_4k({ height: '26.852vh' })}>
            <Image
              className="w-full h-full"
              fill
              objectFit="cover"
              src="/spartan-lineup.jpg"
              alt="Carousel Image Test" />
            <div
              className="absolute top-0 left-0 w-full h-full"
              style={{
                background: 'linear-gradient(0deg, hsla(0,0%,0%,0.9) 0%, hsla(0,0%,0%,0) 25%)',
              }}
            />
            <div
              className="absolute"
              style={_4k({
                bottom: '1.574vh',
                left: '1.4vh',
                height: '2.2vh', // eyeballed
                ...Teko_2_3_Medium,
              })}
            >
              JANUARY UPDATE
            </div>
          </div>
        </BrightBox>
        <div>listbox</div>
        <div>text</div>
      </MediumColumn>
    </motion.div>
  );
}
