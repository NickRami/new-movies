import { Canvas } from '@react-three/fiber';
import { Environment, Float, OrbitControls } from '@react-three/drei';
import { Search as SearchIcon, Film } from 'lucide-react';
import SearchBar from './SearchBar';

function CinemaScene() {
  return (
    <>
      {/* Luces principales */}
      <ambientLight intensity={0.6} />
      <directionalLight position={[4, 6, 4]} intensity={1.6} />
      <spotLight
        position={[-5, 6, 2]}
        angle={0.5}
        penumbra={0.5}
        intensity={1.8}
        castShadow
      />

      {/* Pantalla de cine */}
      <mesh position={[0, 0.2, 0]} rotation={[0, 0.15, 0]}>
        <boxGeometry args={[4.2, 2.4, 0.15]} />
        <meshStandardMaterial
          color="#020617"
          metalness={0.6}
          roughness={0.25}
        />
      </mesh>

      {/* Brillo de pantalla */}
      <mesh position={[0, 0.24, 0.09]} rotation={[0, 0.15, 0]}>
        <planeGeometry args={[3.9, 2.1]} />
        <meshBasicMaterial color="#fb7185" opacity={0.45} transparent />
      </mesh>

      {/* Base / suelo */}
      <mesh position={[0, -1.2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[12, 12]} />
        <meshStandardMaterial
          color="#020617"
          metalness={0.2}
          roughness={0.9}
        />
      </mesh>

      {/* Elementos flotando (carrete y luces) */}
      <Float speed={1.4} rotationIntensity={0.9} floatIntensity={0.9}>
        <mesh position={[-1.6, 1.1, 0.6]} castShadow>
          <cylinderGeometry args={[0.5, 0.5, 0.6, 32]} />
          <meshStandardMaterial color="#f97316" metalness={0.8} roughness={0.2} />
        </mesh>
      </Float>

      <Float speed={1.8} rotationIntensity={0.6} floatIntensity={1.1}>
        <mesh position={[1.7, 1.4, -0.4]} castShadow>
          <sphereGeometry args={[0.45, 32, 32]} />
          <meshStandardMaterial
            color="#6366f1"
            emissive="#4f46e5"
            emissiveIntensity={1}
            metalness={0.6}
            roughness={0.25}
          />
        </mesh>
      </Float>

      <Environment preset="sunset" />
      <OrbitControls
        enablePan={false}
        enableZoom={false}
        autoRotate
        autoRotateSpeed={0.6}
        maxPolarAngle={Math.PI / 2.1}
      />
    </>
  );
}

export default function SearchHero3D() {
  return (
    <section className="relative mb-10 overflow-hidden rounded-3xl border border-rose-500/30 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 shadow-[0_0_80px_rgba(251,113,133,0.35)] transition-transform duration-500 hover:scale-[1.01]">
      {/* Capa 3D */}
      <div className="h-[380px] w-full md:h-[460px] lg:h-[520px]">
        <Canvas camera={{ position: [0, 1.6, 6], fov: 45 }}>
          <CinemaScene />
        </Canvas>
      </div>

      {/* Degradado para mejorar contraste del contenido */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 via-40% to-transparent" />

      {/* Contenido de texto + barra de búsqueda */}
      <div className="pointer-events-none absolute inset-0 flex items-center">
        <div className="pointer-events-auto w-full px-4 py-6 md:px-8 lg:px-10">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="max-w-xl space-y-3">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/40 px-3 py-1 text-xs font-medium text-slate-100 backdrop-blur-md">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-rose-500/80 text-white shadow shadow-rose-500/50">
                  <SearchIcon className="h-3.5 w-3.5" />
                </span>
                <span className="uppercase tracking-[0.22em] text-[0.62rem] text-slate-200">
                  Búsqueda avanzada
                </span>
              </div>
              <h1 className="text-2xl font-bold leading-tight text-slate-50 md:text-3xl lg:text-4xl">
                Encuentra tu próxima película
                <span className="block bg-gradient-to-r from-rose-400 via-purple-400 to-sky-400 bg-clip-text text-transparent">
                  entre miles de historias
                </span>
              </h1>
              <p className="text-sm text-slate-200/90 md:text-base">
                Filtra por título, género o palabra clave y explora el catálogo de TMDB
                con una experiencia visual pensada para amantes del cine.
              </p>
              <div className="flex items-center gap-2 text-xs text-slate-300/80">
                <Film className="h-3.5 w-3.5 text-slate-300" />
                <span>
                  Resultados en tiempo real, sin recargar la página, optimizados para streaming.
                </span>
              </div>
            </div>

            <div className="w-full max-w-md">
              <div className="rounded-2xl bg-black/60 p-3 shadow-xl shadow-black/60 backdrop-blur-md">
                <SearchBar />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


