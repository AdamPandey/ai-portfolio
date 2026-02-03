export const projectData = [
  { title: "App 1", description: "Web" },
  { title: "App 2", description: "Web" }
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
