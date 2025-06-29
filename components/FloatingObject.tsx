'use client';

import { useRef } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Mesh, TextureLoader } from 'three';
import classes from './FloatingObject.module.scss';
import { Box, Flex } from '@mantine/core';

const Earth = () => {
  const meshRef = useRef<Mesh>(null!);

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

  useFrame((state, delta) => {
    meshRef.current.rotation.y += delta * 0.5;
    meshRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.2;
  });

  return (
    <mesh
      ref={meshRef}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
    >
      <sphereGeometry args={[1.2, 64, 64]} />
      <meshStandardMaterial map={earthTexture} />
    </mesh>
  );
};

type GlobeProps = {
  earthClicked?: boolean;
};

export const FloatingObject = ({ earthClicked }: GlobeProps) => {
  return (
    <Flex
      justify={'center'}
      align="center"
      className={classes.floatingObjectWrapper}
      h={'100vh'}
    >
      <Box className={classes.floatingObjectContainer}>
        <Canvas>
          <ambientLight intensity={1.5} />
          <pointLight position={[30, 30, 30]} />

          <OrbitControls enableZoom={false} />
          <Earth />
        </Canvas>
      </Box>
    </Flex>
  );
};
