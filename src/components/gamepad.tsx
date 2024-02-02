'use client';

import { useEffect } from 'react';
import { GAMEPAD_INPUTS } from '@/types/input';
import { useGamepad } from '@/hooks/use-gamepad';

// Realizing now I don't need this file lmao. Just need the hook in
// whatever component has buttons and stuff.

export const Gamepad = () => {
  const gamepad = useGamepad();

  useEffect(() => {
    gamepad.before(GAMEPAD_INPUTS.A, () => {
      console.log('DERP A');
    });
  }, [gamepad]);

  return <div />;
};
