import React, { useState, useRef, useEffect, Suspense } from 'react';
import { Canvas, useLoader } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { RotateCw, ZoomIn, Info } from 'lucide-react';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import { MeshoptDecoder } from 'meshoptimizer';

// ─── Error Boundary ────────────────────────────────
class ModelErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  render() {
    if (this.state.hasError) {
      // Fallback cube when model fails to load
      return (
        <mesh>
          <boxGeometry args={[0.8, 0.8, 0.8]} />
          <meshStandardMaterial color="#cda45e" />
        </mesh>
      );
    }
    return this.props.children;
  }
}

// ─── GLB Model Loader (no infinite loops) ──────────
function GltfModel({ path }) {
  const gltf = useLoader(
    GLTFLoader,
    path,
    (loader) => {
      loader.setMeshoptDecoder(MeshoptDecoder);

      const dracoLoader = new DRACOLoader();
      dracoLoader.setDecoderPath(
        'https://www.gstatic.com/draco/versioned/decoders/1.5.6/'
      );

      loader.setDRACOLoader(dracoLoader);
    }
  );

  return <primitive object={gltf.scene} scale={1.5} />;
}

// ─── Loader Spinner ──────────────────────────────
function ModelLoader() {
  return (
    <mesh>
      <boxGeometry args={[0.3, 0.3, 0.3]} />
      <meshStandardMaterial color="#cda45e" wireframe />
    </mesh>
  );
}

// ─── Main Viewer ──────────────────────────────────
export default function ThreeDViewer({ item }) {
  const [viewMode, setViewMode] = useState('3d');
  const [autoRotate, setAutoRotate] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [photoAngle, setPhotoAngle] = useState(0);
  const dragStartRef = useRef(0);
  const orbitalRef = useRef();

  const handleResetZoom = () => {
    if (orbitalRef.current) orbitalRef.current.reset();
  };

  // 360° drag handlers (unchanged)
  const handlePhotoMouseDown = (e) => {
    setIsDragging(true);
    dragStartRef.current = e.clientX;
  };
  const handlePhotoMouseMove = (e) => {
    if (!isDragging) return;
    const delta = e.clientX - dragStartRef.current;
    setPhotoAngle((prev) => (prev + delta * 1.5) % 360);
    dragStartRef.current = e.clientX;
  };
  const handlePhotoMouseUp = () => setIsDragging(false);

  const handlePhotoTouchStart = (e) => {
    setIsDragging(true);
    dragStartRef.current = e.touches[0].clientX;
  };
  const handlePhotoTouchMove = (e) => {
    if (!isDragging) return;
    const delta = e.touches[0].clientX - dragStartRef.current;
    setPhotoAngle((prev) => (prev + delta * 1.5) % 360);
    dragStartRef.current = e.touches[0].clientX;
  };

  useEffect(() => {
    const up = () => setIsDragging(false);
    window.addEventListener('mouseup', up);
    return () => window.removeEventListener('mouseup', up);
  }, []);

  // Ensure correct path: remove "public/" if accidentally added
  let modelPath = item?.glbPath || '/models/default.glb';
  if (modelPath.startsWith('public/')) {
    modelPath = modelPath.replace('public/', '/');
  }
  console.log('🔍 3D Viewer using model path:', modelPath);

  return (
    <div className="threed-viewer-container">
      {/* Mode Tabs */}
      <div className="viewer-mode-tabs">
        <button
          className={`mode-tab ${viewMode === '3d' ? 'active' : ''}`}
          onClick={() => setViewMode('3d')}
        >
          Interactive 3D
        </button>
        <button
          className={`mode-tab ${viewMode === '360' ? 'active' : ''}`}
          onClick={() => setViewMode('360')}
        >
          360° Photo
        </button>
      </div>

      <div className="viewer-instructions">
        {viewMode === '3d' ? 'Drag to rotate • Scroll to zoom' : 'Drag left/right to spin 360°'}
      </div>

      <div className="canvas-wrapper">
        {viewMode === '3d' ? (
          <Canvas
            shadows
            camera={{ position: [0, 1.5, 2.5], fov: 45 }}
            style={{ width: '100%', height: '100%' }}
          >
            <ambientLight intensity={0.5} color="#fff8e7" />
            <directionalLight
              position={[5, 10, 5]}
              intensity={1.2}
              castShadow
              shadow-mapSize-width={1024}
              shadow-mapSize-height={1024}
              shadow-bias={-0.0001}
            />
            <pointLight position={[-5, 5, -5]} intensity={0.8} color="#cda45e" />

            <Suspense fallback={<ModelLoader />}>
              <ModelErrorBoundary>
                <GltfModel path={modelPath} />
              </ModelErrorBoundary>
              {/* Pedestal shadow */}
              <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.4, 0]} receiveShadow>
                <planeGeometry args={[10, 10]} />
                <shadowMaterial opacity={0.4} />
              </mesh>
            </Suspense>

            <OrbitControls
              ref={orbitalRef}
              enableZoom
              minDistance={1.2}
              maxDistance={3.5}
              enablePan={false}
              autoRotate={autoRotate}
              autoRotateSpeed={3.0}
              makeDefault
            />
          </Canvas>
        ) : (
          // 360° photo mode (unchanged)
          <div
            className="threed-fallback-container"
            onMouseDown={handlePhotoMouseDown}
            onMouseMove={handlePhotoMouseMove}
            onMouseUp={handlePhotoMouseUp}
            onTouchStart={handlePhotoTouchStart}
            onTouchMove={handlePhotoTouchMove}
            onTouchEnd={handlePhotoMouseUp}
          >
            <div
              style={{
                position: 'absolute',
                width: '260px',
                height: '30px',
                background: 'rgba(0,0,0,0.6)',
                borderRadius: '50%',
                bottom: '120px',
                filter: 'blur(10px)',
                zIndex: 1,
              }}
            />
            <div
              style={{
                position: 'absolute',
                width: '280px',
                height: '20px',
                background: 'linear-gradient(to right, #141210, #2c2520)',
                border: '1px solid var(--border-gold)',
                borderRadius: '50%',
                bottom: '125px',
                zIndex: 2,
              }}
            />
            <div
              style={{
                perspective: '1000px',
                transformStyle: 'preserve-3d',
                zIndex: 3,
                marginBottom: '40px',
              }}
            >
              <img
                src={item?.image}
                alt={item?.name || 'Dish'}
                className="fallback-image"
                style={{
                  transform: `rotateY(${photoAngle}deg)`,
                  transition: isDragging ? 'none' : 'transform 0.3s ease-out',
                }}
              />
            </div>
            <div className="fallback-helper">
              Angle: {Math.round(photoAngle < 0 ? 360 + photoAngle : photoAngle)}° (Drag to Rotate)
            </div>
          </div>
        )}
      </div>

      {/* Controls Bar */}
      <div className="viewer-controls-bar">
        {viewMode === '3d' && (
          <button
            className={`viewer-ctrl-btn ${autoRotate ? 'active' : ''}`}
            onClick={() => setAutoRotate(!autoRotate)}
            title={autoRotate ? 'Pause Spin' : 'Auto Spin'}
          >
            <RotateCw size={18} />
          </button>
        )}
        <button
          className="viewer-ctrl-btn"
          onClick={viewMode === '3d' ? handleResetZoom : () => setPhotoAngle(0)}
          title="Reset Zoom / Angle"
        >
          <ZoomIn size={18} />
        </button>
        <div style={{ borderLeft: '1px solid var(--border-gold)', margin: '0 4px' }} />
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            color: 'var(--text-muted)',
            fontSize: '0.75rem',
            gap: '4px',
            cursor: 'default',
          }}
        >
          <Info size={14} style={{ color: 'var(--color-gold)' }} />
          <span>TEMPLATE</span>
        </div>
      </div>
    </div>
  );
}