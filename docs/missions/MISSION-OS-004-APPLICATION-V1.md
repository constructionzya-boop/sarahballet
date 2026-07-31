# OS-004 · APPLICATION V1 — mapping pré-validé, contrats d'outils, idempotence

> Émetteur : Jeremy (via le coordinateur) · Destinataire : session AIOS.
> Ce document EXÉCUTE la partie conception des « 3 choses dès la V1 » de
> MISSION-OS-004 : le mapping est PRÉ-VALIDÉ par Jeremy — la session AIOS
> l'applique tel quel (mapping par liens/déplacements, AUCUNE refonte).
> Si l'arborescence réelle du VPS diffère de OS-002 §2, adapter à
> l'identique d'esprit et signaler l'écart dans le rapport quotidien.

---

## 1. LE MAPPING (arborescence OS-002 → partition OS-004)

| Existant (~/aios/) | Partition | Sauvegarde |
|---|---|---|
| `CLAUDE.md` (constitution) | `/system` | repo SYSTEM |
| `.claude/` (agents, hooks, settings) | `/system` | repo SYSTEM |
| `skills/` (bibliothèque de skills) | `/system` | repo SYSTEM |
| `telegram-bot/` (code du daemon) | `/system` | repo SYSTEM |
| `routines/` (scripts cron) | `/system` | repo SYSTEM |
| `context/` (Jeremy, ton, activités) | `/workspace` | repo WORKSPACE |
| `ventures/` (briefs, missions, memory par venture) | `/workspace` | repo WORKSPACE |
| `ventures/noema/` (CLONE du repo sarahballet) | `/workspace` | **EXCLU** (déjà son propre repo — jamais de double versioning) |
| `memory/` (wiki inter-ventures) | `/workspace` | repo WORKSPACE |
| `core/registry.md` · `core/budget.md` | `/workspace` | repo WORKSPACE |
| `core/reports/` (briefs archivés) | `/workspace` | repo WORKSPACE |
| `core/queue/missions.jsonl` (file VIVANTE) | `/runtime` | **EXCLU** (état transitoire — un snapshot quotidien est copié dans workspace/reports) |
| locks, cache, sessions, logs d'exécution, tmp | `/runtime` | **EXCLU** |
| (nouveau, vide) formulaires/outils générés | `/generated-tools` | repo WORKSPACE (branche ou dossier dédié) |
| `.env` (secrets) | hors partition | **JAMAIS dans aucun repo** (chmod 600 ; sauvegarde manuelle chiffrée par Jeremy) |

Règles d'application : créer les 4 racines, déplacer par `git mv`/`mv` en
conservant des liens symboliques temporaires si des scripts pointent vers
les anciens chemins ; **deux dépôts Git privés distincts** (SYSTEM,
WORKSPACE) avec `.gitignore` excluant `/runtime`, `.env`, les clones et
tout fichier > 50 Mo ; premier commit de chaque repo = état initial ;
sauvegarde = push quotidien (dans la routine de nuit, APRÈS la mission).

## 2. CONTRATS D'OUTILS V1 (les actions qui existent déjà)

Format : name · risk · requires_approval · idempotent · limites.

| Outil | Risque | Approbation | Idempotent | Limites exécutoires |
|---|---|---|---|---|
| `fs.read` (workspace) | low | non | oui | jamais hors ~/aios/ ; jamais .env |
| `fs.write` (workspace, generated-tools) | low | non | oui (écrase versionné) | JAMAIS dans /system hors mise à jour votée ; jamais .env |
| `fs.delete` | high | **OUI (toujours)** | — | corbeille ~/aios/runtime/trash 30 j, jamais de rm définitif |
| `shell.exec` | medium | non (journalisé) | non | user aios uniquement ; nice/ionice ; interdits : sudo, opérations CloudPanel, ports 80/443 |
| `git.commit_push` (branches de travail) | medium | non (journalisé) | oui (idempotence par SHA) | jamais main ; jamais force-push |
| `web.search` / `web.fetch` | low | non | oui | volumes modérés ; CGU/robots ; log des domaines |
| `telegram.send` (à Jeremy SEUL) | medium | non | **clé requise** (voir §3) | allowlist chat_id ; max 20 messages/jour hors réponses directes |
| `claude.subagent` (invoquer un agent) | medium | non | — | 1 session lourde à la fois ; budget loggué |
| `email.*`, `whatsapp.*`, paiements, publication publique | high | **DENY par défaut** (inexistants en V1) | — | activables uniquement par ajout d'un contrat validé par Jeremy |

Implémentation V1 : ces contrats vivent dans `/system/contracts/tools.yaml`
et sont APPLIQUÉS par les hooks Claude Code (PreToolUse → refus hors
contrat) — pas seulement écrits dans la constitution. Chaque appel refusé
est journalisé et remonte au brief du matin.

## 3. IDEMPOTENCE DES ROUTINES (dès cette semaine)

- Clé : `"{routine}-{date}"` — ex. `brief-2026-08-01`,
  `nightly-{mission_id}-2026-08-01`.
- Avant exécution : si `runtime/jobs/done/{clé}` existe → SKIP silencieux
  (loggué). Après succès : créer le marqueur avec horodatage + résumé.
- Échec : `retry_count` max 2, backoff 10 min, puis statut `failed`
  remonté au brief du matin — JAMAIS de relance infinie.
- Verrou global : `runtime/locks/claude.lock` (une seule session lourde à
  la fois) ; verrou périmé > 3 h = cassé avec alerte au brief.
- Cas critique couvert : un cron qui redémarre ne renvoie JAMAIS deux
  briefs Telegram ni ne rejoue une mission déjà livrée.

## 4. CRITÈRE DE FIN

Rapport à Jeremy (brief du matin suivant) contenant : l'arborescence
finale réelle, l'URL des 2 dépôts de sauvegarde, le tools.yaml en
vigueur, la preuve d'un skip d'idempotence testé (lancer 2× le brief le
même jour), et tout écart par rapport au présent mapping.
