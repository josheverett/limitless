import { useEffect } from 'react';
import { usePathname } from 'next/navigation'

export const useDefaultFocus = (
  enabled: boolean,
  ref: React.RefObject<HTMLAnchorElement>,
  pathname?: string, // Pathname of route el should be focused for.
) => {
  const nextPathname = usePathname();

  useEffect(() => {
    if (!enabled) return;
    if (!ref.current) return;
    if (nextPathname !== pathname) return;
    ref.current.focus();
  }, [nextPathname, ref.current]);
};
