# Dossier de modélisation SketchUp — Module Studio 3,60 × 4,80 m (V1)

> Source de vérité : `tools/plans/specs.json` (cotes vérifiées par 21 contrôles
> automatiques). Ce dossier remplace les cotes de l'image de référence, qui
> étaient incohérentes. Unités : **millimètres**.
> ⚠️ Hypothèse V1 — à valider par ingénieur structure agréé.

---

## 1. Avant de commencer dans SketchUp

- Modèle en **mm** (Fenêtre → Infos du modèle → Unités).
- **1 composant SketchUp par référence** (P1, P2, poteau…) : tu le dessines
  une fois, tu le copies partout. Nomme-les exactement `P1`, `P2`, `POTEAU`…
- Tags (calques) conseillés : `STRUCTURE` (poteaux, P9), `PANNEAUX`,
  `MENUISERIES` (P3, P4), `TOITURE`, `ASSISE`, `INTERIEUR`, `TECHNIQUE` (P8).
- Les 3 règles du système (tout le modèle doit les respecter) :
  1. **Trame 1200** : tout est multiple de 1200 en plan (cloisons
     intérieures : sous-module 600 admis).
  2. **Empilage** : les panneaux horizontaux s'empilent entre poteaux,
     glissés dans les rainures. Aucun panneau ne porte sur un autre mur.
  3. **Zéro coupe** : une ouverture occupe une travée entière ; les
     réservations sont moulées (jamais de découpe).

## 2. Bibliothèque de composants (à modéliser en premier)

### POTEAU — béton 150 × 150 × h. 2900
- Section 150×150, hauteur 2900 (pied au sol fini, tête à +2900).
- **2 rainures verticales** sur faces opposées (poteau courant) ou sur
  2 faces à 90° (poteau d'angle) : largeur **70**, profondeur **40**,
  toute hauteur. (Détail réel : trapèze fond 70 / ouverture 78, chanfreins
  5×5 — inutile en maquette, un créneau rectangulaire 70×40 suffit.)
- Tête : platine 100×100×8 encastrée (pour l'équerre de toiture).
- Chanfreins d'arêtes 15×15 (optionnel en maquette).

### P1 — panneau mural standard : 1200 × 600 × ép. 60
- Le panneau de base. Chanfreins 15×15 sur arêtes vues (optionnel).
- Longueur réelle en rainures = 1200 − 2×5 de jeu : modélise 1200, c'est
  la cote nominale d'axe à axe moins le poteau.

### P2 — claustra ventilé : 1200 × 300 × ép. 60
- Bande ajourée ≥40 % (motif libre en maquette : grille de vides).
- Toujours en DERNIER rang, sous la tête de poteau.

### P3 — fenêtre jalousies : 1200 × 1200
- Cadre alu + lames de 100 inclinées 45° (12 lames).
- Se pose à la place des rangs 3 et 4 de P1 → **allège à 1400** du sol.

### P4 — porte : passage 900 × 2100 (+ imposte 1200 × 300)
- Vantail 900×2100 ép. 40, posé au sol (seuil ≤ 20), centré dans sa travée.
- Au-dessus : imposte vitrée 1200×300, puis complément jusqu'à la ligne
  claustra (détail exact : planche PL-01 dans `docs/plans/`).

### P5 — casquette brise-soleil : 1200 × 400 × ép. 80
- Pente 10 % vers l'extérieur, au-dessus de chaque P3 (niveau 2600).

### P6 — grille de ventilation basse : 600 × 200 × ép. 60
- En pied de mur (dans la plinthe), pour la ventilation traversante.

### P7 — panneau de plafond léger : 1200 × 600 [ép. TBV, ~40 HYP]
- Composite alu/PU, posé à ~2700 (plafond intérieur sous la lame d'air).

### P8 — kit technique mural (module M3)
- Citerne 500 L sur châssis acier contre le mur long ARRIÈRE, sous le
  débord de toiture + coffret électrique. Cotes châssis [TBV] — en
  maquette : cylindre Ø800×h.1000 posé sur châssis à ~1800 [HYP].

### P9 — linteau (grande entrée) : 2550 × 300 × 150
- Pour ouverture 2 travées. Appui 150 sur chaque tête de poteau,
  passage libre 2100. (Pas utilisé sur le Studio de base.)

### P1G — P1 à guichet
- Un P1 standard avec réservation moulée 300×200, allège 1000, à ≥150 des
  bords. (Module gardiennage uniquement.)

## 3. La coupe verticale — LES niveaux à respecter partout

| De → à (mm) | Quoi |
|---|---|
| 0 | Sol fini |
| 0 → 200 | **Plinthe** (soubassement béton, avec P6 éventuels) |
| 200 → 800 | P1 — rang 1 |
| 800 → 1400 | P1 — rang 2 |
| 1400 → 2000 | P1 — rang 3 *(remplacé par P3 si fenêtre)* |
| 2000 → 2600 | P1 — rang 4 *(remplacé par P3 si fenêtre)* |
| 2600 → 2900 | **P2 claustra** (rang ventilé) |
| 2900 | Tête de poteau |
| 2900 → 3200 | **Lame d'air ventilée 300** (ouverte, sous toiture) |
| ~3200 | Toiture (point haut avant, pente 5 % vers l'arrière) |

Hors-tout ≈ **3200**. Vérification : 200 + 4×600 + 300 = 2900 = poteau ✓.

## 4. Recette du module Studio 3,60 × 4,80 (3 × 4 travées)

### 4.1 Poteaux : 14, aux intersections du périmètre
Axes X : 0 · 1200 · 2400 · 3600 (4 axes). Axes Y : 0 · 1200 · 2400 ·
3600 · 4800 (5 axes). Un poteau à chaque intersection DU PÉRIMÈTRE
(aucun poteau intérieur) : les 4 angles + 2 intermédiaires sur chaque
petit côté + 3 intermédiaires sur chaque grand côté = **14 poteaux**,
centrés sur les axes.

### 4.2 Remplissage des 14 travées de façade [composition HYP à valider]
- **Avant (3,60, côté Y=0)** : P3 / **P4 porte** / P3 — casquette P5
  au-dessus de chaque P3.
- **Latéral droit (4,80)** : P1 plein / P3 / P1 plein / P1 plein.
- **Arrière (3,60)** : P1 pleins + **P8** (citerne + coffret) plaqué au
  mur, 2×P6 en plinthe (face à la salle d'eau et à la kitchenette).
- **Latéral gauche (4,80)** : 4 travées P1 pleines (mur de la salle d'eau).
- TOUTES les travées reçoivent le claustra P2 en rang haut (2600→2900),
  y compris au-dessus de la porte et des fenêtres.

### 4.3 Intérieur [HYP]
- **Salle d'eau** dans l'angle arrière-gauche : 1800 × 1800 (3×600 —
  conforme sous-module), cloisons non structurelles h. 2400 (P1 empilés
  sur profils U 100×100 fixés au sol), douche + WC + lave-mains.
- **Kitchenette** contre le mur arrière (évier sous la citerne P8 pour
  minimiser la plomberie), plan de 600 de profondeur.
- Plafond P7 à 2700 sur tout le module.

### 4.4 Assise (2 variantes — modéliser la LOCATION en premier)
- **Location (skid)** : 2 rails longitudinaux sous les grands côtés +
  5 traverses (entraxe 1200), pieds réglables M24 (±50) sur platines
  150×150×10 posées sur plots béton 400×400×400. Sections des profils
  [TBV] — en maquette : rails UPN 120 [HYP].
- **Vendu** : poteaux scellés 400 dans plots, puis dalle 100 coulée
  autour (le sol fini = dessus de dalle).

### 4.5 Toiture « parasol »
- Plan de tôle unique, **pente 5 % vers l'arrière** : haut à l'avant.
- Débords : **avant 800** (auvent d'entrée) · côtés 600 · arrière 600.
  → plan de toiture : (3600+600+600) × (4800+800+600) = **4800 × 6200**.
- Structure : équerres L50×50×5 boulonnées sur les têtes de poteaux,
  pannes C/Z entraxe max 1200, tôle ondulée 76/18 blanche.
- Gouttière Ø125 sur le bord bas (arrière) + descente PVC Ø80.

## 5. Ordre de modélisation conseillé

1. Trace la grille d'axes au sol (3600 × 4800, pas de 1200).
2. Modélise les composants du §2 (chacun = 1 composant nommé).
3. Pose les 14 poteaux → §4.1.
4. Remplis UNE travée type (plinthe + 4×P1 + P2) puis copie sur les
   travées pleines ; remplace rangs 3-4 par P3 où il faut, la travée
   porte par P4+imposte.
5. Assise skid, puis toiture (§4.5), puis intérieur (§4.3), puis P8.
6. Vérifie à la fin : toute cote en plan ÷ 1200 = nombre entier ;
   niveaux conformes au tableau §3.

## 6. Ce qui était faux dans l'image de référence

1. Le plan de niveau montrait **5 axes pour 3,60 m** — il en faut 4
   (3 travées). Les élévations latérales à 4 travées (4,80) étaient bonnes.
2. Les fenêtres doivent être **P3 à allège 1400** (rangs 3-4), pas à
   mi-hauteur quelconque.
3. La cloison de salle d'eau doit tomber sur le **sous-module 600**
   (1800 = 3×600 ✓ sur la profondeur — à caler aussi en largeur).
4. Le tableau composants de l'image était proche mais non validé — seules
   les cotes du présent dossier (issues de specs.json) font foi.

---
⚠️ Document de travail V1 — géométrie conforme à specs.json (index V1).
Composition des façades et aménagement intérieur du Studio : hypothèses à
valider. Validation requise : ingénieur structure agréé + architecte.
