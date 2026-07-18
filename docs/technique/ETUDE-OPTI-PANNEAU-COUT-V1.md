# Étude d'optimisation — Taille des panneaux & coût béton par module (V1)

> Bureau d'études Noéma · Mission C (question d'étude)
> Question : le P1 1200×600×60 est-il l'optimum ? Des panneaux plus grands
> feraient-ils économiser du béton ? À quel risque ?
> Références : `tools/plans/specs.json` (V1), `docs/missions/REPONSE-MISSION-ING-001-V1.md`
> ⚠️ Hypothèse V1 — à valider par ingénieur structure agréé.

---

## LA RÉPONSE EN 3 LIGNES

1. **Agrandir les panneaux n'économise AUCUN béton** : le volume = surface
   de mur × épaisseur, quelle que soit la découpe. Ça n'économise que des
   joints (~2 000 XOF/ml [HYP]) — et ça DÉTRUIT la pose manuportée.
2. Le 1200×600×60 est **déjà à l'optimum sous ta contrainte fondatrice** :
   104 kg, au ras du plafond manuporté (~110 kg). Tout panneau plus grand
   impose un engin de levage → fin de la « pose en 1 jour sans engin ».
3. Les VRAIS leviers de coût béton sont ailleurs : §5 (jusqu'à ~15-20 %
   du béton de module, sans toucher à la solidité).

## 1. Le mur de la physique : le poids

Béton armé ≈ 2 400 kg/m³. À épaisseur 60 :

| Format envisagé | Volume (m³) | Poids | Manuporté ? |
|---|---|---|---|
| **1200×600×60 (P1 actuel)** | 0,0432 | **104 kg** | ✅ 4 porteurs = 26 kg/pers |
| 1200×900×60 | 0,0648 | 156 kg | ❌ 39 kg/pers |
| 1800×600×60 | 0,0648 | 156 kg | ❌ |
| 1200×1200×60 | 0,0864 | 207 kg | ❌ 52 kg/pers |
| 2400×600×60 | 0,0864 | 207 kg | ❌ |

Repère ergonomique : ~25 kg/personne en port répétitif est la limite
communément admise en manutention manuelle [FAIT-B, normes manutention].
Le P1 actuel est à 26 kg/personne à 4 porteurs : **le format est déjà
calé au maximum de ce que des équipes humaines peuvent poser toute une
journée**. Il n'existe AUCUN panneau plus grand qui reste manuporté à 60
d'épaisseur — la marge résiduelle n'est que de ~6 % (110/104).

## 2. Panneaux plus grands = même béton, autres coûts

### Ce qu'on gagnerait réellement (module Studio 3,60×4,80, 14 travées)
- Joints horizontaux en moins : passer de 4 rangs à 2 rangs de 1200×1200
  supprime ~2 joints/travée × 1,2 m × 14 travées ≈ **34 ml de joint PU**
  ≈ 65 000-70 000 XOF de mastic/fond de joint [HYP] + ~1 h de main-d'œuvre.
- Moins de manipulations : ~28 pièces posées au lieu de ~56.

### Ce qu'on paierait
- **Un moyen de levage** (207 kg) : mini-grue/chèvre ou camion-grue —
  location Abidjan de l'ordre de 150 000-300 000 XOF/jour [HYP TBV devis]
  → à lui seul, il efface 2 à 4× l'économie de joints, À CHAQUE POSE.
- **La promesse commerciale** : « posé en 1 jour sans engin » est
  l'argument n°1 du marketing et la condition d'accès aux sites enclavés
  (cours intérieures, terrains sans accès camion). Prix invisible mais
  énorme.
- **Casse au jeune âge** : au démoulage, la flexion sous poids propre
  croît comme L². Un panneau de 2400 subit ×4 la contrainte du 1200 ;
  la marge jeune âge calculée à ×4 (MISSION-ING-001) tomberait vers ~1 →
  **casse quasi certaine en production artisanale** [CALCUL].
- Moules plus grands, tables de coulage plus grandes, transport plus
  délicat (élancement), 2 douilles M10 insuffisantes (levage 4 points).

**Verdict STRUCT + ÉCO : panneaux plus grands = REJETÉ.** Aucune économie
de béton, économie de joints marginale, surcoûts et risques majeurs.

## 3. Et un panneau plus MINCE ? (la seule vraie économie de béton par m²)

Passer de 60 à 50 mm économiserait 17 % du béton des panneaux
(~0,35-0,40 m³/module ≈ 25 000-35 000 XOF matériaux [HYP]). MAIS :

| Critère | 60 mm (actuel) | 50 mm | Verdict |
|---|---|---|---|
| Marge vent (béton seul, qp 1,0 kPa) | ×2,2 [CALCUL ING-001] | ×1,55 (∝ t²) [CALCUL] | Encore >1 mais réserve entamée |
| Enrobage treillis central Ø5 | 27,5 mm ✅ (galva, XC4 ok) | 22,5 mm ❌ sous le minimum acté (27) | **BLOQUANT durabilité** |
| Manutention jeune âge | ×4 | ×3,3 (∝ t) [CALCUL] | Acceptable |
| Casse/épaufrures chantier | maîtrisé | fragilité accrue, rebut +X % [TBV] | 2-3 % de rebut en plus mangent l'économie |
| Rainure 70 (60 + 2×5 de jeu) | ✅ | jeu 10/côté → battement, garniture à re-speccer | Re-conception assemblage |

**Verdict : 50 mm REJETÉ en V1** (enrobage impossible avec treillis
central — c'est le même verrou géométrique que l'ALERTE 1 d'ING-001).
Réexaminable en V2 UNIQUEMENT avec treillis galva + essais E1/E4 réussis
+ statistiques de casse d'une vraie production — pas avant.

## 4. Ce que coûte réellement le béton d'un module (Studio 3,60×4,80)

Quantités [CALCUL, géométrie specs.json ; composition façades HYP §4.2 du
dossier SketchUp] :

| Poste | Quantité | Volume béton |
|---|---|---|
| P1 (~48 u après ouvertures) | 48 × 0,0432 | ≈ 2,07 m³ |
| P2 claustra (14 u, ~60 % plein) | 14 × 0,013 | ≈ 0,18 m³ |
| Poteaux (14 u, net de rainures) | 14 × 0,049 | ≈ 0,69 m³ |
| Plinthe (16,8 ml × 0,2 × 0,06) | | ≈ 0,20 m³ |
| **Total superstructure** | | **≈ 3,1-3,3 m³** (~7,8 t) |

Coût matériaux du m³ artisanal C30/37 (400 kg CPJ 42.5 à ~85 XOF/kg +
granulats + adjuvant) : ordre de 60 000-80 000 XOF/m³ [HYP TBV devis
fournisseurs datés] → **béton d'un Studio ≈ 200 000-260 000 XOF** de
matériaux. C'est l'assiette qu'on cherche à réduire. Les panneaux en
représentent ~65 % ; le ciment seul ≈ la moitié du coût matériaux.

## 5. Les VRAIS leviers d'économie (classés par gain/risque)

1. **Optimiser la formulation, pas la géométrie** — le ciment est le
   premier poste. La fiche ING-001 prescrit 400 kg/m³ par sécurité
   artisanale ; une granulométrie optimisée + superplastifiant permet
   souvent 350-370 kg/m³ à résistance égale [FAIT-B, pratique courante ;
   dosage exact TBV essais LBTP]. Gain : ~8-12 % du coût béton, zéro
   changement de géométrie, zéro risque si validé par essais.
   → Action : campagne d'essais d'optimisation APRÈS maîtrise du mix V1.
2. **Traquer le rebut** — 1 P1 cassé = 104 kg de béton + treillis + moule
   immobilisé perdus. À 5 % de casse, tu perds plus que tout ce que le
   50 mm aurait rapporté. La cure 7 j et le décoffrage à 24 h ≥12 MPa
   (ING-001) sont des mesures ÉCONOMIQUES autant que techniques.
   → KPI atelier : % rebut par lot, affiché au mur.
3. **Vendre plus de vide : le 2ᵉ rang claustra [HYP à étudier]** — sur
   les façades non exposées à la pluie battante, remplacer le rang 4
   (P1 plein) par un 2ᵉ rang P2 économise ~0,03 m³/travée (−12 % de béton
   de mur) ET améliore la ventilation traversante. ARCHI/THERM : favorable.
   STRUCT : à vérifier (rigidité de la file, sécurité anti-intrusion).
   À proposer comme variante M1 « éco-ventilée » — étude dédiée V2.
4. **Ne PAS toucher** : épaisseur 60, format 1200×600, rainure 70×40,
   enrobage 27 — c'est le noyau validé du système.

## 6. Avis des experts (délibération)

- STRUCT : « Le 1200×600×60 est un optimum contraint, pas un hasard :
  poids au plafond manuporté, marge vent ×2,2, jeune âge ×4. Tout
  agrandissement casse la chaîne. Je m'oppose au 50 mm pour l'enrobage. »
- MATX : « L'économie est dans le sac de ciment : 400→360 kg/m³ validé
  par essais vaut mieux que 10 mm d'épaisseur volés à la durabilité. »
- ÉCO : « L'engin de levage détruit l'équation : une seule journée de
  grue coûte plus que les joints économisés sur 3 modules. Et le rebut
  est le coût caché n°1 d'un atelier débutant. »
- ARCHI : « Le 2ᵉ rang claustra est la seule piste qui économise du béton
  en AMÉLIORANT le produit — à creuser pour les box commerce. »
- Arbitrage du bureau : **statu quo géométrique, optimisation par la
  formulation et le taux de rebut, étude V2 sur la variante éco-ventilée.**

## 7. Ce que le valideur humain doit contrôler

- Les prix unitaires [HYP] : ciment, PU, location grue — devis datés CI.
- La faisabilité 350-370 kg/m³ avec les granulats réellement disponibles
  (essais LBTP, courbe granulométrique).
- La variante 2ᵉ rang claustra : rigidité, intrusion, pluie battante.

---
⚠️ Avis du bureau d'études IA — document de travail V1. Validation
requise : ingénieur structure agréé + architecte [+ essais : optimisation
formulation LBTP, statistiques de rebut atelier].
