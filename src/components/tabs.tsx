'use client';

import { usePathname } from 'next/navigation'
import Link from 'next/link';
import cx from 'classnames';
import { use4k } from '@/hooks/use-4k';
import { TextOffset } from '@/components/text';
import { InputButton } from '@/components/input-button';

type Tab = {
  title: string;
  href: string;
};

type TabsProps = {
  tabs: Tab[];
};

export const Tabs = ({ tabs }: TabsProps) => {
  const pathname = usePathname();
  const _4k = use4k();

  return (
    // TODO: positioning stuff is temporary while building this
    <div className="m-10 flex items-center" style={_4k({
      gap: '1.759vh',
      height: '3.889vh',
    })}>
      <InputButton
        input="LB"
        callback={() => {
          console.log('DERP LB PRESSED!');
        }}
        style={_4k({ width: '3.704vh', height: '1.944vh' })}
      />
      <ul className="flex items-center h-full" style={_4k({ gap: '1.296vh' })}>
        {tabs.map((tab) => {
          const isSelected = tab.href === pathname;
          return (
            <li className="h-full" key={tab.title}>
              <Link
                href={tab.href}
                className={
                  cx('flex items-center h-full font-medium outline', {
                    'text-halo-white': isSelected,
                    'text-halo-offwhite': !isSelected,
                    'outline-halo-white': isSelected,
                    'outline-halo-offwhite': !isSelected,
                  })
                }
                style={_4k({
                  minWidth: '19.444vh',
                  paddingLeft: '1.944vh',
                  paddingRight: '1.944vh',
                  fontSize: '2.3vh',
                  letterSpacing: '0.5vh',
                  outlineWidth: isSelected ? '0.37vh' : '0.185vh',
                })}
              >
                <TextOffset top="0.1vh">{tab.title.toUpperCase()}</TextOffset>
              </Link>
            </li>
          );
        })}
      </ul>
      <InputButton
        input="RB"
        callback={() => {
          console.log('DERP RB PRESSED!');
        }}
        style={_4k({ width: '3.704vh', height: '1.944vh' })}
      />
    </div>
  );
};
