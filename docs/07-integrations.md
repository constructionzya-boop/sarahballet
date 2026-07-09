# 07 · Intégrations externes

## 1. Paiements — mobile money d'abord

**Stratégie : un agrégateur, pas 4 intégrations directes.**

| Option | Couverture | Note |
|---|---|---|
| **CinetPay** (recommandé MVP) | Orange Money, MTN MoMo, Moov, Wave, cartes — CI/GA/UEMOA | Un seul contrat, webhooks unifiés |
| Alternative : intégrations directes Wave + OM | CI seulement | Meilleures commissions, plus de dev |

Flux type (échéance de location) :

```
Client (/app/paiements)                services/api                 CinetPay
    │  payer échéance #12                   │                           │
    ├──────────────────────────────────────►│  create payment(intent)   │
    │                                       ├──────────────────────────►│
    │            page/push OM/MoMo/Wave ◄───┴───────────────────────────┤
    │  confirme sur son téléphone (USSD/app)                            │
    │                                       │◄── webhook `ACCEPTED` ────┤
    │                                       ├─ payments.status=confirmed
    │                                       ├─ schedule.status=paid
    │                                       ├─ contract_event (hash)
    │  reçu PDF + WhatsApp ◄────────────────┤─ BullMQ: receipt+notify
```

Règles : idempotence par `provider_ref` ; réconciliation quotidienne
(rapport agrégateur vs table `payments`) ; jamais de confirmation côté client
sans webhook serveur.

## 2. WhatsApp Business Cloud API

Canal n°1 du marché. Trois usages, trois exigences :

1. **Entrant (lead)** : deep links `wa.me/<num>?text=<payload devis>` sur tous
   les CTA ; webhook entrant → création/mise à jour du lead dans le CRM ;
   routage par mot-clé (DEVIS, SUIVI, SAV).
2. **Notifications (templates approuvés Meta)** : devis prêt, rappel échéance
   J-3, confirmation paiement, date de pose, ticket SAV. Fallback SMS
   (opérateur local via agrégateur SMS) si non-délivré à H+1.
3. **Conversationnel commercial** : inbox partagée pour `staff_sales`
   (intégrée au CRM Connect — pas d'outil externe, l'historique reste sur le lead).

## 3. OTP & identité

- Auth = téléphone + OTP (WhatsApp d'abord, SMS fallback) — Auth.js custom provider.
- E-signature des contrats : OTP dédié + horodatage + IP + hash du PDF dans
  `contract_events` (valeur probante pragmatique, à valider juriste OHADA).

## 4. Cartographie & zones

- Géocodage des sites de pose : OpenStreetMap/Nominatim (couverture Abidjan OK)
  + saisie assistée par repères (« quartier, rue, repère » — les adresses
  formelles sont rares).
- Zones de livraison : polygones stockés en base (`zones` GeoJSON), contrôle
  au configurateur et à la planification des tournées.

## 5. Logistique & douane (marques annexes + moules)

- Suivi conteneurs : saisie manuelle MVP (n° BL + jalons), API tracking
  (ex. Marine Traffic / ligne maritime) en V2.
- Références douane par produit : champ `hs_code` + catégorie TEC UEMOA/CEDEAO
  (5/10/20 %) dans `products.specs` → estimation coût rendu Abidjan dans
  l'admin catalogue.

## 6. Comptabilité & reporting

- Export **SYSCOHADA** (CSV/Excel) par entité juridique et par marché.
- Rapprochement bancaire/mobile money mensuel automatisé (statuts + écarts).
- KPIs direction (dashboard `/office`) : CA par marque, taux d'impayés,
  délai moyen fabrication→pose, taux de repossession, marge par module.

## 7. Communication produit

- **Génération PDF** : gotenberg (HTML→PDF) pour devis/contrats/reçus/PV —
  mêmes gabarits que la charte (Night/Orange).
- **Emails transactionnels** (secondaire) : Resend/SES, uniquement si email présent.
- **Réseaux sociaux** : Open Graph par fiche module + flux produits
  (catalogue Facebook/Instagram Shopping — canal découverte majeur en CI).
