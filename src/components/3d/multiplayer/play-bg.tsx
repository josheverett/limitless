import { useEffect, useState, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { Clouds, Cloud, Environment, PerspectiveCamera, useProgress } from '@react-three/drei';
import { Physics } from '@react-three/rapier';
import { Model } from '../models/SpartanModel';

import { MeshLambertMaterial } from 'three';

type LoaderProps = {
  children: React.ReactNode;
};

const Loader = ({ children }: LoaderProps) => {
  const [isLoaded, setisLoaded] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // `active` = "something is loading"
  // loaded and total are bytes
  const { active, loaded, total } = useProgress();

  if (!isLoaded && !active && loaded === total) setisLoaded(true);

  // This works around an issue with the threejs scene only fading in
  // on its first load.
  useEffect(() => {
    if (!isLoaded) return;
    setTimeout(() => {
      if (ref.current) ref.current.style.opacity = '1';
    }, 200);
  }, [isLoaded]);

  return (
    <div
      ref={ref}
      style={{
        width: '100%',
        height: '100%',
        // opacity: isLoaded ? 1 : 0,
        opacity: 0,
        transition: '500ms opacity ease-out',
      }}
    >
      {children}
    </div>
  );
};

type PuffyCloudProps = {
  seed: number;
  position: [number, number, number];
};

const PuffyCloud = ({
  seed,
  position = [0, 0, 0],
}: PuffyCloudProps) => {
  return (
    <Cloud
      seed={seed + 1}
      fade={30}
      position={position}
      // speed={0.5}
      speed={0.1}
      growth={1}
      // growth={30}
      volume={10}
      opacity={0.8}
      // opacity={1}
      // bounds={[6, 2, 1]}
      bounds={[15, 2, 1]}
      // bounds={[30, 10, 10]}
      scale={[12, 12, 12]}
    />
  );
};

export const PlayTabBackground = () => {
  return (
    <Loader>
      <Canvas style={{ width: '100%', height: '100%' }}>
        <ambientLight intensity={Math.PI / 2} />

        <PerspectiveCamera zoom={2.5} makeDefault position={[0, 0.5, 25]} fov={90} onUpdate={(self) => self.lookAt(0, 0, 0)}>
          <spotLight position={[0, 40, 2]} angle={0.5} decay={1} distance={45} penumbra={1} intensity={2000} />
        </PerspectiveCamera>

        <Clouds limit={400} material={MeshLambertMaterial}>
          <Physics gravity={[0, 0, 0]}>
            {/* <PuffyCloud seed={10} position={[-10, -10, 0]} /> */}
            {/* <PuffyCloud seed={10} position={[40, -40, 0]} /> */}
            <PuffyCloud seed={10} position={[25, -40, 0]} />
          </Physics>
        </Clouds>

        {/* Uncomment for debugging, makes a black background. */}

        {/* <mesh scale={200}>
          <sphereGeometry />
          <meshStandardMaterial color="#000" roughness={0.7} side={BackSide} />
        </mesh> */}

        <Model position={[0, -2, 21]} />

        <Environment files="https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/blue_lagoon_night_1k.hdr" />
      </Canvas>
    </Loader>
  );
};
