import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CONTACT, getDict, isLocale } from "@/lib/i18n";
import Reveal from "@/components/Reveal";
import PhotoGrid from "@/components/PhotoGrid";
import { PageHero } from "@/components/ui";
import { Arrow, Clock, Phone, Pin } from "@/components/Icons";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  return isLocale(lang) ? { title: getDict(lang).location.hero.title } : {};
}

export default async function LocationPage({ params }: Props) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const d = getDict(lang);
  const l = d.location;

  const info = [
    { icon: <Pin />, label: l.addressLabel, value: <span>{l.address}</span> },
    { icon: <Clock />, label: l.hoursLabel, value: <span>{l.hours}</span> },
    { icon: <Phone />, label: l.dirLabel, value: <a href={`tel:${CONTACT.phone}`} className="hover:text-forest-500 dark:hover:text-gold">{CONTACT.phoneDisplay}</a> },
  ];
  const nearby = ["p05", "p14", "v03", "p15", "p10", "p01"].map((f) => ({ src: `/assets/img/${f}.jpg`, alt: l.nearby.title }));

  return (
    <>
      <PageHero img="/assets/img/p01.jpg" title={l.hero.title} text={l.hero.text} home={d.common.home} homeHref={`/${lang}`} />

      <section className="section">
        <div className="container-x grid items-center gap-[clamp(32px,6vw,80px)] md:grid-cols-[1fr_1.1fr]">
          <Reveal>
            <span className="eyebrow">{l.eyebrow}</span>
            <h2 className="h2">{l.title}</h2>
            <ul className="my-6 grid gap-4.5">
              {info.map((it) => (
                <li key={it.label} className="group flex items-start gap-4">
                  <span className="grid size-11.5 flex-none place-items-center rounded-xl bg-forest-800 text-gold shadow-soft transition duration-400 group-hover:scale-108 group-hover:-rotate-6 group-hover:bg-gold group-hover:text-forest-900 [&_svg]:size-5.5">
                    {it.icon}
                  </span>
                  <div>
                    <b className="block text-xs font-bold tracking-[0.12em] text-muted uppercase">{it.label}</b>
                    <div className="text-[1.08rem] font-semibold">{it.value}</div>
                  </div>
                </li>
              ))}
            </ul>
            <a className="btn btn-green" href={CONTACT.maps} target="_blank" rel="noopener">
              <Pin /><span>{l.mapsBtn}</span><Arrow className="arr" />
            </a>
          </Reveal>
          <Reveal delay={150} className="aspect-[16/10] overflow-hidden rounded-[22px] bg-line shadow-card transition hover:shadow-lift">
            <iframe src={CONTACT.mapEmbed} loading="lazy" referrerPolicy="no-referrer-when-downgrade" title={l.title} className="size-full border-0 dark:brightness-90 dark:hue-rotate-180 dark:invert" />
          </Reveal>
        </div>
      </section>

      <section className="section bg-alt">
        <div className="container-x">
          <Reveal>
            <span className="eyebrow">{l.how.eyebrow}</span>
            <h2 className="h2">{l.how.title}</h2>
          </Reveal>
          <div className="mt-10 grid gap-5.5 md:grid-cols-3">
            {l.how.steps.map((s, i) => (
              <Reveal key={s.t} delay={i * 110}>
                <div className="lift h-full rounded-[18px] border border-line bg-surface p-6.5 hover:border-gold-soft">
                  <span className="mb-2.5 block font-serif text-5xl leading-none text-gold">0{i + 1}</span>
                  <h3 className="mb-1.5 text-[1.35rem]">{s.t}</h3>
                  <p className="text-muted">{s.p}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <Reveal className="container-x text-center">
          <span className="eyebrow">{l.nearby.eyebrow}</span>
          <h2 className="h2">{l.nearby.title}</h2>
          <p className="lead mx-auto">{l.nearby.lead}</p>
        </Reveal>
        <div className="container-x">
          <PhotoGrid photos={nearby} variant="masonry" />
        </div>
      </section>
    </>
  );
}
