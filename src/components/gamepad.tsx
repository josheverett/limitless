'use client';

import { useGamepad } from '@/hooks/use-gamepad';

// This file only exists to avoid having `use client` in the root layout.
// I actually have no idea if that matters I don't know what I'm doing.
// That said, this hook (not this component, but the hook) can be used
// in general to do whatever you want with the gamepad, like making it
// vibrate and shit lmao.

export const Gamepad = () => {
  useGamepad();
  return <></>;
};
