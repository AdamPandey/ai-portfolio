import { Image, Text, useScroll } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import { useRef } from 'react'
import * as THREE from 'three'

export const projectData = [
  { type: 'web', title: "Prime Meridian", thumb: "app1.png", url: "app1.png", link: "https://your-link1.com", description: "Geographical Discovery Platform" },
  { type: 'web', title: "MediCare Dashboard", thumb: "app2.png", url: "app2.png", link: "https://your-link2.com", description: "Medical Administration System" },
  { type: 'video', title: "Auto Rickshaw Transf.", thumb: "img1.png", url: "vid1.mp4", description: "3D Animation" },
  { type: 'video', title: "Sword Scene", thumb: "img2.png", url: "vid2.mp4", description: "Fight Choreography" },
  { type: 'video', title: "Sword Title Motion", thumb: "img3.png", url: "vid3.mp4", description: "Motion Graphics" },
  { type: 'video', title: "Bird V Man", thumb: "img4.png", url: "vid4.mp4", description: "Short Film" },
  { type: 'video', title: "Light Duties", thumb: "img5.png", url: "vid5.mp4", description: "Short Film" },
  { type: 'video', title: "Rinse and Repeat", thumb: "img6.png", url: "vid6.mp4", description: "Short Film" },
]

function ProjectItem({ index, title, thumb, url, description, link, type, total, onSelectVideo }) {
  const groupRef = useRef()
  const scroll = useScroll()
  const spacing = 8 
  const yPosition = -index * spacing

  useFrame(() => {
    if (!groupRef.current) return
    const scrollOffset = scroll.offset * (total - 1) * spacing
    const curY = yPosition + scrollOffset
    const distFromCenter = Math.abs(curY)
    
    groupRef.current.position.y = curY
    groupRef.current.position.z = index * -0.5 

    const scale = Math.max(0.3, 1 - distFromCenter / 12)
    groupRef.current.scale.set(scale, scale, 1)
    groupRef.current.rotation.x = distFromCenter * 0.05

    const imageMesh = groupRef.current.children[0]
    if (imageMesh && imageMesh.material) {
        imageMesh.material.transparent = true
        imageMesh.material.opacity = THREE.MathUtils.lerp(imageMesh.material.opacity, Math.max(0, 1 - distFromCenter / 6), 0.1)
    }
  })

  return (
    <group ref={groupRef}>
      <Image 
        url={thumb} 
        scale={[4, 2.25]} 
        transparent
        onClick={() => type === 'web' ? window.open(link, '_blank') : onSelectVideo({title, url, description})}
      />
      <group position={[-1.9, -1.6, 0.2]}>
        <Text fontSize={0.25} anchorX="left" fontWeight="bold">{title.toUpperCase()}</Text>
        <Text position={[0, -0.3, 0]} fontSize={0.15} color="#a1a1aa" anchorX="left">{description}</Text>
      </group>
    </group>
  )
}

export default function Projects({ onSelectVideo }) {
  return (
    <group>
      {projectData.map((project, i) => (
        <ProjectItem key={i} index={i} {...project} total={projectData.length} onSelectVideo={onSelectVideo} />
      ))}
    </group>
  )
}
