import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { portalRouter } from '@/hooks/use-gamepad';

// This hooks allows you to choose an element that should be focused by
// default when navigating to a given route. There should only ever be
// one component that uses this hook per route.

// TODO: For the open source hooks, anywhere we're using HTMLAnchorElement
// needs to instead be <T> so the implementor sets the type. Why?
// 1. Random things can be made focusable with tabindex.
// 2. It's important that these hooks let you instrument an existing react
//    app as-is. Having to wrap everything in links is an absurd ask.
//    This way people can just add tabindex=-1 to whatever divs they already
//    have and call it a day.
export const useNavigationFocus = (
  pathname?: string, // Pathname of route el should be focused for.
  portal?: string, // Name of portal this input belongs to.
) => {
  const ref = useRef<HTMLAnchorElement>(null);
  const nextPathname = usePathname();

  useEffect(() => {
    if (!pathname || !portal) return;
    if (!ref.current) return;
    if (nextPathname !== pathname) return;
    portalRouter.replace(portal);
    ref.current.focus();
  }, [portal, pathname, nextPathname, ref]);

  return ref;
};
