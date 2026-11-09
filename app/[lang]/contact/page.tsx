import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { CONTACT, getDict, isLocale } from "@/lib/i18n";
import Reveal from "@/components/Reveal";
import ContactForm from "@/components/ContactForm";
import { CallButton, PageHero } from "@/components/ui";
import { Facebook, Mail, Messenger, Phone, Pin } from "@/components/Icons";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  return isLocale(lang) ? { title: getDict(lang).contact.hero.title } : {};
}

export default async function ContactPage({ params }: Props) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const d = getDict(lang);
  const c = d.contact;
  const link = "hover:text-forest-500 dark:hover:text-gold";

  const info = [
    {
      icon: <Phone />,
      label: c.phone,
      value: (
        <>
          <a href={`tel:${CONTACT.phone}`} className={link}>{CONTACT.phoneDisplay}</a> ·{" "}
          <a href={`tel:${CONTACT.phone2}`} className={link}>{CONTACT.phone2Display}</a>
        </>
      ),
    },
    { icon: <Mail />, label: c.email, value: <a href={`mailto:${CONTACT.email}`} className={link}>{CONTACT.email}</a> },
    { icon: <Facebook />, label: c.facebook, value: <a href={CONTACT.facebook} target="_blank" rel="noopener" className={link}>facebook.com/suldresort</a> },
    { icon: <Pin />, label: c.address, value: <span>{d.footer.address}</span> },
  ];

  return (
    <>
      <PageHero img="/assets/img/p11.jpg" title={c.hero.title} text={c.hero.text} home={d.common.home} homeHref={`/${lang}`} />

      <section className="section">
        <div className="container-x grid gap-[clamp(28px,5vw,64px)] lg:grid-cols-[1fr_1.15fr]">
          <Reveal>
            <span className="eyebrow">{c.eyebrow}</span>
            <h2 className="h2">{c.title}</h2>
            <p className="lead">{c.lead}</p>
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
            <div className="flex flex-wrap gap-3.5">
              <CallButton phone={CONTACT.phone} label={c.callNow} />
              <a className="btn btn-green" href={CONTACT.messenger} target="_blank" rel="noopener"><Messenger /><span>{c.messenger}</span></a>
            </div>
          </Reveal>
          <Reveal delay={150}>
            <Suspense>
              <ContactForm key={lang} locale={lang} />
            </Suspense>
          </Reveal>
        </div>
      </section>
    </>
  );
}
