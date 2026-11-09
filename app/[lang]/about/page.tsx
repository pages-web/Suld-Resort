import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CONTACT, getDict, isLocale } from "@/lib/i18n";
import Reveal from "@/components/Reveal";
import { ArrowLink, CallButton, IconBadge, PageHero } from "@/components/ui";
import { Heart, Home, Leaf } from "@/components/Icons";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  return isLocale(lang) ? { title: getDict(lang).about.hero.title } : {};
}

export default async function AboutPage({ params }: Props) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const d = getDict(lang);
  const a = d.about;
  const valueIcons = [<Leaf key="l" />, <Home key="h" />, <Heart key="he" />];
  const eventImgs = ["/assets/img/p33.jpg", "/assets/img/p17.jpg", "/assets/img/p16.jpg"];

  return (
    <>
      <PageHero img="/assets/img/p09.jpg" title={a.hero.title} text={a.hero.text} home={d.common.home} homeHref={`/${lang}`} />

      <section className="section">
        <div className="container-x grid items-center gap-[clamp(32px,6vw,80px)] md:grid-cols-[1.05fr_1fr]">
          <Reveal>
            <span className="eyebrow">{a.story.eyebrow}</span>
            <h2 className="h2">{a.story.title}</h2>
            <p className="lead mb-4">{a.story.lead}</p>
            <p className="mb-4 leading-relaxed">{a.story.p1}</p>
            <p className="leading-relaxed">{a.story.p2}</p>
          </Reveal>
          <Reveal className="group relative aspect-[4/4.4]" delay={150}>
            <div className="absolute inset-[0_18%_14%_0] overflow-hidden rounded-[18px] shadow-card transition duration-700 group-hover:shadow-lift">
              <Image src="/assets/img/p04.jpg" alt="" fill sizes="480px" className="object-cover transition duration-700 group-hover:scale-105" />
            </div>
            <div className="absolute right-0 bottom-0 h-1/2 w-[52%] animate-floaty overflow-hidden rounded-[18px] border-[6px] border-bg shadow-lift">
              <Image src="/assets/img/p13.jpg" alt="" fill sizes="300px" className="object-cover" />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section bg-alt">
        <Reveal className="container-x text-center">
          <p className="mx-auto max-w-[30ch] font-serif text-[clamp(1.6rem,3vw,2.4rem)] leading-snug italic">{a.quote}</p>
        </Reveal>
        <div className="container-x mt-10 grid gap-5.5 md:grid-cols-3">
          {a.values.map((v, i) => (
            <Reveal key={v.t} delay={i * 110}>
              <div className="group lift h-full rounded-[18px] border border-line bg-surface p-6.5 hover:border-gold-soft">
                <IconBadge>{valueIcons[i]}</IconBadge>
                <h3 className="mb-1.5 text-[1.35rem]">{v.t}</h3>
                <p className="text-[0.95rem] text-muted">{v.p}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="container-x">
          <Reveal>
            <span className="eyebrow">{a.events.eyebrow}</span>
            <h2 className="h2">{a.events.title}</h2>
            <p className="lead">{a.events.lead}</p>
          </Reveal>
          <div className="mt-10 grid gap-5.5 md:grid-cols-3">
            {a.events.items.map((e, i) => (
              <Reveal key={e.t} delay={i * 110}>
                <article className="group lift h-full overflow-hidden rounded-[18px] border border-line bg-surface hover:border-gold-soft">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image src={eventImgs[i]} alt={e.t} fill sizes="400px" className="object-cover transition duration-700 group-hover:scale-106" />
                  </div>
                  <div className="p-5.5">
                    <h3 className="mb-1.5 text-[1.35rem]">{e.t}</h3>
                    <p className="text-[0.95rem] text-muted">{e.p}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section relative overflow-hidden text-center text-white">
        <Image src="/assets/img/p05.jpg" alt="" fill sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-[#0c1e14]/72" />
        <Reveal className="container-x relative z-10">
          <h2 className="h2">{a.cta.title}</h2>
          <p className="mx-auto max-w-[56ch] text-[#dce6df]">{a.cta.text}</p>
          <div className="mt-7 flex flex-wrap justify-center gap-3.5">
            <CallButton phone={CONTACT.phone} label={CONTACT.phoneDisplay} />
            <ArrowLink href={`/${lang}/accommodation`} className="btn-ghost">{a.cta.rooms}</ArrowLink>
          </div>
        </Reveal>
      </section>
    </>
  );
}
