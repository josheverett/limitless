import React, { Suspense, useEffect } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { Model } from './Spartan';

type CameraProps = {
  position: [number, number, number];
  lookAt: [number, number, number];
};

const Camera = ({ position, lookAt }: CameraProps) => {
  const { camera } = useThree();

  useEffect(() => {
    camera.position.set(...position);
    camera.lookAt(...lookAt);
  }, [camera, position, lookAt]);

  return null;
};

export const ThreeJsTest = () => {
  return (
    <Canvas
      camera={{ position: [3, 20, 14.25], fov: 8 }}
      style={{ width: "100%", height: "100%" }}
    >
      <ambientLight intensity={1} />
      <ambientLight intensity={5} />
      <Suspense fallback={null}>
        <Model position={[0, -0.1, 0]} />
      </Suspense>
      <Camera position={[0, 0, 20]} lookAt={[0, 2, 0]} />
    </Canvas>
  );
};
