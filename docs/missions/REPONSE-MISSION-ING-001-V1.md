# 🧮 RÉPONSE — MISSION-ING-001 · ÉTUDE PANNEAU P1 & POTEAU RAINURÉ

> **Émetteur :** Bureau d'études IA (exécution de la mission du 2026-07-10)
> **Statut :** Étude d'ingénierie interne V1 — NON CONTRACTUELLE.
> **⚠ Validation requise :** ingénieur structure agréé CI + essais LBTP avant fabrication.
> Tags : [CALCUL] hypothèses+formule+résultat · [HYP] hypothèse d'ingénierie · [TBV] à vérifier (labo/valideur/donnée manquante).

---

## 1. SYNTHÈSE DÉCISIONNELLE (1 page)

| Sujet | DÉCISION | Justification courte |
|---|---|---|
| **ALERTE 1 — enrobage P1** | **Panneau reste 1200×600×60** avec **treillis GALVANISÉ type ST25C centré** (enrobage réel ≈ 27 mm) + béton **C30/37, E/C ≤ 0,45, Dmax 10** + peinture façade | Le calcul montre que le treillis n'est PAS nécessaire à la résistance (le béton seul tient le vent avec marge ×2,2) — il sert à la robustesse/manutention. Enrobage 27 ≥ exigence XC4 (25). Zone côtière < 5 km : option treillis galvanisé obligatoire + peinture barrière [TBV LBTP]. Poids conservé 104 kg = manuporté ✔ |
| **ALERTE 2 — âme poteau 70** | **Poteau reste 150×150, rainures 70×40** ; armature **4 HA12 + cadres HA6 @150 (resserrés @100 sur 600 en pied)** | [CALCUL] L'entaille est proche de l'axe neutre pour la flexion principale : inertie nette = 95 % de la section pleine. Flexion faible axe : W ≈ 327×10³ mm³, marge ×2 même en console. Poteau d'angle : mêmes aciers, cadres @100 |
| **Rainure définitive** | **Trapézoïdale** : fond 70, **ouverture 78** (dépouille ≈ 4°/face), profondeur 40, chanfreins 5 ; **2 trous d'évacuation Ø8 par poteau** au niveau plinthe ; garniture **EPDM cellulaire 20×10 compression 40 %** + PU face ext. | Démoulage facilité, auto-centrage du panneau, drainage du fond de rainure (eau infiltrée évacuée avant stagnation) |
| **Vent de calcul retenu** | **qp = 1,0 kPa** (≈ rafale 145 km/h) [HYP enveloppe] | Abidjan non cyclonique ; valeur enveloppe prudente en l'absence de donnée SODEXAM [TBV — donnée officielle à obtenir] |
| **Format P1 V2** | **INCHANGÉ 1200×600×60** — ni nervures ni allègement nécessaires | Toutes les vérifications passent avec marges ; la simplicité du moule prime |
| **Formulation béton** | 400 kg CPJ 42.5 / 180 L / E/C 0,45 / 0-4 + 4-10 concassés / SP 1 % / cure humide 7 j | Voir fiche §3 |

**Impact specs.json : bloc JSON prêt §5 — AUCUNE dimension géométrique ne change** (les 21 contrôles restent valides) ; changent : classe béton, armatures, forme de rainure (ouverture 78), garniture, drainage.

---

## 2. NOTE DE CALCUL (résumée, traçable)

### 2.1 Hypothèses générales
- Référentiel : Eurocodes EC0/EC1/EC2 [HYP — référentiel CI officiel TBV CODINORM].
- Béton C30/37 : fck=30 MPa, fctm=2,9 MPa, fctk0.05=2,0 MPa, E=33 GPa. Acier B500 : fyd=435 MPa.
- Vent : qp = 1,0 kPa [HYP] ; coefficient bardage local cp,net = ±1,2 (courant), −1,8 (rives toiture).
- Poids volumique béton armé 24 kN/m³.

### 2.2 Panneau P1 — flexion sous vent [CALCUL]
- Modèle : plaque portée 1 sens entre rainures, **portée L = 1,13 m**, bande 1 m.
- w_ELS = 1,2 kPa → M_ELS = wL²/8 = **0,192 kNm/m** ; M_ELU = 1,5× = **0,287 kNm/m**.
- Béton seul (EC2 §12, non armé) : W = 1000×60²/6 = 600×10³ mm³ ;
  fctd,pl = 0,8×2,0/1,5 = 1,07 MPa → **MRd = 0,64 kNm/m** → **marge ELU ×2,2** ✔
- Avec ST25C (2,57 cm²/m, d=30) : MRd ≈ 257×435×0,9×30 = **3,0 kNm/m** (×10) —
  le treillis gouverne la **robustesse** (chocs, fissuration), pas la résistance.
- **Flèche ELS** : f = 5wL⁴/(384·E·I), I=1000×60³/12=18×10⁶ mm⁴ →
  f = 5×1,2×10⁻³×1130⁴/(384×33000×18×10⁶) = **0,04 mm** ≪ L/250=4,5 mm ✔✔
- Choc corps mou 400 J [HYP méthode] : couvert par le treillis (ductilité) — essai échelle 1 requis [TBV essai].

### 2.3 Panneau P1 — manutention jeune âge [CALCUL]
- Démoulage 24 h : β(1j)≈0,34 → fctm(1j)≈1,4 MPa → MRd,plain(1j) ≈ 0,32 kNm/m.
- Levage à plat, 2 douilles à 300 des extrémités, coefficient dynamique + adhérence ×2 :
  q = 2×0,864 = 1,73 kN/m → M_porte-à-faux = q·0,3²/2 = **0,078 kNm** ;
  M_mi-travée ≈ 0 (position des douilles à L/4 = optimale) → **marge ×4 à 24 h** ✔
- Douille M10 : effort service ≈ 1,3 kN/douille ×2(dyn) = 2,6 kN — capacité typique
  douille scellée M10 ≥ 10 kN [HYP fabricant — essai d'arrachement requis §6].
- **Poids** : 1,2×0,6×0,06×2400 = **103,7 kg** → 26 kg/porteur à 4 ✔ (loi : +17,3 kg par +10 mm d'épaisseur → 70 mm = 121 kg ✗ rejeté).

### 2.4 Poteau — section nette et flexion [CALCUL]
- Axes : X le long du mur, Y = épaisseur, Z vertical. Rainures sur faces latérales,
  ouverture 70 centrée sur Y (40→110), profondeur 40 en X.
- **Flexion principale (vent ⊥ mur, axe X)** : entailles proches de l'axe neutre →
  I_x,net = 42,19−2,29 = **39,9×10⁶ mm⁴ = 95 % du plein** ; W = 532×10³ mm³.
- **Flexion faible axe (axe Y, pignons/angles)** : I_y,net = 42,19−17,7 = **24,5×10⁶ mm⁴ (58 %)** ; W ≈ 327×10³ mm³.
- Demande (cas enveloppe CONSOLE — tête non tenue, prudent) : w = 1,0×1,3×1,2 = 1,56 kN/m ;
  M_ELU = 1,5×1,56×2,9²/2 = **9,8 kNm**.
- Capacité 150×150, **4 HA12** (As=452 mm², d≈110) : MRd ≈ 452×435×0,9×110 = **19,5 kNm → marge ×2,0** ✔
  (tête tenue par équerre : M chute à ~2,5 kNm → marge ×8).
- Appui du panneau dans la rainure : réaction ≈ 0,7 kN/m sur joue de 35 mm → 20 kPa — négligeable ✔
- Poteau d'angle (rainures adjacentes, section en L) : flexion biaxiale — 4 HA12 conservés,
  cadres @100 sur toute hauteur [HYP sécuritaire — à affiner par le valideur].

### 2.5 Autres éléments [CALCUL rapide]
- **P5 console 400** : M = 0,88 kN×0,2 m ≈ 0,18 kNm → traction/douille ≈ 0,6 kN ≪ capacité M10 ✔ (+ vérif. soulèvement vent : +0,3 kN — OK).
- **P9 2550** : w_ELU ≈ 3,1 kN/m (rive de toiture + poids propre) → M = 3,1×2,25²/8 = **2,0 kNm** ≪ MRd(4HA12, d=260) ≈ 46 kNm — **4 HA12 + HA6@150 CONFIRMÉ, très sécuritaire** (réserve pour inversion au vent) ✔
- **Équerre toiture — soulèvement** : zone de rive cpe −1,8 → traction ≈ 3,0 kN/tête →
  2×M12 sur insert : capacité requise ≥ 4× = 12 kN [TBV scellement insert — essai].

---

## 3. FICHE DE FORMULATION BÉTON (par m³) — atelier Abidjan, éléments minces vibrés

| Constituant | Dosage | Exigences |
|---|---|---|
| Ciment **CPJ CEM II 42,5** | **400 kg** | sac d'origine, stockage sec ≤ 2 mois |
| Eau totale | **180 L** (E/C = 0,45 max) | eau claire ; compter l'humidité du sable ! |
| Sable **0/4** | **750 kg** | **concassé ou lagune LAVÉ** : Cl⁻ ≤ 0,02 % [TBV essai], équiv. sable ES ≥ 75, MB ≤ 1,5, zéro coquillage visible |
| Gravillon **4/10 concassé** | **1000 kg** | Dmax 10 (compatible ép. 60 & enrobage 27) ; propre |
| Superplastifiant polycarboxylate | **4 kg (1 % du ciment)** | consistance S3-S4 au cône ; JAMAIS d'eau ajoutée pour « fluidifier » |
| Air occlus | ~2 % | — |

- **Résistances attendues** [HYP à caler sur essais de convenance] : 24 h ≥ **12 MPa** (démoulage) · 7 j ≈ 24 · 28 j ≥ **37 MPa cube** (C30/37).
- **Malaxage** : petit malaxeur à axe vertical de préférence ; vibration table 45-60 s, sans ségrégation.
- **CURE TROPICALE (non négociable)** : démoulage 20-24 h → brumisation + **bâche humide ou géotextile arrosé 7 jours**, à l'ombre ; jamais de plein soleil direct la 1ʳᵉ semaine ; alternative produit de cure filmogène si eau rare.
- Classes d'exposition : **XC4** (standard intérieur des terres) ; **option côtière < 5 km : XS1** → treillis galvanisé obligatoire + peinture barrière + E/C 0,42 [TBV LBTP].

---

## 4. LA RAINURE — DÉTAIL DÉFINITIF (DFM moules)

```
POTEAU (coupe horizontale, par face latérale)      CHANT PANNEAU
      ouverture 78                                  ép. 60, chants droits
   ┌───┐← dépouille ≈4°/face                        chanfreins 5×5 (4 arêtes)
   │   \  fond 70 · profondeur 40                   tolérance ±3
   │    ── chanfreins d'entrée 5×5
   │   /  garniture EPDM cellulaire 20×10 (compression 40 %)
   └───┘  + cordon PU 10×10 côté EXTÉRIEUR (continu)
   2 trous Ø8 d'évacuation en pied de rainure (niveau plinthe) / poteau
```
- Trapèze : auto-centrage à la pose (guide le panneau), démoulage moule acier sans arrachement.
- Engagement effectif : 35 mm au fond (40 − 5 de jeu) — inchangé, checks OK.
- Jeu de pose : 5 mm/côté à l'ouverture (78 − 60 − 2×4 de pente ≈ 10) ✔ cohérent ±3.
- [TBV usine moules] : confirmer dépouille mini de leur process (≥ 2°).

## 5. BLOC JSON — à injecter dans specs.json après ta validation

```json
{
  "concrete": {
    "class": "C30/37",
    "cement": "CPJ CEM II 42.5 — 400 kg/m³",
    "wcMax": 0.45, "dmax": 10,
    "admixture": "superplastifiant PCE 1%",
    "cover": 27,
    "coverNote": "treillis central galvanisé — XC4 ok [CALCULÉ] ; option côtière XS1 : galva obligatoire + peinture + E/C 0.42 [À CONFIRMER LBTP]",
    "cure": "démoulage 20-24 h ≥ 12 MPa, bâche humide 7 j à l'ombre",
    "edgeChamfer": 15, "mixTBV": "essais de convenance LBTP requis"
  },
  "panels": { "P1": {
    "w": 1200, "h": 600, "t": 60,
    "mesh": "ST25C GALVANISÉ centré (2,57 cm²/m) [CALCULÉ — rôle robustesse]",
    "weight": 104, "lifting": "2 douilles M10 à 300 des extrémités (position optimale [CALCULÉ])",
    "designWind": "qp 1,0 kPa [HYP SODEXAM TBV] — marge ELU ×2,2 béton seul, flèche 0,04 mm"
  }},
  "column": {
    "w": 150, "d": 150, "height": 2900,
    "rebar": "4 HA12 + cadres HA6 @150 (@100 sur 600 en pied) [CALCULÉ — marge ×2 en console]",
    "corner": "identique, cadres @100 toute hauteur [HYP sécuritaire]",
    "groove": { "bottomWidth": 70, "mouthWidth": 78, "depth": 40, "taper": "≈4°/face",
      "chamfer": 5, "effectiveEngagement": 35, "weepHoles": "2×Ø8 en pied / poteau" }
  },
  "joints": { "vertical": {
    "gasket": "EPDM cellulaire 20×10, compression 40%",
    "sealantBead": [10, 10], "note": "PU classe 25% face extérieure, continu"
  }},
  "wind": { "qp_kPa": 1.0, "gust": "≈145 km/h [HYP enveloppe — donnée SODEXAM À OBTENIR]" }
}
```

## 6. PROGRAMME D'ESSAIS & CRITÈRES D'ACCEPTATION

| # | Essai | Protocole | Critère |
|---|---|---|---|
| E1 | Convenance béton | 3 gâchées, éprouvettes 16h/24h/7j/28j (LBTP) | 24 h ≥ 12 MPa ; 28 j ≥ 37 MPa cube ; E/C vérifié |
| E2 | Granulats | Cl⁻, ES, MB, granulo (chaque nouvelle source) | Cl⁻ ≤ 0,02 % · ES ≥ 75 · MB ≤ 1,5 |
| E3 | Flexion panneau éch. 1 | appuis = rainures factices, charge répartie (sacs) | aucune fissure à 1,2 kPa ; rupture ≥ 3,6 kPa ; flèche ≤ 4,5 mm à 1,2 kPa |
| E4 | Arrachement douille M10 | traction axiale sur panneau 28 j | ≥ 10 kN sans rupture béton |
| E5 | Aspersion maquette angle 2×2 travées | 2 h, 200 L/h·m², ventilateur face au joint | 0 infiltration ; re-essai après démontage/remontage (variante Location) |
| E6 | Insert tête de poteau | traction sur 2×M12 | ≥ 12 kN |
| E7 | Chrono montage | mur 2 travées, 4 poseurs | ≤ 45 min, zéro casse, jeux respectés |
| E8 | Vieillissement joint | PU + EPDM, 50 cycles UV/pluie (ou exposition 6 mois) | adhérence conservée, reprise PU à définir (plan de maintenance : contrôle à 5 ans) |

## 7. REGISTRE DES SOURCES
- EC0/EC1/EC2 (méthodes de calcul, §12 béton non armé, enrobages) — [A, référentiel].
- fck(t) : EC2 3.1.2 (s=0,25 ciment R) — [A].
- Vent Abidjan : AUCUNE source officielle exploitée ici → qp=1,0 kPa = enveloppe [HYP] ; donnée SODEXAM **à acheter/obtenir** — [TBV prioritaire].
- Capacités douilles/inserts : ordres de grandeur fabricants — [C] → essais E4/E6 obligatoires.
- Exigences granulats (ES, MB, Cl⁻) : pratique normative EN 206/12620 — [A méthode].

---

## ⚠ LIMITES DE CETTE ÉTUDE (à dire au valideur humain)
1. Vent = hypothèse enveloppe, pas une donnée locale mesurée.
2. Choc corps mou : traité par robustesse + essai, pas par calcul dynamique.
3. Poteau d'angle : approche sécuritaire, pas de calcul biaxial détaillé.
4. Capacités d'ancrage (douilles, inserts) = à prouver par essais, pas par catalogue.
5. Aucune donnée sismique intégrée (CI zone faible [HYP]) — à confirmer.

**⚠️ Avis du bureau d'études IA — document de travail V1. Validation requise :
ingénieur structure agréé + architecte + essais LBTP E1→E8 avant fabrication série.**
