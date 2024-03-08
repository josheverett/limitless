'use client';

import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { use4k } from '@/hooks/use-4k';
import { TabbedPage } from '@/layouts/tabbed-page';
import { Footer } from '@/components/footer/footer';
import { MultiplayerBackground } from '@/components/multiplayer/multiplayer-background';

type MultiplayerLayoutProps = {
  children: React.ReactNode;
};

const TABS = [
  { title: 'Play', href: '/multiplayer/play' },
  { title: 'Customize', href: '/multiplayer/customize' },
  { title: 'Community', href: '/multiplayer/community' },
  { title: 'Shop', href: '/multiplayer/shop' },
];

export default function MultiplayerLayout({ children }: MultiplayerLayoutProps) {
  const pathname = usePathname();
  const css = use4k();

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <MultiplayerBackground />
      <div className={css`
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100vh;
      `}>
        <TabbedPage
          portal="MultiplayerAppTabs"
          tabs={TABS}
          // TODO: Wait, why was this needed? In what scenario are we
          // rendering this component outside of multiplayer routes??
          hidden={!pathname.startsWith('/multiplayer')}
        >
          {children}
          <Footer className={css`z-index: 1;`} />
        </TabbedPage>
      </div>
    </motion.div>
  );
};
