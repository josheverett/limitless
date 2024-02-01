'use client';

import { useEffect } from 'react';
import { GAMEPAD_INPUTS } from '@/types/input';
import { useGamepad } from '@/hooks/use-gamepad';

// Realizing now I don't need this file lmao. Just need the hook in
// whatever component has buttons and stuff.

export const Gamepad = () => {
  const { getGameControl } = useGamepad();

  useEffect(() => {
    const derp = async () => {
      const gameControl = await getGameControl();
      console.log('gameControl', gameControl);
      gameControl.on('connect', () => {
        const gamepad = gameControl.getGamepad(0);
        gamepad.before(GAMEPAD_INPUTS.A, () => {
          console.log('A BUTTON LIKE WHAT');
        });
      });
    };

    derp();
  }, [getGameControl]);

  return <div />;
};
