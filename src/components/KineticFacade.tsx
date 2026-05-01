import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface KineticFacadeProps {
  timeOfDay: number; // 0 to 24
  sunIntensity: number; // 0 to 100
  occupancy: number; // 0 to 100
}

export function KineticFacade({ timeOfDay, sunIntensity, occupancy }: KineticFacadeProps) {
  const groupRef = useRef<THREE.Group>(null);
  const rows = 12;
  const cols = 20;
  const panelSize = 1;
  const spacing = 1.1;

  // Calculate global target angle based on parameters
  // 0 = fully closed, Math.PI / 2 = fully open
  const calculateTargetAngle = () => {
    let angle = Math.PI / 4; // Default half-open

    // Morning (6-10) -> Open for daylight
    // Noon (10-16) -> depends on sun intensity
    // Evening (16-20) -> Open for ventilation
    // Night -> Closed

    if (timeOfDay < 6 || timeOfDay > 20) {
      angle = 0.1; // Mostly closed at night
    } else if (timeOfDay >= 6 && timeOfDay < 10) {
      angle = Math.PI / 2.5; // Open for morning light
    } else if (timeOfDay >= 16 && timeOfDay <= 20) {
      angle = Math.PI / 2; // Open for evening breeze
    } else {
      // Noon logic
      if (sunIntensity > 70) {
        angle = 0.2; // Close to block heat
      } else {
        angle = Math.PI / 3;
      }
    }

    // Override or adjust for high occupancy (need ventilation)
    if (occupancy > 70 && angle < Math.PI / 4) {
      angle = Math.PI / 4; // Force at least partially open for air
    }

    return angle;
  };

  const globalTargetAngle = calculateTargetAngle();

  const panels = useMemo(() => {
    const temp = [];
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        temp.push({
          position: [
            (c - cols / 2) * spacing * panelSize,
            (r - rows / 2) * spacing * panelSize,
            0
          ] as [number, number, number],
          currentAngle: Math.PI / 4, // Initial angle
          // Add some noise to base rotation
          noiseOffset: Math.random() * Math.PI * 2,
        });
      }
    }
    return temp;
  }, [rows, cols, spacing, panelSize]);

  // Using a single instanced mesh would be faster, but let's try individual meshes first for simplicity
  // or actually, InstancedMesh is much better for 240 panels. Let's use InstancedMesh.

  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame((state, delta) => {
    if (!meshRef.current) return;

    let i = 0;
    const time = state.clock.getElapsedTime();

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const panel = panels[i];
        
        // Calculate localized variation (e.g., wind effect or organic wave)
        const wave = Math.sin(time * 0.5 + panel.position[0] * 0.5 + panel.position[1] * 0.2) * 0.2;
        
        // Target angle with local variation
        const targetAngle = Math.max(0, Math.min(Math.PI / 2, globalTargetAngle + wave));

        dummy.position.set(...panel.position);
        
        // Smooth transition using damp
        panel.currentAngle = THREE.MathUtils.damp(panel.currentAngle, targetAngle, 4, delta);
        
        // Calculate open ratio for both deformation and color blending
        const openRatio = Math.max(0, Math.min(1, panel.currentAngle / (Math.PI / 2)));

        // Simulated wind turbulence for organic micro-movements
        const turbulenceX = Math.sin(time * 2.0 + panel.position[0]) * 0.05 * (openRatio + 0.1); // More turbulence when open
        const turbulenceZ = Math.cos(time * 1.5 + panel.position[1]) * 0.05 * (openRatio + 0.1);

        dummy.rotation.set(
          turbulenceX, 
          panel.currentAngle, 
          turbulenceZ
        );

        // Parametric material deformation (e.g., pressure-driven inflation or composite bending)
        // 1. Thickness inflates based on how closed it is (building pressure) + wind gusts
        const targetInflation = 1 + ((Math.PI / 2 - panel.currentAngle) * 2) + Math.abs(wave) * 4;
        
        // 2. Subtle aspect ratio stretching to simulate tensile strain
        const tensileStrainX = 1 - Math.abs(wave) * 0.15;
        const tensileStrainY = 1 + Math.abs(wave) * 0.15;

        dummy.scale.set(tensileStrainX, tensileStrainY, targetInflation);

        dummy.updateMatrix();
        meshRef.current.setMatrixAt(i, dummy.matrix);
        
        // change color slightly based on state
        const color = new THREE.Color();
        // Blend between dark closed state and bright open state based on current angle
        color.setHex(0x222222).lerp(new THREE.Color(0xf5f5f5), openRatio);
        
        // Add accent color based on wave
        if (wave > 0.15) {
            color.lerp(new THREE.Color(0x22d3ee), wave * 1.5); // increased wave influence slightly
        }
        
        meshRef.current.setColorAt(i, color);

        i++;
      }
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
    if (meshRef.current.instanceColor) {
      meshRef.current.instanceColor.needsUpdate = true;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Background building structure */}
      <mesh position={[0, 0, -1]}>
        <planeGeometry args={[cols * spacing, rows * spacing]} />
        <meshStandardMaterial color="#0a0a0a" />
      </mesh>

      <instancedMesh ref={meshRef} args={[undefined, undefined, rows * cols]}>
        <boxGeometry args={[panelSize * 0.9, panelSize * 0.9, 0.05]} />
        <meshStandardMaterial metalness={0.5} roughness={0.2} color="#f5f5f5" />
      </instancedMesh>
    </group>
  );
}
