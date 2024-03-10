'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { cx } from '@emotion/css';
import { use4k } from '@/hooks/use-4k';
import { LoadingSpinner } from '@/components/loading-spinner';
import { TextOffset } from '@/components/text';
import { getFontVariant } from '@/app/styles/fonts';

export const LoadingMessage = () => {
  const css = use4k();

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ ease: 'easeOut', duration: 0.25 }}
        className={css`
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 3.75vh;
        `}
      >
        <LoadingSpinner />
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ease: 'easeOut', duration: 0.3 }}
        >
          <div className={cx(
            css`
              height: 1.343vh;
              font-size: 1.852vh;
              text-align: center;
              // TODO: This should be a variant, shares some stuff with description variant.
              letter-spacing: 0.15vh;
            `,
            getFontVariant(css, 'titillium'),
            getFontVariant(css, 'shadow_crisp')
          )}>
            <TextOffset top="-0.741vh">Initializing data</TextOffset>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
