'use client';

import { useEffect } from 'react';

export const useGamepad = () => {
  const getGameControl = async () => {
    if (!window.gameControl) await import('gamecontroller.js');
    return window.gameControl;
  };

  useEffect(() => {
    if (window.__ON_GAMEPAD_READY) return;
    window.__ON_GAMEPAD_READY = new Promise(async (resolve) => {
      const gameControl = await getGameControl();
      gameControl.on('connect', resolve);
    });
  }, []);

  const on = async (eventName: GcjsGamepadEvent, callback: () => void) => {
    await window.__ON_GAMEPAD_READY;
    window.gameControl.getGamepad(0).on(eventName, callback);
  };

  const before = async (eventName: GcjsGamepadEvent, callback: () => void) => {
    await window.__ON_GAMEPAD_READY;
    window.gameControl.getGamepad(0).before(eventName, callback);
  };

  const after = async (eventName: GcjsGamepadEvent, callback: () => void) => {
    await window.__ON_GAMEPAD_READY;
    window.gameControl.getGamepad(0).after(eventName, callback);
  };

  const off = async (eventName: GcjsGamepadEvent) => {
    await window.__ON_GAMEPAD_READY;
    window.gameControl.getGamepad(0).off(eventName);
  };

  const vibrate = async (intensity: number, duration: number) => {
    await window.__ON_GAMEPAD_READY;
    window.gameControl.getGamepad(0).vibrate(intensity, duration);
  };

  const set = async (property: 'axeThreshold', value: number) => {
    await window.__ON_GAMEPAD_READY;
    window.gameControl.getGamepad(0).set(property, value);
  };

  return {
    on,
    before,
    after,
    off,
    vibrate,
    set,
  };
};

type gcjsStateMethod = 'before' | 'on' | 'after';
type UseInputState = 'press' | 'hold' | 'release';

const STATE_MAP: { [key in UseInputState]: gcjsStateMethod } = {
  press: 'before',
  hold: 'on',
  release: 'after',
};

export const useInput = (
  input: GcjsGamepadEvent,
  state: UseInputState,
  callback: () => any
) => {
  const gamepad = useGamepad();
  const method = STATE_MAP[state];

  useEffect(() => {
    gamepad[method](input, callback);
    return () => {
      gamepad.off(input);
    }
  }, [input, gamepad, method, callback]);
};
