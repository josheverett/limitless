'use client';

import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import cx from 'classnames';
import { use4k } from '@/hooks/use-4k';
import { TextOffset } from '@/components/text';
import { InputButton } from '@/components/input-button';
import { Teko_2_3_Wide_Light } from '@/app/styles/fonts';

type Tab = {
  title: string;
  href: string;
};

type TabsProps = {
  className?: string;
  tabs: Tab[];
};

export const Tabs = ({ className, tabs }: TabsProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const _4k = use4k();

  const nextTab = () => {
    const currentIndex = tabs.findIndex((tab) => tab.href === pathname);
    const newIndex = currentIndex >= tabs.length - 1 ? 0 : currentIndex + 1;
    const { href } = tabs[newIndex];
    router.push(href);
  }

  const previousTab = () => {
    const currentIndex = tabs.findIndex((tab) => tab.href === pathname);
    const newIndex = currentIndex <= 0 ? tabs.length - 1 : currentIndex - 1;
    const { href } = tabs[newIndex];
    router.push(href);
  }

  return (
    <div className={cx('relative flex items-center', className)} style={_4k({
      gap: '1.759vh',
      height: '3.889vh',
      marginLeft: '-5.463vh', // button width + gap
    })}>
      <InputButton
        input="LB"
        callback={previousTab}
        style={_4k({
          width: '3.704vh',
          height: '1.944vh',
        })}
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
                  outlineWidth: isSelected ? '0.37vh' : '0.185vh',
                  ...Teko_2_3_Wide_Light,
                })}
              >
                <TextOffset smush top="0.15vh">{tab.title.toUpperCase()}</TextOffset>
              </Link>
            </li>
          );
        })}
      </ul>
      <InputButton
        input="RB"
        callback={nextTab}
        style={_4k({ width: '3.704vh', height: '1.944vh' })}
      />
    </div>
  );
};
