import Image from "next/image";
import Link from "next/link";
import { CONTACT, getDict, type Locale } from "@/lib/i18n";
import { Clock, Facebook, Mail, Phone, Pin } from "./Icons";

export default function Footer({ locale }: { locale: Locale }) {
  const d = getDict(locale);
  const t = d.footer;
  const p = `/${locale}`;
  const menu = [
    ["", d.nav.home],
    ["/about", d.nav.about],
    ["/accommodation", d.nav.accommodation],
    ["/location", d.nav.location],
    ["/contact", d.nav.contact],
  ];
  const social = "grid size-11 place-items-center rounded-full bg-white/8 text-white transition duration-300 hover:-translate-y-1 hover:bg-gold hover:text-forest-900";

  return (
    <footer className="bg-forest-900 pt-18 pb-7 text-[#c3cec7] dark:bg-forest-950">
      <div className="container-x">
        <div className="grid gap-9 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.3fr]">
          <div>
            <Link href={p} className="mb-4 flex items-center gap-3 text-white">
              <Image src="/assets/img/logo.jpg" alt="" width={48} height={48} className="size-12 rounded-full border-2 border-gold" />
              <span className="leading-none">
                <b className="block font-serif text-2xl">Suld Resort</b>
                <small className="text-[0.68rem] tracking-[0.32em] text-gold-soft uppercase">Terelj</small>
              </span>
            </Link>
            <p className="mb-4 leading-relaxed">{t.about}</p>
            <div className="flex gap-3">
              <a href={CONTACT.facebook} target="_blank" rel="noopener" aria-label="Facebook" className={social}><Facebook /></a>
              <a href={`tel:${CONTACT.phone}`} aria-label={d.common.call} className={social}><Phone /></a>
              <a href={`mailto:${CONTACT.email}`} aria-label="Email" className={social}><Mail /></a>
            </div>
          </div>
          <div>
            <h4 className="mb-4 font-serif text-xl text-white">{t.menu}</h4>
            <ul className="grid gap-2.5">
              {menu.map(([h, l]) => (
                <li key={h}><Link href={`${p}${h}`} className="transition hover:pl-1 hover:text-gold">{l}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="mb-4 font-serif text-xl text-white">{t.stay}</h4>
            <ul className="grid gap-2.5">
              <li><Link href={`${p}/accommodation#ger`} className="transition hover:pl-1 hover:text-gold">{d.booking.rooms.ger}</Link></li>
              <li><Link href={`${p}/accommodation#house`} className="transition hover:pl-1 hover:text-gold">{d.booking.rooms.house}</Link></li>
              <li><Link href={`${p}#gallery`} className="transition hover:pl-1 hover:text-gold">{t.gallery}</Link></li>
              <li><Link href={`${p}#videos`} className="transition hover:pl-1 hover:text-gold">{t.videos}</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="mb-4 font-serif text-xl text-white">{t.contact}</h4>
            <ul className="grid gap-3 [&_svg]:mt-1 [&_svg]:size-4 [&_svg]:flex-none [&_svg]:text-gold [&>li]:flex [&>li]:gap-2.5">
              <li><Phone /><a href={`tel:${CONTACT.phone}`} className="hover:text-gold">{CONTACT.phoneDisplay}</a></li>
              <li><Phone /><a href={`tel:${CONTACT.phone2}`} className="hover:text-gold">{CONTACT.phone2Display}</a></li>
              <li><Mail /><a href={`mailto:${CONTACT.email}`} className="hover:text-gold">{CONTACT.email}</a></li>
              <li><Pin /><span>{t.address}</span></li>
              <li><Clock /><span>{t.hours}</span></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 flex flex-wrap justify-between gap-2.5 border-t border-white/10 pt-5 text-sm">
          <span>© {new Date().getFullYear()} Suld Resort · Terelj</span>
          <span>{t.rights}</span>
        </div>
      </div>
    </footer>
  );
}
