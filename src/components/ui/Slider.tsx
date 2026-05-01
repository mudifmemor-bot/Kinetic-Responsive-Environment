import React from 'react';
import { cn } from '../../lib/utils';

export function Slider({ 
  value, 
  min = 0, 
  max = 100, 
  step = 1, 
  onChange, 
  label, 
  unit = "",
  className 
}: { 
  value: number; 
  min?: number; 
  max?: number; 
  step?: number; 
  onChange: (val: number) => void; 
  label: string; 
  unit?: string;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col space-y-3", className)}>
      <div className="flex justify-between items-end">
        <label className="mono-label text-muted-foreground">{label}</label>
        <span className="font-mono text-sm text-foreground">
          {value}{unit}
        </span>
      </div>
      <div className="relative h-1 bg-border rounded-full flex items-center">
        {/* Track */}
        <div 
          className="absolute h-full bg-accent rounded-full transition-all"
          style={{ width: `${((value - min) / (max - min)) * 100}%` }}
        />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="absolute w-full h-full opacity-0 cursor-pointer"
        />
        {/* Thumb */}
        <div 
          className="absolute w-3 h-3 bg-white border border-accent rounded-full pointer-events-none transform -translate-x-1/2"
          style={{ left: `${((value - min) / (max - min)) * 100}%` }}
        />
      </div>
    </div>
  );
}
