# 05 · Noéma Connect — plateforme SaaS du réseau

`connect.noema-group.com` — application authentifiée (PWA, offline-first pour
les équipes terrain). C'est ici que vivent les contrats, les paiements et
l'opérationnel. **Auth par téléphone (OTP SMS/WhatsApp)**, l'email est optionnel.

## 1. Rôles (RBAC)

| Rôle | Qui | Périmètre |
|---|---|---|
| `client` | Acheteur/locataire | Ses dossiers, paiements, SAV |
| `client_pro` | Entreprise (marques annexes) | Devis B2B, prix pro, commandes |
| `partner_reseller` | Revendeur agréé | Leads affectés, commissions, stock alloué |
| `partner_installer` | Équipe de pose partenaire | Ordres de pose, checklists, photos |
| `staff_sales` | Commercial Noéma | CRM, devis, contrats de son portefeuille |
| `staff_ops` | Production/logistique | Ordres de fabrication, stocks, tournées |
| `staff_finance` | Finance | Encaissements, relances, impayés, exports |
| `admin` | Direction | Tout + paramétrage (prix, zones, catalogue) |

## 2. Espace client (`/app`)

```
/app
├── /dashboard            Vue synthèse : dossiers actifs, prochaine échéance
├── /dossiers/[id]        Le cœur : cycle de vie du module
│   ├─ Timeline : Devis → Contrat → Acompte → Fabrication → Livraison
│   │             → Pose (J-day) → Réception → (Location : échéances)
│   ├─ Documents : devis PDF, contrat signé, PV de réception, garanties
│   ├─ Suivi fabrication : jalons usine avec photos
│   └─ Suivi pose : date planifiée, équipe, checklist réception
├── /paiements
│   ├─ Échéancier (location / location-accession) + barre de progression
│   │  rent-to-own (« vous possédez 34 % de votre module »)
│   ├─ Payer une échéance : Orange Money / MTN MoMo / Wave / Moov / carte
│   └─ Reçus téléchargeables + historique
├── /sav                  Tickets (fuite, joint, élec) avec photos, SLA affiché
└── /profil               KYC, téléphone, adresse de pose, bénéficiaires
```

**Logique location (l'actif mobile)** : échéance impayée → relances J+3/J+7
(WhatsApp + SMS) → J+30 suspension → J+45 ordre de démontage (statut
`repossession`) → module retourne au stock reconditionnement. Tout est
tracé dans la timeline du dossier.

## 3. Portail partenaires (`/partner`)

```
/partner
├── /leads                Leads affectés (revendeur), statuts, relances
├── /commandes            Commandes fermes, acomptes, marges/commissions
├── /poses                (installateurs) Planning, ordre de pose du jour,
│                         checklist SOP 8 étapes, upload photos avant/après,
│                         signature client sur écran (PV de réception)
└── /paiements            Relevé de commissions, factures partenaire
```

## 4. Back-office (`/office`)

```
/office
├── /crm                  Pipeline : Lead → Qualifié → Devis → Négo → Signé
│   ├─ Leads entrants (configurateur, formulaires, WhatsApp, marques annexes)
│   ├─ Scoring simple (usage, zone, budget, délai)
│   └─ Relances automatisées (templates WhatsApp approuvés)
├── /devis-contrats       Génération contrat depuis devis, e-signature OTP,
│                         CGV par mode (vente/location/accession), avenants
├── /production           Ordres de fabrication par module
│   ├─ Nomenclature générée depuis le configurateur (BOM P1→P8)
│   ├─ Jalons : moulage → cure → finition usine → contrôle qualité (PCQ)
│   └─ N° de série par composant (traçabilité casse/SAV)
├── /stocks               Composants (usine, dépôt Abidjan, dépôt Libreville)
│   └─ Modules reconditionnés (retours location) avec état
├── /logistique           Tournées de livraison, affectation équipes de pose,
│                         optimisation par zone (rayon de rentabilité)
├── /finance              Encaissements agrégateur, rapprochement, impayés,
│                         export comptable (SYSCOHADA), reporting par entité
├── /catalogue            Administration prix (matrice versionnée), options,
│                         zones de livraison, produits marques annexes
└── /parametres           Utilisateurs, rôles, entités juridiques, taxes
```

## 5. Modules transverses

- **Notifications** : file BullMQ → WhatsApp Business API (templates),
  SMS fallback, email si présent. Événements : devis prêt, acompte reçu,
  date de pose, échéance J-3, reçu de paiement, ticket SAV.
- **Documents** : génération PDF serveur (devis, contrats, reçus, PV) —
  gabarits par entité juridique et par marché (CI/GA).
- **Audit** : toute écriture sur contrat/paiement → événement immuable
  (qui, quoi, quand, avant/après).
- **Offline** (équipes pose) : checklist et photos en local, sync à la
  reconnexion (conflits résolus côté serveur, last-write-wins par champ).
