/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.1.4 scene.gltf --transform
Author: ikagogava (https://sketchfab.com/ikagogava)
License: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
Source: https://sketchfab.com/3d-models/basketball-bb2896720a1e4aefba3ab381d4b4554e
Title: Basketball
*/

import React, { useRef } from "react"
import { useGLTF } from "@react-three/drei"

export function BBAll(props) {
  const { nodes, materials } = useGLTF("./bball.glb")
  console.log(nodes)

  return (
    <>
      <group {...props} dispose={null}>
        <group rotation={[-Math.PI / 2, 0, 0]}>
          <group rotation={[Math.PI / 2, 0, 0]}>
            <mesh
              geometry={nodes.defaultMaterial.geometry}
              material={materials.Seams}
            />
            <mesh
              geometry={nodes.defaultMaterial_1.geometry}
              material={materials.Basketball}
            />
          </group>
        </group>
      </group>
    </>
  )
}

useGLTF.preload("./bball.glb")

/*
    <group {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <group rotation={[Math.PI / 2, 0, 0]}>
          <mesh geometry={nodes.defaultMaterial.geometry} material={materials.Seams} />
          <mesh geometry={nodes.defaultMaterial_1.geometry} material={materials.Basketball} />
        </group>
      </group>
    </group>
    */