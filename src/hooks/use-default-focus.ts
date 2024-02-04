import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation'

export const useDefaultFocus = (
  enabled: boolean,
  pathname?: string, // Pathname of route el should be focused for.
) => {
  const ref = useRef<HTMLAnchorElement>(null);
  const nextPathname = usePathname();

  useEffect(() => {
    if (!enabled) return;
    if (!ref.current) return;
    if (nextPathname !== pathname) return;
    ref.current.focus();
  }, [nextPathname, ref.current]);

  return ref;
};
