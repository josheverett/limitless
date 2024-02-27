import { useEffect, useRef } from 'react';
import { Canvas, useThree, useFrame } from '@react-three/fiber';
import { PerspectiveCamera, useProgress } from '@react-three/drei';
import * as THREE from 'three';
import { Model as ARModel } from '../models/assault-rifle';
import { Loader } from '../3d-loader';


const Camera = () => {
  const ref = useRef<THREE.PerspectiveCamera | null>(null);

  const { camera } = useThree();

  useEffect(() => {
    camera.lookAt(2, 2, -180);
  }, [camera]);

  useFrame(() => {
    if (!ref.current) return;
    ref.current.position.x -= 0.002;
    ref.current.position.y += 0.002;
  });

  return <PerspectiveCamera ref={ref} makeDefault position={[-3, -4, 14]} fov={50} />;
};

const Model = () => {
  const ref = useRef<THREE.Group | null>(null);

  useFrame(() => {
    if (!ref.current) return;
    ref.current.rotation.y -= 0.0003;
  });

  return (
    <group ref={ref}>
      <ARModel position={[-5, -6, 0]} rotation={[
        2.07 * Math.PI,
        0.8 * Math.PI,
        2.1 * Math.PI
      ]} />
    </group>
  );
};

export const CustomizeTabBackground = () => {
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
