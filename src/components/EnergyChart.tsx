import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { time: '06:00', traditional: 5, adaptive: 5 },
  { time: '09:00', traditional: 25, adaptive: 15 },
  { time: '12:00', traditional: 50, adaptive: 20 },
  { time: '15:00', traditional: 45, adaptive: 22 },
  { time: '18:00', traditional: 30, adaptive: 12 },
  { time: '21:00', traditional: 10, adaptive: 8 },
];

export function EnergyChart() {
  return (
    <div className="h-64 w-full mt-8">
      <h4 className="mono-label text-muted-foreground mb-4">Daily Heat Gain (kW)</h4>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 0, right: 0, left: -20, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#222" vertical={false} />
          <XAxis 
            dataKey="time" 
            stroke="#888" 
            fontSize={12} 
            tickLine={false} 
            axisLine={false} 
            fontFamily="JetBrains Mono"
          />
          <YAxis 
            stroke="#888" 
            fontSize={12} 
            tickLine={false} 
            axisLine={false} 
            fontFamily="JetBrains Mono"
          />
          <Tooltip 
            contentStyle={{ backgroundColor: '#0A0A0B', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '4px', fontFamily: 'JetBrains Mono', fontSize: '12px' }}
            itemStyle={{ color: '#cbd5e1' }}
          />
          <Area 
            type="monotone" 
            dataKey="traditional" 
            stroke="#475569" 
            fill="#1e293b" 
            strokeWidth={2}
            name="Traditional Façade"
          />
          <Area 
            type="monotone" 
            dataKey="adaptive" 
            stroke="#22d3ee" 
            fill="rgba(34, 211, 238, 0.2)" 
            strokeWidth={2}
            name="Adaptive Skin"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
