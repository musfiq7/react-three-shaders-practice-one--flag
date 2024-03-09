import { OrbitControls } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import { Color } from "three";
import './App.css';


const fragmentShader =`
varying vec2 vUv;
uniform float myParam;

vec3 colorA = vec3(0.008,0.895,0.940);
vec3 colorB = vec3(0.129,0.299,1.000);

void main() {
  vec4 pixel = gl_FragCoord;
  vec2 normalizedPixel = gl_FragCoord.xy/500.0;
  vec3 color = mix(colorA, colorB, normalizedPixel.x);

  gl_FragColor = vec4(sin(pixel.x *0.02 + myParam ),sin(pixel.y *0.02 + myParam ),sin(pixel.z *0.02 + myParam ),1.0);
}


`;

const vertexShader =`
uniform float u_time;
// uniform float myParam;

varying vec2 vUv;

void main() {
  
  vec4 modelPosition = modelMatrix * vec4(position, 1.0);
  modelPosition.y += sin(modelPosition.x * 4.0 + u_time * 2.0) * 0.2;
  
  // Uncomment the code and hit the refresh button below for a more complex effect 🪄
   

  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectedPosition = projectionMatrix * viewPosition;

  gl_Position = projectedPosition;
}


`;

const MovingPlane = () => {
  // This reference will give us direct access to the mesh
  const mesh = useRef();

  const uniforms = useMemo(
    () => ({
      u_time: {
        value: 0.0,
      },
      myParam : { type:'f', value:1.0}
    }), []
  );

  useFrame((state) => {
    const { clock } = state;
    //  mesh.current.material.uniforms.u_time.value = clock.getElapsedTime();
     mesh.current.material.uniforms.u_time.value = clock.getElapsedTime();
       mesh.current.material.uniforms.u_time.value += 0.005;
      
      
    // mesh.current.rotation.y = clock.getElapsedTime();
  });

  return (
   // <mesh ref={mesh} position={[0, 0, 0]}   rotation={[-Math.PI / 2, 0, 0]} scale={1.5}>
    <mesh ref={mesh} position={[0, 0, 0]}    scale={1.3}>
      <planeGeometry args={[1, 1, 32, 32]} />
      {/* <sphereGeometry /> */}
      <shaderMaterial
        fragmentShader={fragmentShader}
        vertexShader={vertexShader}
        uniforms={uniforms}
          //wireframe
      />
    </mesh>
  );
};

const App = () => {
  return (
    <Canvas camera={{ position: [1.0, 1.5, 1.0] }}>
      <MovingPlane />
      {/* <axesHelper /> */}
      <OrbitControls />
    </Canvas>
  );
};


export default App;
