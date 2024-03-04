import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { PerspectiveCamera, useProgress } from '@react-three/drei';
import { Canvas, useThree, useFrame } from '@react-three/fiber';
import { Loader } from '../3d-loader';
import { Model as SniperModel } from '../models/sniper';

const Camera = () => {
  const ref = useRef<THREE.PerspectiveCamera | null>(null);

  const { camera } = useThree();

  useEffect(() => {
    camera.lookAt(2, 2, -180);
  }, [camera]);

  useFrame(() => {
    if (!ref.current) return;
    ref.current.position.x -= 0.002;
    ref.current.position.y += 0.0005;
    ref.current.position.z += 0.0025;
  });

  return <PerspectiveCamera ref={ref} makeDefault position={[-3.4, 0.5, 12]} fov={35} />;
};

const Model = () => {
  const ref = useRef<THREE.Group | null>(null);

  useFrame(() => {
    if (!ref.current) return;
    ref.current.rotation.x += 0.0001;
  });

  return (
    <group ref={ref}>
      <SniperModel position={[-3.5, -4.5, 9]} rotation={[
        -0.525 * Math.PI,  // you might need to adjust this to tilt the model up or down
        (-0.05 * Math.PI) + (Math.PI / 8), // adjust this value to rotate clockwise/anticlockwise
        -0.325 * Math.PI,  // you might need to adjust this to tilt the model left or right
      ]} />
    </group>
  );
};

export const SniperBg = () => {
  const { active, loaded, total } = useProgress();

  // threejs gpt literally wrote the lighting by feeding it screenshots lmao
  return (
    <Loader active={active} loaded={loaded} total={total}>
      <Canvas style={{ width: '100%', height: '100%' }}>
        {/* Ambient light for a very soft fill */}
        <ambientLight intensity={1} />

        {/* Multiple directional lights coming from different directions */}
        <directionalLight position={[0, 50, 0]} intensity={6} />
        <directionalLight position={[50, 50, 50]} intensity={6} />
        <directionalLight position={[-50, 50, 50]} intensity={6} />
        <directionalLight position={[50, 50, -50]} intensity={6} />
        <directionalLight position={[-50, 50, -50]} intensity={6} />
        <directionalLight position={[0, -50, 0]} intensity={6} />

        {/* Even more spotlights if needed */}
        <spotLight position={[0, 0, 50]} intensity={6} angle={0.3} penumbra={1} />
        <spotLight position={[0, 0, -50]} intensity={6} angle={0.3} penumbra={1} />
        <spotLight position={[50, 0, 0]} intensity={6} angle={0.3} penumbra={1} />
        <spotLight position={[-50, 0, 0]} intensity={6} angle={0.3} penumbra={1} />

        <Camera />

        <Model />
      </Canvas>
    </Loader>
  );
};
