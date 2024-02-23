'use client';

import { useGamepad, useInput } from '@/hooks/use-gamepad';

// This file only exists to avoid having `use client` in the root layout.
// I actually have no idea if that matters I don't know what I'm doing.
// That said, this hook (not this component, but the hook) can be used
// in general to do whatever you want with the gamepad, like making it
// vibrate and shit lmao.

// Update: Okay now it also exists to globally wire the A button
// to click whatever the currently focused element is. lmao

export const Gamepad = () => {
  useGamepad();

  useInput({
    input: 'A', state: 'press', callback: () => {
      const activeLink = document.activeElement as HTMLElement;
      activeLink?.click();
    },
  });

  return null;
};
