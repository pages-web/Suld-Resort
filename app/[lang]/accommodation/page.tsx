import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CONTACT, getDict, isLocale } from "@/lib/i18n";
import Reveal from "@/components/Reveal";
import PhotoGrid from "@/components/PhotoGrid";
import { ArrowLink, CallButton, PageHero } from "@/components/ui";
import { Messenger, Phone } from "@/components/Icons";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  return isLocale(lang) ? { title: getDict(lang).rooms.hero.title } : {};
}

const GER = ["p04", "p13", "v05", "p16"];
const HOUSE = ["p11", "p03", "p12", "p19", "p02", "p20", "p18"];

export default async function AccommodationPage({ params }: Props) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const d = getDict(lang);
  const r = d.rooms;

  const rooms = [
    { id: "ger", c: r.ger, files: GER, alt: false },
    { id: "house", c: r.house, files: HOUSE, alt: true },
  ] as const;

  return (
    <>
      <PageHero img="/assets/img/p10.jpg" title={r.hero.title} text={r.hero.text} home={d.common.home} homeHref={`/${lang}`} />

      {rooms.map(({ id, c, files, alt }) => {
        const photos = files.map((f, i) => ({ src: `/assets/img/${f}.jpg`, alt: c.alts[i] }));
        const text = (
          <Reveal delay={120}>
            <span className="eyebrow">{c.eyebrow}</span>
            <h2 className="h2">{c.title}</h2>
            <div className="flex flex-wrap gap-1.5">
              {c.tags.map((t) => (
                <span key={t} className="rounded-full bg-forest-500/12 px-3 py-1 text-xs font-bold text-forest-700 dark:bg-gold/15 dark:text-gold">{t}</span>
              ))}
            </div>
            <p className="lead mt-4 mb-3">{c.lead}</p>
            <p className="leading-relaxed">{c.body}</p>
            <ul className="check my-6 grid grid-cols-1 gap-x-4.5 gap-y-2.5 sm:grid-cols-2">
              {c.amenities.map((a) => <li key={a}>{a}</li>)}
            </ul>
            <ArrowLink href={`/${lang}/contact?room=${id}#booking-form`}>{c.cta}</ArrowLink>
          </Reveal>
        );
        const grid = (
          <Reveal>
            <PhotoGrid photos={photos} />
          </Reveal>
        );
        return (
          <section key={id} id={id} className={`scroll-mt-20 border-b border-line py-[clamp(56px,8vw,100px)] ${alt ? "bg-alt" : ""}`}>
            <div className={`container-x grid items-start gap-[clamp(28px,5vw,64px)] ${alt ? "lg:grid-cols-[1fr_1.2fr]" : "lg:grid-cols-[1.2fr_1fr]"}`}>
              {alt ? <>{text}{grid}</> : <>{grid}{text}</>}
            </div>
          </section>
        );
      })}

      <section className="section on-dark bg-forest-900 text-center text-[#f7f2e8] dark:bg-forest-950">
        <Reveal className="container-x">
          <span className="eyebrow">{r.info.eyebrow}</span>
          <h2 className="h2">{r.info.title}</h2>
          <p className="mx-auto max-w-[62ch] text-lg text-[#c9d3cc]">{r.info.text}</p>
          <div className="mt-7 flex flex-wrap justify-center gap-3.5">
            <CallButton phone={CONTACT.phone} label={CONTACT.phoneDisplay} />
            <a className="btn btn-ghost" href={`tel:${CONTACT.phone2}`}><Phone /><span>{CONTACT.phone2Display}</span></a>
            <a className="btn btn-ghost" href={CONTACT.messenger} target="_blank" rel="noopener"><Messenger /><span>{r.info.messenger}</span></a>
          </div>
        </Reveal>
      </section>
    </>
  );
}
