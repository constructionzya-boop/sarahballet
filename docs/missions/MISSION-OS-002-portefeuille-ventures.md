# MISSION-OS-002 — L'équipe IA multi-ventures sur le VPS (architecture V1)

> Émetteur : Jeremy · Destinataire : session AIOS (architecte plateforme).
> **Complète MISSION-OS-001** et le plan VPS déjà validé (KVM2 Hostinger
> géré par CloudPanel, ~/aios/ isolé, user non-root, sous-agents Claude
> Code réels, Telegram, routines cron, plafonds Pro/Max respectés).
> Objet : étendre le hub au PORTEFEUILLE COMPLET de Jeremy et construire
> la PREMIÈRE VERSION exécutable.
> Révision : la venture COMPTA a été RETIRÉE du portefeuille sur décision
> de Jeremy (2026-07-26) — aucune donnée client comptable dans l'AIOS.

---

## 1. LE PORTEFEUILLE (registre officiel des entités)

| Code | Entité | Nature | État | Priorité V1 |
|---|---|---|---|---|
| NOEMA | Noéma Group (construction + 4 marques) | industriel | actif — mémoire = repo sarahballet | haute (jalon Chine octobre) |
| LEA | « Léa » — agent vocal IA vendu aux professionnels (prospection par cold calling) | produit SaaS | à structurer | haute |
| IMMO | Agence d'optimisation d'annonces immobilières | service | à structurer | moyenne |
| WEBFLOW | Création de sites & workflows IA pour clients | service (déjà pratiqué) | actif informel | **haute (revenus courts)** |
| LAB | Studio de recherche : startups à lancer en Afrique francophone | R&D | à structurer | fond de tâche |
| (ctx) | Numeribat · GR Rénovation | activités existantes de Jeremy | contexte | fiches contexte seulement |

D'autres entités seront ajoutées ensuite : l'architecture doit rendre
l'ajout d'une venture = **1 dossier + 1 fiche, zéro refactor**.

## 2. ARCHITECTURE CIBLE `~/aios/` (V2 du plan validé)

```
~/aios/
├── CLAUDE.md                  # constitution : règles globales + garde-fous (§5)
├── context/                   # Jeremy, ton de voix, activités existantes
├── core/                      # LE MOTEUR (commun à toutes les ventures)
│   ├── queue/                 #   missions.jsonl : file de missions datées/priorisées/assignées
│   ├── reports/               #   rapports quotidiens générés (archivés par date)
│   ├── registry.md            #   le tableau du §1, tenu à jour
│   └── budget.md              #   suivi conso tokens/quota par routine
├── .claude/agents/            # sous-agents TRANSVERSES (mutualisés) :
│   │                          #   dev-web · marketing · research · redaction ·
│   │                          #   scraper (éthique) · compliance (relit AVANT sortie)
├── ventures/
│   ├── noema/                 #   POINTEUR → clone du repo sarahballet (jamais de copie)
│   ├── lea/                   #   brief.md · agents dédiés · missions/ · memory/
│   ├── immo/                  #   idem
│   ├── webflow/               #   idem (+ portfolio clients)
│   └── lab/                   #   idem
├── skills/                    # SOPs réutilisables (créer-un-site, business-plan, dossier-chine…)
├── memory/                    # wiki inter-ventures (les leçons voyagent)
├── telegram-bot/              # canal de pilotage + rapport quotidien (Phase 3 du plan VPS)
└── routines/                  # crons (§4)
```

Règles CloudPanel/VPS : ne JAMAIS toucher aux sites gérés par CloudPanel ;
aucun service AIOS sur les ports 80/443/CloudPanel ; ressources plafonnées
(nice/ionice, 1 session Claude à la fois par défaut) ; tout secret dans
`~/aios/.env` (chmod 600), jamais dans Git.

## 3. L'ÉQUIPE (organigramme d'agents)

- **ORCHESTRATEUR** (le chef d'atelier) : lit la queue, assigne, relance,
  compile le rapport quotidien, surveille le budget. C'est le seul qui
  tourne en routine ; les autres sont invoqués à la demande.
- **Transverses** (mutualisés, `.claude/agents/`) : dev-web, marketing,
  research, rédaction, scraper, **compliance** (voir §5 — il relit tout
  livrable qui cite un chiffre, un prix, une promesse ou vise l'extérieur).
- **Dédiés par venture** (créés en V1, prompts versionnés) :
  - LEA : product-manager vocal (specs produit, scripts d'appel, pricing,
    argumentaires) + prospection (LISTES et séquences — pas d'appels).
  - IMMO : expert annonces (audit d'annonces, réécriture, photos à
    améliorer, grille tarifaire du service).
  - WEBFLOW : chef de projet clients (devis type, templates de sites,
    catalogue de workflows vendables).
  - LAB : analyste ventures Afrique francophone (pipeline GO/NO-GO de
    MISSION-OS-001 §4-P4).
  - NOEMA : les agents EXISTANTS du repo (BET, CMO, VISUAL…) — convertir
    leurs system prompts en sous-agents, ne pas les réécrire.

## 4. ROUTINES V1 (sobres — plafonds Pro/Max)

1. **06h30 — Brief du matin** : synthèse par venture (avancées, blocages,
   décisions attendues), conso quota, envoyé sur Telegram. LA routine reine.
2. **Nuit — 1 mission de fond** : l'orchestrateur exécute LA mission
   prioritaire de la queue (une seule, à fond) — pas dix en parallèle.
3. **Hebdo — Revue** : état du portefeuille, arbitrages proposés, budget.
4. (NOEMA) **Quotidien — sync repo** : git pull + état des missions Noéma.
Tout le reste est à la demande via Telegram (« lance X sur Y »).

## 5. GARDE-FOUS — dont DEUX JURIDIQUES NON NÉGOCIABLES

### 5.1 Hérités d'OS-001 (rappel)
Human-in-the-loop pour TOUTE action vers l'extérieur (message, appel,
publication, dépense) · anti-invention [HYP]/[TBV] · décisions actées
prioritaires · scraping éthique (sources publiques, CGU/robots respectés,
volumes modérés) · budget suivi.

### 5.2 LEA — prospection téléphonique encadrée ⚠
- Le démarchage téléphonique est très encadré (RGPD, Bloctel, horaires,
  consentement selon pays ; règles spécifiques aux automates d'appel).
  V1 : les agents construisent le PRODUIT (scripts, démo, pricing, site)
  et des LISTES B2B qualifiées à la main — **AUCUN appel automatisé
  sortant n'est lancé par un agent**. Les appels de vente, c'est Jeremy
  (ou un cadre légal validé [TBV]) — l'IA prépare, l'humain appelle.
- Le produit Léa lui-même (agent vocal pour les clients pros) devra
  embarquer consentement/mentions — à specifier dans le brief produit.

### 5.3 IMMO — données de tiers
Optimiser les annonces d'un CLIENT (mandat) : OK. Scraper massivement les
portails (SeLoger, LBC…) pour prospecter : CGU restrictives — le
prospect se trouve par des moyens licites (annonces publiques consultées
manuellement/volumes faibles, réseaux, bouche-à-oreille) [compliance].

## 6. PROGRAMME V1 (ce que le terminal construit MAINTENANT)

1. **Squelette** : arborescence §2 complète + CLAUDE.md constitution +
   registry + queue vide + fiches `brief.md` de chaque venture (générées
   depuis ce document, complétées de questions à Jeremy si trous).
2. **Agents** : les 6 transverses + les 5 dédiés (prompts versionnés,
   NOEMA importés du repo).
3. **Orchestrateur + routine 1 et 2** opérationnels (cron réels).
4. **Premières missions en queue** (ordre imposé) :
   - WEBFLOW : catalogue d'offres + 3 templates de devis — les revenus
     courts d'abord ;
   - LEA : brief produit V1 + démo scriptée + landing ;
   - NOEMA : reprendre la queue existante (dossiers Chine) ;
   - IMMO : offre + grille de prix + 3 audits d'annonces exemples ;
   - LAB : première étude « 5 opportunités Afrique francophone » sourcée.
5. **Rapport quotidien n°1 envoyé** = critère de fin de la V1.

Interdits V1 : Telegram bot ouvert au public (authentifié Jeremy seul),
tout envoi vers un tiers réel, toute dépense. Livrer le coût estimé de
fonctionnement (quota/routines) avec le rapport n°1.
