import React from "react";
import { useStore } from "../hooks/useStore";
import { nanoid } from "nanoid";
import Cube from "./Cube";

export default function Cubes() {
  const [cubes, addCube, removeCube, saveWorld] = useStore((state) => [
    state.cubes,
    state.addCube,
    state.removeCube,
    state.saveWorld,
  ]);

  return cubes.map((cube) => {
    return (
      <Cube
        key={nanoid}
        texture={cube.texture}
        position={cube.pos}
        addCube={addCube}
        removeCube={removeCube}
      />
    );
  });
}
