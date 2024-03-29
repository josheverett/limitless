import { motion } from 'framer-motion';
import { cx } from '@emotion/css';
import { use4k, TABBED_PAGE_PADDING_X } from '@/hooks/use-4k';
import { TabLink } from '@/components/tabs/tab';
import { Tabs } from '@/components/tabs/tabs';
import { getFontVariant } from '@/app/styles/fonts';

type TabbedPageProps = {
  className?: string;
  tabs: TabLink[];
  portal: string; // Name of the input portal for these tabs.
  hidden: boolean;
  children: React.ReactNode;
};

export const TabbedPage = ({
  className,
  tabs,
  portal,
  hidden,
  children,
}: TabbedPageProps) => {
  const css = use4k();

  return (
    // Notice how the FM div doesn't wrap main. That's intentional. This was
    // also just me making sure the thing works, it's just a POC. Temporary.
    <main
      hidden={hidden}
      className={cx(getFontVariant(css, 'teko'), className)}
    >
      <motion.div
        className={css`width: 100%; height: 100%;`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {/* vw is correct for padding left/right below. */}
        <div className={css`
          display: flex;
          flex-direction: column;
          height: 100%;
          padding-left: ${TABBED_PAGE_PADDING_X};
          padding-right: ${TABBED_PAGE_PADDING_X};
          padding-top: 6.111vh;
        `}>
          <div className={css`position: relative; z-index: 2;`}>
            <Tabs
              portal={portal}
              tabs={tabs}
            />
          </div>
          <div className={css`flex-grow: 1; position: relative; z-index: 1;`}>
            {children}
          </div>
        </div>
      </motion.div>
    </main>
  );
};
