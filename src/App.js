import { Canvas } from "@react-three/fiber"
import { Sky, PointerLockControls } from "@react-three/drei"
import { Physics } from "@react-three/cannon"
import Ground from "./components/Ground";
import  Player  from "./components/Player";
import Cubes from "./components/Cubes";
function App() {
  return (
    <Canvas
    shadows
    gl={{ alpha: false }}
    camera={{ fov: 45 }}
    raycaster={{
      computeOffsets: (e) => ({ offsetX: e.target.width / 2, offsetY: e.target.height / 2 }),
    }}>
      <Sky sunPosition={[100, 20, 100]} />
      <ambientLight intensity={0.25} />
      <pointLight castShadow intensity={0.7} position={[100, 100, 100]} />
      <Physics gravity={[0, -30, 0]}>
        <Ground position={[0, 0.5, 0]} /> 
        <Player position={[0, 3, 10]} />
        <Cubes />
        
      </Physics>
      <PointerLockControls />
      </Canvas>
  );
}

export default App;
