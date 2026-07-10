import type { Metadata } from "next";
import { PhotoFrame } from "../../components/PhotoFrame";
import { WhatsAppCTA } from "../../components/WhatsAppCTA";

export const metadata: Metadata = {
  title: "Contact — Noéma Construction",
  description: "Parlez-nous de votre projet sur WhatsApp. Abidjan · Libreville.",
};

const CONTACT_WHATSAPP = "Bonjour Noéma, j'aimerais parler de mon projet.";

export default function ContactPage() {
  return (
    <main className="px-3 py-6 sm:px-4">
      <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-2">
        <section className="flex flex-col gap-4 rounded-3xl bg-white p-6 shadow-soft sm:p-10">
          <p className="text-xs font-semibold uppercase tracking-widest text-dawn">Contact</p>
          <h1 className="text-4xl font-black tracking-tight text-night sm:text-5xl">
            Parlons de votre projet
          </h1>
          <p className="text-night/70">
            Le plus simple, le plus rapide : WhatsApp. Envoyez-nous un mot, on vous répond avec un
            premier chiffrage indicatif.
          </p>
          <WhatsAppCTA message={CONTACT_WHATSAPP} size="lg" variant="green" className="w-fit" />
          <div className="mt-4 flex flex-col gap-2 text-sm text-night/70">
            <p>
              <span className="font-semibold text-night">Zones :</span> Grand Abidjan (Côte
              d&apos;Ivoire) · Libreville (Gabon).
            </p>
            <p>
              <span className="font-semibold text-night">Horaires :</span> lun.–sam. 8h–19h.
            </p>
          </div>
        </section>

        <section className="flex flex-col gap-4">
          <PhotoFrame label="Dépôt Abidjan — module showroom à visiter" ratio="4/3" />
          <div className="rounded-3xl bg-sand p-6">
            <h2 className="text-lg font-bold text-night">Venez toucher le module</h2>
            <p className="mt-1 text-sm text-night/70">
              On croit au terrain : un module showroom se visite. Demandez l&apos;adresse sur
              WhatsApp.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
