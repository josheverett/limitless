// gamecontroller.js follows the spec (minus indexes), this is just for my own
// convenience so that I don't have to remember what A vs X vs Start is.
// If I end up adding keyboard input icons they'll just alias to these.
// Format is: my name --> gamecontroller.js name (based on spec)

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
  'RIGHT_STICK_LEFT' ;

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
