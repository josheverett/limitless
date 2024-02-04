'use client';

import { useEffect } from 'react';
import { GAMEPAD_INPUT_KEYS, GAMEPAD_INPUTS } from '@/types/input';

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
      gameControl.on('disconnect', () => window.__ON_GAMEPAD_READY = undefined);
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
export type UseInputState = 'press' | 'hold' | 'release';

const STATE_MAP: { [key in UseInputState]: gcjsStateMethod } = {
  press: 'before',
  hold: 'on',
  release: 'after',
};

// TODO: Need to add component focus concept.

export const useInput = (
  enabled: boolean,
  input: GAMEPAD_INPUT_KEYS,
  state: UseInputState,
  callback: (...args: any) => any
) => {
  const gamepad = useGamepad();
  const method = STATE_MAP[state];
  const eventType = GAMEPAD_INPUTS[input];

  useEffect(() => {
    if (!enabled) return;
    gamepad[method](eventType, callback);
    return () => {
      gamepad.off(eventType);
    }
  }, [enabled, input, gamepad, method, eventType, callback]);
};

// useDirectionalInputs is a convenience hook for up/down/left/right inputs
// for both the left analog stick and the dpad.

export type InputDirection = 'U' | 'D' | 'L' | 'R';

const _useDirectionalInputsHelper = (
  enabled: boolean,
  input: GAMEPAD_INPUT_KEYS,
  direction: InputDirection,
  directions: InputDirection[],
  callback: (direction: InputDirection) => any
) => {
  return useInput(enabled, input, 'press', () => {
    if (directions.includes(direction)) callback(direction);
  });
};

export const useDirectionalInputs = (
  enabled: boolean,
  directions: InputDirection[],
  callback: (direction: InputDirection) => any
) => {
  // TODO: Consider wiring up keyboard arrow keys as well.
  _useDirectionalInputsHelper(enabled, 'DPAD_UP', 'U', directions, callback);
  _useDirectionalInputsHelper(enabled, 'DPAD_DOWN', 'D', directions, callback);
  _useDirectionalInputsHelper(enabled, 'DPAD_LEFT', 'L', directions, callback);
  _useDirectionalInputsHelper(enabled, 'DPAD_RIGHT', 'R', directions, callback);
  _useDirectionalInputsHelper(enabled, 'LEFT_STICK_UP', 'U', directions, callback);
  _useDirectionalInputsHelper(enabled, 'LEFT_STICK_DOWN', 'D', directions, callback);
  _useDirectionalInputsHelper(enabled, 'LEFT_STICK_LEFT', 'L', directions, callback);
  _useDirectionalInputsHelper(enabled, 'LEFT_STICK_RIGHT', 'R', directions, callback);
};

// Say you have 3 components side by side to each other.
// You want to make sure that, when navigating with the controller,
// navigating beyond the "edge" of the current component (left or right
// in this example) causes the controller focus to "warp" to a
// sibling component.
// Any components anywhere can be linked via input portals.

export type InputPortal = {
  target: string; // "to" portal
  direction: InputDirection, // "target is R of name" etc.
};

// TODO: I think I can replace this with a useEffect on ref.current,
// where if defined it sets data attrs. hmm. See how it goes.

// 'name:target:direction' --> ref
const PORTAL_REGISTRY: { [key: string]: React.RefObject<HTMLAnchorElement> } = {};

export const useInputPortal = (
  enabled: boolean,
  name = '', // "from" portal
  portals: InputPortal[],
  defaultFocusRef: React.RefObject<HTMLAnchorElement>,
) => {
  for (const portal of portals) {
    // ok to clobber here, don't care what was there before.
    if (enabled && !!name) PORTAL_REGISTRY[name] = defaultFocusRef;
    else if (!!name) delete PORTAL_REGISTRY[name];
  }

  return {
    teleport: (portal: InputPortal) => {
      if (!enabled) return;
      const ref = PORTAL_REGISTRY[portal.target];
      if (!ref?.current) return;
      ref.current.focus();
    },
  };
};
