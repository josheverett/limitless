'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { cx } from '@emotion/css';
import { use4k } from '@/hooks/use-4k';
import { InputButton } from '@/components/input-button';
import { TextOffset } from '@/components/text';
import { getFontVariant } from '@/app/styles/fonts';

type PressAToPlayProps = { callback: () => void; };

export const PressAToPlay = ({ callback }: PressAToPlayProps) => {
  const css = use4k();

  const pressAToPlayClassName = cx(
    getFontVariant(css, 'teko_2_3_extra_wide_light'),
    // getFontVariant(css, 'shadow_crisp'),
    css`
      font-size: 3.5vh;
      // This is a one-off shadow.
      text-shadow: 0.1vh 0.15vh hsla(0, 0%, 0%, 0.8);
    `,
  );

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ ease: 'easeIn', duration: 0.5 }}
      >
        <div className={css`
          display: flex;
          align-items: center;
          height: 1.759vh;
          margin-right: -0.7vh;
        `}>
          <TextOffset className={pressAToPlayClassName} smush top="0.2vh">Press</TextOffset>
          <InputButton
            className={css`margin: 0 1.1vh 0 0.7vh;`}
            width={2}
            height={2}
            shadowed
            input="A"
            callback={callback}
          />
          <TextOffset className={pressAToPlayClassName} smush top="0.2vh">to play</TextOffset>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
