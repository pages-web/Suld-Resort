import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CONTACT, getDict, isLocale } from "@/lib/i18n";
import HeroSlider from "@/components/HeroSlider";
import BookingBar from "@/components/BookingBar";
import Gallery from "@/components/Gallery";
import Videos from "@/components/Videos";
import CountUp from "@/components/CountUp";
import Reveal from "@/components/Reveal";
import { ArrowLink, CallButton, IconBadge } from "@/components/ui";
import { Arrow, Clock, Facebook, Home as HomeIcon, Mountain, Pin, Smile, Sparkle, Users } from "@/components/Icons";

export default async function HomePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const d = getDict(lang);
  const h = d.home;
  const p = `/${lang}`;

  const stats = [
    { icon: <HomeIcon />, node: <CountUp to={2} />, label: h.intro.stats[0] },
    { icon: <Clock />, node: <CountUp to={24} suffix="/7" />, label: h.intro.stats[1] },
    { icon: <Facebook />, node: <CountUp to={4.5} decimals={1} suffix="K+" />, label: h.intro.stats[2] },
  ];
  const whyIcons = [<Mountain key="m" />, <Users key="u" />, <Smile key="s" />, <Sparkle key="sp" />];

  return (
    <>
      {/* HERO */}
      <section className="relative grid min-h-svh items-end overflow-hidden text-white">
        <HeroSlider alts={d.hero.alts} />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a1912]/45 via-[#0a1912]/10 to-[#0a1912]/85" />
        <div className="container-x relative z-10 pb-60 sm:pb-52 lg:pb-48">
          <span className="mb-5 inline-flex animate-hero-in items-center gap-2 rounded-full border border-white/25 bg-white/14 px-4 py-1.5 text-[0.82rem] font-semibold tracking-wide backdrop-blur">
            <Pin className="size-4 text-gold" /> {d.hero.badge}
          </span>
          <h1 className="mb-4 max-w-[14ch] animate-hero-in text-[clamp(2.6rem,6vw,5rem)] [text-shadow:0_4px_30px_rgba(0,0,0,.35)] [animation-delay:.15s]">
            {d.hero.title}
          </h1>
          <p className="max-w-[54ch] animate-hero-in text-[clamp(1.05rem,1.6vw,1.25rem)] text-[#e9efe9] [animation-delay:.3s]">{d.hero.text}</p>
          <div className="mt-7 flex animate-hero-in flex-wrap gap-3.5 [animation-delay:.45s]">
            <CallButton phone={CONTACT.phone} label={d.hero.call} />
            <ArrowLink href={`${p}/accommodation`} className="btn-ghost">{d.hero.rooms}</ArrowLink>
          </div>
        </div>
      </section>

      {/* BOOKING BAR (from the reference design) */}
      <BookingBar locale={lang} />

      {/* INTRO */}
      <section id="intro" className="section">
        <div className="container-x grid items-center gap-[clamp(32px,6vw,80px)] md:grid-cols-[1.05fr_1fr]">
          <Reveal>
            <span className="eyebrow">{h.intro.eyebrow}</span>
            <h2 className="h2">{h.intro.title}</h2>
            <p className="lead mb-4">{h.intro.lead}</p>
            <p className="leading-relaxed">{h.intro.body}</p>
            <div className="mt-8 grid grid-cols-3 gap-4">
              {stats.map((s) => (
                <div key={s.label} className="group border-t-2 border-gold pt-3.5">
                  <i className="mb-2.5 grid size-9.5 place-items-center rounded-xl bg-gold/15 text-wood transition duration-400 group-hover:-translate-y-1 group-hover:-rotate-6 group-hover:bg-gold group-hover:text-forest-900 dark:text-gold [&_svg]:size-5">
                    {s.icon}
                  </i>
                  <b className="block font-serif text-4xl leading-none text-forest-800 dark:text-gold-soft">{s.node}</b>
                  <span className="text-sm text-muted">{s.label}</span>
                </div>
              ))}
            </div>
            <div className="mt-8">
              <ArrowLink href={`${p}/about`}>{h.intro.more}</ArrowLink>
            </div>
          </Reveal>
          <Reveal className="group relative aspect-[4/4.4]" delay={150}>
            <div className="absolute inset-[0_18%_14%_0] overflow-hidden rounded-[18px] shadow-card transition duration-700 group-hover:-rotate-1 group-hover:shadow-lift">
              <Image src="/assets/img/p10.jpg" alt="" fill sizes="(max-width: 768px) 80vw, 480px" className="object-cover transition duration-700 group-hover:scale-105" />
            </div>
            <div className="absolute right-0 bottom-0 h-1/2 w-[52%] animate-floaty overflow-hidden rounded-[18px] border-[6px] border-bg shadow-lift">
              <Image src="/assets/img/p08.jpg" alt="" fill sizes="300px" className="object-cover" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* STAY */}
      <section className="section bg-alt">
        <Reveal className="container-x text-center">
          <span className="eyebrow">{h.stay.eyebrow}</span>
          <h2 className="h2">{h.stay.title}</h2>
          <p className="lead mx-auto">{h.stay.lead}</p>
        </Reveal>
        <div className="container-x mt-12 grid gap-7 md:grid-cols-2">
          {(
            [
              ["ger", "/assets/img/p04.jpg", h.stay.ger],
              ["house", "/assets/img/p20.jpg", h.stay.house],
            ] as const
          ).map(([id, img, c], i) => (
            <Reveal key={id} delay={i * 120}>
              <Link
                href={`${p}/accommodation#${id}`}
                className="group relative flex min-h-[480px] items-end overflow-hidden rounded-[22px] text-white shadow-card transition duration-500 hover:-translate-y-2 hover:shadow-lift"
              >
                <Image src={img} alt={c.title} fill sizes="(max-width: 768px) 100vw, 600px" quality={88} className="object-cover transition duration-700 group-hover:scale-106" />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent from-35% to-[#0a1912]/90" />
                <div className="pointer-events-none absolute inset-0 rounded-[inherit] border-2 border-transparent transition group-hover:border-gold/80" />
                <div className="relative z-10 p-7.5 transition duration-500 group-hover:-translate-y-1.5">
                  <span className="mb-2 inline-block rounded-full bg-white/15 px-3 py-1 text-xs font-bold backdrop-blur">{c.tag}</span>
                  <h3 className="mb-2 text-3xl">{c.title}</h3>
                  <p className="mb-3.5 text-[#dfe7e1]">{c.text}</p>
                  <span className="inline-flex items-center gap-2 font-bold text-gold">
                    {d.common.details} <Arrow className="arr size-4.5" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* WHY */}
      <section className="section on-dark bg-forest-900 text-[#f7f2e8] dark:bg-forest-950">
        <div className="container-x">
          <Reveal className="text-center">
            <span className="eyebrow">{h.why.eyebrow}</span>
            <h2 className="h2">{h.why.title}</h2>
          </Reveal>
          <div className="mt-12 grid gap-5.5 sm:grid-cols-2 lg:grid-cols-4">
            {h.why.items.map((it, i) => (
              <Reveal key={it.t} delay={i * 110}>
                <div className="group lift h-full rounded-[18px] border border-white/10 bg-white/4 p-6.5 hover:border-gold/50 hover:bg-white/7">
                  <IconBadge>{whyIcons[i]}</IconBadge>
                  <h3 className="mb-1.5 text-[1.35rem]">{it.t}</h3>
                  <p className="text-[0.95rem] text-[#b9c5bd]">{it.p}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY — Swiper */}
      <section id="gallery" className="section scroll-mt-16">
        <Reveal className="container-x text-center">
          <span className="eyebrow">{h.gallery.eyebrow}</span>
          <h2 className="h2">{h.gallery.title}</h2>
          <p className="lead mx-auto">{h.gallery.lead}</p>
        </Reveal>
        <Reveal delay={100}>
          <Gallery caps={h.gallery.caps} prev={d.common.prev} next={d.common.next} />
        </Reveal>
      </section>

      {/* VIDEOS */}
      <section id="videos" className="section scroll-mt-16 bg-alt">
        <div className="container-x">
          <Reveal>
            <span className="eyebrow">{h.videos.eyebrow}</span>
            <h2 className="h2">{h.videos.title}</h2>
            <p className="lead">
              {h.videos.lead}{" "}
              <a href={`${CONTACT.facebook}/reels`} target="_blank" rel="noopener" className="font-semibold text-wood underline-offset-4 hover:underline dark:text-gold">
                {h.videos.link}
              </a>
              {h.videos.lead2.startsWith(".") ? "" : " "}
              {h.videos.lead2}
            </p>
          </Reveal>
          <Videos caps={h.videos.caps} />
        </div>
      </section>

      {/* CTA */}
      <section className="section relative overflow-hidden text-center text-white">
        <Image src="/assets/img/p39.jpg" alt="" fill sizes="100vw" className="object-cover object-[center_70%]" />
        <div className="absolute inset-0 bg-[#0c1e14]/72" />
        <Reveal className="container-x on-dark relative z-10">
          <span className="eyebrow">{h.cta.eyebrow}</span>
          <h2 className="h2">{h.cta.title}</h2>
          <p className="mx-auto max-w-[56ch] text-[#dce6df]">{h.cta.text}</p>
          <div className="mt-7 flex flex-wrap justify-center gap-3.5">
            <CallButton phone={CONTACT.phone} label={CONTACT.phoneDisplay} />
            <ArrowLink href={`${p}/contact`} className="btn-ghost">{h.cta.request}</ArrowLink>
          </div>
        </Reveal>
      </section>
    </>
  );
}
