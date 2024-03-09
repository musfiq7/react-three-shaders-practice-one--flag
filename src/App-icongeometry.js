import { OrbitControls } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import { Color } from "three";
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



const MyShape = () =>{
  const mesh_ref = useRef();
    // after rendering console log will work so test after rendered
   //console.log( mesh_ref.current.material);
   //console.log(mesh_ref.current.geometry);
  return(
    <>
     <ambientLight intensity={0.5}/>
      <directionalLight position={[10,15,10]} angle={0.3} color={'white'} intensity={1.5}/>
      {/* <pointLight position={[0, 20, 10]} intensity={1.5} /> */}

     
    <mesh ref={mesh_ref}>
      
      <icosahedronGeometry/>
      {/* <shaderMaterial fragmentShader={fragmentShader} vertexShader={vertexShader}/> */}
      
      
      <meshStandardMaterial color={'hotpink'}/>
    
    </mesh>
    </>
  );
}

const App = () => {


  useEffect(() =>{
     console.log(<icosahedronGeometry/>);
  },[]);
  return (
    <Canvas camera={{ position: [1.0, 1.5, 1.0] }}>
    
      {/* <axesHelper /> */}
      <OrbitControls />
     
      <MyShape/>
    </Canvas>
  );
};


export default App;
