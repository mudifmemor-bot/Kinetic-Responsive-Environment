import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Sun, Users, Clock, Wind, Activity, Maximize, Cpu, Battery, FileText, ArrowRight } from 'lucide-react';
import { Scene } from './components/Scene';
import { Slider } from './components/ui/Slider';
import { EnergyChart } from './components/EnergyChart';

export default function App() {
  const [timeOfDay, setTimeOfDay] = useState(14);
  const [sunIntensity, setSunIntensity] = useState(80);
  const [occupancy, setOccupancy] = useState(40);

  return (
    <div className="h-screen w-full bg-background text-foreground flex flex-col-reverse md:flex-row overflow-hidden relative">
      
      {/* Left Content Column */}
      <div className="w-full md:w-[45%] lg:w-[40%] xl:w-[35%] h-[50vh] md:h-screen overflow-y-auto border-r border-border pb-24 shrink-0 no-scrollbar relative z-10 bg-background/90 md:bg-transparent md:backdrop-blur-none backdrop-blur-md">
        
        {/* Header / Hero */}
        <header className="p-8 md:p-12 border-b border-border flex justify-between items-end">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex-1"
          >
            <div className="text-[10px] tracking-[0.3em] uppercase opacity-50 mb-1 block">Research Archive // Adaptive Systems</div>
            <h1 className="text-3xl md:text-5xl font-light tracking-tight text-white mb-6">
              Kinetic Responsive Environment <span className="text-cyan-500 font-bold tracking-widest text-[0.4em] ml-2 px-2 py-0.5 border border-cyan-500/30 rounded align-middle inline-block -translate-y-2">V.04</span>
            </h1>
            <p className="text-muted-foreground leading-relaxed text-sm max-w-xl">
              Adaptive reuse through intelligent skins. Modulating a 19th-century industrial envelope with a non-invasive, parametrically driven kinetic system to optimize daylighting, thermal comfort, and energy efficiency.
            </p>
          </motion.div>
          <div className="text-right hidden xl:block ml-8 shrink-0">
            <p className="text-[10px] uppercase tracking-widest opacity-40 mb-1">Project Location</p>
            <p className="text-sm font-medium text-white">19th-Century Industrial Warehouse,<br/>Milan IT</p>
          </div>
        </header>

        {/* Input Parameters Controls */}
        <section className="p-8 md:p-12 border-b border-border bg-card">
          <div className="flex items-center gap-2 mb-6 text-cyan-400">
            <Activity className="w-4 h-4" />
            <h2 className="text-[10px] uppercase tracking-widest">Environmental Inputs</h2>
          </div>
          
          <div className="space-y-8">
            <Slider 
              label="Time of Day" 
              value={timeOfDay} 
              min={0} max={24} step={1} 
              unit=":00"
              onChange={setTimeOfDay} 
            />
            <Slider 
              label="Solar Radiation" 
              value={sunIntensity} 
              min={0} max={100} 
              unit=" W/m² (scaled)"
              onChange={setSunIntensity} 
            />
            <Slider 
              label="Occupancy Level" 
              value={occupancy} 
              min={0} max={100} 
              unit=" pax"
              onChange={setOccupancy} 
            />
          </div>
        </section>

        {/* System Logic Diagram */}
        <section className="p-8 md:p-12 border-b border-border">
          <h2 className="text-[10px] uppercase tracking-widest text-cyan-400 mb-6">System Logic Diagram</h2>
          <div className="bg-black/40 rounded border border-white/5 p-6 font-mono text-[9px] leading-relaxed relative overflow-hidden text-cyan-200/70">
             
             {/* Glow Accent */}
             <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

             <div className="opacity-50 mb-4">{`// Adaptive State Engine`}</div>
             <div className="">{`function`} <span className="text-white">{`calculateAperture`}</span>{`(env, pax) {`}</div>
             <div className="pl-4 mt-2">
               if (env.time &lt; 6 || env.time &gt; 20) <span className="text-white">return 0.1;</span><br/>
               if (env.radiation &gt; 70) <span className="text-white">return 0.2;</span> // minimize heat<br/>
               if (pax &gt; 70) <span className="text-white">return reqVentilation(pax);</span><br/>
             </div>
             <div className="mt-2">{`}`}</div>
             
             <div className="mt-6 flex flex-col gap-3">
               <div className="flex items-center gap-3">
                 <div className="w-6 h-6 rounded bg-card flex items-center justify-center shrink-0 border border-border">
                   <Sun className="w-3 h-3 text-muted-foreground" />
                 </div>
                 <div className="h-[1px] flex-1 bg-border relative"><ArrowRight className="w-3 h-3 absolute right-0 -top-1.5 text-muted-foreground" /></div>
                 <div className="w-8 h-8 rounded shrink-0 bg-accent/10 border border-accent flex items-center justify-center">
                   <Cpu className="w-4 h-4 text-accent" />
                 </div>
                 <div className="h-[1px] flex-1 bg-border relative"><ArrowRight className="w-3 h-3 absolute right-0 -top-1.5 text-muted-foreground" /></div>
                 <div className="w-6 h-6 rounded bg-card flex items-center justify-center shrink-0 border border-border">
                   <Maximize className="w-3 h-3 text-muted-foreground" />
                 </div>
               </div>
               <div className="flex justify-between text-[9px] text-muted-foreground mt-1">
                 <span>SENSOR INPUT</span>
                 <span>LOGIC NODE</span>
                 <span>ACTUATOR</span>
               </div>
             </div>
          </div>
        </section>

        {/* Use Cases Grid */}
        <section className="p-8 md:p-12 border-b border-border">
          <h2 className="text-[10px] uppercase tracking-widest text-cyan-400 mb-6">Scenarios</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/5 p-4 rounded-xl border border-white/10 hover:border-cyan-500/50 transition-colors cursor-pointer group" onClick={() => {setTimeOfDay(8); setSunIntensity(30); setOccupancy(20)}}>
              <Sun className="w-4 h-4 text-muted-foreground mb-3 group-hover:text-cyan-400 transition-colors" />
              <div className="text-xs font-medium mb-1">Morning</div>
              <div className="text-[10px] text-muted-foreground uppercase opacity-60">Maximize Daylight</div>
            </div>
            <div className="bg-white/5 p-4 rounded-xl border border-white/10 hover:border-cyan-500/50 transition-colors cursor-pointer group" onClick={() => {setTimeOfDay(14); setSunIntensity(90); setOccupancy(50)}}>
              <Activity className="w-4 h-4 text-muted-foreground mb-3 group-hover:text-cyan-400 transition-colors" />
              <div className="text-xs font-medium mb-1">Peak Solar</div>
              <div className="text-[10px] text-muted-foreground uppercase opacity-60">Minimize Heat Gain</div>
            </div>
            <div className="bg-white/5 p-4 rounded-xl border border-white/10 hover:border-cyan-500/50 transition-colors cursor-pointer group" onClick={() => {setTimeOfDay(18); setSunIntensity(20); setOccupancy(90)}}>
              <Users className="w-4 h-4 text-muted-foreground mb-3 group-hover:text-cyan-400 transition-colors" />
              <div className="text-xs font-medium mb-1">High Occupancy</div>
              <div className="text-[10px] text-muted-foreground uppercase opacity-60">Natural Ventilation</div>
            </div>
            <div className="bg-white/5 p-4 rounded-xl border border-white/10 hover:border-cyan-500/50 transition-colors cursor-pointer group" onClick={() => {setTimeOfDay(22); setSunIntensity(0); setOccupancy(0)}}>
              <Clock className="w-4 h-4 text-muted-foreground mb-3 group-hover:text-cyan-400 transition-colors" />
              <div className="text-xs font-medium mb-1">Night State</div>
              <div className="text-[10px] text-muted-foreground uppercase opacity-60">Thermal Retention</div>
            </div>
          </div>
        </section>

        {/* Sustainability Impact */}
        <section className="p-8 md:p-12 border-b border-border">
          <h2 className="text-[10px] uppercase tracking-widest text-cyan-400 mb-6">Sustainability Impact</h2>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <div className="text-3xl font-light text-white mb-1">-28<span className="text-sm text-white/50">%</span></div>
              <div className="text-[10px] uppercase opacity-40">HVAC Load</div>
            </div>
            <div>
               <div className="text-3xl font-light text-cyan-400 mb-1">+42<span className="text-sm text-cyan-400/50">%</span></div>
              <div className="text-[10px] uppercase opacity-40">Comfort Hours (PMV)</div>
            </div>
          </div>
          <EnergyChart />
        </section>

        {/* Tech Stack */}
        <section className="p-8 md:p-12">
          <h2 className="text-[10px] uppercase tracking-widest text-cyan-400 mb-6">Technical Stack</h2>
          <ul className="space-y-4 text-sm text-muted-foreground">
            <li className="flex items-start gap-3">
              <span className="text-cyan-500/50 font-mono mt-0.5">01</span>
              <div>
                <strong className="text-white block text-xs tracking-wide uppercase mb-1">Parametric Genesis</strong>
                Rhino + Grasshopper used for initial form-finding. Ladybug tools applied for solar radiation mapping on the historical facade.
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-cyan-500/50 font-mono mt-0.5">02</span>
              <div>
                <strong className="text-white block text-xs tracking-wide uppercase mb-1">Computational Matrix</strong>
                Custom algorithms evaluate PMV (Predicted Mean Vote) thermal comfort models against real-time API weather data.
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-cyan-500/50 font-mono mt-0.5">03</span>
              <div>
                <strong className="text-white block text-xs tracking-wide uppercase mb-1">Kinetic Actuation</strong>
                Conceptual Arduino/Firefly hardware bridge feeding data to stepper motors attached to composite louvers.
              </div>
            </li>
          </ul>
        </section>

      </div>

      {/* Right Content / 3D Viewer */}
      <div className="w-full md:flex-1 h-[50vh] md:h-screen relative bg-black shrink-0 md:shrink">
        <Scene timeOfDay={timeOfDay} sunIntensity={sunIntensity} occupancy={occupancy} />
      </div>

    </div>
  );
}

