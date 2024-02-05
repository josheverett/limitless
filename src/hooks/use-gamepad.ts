'use client';

import { useEffect } from 'react';
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

// What are input portals?
//
// Say you have 3 components side by side to each other.
// You want to make sure that, when navigating with the controller,
// navigating beyond the "edge" of the current component (left or right
// in this example) causes the controller focus to "teleport" to a
// sibling component.
// Any components anywhere can be linked via input portals.

// I'm still unclear on how (after I do this portal delegation thing) to
// handle inputs like those in the footer
// that don't require portals, unless I just allow them to delegate
// directly to `gamepad` (like how useInput does currently)?

export type InputPortal = {
  target: string; // "to" portal
  direction: InputDirection, // "target is R of name" etc.
};

// 'before': () => { ... } // GcjsStateMethod --> callback
type InputEventStateHandlers = { [key in GcjsStateMethod]?: (...args: any) => any };

// 'left0': { // GcjsGamepadEvent
//   'before': () => { ... } // GcjsStateMethod --> callback
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

      // If no global handlers, check currently active portal.
      if (!!activePortal && !inputHandlers) {
        inputHandlers = PORTAL_HANDLER_REGISTRY[activePortal];
      }

      const stateHandlers = inputHandlers[eventType];
      if (!stateHandlers?.[stateMethod]) {
        console.log(
          `DERP delegateGamepadEvent NO "${stateMethod}" HANDLER FOR`,
          eventType
        );
        return;
      }

      console.log(
        `DERP delegateGamepadEvent FOUND !!! "${stateMethod}" HANDLER FOR`,
        eventType
      );

      stateHandlers?.[stateMethod]?.();
    };
  };

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
  }, []);

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

// TODO: Need to add component focus concept.
// update: I bet I can just cache bust...

// Left off here. Dunno what focusContainerRef was about.
// I mean it was about anti-input clobbering but yeah.
// I think there's a way to keep this dumb, without needing a
// singleton brain that delegates. Whenever a child of a focus
// container receives focus(in), the idea is to then select the
// default focus target for that container.
// A focus container will often (usually? always?) be 1:1 with a portal.
// Yeah I think these might be 1:1, in which case useInputPortal needs
// to play a role.

// The above doesn't handle rewiring controls..
// I think I can just cache bust the useInput hooks, no?
// OH WAIT THIS IS WHY I ADDED THE ENABLED PRPERTY!
// That should cache bust because only one will have it.
// But maybe race conditions? Like anyone calling off() would
// clobber too. Hmm.

// take 3: okay what if I use a registry of input portals. :o
// on/off never happens, only delegates to registry.
// hmmm.

// How about...
// 1. useInputPortal returns some reference.
// 2. You (optonally) pass that to useInput.
// 3. In useInput, the input gets added to the registery for that portal.
// 4. In useGampad, on/off always checks the registry for the current portal.
// 5. Registry entries can clobber each other, no worries there.

type UseInputProps = {
  // enabled: boolean;
  input: GAMEPAD_INPUT_KEYS;
  state: UseInputState;
  portal?: string; // name of input portal this input belongs to
  callback: (...args: any) => any;
};

export const useInput = ({
  // enabled,
  input,
  state,
  portal,
  callback,
}: UseInputProps) => {
  const eventType = GAMEPAD_INPUTS[input];
  const method = STATE_MAP[state];

  let inputHandlers: InputEventHandlers = GLOBAL_HANDLER_REGISTRY;
  let stateHandlers: InputEventStateHandlers;

  if (portal) {
    // Lazy init portal InputEventHandlers.
    if (!PORTAL_HANDLER_REGISTRY[portal]) PORTAL_HANDLER_REGISTRY[portal] = {};
    // Use portal registry instead of global registry.
    inputHandlers = PORTAL_HANDLER_REGISTRY[portal];
  }

  // Lazy init InputEventStateHandlers.
  if (!inputHandlers[eventType]) inputHandlers[eventType] = {};
  stateHandlers = inputHandlers[eventType] as InputEventStateHandlers; // :\

  stateHandlers[method] = callback;
};

// export const useInput = ({
//   enabled,
//   input,
//   state,
//   portal,
//   callback,
// }: UseInputProps) => {
//   const gamepad = useGamepad();
//   const method = STATE_MAP[state];
//   const eventType = GAMEPAD_INPUTS[input];

//   // If there's a portal, we want to stick the handler in the event

//   useEffect(() => {
//     if (!enabled) return;
//     gamepad[method](eventType, callback);
//     return () => {
//       gamepad.off(eventType);
//     };
//   }, [enabled, input, gamepad, method, eventType, callback]);
// };

// useDirectionalInputs is a convenience hook for up/down/left/right inputs
// for both the left analog stick and the dpad.

export type InputDirection = 'U' | 'D' | 'L' | 'R';

type UseDirectionalInputsHelperProps = {
  enabled: boolean;
  input: GAMEPAD_INPUT_KEYS;
  direction: InputDirection;
  directions: InputDirection[];
  callback: (direction: InputDirection) => any;
};

const _useDirectionalInputsHelper = ({
  enabled,
  input,
  direction,
  directions,
  callback,
}: UseDirectionalInputsHelperProps) => {
  return useInput({
    // enabled,
    input,
    state: 'press',
    callback: () => {
      if (directions.includes(direction)) callback(direction);
    }
  });
};

type UseDirectionalInputsProps = {
  enabled: boolean;
  directions?: InputDirection[];
  callback: (direction: InputDirection) => any;
};

export const useDirectionalInputs = ({
  enabled,
  directions = ['U', 'D', 'L', 'R'],
  callback,
}: UseDirectionalInputsProps) => {
  // TODO: Consider wiring up keyboard arrow keys as well.
  _useDirectionalInputsHelper({
    enabled, input: 'DPAD_UP', direction: 'U', directions, callback
  });
  _useDirectionalInputsHelper({
    enabled, input: 'DPAD_DOWN', direction: 'D', directions, callback
  });
  _useDirectionalInputsHelper({
    enabled, input: 'DPAD_LEFT', direction: 'L', directions, callback
  });
  _useDirectionalInputsHelper({
    enabled, input: 'DPAD_RIGHT', direction: 'R', directions, callback
  });
  _useDirectionalInputsHelper({
    enabled, input: 'LEFT_STICK_UP', direction: 'U', directions, callback
  });
  _useDirectionalInputsHelper({
    enabled, input: 'LEFT_STICK_DOWN', direction: 'D', directions, callback
  });
  _useDirectionalInputsHelper({
    enabled, input: 'LEFT_STICK_LEFT', direction: 'L', directions, callback
  });
  _useDirectionalInputsHelper({
    enabled, input: 'LEFT_STICK_RIGHT', direction: 'R', directions, callback
  });
};

type UseInputPortalProps = {
  enabled: boolean;
  name?: string; // "from" portal
  defaultFocusRef: React.RefObject<HTMLAnchorElement>,
};

// TODO: Is "enabled" needed
export const useInputPortal = ({
  enabled,
  name = '',
  defaultFocusRef,
}: UseInputPortalProps) => {
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
      document.body.dataset.activePortal = portal.target;
      el.focus();
    },
  };
};
