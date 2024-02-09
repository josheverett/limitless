'use client';

import { usePathname } from 'next/navigation';
import { use4k } from '@/hooks/use-4k';
import { TabbedPage } from '@/layouts/tabbed-page';
import { Footer } from '@/components/footer/footer';

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
    <TabbedPage
      portal="MultiplayerAppTabs"
      portalTargets={[
        { pathname: '/multiplayer/play', target: 'PlayTabCarousel' }
      ]}
      tabs={TABS}
      hidden={!pathname.startsWith('/multiplayer')}
    >
      {children}
      <Footer className={css`z-index: 1;`} />
    </TabbedPage>
  );
};
