import {  Stats, OrbitControls } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import { Color, Vector3, BufferGeometry, DoubleSide } from "three";
import './App.css';

 import * as THREE from 'three';
 



const fragmentShader = `

uniform float uTime;

varying vec3 vPosition;
varying vec3 vNormal;
varying vec2   vUv;

  void main(){ 
 vec2 uv = vUv;    
 uv.y += uTime;   
 
gl_FragColor = vec4(step(0.5, vec3(fract( uv.y *10.0 ))) ,1.0) ;
   
  }
`;

const vertexShader = `

uniform float uTime;

varying vec3 vPosition;
varying vec3 vNormal;
varying vec2 vUv;

void main(){
  vPosition = position;
  vUv = uv;
  vec4 modelPosition = modelMatrix * vec4(position,1.0);
   
  vec4 viewPosition = viewMatrix * modelPosition;
    // viewPosition.y += sin(viewPosition.x * 4.0) * 0.9;
     
    
  vec4 projectedPosition = projectionMatrix * viewPosition;
  gl_Position = projectedPosition;
}
`;



const Myshape = () => {
  const mesh_ref = useRef();
  const uniforms = useMemo(
    () => ({
      uTime: {
        value: 0.0,
      }
    }), []
  );

  useFrame((state) => {
    const { clock } = state;
    
    mesh_ref.current.material.uniforms.uTime.value += 0.005;
     console.log( mesh_ref.current.geometry);
      
  });


  
  return (
   
    
   <mesh ref={mesh_ref} scale={1.5} >
     {/* <planeGeometry/> */}
     <sphereGeometry/>
     <shaderMaterial fragmentShader={fragmentShader} vertexShader={vertexShader} uniforms={uniforms}/>
   </mesh>
  );
}



function App() {
  return (
      <Canvas camera={{ position: [0, 5, 5] }}>
        <Myshape/>
          <OrbitControls />
          <Stats />
      </Canvas>
  )
}


export default App;
