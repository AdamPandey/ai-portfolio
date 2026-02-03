import { Text } from '@react-three/drei'
export const projectData = [
  { title: "Project 1", description: "Description 1" },
  { title: "Project 2", description: "Description 2" }
]
export default function Projects() {
  return (
    <group>
      {projectData.map((p, i) => (
        <mesh key={i} position={[0, -i * 5, 0]}>
          <planeGeometry args={[4, 2.25]} />
          <meshBasicMaterial color="#222" />
        </mesh>
      ))}
    </group>
  )
}
