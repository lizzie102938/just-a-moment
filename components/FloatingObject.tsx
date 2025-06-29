'use client';

import { useRef, useState } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Mesh, TextureLoader } from 'three';
import classes from './FloatingObject.module.scss';

const Earth = () => {
  const meshRef = useRef<Mesh>(null!);
  // const [earthClicked, setEarthClicked] = useState(false);
  const earthTexture = useLoader(
    TextureLoader,
    'https://raw.githubusercontent.com/jeromeetienne/threex.planets/master/images/earthmap1k.jpg'
  );

  const handlePointerOver = () => {
    document.body.style.cursor = 'pointer';
  };

  const handlePointerOut = () => {
    document.body.style.cursor = 'default';
  };

  // const handleClick = () => {
  //   alert('Earth clicked!');
  //   setEarthClicked(true);
  // };

  useFrame((state, delta) => {
    meshRef.current.rotation.y += delta * 0.5;
    meshRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.2;
  });

  return (
    <mesh
      ref={meshRef}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
      // onClick={handleClick}
    >
      <sphereGeometry args={[2, 64, 64]} />
      <meshStandardMaterial map={earthTexture} />
    </mesh>
  );
};

type GlobeProps = {
  earthClicked?: boolean;
};

export const FloatingObject = ({ earthClicked }: GlobeProps) => {
  return (
    <div className={classes.floatingObjectContainer}>
      <Canvas>
        <ambientLight intensity={1.5} />
        <pointLight position={[30, 30, 30]} />

        <OrbitControls enableZoom={false} />
        <Earth />
      </Canvas>
    </div>
  );
};
