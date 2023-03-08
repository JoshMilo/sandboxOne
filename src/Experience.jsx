import { useGLTF, OrbitControls, Html } from "@react-three/drei"
import { Perf } from "r3f-perf"
import {
  InstancedRigidBodies,
  CylinderCollider,
  BallCollider,
  CuboidCollider,
  Debug,
  RigidBody,
  Physics,
} from "@react-three/rapier"
import { useMemo, useEffect, useState, useRef } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"
import { BBAll } from "./Scene"
import { SoccerBall } from "./soccer_ball"

export default function Experience() {
  const [hitSound] = useState(() => new Audio("./hit.mp3"))
  const twister = useRef()
  const cube = useRef()
  const [isBasketBall, setisBasketBall] = useState(false)
  const [isSoccerBall, setisSoccerBall] = useState(false)

  useFrame((state) => {
    const time = state.clock.getElapsedTime()

    const eulerRotation = new THREE.Euler(0, time * 3, 0)
    const quaternionRotation = new THREE.Quaternion()
    // quaternionRotation.setFromEuler(eulerRotation)
    // twister.current.setNextKinematicRotation(quaternionRotation)

    // const angle = time * 0.5
    // const x = Math.cos(angle) * 2
    // const z = Math.sin(angle) * 2
    // twister.current.setNextKinematicTranslation({ x: x, y: - 0.8, z: z })
  })

  const cubeJump = () => {
    const mass = cube.current.mass()

    cube.current.applyImpulse({ x: 0, y: 5 * mass, z: 0 })
    cube.current.applyTorqueImpulse({
      x: Math.random() - 0.5,
      y: Math.random() - 0.5,
      z: Math.random() - 0.5,
    })
  }

  const collisionEnter = () => {
    console.log("collision!")
    // hitSound.currentTime = 0
    // hitSound.volume = Math.random()
    // hitSound.play()
  }

  const hamburger = useGLTF("./hamburger.glb")

  const cubesCount = 150
  const cubes = useRef()
  const cubeTransforms = useMemo(() => {
    const positions = []
    const rotations = []
    const scales = []

    for (let i = 0; i < cubesCount; i++) {
      positions.push([
        (Math.random() - 0.5) * 8,
        6 + i * 0.2,
        (Math.random() - 0.5) * 8,
      ])
      rotations.push([Math.random(), Math.random(), Math.random()])

      const scale = 0.2 + Math.random() * 0.8
      scales.push([scale, scale, scale])
    }

    return { positions, rotations, scales }
  }, [])

  return (
    <>
      <Perf position="top-left" />

      <OrbitControls makeDefault />

      <directionalLight castShadow position={[1, 2, 3]} intensity={1.5} />
      <ambientLight intensity={0.5} />

      <Physics gravity={[0, -9.08, 0]}>
        <Debug />

        <RigidBody type="fixed" restitution={0} friction={0.7}>
          <mesh receiveShadow position-y={-1.25}>
            <boxGeometry args={[10, 0.5, 10]} />
            <meshStandardMaterial color="greenyellow" />
          </mesh>
        </RigidBody>
        <Html>
          <button
            onClick={() => {
              setisBasketBall(!isBasketBall)
              setisSoccerBall(false)
            }}
          >
            Turn in 1
          </button>
        </Html>

        <Html>
          <button
            className="soccer"
            onClick={() => {
              setisSoccerBall(!isSoccerBall)
              setisBasketBall(false)
            }}
          >
            Turn in 2
          </button>
        </Html>

        <RigidBody type="fixed">
          <CuboidCollider args={[5, 2, 0.5]} position={[0, 1, 5.25]} />
          <CuboidCollider args={[5, 2, 0.5]} position={[0, 1, -5.25]} />
          <CuboidCollider args={[0.5, 2, 5]} position={[5.25, 1, 0]} />
          <CuboidCollider args={[0.5, 2, 5]} position={[-5.25, 1, 0]} />
        </RigidBody>

        {isBasketBall && (
          <>
            {[...Array(cubesCount)].map((_, i) => (
              <RigidBody
                colliders="ball"
                position={[
                  (Math.random() - 0.5) * 8,
                  6 + i * 0.2,
                  (Math.random() - 0.5) * 8,
                ]}
                scale={0.5}
                restitution={0.7}
                friction={0.7}
              >
                <BBAll />
              </RigidBody>
            ))}
          </>
        )}

        {isSoccerBall && (
          <>
            {[...Array(cubesCount)].map((_, i) => (
              <RigidBody
                colliders="ball"
                position={[
                  (Math.random() - 0.5) * 8,
                  6 + i * 0.2,
                  (Math.random() - 0.5) * 8,
                ]}
                scale={0.5}
                restitution={0.7}
                friction={0.7}
              >
                <SoccerBall />
              </RigidBody>
            ))}
          </>
        )}
      </Physics>
    </>
  )
}
