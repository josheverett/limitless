import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation'

export const useDefaultFocus = (
  pathname?: string, // Pathname of route el should be focused for.
  portal?: string, // Name of portal this input belongs to.
) => {
  const ref = useRef<HTMLAnchorElement>(null);
  const nextPathname = usePathname();

  useEffect(() => {
    if (!pathname || !portal) return;
    if (!ref.current) return;
    if (nextPathname !== pathname) return;
    // There's an argument for this to be in use-gamepad just because of this.
    document.body.dataset.activePortal = portal;
    ref.current.focus();
  }, [nextPathname, ref.current]);

  return ref;
};
