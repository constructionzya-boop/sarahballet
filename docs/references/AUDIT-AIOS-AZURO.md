# Audit d'ingénierie AIOS/Azuro (aios.fr) — 2026-07-30

> Source : audit fourni par Jeremy (analyse complète du site public, pages
> métiers, blog, tarifs, CGS, annexe sécurité). Archivé comme référence
> pour : la construction de notre propre AIOS (patterns + pièges à éviter)
> et le produit RELAYO/WEBFLOW (positionnement, pricing, tunnel).
> Statut des faits : [FAIT-B] site aios.fr au 30/07/2026.

## L'ESSENTIEL EN 10 POINTS

1. AIOS = système agentique managé MONO-CLIENT : app web/mobile + workspace
   documentaire + moteur Claude + « skills » (procédures métier) +
   connecteurs + tâches programmées + génération de petits outils +
   1 VPS par client + accompagnement humain.
2. **PRIX RÉELS : Starter 399 € HT/mois · Growth 499 € · Pro 799 €** —
   PLUS le coût Claude (20-100 €/mois) à la charge du client.
   Soit 5 000 à 10 800 € HT/an. (Le « 20-100 € » n'est PAS le prix du
   produit — c'est seulement la part Claude.)
3. Tunnel SALES-ASSISTED (pas self-service) : formulaire qualifiant →
   échange humain → essai accompagné 7 j → abonnement. 7 pages métiers
   SEO (immo, BTP, experts-comptables, agences, avocats, e-commerce,
   consultants) + cluster blog à 3 niveaux (info/comparaison/transaction).
4. La valeur est dans l'INTÉGRATION (skills + connecteurs + mémoire +
   accompagnement), pas dans le modèle : ~15 % IA / 25 % plateforme /
   25 % skills-mémoire / 20 % connecteurs / 15 % accompagnement (estim.).
5. Mémoire 3 couches : métier (offres, clients, ton) · chronologique
   (conversations, décisions) · documentaire (workspace, emails, Drive).
   Faiblesse relevée : « il retient tout pour toujours » = pas de dates de
   validité, pas de niveaux de confiance, pas de purge → bruit/contamination.
6. « 24h/24 » = serveur + déclencheurs + crons disponibles en permanence,
   PAS un modèle qui pense en continu (événementiel + planifié) — même
   architecture que la nôtre.
7. Sécurité documentée au-dessus de la moyenne (TLS, TOTP optionnel,
   isolation VPS, sauvegardes quotidiennes + 2 repos GitHub privés,
   export/suppression) MAIS lacunes : pas de chiffrement au repos décrit,
   pas de coffre à secrets/rotation, pas de RBAC, pas de SLA/RTO/RPO,
   pas de pentest public, pas de sandbox décrite pour le code généré,
   pas de protection prompt-injection décrite, backups Git non chiffrés ?
8. Incohérences relevées : offre Growth absente des CGS · « archivage »
   (marketing) vs « suppression » (CGS) en fin d'essai · « validation
   avant envoi » contredite par un témoignage d'envoi autonome ·
   « jamais d'entraînement sur vos données » à nuancer (dépend du compte
   Anthropic du client) · frontière floue de propriété des skills.
9. Responsabilité plafonnée à 6 mois de sommes versées ; pas de SLA ;
   le client reste responsable des contenus/décisions → c'est un outil
   d'automatisation SUPERVISÉ, pas un délégataire.
10. Scalabilité non démontrée : 1 VPS/client = 500 VPS à 500 clients sans
    IaC/monitoring de flotte documentés → modèle premium à effectif limité.

## CE QUE NOTRE AIOS DOIT FAIRE MIEUX (checklist d'implémentation)

- Modes d'action EXPLICITES par skill : brouillon-seul / validation /
  autonome plafonné — avec plafonds (destinataires, montants), révocation
  en un mot Telegram, et JOURNAL de toutes les actions de l'agent.
- Mémoire avec hygiène : source + date + niveau de confiance + expiration ;
  séparer faits / préférences / hypothèses (notre règle [FAIT]/[HYP]/[TBV]
  fait déjà ça — la garder dans l'AIOS).
- Calculs (devis, prix, finances) : moteur DÉTERMINISTE (code/formules),
  jamais « imaginés » par le LLM — règle déjà vraie chez Noéma (specs.json
  + checks) : la généraliser aux ventures.
- Chiffrement au repos des données sensibles + backups chiffrés AVANT
  transfert vers tout dépôt distant + secrets hors Git avec rotation.
- Protection prompt-injection : contenus entrants (emails, pièces jointes,
  pages web) = DONNÉES non fiables, jamais des instructions ; allowlist
  d'egress réseau si possible.
- Cohérence marketing↔contrat dès le jour 1 (pas de tier hors CGV, pas
  d'« archivage » si c'est une suppression).

## CE QUE RELAYO/WEBFLOW EN TIRE (positionnement)

- LE MARCHÉ PAIE 400-800 €/MOIS pour ça. Notre page à « 79 €/mois » est
  5 à 10× sous le marché → repositionner (décision Jeremy) : soit
  premium aligné (399+ € avec accompagnement), soit disrupteur assumé
  (~149-199 € self-service outillé) — mais pas 79 € par ignorance.
- Copier : pages métiers par verticale + blog 3 niveaux + tunnel
  sales-assisted (formulaire qualifiant, pas de CB à l'essai).
- Différencier là où l'audit les montre faibles : modes de validation
  explicites et journal d'actions (en faire un ARGUMENT), mémoire avec
  expiration, devis déterministes, chiffrement au repos, verticales
  qu'ils n'ont pas (BTP francophone Afrique, immo CI/GA), prix d'entrée
  plus accessible.
- Vocabulaire : ils ont installé la catégorie « AIOS » — nous parlerons
  d'« employé IA » (leur meilleur mot) sans reprendre leur sigle.

---

## PARTIE 2 — Exploration approfondie (2026-07-30)

### La vraie nature du produit
AIOS n'est pas un « connecteur d'outils » : c'est un **environnement privé
de développement et d'exécution piloté en langage naturel** — l'agent
(Claude Sonnet 4.5 + tool use) GÉNÈRE du code (scripts, connecteurs API,
formulaires, dashboards), le DÉPLOIE sur un sous-domaine
(form.azuro-ai.com), transforme un workflow réussi en **skill versionnée**
et programme son exécution. Le contrat précise que les outils créés
peuvent fonctionner indépendamment du modèle qui les a produits.
→ Notre AIOS (Claude Code + sous-agents sur VPS) est EXACTEMENT cette
classe de produit — nous sommes plus proches du vrai AIOS que de sa
plaquette marketing.

### Faits techniques nouveaux
- Chaîne : app desktop/mobile → orchestrateur → Claude Sonnet 4.5 + tool
  use → mémoire/fichiers workspace → connecteurs ou API REST générées →
  scripts/forms/dashboards → skill versionnée → déclencheur (cron, email,
  événement, webhook) → exécution + logs + notification.
- « Plus de webhooks à maintenir » = webhooks MASQUÉS (créés/maintenus par
  l'agent), pas supprimés (« Trigger activé · webhook < 200 ms »).
- Écosystème multi-domaines : aios.fr (commercial FR) · my-aios.com
  (international) · azuro-ai.com/aios (technique) · aios.azuro-ai.com
  (console) · form.azuro-ai.com (publication des outils générés).
  Gouvernance web instable (duplication SEO, versions divergentes).
- **Offres NON STABILISÉES** : le contenu de Growth et Pro diffère entre
  aios.fr et azuro-ai.com (onboarding 10 cas vs ateliers collectifs ;
  automatisations vs 1 skill/trimestre + WhatsApp) → devis écrit exigé.
- App mobile « native » non vérifiable publiquement (probable PWA/
  distribution privée).

### L'angle mort n°1 : l'exécution sécurisée du code généré
Non documentés chez eux : sandbox, tests automatiques, environnements
dev/prod, rollback d'une skill, limites réseau, permissions par skill,
validation avant déploiement, dépendances vulnérables. La « réparation
autonome » reste une affirmation commerciale.

### Les 5 preuves à exiger en démo (→ notre script de démo Relayo, inversé)
1. Créer un connecteur inconnu en direct ; 2. Afficher le CODE d'une
skill ; 3. Montrer son historique de versions ; 4. Provoquer une erreur
puis revenir en arrière ; 5. Montrer quelles actions exigent une
autorisation humaine.
→ Chez nous : skills en Git = code visible + versions + rollback NATIFS ;
manifeste de permissions par skill ; matrice d'autorisations affichable.
En faire les 5 moments forts de NOTRE démo commerciale.
