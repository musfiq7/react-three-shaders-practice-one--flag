import {  Stats, OrbitControls } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import { Color, Vector3, BufferGeometry, DoubleSide } from "three";
import './App.css';

 import * as THREE from 'three';
 



const fragmentShader = `
  void main(){
    gl_FragColor = vec4(0.4,0.7,0.9,1.0);
  }
`;

const vertexShader = `

void main(){
  vec4 modelPosition = modelMatrix * vec4(position,1.0);
   
  vec4 viewPosition = viewMatrix * modelPosition;
    // viewPosition.y += sin(viewPosition.x * 4.0) * 0.9;
  vec4 projectedPosition = projectionMatrix * viewPosition;
  gl_Position = projectedPosition;
}
`;



function Polyhedron() {


  const geometry = useMemo(() => {
      let g = new BufferGeometry()
      const points = [
          new Vector3(-1, 1, -1), //c
          new Vector3(-1, -1, 1), //b
          new Vector3(1, 1, 1), //a

          new Vector3(1, 1, 1), //a
          new Vector3(1, -1, -1), //d
          new Vector3(-1, 1, -1), //c

          new Vector3(-1, -1, 1), //b
          new Vector3(1, -1, -1), //d
          new Vector3(1, 1, 1), //a

          new Vector3(-1, 1, -1), //c
          new Vector3(1, -1, -1), //d
          new Vector3(-1, -1, 1) //b
      ]
      g.setFromPoints(points)
      g.computeVertexNormals()
      return g
  }, [])



  return (
      <mesh geometry={geometry}>
          <meshNormalMaterial side={DoubleSide} />
      </mesh>
  )
}

function App() {
  return (
      <Canvas camera={{ position: [1, 1, 3] }}>
          <Polyhedron />
          <OrbitControls />
          <Stats />
      </Canvas>
  )
}


export default App;
