import { ScrollControls, Sparkles, Scroll } from '@react-three/drei'
import Projects from './Projects'
export default function Experience() {
  return (
    <>
      <color attach="background" args={['#09090b']} />
      <Sparkles count={300} scale={20} size={1.5} />
      <ScrollControls pages={8} damping={0.1}>
        <Scroll><Projects /></Scroll>
      </ScrollControls>
    </>
  )
}
