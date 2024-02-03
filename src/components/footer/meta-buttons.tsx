import { useContext } from 'react';
import { AppContext } from '@/app/context';
import { use4k } from '@/hooks/use-4k';
import { useInput } from '@/hooks/use-gamepad';
import { MaterialIcon } from '@/components/icon';

export const MetaButtons = () => {
  const {
    force4k,
    setForce4k,
    fullscreen,
    setFullscreen
  } = useContext(AppContext);

  const _4k = use4k();

  useInput('GUIDE', 'press', () => setFullscreen(!fullscreen));

  return (
    <>
      <div
        className="meta-button flex items-center justify-center h-full"
        style={_4k({ gap: '1vh' })}
        onClick={() => setForce4k(!force4k)}
      >
        <MaterialIcon className="meta-button-icon" icon="4k" />
        <div>Force 4K:</div>
        {/* TODO: Add "auto". */}
        <div>{force4k ? 'On' : 'Off'}</div>
      </div>
      <div
        className="flex items-center justify-center h-full"
        style={_4k({ gap: '1vh' })}
        onClick={() => setFullscreen(!fullscreen)}
      >
        <MaterialIcon className="meta-button-icon" icon="fullscreen" />
        <div>Fullscreen:</div>
        <div>{fullscreen ? 'On' : 'Off'}</div>
      </div>
    </>
  );
};
