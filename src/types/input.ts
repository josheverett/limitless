// TODO: This is the only actual type in this file... lol.
export type GAMEPAD_INPUT_KEYS =
  'A' |
  'B' |
  'X' |
  'Y' |
  'LB' |
  'RB' |
  'LT' |
  'RT' |
  'SELECT' |
  'START' |
  'L3' |
  'R3' |
  'DPAD_UP' |
  'DPAD_DOWN' |
  'DPAD_LEFT' |
  'DPAD_RIGHT' |
  'GUIDE' |
  'LEFT_STICK_UP' |
  'LEFT_STICK_DOWN' |
  'LEFT_STICK_RIGHT' |
  'LEFT_STICK_LEFT' |
  'RIGHT_STICK_UP' |
  'RIGHT_STICK_DOWN' |
  'RIGHT_STICK_RIGHT' |
  'RIGHT_STICK_LEFT';

// gamecontroller.js follows the spec (minus indexes), this is just for my own
// convenience so that I don't have to remember what A vs X vs Start is.
// Format is: my name --> gamecontroller.js name (based on spec)
export const GAMEPAD_INPUTS: {
  [key in GAMEPAD_INPUT_KEYS]: GcjsGamepadEvent
} = {
  A: 'button0',
  B: 'button1',
  X: 'button2',
  Y: 'button3',
  LB: 'button4',
  RB: 'button5',
  LT: 'button6',
  RT: 'button7',
  SELECT: 'button8',
  START: 'button9',
  L3: 'button10',
  R3: 'button11',
  DPAD_UP: 'button12',
  DPAD_DOWN: 'button13',
  DPAD_LEFT: 'button14',
  DPAD_RIGHT: 'button15',
  GUIDE: 'button16',
  LEFT_STICK_UP: 'up0',
  LEFT_STICK_DOWN: 'down0',
  LEFT_STICK_RIGHT: 'right0',
  LEFT_STICK_LEFT: 'left0',
  RIGHT_STICK_UP: 'up1',
  RIGHT_STICK_DOWN: 'down1',
  RIGHT_STICK_RIGHT: 'right1',
  RIGHT_STICK_LEFT: 'left1',
};

// string is standard e.key value, number is e.location.
// e.location is the index of the GAMEPAD_INPUT_KEYS array to use.
// For keys that don't have a concept left/right, e.location is always 0.
// For keys that do, you get 1 for left, and 2 for right, hence the Shift
// array having an undefined 0th index.
export const KEYBOARD_INPUTS: {
  [key: string]: (GAMEPAD_INPUT_KEYS | undefined)[]
} = {
  'a': ['A'],
  'b': ['B'],
  'x': ['X'],
  'y': ['Y'],
  '[': ['LB'],
  ']': ['RB'],
  'Shift': [undefined, 'LT', 'RT'],
  ',': ['L3'],
  '.': ['R3'],
  // I don't remember how I got under the impression that some browsers might
  // use Space or Spacebar instead of ' ', but whatevs no harm done.
  'Spacebar': ['START'],
  'Space': ['START'],
  ' ': ['START'],
  'Escape': ['SELECT'],
  'ArrowUp': ['DPAD_UP'],
  'ArrowDown': ['DPAD_DOWN'],
  'ArrowLeft': ['DPAD_LEFT'],
  'ArrowRight': ['DPAD_RIGHT'],
  'g': ['GUIDE'],
};
