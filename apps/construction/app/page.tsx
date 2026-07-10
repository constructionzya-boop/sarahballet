import { Button, Container, Eyebrow, Heading, Link, Section, Text } from "@noema/ui";

export default function HomePage() {
  return (
    <main>
      <Section>
        <Container className="flex flex-col items-start gap-5">
          <Eyebrow>Noéma Construction</Eyebrow>
          <Heading level={1}>Bâtir · Équiper · Durer</Heading>
          <Text className="max-w-2xl">
            Modules préfabriqués béton d&apos;une pièce, posés en un jour. Site phare en cours de
            construction — le design system est déjà branché.
          </Text>
          <div className="flex flex-wrap gap-3">
            <Button size="lg">Configurer mon module</Button>
            <Button variant="outline" size="lg">
              Voir les offres
            </Button>
          </div>
          <Link href="/kitchen-sink">Aperçu du design system →</Link>
        </Container>
      </Section>
    </main>
  );
}
