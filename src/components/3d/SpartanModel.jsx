/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.16 spartan.glb
Author: McCarthy3D (https://sketchfab.com/joshuawatt811)
License: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
Source: https://sketchfab.com/3d-models/spartan-armour-mkv-halo-reach-57070b2fd9ff472c8988e76d8c5cbe66
Title: Spartan Armour MKV - Halo Reach
*/

import React, { useRef, useEffect } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';

export function Model(props) {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF('/3d/spartan.glb');
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    // Plays animation (there's only one).
    actions[Object.keys(actions)[0]].play();
  }, [actions]);

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Sketchfab_Scene">
        <group name="Sketchfab_model" rotation={[-Math.PI / 2, 0, 0]} scale={0.025}>
          <group name="4757fffebe2a4d47b38143266af5f1a9fbx" rotation={[Math.PI / 2, 0, 0]}>
            <group name="Object_2">
              <group name="RootNode">
                <group name="Floor">
                  <mesh name="Floor_lambert2_0" geometry={nodes.Floor_lambert2_0.geometry} material={materials.lambert2} />
                </group>
                <group name="group">
                  <group name="Object_7">
                    <primitive object={nodes._rootJoint} />
                    <group name="Object_9" />
                    <group name="Object_11" />
                    <group name="Object_19" />
                    <group name="polySurface436" />
                    <group name="Helmet" />
                    <group name="Armour" />
                    <group name="Armour_LP" />
                    <skinnedMesh name="Object_10" geometry={nodes.Object_10.geometry} material={materials.Spartan_Ear_Mat} skeleton={nodes.Object_10.skeleton} />
                    <skinnedMesh name="Object_12" geometry={nodes.Object_12.geometry} material={materials.Spartan_Helmet_Mat} skeleton={nodes.Object_12.skeleton} />
                    <skinnedMesh name="Object_13" geometry={nodes.Object_13.geometry} material={materials.Spartan_Ear_Mat} skeleton={nodes.Object_13.skeleton} />
                    <skinnedMesh name="Object_14" geometry={nodes.Object_14.geometry} material={materials.Spartan_Chest_Mat} skeleton={nodes.Object_14.skeleton} />
                    <skinnedMesh name="Object_15" geometry={nodes.Object_15.geometry} material={materials.Spartan_Arms_Mat} skeleton={nodes.Object_15.skeleton} />
                    <skinnedMesh name="Object_16" geometry={nodes.Object_16.geometry} material={materials.Spartan_Legs_Mat} skeleton={nodes.Object_16.skeleton} />
                    <skinnedMesh name="Object_17" geometry={nodes.Object_17.geometry} material={materials.Spartan_Shoulders_Mat} skeleton={nodes.Object_17.skeleton} />
                    <skinnedMesh name="Object_18" geometry={nodes.Object_18.geometry} material={materials.lambert1} skeleton={nodes.Object_18.skeleton} />
                    <skinnedMesh name="Object_20" geometry={nodes.Object_20.geometry} material={materials.Spartan_Undersuit_Mat} skeleton={nodes.Object_20.skeleton} />
                  </group>
                </group>
              </group>
            </group>
          </group>
        </group>
      </group>
    </group>
  );
}

useGLTF.preload('/3d/spartan.glb');
