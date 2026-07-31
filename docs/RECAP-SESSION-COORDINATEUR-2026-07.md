# RECAP — Session Coordinateur (juillet 2026)

> **Pour la nouvelle session Claude** : tu reprends le rôle de
> **Coordinateur** de l'écosystème de Jeremy (constructionzya@gmail.com).
> Lis d'abord `CLAUDE.md` (auto-chargé), puis ce fichier EN ENTIER.
> Le repo est la mémoire partagée de toutes les sessions : tout ce qui
> est cité ici existe dans `docs/`, `tools/plans/` ou `sites/`.
> Branche de travail : `claude/noema-construction-group-pndut3` —
> jamais de push sur main sans demande explicite.

---

## 1. Qui est Jeremy et comment il travaille

Entrepreneur multi-projets France ↔ Côte d'Ivoire/Gabon, sourcing Chine.
Langue : français (code en anglais). Trésorerie serrée : plafonds
explicites, chaque euro traçable. Il décide vite sur recommandation
argumentée (« LA reco d'abord, jamais dix options sans avis »), exige le
réel (« analyse trois fois avant de me montrer »), tague tout chiffre
invérifiable [HYP]/[TBV], et attend d'être challengé AVANT une décision
coûteuse. Profil complet : `docs/os-numa/NUMA-PROFIL-JEREMY.md`.

**Jalon dur : voyage en CHINE en OCTOBRE 2026** (dossiers fournisseurs
des 4 marques annexes prêts = priorité n°1).

## 2. Noéma — état produit (l'essentiel technique)

Le système est décrit dans `tools/plans/specs.json` (**source de vérité —
ne JAMAIS la modifier sans accord explicite**) ; le Studio dans
`tools/plans/specs-studio.json`.

- **Système** : trame 1200, panneaux P1 1200×600×60 (~104 kg,
  manuportés), poteaux rainurés 150×150×2900 (rainure trapézoïdale
  70/78/40, dépouille 1:10), mur 200+4×600+claustra 300 = 2900, lame
  d'air → 3200 hors tout. Catalogue fermé P1-P9 + P1G, zéro coupe.
  Béton C30/37, armature galva ST25C enrobage 27 mm, cure 7 j.
- **DÉCISIONS démontage** (actées, dans CLAUDE.md et
  `docs/decisions/2026-07-19-fin-demontage.md` +
  `2026-07-26-location-demontable-terrain-10ans.md`) :
  **VENDU = définitif** (empilage à sec puis rainures coulissées au
  mortier, scellement 400 + dalle) · **LOCATION = démontable UNIQUEMENT
  sur foncier sécurisé ≥ 10 ans** ; impayé → on remplace le locataire,
  on ne démonte pas (démontage = dernier recours). Assise location
  simplifiée plots + platines 4×M12 (skid complet supprimé — le détail
  PL-03 correspondant est obsolète, révision V2 en file).
- **Toiture parasol** : équerres ÉTAGÉES (marche 60 mm par travée de
  1200 = pente 5 %, têtes de poteaux toutes à 2900). Étude pluie/vent :
  verdict **GO marché** avec 3 parades pluie battante + essais E7/E9 à
  faire sur module témoin. Docs : `docs/technique/ETUDE-TOITURE-PLUIE-
  VENT-V1.md`, plan éclaté PL-08.
- **Verdict panneaux verticaux (type Lidget Compton)** : après analyse
  vidéo + workflow adversarial multi-experts → **on GARDE l'horizontal,
  on VOLE le moule décoratif**. Pack Façade
  (`docs/technique/SPEC-PACK-FACADE-V1.md`) : location = fausses assises
  moulées pas 200 + joints teintés ; vendu = enduit+peinture. Test photo
  WhatsApp 30-50 prospects AVANT de graver le moule.
- **Panneau long indien (trame 2400)** : possible en V2 avec 2-3 HA8
  galva (HA10+ interdit par l'enrobage 27) ; l'acier rattrape l'ELU
  mais pas le jeune âge ni l'enrobage. Pas de changement en V1.
- **MEP Studio** : 4 règles (pas de saignées ; élec apparente par
  claustra ajouré ; fluides par réservations MOULÉES en plinthe R1-R5 ;
  façade technique arrière unique). 54 checks bloquants dans
  `tools/plans/check-studio.mjs`. Docs : `ETUDE-MEP-STUDIO-V1.md`,
  planches PL-06/07.
- **Planches** : PL-01→09 générées par `tools/plans/generator.html` +
  scripts render-*.mjs (Chromium : `/opt/pw-browsers/chromium-*/chrome`).
  Protocole : render → Read du PNG → corriger collisions → re-render
  (2-3 passes).

Rappel obligatoire sur tout livrable technique : « hypothèse V1 à
valider par ingénieur structure agréé ».

## 3. Le registre des agents (docs/09-agents-ia.md §0)

7 sessions Claude : **Coordinateur** (= cette session, la tienne),
NOEMA_BET, NOEMA_CMO, NOEMA_VISUAL, NOEMA_ENGINEER, SITE, ARCHI.
Synchronisation par git pull — le repo est la mémoire.

État connu des sessions externes (via leurs commits) :
- **SITE** : refonte passe 1 livrée (DA + 15 composants + home) —
  **ATTEND les retours de Jeremy** avant la passe 2 (MISSION-SITE-002).
- **NOEMA_CMO** : BENCHMARK-001, STRATEGIE-001 (5 stratégies plafond
  2 000 €), briefs S1-S5, plan 30 j, BRAND-BOOK livrés.
- **ARCHI** : ETUDE-PROUVE-BIOCLIMATIQUE-V1 livrée (MD + PDF, 13 réfs).
- **Session AIOS (VPS)** : plan validé mais **RIEN d'exécuté** (pas de
  SSH configuré, aucun fichier créé sur le VPS).

## 4. AIOS / Numa — le système d'exploitation IA de Jeremy

Objectif : tous les agents hébergés 24/7 sur son VPS Hostinger KVM2
(CloudPanel), briefs globaux au lieu de prompts, ventures
interconnectées. Les 4 missions + l'application sont écrites et
poussées, prêtes à être exécutées par la session AIOS du VPS :

- `docs/missions/MISSION-OS-001-noema-os.md` — vision, human-in-the-loop.
- `MISSION-OS-002-portefeuille-ventures.md` — registre des ventures :
  **NOEMA · LEA (agent vocal — l'IA prépare, l'HUMAIN appelle) · IMMO ·
  WEBFLOW · LAB**. COMPTA retirée (décision Jeremy). Arbo ~/aios/,
  agents, routines (brief 06h30 / 1 mission de nuit / hebdo), garde-fous.
- `MISSION-OS-003-modele-de-donnees.md` — 7 tables Postgres+pgvector
  LOCAL, facts [FAIT]/[HYP]/[TBV] en base, permissions par HOOKS.
- `MISSION-OS-004-architecture-runtimes.md` — 5 runtimes, Tool Gateway
  (le modèle ne touche JAMAIS un credential), jobs idempotents,
  micro-apps schema-driven, control/tenant plane pour le futur produit.
- `MISSION-OS-004-APPLICATION-V1.md` — mapping PRÉ-VALIDÉ /system
  /workspace /generated-tools /runtime, 2 repos de sauvegarde
  (SYSTEM + WORKSPACE), 9 contrats d'outils V1 (fs.delete = toujours
  approbation + corbeille 30 j ; email/whatsapp/paiements = DENY),
  clés d'idempotence {routine}-{date}.

**Numa** = nom INTERNE de l'orchestrateur personnel (chef de cabinet
numérique, une seule voix, brief 06h30 contractuel ☀️, ose contredire,
prépare-jamais-n'envoie) : `docs/os-numa/NUMA-IDENTITE.md` +
`NUMA-PROFIL-JEREMY.md`.

**Checklist de lancement officiel (livrée à Jeremy — 3 gestes à lui,
~25 min)** : (1) créer le user SSH `aios` + clé publique (commandes
fournies), (2) installer et logger Claude Code sur le VPS, (3) token
BotFather dans `~/aios/.env` (chmod 600) + /start sur le bot. Ensuite sa
session VPS exécute la V1 complète (OS-002 §6 + mapping APPLICATION +
identité os-numa). **Critère de fin : « Numa en poste » puis premier
brief 06h30 — Jeremy doit le transférer au Coordinateur pour revue.**

## 5. Relayo / produit commercial (ex-« Numa » public)

- Audit complet du concurrent **aios.fr / Azuro** (Thomas Berton) :
  `docs/references/AUDIT-AIOS-AZURO.md`. Vrais prix 399/499/799 € HT/mois
  + part Claude 20-100 €. Produit réel = environnement privé piloté en
  langage naturel. Faiblesses : sandbox/rollback/permissions non
  démontrés, offres incohérentes. Leurs « 5 preuves de démo » = notre
  script commercial (natif chez nous via Git).
- **Naming** : Numa pris (numa-soft.fr) · Nokto pris · **Relayo = signal
  vert** (INPI + domaine relayo.fr encore [TBV]). Résolution : Numa =
  interne, marque commerciale décidée plus tard (reco : Relayo).
- **Landing livrée** : `sites/numa/index.html` (design « atelier de
  nuit », héros Telegram animé, tarifs 0/79*/sur-devis avec fineprint
  BYO-Claude, placeholders contact@example.com). Artifact privé publié :
  https://claude.ai/code/artifact/2fb04900-58d4-43c9-8319-202b91ce2316
- **Reco pricing en attente de décision** : 199 €/mois offre d'attaque
  + 449 €/mois accompagné (vs marché 399-799 €).

## 6. Règles non négociables (toujours en vigueur)

1. Jamais pousser sur main ; jamais modifier `specs.json` sans accord
   explicite.
2. Anti-invention absolue : [FAIT]/[HYP]/[TBV] ; prix = ordres de
   grandeur datés.
3. Secrets HORS Git (~/aios/.env chmod 600) ; jamais de mot de passe
   collé en chat (SSH par clé publique, user non-root `aios`) ; le
   numéro de téléphone de Jeremy n'est PAS stocké dans le repo.
4. **COMPTA retirée** du portefeuille — aucune donnée client comptable
   dans l'AIOS. **VTC Control et FLOURISH : à OUBLIER** (purgés des
   missions — ne jamais les réintroduire).
5. LEA : AUCUN appel automatisé sortant — l'IA prépare, l'humain
   appelle (RGPD/Bloctel [TBV]).
6. Human-in-the-loop pour TOUTE action vers l'extérieur ; bot Telegram
   allowlisté sur le chat_id de Jeremy seul ; jamais toucher CloudPanel
   ni les ports 80/443 ; 1 session Claude lourde à la fois.
7. Investissement diaspora : mode « Pionniers » uniquement, aucune
   promesse de rendement.
8. Commits : footer Co-Authored-By + Claude-Session uniquement — jamais
   d'identifiant de modèle ailleurs.

## 7. En attente / file de travail

**Décisions attendues de Jeremy :**
- Prix Relayo (reco 199/449 €) → puis mise à jour de
  `sites/numa/index.html` (tarifs, renommage éventuel, vrais emails,
  mentions légales) + republication artifact (même fichier = même URL).
- Retours sur la passe 1 du site Noéma → débloquer la passe 2 (SITE).
- Les 3 gestes VPS pour lancer Numa (§4 ci-dessus).
- Ordre explicite « injecte » pour le JSON §5 d'ING-001 dans
  `specs.json` → puis planches V2.

**File technique Noéma (BET) :** spec du coulis de rainure · détail
assise location plots+platines 4×M12 · révision PL-03 V2 · test photo
façade (30-50 prospects WhatsApp) · confirmation vent SODEXAM · essais
E7/E9 sur module témoin.

**À fournir par Jeremy :** kit de données Webflow (devis réels, prix,
sites livrés) · vérifications Relayo (INPI + domaine).

## 8. Comment reprendre

1. `git pull` (les sessions locales/VPS de Jeremy poussent sur la même
   branche — en cas de rejet : `git push || (git pull --rebase && git
   push)`).
2. Ne rien entreprendre de nouveau sans demande : la prochaine action
   attendue est soit une décision de Jeremy (§7), soit le premier
   « ☀️ Brief Numa » à relire quand il le transférera.
3. Tout livrable technique : relire 2-3 fois avant de montrer, PDF
   propre si demandé, français dans les échanges.
