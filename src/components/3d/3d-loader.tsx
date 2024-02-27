import { useEffect, useState, useRef } from 'react';

type LoaderProps = {
  active: boolean;
  loaded: number;
  total: number;
  children: React.ReactNode;
};

// These useProgress() props have to be passed in, as useProgress must be
// used in the same **file** as the threejs scene or things can get weird.
// Scope issues or whatever, something I need to better understand.
export const Loader = ({
  active,
  loaded,
  total,
  children,
}: LoaderProps) => {
  const [isLoaded, setisLoaded] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  if (!isLoaded && !active && loaded === total) setisLoaded(true);

  // This works around an issue with the threejs scene only fading in
  // on its first load.
  // UPDATE: After splitting out this component into its own file, the bug
  // took the opposite form -- only fading if it's not the first load. lol
  useEffect(() => {
    if (!isLoaded) return;
    setTimeout(() => {
      if (ref.current) ref.current.style.opacity = '1';
    }, 200);
  }, [isLoaded]);

  return (
    <div
      ref={ref}
      style={{
        width: '100%',
        height: '100%',
        opacity: 0,
        transition: '500ms opacity ease-out',
      }}
    >
      {children}
    </div>
  );
};
