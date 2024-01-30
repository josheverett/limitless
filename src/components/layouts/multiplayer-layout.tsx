import React from 'react';
import { Tabs } from '@/components/tabs';

type MultiplayerLayoutProps = {
  children: React.ReactNode;
};

export const MultiplayerLayout = ({ children }: MultiplayerLayoutProps) => {
  const tabs = [
    { title: 'Play', href: '/multiplayer/play' },
    { title: 'Customize', href: '/multiplayer/customize' },
    { title: 'Community', href: '/multiplayer/community' },
    { title: 'Shop', href: '/multiplayer/shop' },
  ];

  return (
    <>
      <Tabs tabs={tabs}></Tabs>
      <div>tab content start</div>
      {children}
      <div>tab content end</div>
      <div>footer</div>
    </>
  );
};
