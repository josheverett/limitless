'use client';

import { usePathname } from 'next/navigation';
import { TabbedPage } from '@/layouts/tabbed-page';

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
    </TabbedPage>
  );
};
