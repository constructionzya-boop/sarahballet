# MISSION-OS-004 — Architecture des runtimes (cible plateforme)

> Émetteur : Jeremy · Destinataire : session AIOS (architecte plateforme).
> Source : rapport « Architecture technique plateforme type AIOS » v1.0
> (31/07/2026) fourni par Jeremy, distillé et ALIGNÉ sur le périmètre
> officiel (portefeuille OS-002 uniquement — les exemples hors périmètre
> du rapport source sont exclus sur décision de Jeremy).
> Position dans la série : OS-001 = pourquoi · OS-002 = équipe/moteur V1 ·
> OS-003 = données/mémoire V1.5 · **OS-004 = architecture cible des
> runtimes** — la trajectoire vers la plateforme (et le futur produit
> RELAYO/WEBFLOW). La V1 fichiers+cron reste INCHANGÉE ; chaque brique
> ci-dessous s'adopte progressivement, jamais en refonte.

---

## 0. Principe directeur

**Pas de « super-agent » unique** : une plateforme de moteurs spécialisés
reliés par un orchestrateur et contrôlés par une couche de permissions.
La valeur n'est pas dans le modèle d'IA : elle est dans l'architecture
qui organise les sources, versionne les procédures, contrôle les outils,
sépare les runtimes et journalise chaque exécution.

## 1. Séparation fondamentale (applicable DÈS la V1 — mise à jour arbo)

```
/system           # code plateforme, connecteurs, moteur d'agents, bibliothèque de skills
/workspace        # documents, mémoire, projets, données et préférences de l'utilisateur
/generated-tools  # formulaires, dashboards, scripts, micro-apps, API générées
/runtime          # temporaires, sessions, cache, jobs en cours, logs d'exécution
```
RÈGLE : ne JAMAIS mélanger fichiers client et code système — cela
conditionne mises à jour, sauvegardes, sécurité et réversibilité.
Sauvegardes séparées : un dépôt pour /workspace, un pour /system.
→ Adapter l'arborescence ~/aios/ d'OS-002 à cette partition (mapping,
pas refonte : ventures/ et memory/ = workspace ; .claude/ et core/ =
system ; nouveau generated-tools/ ; nouveau runtime/).

## 2. Les cinq runtimes

1. **Conversation** : reçoit la demande (texte/voix/fichiers), affiche
   actions, validations, résultats, notifications. La logique agentique
   n'habite JAMAIS le front. (V1 : Telegram tient ce rôle.)
2. **Knowledge** : recherche hybride OS-003 §2 (SQL + sémantique +
   exacte + chronologique) + filtrage par permissions + classement +
   construction du contexte. Le modèle ne reçoit jamais « toutes les
   données » : il outille ses recherches.
3. **Skills** : objets logiciels versionnés (PAS des prompts) — format
   cible par skill :
   `skill.yaml` (id, version, scope, triggers, inputs, sources autorisées,
   steps, outputs) + `permissions.yaml` (par outil : allowed /
   approval_required / denied) + `quality_gates` (ex. current_pricing_only,
   sources_required, no_external_action) + `examples/` (valides ET
   invalides) + `tests/` + `versions/`.
4. **Action — le Tool Gateway (ARCHITECTURE OBLIGATOIRE)** : le modèle ne
   touche JAMAIS un identifiant (Gmail, Stripe, Drive). Toute action passe
   par la passerelle : vérification (org, utilisateur, skill, permission,
   paramètres, niveau de risque) → exécution du connecteur → résultat
   normalisé → audit log. Chaque outil a un CONTRAT : name, risk_level,
   input_schema, required_permissions, requires_approval, **idempotent**.
   (Ex. : gmail.create_draft = medium/sans approbation ; gmail.send =
   high/approbation obligatoire.) MCP comme standard de connexion quand
   pertinent.
5. **Automation** : une tâche automatique n'est PAS exécutée par le chat —
   c'est un JOB indépendant : job_id, tenant, skill+version, trigger,
   scheduled_at, status, retry_count/max, **idempotency_key** (empêche le
   double envoi quand un worker redémarre — FIABILITÉ CRITIQUE, à mettre
   dans la routine de nuit V1 dès maintenant).

## 3. Micro-applications : schema-driven D'ABORD

La génération libre de code n'arrive qu'APRÈS. V1+ : formulaires/outils
décrits par un SCHÉMA JSON (type, slug, champs, on_submit→skill) rendu
par un moteur unique — plus sûr, versionnable, validable, zéro code
arbitraire, déploiement immédiat sur le sous-domaine de publication
(OS-002 §7). RÈGLE V1 : la plateforme crée documents, rapports,
formulaires schema-driven, brouillons et workflows contrôlés — PAS de
code libre auto-déployé.

## 4. Control plane / tenant plane (pour le produit RELAYO)

- **Prototype personnel (notre cas)** : PAS de VPS par client — un seul
  environnement avec séparation logique. (Valide notre V1.)
- **Produit SaaS (Relayo, plus tard)** : architecture HYBRIDE — partagés :
  front, API gateway, auth, orchestrateur, Postgres avec RLS, stockage à
  buckets isolés, workers ; isolés par organisation : secrets, sandbox de
  code, connecteurs sensibles, apps générées selon risque. Le VPS dédié
  par client devient une OPTION PREMIUM (professions réglementées,
  données sensibles, exigences contractuelles) — pas le défaut.
- Control plane central : organisations, facturation, provisioning,
  versions, catalogue de connecteurs, templates de skills, monitoring,
  déploiements, licences. Tenant plane : données, mémoire, conversations,
  secrets, jobs, apps, exécutions.

## 5. Modèle de données étendu (complète les 7 tables d'OS-003)

Gouvernance (organizations, users, memberships, roles, permissions,
projects, business_units) · Connaissance (+document_versions,
document_chunks, entity_relationships, fact_versions, decisions) ·
Agents/skills (agents, agent_versions, skill_versions, skill_examples,
skill_tests, skill_permissions, prompts, prompt_versions) · Exécution
(jobs, job_attempts, tool_calls, **approvals**, artifacts, notifications,
audit_logs) · Connecteurs (definitions, instances, credentials, scopes,
sync_states, webhook_endpoints) · Apps générées (generated_apps,
app_versions, app_routes, app_schemas, app_deployments, app_events).

## 6. Stack et trajectoire

MVP : Next.js · FastAPI · API Anthropic · PostgreSQL(/Supabase) ·
pgvector + full-text · S3/MinIO · n8n (ou crons V1) · Redis · GitHub
privé · Sentry+OpenTelemetry · Docker Compose · VPS européen.
Évolution PROGRESSIVE (uniquement quand la charge/criticité le justifie) :
n8n → Temporal (workflows critiques) · Compose → Kubernetes · .env →
Vault · exécution directe → conteneurs éphémères · vectoriel seul →
hybride + reranking · logs simples → traçage complet des tool_calls.

## 7. Checklist « mieux que la référence » (fusion avec l'existant)

Permissions fines · 2FA obligatoire · chiffrement des secrets · moteur
d'approbation systématique · tests avant déploiement · rollback des
skills (Git natif chez nous) · sandbox · statut et expiration de la
mémoire (OS-003 facts) · RLS par projet · journal d'audit ACCESSIBLE À
L'UTILISATEUR · coûts par skill · modes brouillon/supervisé/autonome
clairement séparés.

## 8. Cycle de référence d'une demande (à implémenter tel quel)

« Tous les lundis, résume-moi les prospects sans relance » →
compréhension (venture, type, fréquence, risque, action externe ?) →
création de skill (sources, sortie, aucune action externe) → déclencheur
(RRULE lundi 8h, timezone) → exécution (récupérer, calculer, filtrer,
classer, générer) → CONTRÔLES (sources accessibles ? offre encore
valide ? pas d'archivés ? pas de doublons ?) → livraison (notification +
tableau + prochaines actions + brouillons facultatifs) → AUDIT (version
de skill, requêtes, sources, coût, durée, erreurs, résultat).

## 9. Ordre d'adoption (rappel anti-refonte)

1. V1 (OS-002) inchangée — ajouter SEULEMENT : partition §1, clés
   d'idempotence sur la routine de nuit, contrats d'outils sur les
   actions existantes.
2. V1.5 (OS-003) : base de données + recherche hybride + 8 skills.
3. V2 : Tool Gateway complet + formulaires schema-driven + approvals en
   table + journal utilisateur.
4. V3 (= produit Relayo) : control/tenant plane hybride, RLS, Temporal.
