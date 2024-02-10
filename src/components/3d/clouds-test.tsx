import { Canvas } from '@react-three/fiber';
import { Clouds, Cloud, Environment, PerspectiveCamera } from '@react-three/drei';
import { Physics } from '@react-three/rapier';
import { Model } from './SpartanModel';

import { MeshLambertMaterial, BackSide } from 'three';

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

export const CloudsTest = () => {
  return (
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
  );
};