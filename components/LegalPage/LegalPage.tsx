import type { Messages } from "@/lib/dictionaries";

type LegalPageProps = {
  content: Messages["legalPages"]["avisoLegal"];
};

export default function LegalPage({ content }: LegalPageProps) {
  return (
    <main className="mx-auto max-w-3xl px-6 py-24">
      <h1 className="font-display text-4xl uppercase tracking-wide sm:text-5xl">{content.title}</h1>
      <p className="mt-2 text-sm text-ink/50">{content.updated}</p>
      <div className="mt-10 space-y-8">
        {content.sections.map((section) => (
          <section key={section.heading}>
            <h2 className="font-display text-xl uppercase tracking-wide text-gold-dark">
              {section.heading}
            </h2>
            <p className="mt-3 text-ink/70">{section.body}</p>
          </section>
        ))}
      </div>
    </main>
  );
}
