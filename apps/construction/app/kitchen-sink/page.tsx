import {
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
  Container,
  Divider,
  Eyebrow,
  Heading,
  Input,
  Label,
  Link,
  Section,
  Select,
  Text,
  Textarea,
  TrustBar,
  WhatsAppButton,
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

export default function KitchenSinkPage() {
  return (
    <main>
      <Section>
        <Container className="flex flex-col gap-10">
          <header className="flex flex-col gap-2">
            <Eyebrow>@noema/ui</Eyebrow>
            <Heading level={1}>Kitchen sink</Heading>
            <Text>Tous les composants du design system, thème Construction (accent orange).</Text>
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
