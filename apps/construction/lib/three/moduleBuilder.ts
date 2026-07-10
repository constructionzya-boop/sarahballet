// Génération procédurale du module Noéma, fidèle au système constructif
// (trame 1,20 m, panneaux horizontaux 1200×600×60, toit parasol). Pur : aucune
// dépendance React. Réutilisé à l'identique par la scène 3D et les tests.

import * as THREE from "three";
import type { BaseType, Level, OptionId, ProjectId } from "../pricing";

/** Config visuelle du module — dérivée de l'état du configurateur (source unique). */
export type ModuleConfig = {
  preset: ProjectId;
  extraTravees: number;
  level: Level;
  base: BaseType;
  options: readonly OptionId[];
};

export const BAY = 1.2; // trame (m)
const PANEL_W = 1.2;
const PANEL_H = 0.6;
const PANEL_T = 0.06;
const PLINTH_H = 0.2;
const WALL_H = 2.7; // 4×0.6 (P1) + 0.3 (P2)
const COURSES = 4; // panneaux P1 empilés
const JOINT = 0.002; // micro-joint visible (2 mm)

type Side = "front" | "back" | "left" | "right";
type Opening = "wall" | "door" | "window";

/** Nombre de travées dans chaque direction selon le preset. */
export function bays(config: ModuleConfig): { w: number; d: number } {
  if (config.preset === "local-pro") return { w: 2, d: 2 };
  return { w: 3, d: 4 + Math.max(0, config.extraTravees) };
}

/** Composition des ouvertures d'un côté (par travée), selon le preset. */
function sideOpenings(config: ModuleConfig, side: Side, w: number, d: number): Opening[] {
  const n = side === "front" || side === "back" ? w : d;
  const wall = (): Opening[] => Array.from({ length: n }, () => "wall");

  if (side === "front") {
    if (config.preset === "commerce") return ["window", "door", "window"].slice(0, n) as Opening[];
    if (config.preset === "studio") return ["door", "window", "window"].slice(0, n) as Opening[];
    // local-pro : porte + fenêtre en façade
    return ["door", "window"].slice(0, n) as Opening[];
  }
  // Gardiennage : fenêtres sur les côtés (3 faces vitrées)
  if (config.preset === "local-pro" && (side === "left" || side === "right")) {
    return ["window", "wall"].slice(0, n) as Opening[];
  }
  return wall();
}

export interface ModuleCounts {
  poteaux: number;
  p1: number;
  p2: number;
  panels: number; // p1 + p2
  doors: number;
  windows: number;
}

/** Comptage déterministe des éléments (testé). */
export function moduleCounts(config: ModuleConfig): ModuleCounts {
  const { w, d } = bays(config);
  const poteaux = 2 * (w + 1) + 2 * (d + 1) - 4;

  let p1 = 0;
  let p2 = 0;
  let doors = 0;
  let windows = 0;
  const sides: Side[] = ["front", "back", "left", "right"];
  for (const side of sides) {
    for (const op of sideOpenings(config, side, w, d)) {
      if (op === "wall") {
        p1 += COURSES; // 4 P1
        p2 += 1; // bandeau claustra
      } else if (op === "door") {
        doors += 1; // P4 = porte + imposte + claustra intégrés
      } else {
        windows += 1;
        p2 += 1; // claustra haut conservé au-dessus de la fenêtre
      }
    }
  }
  return { poteaux, p1, p2, panels: p1 + p2, doors, windows };
}

// ————————————————————————————————————————————————————————————————
// Matériaux procéduraux (aucune texture réseau).
// ————————————————————————————————————————————————————————————————

function claustraTexture(): THREE.CanvasTexture {
  const s = 128;
  const c = document.createElement("canvas");
  c.width = c.height = s;
  const ctx = c.getContext("2d")!;
  ctx.clearRect(0, 0, s, s);
  ctx.fillStyle = "#000a21";
  // Motif de losanges perforés (opaque = béton, transparent = ajour).
  const step = s / 4;
  for (let y = 0; y <= s; y += step) {
    for (let x = 0; x <= s; x += step) {
      ctx.beginPath();
      ctx.moveTo(x, y - step * 0.32);
      ctx.lineTo(x + step * 0.32, y);
      ctx.lineTo(x, y + step * 0.32);
      ctx.lineTo(x - step * 0.32, y);
      ctx.closePath();
      ctx.fill();
    }
  }
  const tex = new THREE.CanvasTexture(c);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  return tex;
}

type Materials = {
  concrete: THREE.MeshStandardMaterial;
  steel: THREE.MeshStandardMaterial;
  sheet: THREE.MeshStandardMaterial;
  orange: THREE.MeshStandardMaterial;
  sand: THREE.MeshStandardMaterial;
  claustra: THREE.MeshStandardMaterial;
  mesh: THREE.MeshStandardMaterial;
  claustraTex: THREE.CanvasTexture;
};

function makeMaterials(): Materials {
  const claustraTex = claustraTexture();
  return {
    concrete: new THREE.MeshStandardMaterial({ color: 0xd8d4cc, roughness: 0.9, metalness: 0 }),
    steel: new THREE.MeshStandardMaterial({ color: 0x000a21, roughness: 0.4, metalness: 0.6 }),
    sheet: new THREE.MeshStandardMaterial({ color: 0xf3efe6, roughness: 0.35, metalness: 0.3 }),
    orange: new THREE.MeshStandardMaterial({ color: 0xff3311, roughness: 0.5, metalness: 0.1 }),
    sand: new THREE.MeshStandardMaterial({ color: 0xebddcf, roughness: 0.95, metalness: 0 }),
    claustra: new THREE.MeshStandardMaterial({
      color: 0x000a21,
      roughness: 0.8,
      alphaMap: claustraTex,
      transparent: true,
      side: THREE.DoubleSide,
    }),
    mesh: new THREE.MeshStandardMaterial({
      color: 0x888888,
      roughness: 1,
      transparent: true,
      opacity: 0.35,
      side: THREE.DoubleSide,
    }),
    claustraTex,
  };
}

// ————————————————————————————————————————————————————————————————
// Construction du Group.
// ————————————————————————————————————————————————————————————————

export interface BuiltModule {
  group: THREE.Group;
  dispose: () => void;
  counts: ModuleCounts;
  size: { width: number; depth: number; height: number };
}

/** Construit le module 3D depuis la config. Appelé à chaque changement (rebuild). */
export function buildModule(config: ModuleConfig): BuiltModule {
  const { w, d } = bays(config);
  const width = w * BAY;
  const depth = d * BAY;
  const height = PLINTH_H + WALL_H + 0.3; // + bandeau toiture
  const group = new THREE.Group();
  const mats = makeMaterials();
  const geometries: THREE.BufferGeometry[] = [];
  const counts = moduleCounts(config);

  const halfW = width / 2;
  const halfD = depth / 2;

  // — Plinthe (Sand, débord + marche à l'entrée)
  const plinthGeo = new THREE.BoxGeometry(width + 0.3, PLINTH_H, depth + 0.3);
  geometries.push(plinthGeo);
  const plinth = new THREE.Mesh(plinthGeo, mats.sand);
  plinth.position.y = PLINTH_H / 2;
  plinth.receiveShadow = true;
  group.add(plinth);

  const stepGeo = new THREE.BoxGeometry(1.0, PLINTH_H / 2, 0.3);
  geometries.push(stepGeo);
  const step = new THREE.Mesh(stepGeo, mats.sand);
  step.position.set(0, PLINTH_H / 4, -halfD - 0.28);
  group.add(step);

  // — Skid démontable (base « location ») : traverses acier sous chaque ligne de poteaux
  if (config.base === "location") {
    const skidGeo = new THREE.BoxGeometry(width + 0.2, 0.12, 0.12);
    geometries.push(skidGeo);
    for (let j = 0; j <= d; j++) {
      const skid = new THREE.Mesh(skidGeo, mats.steel);
      skid.position.set(0, -0.06, j * BAY - halfD);
      group.add(skid);
    }
  }

  // — Poteaux (InstancedMesh) sur les nœuds du périmètre
  const poteauGeo = new THREE.BoxGeometry(0.15, WALL_H, 0.15);
  geometries.push(poteauGeo);
  const poteaux = new THREE.InstancedMesh(poteauGeo, mats.steel, counts.poteaux);
  poteaux.castShadow = true;
  const m = new THREE.Matrix4();
  let pi = 0;
  for (let i = 0; i <= w; i++) {
    for (let j = 0; j <= d; j++) {
      const perimeter = i === 0 || i === w || j === 0 || j === d;
      if (!perimeter) continue;
      m.makeTranslation(i * BAY - halfW, PLINTH_H + WALL_H / 2, j * BAY - halfD);
      poteaux.setMatrixAt(pi++, m);
    }
  }
  poteaux.instanceMatrix.needsUpdate = true;
  group.add(poteaux);

  // — Panneaux muraux P1 (InstancedMesh unique, toutes faces)
  const panelGeo = new THREE.BoxGeometry(PANEL_W - JOINT, PANEL_H - JOINT, PANEL_T);
  geometries.push(panelGeo);
  const p1Mesh = new THREE.InstancedMesh(panelGeo, mats.concrete, counts.p1);
  p1Mesh.castShadow = true;
  p1Mesh.receiveShadow = true;

  const claustraGeo = new THREE.PlaneGeometry(PANEL_W, 0.3);
  geometries.push(claustraGeo);
  const p2Mesh = new THREE.InstancedMesh(claustraGeo, mats.claustra, counts.p2);

  const q = new THREE.Quaternion();
  const euler = new THREE.Euler();
  const pos = new THREE.Vector3();
  const scl = new THREE.Vector3(1, 1, 1);

  let p1i = 0;
  let p2i = 0;
  const sides: Side[] = ["front", "back", "left", "right"];
  const doorMeshes: THREE.Object3D[] = [];
  const windowMeshes: THREE.Object3D[] = [];

  for (const side of sides) {
    const along = side === "front" || side === "back" ? w : d;
    const ops = sideOpenings(config, side, w, d);
    for (let k = 0; k < along; k++) {
      const op = ops[k] ?? "wall";
      // Centre de la travée + orientation du panneau selon la face
      let cx = 0;
      let cz = 0;
      let rotY = 0;
      if (side === "front") {
        cx = (k + 0.5) * BAY - halfW;
        cz = -halfD;
      } else if (side === "back") {
        cx = (k + 0.5) * BAY - halfW;
        cz = halfD;
      } else if (side === "left") {
        cz = (k + 0.5) * BAY - halfD;
        cx = -halfW;
        rotY = Math.PI / 2;
      } else {
        cz = (k + 0.5) * BAY - halfD;
        cx = halfW;
        rotY = Math.PI / 2;
      }
      euler.set(0, rotY, 0);
      q.setFromEuler(euler);

      if (op === "wall") {
        for (let c = 0; c < COURSES; c++) {
          const y = PLINTH_H + PANEL_H / 2 + c * PANEL_H;
          pos.set(cx, y, cz);
          m.compose(pos, q, scl);
          p1Mesh.setMatrixAt(p1i++, m);
        }
        // Bandeau claustra P2 en tête
        pos.set(cx, PLINTH_H + COURSES * PANEL_H + 0.15, cz);
        m.compose(pos, q, scl);
        p2Mesh.setMatrixAt(p2i++, m);
      } else if (op === "door") {
        doorMeshes.push(makeDoor(cx, cz, rotY, mats, geometries));
      } else {
        // Fenêtre + claustra haut conservé
        windowMeshes.push(makeWindow(cx, cz, rotY, mats, geometries, config));
        pos.set(cx, PLINTH_H + COURSES * PANEL_H + 0.15, cz);
        m.compose(pos, q, scl);
        p2Mesh.setMatrixAt(p2i++, m);
      }
    }
  }
  p1Mesh.instanceMatrix.needsUpdate = true;
  p2Mesh.instanceMatrix.needsUpdate = true;
  group.add(p1Mesh, p2Mesh);
  doorMeshes.forEach((o) => group.add(o));
  windowMeshes.forEach((o) => group.add(o));

  // — Cellule d'eau intérieure (preset studio) : cloison en angle arrière-gauche
  if (config.preset === "studio") {
    const cellW = 1.2;
    const cellD = 2.4;
    const wallA = new THREE.BoxGeometry(cellW, WALL_H * 0.9, PANEL_T);
    const wallB = new THREE.BoxGeometry(PANEL_T, WALL_H * 0.9, cellD);
    geometries.push(wallA, wallB);
    const cx = -halfW + cellW / 2 + 0.1;
    const cz = halfD - cellD / 2 - 0.1;
    const ma = new THREE.Mesh(wallA, mats.concrete);
    ma.position.set(cx, PLINTH_H + (WALL_H * 0.9) / 2, cz - cellD / 2);
    const mb = new THREE.Mesh(wallB, mats.concrete);
    mb.position.set(cx + cellW / 2, PLINTH_H + (WALL_H * 0.9) / 2, cz);
    group.add(ma, mb);
  }

  // — Toit parasol : tôle mono-pente ondulée, débords 600 mm sur 4 côtés
  const roof = makeParasolRoof(width, depth, mats, geometries);
  group.add(roof);

  // — Sous-face : lame d'air + bande de moustiquaire (300 mm) au sommet des murs
  const meshGeo = new THREE.PlaneGeometry(width, 0.3);
  geometries.push(meshGeo);
  const screenFront = new THREE.Mesh(meshGeo, mats.mesh);
  screenFront.position.set(0, PLINTH_H + WALL_H + 0.15, -halfD);
  const screenBack = screenFront.clone();
  screenBack.position.z = halfD;
  group.add(screenFront, screenBack);

  // — Gouttière arrière + descente
  const gutterGeo = new THREE.CylinderGeometry(0.05, 0.05, width + 1.2, 8, 1, true);
  geometries.push(gutterGeo);
  const gutter = new THREE.Mesh(gutterGeo, mats.steel);
  gutter.rotation.z = Math.PI / 2;
  gutter.position.set(0, height - 0.1, halfD + 0.55);
  const downGeo = new THREE.CylinderGeometry(0.04, 0.04, height, 8);
  geometries.push(downGeo);
  const down = new THREE.Mesh(downGeo, mats.steel);
  down.position.set(halfW + 0.5, height / 2, halfD + 0.55);
  group.add(gutter, down);

  const dispose = () => {
    geometries.forEach((g) => g.dispose());
    Object.values(mats).forEach((x) => {
      if (x instanceof THREE.Material) x.dispose();
    });
    mats.claustraTex.dispose();
    group.traverse((obj) => {
      if (obj instanceof THREE.InstancedMesh) obj.dispose();
    });
  };

  return { group, dispose, counts, size: { width, depth, height } };
}

function makeDoor(
  cx: number,
  cz: number,
  rotY: number,
  mats: Materials,
  geometries: THREE.BufferGeometry[],
): THREE.Group {
  const g = new THREE.Group();
  const doorGeo = new THREE.BoxGeometry(0.9, 2.1, 0.05);
  const impostGeo = new THREE.BoxGeometry(0.9, 0.3, 0.05);
  geometries.push(doorGeo, impostGeo);
  const door = new THREE.Mesh(doorGeo, mats.steel);
  door.position.y = PLINTH_H + 2.1 / 2;
  const impost = new THREE.Mesh(impostGeo, mats.orange);
  impost.position.y = PLINTH_H + 2.1 + 0.15;
  g.add(door, impost);
  g.position.set(cx, 0, cz);
  g.rotation.y = rotY;
  return g;
}

function makeWindow(
  cx: number,
  cz: number,
  rotY: number,
  mats: Materials,
  geometries: THREE.BufferGeometry[],
  config: ModuleConfig,
): THREE.Group {
  const g = new THREE.Group();
  const frameGeo = new THREE.BoxGeometry(1.2, 1.2, 0.08);
  geometries.push(frameGeo);
  const frame = new THREE.Mesh(frameGeo, mats.steel);
  const sill = PLINTH_H + 0.9;
  frame.position.y = sill + 0.6;
  g.add(frame);
  // Persiennes : 6 lamelles inclinées
  const slatGeo = new THREE.BoxGeometry(1.05, 0.14, 0.02);
  geometries.push(slatGeo);
  for (let i = 0; i < 6; i++) {
    const slat = new THREE.Mesh(slatGeo, mats.sheet);
    slat.position.set(0, sill + 0.12 + i * 0.19, 0.03);
    slat.rotation.x = -0.5;
    g.add(slat);
  }
  // Casquette P5 au-dessus
  const hoodGeo = new THREE.BoxGeometry(1.2, 0.08, 0.4);
  geometries.push(hoodGeo);
  const hood = new THREE.Mesh(hoodGeo, mats.concrete);
  hood.position.set(0, sill + 1.25, 0.2);
  hood.rotation.x = 0.1;
  g.add(hood);
  void config;
  g.position.set(cx, 0, cz);
  g.rotation.y = rotY;
  return g;
}

function makeParasolRoof(
  width: number,
  depth: number,
  mats: Materials,
  geometries: THREE.BufferGeometry[],
): THREE.Group {
  const g = new THREE.Group();
  const rw = width + 1.2; // débords 600 mm
  const rd = depth + 1.2;
  const geo = new THREE.PlaneGeometry(rw, rd, 12, 12);
  // Ondulation procédurale (tôle nervurée)
  const posAttr = geo.getAttribute("position") as THREE.BufferAttribute;
  for (let i = 0; i < posAttr.count; i++) {
    const x = posAttr.getX(i);
    posAttr.setZ(i, Math.sin(x * 6) * 0.015);
  }
  geo.computeVertexNormals();
  geometries.push(geo);
  const roof = new THREE.Mesh(geo, mats.sheet);
  roof.rotation.x = -Math.PI / 2;
  roof.rotation.z = 0;
  roof.position.y = PLINTH_H + WALL_H + 0.35;
  // Mono-pente vers l'arrière (~8 %)
  roof.rotation.x = -Math.PI / 2 + 0.08;
  roof.castShadow = true;
  g.add(roof);
  return g;
}
