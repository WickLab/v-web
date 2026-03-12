"use client";

import * as THREE from "three";
import { memo, useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Grid } from "@react-three/drei";

function makeGlyphTexture(
  text: string,
  opts: { fg: string; bg?: string; font?: string; w?: number; h?: number }
) {
  const w = opts.w ?? 256;
  const h = opts.h ?? 256;

  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;

  const ctx = canvas.getContext("2d")!;
  ctx.clearRect(0, 0, w, h);

  if (opts.bg) {
    ctx.fillStyle = opts.bg;
    ctx.fillRect(0, 0, w, h);
  }

  // subtle scanlines
  ctx.globalAlpha = 0.18;
  ctx.fillStyle = "#000";
  for (let y = 0; y < h; y += 6) ctx.fillRect(0, y, w, 2);
  ctx.globalAlpha = 1;

  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.font =
    opts.font ??
    "700 54px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace";
  ctx.shadowColor = opts.fg;
  ctx.shadowBlur = 18;
  ctx.fillStyle = opts.fg;

  const lines = text.split("\n");
  const lineH = 58;
  const startY = h / 2 - ((lines.length - 1) * lineH) / 2;

  lines.forEach((ln, i) => {
    ctx.fillText(ln, w / 2, startY + i * lineH);
  });

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.minFilter = THREE.LinearMipmapLinearFilter;
  tex.magFilter = THREE.LinearFilter;
  tex.generateMipmaps = true;
  return tex;
}

const PALETTE = {
  cyan: new THREE.Color("#22D3EE"),
  neonCyan: new THREE.Color("#67E8F9"),
  blue: new THREE.Color("#3B82F6"),
  violet: new THREE.Color("#8B5CF6")
};

/**
 * NEW: Pixel/Square particles everywhere (like your screenshot)
 * - does NOT change your palette
 * - uses white squares with low opacity (appear gray-ish)
 */
function PixelSquaresEverywhere() {
  const smallRef = useRef<THREE.Points>(null);
  const midRef = useRef<THREE.Points>(null);
  const bigRef = useRef<THREE.Points>(null);

  const squareTex = useMemo(() => {
    if (typeof document === "undefined") return null;

    const c = document.createElement("canvas");
    c.width = 64;
    c.height = 64;
    const ctx = c.getContext("2d")!;
    ctx.clearRect(0, 0, 64, 64);

    // hard square with a little padding (prevents edge bleeding)
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(10, 10, 44, 44);

    const t = new THREE.CanvasTexture(c);
    // keep it pixel-ish
    t.minFilter = THREE.NearestFilter;
    t.magFilter = THREE.NearestFilter;
    t.generateMipmaps = false;
    t.wrapS = THREE.ClampToEdgeWrapping;
    t.wrapT = THREE.ClampToEdgeWrapping;
    t.colorSpace = THREE.SRGBColorSpace;
    return t;
  }, []);

  const makeLayer = (count: number) => {
    const positions = new Float32Array(count * 3);
    const speeds = new Float32Array(count);
    const drifts = new Float32Array(count * 2); // dx, dz

    for (let i = 0; i < count; i++) {
      const ix = i * 3;

      // FULL coverage across hero
      positions[ix + 0] = THREE.MathUtils.randFloat(-4.2, 4.2);
      positions[ix + 1] = THREE.MathUtils.randFloat(-1.7, 3.0);
      positions[ix + 2] = THREE.MathUtils.randFloat(-3.2, 3.2);

      // slow drift (subtle)
      speeds[i] = THREE.MathUtils.randFloat(0.08, 0.35);
      drifts[i * 2 + 0] = THREE.MathUtils.randFloat(-1, 1);
      drifts[i * 2 + 1] = THREE.MathUtils.randFloat(-1, 1);
    }

    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return { geom: g, speeds, drifts };
  };

  const small = useMemo(() => makeLayer(1200), []);
  const mid = useMemo(() => makeLayer(520), []);
  const big = useMemo(() => makeLayer(180), []);

  const matSmall = useMemo(() => {
    const m = new THREE.PointsMaterial({
      map: squareTex ?? undefined,
      color: "#ffffff",
      size: 0.022,
      transparent: true,
      opacity: 0.12,
      depthWrite: false,
      blending: THREE.NormalBlending
    });
    // keeps squares crisp
    (m as any).alphaTest = 0.35;
    return m;
  }, [squareTex]);

  const matMid = useMemo(() => {
    const m = new THREE.PointsMaterial({
      map: squareTex ?? undefined,
      color: "#ffffff",
      size: 0.045,
      transparent: true,
      opacity: 0.14,
      depthWrite: false,
      blending: THREE.NormalBlending
    });
    (m as any).alphaTest = 0.35;
    return m;
  }, [squareTex]);

  const matBig = useMemo(() => {
    const m = new THREE.PointsMaterial({
      map: squareTex ?? undefined,
      color: "#ffffff",
      size: 0.075,
      transparent: true,
      opacity: 0.17,
      depthWrite: false,
      blending: THREE.NormalBlending
    });
    (m as any).alphaTest = 0.35;
    return m;
  }, [squareTex]);

  useEffect(() => {
    return () => {
      small.geom.dispose();
      mid.geom.dispose();
      big.geom.dispose();
      matSmall.dispose();
      matMid.dispose();
      matBig.dispose();
      squareTex?.dispose();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    const tick = (
      layer: { geom: THREE.BufferGeometry; speeds: Float32Array; drifts: Float32Array },
      baseSpeed: number
    ) => {
      const p = layer.geom.getAttribute("position") as THREE.BufferAttribute;
      for (let i = 0; i < p.count; i++) {
        const ix = i * 3;
        const s = layer.speeds[i] * baseSpeed;

        // gentle falling drift like pixel dust
        p.array[ix + 1] -= s * 0.008;

        // tiny sideways float
        const dx = layer.drifts[i * 2 + 0];
        const dz = layer.drifts[i * 2 + 1];
        p.array[ix + 0] += Math.sin(t * 0.18 + i * 0.11) * dx * 0.0007;
        p.array[ix + 2] += Math.cos(t * 0.16 + i * 0.09) * dz * 0.0007;

        // wrap
        if (p.array[ix + 1] < -1.9) {
          p.array[ix + 1] = 3.1;
          p.array[ix + 0] = THREE.MathUtils.randFloat(-4.2, 4.2);
          p.array[ix + 2] = THREE.MathUtils.randFloat(-3.2, 3.2);
        }
      }
      p.needsUpdate = true;
    };

    tick(small, 1.0);
    tick(mid, 1.15);
    tick(big, 1.3);

    // subtle global twinkle (no color change)
    matSmall.opacity = 0.105 + 0.035 * (0.5 + 0.5 * Math.sin(t * 0.75));
    matMid.opacity = 0.12 + 0.04 * (0.5 + 0.5 * Math.sin(t * 0.62 + 1.2));
    matBig.opacity = 0.14 + 0.05 * (0.5 + 0.5 * Math.sin(t * 0.55 + 2.1));
  });

  return (
    <group>
      <points ref={smallRef} geometry={small.geom} material={matSmall} />
      <points ref={midRef} geometry={mid.geom} material={matMid} />
      <points ref={bigRef} geometry={big.geom} material={matBig} />
    </group>
  );
}

function ParticleField() {
  const points = useRef<THREE.Points>(null);

  const { geom, speeds } = useMemo(() => {
    const count = 1500;
    const positions = new Float32Array(count * 3);
    const vel = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      const ix = i * 3;

      // keep your existing feel (slightly right-biased)
      const x = THREE.MathUtils.lerp(-2.6, 3.8, Math.pow(Math.random(), 0.62));
      const y = THREE.MathUtils.randFloat(-1.3, 2.5);
      const z = THREE.MathUtils.randFloat(-2.7, 2.7);

      positions[ix + 0] = x;
      positions[ix + 1] = y;
      positions[ix + 2] = z;

      vel[i] = THREE.MathUtils.randFloat(0.1, 0.6);
    }

    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return { geom: g, speeds: vel };
  }, []);

  const mat = useMemo(
    () =>
      new THREE.PointsMaterial({
        color: PALETTE.neonCyan,
        size: 0.02,
        transparent: true,
        opacity: 0.6,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        sizeAttenuation: true
      }),
    []
  );

  useEffect(() => {
    return () => {
      geom.dispose();
      mat.dispose();
    };
  }, [geom, mat]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const p = geom.getAttribute("position") as THREE.BufferAttribute;

    for (let i = 0; i < speeds.length; i++) {
      const ix = i * 3;
      p.array[ix + 1] += speeds[i] * 0.008;
      p.array[ix + 0] += Math.sin(t * 0.35 + i * 0.07) * 0.0006;

      if (p.array[ix + 1] > 2.7) p.array[ix + 1] = -1.4;
    }
    p.needsUpdate = true;
  });

  return <points ref={points} geometry={geom} material={mat} />;
}

function DataStreams() {
  const points = useRef<THREE.Points>(null);

  const { geom, meta } = useMemo(() => {
    const count = 560;
    const positions = new Float32Array(count * 3);
    const m = new Float32Array(count * 3); // speed, laneX, laneZ

    for (let i = 0; i < count; i++) {
      const ix = i * 3;

      const laneX = THREE.MathUtils.randFloat(-0.7, 3.3);
      const laneZ = THREE.MathUtils.randFloat(-2.0, 2.0);
      const y = THREE.MathUtils.randFloat(-1.2, 2.4);

      positions[ix + 0] = laneX + THREE.MathUtils.randFloat(-0.06, 0.06);
      positions[ix + 1] = y;
      positions[ix + 2] = laneZ + THREE.MathUtils.randFloat(-0.06, 0.06);

      m[ix + 0] = THREE.MathUtils.randFloat(0.45, 1.4);
      m[ix + 1] = laneX;
      m[ix + 2] = laneZ;
    }

    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return { geom: g, meta: m };
  }, []);

  const mat = useMemo(
    () =>
      new THREE.PointsMaterial({
        color: PALETTE.blue,
        size: 0.028,
        transparent: true,
        opacity: 0.68,
        depthWrite: false,
        blending: THREE.AdditiveBlending
      }),
    []
  );

  useEffect(() => {
    return () => {
      geom.dispose();
      mat.dispose();
    };
  }, [geom, mat]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const p = geom.getAttribute("position") as THREE.BufferAttribute;

    for (let i = 0; i < p.count; i++) {
      const ix = i * 3;
      const speed = meta[ix + 0];
      const laneX = meta[ix + 1];
      const laneZ = meta[ix + 2];

      p.array[ix + 1] += speed * 0.02;
      p.array[ix + 0] = laneX + Math.sin(t * 1.25 + i * 0.18) * 0.05;
      p.array[ix + 2] = laneZ + Math.cos(t * 1.1 + i * 0.13) * 0.05;

      if (p.array[ix + 1] > 2.8) p.array[ix + 1] = -1.5;
    }
    p.needsUpdate = true;
  });

  return <points ref={points} geometry={geom} material={mat} />;
}

function BinaryUnicodeRain() {
  const group = useRef<THREE.Group>(null);

  const textures = useMemo(() => {
    const glyphSets = [
      "0101\n1010\n0110",
      "0 1 0 1\n1 0 1 0",
      "λ ∑ ∞\n0 1 0",
      "Ψ ϕ Ω\n1011",
      "⟂ ⌁ ⌬\n0101",
      "∿ ⟡ ⟁\n1100"
    ];

    return glyphSets.map((s, i) =>
      makeGlyphTexture(s, {
        fg: i % 2 === 0 ? "#67E8F9" : "#8B5CF6",
        w: 256,
        h: 256
      })
    );
  }, []);

  const sprites = useMemo(() => {
    const count = 14;
    return Array.from({ length: count }).map((_, i) => ({
      texIndex: i % textures.length,
      pos: new THREE.Vector3(
        THREE.MathUtils.randFloat(-1.2, 3.8),
        THREE.MathUtils.randFloat(-1.0, 2.5),
        THREE.MathUtils.randFloat(-2.3, 2.3)
      ),
      speed: THREE.MathUtils.randFloat(0.08, 0.22),
      scale: THREE.MathUtils.randFloat(0.55, 0.92),
      drift: THREE.MathUtils.randFloat(0.2, 0.8)
    }));
  }, [textures.length]);

  const materials = useMemo(
    () =>
      textures.map(
        (t) =>
          new THREE.SpriteMaterial({
            map: t,
            transparent: true,
            opacity: 0.58,
            depthWrite: false,
            blending: THREE.AdditiveBlending
          })
      ),
    [textures]
  );

  useEffect(() => {
    return () => {
      materials.forEach((m) => m.dispose());
      textures.forEach((t) => t.dispose());
    };
  }, [materials, textures]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (!group.current) return;

    group.current.children.forEach((child, idx) => {
      const s = sprites[idx];
      child.position.y -= s.speed * 0.03;
      child.position.x += Math.sin(t * s.drift + idx) * 0.0008;
      child.position.z += Math.cos(t * (s.drift * 0.8) + idx) * 0.0006;

      if (child.position.y < -1.35) {
        child.position.y = 2.55;
        child.position.x = THREE.MathUtils.randFloat(-1.2, 3.8);
        child.position.z = THREE.MathUtils.randFloat(-2.3, 2.3);
      }
    });
  });

  return (
    <group ref={group}>
      {sprites.map((s, i) => (
        <sprite
          key={i}
          position={[s.pos.x, s.pos.y, s.pos.z]}
          scale={[s.scale, s.scale, 1]}
          material={materials[s.texIndex]}
        />
      ))}
    </group>
  );
}

function QuantumWaves() {
  const group = useRef<THREE.Group>(null);

  const mat = useMemo(
    () =>
      new THREE.LineBasicMaterial({
        color: PALETTE.violet,
        transparent: true,
        opacity: 0.38
      }),
    []
  );

  const makeWave = (r: number, amp: number, seg = 240) => {
    const pts: THREE.Vector3[] = [];
    for (let i = 0; i <= seg; i++) {
      const a = (i / seg) * Math.PI * 2;
      const wobble = Math.sin(a * 6) * amp;
      pts.push(
        new THREE.Vector3(
          Math.cos(a) * (r + wobble),
          Math.sin(a * 2) * amp * 0.35,
          Math.sin(a) * (r + wobble)
        )
      );
    }
    return new THREE.BufferGeometry().setFromPoints(pts);
  };

  const g1 = useMemo(() => makeWave(1.35, 0.07), []);
  const g2 = useMemo(() => makeWave(1.95, 0.05), []);
  const g3 = useMemo(() => makeWave(2.55, 0.035), []);

  useEffect(() => {
    return () => {
      g1.dispose();
      g2.dispose();
      g3.dispose();
      mat.dispose();
    };
  }, [g1, g2, g3, mat]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (!group.current) return;
    group.current.rotation.y = t * 0.08;
    group.current.rotation.x = -0.15 + Math.sin(t * 0.25) * 0.03;
    mat.opacity = 0.28 + 0.18 * (0.5 + 0.5 * Math.sin(t * 0.9));
  });

  return (
    <group ref={group} position={[0.65, 0.15, 0]}>
      <line geometry={g1} material={mat} />
      <line geometry={g2} material={mat} />
      <line geometry={g3} material={mat} />
    </group>
  );
}

function CircuitNetwork() {
  const group = useRef<THREE.Group>(null);

  const { nodes, lineGeom } = useMemo(() => {
    const nodeCount = 16;
    const n = Array.from({ length: nodeCount }).map(() => {
      return new THREE.Vector3(
        THREE.MathUtils.randFloat(-0.3, 3.2),
        THREE.MathUtils.randFloat(-0.25, 1.9),
        THREE.MathUtils.randFloat(-2.1, 2.1)
      );
    });

    const segs: THREE.Vector3[] = [];
    for (let i = 0; i < n.length; i++) {
      let bestJ = -1;
      let bestD = Infinity;
      for (let j = 0; j < n.length; j++) {
        if (i === j) continue;
        const d = n[i].distanceToSquared(n[j]);
        if (d < bestD) {
          bestD = d;
          bestJ = j;
        }
      }
      if (bestJ >= 0) segs.push(n[i].clone(), n[bestJ].clone());
    }

    return { nodes: n, lineGeom: new THREE.BufferGeometry().setFromPoints(segs) };
  }, []);

  const lineMat = useMemo(
    () =>
      new THREE.LineBasicMaterial({
        color: PALETTE.cyan,
        transparent: true,
        opacity: 0.32
      }),
    []
  );

  const nodeMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#051324"),
        emissive: PALETTE.cyan,
        emissiveIntensity: 0.55,
        metalness: 0.1,
        roughness: 0.35
      }),
    []
  );

  const nodeGeo = useMemo(() => new THREE.SphereGeometry(0.04, 16, 16), []);

  useEffect(() => {
    return () => {
      lineGeom.dispose();
      lineMat.dispose();
      nodeMat.dispose();
      nodeGeo.dispose();
    };
  }, [lineGeom, lineMat, nodeMat, nodeGeo]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (!group.current) return;
    group.current.rotation.y = t * 0.06;
    lineMat.opacity = 0.18 + 0.18 * (0.5 + 0.5 * Math.sin(t * 1.1));
  });

  return (
    <group ref={group} position={[0.45, 0.05, 0]}>
      <lineSegments geometry={lineGeom} material={lineMat} />
      {nodes.map((p, i) => (
        <mesh key={i} geometry={nodeGeo} material={nodeMat} position={[p.x, p.y, p.z]} />
      ))}
    </group>
  );
}

function DataCenterBackground() {
  const root = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (!root.current) return;
    root.current.rotation.y = t * 0.03;
  });

  return (
    <group ref={root}>
      {/* NEW: pixel squares everywhere (like your screenshot) */}
      <PixelSquaresEverywhere />

      {/* holographic grid floor */}
      <group position={[0.7, -0.75, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <Grid
          args={[12, 12]}
          cellSize={0.6}
          cellThickness={0.7}
          cellColor="#0B2A44"
          sectionSize={2.4}
          sectionThickness={1.1}
          sectionColor="#1D4ED8"
          fadeDistance={9}
          fadeStrength={1}
          infiniteGrid={true}
        />
      </group>

      {/* atmospheric layers (unchanged colors) */}
      <QuantumWaves />
      <CircuitNetwork />
      <ParticleField />
      <DataStreams />
      <BinaryUnicodeRain />
    </group>
  );
}

export default memo(DataCenterBackground);