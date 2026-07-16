import {
  AccordionFAQ,
  Alert,
  Badge,
  BrandSwitcher,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardTitle,
  CaseStudyCard,
  ConfiguratorTeaser,
  Container,
  Divider,
  Eyebrow,
  FeatureCardDark,
  FloatingPill,
  Heading,
  Input,
  Label,
  Link,
  Marquee,
  MaskedPhoto,
  OfferCard,
  PaymentCard,
  ProcessStep,
  Section,
  SectionDivider,
  Select,
  StatCard,
  TestimonialCard,
  Text,
  Textarea,
  TimelinePose,
  TrustBar,
  WhatsAppButton,
  type MaskVariant,
  type DividerVariant,
} from "@noema/ui";
import type { ReactNode } from "react";

function Block({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="flex flex-col gap-4">
      <Heading level={3}>{title}</Heading>
      <div className="flex flex-wrap items-start gap-4">{children}</div>
      <Divider className="mt-4" />
    </section>
  );
}

const MASK_VARIANTS: MaskVariant[] = ["diagonal", "lobes", "corner", "wave-edge"];
const DIVIDER_VARIANTS: DividerVariant[] = [
  "wave",
  "curve",
  "tilt",
  "tilt-opacity",
  "drops",
  "zigzag",
  "clouds",
  "mountains",
];

export default function KitchenSinkPage() {
  return (
    <main>
      <Section>
        <Container className="flex flex-col gap-10">
          <header className="flex flex-col gap-2">
            <Eyebrow>@noema/ui</Eyebrow>
            <Heading level={1}>Kitchen sink</Heading>
            <Text>
              Tous les composants du design system, thème Construction (accent orange). La section
              « DA vitrine animée » démontre les 15 composants de la mission SITE-002.
            </Text>
          </header>

          <Block title="Boutons">
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button size="sm">Small</Button>
            <Button size="lg">Large</Button>
            <Button disabled>Disabled</Button>
          </Block>

          <Block title="Badges">
            <Badge tone="neutral">Neutral</Badge>
            <Badge tone="accent">Box Commerce</Badge>
            <Badge tone="dawn">Posé en 1 jour</Badge>
            <Badge tone="outline">M3 eau+élec</Badge>
          </Block>

          <Block title="Typographie">
            <div className="flex max-w-2xl flex-col gap-2">
              <Eyebrow>Sur-titre</Eyebrow>
              <Heading level={2}>Titre de section</Heading>
              <Text>
                Corps de texte lisible en 3G. La trame de 1,20 m structure tout le produit et, par
                extension, le rythme de la mise en page.
              </Text>
            </div>
          </Block>

          <Block title="Formulaire">
            <div className="flex w-full max-w-md flex-col gap-4">
              <div>
                <Label htmlFor="ks-name">Nom</Label>
                <Input id="ks-name" placeholder="Votre nom" />
              </div>
              <div>
                <Label htmlFor="ks-usage">Usage</Label>
                <Select id="ks-usage" defaultValue="">
                  <option value="" disabled>
                    Choisir…
                  </option>
                  <option value="commerce">Box Commerce</option>
                  <option value="sanitaire">Sanitaire public</option>
                  <option value="studio">Studio</option>
                </Select>
              </div>
              <div>
                <Label htmlFor="ks-msg">Message</Label>
                <Textarea id="ks-msg" placeholder="Votre projet en quelques mots" />
              </div>
            </div>
          </Block>

          <Block title="Carte">
            <Card className="w-80">
              <CardHeader>
                <CardTitle>Box Commerce</CardTitle>
              </CardHeader>
              <CardBody>
                <Text className="text-sm">
                  Local commercial M2, mezzanine possible sur façade 4,20 m.
                </Text>
              </CardBody>
              <CardFooter>
                <Button size="sm">Configurer</Button>
                <Button size="sm" variant="ghost">
                  Détails
                </Button>
              </CardFooter>
            </Card>
          </Block>

          <Block title="Alertes">
            <div className="flex w-full max-w-2xl flex-col gap-3">
              <Alert tone="info">Livraison dans le Grand Abidjan d&apos;abord.</Alert>
              <Alert tone="warning">
                ⚠️ Dimensions et prix = hypothèses V1 à valider par ingénieur structure agréé.
              </Alert>
            </div>
          </Block>

          <Block title="Canal WhatsApp">
            <WhatsAppButton
              phone="2250700000000"
              message="Bonjour Noéma, je veux un devis Box Commerce."
            >
              Discuter sur WhatsApp
            </WhatsAppButton>
          </Block>

          <Block title="Réseau — BrandSwitcher">
            <BrandSwitcher current="construction" />
          </Block>

          <Block title="Réseau — TrustBar">
            <TrustBar
              items={[
                { label: "Essais LBTP", detail: "laboratoire agréé" },
                { label: "Garantie usine" },
                { label: "Assurance décennale" },
              ]}
            />
          </Block>

          <Block title="Réseau — CaseStudyCard">
            <CaseStudyCard
              className="w-80"
              title="Kiosque télécom, Yopougon"
              usage="Box Commerce"
              duration="Posé en 1 jour"
              location="Abidjan, Côte d'Ivoire"
            />
          </Block>

          {/* ─────────────────────────────────────────────────────────────
              DA « vitrine minimale animée » — mission SITE-002, les 15 widgets
             ───────────────────────────────────────────────────────────── */}
          <header className="flex flex-col gap-2 pt-6">
            <Eyebrow>Mission SITE-002</Eyebrow>
            <Heading level={2}>DA vitrine animée — les 15 composants</Heading>
            <Text>Reveal au scroll, compteurs, masques SVG, séparateurs, marquee, FAB…</Text>
          </header>

          <Block title="1 · StatCard (compteur animé)">
            <div className="grid w-full gap-4 sm:grid-cols-3">
              <StatCard value={1} suffix=" jour" label="de pose sur site." />
              <StatCard value={2700} suffix=" mm" label="sous plafond (mur type)." />
              <StatCard value={5} suffix=" offres" label="sur 3 niveaux M1-M3." />
            </div>
          </Block>

          <Block title="2 · FeatureCardDark (colonne technologie)">
            <div className="grid w-full gap-4 sm:grid-cols-2">
              <FeatureCardDark title="Solidité béton">
                Poteaux rainurés + panneaux empilés, tolérances ±2-3 mm.
              </FeatureCardDark>
              <FeatureCardDark title="Fraîcheur tropicale">
                Toiture froide ventilée : 6 à 10 °C de moins qu&apos;un box en tôle.
              </FeatureCardDark>
            </div>
          </Block>

          <Block title="3 · OfferCard (catalogue)">
            <div className="grid w-full grid-cols-2 gap-4 sm:grid-cols-4">
              <OfferCard
                href="/modules/box-commerce"
                name="Box Commerce"
                badge="M2"
                price="à partir de 3 200 000 F"
                imageSrc="/renders/box-commerce-3quart-1.webp"
                imageLabel="Rendu Box Commerce — façade avant"
              />
              <OfferCard
                href="/modules/studio"
                name="Studio"
                badge="M3"
                price="à partir de 3 800 000 F"
                imageSrc="/renders/studio-3quart-1.webp"
                imageLabel="Rendu Studio — façade avant"
              />
              <OfferCard
                href="/modules/sanitaire-public"
                name="Sanitaire"
                badge="M3"
                price="à partir de 2 800 000 F"
                imageLabel="Rendu Sanitaire public — façade (placeholder)"
              />
              <OfferCard
                href="/modules/poste-gardiennage"
                name="Gardiennage"
                badge="M2"
                price="à partir de 2 000 000 F"
                imageLabel="Rendu Poste de gardiennage (placeholder)"
              />
            </div>
          </Block>

          <Block title="4 · PaymentCard (claire / sombre)">
            <div className="grid w-full gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <PaymentCard title="Achat" tone="light" href="/configurer">
                Vente directe sur dalle coulée.
              </PaymentCard>
              <PaymentCard title="Location" tone="dark" href="/configurer">
                Loyer mensuel, module sur skid démontable.
              </PaymentCard>
              <PaymentCard title="Accession" tone="light" href="/configurer">
                Rent-to-own : loyers qui construisent la propriété.
              </PaymentCard>
              <PaymentCard title="Mobile money & CB" tone="dark" href="/configurer">
                CB en ligne ; mobile money via WhatsApp.
              </PaymentCard>
            </div>
          </Block>

          <Block title="5 · ProcessStep (numéro qui se dessine)">
            <div className="grid w-full gap-8 sm:grid-cols-3">
              <ProcessStep n={1} title="Configurez">
                Projet, taille, équipement — en 2 minutes.
              </ProcessStep>
              <ProcessStep n={2} title="On fabrique">
                Panneaux à ±2-3 mm, réseaux posés, contrôle qualité.
              </ProcessStep>
              <ProcessStep n={3} title="Posé en 1 jour">
                Assemblage à sec, aucune grue.
              </ProcessStep>
            </div>
          </Block>

          <Block title="6 · MaskedPhoto (masques SVG + parallax)">
            <div className="grid w-full grid-cols-2 gap-4 sm:grid-cols-4">
              {MASK_VARIANTS.map((v) => (
                <div key={v} className="flex flex-col gap-2">
                  <MaskedPhoto
                    variant={v}
                    ratio="4/3"
                    src="/renders/box-commerce-3quart-1.webp"
                    label={`Masque ${v}`}
                  />
                  <span className="text-center text-xs font-medium text-night/50">{v}</span>
                </div>
              ))}
            </div>
          </Block>

          <Block title="7 · SectionDivider (séparateurs SVG)">
            <div className="flex w-full flex-col gap-3">
              {DIVIDER_VARIANTS.map((v) => (
                <div key={v} className="overflow-hidden rounded-xl">
                  <SectionDivider variant={v} from="snow" to="night" height={70} />
                  <p className="bg-night py-1 text-center text-[11px] font-medium uppercase tracking-widest text-cream/70">
                    {v}
                  </p>
                </div>
              ))}
            </div>
          </Block>

          <Block title="8 · FloatingPill (badges posés sur photo)">
            <div className="relative flex h-40 w-full max-w-sm items-center justify-center overflow-hidden rounded-2xl bg-night">
              <FloatingPill tone="light" className="absolute left-4 top-4">
                Pose en 1 jour
              </FloatingPill>
              <FloatingPill tone="accent" delay={0.3} className="absolute bottom-4 right-4">
                dès 85 000 F / mois
              </FloatingPill>
            </div>
          </Block>

          <Block title="9 · Marquee (défilement infini)">
            <div className="w-full">
              <Marquee
                items={["P1 · Panneau", "P2 · Claustra", "P3 · Jalousies", "P4 · Porte", "P5 · Casquette"]}
              />
            </div>
          </Block>

          <Block title="10 · TimelinePose (frise au scroll)">
            <div className="w-full rounded-2xl bg-white p-6 shadow-soft">
              <TimelinePose
                steps={[
                  { time: "7h", label: "Livraison & calage" },
                  { time: "11h", label: "Empilage panneaux" },
                  { time: "14h", label: "Toiture froide" },
                  { time: "18h", label: "Prêt à ouvrir" },
                ]}
              />
            </div>
          </Block>

          <Block title="11 · AccordionFAQ (hauteur animée)">
            <div className="w-full max-w-2xl rounded-2xl bg-white p-6 shadow-soft">
              <AccordionFAQ
                items={[
                  { q: "Vraiment posé en 1 jour ?", a: "Oui, les finitions sont faites en usine." },
                  { q: "Puis-je louer sans capital ?", a: "Oui, en location sur skid démontable." },
                ]}
              />
            </div>
          </Block>

          <Block title="12 · TestimonialCard">
            <div className="grid w-full gap-4 sm:grid-cols-2">
              <TestimonialCard
                quote="« Posé un vendredi, ouvert le samedi. »"
                author="Konan A."
                authorRole="Épicier · Yopougon"
                rating={5}
              />
              <TestimonialCard
                quote="« Financé depuis la France, photos à chaque étape. »"
                author="Mariam S."
                authorRole="Diaspora · Paris"
                rating={5}
              />
            </div>
          </Block>

          <Block title="13 · WhatsAppFAB / 14 · StickyNav">
            <Text className="max-w-2xl text-sm">
              Ces deux composants sont actifs à l&apos;échelle du site : le <strong>WhatsAppFAB</strong>{" "}
              apparaît en bas à droite après 600 px de scroll (avec pulse discret), et le{" "}
              <strong>StickyNav</strong> est la barre de navigation qui se détache en pill
              glassmorphism dès que la page défile. Faites défiler pour les voir.
            </Text>
          </Block>

          <Block title="15 · ConfiguratorTeaser (swap de façade)">
            <div className="w-full">
              <ConfiguratorTeaser
                href="/configurer"
                presets={[
                  { label: "Box Commerce", bays: 4, opening: "vitrine" },
                  { label: "Studio", bays: 4, opening: "porte" },
                  { label: "Gardiennage", bays: 2, opening: "vitrine" },
                ]}
              />
            </div>
          </Block>

          <section className="flex flex-col gap-4" data-brand="etansol">
            <Heading level={3}>Thème par marque (data-brand=&quot;etansol&quot;)</Heading>
            <Text>Le même composant, accent surchargé en vert Étansol via le token.</Text>
            <div className="flex flex-wrap gap-4">
              <Button>Devis pro</Button>
              <Badge tone="accent">Étanchéité</Badge>
              <Link href="#">En savoir plus</Link>
            </div>
          </section>
        </Container>
      </Section>
    </main>
  );
}
