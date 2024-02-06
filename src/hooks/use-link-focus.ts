import { useState, useRef, useEffect } from 'react';
import { useInput } from '@/hooks/use-gamepad';

type UseLinkFocusProps = {
  ref?: React.RefObject<HTMLAnchorElement>;
};

// This hook:
//
// 1. Focuses ref on mouse enter.
// 2. Toggles isFocused based on focus/blur events.
// 3. Wires up the A controller button (globally) to click the link.
//
// You can optionally pass in an existing ref, but you MUST use the
// returned ref within the component calling useLinkFocus(). Feels like
// you should just be able to use the original reference, and the fact
// that I don't understand why that fails (only in!) some cases shows
// that I don't fully grok what's going on under the hood.
//
// That said, the problems that I encountered when using the original
// reference were of the variety I saw before that were fixed via nuking
// yarn.lock and/or rerunning yarn, and I didn't fully investigate. So
// who knows. ndb either way.

export const useLinkFocus = ({
  ref,
}: UseLinkFocusProps = {}) => {
  const [isFocused, setIsFocused] = useState(false);
  const ref_ = useRef<HTMLAnchorElement>(null);
  const linkRef = ref || ref_;

  useEffect(() => {
    const handleFocus = () => setIsFocused(true);
    const handleBlur = () => setIsFocused(false);
    const handleMouseEnter = (e: MouseEvent) => {
      const el = e.currentTarget as HTMLAnchorElement; // :\
      el.focus();
    };

    linkRef.current?.addEventListener('focus', handleFocus);
    linkRef.current?.addEventListener('blur', handleBlur);
    linkRef.current?.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      linkRef.current?.removeEventListener('focus', handleFocus);
      linkRef.current?.removeEventListener('blur', handleBlur);
      linkRef.current?.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [linkRef.current]);

  return {
    ref: linkRef,
    isFocused,
  };
};
