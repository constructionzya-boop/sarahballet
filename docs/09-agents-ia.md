# 09 · Organisation des agents IA du projet Noéma

Le projet est piloté par Jeremy avec une équipe d'agents IA spécialisés.
Chaque agent a un rôle, des livrables et des limites définis.

## 1. Les agents et leurs rôles

| Agent | Rôle | Livrables | Limites |
|---|---|---|---|
| **NOEMA_ENGINEER_AGENT** (ingénieur bâtiment) | Diagnostic technique, système constructif, roadmap ingénierie, veille normative CI | `docs/references/diagnostic-technique-ingenierie-V1.md` (D1-D11, P0-P2, sources qualifiées A/B/C) | Aucune valeur contractuelle : tout doit être validé par un ingénieur structure agréé + bureau de contrôle en CI |
| **Agent stratégie/business** (sessions Claude) | Positionnement, 3 offres de lancement, analyse concurrence (vidéos Brésil/Inde, brochure Kenya), plan de pré-vente LOI | Analyses chantiers (`docs/references/`), plan commercial, prompts de génération visuelle | Les prix restent des ordres de grandeur tant que pas de devis fournisseurs réels datés |
| **Agent dev plateforme** (Claude Code, local PowerShell + web) | Monorepo, 7 sites, API, Connect | Ce repo — architecture `docs/00-08`, code | Ne pousse jamais sur `main` sans demande explicite ; suit la roadmap docs/08 |
| **Génération visuelle** (Sora 2 / ChatGPT Images / fal.ai) | Planches techniques illustratives, rendus commerciaux photoréalistes | Images marketing + planche studio V2 | Les images IA ne sont PAS des plans d'exécution : les cotes exactes vivent dans les dessins vectoriels et les docs — toujours re-vérifier les planches générées (boucle expertise → correction) |

## 2. Le flux de travail validé

```
Idée / besoin (Jeremy)
   │
   ▼
Agent ingénieur ──► diagnostic, décisions D1-D11, points P0
   │                                    │
   ▼                                    ▼
Agent business ──► offre, prix, cible   Génération visuelle ──► rendu/planche
   │                                    │ (boucle : générer → expertiser
   ▼                                    │  → corriger → régénérer)
Agent dev ──► site, configurateur, BOM ◄┘
   │
   ▼
Terrain (prototype, LOI, juriste CI, usine Chine) ──► retours → mise à jour
                                                       NOEMA-PROJET.md
```

**Règle de cohérence** : `NOEMA-PROJET.md` (racine) est la mémoire partagée de
tous les agents. Toute décision actée y est reportée. En cas de contradiction
entre un agent et ce fichier, le fichier gagne — ou Jeremy tranche.

## 3. Déploiement des sessions Claude Code

- **Local (PowerShell, Windows)** : développement quotidien. Lancement :
  `claude` dans le dossier du repo (lit CLAUDE.md automatiquement).
  Mode rapide : `claude --dangerously-skip-permissions` (repo dédié + branche
  protégée = garde-fous git).
- **Web (claude.ai/code)** : sessions d'architecture, analyses lourdes
  (vidéos, PDF), travail asynchrone. Même branche, `git pull` au démarrage.
- **Synchronisation** : les deux environnements poussent sur
  `claude/noema-construction-group-pndut3`. Commits fréquents.

## 4. Dossiers techniques de référence

| Document | Contenu | Emplacement |
|---|---|---|
| Diagnostic ingénierie V1 | Système constructif recommandé, C1-C10, décisions D1-D11 à figer, risques, données CI sourcées (GUPCCU, CIE, SODECI, TEC UEMOA, prix matériaux qualifiés A/B/C) | `docs/references/diagnostic-technique-ingenierie-V1.md` |
| Analyse chantier Brésil | Casa pré-moldada Sorocaba 43 m²/30 jours — séquence de pose 8 étapes, 8 points d'amélioration A1-A8, SOP Noéma v0 | `docs/references/analyse-chantier-bresil-sorocaba.pdf` |
| Jeu de plans V1 (artefact web) | Plans cotés A00-A04 des 3 modules + kit | Artefact Claude (à re-générer en vectoriel dans le repo en Phase 1) |
| Planche studio V2 (image IA) | Studio 3,6×4,8×3,2 — corrections restantes listées dans NOEMA-PROJET.md §2 | Téléchargements Jeremy (à verser dans docs/references/) |
