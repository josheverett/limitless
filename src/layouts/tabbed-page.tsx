import { cx } from '@emotion/css';
import { motion } from 'framer-motion';
import { use4k } from '@/hooks/use-4k';
import { PortalTarget } from '@/hooks/use-gamepad';
import { Tabs, Tab_Type } from '@/components/tabs';
import { Footer } from '@/components/footer/footer';
import { getFontVariant } from '@/app/styles/fonts';

type TabbedPageProps = {
  tabs: Tab_Type[];
  portal: string; // Name of the input portal for these tabs.
  // This is required even when false because it's important to have only
  // one <main> element with hidden=false at a time. Safety belt.
  portalTargets: PortalTarget[];
  hidden: boolean;
  children: React.ReactNode;
};

export const TabbedPage = ({
  tabs,
  portal,
  portalTargets,
  hidden,
  children,
}: TabbedPageProps) => {
  const css = use4k();

  return (
    // Notice how the FM div doesn't wrap main. That's intentional. This was
    // also just me making sure the thing works, it's just a POC. Temporary.
    <main
      hidden={hidden}
      className={cx(getFontVariant(css, 'teko'))}
    >
      <motion.div
        className={css`height: 100%; width: 100%;`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {/* vw is correct for padding left/right below. */}
        <div className={css`
          height: 100%;
          padding-left: 5.208vw;
          padding-right: 5.208vw;
          padding-top: 6.111vh;
        `}>
          <Tabs
            portal={portal}
            portalTargets={portalTargets}
            tabs={tabs}
          />
          {children}
        </div>
        <Footer />
      </motion.div>
    </main>
  );
};
