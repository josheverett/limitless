import Link from 'next/link';

type Tab = {
  title: string;
  href: string;
};

type TabsProps = {
  tabs: Tab[];
};

export const Tabs = ({ tabs }: TabsProps) => {
  return (
    <ul>
      {tabs.map((tab, i) => {
        return (
          <li key={tab.title}>
            <Link href={tab.href}>
              {tab.title.toUpperCase()}
              {/* TODO: determine selected index by route. */}
              {/* {i === selectedIndex && '(selected)'} */}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};
