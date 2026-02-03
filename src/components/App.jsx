import { Canvas } from '@react-three/fiber'
import { useState, useRef, useEffect } from 'react'
import Experience from './components/Experience'

function App() {
  const [playing, setPlaying] = useState(false)
  const audioRef = useRef(new Audio('./ambient.mp3'))

  useEffect(() => {
    audioRef.current.loop = true
    audioRef.current.volume = 0.5
    
    // Cleanup on unmount
    return () => {
      audioRef.current.pause()
    }
  }, [])

  const toggleMusic = () => {
    if (playing) {
      audioRef.current.pause()
    } else {
      audioRef.current.play().catch(e => console.log("Interaction needed:", e))
    }
    setPlaying(!playing)
  }

  return (
    <div className="relative w-full h-screen">
      
      {/* 3D Scene */}
      <Canvas camera={{ position: [0, 0, 5], fov: 30 }}>
        <Experience />
      </Canvas>

      {/* HTML Overlay (UI) */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none flex flex-col justify-between p-10 z-10">
        
        {/* Header */}
        <header className="flex justify-between items-center text-white">
          <div>
            <h1 className="text-3xl font-bold tracking-tighter">MY PORTFOLIO</h1>
            <p className="text-sm opacity-50">Web Apps & Animations</p>
          </div>
          
          {/* Music Button (Must have pointer-events-auto to be clickable) */}
          <button 
            onClick={toggleMusic}
            className="pointer-events-auto border border-white/20 hover:bg-white/10 px-4 py-2 rounded-full text-xs uppercase tracking-widest transition-colors"
          >
            {playing ? 'Pause Music' : 'Play Music'}
          </button>
        </header>

        {/* Scroll Indicator */}
        <div className="text-white text-center opacity-50 animate-bounce">
          <p className="text-xs uppercase tracking-widest">Scroll Down</p>
          <div className="text-xl">↓</div>
        </div>

      </div>
    </div>
  )
}

export default App