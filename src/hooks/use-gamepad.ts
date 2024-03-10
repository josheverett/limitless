'use client';

import { useEffect, useRef, Touch } from 'react';
import { GAMEPAD_INPUT_KEYS, GAMEPAD_INPUTS, KEYBOARD_INPUTS } from '@/types/input';

// TODO: This whole file has become a monolith and needs to be refactored in
// a number of ways lol.

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
// TODO: Use <T>
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

  // Note that it is correct that none of these listeners (including keydown)
  // get unbound/removed. This gamepad nonsense is an app-lifetime singleton.
  // TODO: Refactor this shit so that calling useInput does the lazy init.
  const init = async () => {
    for (const eventType of Object.values(GAMEPAD_INPUTS)) {
      before(eventType, delegateGamepadEvent('before', eventType));
      on(eventType, delegateGamepadEvent('on', eventType));
      after(eventType, delegateGamepadEvent('after', eventType));
    }

    // This lets us handle keyboard keys while hitting the same useInput
    // callbacks you've defined for each button.
    // TODO: This doesn't handle hold. Can get away with that for this project,
    // but not for open source version. Needs an event loop like the native
    // controller APIs. Forking the TS version of gpjs seems like the way to
    // go, so we can use the same event loop. Forking is only a consideration
    // because the js version was abandoned and the ts fork author didn't
    // responsd to a message about pull requests.
    document.addEventListener('keydown', (e) => {
      const gamepadInputs = KEYBOARD_INPUTS[e.key];
      if (!gamepadInputs) return;
      // e.location only used for shift key in this project but can be used
      // for any left+right keys such as ctrl/cmd/etc.
      const gamepadInput = gamepadInputs[e.location];
      if (!gamepadInput) return;
      const gcjsGamepadEvent = GAMEPAD_INPUTS[gamepadInput];
      const pressHandler = delegateGamepadEvent('before', gcjsGamepadEvent);
      const releaseHandler = delegateGamepadEvent('after', gcjsGamepadEvent);
      pressHandler();
      releaseHandler();
    });
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
  // TODO: Use <T>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  callback: (...args: any) => void;
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

export type InputDirection = 'U' | 'D' | 'L' | 'R';
export type TouchDirection = InputDirection | 'MOVE';

type UseDirectionalInputsHelperProps = {
  portal?: string;
  input: GAMEPAD_INPUT_KEYS;
  direction: InputDirection;
  directions: InputDirection[];
  callback: (direction: InputDirection) => void;
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

type TouchDeltas = {
  x: number;
  y: number;
};

type UseDirectionalInputsProps = {
  portal?: string;
  directions?: InputDirection[];
  callback: (direction: InputDirection) => void;
  // touch controls should only be used for components that overflow.
  // Only supports one finger. :P
  touchCallback?: (direction: TouchDirection, deltas: TouchDeltas, touch: Touch) => void;
};

type DirectionalInputMap = [InputDirection, GAMEPAD_INPUT_KEYS];

const DIRECTIONAL_INPUTS: DirectionalInputMap[] = [
  ['U', 'RIGHT_STICK_UP'],
  ['D', 'RIGHT_STICK_DOWN'],
  ['L', 'RIGHT_STICK_LEFT'],
  ['R', 'RIGHT_STICK_RIGHT'],
  ['U', 'DPAD_UP'],
  ['D', 'DPAD_DOWN'],
  ['L', 'DPAD_LEFT'],
  ['R', 'DPAD_RIGHT'],
];

// useDirectionalInputs is a convenience hook for up/down/left/right inputs
// for both the left analog stick and the dpad, and optionally touch.

export const useDirectionalInputs = <T extends HTMLElement = HTMLElement>({
  portal,
  directions = ['U', 'D', 'L', 'R'],
  callback,
  touchCallback,
}: UseDirectionalInputsProps) => {
  for (const [direction, input] of DIRECTIONAL_INPUTS) {
    _useDirectionalInputsHelper(
      { portal, input, direction, directions, callback }
    );
  }

  const touchRef = useRef<T>(null);
  // These use refs for perf.
  const startTouchX = useRef(0);
  const startTouchY = useRef(0);

  // TODO: There is a major bug here where startTouchX and startTouchY always
  // reset to 0 when a a new touch starts/moves. For the life of me I can't
  // figure it out where it comes from. :(
  useEffect(() => {
    const touchEl = touchRef.current;
    if (!touchEl || !touchCallback) return;
    // This line is suuuper important for perf. :)
    touchRef.current.style.willChange = 'transform';

    const handleTouchStart = (e: TouchEvent) => {
      startTouchX.current = e.touches[0].clientX;
      startTouchY.current = e.touches[0].clientY;
    };

    // const handleTouchEnd = (e: TouchEvent) => {
    //   console.log('DERP TOUCH END');
    // };

    // if it's stupid and it works...
    const handleTouchMove = (e: TouchEvent) => {
      if (!startTouchX.current || !startTouchY.current) return;

      const endTouch = e.changedTouches[0];
      const deltas = {
        x: endTouch.clientX - startTouchX.current,
        y: endTouch.clientY - startTouchY.current,
      };

      let direction: TouchDirection;
      const isHorizonal = Math.abs(deltas.x) > Math.abs(deltas.y);
      if (isHorizonal) direction = deltas.x < 0 ? 'L' : 'R';
      else direction = deltas.y < 0 ? 'U' : 'D';

      touchCallback(direction, deltas, endTouch);
    };

    touchEl.addEventListener('touchstart', handleTouchStart);
    // touchEl.addEventListener('touchend', handleTouchEnd);
    touchEl.addEventListener('touchmove', handleTouchMove);

    return () => {
      touchEl.removeEventListener('touchstart', handleTouchStart);
      // touchEl.removeEventListener('touchend', handleTouchEnd);
      touchEl.removeEventListener('touchmove', handleTouchMove);
    };
  }, [touchCallback]);

  return { touchRef };
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
const PORTAL_HISTORY: string[] = [];

// lol "router"
export const portalRouter = {
  push: (portal: string) => {
    document.body.dataset.activePortal = portal;
    PORTAL_HISTORY.unshift(portal);
  },
  replace: (portal: string) => {
    document.body.dataset.activePortal = portal;
    PORTAL_HISTORY[0] = portal;
  },
};

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
export const useInputPortal = <T extends HTMLElement = HTMLDivElement>({
  name = '',
  defaultFocusRef,
}: UseInputPortalProps) => {
  const focusContainerRef = useRef<T>(null);

  const defaultFocusRef_ = useRef<HTMLAnchorElement>(null);
  const ref = defaultFocusRef || defaultFocusRef_;

  useEffect(() => {
    if (!ref.current) return;
    PORTAL_TARGET_REGISTRY[name] = ref.current;
  });

  useEffect(() => {
    if (!focusContainerRef.current) return;
    const current = focusContainerRef.current;
    // TODO: Refactor this bit to use the history stack.
    const setActivePortal = () => document.body.dataset.activePortal = name;
    current.addEventListener('focusin', setActivePortal);
    return () => current.removeEventListener('focusin', setActivePortal);
  }, [name]);

  const teleport = (portal: string) => {
    const el = PORTAL_TARGET_REGISTRY[portal];
    if (!el) return;
    portalRouter.push(portal);
    el.focus();
  };

  return {
    defaultFocusRef: ref,
    focusContainerRef,
    teleport,
    // There's no use case for forward() ...I think?
    back: () => teleport(PORTAL_HISTORY[1]),
  };
};
