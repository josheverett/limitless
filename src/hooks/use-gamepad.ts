'use client';

import { useEffect, useRef } from 'react';
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
// update: I bet I can just cache bust...


export const useInput = (
  enabled: boolean,
  input: GAMEPAD_INPUT_KEYS,
  state: UseInputState,
  callback: (...args: any) => any
) => {
  // const focusContainerRef = useRef<HTMLElement>(null);

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

  // return focusContainerRef;
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

export const useInputPortal = (
  enabled: boolean,
  name = '', // "from" portal
  defaultFocusRef: React.RefObject<HTMLAnchorElement>,
) => {
  useEffect(() => {
    if (!defaultFocusRef.current) return;
    defaultFocusRef.current.dataset.portalTarget = name;
  }, [defaultFocusRef.current]);

  return {
    teleport: (portal: InputPortal) => {
      if (!enabled) return;
      const selector = `[data-portal-target="${portal.target}"]`;
      const el = document.querySelector<HTMLAnchorElement>(selector);
      if (!el) return;
      el.focus();
    },
  };
};
