'use client';

import { usePathname } from 'next/navigation'
import Link from 'next/link';
import { use4k } from '@/hooks/use-4k';
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
    <div className="flex items-center" style={_4k({
      gap: '1.759vh',
      height: '3.889vh',
    })}>
      <div>
        <InputButton
          input="LB"
          callback={() => {
            console.log('DERP LB PRESSED!');
          }}
          style={_4k({ width: '3vh', height: '3vh' })}
        />
      </div>
      <ul className="flex items-center h-full" style={_4k({ gap: '1.296vh' })}>
        {tabs.map((tab) => {
          const isSelected = tab.href === pathname;
          return (
            <li
              key={tab.title}
              className="flex items-center h-full outline outline-halo-white"
              style={_4k({
                minWidth: '19.444vh',
                paddingLeft: '1.944vh',
                paddingRight: '1.944vh',
                outlineWidth: isSelected ? '0.37vh' : '0.185vh',
              })}
            >
              <Link href={tab.href}>
                {tab.title.toUpperCase()}
                {/* TODO: determine selected index by route. */}
                {/* {i === selectedIndex && '(selected)'} */}
              </Link>
            </li>
          );
        })}
      </ul>
      <div>
        <InputButton
          input="RB"
          callback={() => {
            console.log('DERP RB PRESSED!');
          }}
          style={_4k({ width: '3vh', height: '3vh' })}
        />
      </div>
    </div>
  );
};
