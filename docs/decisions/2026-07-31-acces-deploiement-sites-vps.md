# Décision — Accès de Numa aux sites du VPS (31/07/2026)

## Contexte

Règle initiale (OS-002 §5, OS-004-APPLICATION) : « jamais toucher
CloudPanel ni les ports 80/443 ». Jeremy amende : Numa doit pouvoir
gérer le site noemaconstruction.com et les sites qu'il créera pour les
ventures — mais AUCUN autre site hébergé sur le VPS.

## Décision (actée par Jeremy)

1. **Déploiement autorisé, par utilisateur de site uniquement.**
   Numa (user `aios`) peut déployer du contenu sur un site SEULEMENT via
   le user Linux propre à ce site (créé par CloudPanel), dont la clé/
   l'accès figure dans une ALLOWLIST tenue dans `/system/contracts/`.
   Allowlist initiale : `noemaconstruction.com`. Les sites créés
   ultérieurement pour les ventures y sont ajoutés UN PAR UN, chacun sur
   validation explicite de Jeremy.
2. **L'isolation est technique, pas déclarative** : c'est la séparation
   des users Linux qui borne l'accès (aios n'a pas les clés des autres
   sites). Jamais de droit générique.
3. **Création/suppression de site = Jeremy uniquement.** Numa prépare la
   demande (domaine, type statique/Node, contenu prêt) et l'envoie par
   Telegram ; Jeremy exécute dans CloudPanel. Idem pour SSL, vhosts,
   DNS.
4. **Restent interdits sans exception** : l'admin CloudPanel (interface
   :8443 et `clpctl` en root), le compte root, les ports 80/443, et tout
   site hors allowlist (dont sarahballet.com tant qu'il n'y est pas).

## Contrat d'outil ajouté (complète le tableau OS-004-APPLICATION §2)

| Outil | Risque | Approbation | Idempotent | Limites |
|---|---|---|---|---|
| `site.deploy` (rsync/cp vers htdocs d'un site allowlisté) | medium | non (journalisé) | oui | user de site allowlisté uniquement ; jamais de secret dans les fichiers publiés ; log de chaque déploiement au brief |
| `site.create` / `site.delete` / SSL / vhost | high | **JEREMY exécute lui-même** | — | Numa prépare et demande, n'exécute jamais |

## Mise en œuvre (une fois par site, par Jeremy)

Ajouter la clé publique du user `aios` dans les `authorized_keys` du
user du site (ou donner l'accès SSH du site à aios via CloudPanel
SSH/FTP). Numa documente chaque site allowlisté dans
`/system/contracts/sites-allowlist.md` avec la date et la validation.
