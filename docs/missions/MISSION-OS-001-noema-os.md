# MISSION-OS-001 — NOEMA_OS : le système d'exploitation IA du groupe

> Émetteur : Jeremy (fondateur) · Destinataire : session terminal dédiée
> (architecte plateforme IA). Contexte : une base EXISTE déjà (projet,
> base de données actée, structure d'OS commencée) — cette mission donne
> le POURQUOI, le périmètre complet et le programme. **Commencer par
> l'audit de l'existant (Phase 0), ne rien réécrire qui existe déjà.**

---

## 1. LA VISION (le pourquoi — à intégrer avant toute ligne de code)

Aujourd'hui, Jeremy ne peut travailler sur ses projets QUE devant son
ordinateur personnel : dossiers locaux, sessions terminal à relancer,
agents qu'il faut prompter un par un. Le but de NOEMA_OS :

1. **Tout héberger en ligne** : projets, dossiers, données, mémoire des
   agents — accessibles de partout, plus aucune dépendance au PC local.
2. **Une équipe d'agents IA hébergée qui travaille en continu** (cycles
   programmés 24/7) : les agents produisent pendant que Jeremy dort,
   voyage ou est sur le terrain — scraping, études, marketing, documents
   investisseurs, développement des sites.
3. **Fin du prompt-par-prompt** : Jeremy donne des BRIEFS GLOBAUX (les
   objectifs, les priorités, les échéances) ; l'OS découpe en tâches
   quotidiennes, les exécute, et rend compte chaque jour.
4. **Interconnexion** : les agents partagent une mémoire et se passent le
   travail (l'étude technique nourrit le marketing, le sourcing nourrit
   les business plans, etc.) — une seule équipe, plusieurs projets.
5. **Échéance structurante : voyage en Chine en OCTOBRE 2026** — à cette
   date, chaque entreprise du groupe doit être structurée (site, business
   plan, catalogue fournisseurs) pour négocier sur place.

## 2. PRINCIPES D'ARCHITECTURE (à respecter, en s'appuyant sur l'existant)

- **Registre d'agents** : chaque agent = un system prompt versionné + un
  périmètre + des livrables + des limites (généraliser le modèle
  `docs/agents/` du repo Noéma). Équipe existante à intégrer d'office :
  NOEMA_BET, NOEMA_CMO, NOEMA_VISUAL, NOEMA_ENGINEER, SITE, ARCHI
  (+ le coordinateur). En créer de nouveaux par projet selon besoin.
- **Mémoire partagée** : les repos Git + la base de données actée = la
  seule source de vérité. Tout livrable est committé/enregistré ; un
  agent commence toujours par se synchroniser. Les décisions actées
  (`docs/decisions/`) s'imposent à tous.
- **Orchestrateur + planification** : un mécanisme de tâches programmées
  (cron/sessions planifiées — proposer le mécanisme RÉALISTE disponible
  avec l'abonnement Claude existant, et chiffrer ce que « 24/7 » coûte
  vraiment ; ne pas promettre du temps réel si c'est du batch).
- **File de missions** : chaque brief global de Jeremy est décomposé en
  missions datées, priorisées, assignées à un agent, avec critère de
  « fini ». Statuts visibles (à faire / en cours / livré / bloqué).
- **Rapport quotidien unique** : chaque matin, UN compte rendu consolidé
  (ce qui a été produit, ce qui est bloqué, les décisions attendues de
  Jeremy) — envoyé sur son canal préféré (WhatsApp/email [à confirmer]).
- **Human-in-the-loop OBLIGATOIRE** : aucun agent ne peut — sans
  validation explicite de Jeremy — envoyer un message à un tiers réel,
  publier publiquement, dépenser, signer, ou promettre quoi que ce soit
  à un investisseur. Les agents PRÉPARENT ; Jeremy APPUIE sur le bouton.

## 3. PHASE 0 — AUDIT DE L'EXISTANT (premier livrable, avant tout)

Jeremy a déjà : un projet OS commencé, une base de données actée, une
structure. Cartographier : ce qui existe (schéma DB, arbo, code, hébergement
choisi), ce qui manque par rapport aux §1-2, les écarts de sécurité
(secrets, accès, sauvegardes). Rendre : un état des lieux + un plan de
complément (PAS de refonte) + **maximum 5 questions** à Jeremy pour lever
les ambiguïtés bloquantes. Attendre ses réponses avant la Phase 1.

## 4. LE PORTEFEUILLE DE PROJETS (ce que l'équipe doit produire)

### P1 — Noéma Construction (le vaisseau amiral — continuité)
Poursuivre ce qui tourne déjà : site, marketing (missions MKT), études
techniques (planches, BET), visuels, investisseurs. L'OS reprend la
coordination de ces travaux existants sans les casser.

### P2 — Les marques annexes B2B : Étansol, Hydralis, Ventalis, Saniva
Pour CHACUNE des 4 (négoce import Chine, JAMAIS de travaux) :
- site vitrine (template partagé `packages/brand-site` du monorepo) ;
- business plan complet (marché CI/GA, offre, pricing, projections [HYP]) ;
- plan marketing + tunnel de vente (WhatsApp-first, cohérent avec les
  méthodes NOEMA_CMO) ;
- **scraping/sourcing fournisseurs Chine** : catalogues matériaux, prix
  FOB indicatifs [TBV devis], MOQ, certifications, contacts — consolidés
  en fiches comparables. Scraping ÉTHIQUE : sources publiques, respect
  des CGU/robots.txt, pas de contournement d'accès.
- Livrable final par marque : un DOSSIER CHINE prêt pour les rendez-vous
  d'octobre (qui voir, quoi demander, grille de négociation).

### P3 — Investisseurs
Data room propre (dossier investisseur, pitch deck, chiffres sourcés ou
[HYP] assumés), liste QUALIFIÉE de cibles (fonds diaspora, DFI, business
angels Afrique) avec fiches par cible — la PRISE DE CONTACT reste
manuelle (Jeremy). Ligne rouge légale : aucune promesse de rendement,
cadre « Pionniers » tant que la réglementation n'est pas actée.

### P4 — L'incubateur (les idées de Jeremy en continu)
Un pipeline standard pour chaque nouvelle idée de commerce/app qu'il
dépose (y c. le développement de LIÉ en Afrique) : étude flash marché →
business plan léger → maquette/landing → plan de lancement → verdict
GO/NO-GO chiffré. Les idées entrent par un simple message ; l'OS fait le
reste et présente le verdict au rapport quotidien.

## 5. CADENCE

- Brief global de Jeremy (quand il veut) → décomposition en missions.
- Cycles de travail programmés (nuit incluse) selon le mécanisme choisi.
- Rapport quotidien le matin ; revue hebdo consolidée (avancement par
  projet, dépenses de tokens/API, risques).
- Priorité par défaut jusqu'à OCTOBRE : P2 (dossiers Chine) > P1 > P3 > P4.

## 6. GARDE-FOUS (non négociables)

1. Human-in-the-loop du §2 (aucune action externe sans validation).
2. Anti-invention : chiffres sourcés et datés ou tagués [HYP]/[TBV] —
   règle héritée de tout l'écosystème Noéma.
3. Les décisions actées (`CLAUDE.md`, `docs/decisions/`) s'imposent ;
   contradiction → escalade à Jeremy, jamais d'arbitrage silencieux.
4. Sécurité : secrets hors des repos, accès par variables d'environnement,
   sauvegarde de la base, journal des actions des agents.
5. Budget : suivi des coûts (API/tokens/hébergement) dans le rapport
   quotidien ; alerte si dérive.
6. Jamais pousser sur main sans demande explicite ; un repo/projet, une
   branche de travail.

## 7. LIVRABLES IMMÉDIATS DE CETTE MISSION

1. Audit Phase 0 + ≤5 questions (§3).
2. Architecture cible dessinée sur l'existant (schéma + choix du
   mécanisme de planification + coûts estimés [HYP]).
3. Calendrier rétro-planifié depuis OCTOBRE (dossiers Chine = jalon dur).
4. Le premier « rapport quotidien » réel dès que le socle tourne.
