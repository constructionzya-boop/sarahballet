# MISSION-OS-003 — Le modèle de données de l'AIOS (mémoire fiable)

> Émetteur : Jeremy · Destinataire : session AIOS (architecte plateforme).
> Source : blueprint « modèle de données » fourni par Jeremy (2026-07-30),
> distillé ici en spécification. **Complète OS-001/OS-002** : la V1
> fichiers (queue, briefs, skills en Git) reste le point de départ ;
> cette mission spécifie la COUCHE DE DONNÉES qui la fiabilise, à
> construire en V1.5 dès que la V1 tourne.

---

## 0. Le principe fondateur (à graver dans la constitution)

**Les documents sont des PREUVES ; la mémoire contient des FAITS
stabilisés ; les skills utilisent les deux pour exécuter une procédure.**
On ne « verse pas le Drive dans une base vectorielle » : on inventorie,
on marque les statuts, puis on promeut SEULEMENT les faits importants en
mémoire validée. Règle d'or des recherches :
documents → preuve · base relationnelle → état actuel · événements →
historique · vectoriel → découverte · mémoire validée → vérité opérationnelle.

## 1. Les 7 tables fondamentales (PostgreSQL + pgvector)

Implémentation : **PostgreSQL local sur le VPS** (souveraineté, zéro coût
récurrent, sauvegardé avec le reste) avec pgvector ; Supabase possible
plus tard si besoin d'API/RLS hébergées [choix architecte, TBV].

1. **sources** — registre des systèmes connectés : source_id, type
   (Gmail/Drive/Airtable/dossier), venture, access_level, sync_frequency,
   last_sync, status. (L'agent ne cherche jamais « partout ».)
2. **documents** — chaque fichier/email/PJ : id, source, venture, projet,
   type, titre, chemin, version, dates, **confidentialité**, validité,
   **statut (brouillon/validé/obsolète)**, checksum anti-doublons,
   texte extrait, embedding.
3. **entities** — les objets réels : clients, prospects, fournisseurs,
   projets, offres, contrats, chantiers (Noéma)… avec relations et source de l'info. (Un email, un devis PDF
   et une ligne Airtable pointent la MÊME entité.)
4. **facts** — LA mémoire métier : sujet, prédicat, valeur, venture,
   document source, **confiance, validé_par, valid_from/until,
   supersedes, statut**. C'est la traduction en base de notre règle
   [FAIT]/[HYP]/[TBV] — et ce qui empêche deux tarifs contradictoires.
5. **events** — ce qui s'est PASSÉ (démo faite, objection, relance
   envoyée, sans réponse…) : type, date, acteur, objet, résultat,
   prochaine action, importance. Un événement n'est pas une vérité
   permanente.
6. **skills** — procédures VERSIONNÉES (déjà en Git par OS-002 §7) avec
   le format enrichi : objectif, déclencheurs, entrées,
   **sources_autorisées**, étapes, sorties, **permissions par outil**
   (read/draft/send/approval_required), critères de réussite.
7. **executions** — chaque action tracée : skill+version, trigger,
   inputs, sources consultées, actions tentées/réalisées, statut
   d'approbation, erreurs, coût tokens, durée, output. (Pourquoi l'agent
   a agi, avec quoi, et comment revenir en arrière.)

## 2. Recherche HYBRIDE (une base vectorielle seule ne suffit pas)

4 modes combinés : **exacte** (noms, références, dates) · **sémantique**
(pgvector — « le projet avec le comptoir bleu ») · **relationnelle**
(SQL — « prospects avec devis envoyé jamais relancés ») ·
**chronologique** (dernière décision, prochain engagement, non-résolu).

## 3. Permissions EXÉCUTOIRES (pas des phrases dans un prompt)

Les fichiers mémoire orientent le modèle mais ne bloquent rien : les
permissions passent par les **hooks Claude Code / le système** qui
REFUSENT l'action hors manifeste. Barème par défaut :
lire/rechercher/synthétiser/brouillon = automatique (journalisé) ·
modifier fiche interne = validation légère · envoyer email/WhatsApp =
validation obligatoire · tarif/facture/publication = validation
renforcée · remboursement/suppression de fichier = toujours manuel ·
code nouveau = sandbox puis validation · avis juridique = interdit sans
expert.

## 4. Les 8 premières skills (V1.5)

Socle : 1-recherche documentaire expliquée · 2-compte-rendu de réunion ·
3-mémoire de décision (avec supersedes) · 4-brief quotidien (déjà en V1).
Métier (portefeuille OS-002) : 5-devis/proposition WEBFLOW depuis un
brief · 6-suivi des corrections client · 7-préparation de démo LEA
(script + argumentaire) · 8-audit d'annonce IMMO (grille standard).

## 5. Kit de données AVANT de coder (par venture, fourni par Jeremy)

10-20 documents de référence validés · 5 excellentes productions ·
3 mauvaises AVEC l'explication des erreurs (→ cas de test) · offres et
tarifs actuels · lexique métier · règles inviolables · clients/projets
actifs · modèles de documents · 5-10 tâches répétitives décrites ·
journal des décisions.

## 6. Ordre de construction (le MVP 70-80 %)

1. V1 OS-002 d'abord (squelette, agents, routines, Telegram) — inchangée.
2. V1.5 : Postgres+pgvector local → tables 1-7 → ingestion PROPRE
   (inventaire → doublons → venture → projet → statut → texte → index →
   promotion des faits) en commençant par UNE venture pilote.
3. Recherche hybride branchée sur l'orchestrateur.
4. Les 8 skills, en mode brouillon d'abord (dev→prod d'OS-002 §7).
5. Gmail/Calendar/Airtable en LECTURE d'abord ; n8n en couche de
   déclencheurs SEULEMENT si les crons V1 deviennent insuffisants
   [choix différé — ne pas ajouter d'outil avant d'en avoir besoin].
6. La génération autonome de connecteurs/micro-apps vient APRÈS : la
   qualité de la mémoire détermine la qualité du système.
