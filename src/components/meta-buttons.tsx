import { useContext } from 'react';
import { GAMEPAD_INPUTS } from '@/types/input';
import { AppContext } from '@/app/context';
import { useInput } from '@/hooks/use-gamepad';

export const MetaButtons = () => {
  const {
    force4k,
    setForce4k,
    fullscreen,
    setFullscreen
  } = useContext(AppContext);

  useInput('GUIDE', 'press', () => setFullscreen(!fullscreen));

  return (
    <>
      <div
        className="fourk-toggle flex items-center justify-center h-full"
        onClick={() => setForce4k(!force4k)}
      >
        <span className="material-icons">4k</span>
        <span>Force 4K:</span>
        {/* TODO: Add "auto". */}
        <span>{force4k ? 'On' : 'Off'}</span>
      </div>
      <div
        className="fourk-toggle flex items-center justify-center h-full"
        onClick={() => setFullscreen(!fullscreen)}
      >
        <span className="material-icons">fullscreen</span>
        <span>Fullscreen:</span>
        <span>{fullscreen ? 'On' : 'Off'}</span>
      </div>
    </>
  );
};