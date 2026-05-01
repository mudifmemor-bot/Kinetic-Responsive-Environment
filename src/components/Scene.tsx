import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, PerspectiveCamera, ContactShadows } from '@react-three/drei';
import { KineticFacade } from './KineticFacade';

interface SceneProps {
  timeOfDay: number;
  sunIntensity: number;
  occupancy: number;
}

export function Scene({ timeOfDay, sunIntensity, occupancy }: SceneProps) {
  // Determine lighting based on time of day
  // 0-24 scale
  const isNight = timeOfDay < 6 || timeOfDay > 20;
  const isMorning = timeOfDay >= 6 && timeOfDay < 10;
  const isEvening = timeOfDay >= 16 && timeOfDay <= 20;
  
  let lightIntensity = 1;
  let lightColor = "#ffffff";
  
  if (isNight) {
    lightIntensity = 0.2;
    lightColor = "#224488";
  } else if (isMorning || isEvening) {
    lightIntensity = 0.8;
    lightColor = "#ffaa88";
  } else {
    // scale intensity based on sunIntensity parameter at noon
    lightIntensity = 0.5 + (sunIntensity / 100) * 1.5;
    lightColor = "#ffffff";
  }

  return (
    <div className="w-full h-full relative bg-black">
      <Canvas shadows>
        <PerspectiveCamera makeDefault position={[12, 5, 15]} fov={45} />
        <OrbitControls 
          enablePan={false} 
          minAzimuthAngle={-Math.PI / 4} 
          maxAzimuthAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 2}
          minDistance={10}
          maxDistance={30}
        />
        
        <ambientLight intensity={lightIntensity * 0.3} color={lightColor} />
        <directionalLight 
          position={[10, 10, 10]} 
          intensity={lightIntensity} 
          color={lightColor} 
          castShadow 
        />
        
        {/* Accent lighting for the tech aesthetic */}
        <pointLight position={[-10, -5, 5]} intensity={0.5} color="#22d3ee" />
        
        <KineticFacade 
          timeOfDay={timeOfDay} 
          sunIntensity={sunIntensity} 
          occupancy={occupancy} 
        />

        <Environment preset="city" />
      </Canvas>
      
      {/* Overlay to give it a UI feel */}
      <div className="absolute top-4 left-4 flex gap-2 pointer-events-none">
        <span className="px-2 py-1 bg-white/10 rounded text-[9px] uppercase tracking-widest text-white">Real-Time View</span>
        <span className="px-2 py-1 bg-cyan-500/20 text-cyan-400 rounded text-[9px] uppercase tracking-widest">Active Simulation</span>
      </div>
      <div className="absolute bottom-4 right-4 flex items-center gap-2 pointer-events-none text-right bg-white/5 backdrop-blur-md px-3 py-1.5 rounded border border-white/10">
        <div className={`w-1.5 h-1.5 rounded-full ${isNight ? 'bg-muted-foreground' : 'bg-cyan-500 animate-pulse'}`}></div>
        <span className="text-[10px] uppercase tracking-widest text-white">SYS.STATE: {isNight ? 'IDLE' : 'OPTIMIZED'}</span>
      </div>
    </div>
  );
}
