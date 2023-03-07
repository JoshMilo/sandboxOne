import "./style.css"
import ReactDOM from "react-dom/client"
import { Canvas } from "@react-three/fiber"
import Experience from "./Experience.jsx"

const root = ReactDOM.createRoot(document.querySelector("#root"))

root.render(
  <Canvas
    shadows
    // camera={ {
    //     fov: 85,//45
    //     near: 0.1,
    //     far: 200,
    //     position: [ 4, 2, 6 ]
    // } }
    camera={{
      position: [0, 1.1, 7],
    }}
  >
    <Experience />
  </Canvas>
)
