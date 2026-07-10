# 📐 MISSION D'ÉTUDE — PANNEAU P1 & POTEAU RAINURÉ

> **Émetteur :** Jeremy — Noéma Construction
> **Destinataire :** NOEMA_ENGINEER_AGENT (ingénierie bâtiment)
> **Date :** 2026-07-10 · **Réf :** MISSION-ING-001 · **Priorité :** P0 (bloquant moules)
> **Règle de travail :** distinguer [FAIT]/[HYP]/[À VÉRIFIER] comme dans ton diagnostic V1.
> Toute valeur finale sera injectée dans `tools/plans/specs.json` (source de vérité
> du bureau d'études) et restera « à valider par ingénieur structure agréé + LBTP ».

---

## PARTIE A — MISES À JOUR DU PROJET DEPUIS TON DIAGNOSTIC V1

Ton diagnostic (D1-D11, P0-P2) a été exploité. Voici ce qui est maintenant **FIGÉ** :

### A.1 Décisions D1-D11 tranchées
- **D1 trame** : 1200 mm ; hauteur mur 2700 = 4×P1(600) + P2(300) ; plinthe 200 ;
  lame d'air ventilée 300 ; **hors-tout 3200**.
- **D2 levage** : **MANUPORTÉ** (2-4 pers., zéro engin) — validé par analyse de
  2 chantiers réels (Brésil/Sorocaba : dalle coulée ; Inde : montage à sec).
  ❌ Panneaux verticaux pleine hauteur interdits.
- **D3 sections (HYP à valider — OBJET DE CETTE MISSION)** : panneau 1200×600×60 ;
  poteau 150×150 h.2900.
- **D6 stabilité** : encastrement pied + chaînage par toiture « parasol » (équerres
  acier en tête de chaque poteau, insert 100×100×8 + 2×M12).
- **D7 fondations — 2 variantes commerciales** : « Vendu » (poteau scellé 400 +
  dalle 100 ST25 coulée autour) / « Location » (skid démontable : 5 traverses,
  pieds M24 réglables, platines boulonnées) — le module loué est DÉMONTABLE et
  RÉCUPÉRABLE (cœur du business model).
- **D8 toiture** : « TOIT PARASOL » — tôle ondulée 76/18 galva 0,5 peinte blanche
  (SRI élevé), pente ≥5 %, débords 600 (800 en façade avant), lame d'air 300 +
  moustiquaire, fixations EPDM (toutes ondes en rives), gouttière Ø125 + descente Ø80.
- **D9 joints** : horizontal 10 mm (fond de joint Ø15 + PU classe 25 % + larmier
  10×10 moulé) ; vertical : rainure avec garniture 20×10 + PU 10×10 en face ext.
- **D11 catalogue fermé** : P1→P9 + P1G (voir A.2).

### A.2 Catalogue composants (état V1)
| Réf | Composant | Dim. (mm) | Poids est. |
|---|---|---|---|
| P1 | Panneau mural | 1200×600×60, treillis ST25 central [HYP], 2 douilles M10 | ~104 kg |
| P1G | P1 avec réservation guichet MOULÉE 300×200, allège 1000 (cours n°2, gardes 150 vérifiées) | idem | ~100 kg |
| P2 | Claustra ventilé ≥40 % + moustiquaire inox + 3Ø12 | 1200×300×60 | ~32 kg |
| P3 | Persiennes acier lames 100@45°, allège 1400 | 1200×1200 | ~35 kg |
| P4 | Porte acier + imposte 300 | 900×2100 | ~55 kg |
| P5 | Casquette brise-soleil, pente 10 %, goutte d'eau à 25 | 1200×400×80 | ~88 kg |
| P6 | Grille basse ventilation | 600×200×60 | ~12 kg |
| P9 | **Linteau** (baie commerce 2 travées) — appui 150 plein sur têtes de poteaux | **2550**×300×150 | ~275 kg ⚠ |
| Poteau | 2 rainures latérales **70×40** chanfrein 5×5 | 150×150×2900 | ~157 kg |

### A.3 Corrections issues du contrôle de cohérence automatisé (21/21 checks OK)
1. **Rainure élargie 60 → 70 mm** = panneau 60 + jeu de pose 2×5 (engagement
   effectif 35 = profondeur 40 − 5 de fond).
2. **P9 allongé 2400 → 2550** = 2250 libre structurel + 2×150 d'appui plein ;
   passage libre 2100 après coulisses de rideau (65+10/côté).

### A.4 Modules définis (planches PL-01→PL-05 disponibles dans docs/plans/)
- **NOEMA ONE 17** : 3600×4800 (standard commerce/studio, cellule d'eau 1200×2400).
- **Box Commerce grande entrée** : baie 2 travées sous linteau P9.
- **Sanitaire public** : 2400×3600, cloison NON structurelle à 1800 (sous-module
  600), h.2400 arrêtée sous claustra, poteaux U 100×100 [À VÉRIFIER].
- **Gardiennage** : 2400×2400, 3×P3, guichet P1G.
- Tolérance fabrication ±3 mm ; jeu de pose 5 mm/côté ; chanfreins 15×15.

### A.5 Outillage d'étude à ta disposition (repo GitHub)
`tools/plans/specs.json` (toutes les valeurs), `check.mjs` (21 contrôles de
cohérence bloquants), `render.mjs` (régénère les 5 planches PL-01→05).
**Tes valeurs finales seront injectées dans specs.json → indice V2 automatique.**

---

## PARTIE B — LA MISSION : ÉTUDE COMPLÈTE PANNEAU + POTEAU

Objectif : remplacer toutes les [HYP] géométrie/matériau par des valeurs
**calculées, justifiées et testables**, avant commande des moules en Chine.

### B.0 ⚠ DEUX ALERTES DÉTECTÉES À TRANCHER EN PREMIER

**ALERTE 1 — Conflit d'enrobage dans le P1 de 60 mm.**
Enrobage visé 30 mm (exposition tropicale/côtière) est **géométriquement
impossible** avec un treillis central dans 60 mm : (60 − Ø5)/2 ≈ 27 mm de
chaque côté au MIEUX, et un enrobage 30 des deux faces exigerait t ≥ 65+Ø.
Options à évaluer et trancher :
a) passer le panneau à **70 mm** (poids ~121 kg — impact manuporté !) ;
b) garder 60 mm avec **treillis galvanisé** ou inox et enrobage réduit ~25 ;
c) **béton fibré** (fibres PP + métalliques ou verre AR) sans treillis ;
d) enrobage dissymétrique (30 ext / 20 int) + peinture barrière face ext.
→ Donne la solution retenue avec justification durabilité 30 ans.

**ALERTE 2 — Âme résiduelle du poteau courant.**
Deux rainures opposées de 40 de profondeur dans 150 laissent une âme de
**70×150 seulement** entre fonds de rainures. Poteau d'angle : rainures sur
faces ADJACENTES (section en L). Vérifier flexion composée + torsion sous vent
(le poteau est l'élément porteur principal : encastré en pied, tenu en tête par
l'équerre toiture). Options : rainure 30 de profondeur (engagement 25 — étanchéité ?),
poteau 175×150, ou armature renforcée. → Section et ferraillage définitifs.

### B.1 Étude du PANNEAU P1 (largeur × longueur × épaisseur)
1. **Portée réelle** : 1130 entre fonds de rainures (appuis verticaux continus
   2 côtés, bords haut/bas libres avec joint 10). Modèle : plaque appuyée 2 côtés.
2. **Cas de charge à couvrir** :
   - vent pression/dépression [À VÉRIFIER : vitesse de base CI/Gabon — SODEXAM ;
     à défaut proposer une valeur enveloppe justifiée type 120-150 km/h rafale] ;
   - choc corps mou 400 J / corps dur 10 J (occupation humaine) ;
   - charge horizontale d'appui 0,5 kN/m à 1,2 m (personnes) ;
   - MANUTENTION (souvent dimensionnant) : démoulage à 16-24 h (fck(t) réduit !),
     retournement, levage 2 douilles M10 à 300 des bords, transport sur chant,
     pose manuportée à 4 (positions de prise réelles).
3. **Flèche admissible** : proposer le critère (ex. L/250 sous vent ELS →
   ~4,5 mm sur 1130) et vérifier.
4. **Poids** : confirmer ~104 kg à 60 mm ; donner la loi poids/épaisseur et la
   LIMITE MANUPORTÉ recommandée (norme manutention 4 porteurs) — c'est une
   contrainte BUSINESS dure : si >110 kg, le modèle de pose casse.
5. **Optimisation** : faut-il nervurer (2 nervures verticales 60→90 local),
   alléger (réservations), ou changer le format (ex. 1200×500) ? Conclure sur
   LE format V2 définitif.
6. Même exercice rapide pour **P2** (claustra ≥40 % ajouré + 3Ø12) et **P5**
   (casquette en console 400 — arrachement des 2×M10).

### B.2 COMPOSITION DU BÉTON — formulation complète chiffrée
Contexte : préfabrication artisanale à Abidjan (table vibrante, pas d'étuvage),
granulats locaux, climat chaud-humide, zone potentiellement côtière.
Livrer une **fiche de formulation par m³** :
- classe visée (C25/30 suffit-il ? ou C30/37 pour démoulage rapide + durabilité) ;
- **dosage ciment CPJ 42.5 (kg/m³)**, rapport **E/C max**, consistance visée
  (S3 ? adaptée au moulage vibré d'éléments minces) ;
- granulométrie : Dmax compatible épaisseur 60 et enrobage (Dmax ≤ 12,5 ?
  sable 0/4 + gravillon 4/10 ?) ; fuseaux ;
- ⚠ **granulats locaux** : sable de lagune = risque chlorures/coquillages —
  exigences (lavage, essais) vs sable concassé ;
- adjuvants : plastifiant/superplastifiant (dosage %), + éventuel entraîneur ;
- **cure tropicale** : protocole précis (bâche + arrosage 7 j ? produit de cure ?)
  — le point faible n°1 des ateliers locaux ;
- résistances attendues à 16 h / 24 h (démoulage), 7 j, 28 j ;
- classe(s) d'exposition retenue(s) (XC4 ? XS1 si <X km de la mer ?) et
  conséquences (enrobage, E/C) — relier à l'ALERTE 1.

### B.3 CALCULS à livrer (note de calcul)
Flexion panneau (ELS flèche + ELU), manutention jeune âge, poteau courant et
d'angle (flexion composée, âme 70, flambement h.2900, encastrement pied 400 vs
platine skid), P5 console, P9 pré-dim à confirmer (4HA12 + cadres HA6@150 ?),
équerre de toiture (soulèvement : réactions à reprendre par insert 2×M12).
Référentiel : Eurocodes (EC0/1/2) en l'absence de référentiel ivoirien
spécifique — à confirmer [À VÉRIFIER : position CODINORM/LBTP].

### B.4 LA RAINURE — géométrie définitive (panneau ET poteau)
Trancher le **type de rainure** :
- forme : rectangulaire 70×40 chanfrein 5×5 (actuel) vs **trapézoïdale**
  (démoulage facilité, auto-centrage) vs à feuillure ;
- profondeur : 40 (âme 70 — ALERTE 2) vs 30 (engagement 25 : suffisant au vent ?
  étanchéité ?) — justifier par calcul de l'appui du panneau (pression diagonale) ;
- état de surface du fond (drainage ? trous d'évacuation en pied de rainure ?) ;
- garniture : la 20×10 compressible + PU est-elle la bonne (compression 30-50 % ?),
  alternative profilé EPDM en oméga ;
- **côté panneau** : chants du panneau droits (actuel) ou avec languette/nez ?
  tolérances de fabrication compatibles ±3.
→ Livrer le couple **détail rainure poteau + chant panneau** coté au mm, DFM
(dépouilles de moule ≥1°?) pour consultation usine moules.

### B.5 INTEMPÉRIES & DURABILITÉ (ce que les panneaux doivent supporter)
Quantifier la tenue à : pluie battante tropicale (essai d'aspersion à définir),
cycles humidification/séchage, UV (peinture), vent de calcul (B.1), chocs
d'usage, et **durée de vie visée 30 ans** avec plan de maintenance minimal
(rejointoiement PU à N ans ?). Limites d'emploi à publier au catalogue
(ex. « zone de vent ≤ X », « distance mer ≥ Y sans option inox »).

### B.6 PROGRAMME D'ESSAIS (LBTP + atelier)
Définir le protocole : éprouvettes (16h/24h/7j/28j), essai de flexion sur
panneau échelle 1 (charge répartie + flèche), essai d'arrachement douille M10,
essai de vieillissement joint, **essai d'aspersion sur maquette d'angle 2×2
travées**, chrono de montage. Critères d'acceptation chiffrés.

---

## PARTIE C — DONNÉES DISPONIBLES / MANQUANTES
- [FAIT] Géométrie complète : specs.json + planches PL-01→05.
- [À VÉRIFIER par toi] Vent de base & zone sismique CI (SODEXAM/CODINORM) ;
  référentiel de calcul officiel CI ; caractérisation granulats fournisseurs Abidjan.
- [HYP business à respecter] : manuporté ≤ ~110 kg/panneau à 4 ; tolérance ±3 ;
  zéro coupe sur site ; catalogue fermé.

## PARTIE D — FORMAT DE RÉPONSE EXIGÉ
1. **Synthèse décisionnelle** (1 page) : les 2 ALERTES tranchées + format P1
   définitif + formulation béton retenue + rainure définitive.
2. **Note de calcul** structurée (hypothèses → charges → vérifications → marges).
3. **Fiche de formulation béton** (tableau kg/m³ + protocole de cure + essais).
4. **Bloc JSON** prêt à coller dans specs.json (mêmes clés : panels.P1, column,
   concrete, joints…) avec tes valeurs finales — chaque valeur taguée
   [CALCULÉ]/[HYP]/[À CONFIRMER LBTP].
5. **Liste des essais** avec critères d'acceptation.
6. Registre des sources (fiabilité A/B/C, datées) comme dans ton diagnostic V1.

⚠ Rappel de gouvernance : ton étude reste un travail d'ingénierie interne —
la validation finale revient à un ingénieur structure agréé en Côte d'Ivoire
et aux essais LBTP avant toute fabrication en série.
