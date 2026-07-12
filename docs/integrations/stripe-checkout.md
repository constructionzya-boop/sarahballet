# Checkout Stripe — carte bancaire (mode test)

> Livré au Chantier 2 (session plateforme financière). Encaissement CB par la
> SAS française **Noéma Diaspora** (settlement EUR). Le local (XOF) passe aussi
> par CinetPay (mobile money) — cf. `docs/07-integrations.md`.

## Composants livrés

| Élément | Fichier |
|---|---|
| Montant multi-devises (EUR centimes / XOF zero-decimal) | `lib/payment/money.ts` |
| Jalons 30/40/30 | `lib/payment/milestones.ts` |
| Machine à états du dossier (gardes encaissement/pose) | `lib/payment/order.ts` |
| Client Stripe serveur (lazy, guardé) | `lib/stripe/server.ts` |
| Config publique + seuils 3DS | `lib/stripe/config.ts` |
| Route création PaymentIntent (par jalon) | `app/api/checkout/route.ts` |
| Webhook signé + idempotent | `app/api/webhooks/stripe/route.ts` |
| Payment Element + confirmation | `components/ReserveCheckout.tsx`, `app/reserver/*` |

## Activation (env)

Renseigner `.env.local` (cf. `apps/construction/.env.example`) :
`STRIPE_SECRET_KEY`, `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`, `STRIPE_WEBHOOK_SECRET`.
Sans clés, le checkout affiche un état « paiement en préparation » et les routes
API répondent `503` (build vert garanti).

## Webhook en local

```
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

Le secret affiché (`whsec_…`) va dans `STRIPE_WEBHOOK_SECRET`. Le handler vérifie
la signature (`constructEventAsync`) et déduplique sur `event.id` (retry-safe).

## Paiement par jalons — machine à états

```
COMMANDE → ACOMPTE_OK → PRODUCTION → PREUVE_PHOTOS → JALON2_OK
         → POSE → SOLDE_OK → LIVRE     (+ ANNULE)
```

Règles dures encodées et testées :
- la **production** ne démarre qu'après encaissement de l'acompte ;
- la **pose** n'est jamais planifiée sous **70 %** encaissé (`POSE_MIN_PAID_RATIO`).

> Persistance : en V1, l'état vit dans les métadonnées du PaymentIntent + logs.
> Phase 2 : table `orders` + `processed_webhook_events` (unique sur `event.id`),
> puis reçu WhatsApp/email à chaque jalon et déblocage production automatique.

## Règles Anti-fraude (Stripe Radar) — à créer dans le dashboard

Radar se configure côté dashboard (pas en code). Règles cibles :

1. **3DS forcé** au-delà de 500 € : `Request 3DS if :amount_in_eur: > 500`.
   (Le code force déjà `request_three_d_secure = "any"` au-delà du seuil, cf.
   `FORCE_3DS_EUR_MINOR` / `FORCE_3DS_XOF_MINOR`.)
2. **Blocage pays à risque** : `Block if :ip_country: in (liste)` selon la
   politique de la SAS (à arbitrer avec le comptable/juriste).
3. **Vélocité** : `Block if :card_velocity: > N over 24h` (anti-test de cartes).
4. Page de réassurance chargeback : `app/reserver/page.tsx` (mentions SAS,
   plan à jalons, « aucune pose sous 70 % »).

## Cartes de test utiles

| Scénario | Numéro |
|---|---|
| Succès | 4242 4242 4242 4242 |
| 3DS requis | 4000 0027 6000 3184 |
| Refus (fonds) | 4000 0000 0000 9995 |
