# Étude technique — Réseaux électriques & plomberie du module Studio (V1)

> Bureau d'études Noéma · Module Studio 3600×4800 · niveau M3 (eau + électricité)
> Planches associées : **PL-06** (électricité) et **PL-07** (plomberie) dans `docs/plans/`
> — géométrie calculée depuis specs, validée par **54 contrôles automatiques**
> (`tools/plans/check-studio.mjs`). ⚠️ Hypothèse V1 — à valider par ingénieur
> structure agréé + électricien agréé CIE + plombier.

---

## 1. Les 4 règles qui commandent tout (découlent du système constructif)

1. **SAIGNÉES INTERDITES.** On ne rainure jamais un panneau ni un poteau :
   tous les réseaux sont **APPARENTS** (goulotte, tube IRL, plinthe
   technique). Perçage de fixation toléré : ≤ Ø8, prof. ≤ 40, jamais à
   moins de 60 mm des bords ou des rainures.
2. **L'électricité traverse par le CLAUSTRA.** La bande P2 (2600→2900) est
   ajourée à ≥40 % : les câbles passent dedans, dehors↔dedans, **sans
   aucune réservation**. C'est le privilège unique de notre mur ventilé.
3. **Les fluides traversent par des réservations MOULÉES en plinthe.**
   Jamais de carottage sur site : 5 fourreaux (R1→R5) sont moulés en usine
   dans les éléments de plinthe (h.200), tous axés à 100, gardes ≥ 40.
4. **Une seule façade technique : l'ARRIÈRE.** Citerne, coffret, les 5
   traversées, le collecteur et la descente d'eau pluviale sont sur le mur
   long arrière, sous le débord de 600 — un seul mur à équiper en usine,
   un seul côté à raccorder sur site.

## 2. Électricité (planche PL-06)

**Architecture** : arrivée 230 V mono en fourreau Ø63 moulé (R5) → coffret
13 modules (mur technique, axe h.1300) : AGCP [TBV CIE] + différentiel
63 A/30 mA + 6 circuits. Distribution en **goulotte périphérique à h.2450**
(sous la ligne claustra), descentes verticales en tube IRL Ø20 apparent.

| Circuit | Desserte | Section | Disjoncteur |
|---|---|---|---|
| C1 | 2 LED séjour + hublot IP44 SDB + applique ext. | 1,5 mm² | 10 A |
| C2 | 4 prises séjour (h.300) | 2,5 mm² | 16 A |
| C3 | 3 prises kitchenette (h.1100) | 2,5 mm² | 16 A |
| C4 | attente surpresseur / ECS | 2,5 mm² | 16 A |
| C5 | attente split (mur pignon, h.2500) | 2,5 mm² | 16 A |
| C6 | brasseur d'air plafond | 1,5 mm² | 10 A |

Terre : piquet + barrette + 16 mm² [TBV mesure]. **SDB : hublot IP44 hors
volumes, AUCUNE prise, liaison équipotentielle.** Hauteurs normalisées :
PC 300 · interrupteurs 1100 · coffret 1300 · goulotte 2450 · applique 2300.
Le module part de l'atelier **pré-câblé** ; le raccordement final est fait
par un électricien agréé CIE.

## 3. Plomberie (planche PL-07)

**Eau froide (gravitaire)** : citerne 500 L sur châssis h.1800 (extérieur,
mur arrière, sous débord) → vanne + filtre + clapet AR → traversée R4 Ø25 →
nourrice 3 départs → PER Ø16 en plinthe vers douche, lave-mains + WC, évier.

**Le calcul honnête de la pression** (voir altimétrie planche PL-07) :
fond de cuve à 1800 → charge statique de **800 à 1000 mm seulement**
(0,08-0,10 bar). C'est suffisant pour lave-mains, réservoir WC et évier ;
**c'est faible pour le confort d'une douche** (cible usuelle ≥ 0,3 bar).
Décision V1 : gravitaire de base + **OPTION surpresseur 230 V 0,3-1,0 bar**
raccordé sur l'attente C4 [TBV]. On ne surélève PAS la citerne : elle doit
rester sous le débord de toiture.

**Évacuations (pente 2 %)** : douche Ø40 + lave-mains Ø32 → R2 · évier Ø40
→ R3 · **WC Ø100 → R1 (fourreau Ø110)**. Collecteur extérieur Ø100 en pied
de façade arrière (chute 120 mm sur 6 m — vérifiée ≤ regard 400) → regard
400×400 → puisard Ø1000 [TBV selon site : nappe, règles locales, ONAD].
**Ventilation de chute : clapet aérateur à membrane** sur le branchement
WC — pas de ventilation primaire en toiture, le module reste démontable.

**Réservations moulées (plinthe arrière, axe 100)** :

| Rep. | Ø fourreau | Usage | Position x | Garde |
|---|---|---|---|---|
| R1 | 110 | EU WC Ø100 | 600 | 45 |
| R2 | 50 | EU douche + LM Ø40 | 300 | 75 |
| R3 | 50 | EU évier Ø40 | 2700 | 75 |
| R4 | 25 | EF entrée Ø16 | 2400 | 87,5 |
| R5 | 63 | fourreau élec | 2000 | 68,5 |

## 4. Ce que couvre la vérification automatique (54 contrôles)

Géométrie (trame, SDB sur sous-module 600, 14 poteaux, niveaux), élec
(goulotte sous claustra, traversée dans la bande 2600-2900, points par
circuit ≤ norme, disjoncteur/section compatibles, hauteurs), plomberie
(gardes de réservations ≥ 40, fourreau > tuyau, charge gravitaire > 0 par
appareil, option surpresseur exigée si charge < 3 m, chute du collecteur ≤
profondeur de regard, appareils groupés sur la zone humide). Le rendu des
planches est **bloqué** si un contrôle échoue.

## 5. Variante d'assise — point d'attention

Cette étude est établie pour la variante **« Vendu » (dalle)**. En variante
**« Location » (skid)**, le module est surélevé sur pieds M24 : les
évacuations passent alors **sous le plancher** entre les traverses — même
principe (réservations moulées, collecteur arrière), mais cheminement à
détailler avec le plancher technique. → Étude complémentaire dédiée [TBV].

## 6. Ce que les valideurs humains doivent trancher

- Calibres définitifs (AGCP, différentiel, disjoncteurs) selon norme
  NF C 15-100 / exigences CIE locales — les valeurs portées sont [TBV].
- Puisard : autorisation et dimensionnement selon le site (perméabilité,
  nappe) ; raccordement SODECI/ONAD si réseau disponible.
- Choix et réglage du surpresseur (option confort douche).
- Résistance du châssis de citerne (500 kg d'eau + cuve) — repère B, PL-07.
- Tenue des éléments de plinthe avec réservation Ø110 (garde 45) — essai
  ou calcul local [TBV].

---
⚠️ Avis du bureau d'études IA — document de travail V1. Validation requise :
ingénieur structure agréé + architecte + électricien agréé CIE + plombier
[+ essais : plinthe R1, mesure de terre, débit gravitaire].
