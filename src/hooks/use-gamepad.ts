'use client';

import { useEffect, useRef } from 'react';
import { GAMEPAD_INPUT_KEYS, GAMEPAD_INPUTS } from '@/types/input';

// These two types map to each other.
// I just prefer the terms press/hold/release. :)
type GcjsStateMethod = 'before' | 'on' | 'after';
export type UseInputState = 'press' | 'hold' | 'release';

const STATE_MAP: { [key in UseInputState]: GcjsStateMethod } = {
  press: 'before',
  hold: 'on',
  release: 'after',
};

// {
//   'before': () => { ... } // GcjsStateMethod --> callback
// }
// TODO: Use <T> instead of any. Figure out how to make that optional so it's
// <any> by default or otherwise inferred from what gets passed.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type InputEventStateHandlers = { [key in GcjsStateMethod]?: (...args: any) => any };

// {
//   'left0': { // GcjsGamepadEvent
//     'before': () => { ... } // GcjsStateMethod --> callback
//   }
// }
type InputEventHandlers = { [key in GcjsGamepadEvent]?: InputEventStateHandlers };

// {
//   'MyPortal': { // portal name
//     'left0': { // GcjsGamepadEvent
//       'before': () => { ... } // GcjsStateMethod --> callback
//     }
//   }
// }
type PortalHandlerRegistry = { [key: string]: InputEventHandlers };

// PORTAL_HANDLER_REGISTRY is where all the event handlers for
// portal-based inputs live.
const PORTAL_HANDLER_REGISTRY: PortalHandlerRegistry = {};

// GLOBAL_HANDLER_REGISTRY is where event handlers live for inputs
// without portal associations.
//
// Global handlers take precedence!
//
// This is by design to allow things like modals to temporarily override
// inputs on the screen behind them, shit like that. Those cases "just work"
// with this scheme.
const GLOBAL_HANDLER_REGISTRY: InputEventHandlers = {};

export const useGamepad = () => {
  const getGameControl = async () => {
    if (!window.gameControl) await import('gamecontroller.js');
    return window.gameControl;
  };

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

  const delegateGamepadEvent = (
    stateMethod: GcjsStateMethod,
    eventType: GcjsGamepadEvent
  ) => {
    return () => {
      const { activePortal } = document.body.dataset;

      // Prefer global handlers.
      let inputHandlers: InputEventHandlers | undefined =
          GLOBAL_HANDLER_REGISTRY;
      let stateHandlers: InputEventStateHandlers | undefined =
          inputHandlers[eventType];

      // Found global handlers!
      // Even if there's no handler for this state, we stop here. You're not
      // allowed to have different states for the same button handled globally
      // and via portals at the same time. That feels like the right thing
      // to do so I'm enforcing it here.
      if (stateHandlers) {
        stateHandlers[stateMethod]?.();
        return;
      }

      // If no global handlers, check currently active portal.
      if (!!activePortal) {
        inputHandlers = PORTAL_HANDLER_REGISTRY[activePortal];
        stateHandlers = inputHandlers[eventType];
        stateHandlers?.[stateMethod]?.();
        return;
      }

      // The end. Nothing handling this input event, carry on solider.
    };
  };

  // TODO: Refactor this shit so that calling useInput does the initialization
  // lazily (instead of calling the useGamepad hook at the app level).
  // Oh that actually should enable more things to be rendered on the server,
  // I hadn't considered that at all. But the important thing here is that
  // for an open source version, initialization MUST be lazy and triggered by
  // useInput, otherwise it's not a one-size-fits-all implementation for
  // every use case / framework / app.
  const init = async () => {
    for (const eventType of Object.values(GAMEPAD_INPUTS)) {
      before(eventType, delegateGamepadEvent('before', eventType));
      on(eventType, delegateGamepadEvent('on', eventType));
      after(eventType, delegateGamepadEvent('after', eventType));
    }
  };

  useEffect(() => {
    if (window.__ON_GAMEPAD_READY) return;

    window.__ON_GAMEPAD_READY = new Promise(async (resolve) => {
      const gameControl = await getGameControl();
      gameControl.on('connect', resolve);
      gameControl.on('disconnect', () => window.__ON_GAMEPAD_READY = undefined);
    });

    init();
  });

  // Most of this API doesn't make sense post-portals but might
  // as well keep it around whatevs.
  return {
    on,
    before,
    after,
    off,
    vibrate,
    set,
  };
};

type UseInputProps = {
  input: GAMEPAD_INPUT_KEYS;
  state: UseInputState;
  portal?: string; // name of input portal this input belongs to
  // TODO: Use <T> instead of any. Figure out how to make that optional so it's
  // <any> by default or otherwise inferred from what gets passed.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  callback: (...args: any) => any;
};

export const useInput = ({
  input,
  state,
  portal,
  callback,
}: UseInputProps) => {
  const eventType = GAMEPAD_INPUTS[input];
  const method = STATE_MAP[state];

  let inputHandlers: InputEventHandlers = GLOBAL_HANDLER_REGISTRY;

  if (portal) {
    // Lazy init portal InputEventHandlers.
    if (!PORTAL_HANDLER_REGISTRY[portal]) PORTAL_HANDLER_REGISTRY[portal] = {};
    // Use portal registry instead of global registry.
    inputHandlers = PORTAL_HANDLER_REGISTRY[portal];
  }

  // Lazy init InputEventStateHandlers.
  if (!inputHandlers[eventType]) inputHandlers[eventType] = {};

  const stateHandlers = inputHandlers[eventType] as InputEventStateHandlers; // :\
  stateHandlers[method] = callback;
};

// useDirectionalInputs is a convenience hook for up/down/left/right inputs
// for both the left analog stick and the dpad.

export type InputDirection = 'U' | 'D' | 'L' | 'R';

type UseDirectionalInputsHelperProps = {
  portal?: string;
  input: GAMEPAD_INPUT_KEYS;
  direction: InputDirection;
  directions: InputDirection[];
  // TODO: Use <T> instead of any. Figure out how to make that optional so it's
  // <any> by default or otherwise inferred from what gets passed.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  callback: (direction: InputDirection) => any;
};

const _useDirectionalInputsHelper = ({
  portal,
  input,
  direction,
  directions,
  callback,
}: UseDirectionalInputsHelperProps) => {
  return useInput({
    portal,
    input,
    state: 'press',
    callback: () => {
      if (directions.includes(direction)) callback(direction);
    },
  });
};

type UseDirectionalInputsProps = {
  portal?: string;
  directions?: InputDirection[];
  // TODO: Use <T> instead of any. Figure out how to make that optional so it's
  // <any> by default or otherwise inferred from what gets passed.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  callback: (direction: InputDirection) => any;
};

export const useDirectionalInputs = ({
  portal,
  directions = ['U', 'D', 'L', 'R'],
  callback,
}: UseDirectionalInputsProps) => {
  // TODO: Consider wiring up keyboard arrow keys as well.
  _useDirectionalInputsHelper({ portal, input: 'DPAD_UP', direction: 'U', directions, callback });
  _useDirectionalInputsHelper({ portal, input: 'DPAD_DOWN', direction: 'D', directions, callback });
  _useDirectionalInputsHelper({ portal, input: 'DPAD_LEFT', direction: 'L', directions, callback });
  _useDirectionalInputsHelper({ portal, input: 'DPAD_RIGHT', direction: 'R', directions, callback });
  _useDirectionalInputsHelper({ portal, input: 'LEFT_STICK_UP', direction: 'U', directions, callback });
  _useDirectionalInputsHelper({ portal, input: 'LEFT_STICK_DOWN', direction: 'D', directions, callback });
  _useDirectionalInputsHelper({ portal, input: 'LEFT_STICK_LEFT', direction: 'L', directions, callback });
  _useDirectionalInputsHelper({ portal, input: 'LEFT_STICK_RIGHT', direction: 'R', directions, callback });
};

// What are input portals?
//
// Say you have 3 components side by side to each other.
// You want to make sure that, when navigating with the controller,
// navigating beyond the "edge" of the current component (left or right
// in this example) causes the controller focus to "teleport" to a
// sibling component.
//
// Any components anywhere can be linked via input portals.
// They can even be nested or whatever the fuck.

// This type and the two functions beneath it are for components to
// standardize on how to work with portals in input event handlers.
export type PortalTarget = {
  // "to" portal
  target: string;
  // "target is R of name" etc. Tabs (others?) don't need this.
  direction?: InputDirection;
  // Tabs (others?) need to filter portal targets bby route.
  pathname?: string;
};

export const getTargetForDirection = (
  portalTargets: PortalTarget[],
  direction: InputDirection,
) => {
  return portalTargets.find((portal) => portal.direction === direction);
};

export const getTargetForRoute = (
  portalTargets: PortalTarget[],
  pathname: string,
  direction?: InputDirection,
) => {
  return portalTargets
    .filter((portal) => !direction || portal.direction === direction)
    .find((portal) => portal.pathname === pathname);
};

type UseInputPortalProps = {
  name?: string; // "from" portal
  defaultFocusRef?: React.RefObject<HTMLAnchorElement>,
};

// portal name --> teleport target ("landing zone")
const PORTAL_TARGET_REGISTRY: { [key: string]: HTMLAnchorElement } = {};

// name = portal name
//
// defaultFocusRef = element to focus on when portal receives focus.
// this ref is created for you if not provided.
//
// focusContainerRef = stick this ref on the portal's containing div to
// make sure the correct active portal gets set whenever an element within
// a portal gets focus. This is necessary to allow for simultaneous input
// control schemes. Like you could use keyboard navigation, a mouse, and a
// controller all at once lmao.
export const useInputPortal = ({
  name = '',
  defaultFocusRef,
}: UseInputPortalProps) => {
  const focusContainerRef = useRef<HTMLDivElement>(null);

  const defaultFocusRef_ = useRef<HTMLAnchorElement>(null);
  const ref = defaultFocusRef || defaultFocusRef_;

  useEffect(() => {
    if (!ref.current) return;
    PORTAL_TARGET_REGISTRY[name] = ref.current;
  });

  useEffect(() => {
    if (!focusContainerRef.current) return;
    const current = focusContainerRef.current;
    const setActivePortal = () => document.body.dataset.activePortal = name;
    current.addEventListener('focusin', setActivePortal);
    return () => current.removeEventListener('focusin', setActivePortal);
  // }, [name, focusContainerRef]);
  }, [name]);

  return {
    defaultFocusRef: ref,
    focusContainerRef,
    teleport: (portal: string) => {
      const el = PORTAL_TARGET_REGISTRY[portal];
      if (!el) return;
      // TODO: I'm 87% I did this because some CSS depended on it before the
      // animated/3d backgrounds got implemented. This needs to be refactored to
      // use a history stack instead. That will handle e.g. this play tab case:
      // 1. User has operations box focused.
      // 2. User presses up, now the tabs are focused.
      // 3. User presses down, but now the carousel is focused! Oh noes.
      // In the real thing, pressing down from the tabs goes back to whatever
      // you had focused before you pressed up. A history stack solves that.
      // In addition to teleport(), just expose back() and forward() methods.
      // I can't think of a use case for forward(), but just add it for
      // completeness, since these hooks will get open sourced.
      document.body.dataset.activePortal = portal;
      el.focus();
    },
  };
};
