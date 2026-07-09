# Diagnostic technique initial et feuille de route d'ingénierie — Noéma Construction V1

**Émetteur :** NOEMA_ENGINEER_AGENT (ingénierie technique)
**Date d'émission :** 2026-06-23
**Statut :** Document de travail interne — ingénierie. Aucune valeur contractuelle.
**Périmètre :** Système constructif modulaire préfabriqué béton (poteaux rainurés + panneaux horizontaux + embase/longrine + toiture légère tropicalisée), Côte d'Ivoire / Afrique de l'Ouest.

---

## 0. Avertissement méthodologique

Ce document distingue systématiquement :

- **[FAIT]** — donnée vérifiée sur source identifiée, datée et qualifiée par niveau de fiabilité.
- **[HYP]** — hypothèse de travail d'ingénierie, à confirmer.
- **[À VÉRIFIER]** — donnée nécessaire mais non confirmée par source fiable à ce stade.

**Niveaux de fiabilité des sources :**

- **A — Élevée** : source officielle/primaire (arrêté, décret, loi, opérateur public CIE/SODECI, règlement UEMOA, OIT).
- **B — Moyenne** : presse établie ou site sectoriel secondaire.
- **C — Indicative** : annonces commerciales, blogs agrégateurs de prix, générateurs d'estimation. À utiliser uniquement comme ordre de grandeur, jamais comme base de devis.

> **Règle de gouvernance :** aucune estimation chiffrée engageante ne doit être produite tant que les données de niveau C n'ont pas été remplacées par des devis fournisseurs réels datés (niveau A/B). Toute note de calcul structure doit être validée par un ingénieur structure agréé et un bureau de contrôle technique agréé en Côte d'Ivoire.

---

## 1. Synthèse technique du concept Noéma

**Concept.** Système constructif à ossature poteaux-panneaux entièrement préfabriqué en béton armé, décliné en plusieurs usages (commerce, sanitaire, poste de garde, stockage, clôture) à partir d'un **noyau de composants communs standardisés**. Livraison d'espaces finis, montés, équipés et raccordés.

**Filiation technologique [HYP/FAIT].** Le principe « poteaux rainurés + plaques horizontales emboîtées + embase » est une **technologie déjà industrialisée et éprouvée en Afrique de l'Ouest** sous la forme des **clôtures préfabriquées** (poteaux + plaques) et d'éléments manufacturés courants. Plusieurs préfabricants béton existent localement, ce qui constitue un socle industriel et un *benchmark* :

- [FAIT — B] Des préfabricants ivoiriens produisent déjà poteaux, hourdis, caniveaux, agglos, murs : ex. SBP (Société de Béton Préfabriqué), SIP (Société Ivoirienne de Préfabrication), SIGBM, et PRESTICOM (Yamoussoukro). *(goafricaonline, annuaire préfabriqués ; presticom-ci.com, consultés 2026-06-23)*
- [FAIT — B] PRESTICOM dispose d'un **agrément CI-ENERGIES** pour la fabrication de poteaux électriques béton et réalise des essais dans son **laboratoire interne et au LBTP**. *(presticom-ci.com, 2026-06-23)* → preuve que la qualification produit béton (poteaux) via LBTP est une voie établie en CI.

**Lecture d'ingénierie.** Noéma n'invente pas un matériau ; il **réorganise une technologie connue (préfabrication béton poteaux-plaques) pour en faire un système de bâtiment fermé, occupé et raccordé**. Cela **dérisque la fabrication** (moules, vibrage, démoulage maîtrisés localement) mais **crée de nouvelles exigences** absentes de la clôture : étanchéité à l'eau, stabilité d'ensemble (contreventement), confort thermique, sécurité ERP, raccordements réseaux, accessibilité.

**Conclusion synthèse.** Le projet est techniquement crédible à condition de traiter en priorité **les interfaces** (joints panneau/poteau, ancrage en pied, diaphragme de toiture) et la **conformité réglementaire d'usage** (ERP, permis). La standardisation est l'atout central et doit être protégée contre la dérive de variantes.

---

## 2. Système constructif recommandé

**Recommandation : un système unique, paramétrique, à trame fixe.** Ne pas multiplier les gammes ; multiplier les *configurations* d'un même kit.

| Sous-système | Recommandation V1 [HYP d'ingénierie, à figer puis valider] | Justification |
|---|---|---|
| **Ossature verticale** | Poteaux béton armé rainurés (2 rainures latérales) sur trame fixe ; pied **encastré** dans plot/embase | Reprise des panneaux + stabilité par encastrement en pied (comme poteau de clôture, mais dimensionné bâtiment) |
| **Remplissage** | Panneaux horizontaux préfabriqués glissés dans les rainures, empilés | Montage rapide à sec, pas de maçonnerie humide |
| **Fondation** | Embase/longrine périphérique + plots sous poteaux (semelles isolées) ; radier si sol médiocre | Adapté sol tropical variable ; à conditionner par étude géotechnique |
| **Stabilité d'ensemble** | Poteaux encastrés en pied **+ diaphragme de toiture** + panneaux/refends de contreventement en angles | Un système poteaux-panneaux n'est pas auto-stable sans dispositif dédié |
| **Toiture** | Charpente légère (acier galvanisé ou bois traité) + couverture bac acier aluzinc/alu, **pente franche**, débords larges | Climat tropical : pluies intenses, soulèvement au vent, protection des joints de façade |
| **Enveloppe / étanchéité** | Joint d'étanchéité dans rainure (profilé/mastic) + recouvrement vertical + larmier | Point critique n°1 : pluie battante |
| **Réseaux** | Réservations/fourreaux intégrés en fabrication (poteaux/panneaux) pour CIE & SODECI | Évite percements destructifs après pose |

**[HYP — décision de levage à figer] Deux scénarios mutuellement exclusifs :**
- **Scénario « manuporté »** : panneaux dimensionnés pour pose à 2–4 personnes sans engin (poids unitaire cible faible). Avantage : zéro grutage, déploiement rural. Contrainte : limite l'épaisseur/portée.
- **Scénario « engin léger »** : pose au manitou/petite grue. Avantage : panneaux plus grands, moins de joints. Contrainte : coût et accès logistique.

> Cette décision conditionne **toute** la conception (épaisseur, ferraillage, trame, BOM, chiffrage). À trancher en priorité (cf. §5).

---

## 3. Composants principaux à standardiser

| # | Composant | Paramètres à standardiser | Variabilité admise |
|---|---|---|---|
| C1 | **Poteau rainuré** | Section, hauteur(s) d'étage, profondeur/largeur rainure, armatures, platine/attente pied | 2–3 longueurs max |
| C2 | **Panneau plein** | Longueur = trame, hauteur de module, épaisseur, enrobage, feuillure de joint | 1 épaisseur structurelle |
| C3 | **Panneau à réservation** | Idem C2 + réservation porte/fenêtre/grille/ventilation normalisée | Positions normalisées |
| C4 | **Embase / longrine** | Section, ferraillage, encastrement poteau, niveau hors-sol | Selon portée/sol |
| C5 | **Plot/semelle** | Dimensions types selon descente de charge + sol | 2–3 tailles |
| C6 | **Élément d'angle / chaînage** | Liaison de coin, continuité du diaphragme | Standard |
| C7 | **Couvertine / acrotère / larmier** | Profil de couronnement + rejet d'eau | Standard |
| C8 | **Kit toiture** | Pente, entraxe pannes, fixation anti-soulèvement, débord | 2 portées types |
| C9 | **Quincaillerie d'assemblage** | Inserts, goujons, joints, mastics, fixations toiture | Référencée et figée |
| C10 | **Kit menuiserie** | Portes/fenêtres/grilles aux dimensions des réservations C3 | Catalogue fermé |

**Principe directeur :** un **catalogue fermé** de composants + une **matrice de configurations** par usage. Toute demande hors-catalogue = dérogation tracée, jamais une nouvelle gamme.

---

## 4. Points faibles techniques à résoudre en priorité

| Priorité | Point faible | Risque si non traité | Action de résolution |
|---|---|---|---|
| **P0** | **Étanchéité joint panneau/poteau** sous pluie battante tropicale | Infiltrations, dégradation, rejet ERP | Conception joint (profilé+mastic+larmier), essai aspersion sur prototype |
| **P0** | **Stabilité d'ensemble / contreventement** | Effondrement sous vent, non-conformité structure | Note de calcul ingénieur : encastrement pied + diaphragme toiture + refends |
| **P0** | **Ancrage poteau / embase sur sol tropical** | Basculement, tassement différentiel | Étude géotechnique + calcul de fondation par usage/sol |
| **P1** | **Durabilité armatures (corrosion zone côtière/saline + humidité)** | Éclatement béton, perte de durée de vie | Enrobage majoré, classe d'expo, qualité béton, cure |
| **P1** | **Soulèvement toiture au vent** | Arrachement couverture | Fixations dimensionnées, calcul action du vent local |
| **P1** | **Tolérances de fabrication des rainures (DFM)** | Panneaux non emboîtables / jeu excessif | Plans de moules, tolérances, gabarits de contrôle |
| **P2** | **Confort thermique (panneaux béton minces)** | Inconfort, condensation, usage commerce/sanitaire dégradé | Ventilation, débords, traitement de surface, étude thermique |
| **P2** | **Sécurité incendie ERP (issues, désenfumage selon usage)** | Refus commission sécurité | Cahier ERP par usage (cf. §8) |
| **P2** | **Manutention / poids unitaires** | Casse, accidents, surcoût levage | Décision levage (§2) + plan de manutention |

---

## 5. Décisions techniques à figer immédiatement

> Ces décisions sont **bloquantes** : elles conditionnent calcul, plans, moules, BOM et chiffrage. Tant qu'elles ne sont pas figées, aucun livrable aval n'est fiable.

- [ ] **D1 — Trame structurelle** (entraxe poteaux) et **hauteur(s) de module** → 1 trame principale + 1 hauteur d'étage standard.
- [ ] **D2 — Stratégie de pose** : manuporté **OU** engin léger (§2). *Décision la plus structurante.*
- [ ] **D3 — Épaisseur(s) de panneau** et **section de poteau** (pré-dimensionnées, à confirmer par calcul).
- [ ] **D4 — Classe de béton et ciment** : [HYP] **CPJ 42,5** pour éléments structuraux (résistance supérieure recommandée pour fondations/poteaux/dalles) ; voir §9. À confirmer par formulation + essais.
- [ ] **D5 — Nuance acier** : [HYP] **FeE500 / BST 500** (haute adhérence) + treillis ; enrobage selon classe d'exposition.
- [ ] **D6 — Système de stabilité** : encastrement pied + diaphragme toiture + refends d'angle (à valider).
- [ ] **D7 — Système de fondation type** + matrice « sol → fondation ».
- [ ] **D8 — Système de toiture** (matériau couverture, pente, portée, fixation).
- [ ] **D9 — Système de joint d'étanchéité** (profilé/mastic + larmier).
- [ ] **D10 — Intégration réseaux** : fourreaux/réservations CIE & SODECI en fabrication.
- [ ] **D11 — Catalogue fermé de configurations** par usage (interdiction de gammes ad hoc).

---

## 6. Liste complète des documents techniques à produire

**Conception & calcul**
1. **CdCF + CCTP** du système (cahier des charges fonctionnel et technique).
2. **Note d'hypothèses et bases de calcul** (charges permanentes, exploitation par usage, vent, action sismique, thermique, durabilité).
3. **Note de calcul structure** (poteaux, panneaux, assemblages, embase/longrine, fondations, toiture, diaphragme) — *signée ingénieur structure agréé*.
4. **Cadre d'étude géotechnique** (G2) + procédure d'adaptation par site.

**Plans & industrialisation**
5. **Plans d'ensemble + plans d'exécution** (coffrage, ferraillage, assemblages, réservations, calepinage).
6. **Plans de moules / outillage** (DFM) + tolérances.
7. **BOM / nomenclature** par configuration + socle commun.
8. **Notice de montage / SOP d'assemblage** (DFA) + **plan de manutention/levage**.
9. **Plan de Contrôle Qualité (PCQ)** fabrication & réception : fiches, critères d'acceptation, tolérances, gabarits.
10. **Manuel d'industrialisation** (layout atelier, cadence, cure, stockage, logistique).

**Matériaux, coûts, réseaux**
11. **Dossier matériaux & fiches techniques fournisseurs** (béton, acier, toiture, étanchéité, quincaillerie, menuiserie).
12. **Dossier de chiffrage paramétré** (déboursé sec, frais de chantier, transport, levage, frais généraux, marge) — *alimenté uniquement par devis réels datés*.
13. **Dossier réseaux** : schémas électriques conformes exigences CIE ; plomberie/assainissement conformes SODECI ; gestion eaux pluviales.

**Réglementaire & validation**
14. **Dossier réglementaire / permis** (pièces GUPCCU, volet ERP, accessibilité, sécurité incendie).
15. **PV d'essais prototype** (résistance, étanchéité à l'eau, chrono de montage, manutention).
16. **DOE + notice d'exploitation-maintenance** par usage.

---

## 7. Roadmap de développement produit — 30 / 60 / 90 jours

> Étapes d'exécution séquencées par dépendance technique (pas d'estimation de durée au-delà des jalons).

### Jalon J+30 — Cadrage & gel des bases
- Figer D1–D11 (§5), en priorité **D2 (levage)** et **D1 (trame)**.
- Produire **note d'hypothèses & bases de calcul** (§6.2).
- Lancer la **recherche normative officielle** (§8) : Code Construction, CODINORM, LBTP, GUPCCU, ERP ivoirien, vent/sismique.
- **Pré-dimensionnement** (poteaux/panneaux/fondation) — version ingénierie interne.
- **BOM préliminaire** + lancement **demandes de devis fournisseurs** (§9).
- Lancer **étude géotechnique type** sur site pilote.
- Sélectionner **ingénieur structure agréé**, **bureau de contrôle**, **architecte agréé**, **juriste ivoirien**.

### Jalon J+60 — Conception détaillée & préparation prototype
- **Note de calcul structure** + **plans d'exécution** + **plans de moules**.
- **CCTP**, **PCQ**, **SOP de montage** v0.
- **Chiffrage paramétré v0** sur devis reçus.
- **Commande matériaux prototype** + **fabrication des moules**.
- Dossier réseaux v0 (schémas CIE/SODECI).

### Jalon J+90 — Prototype, essais & gel V1
- **Fabrication prototype** : au moins 1 module complet par interface critique (angle, ouverture, toiture).
- **Essais** : montage chronométré, **aspersion/étanchéité**, mise en charge, manutention.
- **Itération DFM/DFA** + corrections plans/moules.
- **Dossier permis pilote** (GUPCCU + ERP).
- **Validation ingénieur + bureau de contrôle** → **gel des spécifications V1** pour industrialisation.

---

## 8. Recherches obligatoires sur la Côte d'Ivoire (état des lieux sourcé + à compléter)

### 8.1 Permis de construire & contrôle urbain (GUPC → GUPCCU)
- [FAIT — B] Le **Guichet Unique du Permis de Construire (GUPC)** est opérationnel à Abidjan : depuis le **29 avril 2016**, toutes les demandes de visas d'urbanisme et de permis de construire du District Autonome d'Abidjan y sont adressées. *(wizodia.com, 2026-06-23)*
- [FAIT — B] Le GUPC **regroupe sur un même site** les représentants de **CIE, SODECI**, Domaine Urbain, Assainissement/Drainage, Urbanisme, Architecture & Matériaux, **Office National de la Protection Civile**, District, Institut d'Hygiène, et les mairies. *(wizodia.com, 2026-06-23)*
- [FAIT — B] En **Conseil des ministres du 9 avril 2025**, un décret a créé le **Guichet Unique du Permis de Construire et du Contrôle Urbain (GUPCCU)**, qui **remplace le GUPC** (instruction des PC, agréments, lutte contre l'occupation illégale du sol). *(Agence Ecofin ; Koaci ; afrique-sur7, 2026-06-23)*
- [FAIT — B] Procédure type : **certificat d'urbanisme** (constructibilité, recul, hauteur, COS) → **architecte agréé** (obligatoire au-delà d'env. 150 m²) → dépôt au guichet → récépissé → commission technique → arrêté signé par le Ministre ou le Maire. *(goafricaonline, 2026-06-23)*
- **[À VÉRIFIER — priorité]** Texte officiel du **décret GUPCCU 2025** (missions/organisation), **liste exacte des pièces** du PC, **catégories de PC**, **agrément technique entreprise**, délais légaux d'instruction (un site secondaire cite *45 jours* — non confirmé officiellement).

### 8.2 Cadre normatif construction
- [FAIT — B] Cadre juridique cité : **Loi n°2014-138 du 24 mars 2014 (Code de la Construction et de l'Habitat)** ; **Décret n°2014-25 du 22 janvier 2014** (permis de construire) ; **Ordonnance n°2013-481 du 02 juillet 2013** (acquisition de terrains urbains). *(oazis.ci — fiabilité B, à confirmer sur texte officiel)*
- [FAIT — B] **CODINORM** est cité comme organisme de normalisation/certification (ex. laquage tôles) et **NI 323** comme norme produit (tôle bac aluminium). *(accio.com, 2026-06-23 — B/C)*
- [FAIT — A] Le **LBTP (Laboratoire du Bâtiment et des Travaux Publics)** mène depuis longtemps des travaux d'adaptation des normes béton au **climat tropical ivoirien** (collaboration CEBTP). *(notice TRID/CEBTP, réf. bibliographique)*
- **[À VÉRIFIER — priorité]** Cadre de **calcul réglementaire applicable en CI** (BAEL/Eurocodes ou référentiel national ?), **normes CODINORM** béton/acier/tôle, **obligation de contrôle technique** par bureau agréé, **classe sismique officielle** et **vitesse de vent de base** (données SODEXAM/météo). ⚠️ *Les règles ERP et Eurocode 8 trouvées en recherche sont des textes **français** : ils servent de référence méthodologique, ils ne constituent pas le droit ivoirien.*

### 8.3 ERP (Établissement Recevant du Public)
- [FAIT — B] L'**Office National de la Protection Civile** est partie prenante au guichet (sécurité). *(wizodia.com)* → l'instruction sécurité ERP passe par cette structure.
- [Référence méthodologique — FR, fiabilité A pour la France, **non applicable de droit en CI**] Principes ERP : classement par **type** (activité) et **catégorie** (effectif), objectif d'**évacuation**, ≥ 2 sorties, matériaux résistants au feu, moyens de secours, registre de sécurité. *(service-public.fr ; sdis ; ministère intérieur FR, 2026-06-23)*
- **[À VÉRIFIER — priorité]** **Règlement de sécurité incendie ERP ivoirien** (texte, classement, exigences par type/catégorie), procédure de la **commission de sécurité** CI, **règles d'accessibilité PMR** en CI.

### 8.4 Foncier
- [FAIT — B] Pièce de propriété requise : **ACD (Attestation de Concession Définitive)** ou **certificat foncier**. *(goafricaonline)*
- [FAIT — B] **Risque foncier réel** : litiges et délivrances multiples d'ACD (affaire « Bessikoi »), enquêtes en cours. *(Agence Ecofin ; afrique-sur7, 2026-06-23)*

### 8.5 CIE (électricité)
- [FAIT — A] **CIE** (Compagnie Ivoirienne d'Électricité) — opérateur ; le **branchement** relie un local jamais alimenté au réseau (branchement définitif). *(cie.ci, 2026-06-23)*
- [FAIT — A] Tarifs régis par **arrêté interministériel n°002/MPEER/MEF/SEPMBPE du 02 janvier 2019** ; **basse tension** et **haute tension**, en **post-paiement** ou **prépaiement** ; tarif domestique général dès **2,2 kVA (10 A)** ; **tarif professionnel** pour petits commerces/industries. *(ANARE-CI, 2026-06-23)*
- [FAIT — A] **PEPT (Programme Électricité Pour Tous)** : assouplit les formalités et modalités de paiement du raccordement. *(cie.ci, 2026-06-23)*
- **[À VÉRIFIER]** **Coût et conditions techniques** d'un branchement professionnel/commerce (BT, puissance, MT le cas échéant), exigences d'installation intérieure conformes.

### 8.6 SODECI (eau & assainissement)
- [FAIT — A] **Branchement normal** (compteur Ø15) : **147 630 FCFA TTC sans compteur**, **166 886 FCFA TTC avec compteur** ; **délai 15 jours** après paiement du devis. *(sodeci.ci ; masodecienligne.ci ; Opera News, 2026-06-23)*
- [FAIT — A] **Abonnement/réabonnement** : **28 443 FCFA** ; effectif sous 48 h. *(Opera News, 2026-06-23)*
- **[À VÉRIFIER]** Règles d'**assainissement** (eaux usées/pluviales), raccordement ou autonomie (fosses), exigences sanitaires pour usage « sanitaire public ».

### 8.7 Matériaux, prix, fournisseurs, douane
Voir §9 (données chiffrées) et §8.8.

### 8.8 Import & douane (si équipements/moules importés)
- [FAIT — A] La CI applique le **Tarif Extérieur Commun (TEC) UEMOA/CEDEAO** : catégories de droits de douane — **Cat. I = 5%** (biens d'équipement, matières premières de base, intrants spécifiques), **Cat. II = 10%** (intrants/produits intermédiaires), **Cat. III = 20%** (biens de consommation finale), avec **Droit de Douane (DD) + Redevance Statistique (RS) + Prélèvement Communautaire de Solidarité (PCS)**. *(Règlement TEC UEMOA, uemoa.int, 2026-06-23)* — *le TEC comporte 5 catégories ; 3 détaillées dans la source.*
- **[À VÉRIFIER]** **Catégorie tarifaire exacte** des moules/équipements à importer, **TVA** applicable, **coûts portuaires d'Abidjan** (manutention, magasinage, transit), **redevances**, et possibilité d'**agrément au Code des Investissements (CEPICI)** pour exonérations sur l'outil industriel.

---

## 9. Données à vérifier avant toute estimation (état des connaissances + qualification)

> ⚠️ Tous les chiffres ci-dessous sont des **repères d'ordre de grandeur** issus de sources datées et qualifiées. **Aucun ne doit servir de base de devis** avant remplacement par un devis fournisseur réel daté.

### 9.1 Ciment
- [FAIT — A] **Arrêté interministériel du 26 décembre 2024** (M. Commerce/Industrie + M. Finances), en vigueur **janvier 2025** : nouveaux plafonds, **baisse de 7 000 FCFA/tonne**. *(afrique-sur7 ; lepatriote ; blog iambeezy, 2026-06-23)*
- [FAIT — A/B] Plafonds TTC tonne à Abidjan : **95 000–99 000 FCFA** (usine), **97 000–101 000** (grossiste), **102 000–106 250** (détail) ; **sac 50 kg : 4 250–5 100 FCFA**. *(lepatriote, citant l'arrêté)*
- ⚠️ **CONFLIT DE SOURCES** : un autre site cite un plafond **sac 42,5 = 3 900 FCFA** et **32,5 = 3 600 FCFA**. *(blog iambeezy)* → **À trancher sur le texte officiel (Journal Officiel)**.
- [FAIT — B] Surcoût transport vers l'intérieur : **+200 à +600 FCFA/sac** (jusqu'à ~4 500 FCFA/sac à Man/Korhogo). *(iambeezy)*
- [FAIT — B] Producteurs : **LafargeHolcim CI (Vridi)**, **CIMAF CI**, **Dangote Cement CI** ; capacité nationale **> 10 Mt/an** ; ~6 unités. Marques : GUEPARD, CIMAF, BÉLIER, CUIRASSE, LIMARK, CIM IVOIRE, BIG CIM. *(iambeezy ; connectionivoirienne ; abidjansolution)*
- **À confirmer :** grade exact requis par poste (42,5 fondations/poteaux/dalles), prix négocié grands volumes, logistique usine→atelier.

### 9.2 Acier (fer à béton)
- [FAIT — C] Fer à béton **≈ 600 000 FCFA/tonne** (Ø6–12) ; botte de **100 kg ≈ 60 000 FCFA**. *(abidjansolution, 2026-06-23 — indicatif)*
- [FAIT — C] Importateur : **≈ 590 USD/tonne** livré Abidjan. *(ferabeton.com)*
- [FAIT — C] Estimation **acier FeE500 façonné + posé (poteau) ≈ 799 FCFA/kg**. *(générateur CYPE Côte d'Ivoire — outil d'estimation)*
- [FAIT — B] Nuances de référence régionales : **FeE500 / BST 500 S**. *(MDT, trouvertoutici)*
- **À confirmer :** prix par diamètre, /tonne livrée atelier, certification (CODINORM/norme ivoirienne aciers béton), conformité section réelle (fraude « fer économique » documentée dans la sous-région).

### 9.3 Béton
- [FAIT — C] Estimation **béton de chantier CPJ-CEM II/A 32,5, B30, pour poteau ≈ 63 100 FCFA/m³**. *(générateur CYPE — estimation)*
- **À confirmer :** prix **BPE en centrale** (PRESTICOM et autres), formulation tropicalisée, écart chantier vs centrale.

### 9.4 Granulats
- [FAIT — C] **Sable** : voyage benne 12 m³ ≈ **90 000 FCFA** (transport inclus, Abidjan) ; sable de carrière Ø0,5 ≈ **200 000 FCFA/12 m³**. *(abidjansolution)*
- [FAIT — C] **Gravier concassé** 5/15–15/25 ≈ **7 000 FCFA/t** ; mélange 0/31,5 ≈ **6 700 FCFA/t** ; sable industriel 0/5 ≈ **6 000 FCFA/t**. *(CoinAfrique)*
- [FAIT — C] Grille détaillée : moellon ordinaire **6 500 F/t**, concassé 25/40 **9 400 F/t**, gravillon 5/15 **11 000 F/t**, sable 0/5 **9 000 F/t** ; transport **70 000 F/10 t**, **90 000 F/20 t**. *(afrimalin ; abidjansolution)*
- **À confirmer :** prix carrière /t et /m³, granulométrie pour préfa, distance carrière→atelier.

### 9.5 Toiture
- [FAIT — C] **Bac acier toiture premier choix ≈ 5 000–6 000 FCFA/m²** ; **tôle prépeinte alu 9 500–11 000 FCFA/m²** ; bac standard azingo ≈ 1 900 FCFA/ml, super tôle ≈ 2 200 FCFA/ml, bac coloré ≈ 2 500 FCFA/ml. *(accio.com, 2026-06-23)*
- [FAIT — C] **Universelle Industries** : seul fabricant certifié **NI 323** (tôle bac aluminium) en CI ; 4/10e **3 700 F**, 5/10e **4 300 F**, 6/10e **5 500 F**. *(accio.com)*
- [FAIT — C] Devis **auvent bac 7×6×2,5 m fourni + posé + ossature ≈ 652 000 FCFA**. *(scribd devis)*
- [FAIT — C] **Risque de décoloration** si laquage non certifié CODINORM ; aluzinc = bon ratio durabilité/prix ; alu = immunité rouille (zone côtière). *(accio.com)*
- **À confirmer :** prix accessoires (faîtières, closoirs, vis EPDM), étanchéité, devis fournisseur ferme.

### 9.6 Menuiserie
- **[À VÉRIFIER]** Prix portes/fenêtres alu & acier, **rideaux métalliques** (commerce), grilles de ventilation/sanitaire, aux dimensions des réservations standardisées.

### 9.7 Main-d'œuvre
- [FAIT — A] **SMIG = 75 000 FCFA/mois** depuis le **1er janvier 2023** (**décret n°2022-986 du 21 déc. 2022**) ; base **40 h/sem (173,33 h/mois)** ; taux horaire **≈ 432,7 FCFA/h**. *(OIT ; décret ; lessentieldeleco, 2026-06-23)*
- [FAIT — A] **SMAG (agricole) = 39 960 FCFA/mois**. *(décret 2022-986)*
- [FAIT — A] **Code du travail : Loi n°2015-532 du 20 juillet 2015** ; cotisation **CNPS ≈ 6,3 %** du brut. *(africarrieres ; zeroname)*
- [FAIT — C] Ouvriers qualifiés (maçon/électricien/plombier) **100 000–250 000 FCFA/mois** ; chefs de chantier **250 000–500 000** ; ingénieurs BTP **300 000–1 000 000**. *(blog iambeezy — indicatif)*
- **À confirmer :** **convention collective BTP ivoirienne** (catégories, taux journaliers maçon/ferrailleur/coffreur/soudeur/manœuvre), charges patronales totales, productivité atelier préfa.

### 9.8 Transport / grutage
- [FAIT — C] Transport granulats ≈ **70 000 F/10 t**, **90 000 F/20 t** (Abidjan). *(abidjansolution)*
- **[À VÉRIFIER]** Tarifs **camion plateau** pour éléments préfa (/km, péages corridors), **location grue mobile/manitou** (/h, /jour), assurances transport.

### 9.9 Coûts portuaires & douane / taxes / délais
- [FAIT — A] Cadre **TEC UEMOA/CEDEAO** (5/10/20 % + DD/RS/PCS) — cf. §8.8.
- **[À VÉRIFIER]** **TVA** applicable matériaux/équipements, **coûts portuaires Abidjan**, **délais** : permis GUPCCU, branchements CIE (variable) / **SODECI 15 j**, appro matériaux, fabrication moules.

---

## 10. Risques (techniques, réglementaires, industriels, logistiques)

| ID | Catégorie | Risque | Gravité | Probabilité | Mitigation |
|---|---|---|---|---|---|
| RT1 | Technique | Infiltration aux joints panneau/poteau | Élevée | Élevée | Conception joint + essai aspersion prototype (P0) |
| RT2 | Technique | Instabilité d'ensemble (vent) | Critique | Moyenne | Note de calcul ingénieur, diaphragme + refends (P0) |
| RT3 | Technique | Tassement/basculement fondation (sol tropical, nappe haute Abidjan/lagune) | Élevée | Moyenne | Étude géotechnique obligatoire par site (P0) |
| RT4 | Technique | Corrosion armatures (humidité/salinité) | Élevée | Moyenne | Enrobage majoré, classe d'expo, cure, contrôle |
| RT5 | Technique | Casse au levage/manutention | Moyenne | Moyenne | Décision levage + plan manutention + inserts |
| RR1 | Réglementaire | Non-conformité ERP (sécurité incendie/accessibilité) | Critique | Moyenne | Cahier ERP ivoirien + commission Protection Civile |
| RR2 | Réglementaire | Refus/retard permis (GUPCCU) | Élevée | Moyenne | Architecte agréé + dossier complet dès le pilote |
| RR3 | Réglementaire | Litige foncier (ACD) sur site pilote | Élevée | Moyenne | Vérification titre par juriste avant tout engagement |
| RR4 | Réglementaire | Système non couvert par référentiel de calcul reconnu | Élevée | Moyenne | Faire valider par ingénieur agréé + bureau de contrôle |
| RI1 | Industriel | Dérive de variantes (perte de standardisation) | Élevée | Élevée | Catalogue fermé + gouvernance des dérogations |
| RI2 | Industriel | Tolérances moules non tenues (panneaux non emboîtables) | Élevée | Moyenne | DFM, gabarits, PCQ, métrologie atelier |
| RI3 | Industriel | Qualité béton/acier hétérogène (fraude fer, ciment) | Élevée | Moyenne | Fournisseurs certifiés + essais LBTP/CODINORM |
| RL1 | Logistique | Surcoût/avarie transport éléments lourds | Moyenne | Moyenne | Conception transportable + devis transport fermes |
| RL2 | Logistique | Délais branchements/raccordements réseaux | Moyenne | Moyenne | Anticiper CIE/SODECI dès dépôt PC |
| RL3 | Logistique | Volatilité prix matériaux | Moyenne | Élevée | Devis datés + clauses de révision + stock tampon |

---

## 11. Validations nécessaires (par tiers compétents)

| Validation | Par qui | Objet | Bloquant pour |
|---|---|---|---|
| **Note de calcul structure** | **Ingénieur structure agréé (CI)** | Poteaux, panneaux, assemblages, embase, fondations, toiture, stabilité | Industrialisation, permis |
| **Contrôle technique** | **Bureau de contrôle technique agréé** | Conformité ouvrage/normes, solidité, sécurité | Réception, assurance |
| **Étude géotechnique** | **Géotechnicien** | Portance, tassements, nappe, type de fondation | Fondations par site |
| **Recevabilité PC** | **Architecte agréé (Ordre des Architectes CI)** | Plans, dossier GUPCCU | Permis de construire |
| **Sécurité ERP** | **Office National de la Protection Civile / commission sécurité** | Évacuation, incendie, accessibilité par usage | Ouverture au public |
| **Conformité juridique** | **Juriste/avocat ivoirien** | Foncier (ACD), Code Construction, agréments, ERP, contrats fournisseurs | Engagement site, exploitation |
| **Réseaux** | **CIE & SODECI** | Branchements, exigences techniques d'installation | Raccordement |
| **Essais matériaux/produits** | **LBTP / CODINORM** | Béton, acier, éléments préfa (cf. voie PRESTICOM) | Qualification produit |

---

## 12. Prochaines actions concrètes (checklist priorisée)

**P0 — à lancer immédiatement (bloquant)**
- [ ] Convoquer une revue de décisions et **figer D1–D11** (§5), priorité D2 (levage) + D1 (trame).
- [ ] Rédiger la **note d'hypothèses & bases de calcul** (charges par usage, vent, durabilité).
- [ ] **Mandater l'ingénieur structure agréé + bureau de contrôle** (cadre de validation).
- [ ] **Sécuriser le foncier du site pilote** (vérification ACD par juriste).
- [ ] Lancer l'**étude géotechnique** sur site pilote.

**P1 — cadrage réglementaire & sourcing**
- [ ] Obtenir les **textes officiels** : décret GUPCCU 2025, Code Construction (Loi 2014-138), règlement **ERP ivoirien**, **normes CODINORM** béton/acier/tôle, **classe sismique + vent de base (SODEXAM)**.
- [ ] Émettre les **demandes de devis** (ciment 42,5, acier FeE500 par Ø, BPE, granulats, toiture aluzinc/alu, menuiserie, transport, grutage) — exiger devis datés.
- [ ] Cadrer **CIE/SODECI** : conditions de branchement professionnel + assainissement.

**P2 — conception & prototype**
- [ ] Produire **note de calcul + plans d'exécution + plans de moules**.
- [ ] Rédiger **CCTP, PCQ, SOP de montage**.
- [ ] **Chiffrage paramétré v0** (déboursé sec → prix de revient) sur devis réels.
- [ ] **Fabriquer moules + prototype** ; réaliser **essais** (montage, étanchéité, charge) ; **itérer** ; **geler V1**.

---

## Annexe — Registre des sources (consultées 2026-06-23)

| Réf | Source | Sujet | Fiabilité |
|---|---|---|---|
| S1 | wizodia.com | GUPC missions/composition | B |
| S2 | Agence Ecofin ; Koaci ; afrique-sur7 | Création GUPCCU (CM 09/04/2025) | B |
| S3 | goafricaonline.com | Procédure PC, ACD, architecte agréé | B |
| S4 | oazis.ci (building) | Code Construction, lois/décrets, normes citées | B (à confirmer officiel) |
| S5 | TRID/CEBTP | LBTP béton climat tropical | A (réf. biblio) |
| S6 | lepatriote ; afrique-sur7 ; iambeezy | Prix ciment / arrêté 26/12/2024 | A/B (conflit sac à trancher) |
| S7 | abidjansolution ; ferabeton ; CYPE | Acier/fer à béton, béton | C |
| S8 | CoinAfrique ; afrimalin ; abidjansolution | Granulats | C |
| S9 | accio.com ; scribd | Toiture bac acier/alu, NI 323 | C |
| S10 | OIT ; décret 2022-986 ; lessentieldeleco ; africarrieres | SMIG/SMAG/Code travail | A |
| S11 | iambeezy ; blog salaires | Salaires BTP indicatifs | C |
| S12 | sodeci.ci ; masodecienligne ; Opera News | Branchement/abonnement eau | A |
| S13 | cie.ci ; ANARE-CI | Tarifs/branchement électricité, PEPT | A |
| S14 | uemoa.int ; douanes.ci ; budget.gouv.ci | TEC UEMOA/CEDEAO, douane | A |
| S15 | goafricaonline ; presticom-ci ; afrikbeton | Préfabricants béton CI | B |
| S16 | service-public.fr ; SDIS ; min. intérieur FR | ERP (référence méthodologique FR, non droit CI) | A (FR) |

---
*Fin du document — Noéma Construction V1. À mettre à jour après gel des décisions D1–D11 et réception des devis fournisseurs.*
