# 06 · Modèle de données

PostgreSQL 16. Conventions : `snake_case`, UUID v7, `created_at/updated_at`
partout, soft-delete (`deleted_at`) sur les entités métier, montants en
**centimes XOF/XAF** (`amount_cents` + `currency`).

## 1. Vue d'ensemble

```
 brands ──< products ──< product_variants          (catalogue 5 marques)
                │
 module_types ──< module_configs                    (configurateur)
                │
 parties ──< leads ──< quotes ──< contracts ──< payment_schedules ──< payments
    │                     │           │
    │                     │           ├──< contract_events (audit immuable)
    │                     │           └──< documents
    │                     │
    │                  quote_items (modules OU produits marques)
    │
    ├──< sites (lieux de pose)                     units ──< unit_components
    │                                                 │        (n° série P1..P8)
    └──< tickets (SAV)                                └──< unit_movements
                                                        (usine→dépôt→pose→retour)
 work_orders (fabrication) · installation_orders (pose) · stock_locations
```

## 2. Tables principales

### Référentiel & catalogue

```sql
-- Marques du réseau (noema-construction, etansol, hydralis, ventalis, saniva)
CREATE TABLE brands (
  id uuid PRIMARY KEY,
  slug text UNIQUE NOT NULL,
  name text NOT NULL,
  domain text NOT NULL,
  theme jsonb NOT NULL DEFAULT '{}'
);

-- Produits B2B des marques annexes
CREATE TABLE products (
  id uuid PRIMARY KEY,
  brand_id uuid NOT NULL REFERENCES brands(id),
  category text NOT NULL,               -- ex. 'membranes', 'reservoirs'
  sku text UNIQUE NOT NULL,
  name text NOT NULL,
  specs jsonb NOT NULL DEFAULT '{}',    -- fiches techniques structurées
  moq int NOT NULL DEFAULT 1,
  compatible_modules text[] DEFAULT '{}',-- cross-sell vers module_types
  markets text[] NOT NULL DEFAULT '{CI}',-- CI, GA
  status text NOT NULL DEFAULT 'active'
);

CREATE TABLE product_variants (
  id uuid PRIMARY KEY,
  product_id uuid NOT NULL REFERENCES products(id),
  label text NOT NULL,                  -- dimension/couleur/épaisseur
  price_pro_cents bigint,               -- NULL = prix sur demande
  currency text NOT NULL DEFAULT 'XOF',
  stock_state text NOT NULL DEFAULT 'import', -- abidjan|libreville|import
  lead_time_days int
);

-- Types de modules Noéma Construction (box-commerce, sanitaire-public, ...)
CREATE TABLE module_types (
  id uuid PRIMARY KEY,
  slug text UNIQUE NOT NULL,
  base_level text NOT NULL CHECK (base_level IN ('M1','M2','M3')),
  name text NOT NULL,
  base_bays_w int NOT NULL, base_bays_d int NOT NULL,  -- travées 1,20 m
  spec jsonb NOT NULL DEFAULT '{}'      -- trame, hauteurs, pack climat
);

-- Une configuration issue du configurateur (immuable une fois devisée)
CREATE TABLE module_configs (
  id uuid PRIMARY KEY,
  module_type_id uuid NOT NULL REFERENCES module_types(id),
  bays_w int NOT NULL, bays_d int NOT NULL,
  level text NOT NULL CHECK (level IN ('M1','M2','M3')),
  base_type text NOT NULL CHECK (base_type IN ('sold_slab','rental_skid')),
  options jsonb NOT NULL DEFAULT '{}',  -- mezzanine, solaire, split, citerne…
  bom jsonb NOT NULL,                   -- nomenclature P1..P8 calculée
  price_matrix_version int NOT NULL,    -- version de la grille tarifaire
  computed_price_cents bigint NOT NULL,
  currency text NOT NULL
);
```

### Parties, ventes, contrats

```sql
-- Toute personne physique/morale (client, entreprise, partenaire)
CREATE TABLE parties (
  id uuid PRIMARY KEY,
  kind text NOT NULL CHECK (kind IN ('person','company')),
  phone text UNIQUE NOT NULL,           -- identifiant primaire (E.164)
  full_name text NOT NULL,
  email text,
  company_fields jsonb,                 -- RCCM, secteur (comptes pro)
  kyc jsonb NOT NULL DEFAULT '{}',
  market text NOT NULL DEFAULT 'CI'
);

CREATE TABLE leads (
  id uuid PRIMARY KEY,
  party_id uuid REFERENCES parties(id),
  brand_id uuid NOT NULL REFERENCES brands(id),
  source text NOT NULL,                 -- configurateur|whatsapp|form|reseller
  payload jsonb NOT NULL DEFAULT '{}',
  assignee_id uuid,                     -- staff_sales / partner_reseller
  stage text NOT NULL DEFAULT 'new',    -- new|qualified|quoted|nego|won|lost
  zone text                             -- contrôle rayon de livraison
);

CREATE TABLE quotes (
  id uuid PRIMARY KEY,
  number text UNIQUE NOT NULL,          -- Q-CI-2026-000123
  lead_id uuid REFERENCES leads(id),
  party_id uuid NOT NULL REFERENCES parties(id),
  sale_mode text NOT NULL CHECK (sale_mode IN
    ('purchase','rental','rent_to_own','b2b_products')),
  total_cents bigint NOT NULL, currency text NOT NULL,
  valid_until date,
  status text NOT NULL DEFAULT 'draft'  -- draft|sent|accepted|expired
);

CREATE TABLE quote_items (
  id uuid PRIMARY KEY,
  quote_id uuid NOT NULL REFERENCES quotes(id),
  module_config_id uuid REFERENCES module_configs(id),
  product_variant_id uuid REFERENCES product_variants(id),
  qty int NOT NULL DEFAULT 1,
  unit_price_cents bigint NOT NULL,
  CHECK (module_config_id IS NOT NULL OR product_variant_id IS NOT NULL)
);

CREATE TABLE contracts (
  id uuid PRIMARY KEY,
  number text UNIQUE NOT NULL,          -- C-CI-2026-000089
  quote_id uuid NOT NULL REFERENCES quotes(id),
  party_id uuid NOT NULL REFERENCES parties(id),
  sale_mode text NOT NULL,
  legal_entity text NOT NULL,           -- entité juridique signataire
  site_id uuid REFERENCES sites(id),    -- lieu de pose
  status text NOT NULL DEFAULT 'draft',
  -- draft|signed|active|completed|defaulted|repossessed|terminated
  signed_at timestamptz,
  terms jsonb NOT NULL DEFAULT '{}'     -- durée, dépôt, clause de reprise
);

-- Audit immuable (append-only, hash chaîné)
CREATE TABLE contract_events (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  contract_id uuid NOT NULL REFERENCES contracts(id),
  actor_id uuid,
  event_type text NOT NULL,             -- signed|payment|reminder|suspend|...
  data jsonb NOT NULL DEFAULT '{}',
  prev_hash bytea, this_hash bytea NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
```

### Paiements

```sql
CREATE TABLE payment_schedules (
  id uuid PRIMARY KEY,
  contract_id uuid NOT NULL REFERENCES contracts(id),
  seq int NOT NULL,                     -- 0 = acompte
  due_date date NOT NULL,
  amount_cents bigint NOT NULL, currency text NOT NULL,
  kind text NOT NULL,                   -- deposit|rent|installment|balance
  equity_ratio numeric(5,4),            -- rent-to-own : part acquise cumulée
  status text NOT NULL DEFAULT 'pending',-- pending|paid|late|waived
  UNIQUE (contract_id, seq)
);

CREATE TABLE payments (
  id uuid PRIMARY KEY,
  schedule_id uuid REFERENCES payment_schedules(id),
  contract_id uuid NOT NULL REFERENCES contracts(id),
  provider text NOT NULL,               -- orange_money|mtn_momo|wave|moov|card
  provider_ref text UNIQUE,             -- ref transaction agrégateur
  amount_cents bigint NOT NULL, currency text NOT NULL,
  status text NOT NULL DEFAULT 'initiated',
  -- initiated|pending|confirmed|failed|refunded  (webhook-driven)
  confirmed_at timestamptz,
  raw_webhook jsonb
);
```

### Production, unités physiques, pose

```sql
CREATE TABLE work_orders (                -- ordre de fabrication
  id uuid PRIMARY KEY,
  contract_id uuid NOT NULL REFERENCES contracts(id),
  module_config_id uuid NOT NULL REFERENCES module_configs(id),
  status text NOT NULL DEFAULT 'queued',
  -- queued|molding|curing|finishing|qc|ready
  qc_report jsonb,
  milestones jsonb NOT NULL DEFAULT '[]' -- [{step, at, photo_url}]
);

CREATE TABLE units (                      -- le module physique (actif)
  id uuid PRIMARY KEY,
  serial text UNIQUE NOT NULL,            -- NM-2026-00042
  module_config_id uuid NOT NULL REFERENCES module_configs(id),
  contract_id uuid REFERENCES contracts(id),   -- NULL = en stock
  state text NOT NULL DEFAULT 'in_production',
  -- in_production|in_stock|installed|rented|repossessed|refurb|scrapped
  condition_grade text                     -- A|B|C (reconditionnement)
);

CREATE TABLE unit_components (            -- traçabilité P1..P8
  id uuid PRIMARY KEY,
  unit_id uuid NOT NULL REFERENCES units(id),
  component_ref text NOT NULL,            -- P1..P8
  serial text UNIQUE NOT NULL,
  batch text                              -- lot béton / fournisseur
);

CREATE TABLE unit_movements (             -- cycle de vie logistique
  id uuid PRIMARY KEY,
  unit_id uuid NOT NULL REFERENCES units(id),
  from_location text, to_location text,   -- usine|depot_abj|depot_lbv|site:<id>
  reason text NOT NULL,                   -- delivery|install|repossess|refurb
  moved_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE installation_orders (        -- ordre de pose
  id uuid PRIMARY KEY,
  contract_id uuid NOT NULL REFERENCES contracts(id),
  unit_id uuid NOT NULL REFERENCES units(id),
  team_party_id uuid REFERENCES parties(id),  -- partner_installer
  scheduled_date date,
  checklist jsonb NOT NULL DEFAULT '[]',  -- SOP 8 étapes + photos
  customer_signature_url text,            -- PV de réception signé
  status text NOT NULL DEFAULT 'planned'  -- planned|onsite|done|aborted
);

CREATE TABLE sites (                      -- lieu de pose
  id uuid PRIMARY KEY,
  party_id uuid NOT NULL REFERENCES parties(id),
  label text, geo point, zone text,
  land_tenure jsonb                       -- ACD/bail — statut foncier déclaré
);

CREATE TABLE tickets (                    -- SAV
  id uuid PRIMARY KEY,
  contract_id uuid NOT NULL REFERENCES contracts(id),
  unit_id uuid REFERENCES units(id),
  category text NOT NULL,                 -- leak|electrical|structure|other
  description text, photos text[],
  sla_due timestamptz,
  status text NOT NULL DEFAULT 'open'
);
```

## 3. Invariants métier clés

1. `module_configs` est **immuable** après émission d'un devis (recalcul = nouvelle config).
2. Un `payment` `confirmed` ne peut jamais être supprimé — uniquement `refunded`.
3. `units.state = 'rented'` ⟺ contrat `active` en mode `rental`/`rent_to_own`.
4. Repossession : transition `rented → repossessed → refurb → in_stock`
   uniquement dans cet ordre, chaque étape émettant un `unit_movement`.
5. `equity_ratio` (rent-to-own) est monotone croissant ; transfert de propriété
   déclenché à 1.0 → contrat `completed`, unité liée définitivement au client.
6. Toute écriture sur `contracts`/`payments` génère un `contract_event` avec
   hash chaîné (audit).
