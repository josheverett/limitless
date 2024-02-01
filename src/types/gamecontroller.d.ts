declare module 'gamecontroller.js';

// These names are prefixed to avoid clashes with the native types.

type GcjsGamepadEvent =
  'button0' |
  'button1' |
  'button2' |
  'button3' |
  'button4' |
  'button5' |
  'button6' |
  'button7' |
  'button8' |
  'button9' |
  'button10' |
  'button11' |
  'button12' |
  'button13' |
  'button14' |
  'button15' |
  'button16' |
  'up0' |
  'down0' |
  'right0' |
  'left0' |
  'up1' |
  'down1' |
  'right1' |
  'left1' |
  'start' |
  'select' |
  'power' |
  'l1' |
  'l2' |
  'r1' |
  'r2' |
  'up' |
  'down' |
  'right' |
  'left';

type GcjsGamepad = {
  id: string; // docs show getGamepad uses ints but this is a string??
  axes: number;
  axeThreshold: number;
  buttons: number;
  mapping: 'standard' | '';
  vibration: boolean;
  on: (eventName: GcjsGamepadEvent, callback: () => void) => void;
  before: (eventName: GcjsGamepadEvent, callback: () => void) => void;
  after: (eventName: GcjsGamepadEvent, callback: () => void) => void;
  off: (eventName: GcjsGamepadEvent) => void;
  vibrate: (intensity: number, duration: number) => void;
  set: (property: 'axeThreshold', value: number) => void;
};

type GcjsGameControlEvent = 'connect' | 'disconnect' | 'beforeCycle' | 'afterCycle';

type GcjsGameControl = {
  isReady: boolean;
  on: (eventName: GcjsGameControlEvent, callback: () => void) => void;
  off: (eventName: GcjsGameControlEvent) => void;
  getGamepad: (id: number) => GcjsGamepad;
  getGamepads: () => GcjsGamepad[];
  set: (property: 'axeThreshold', value: number) => void;
};

interface Window {
  gameControl: GcjsGameControl;
}
