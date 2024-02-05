import { useState, useRef, useEffect } from 'react';

type UseLinkFocusProps = {
  ref?: React.RefObject<HTMLAnchorElement>;
};

// This hook:
// 1. Focuses ref on mouse enter.
// 2. Toggles isFocused based on focus/blur events.

export const useLinkFocus = ({
  ref, // Using an existing ref is optional.
}: UseLinkFocusProps = {}) => {
  const [isFocused, setIsFocused] = useState(false);
  const ref_ = useRef<HTMLAnchorElement>(null);
  const linkRef = ref || ref_;

  useEffect(() => {
    const handleFocus = (e: FocusEvent) => setIsFocused(true);
    const handleBlur = (e: FocusEvent) => setIsFocused(false);
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
