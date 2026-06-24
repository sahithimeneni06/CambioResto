import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

// 1. BURGER MODEL
export function BurgerModel() {
  const groupRef = useRef();
  
  // Slow idle bounce animation
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(state.clock.getElapsedTime() * 1.5) * 0.05 - 0.2;
    }
  });

  return (
    <group ref={groupRef} scale={1.2}>
      {/* Top Bun */}
      <mesh position={[0, 0.45, 0]} castShadow receiveShadow>
        <sphereGeometry args={[0.5, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#b67f43" roughness={0.3} metalness={0.1} />
      </mesh>
      
      {/* Sesame Seeds */}
      <group position={[0, 0.45, 0]}>
        {[...Array(20)].map((_, i) => {
          const theta = Math.random() * Math.PI * 2;
          const phi = Math.random() * (Math.PI / 3);
          const r = 0.505;
          const x = r * Math.sin(phi) * Math.cos(theta);
          const y = r * Math.cos(phi);
          const z = r * Math.sin(phi) * Math.sin(theta);
          return (
            <mesh key={i} position={[x, y, z]} rotation={[phi, theta, 0]}>
              <boxGeometry args={[0.015, 0.005, 0.03]} />
              <meshStandardMaterial color="#f0ede4" roughness={0.5} />
            </mesh>
          );
        })}
      </group>

      {/* Lettuce */}
      <mesh position={[0, 0.35, 0]} rotation={[0.1, 0, 0.2]} castShadow receiveShadow>
        <cylinderGeometry args={[0.55, 0.52, 0.06, 16]} />
        <meshStandardMaterial color="#4f8541" roughness={0.8} />
      </mesh>

      {/* Tomato Slices */}
      <mesh position={[-0.15, 0.28, 0.1]} rotation={[0.05, 0.2, 0]} castShadow>
        <cylinderGeometry args={[0.22, 0.22, 0.05, 16]} />
        <meshStandardMaterial color="#cc3333" roughness={0.5} />
      </mesh>
      <mesh position={[0.2, 0.28, -0.1]} rotation={[-0.05, -0.2, 0]} castShadow>
        <cylinderGeometry args={[0.22, 0.22, 0.05, 16]} />
        <meshStandardMaterial color="#cc3333" roughness={0.5} />
      </mesh>

      {/* Cheese Melt */}
      <mesh position={[0, 0.22, 0]} rotation={[0.02, 0.5, -0.02]} castShadow>
        <boxGeometry args={[0.85, 0.03, 0.85]} />
        <meshStandardMaterial color="#f1c40f" roughness={0.6} />
      </mesh>

      {/* Patty */}
      <mesh position={[0, 0.1, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.49, 0.49, 0.16, 24]} />
        <meshStandardMaterial color="#4e311f" roughness={0.9} bumpScale={0.05} />
      </mesh>

      {/* Bottom Bun */}
      <mesh position={[0, -0.06, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.5, 0.5, 0.12, 32]} />
        <meshStandardMaterial color="#b67f43" roughness={0.4} />
      </mesh>
    </group>
  );
}

// 2. PIZZA MODEL
export function PizzaModel() {
  const groupRef = useRef();

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(state.clock.getElapsedTime() * 1.5) * 0.03 - 0.1;
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.1; // slow rotate
    }
  });

  return (
    <group ref={groupRef} scale={1.2}>
      {/* Pizza Crust */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} castShadow receiveShadow>
        <torusGeometry args={[0.58, 0.08, 16, 48]} />
        <meshStandardMaterial color="#c68a4c" roughness={0.6} />
      </mesh>

      {/* Pizza Base Dough */}
      <mesh position={[0, -0.01, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <cylinderGeometry args={[0.58, 0.58, 0.04, 32]} />
        <meshStandardMaterial color="#deb887" roughness={0.7} />
      </mesh>

      {/* Tomato Sauce Layer */}
      <mesh position={[0, 0.015, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <cylinderGeometry args={[0.53, 0.53, 0.015, 32]} />
        <meshStandardMaterial color="#b22222" roughness={0.5} />
      </mesh>

      {/* Cheese Melt Layer */}
      <mesh position={[0, 0.024, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <cylinderGeometry args={[0.51, 0.51, 0.01, 32]} />
        <meshStandardMaterial color="#f6e3b4" roughness={0.4} />
      </mesh>

      {/* Basil Leaves */}
      <group position={[0, 0.03, 0]}>
        {[...Array(6)].map((_, i) => {
          const angle = (i * Math.PI * 2) / 6 + Math.random() * 0.2;
          const dist = 0.2 + Math.random() * 0.25;
          const x = Math.cos(angle) * dist;
          const z = Math.sin(angle) * dist;
          return (
            <mesh key={i} position={[x, 0, z]} rotation={[0.1, Math.random() * Math.PI, 0.05]} castShadow>
              <boxGeometry args={[0.09, 0.005, 0.14]} />
              <meshStandardMaterial color="#2e6f40" roughness={0.7} />
            </mesh>
          );
        })}
      </group>

      {/* Cherry Tomatoes */}
      <group position={[0, 0.035, 0]}>
        {[...Array(5)].map((_, i) => {
          const angle = (i * Math.PI * 2) / 5 + 0.5;
          const dist = 0.28;
          const x = Math.cos(angle) * dist;
          const z = Math.sin(angle) * dist;
          return (
            <mesh key={i} position={[x, 0, z]} castShadow>
              <sphereGeometry args={[0.05, 8, 8]} />
              <meshStandardMaterial color="#e74c3c" roughness={0.3} />
            </mesh>
          );
        })}
      </group>
    </group>
  );
}

// 3. BREAD MODEL
export function BreadModel({ cheesy = false }) {
  const groupRef = useRef();

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(state.clock.getElapsedTime() * 1.5) * 0.04 - 0.1;
    }
  });

  return (
    <group ref={groupRef} scale={1.2}>
      {/* Loaf shape */}
      <mesh castShadow receiveShadow>
        <sphereGeometry args={[0.6, 32, 16]} />
        <meshStandardMaterial 
          color={cheesy ? "#e67e22" : "#935116"} 
          roughness={0.7} 
          scale={[1, 0.5, 0.6]} 
        />
      </mesh>

      {/* Crust cuts */}
      {!cheesy && (
        <group position={[0, 0.16, 0]}>
          <mesh rotation={[0, 0.3, 0.1]}>
            <boxGeometry args={[0.02, 0.04, 0.4]} />
            <meshStandardMaterial color="#deb887" roughness={0.8} />
          </mesh>
          <mesh position={[-0.2, -0.02, 0]} rotation={[0, 0.3, 0.1]}>
            <boxGeometry args={[0.02, 0.04, 0.35]} />
            <meshStandardMaterial color="#deb887" roughness={0.8} />
          </mesh>
          <mesh position={[0.2, 0.02, 0]} rotation={[0, 0.3, 0.1]}>
            <boxGeometry args={[0.02, 0.04, 0.35]} />
            <meshStandardMaterial color="#deb887" roughness={0.8} />
          </mesh>
        </group>
      )}

      {/* Melted Cheese (for cheesy garlic pull apart) */}
      {cheesy && (
        <group position={[0, 0.05, 0]}>
          <mesh position={[0, 0.08, 0]} rotation={[0.1, 0, 0]}>
            <boxGeometry args={[0.7, 0.06, 0.3]} />
            <meshStandardMaterial color="#f4d03f" roughness={0.3} />
          </mesh>
          {/* Garlic bits */}
          {[...Array(8)].map((_, i) => (
            <mesh key={i} position={[(Math.random() - 0.5) * 0.5, 0.12, (Math.random() - 0.5) * 0.2]}>
              <boxGeometry args={[0.02, 0.02, 0.02]} />
              <meshStandardMaterial color="#7d6608" />
            </mesh>
          ))}
        </group>
      )}

      {/* Rosemary Herbs */}
      <group position={[0, 0.15, 0]}>
        {[...Array(12)].map((_, i) => (
          <mesh 
            key={i} 
            position={[(Math.random() - 0.5) * 0.6, 0, (Math.random() - 0.5) * 0.3]}
            rotation={[Math.random() * 0.4, Math.random() * Math.PI, Math.random() * 0.4]}
          >
            <boxGeometry args={[0.006, 0.006, 0.08]} />
            <meshStandardMaterial color="#1e4620" roughness={0.9} />
          </mesh>
        ))}
      </group>
    </group>
  );
}

// 4. DESSERT MODEL (LAVA CAKE / TIRAMISU / CHEESECAKE)
export function DessertModel({ styleType = 'cake' }) {
  const groupRef = useRef();

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(state.clock.getElapsedTime() * 1.5) * 0.04 - 0.15;
    }
  });

  if (styleType === 'tiramisu') {
    return (
      <group ref={groupRef} scale={1.2}>
        {/* Layer 1 - Sourdough biscuit */}
        <mesh position={[0, 0, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.6, 0.08, 0.6]} />
          <meshStandardMaterial color="#a0522d" roughness={0.8} />
        </mesh>
        {/* Layer 2 - Cream */}
        <mesh position={[0, 0.06, 0]} castShadow>
          <boxGeometry args={[0.61, 0.05, 0.61]} />
          <meshStandardMaterial color="#fffdd0" roughness={0.4} />
        </mesh>
        {/* Layer 3 - Biscuit */}
        <mesh position={[0, 0.11, 0]} castShadow>
          <boxGeometry args={[0.6, 0.05, 0.6]} />
          <meshStandardMaterial color="#a0522d" roughness={0.8} />
        </mesh>
        {/* Layer 4 - Top Cream */}
        <mesh position={[0, 0.16, 0]} castShadow>
          <boxGeometry args={[0.61, 0.05, 0.61]} />
          <meshStandardMaterial color="#fffdd0" roughness={0.4} />
        </mesh>
        {/* Cocoa dust */}
        <mesh position={[0, 0.19, 0]} receiveShadow>
          <boxGeometry args={[0.605, 0.01, 0.605]} />
          <meshStandardMaterial color="#3d1f11" roughness={0.9} />
        </mesh>
      </group>
    );
  }

  if (styleType === 'cheesecake') {
    return (
      <group ref={groupRef} scale={1.2} rotation={[0, -0.6, 0]}>
        {/* Cake wedge / sector */}
        {/* Base Graham Crust */}
        <mesh position={[0, 0, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.5, 0.5, 0.06, 32, 1, false, 0, Math.PI * 0.4]} />
          <meshStandardMaterial color="#cd853f" roughness={0.9} />
        </mesh>
        {/* Cheese layer */}
        <mesh position={[0, 0.15, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.49, 0.49, 0.24, 32, 1, false, 0, Math.PI * 0.4]} />
          <meshStandardMaterial color="#fffff0" roughness={0.4} />
        </mesh>
        {/* Strawberry Compote Sauce */}
        <mesh position={[0, 0.272, 0]} castShadow>
          <cylinderGeometry args={[0.485, 0.485, 0.015, 32, 1, false, 0, Math.PI * 0.4]} />
          <meshStandardMaterial color="#b22222" roughness={0.2} metalness={0.1} />
        </mesh>
      </group>
    );
  }

  // DEFAULT: CHOCOLATE LAVA CAKE
  return (
    <group ref={groupRef} scale={1.2}>
      {/* Plate */}
      <mesh position={[0, -0.12, 0]} receiveShadow>
        <cylinderGeometry args={[0.7, 0.72, 0.03, 32]} />
        <meshStandardMaterial color="#111" roughness={0.4} metalness={0.2} />
      </mesh>

      {/* Cake Dome */}
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.32, 0.42, 0.22, 24]} />
        <meshStandardMaterial color="#3b1f11" roughness={0.8} />
      </mesh>

      {/* Molten Lava Drip */}
      <mesh position={[0, 0.1, 0]} castShadow>
        <sphereGeometry args={[0.26, 16, 12, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#221108" roughness={0.1} metalness={0.1} />
      </mesh>
      <mesh position={[0.1, 0.04, 0.2]} rotation={[0.5, 0, 0]}>
        <cylinderGeometry args={[0.03, 0.01, 0.12, 8]} />
        <meshStandardMaterial color="#221108" roughness={0.15} />
      </mesh>
      <mesh position={[-0.15, 0.01, 0.18]} rotation={[0.4, 0, -0.3]}>
        <cylinderGeometry args={[0.02, 0.01, 0.14, 8]} />
        <meshStandardMaterial color="#221108" roughness={0.15} />
      </mesh>

      {/* Vanilla Gelato Scoop */}
      <mesh position={[-0.32, -0.02, -0.22]} castShadow>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshStandardMaterial color="#fffdeb" roughness={0.5} />
      </mesh>
    </group>
  );
}

// 5. BEVERAGE MODEL (DRINK GLASS / MATCHA / OLD FASHIONED)
export function BeverageModel({ styleType = 'drink' }) {
  const groupRef = useRef();

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(state.clock.getElapsedTime() * 1.5) * 0.03 - 0.25;
    }
  });

  const getLiquidColor = () => {
    switch (styleType) {
      case 'drink-smoke': return '#b75220'; // Amber whiskey
      case 'drink-matcha': return '#6d8c52'; // Pastel green matcha
      default: return '#e67e22'; // Citrus orange punch
    }
  };

  return (
    <group ref={groupRef} scale={1.2}>
      {/* Outer Glass Container */}
      <mesh position={[0, 0.4, 0]} castShadow>
        <cylinderGeometry args={[0.26, 0.22, 0.8, 24, 1, true]} />
        <meshPhysicalMaterial 
          color="#ffffff" 
          transparent 
          opacity={0.25} 
          roughness={0.05} 
          metalness={0.1}
          transmission={0.9} 
          ior={1.5}
          thickness={0.05}
          side={2}
        />
      </mesh>

      {/* Glass Base Solid */}
      <mesh position={[0, 0.025, 0]} castShadow>
        <cylinderGeometry args={[0.222, 0.22, 0.05, 24]} />
        <meshPhysicalMaterial 
          color="#ffffff" 
          transparent 
          opacity={0.3} 
          roughness={0.05}
          transmission={0.9} 
        />
      </mesh>

      {/* Liquid Contents */}
      <mesh position={[0, 0.35, 0]} receiveShadow>
        <cylinderGeometry args={[0.245, 0.215, 0.65, 20]} />
        <meshStandardMaterial 
          color={getLiquidColor()} 
          roughness={0.1} 
          transparent 
          opacity={styleType === 'drink-matcha' ? 0.95 : 0.75} 
        />
      </mesh>

      {/* Ice Cubes inside liquid */}
      <group position={[0, 0.3, 0]}>
        <mesh position={[0.06, 0.12, 0.06]} rotation={[0.4, 0.3, 0.5]}>
          <boxGeometry args={[0.13, 0.13, 0.13]} />
          <meshPhysicalMaterial color="#ffffff" transparent opacity={0.3} roughness={0.1} transmission={0.9} />
        </mesh>
        <mesh position={[-0.08, -0.05, -0.05]} rotation={[0.8, 0.1, 0.2]}>
          <boxGeometry args={[0.12, 0.12, 0.12]} />
          <meshPhysicalMaterial color="#ffffff" transparent opacity={0.3} roughness={0.1} transmission={0.9} />
        </mesh>
      </group>

      {/* Straw */}
      <mesh position={[-0.04, 0.52, -0.04]} rotation={[0.12, 0, -0.22]} castShadow>
        <cylinderGeometry args={[0.015, 0.015, 0.9, 8]} />
        <meshStandardMaterial color={styleType === 'drink-smoke' ? '#111111' : '#b85a3c'} roughness={0.4} />
      </mesh>

      {/* Lemon Wheel garnish */}
      {styleType !== 'drink-matcha' && (
        <mesh position={[0.23, 0.72, 0]} rotation={[0.2, 0, Math.PI / 2]} castShadow>
          <cylinderGeometry args={[0.16, 0.16, 0.02, 16]} />
          <meshStandardMaterial color="#f1c40f" roughness={0.4} />
        </mesh>
      )}
    </group>
  );
}
