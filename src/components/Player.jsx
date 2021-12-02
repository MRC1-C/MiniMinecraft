import React, { useRef, useEffect } from "react";
import { useSphere } from "@react-three/cannon";
import { useThree, useFrame } from "@react-three/fiber";
import { useKeyboardControls } from "../hooks/useKeyboardControl";
import { Vector3 } from "three";
import * as THREE from "three"
import Axe from "./Axe"
const SPEED = 6;
const rotation = new THREE.Vector3()
const speed = new THREE.Vector3()
export default function Player(props) {
  const { camera } = useThree();
  const { moveForward, moveBackward, moveLeft, moveRight, jump } =
    useKeyboardControls();
   
  const [ref, api] = useSphere(() => ({
    mass: 1,
    type: "Dynamic",
    ...props,
  }));
  const velocity = useRef([0, 0, 0]);
  const axe = useRef()
  useEffect(() => {
    api.velocity.subscribe((v) => (velocity.current = v));
  }, [api.velocity]);

  useFrame((state) => {
    ref.current.getWorldPosition(camera.position)
    const direction = new Vector3();
    const frontVector = new Vector3(
      0,
      0,
      (moveBackward ? 1 : 0) - (moveForward ? 1 : 0)
    );
    const sideVector = new Vector3(
      (moveLeft ? 1 : 0) - (moveRight ? 1 : 0),
      0,
      0
    );
    direction
      .subVectors(frontVector, sideVector)
      .normalize()
      .multiplyScalar(SPEED)
      .applyEuler(camera.rotation);
      speed.fromArray(velocity.current)
    axe.current.children[0].rotation.x = THREE.MathUtils.lerp(
      axe.current.children[0].rotation.x,
      Math.sin((speed.length() > 1) * state.clock.elapsedTime * 10) / 6,
      0.1,
    )
    axe.current.rotation.copy(camera.rotation)
    axe.current.position.copy(camera.position).add(camera.getWorldDirection(rotation).multiplyScalar(1))
    api.velocity.set(direction.x, velocity.current[1], direction.z);
    //console.log(direction.x, velocity.current[1], direction.z)
    if (jump && Math.abs(velocity.current[1].toFixed(2)) < 0.05) {
      api.velocity.set(velocity.current[0], 8, velocity.current[2]);
    }
    
  });
  return (
    <>
      <mesh ref={ref} />
      <group ref={axe} onPointerMissed={(e) => (axe.current.children[0].rotation.x = -0.5)}>
        <Axe position={[0.3, -0.35, 0.5]} />
      </group>
    </>
  );
}
