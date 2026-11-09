"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { CONTACT, getDict, locales, type Locale } from "@/lib/i18n";
import { Close, Menu, Moon, Sun } from "./Icons";

export default function Header({ locale }: { locale: Locale }) {
  const t = getDict(locale).nav;
  const pathname = usePathname();
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => setOpen(false), [pathname]);

  const links = [
    ["", t.home],
    ["/about", t.about],
    ["/accommodation", t.accommodation],
    ["/location", t.location],
    ["/contact", t.contact],
  ] as const;
  const rest = pathname.replace(/^\/(mn|en)/, "");

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        solid ? "bg-forest-900/95 py-2.5 shadow-[0_6px_24px_-12px_rgba(0,0,0,.45)] backdrop-blur-md" : "py-4"
      }`}
    >
      <div className="container-x flex items-center justify-between gap-4">
        <Link href={`/${locale}`} className="group flex items-center gap-3 text-white" aria-label="Suld Resort">
          <Image
            src="/assets/img/logo.jpg"
            alt=""
            width={48}
            height={48}
            className="size-12 rounded-full border-2 border-gold object-cover transition duration-500 group-hover:-rotate-8 group-hover:scale-105 group-hover:shadow-[0_0_0_4px_rgba(201,163,90,.25)]"
          />
          <span className="leading-none">
            <b className="block font-serif text-2xl font-bold tracking-wide">Suld Resort</b>
            <small className="text-[0.68rem] tracking-[0.32em] text-gold-soft uppercase">Terelj</small>
          </span>
        </Link>

        <nav
          className={`fixed inset-y-0 right-0 flex w-[min(320px,85vw)] flex-col gap-1 bg-forest-900 px-5 pt-24 pb-6 shadow-2xl transition-transform duration-300 lg:static lg:w-auto lg:translate-x-0 lg:flex-row lg:items-center lg:bg-transparent lg:p-0 lg:shadow-none ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {links.map(([href, label]) => {
            const active = rest === href || (href === "" && rest === "/");
            return (
              <Link
                key={href}
                href={`/${locale}${href}`}
                className={`group relative rounded-full px-4 py-3 text-[1.02rem] font-semibold lg:py-2 lg:text-[0.93rem] ${
                  active ? "text-gold" : "text-white"
                }`}
              >
                {label}
                <span
                  className={`absolute inset-x-4 bottom-1 h-0.5 origin-left rounded bg-gold transition-transform duration-300 ${
                    active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                  }`}
                />
              </Link>
            );
          })}

          <div className="mt-4 flex items-center gap-2 lg:mt-0 lg:ml-3">
            <LangSwitch locale={locale} rest={rest} label={t.language} />
            <ThemeToggle labels={t} />
          </div>
          <a href={`tel:${CONTACT.phone}`} className="btn btn-gold mt-3 !px-5 !py-2.5 lg:mt-0 lg:ml-2">
            {t.reserve}
          </a>
        </nav>

        <button
          onClick={() => setOpen((o) => !o)}
          className="relative z-10 p-2 text-white lg:hidden"
          aria-label={t.menu}
          aria-expanded={open}
        >
          {open ? <Close width={28} height={28} /> : <Menu width={28} height={28} />}
        </button>
      </div>
      {open && <div className="fixed inset-0 -z-10 bg-black/40 lg:hidden" onClick={() => setOpen(false)} />}
    </header>
  );
}

function LangSwitch({ locale, rest, label }: { locale: Locale; rest: string; label: string }) {
  // keep ?query and #hash (e.g. prefilled booking details) when switching language
  const [suffix, setSuffix] = useState("");
  useEffect(() => {
    const sync = () => setSuffix(window.location.search + window.location.hash);
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, [rest]);
  return (
    <div className="flex rounded-full border border-white/25 bg-white/10 p-0.5 backdrop-blur" role="group" aria-label={label}>
      {locales.map((l) => (
        <Link
          key={l}
          href={`/${l}${rest}${suffix}`}
          scroll={false}
          className={`rounded-full px-3 py-1.5 text-xs font-bold tracking-wider uppercase transition ${
            l === locale ? "bg-gold text-forest-900 shadow" : "text-white hover:text-gold"
          }`}
          aria-current={l === locale ? "true" : undefined}
        >
          {l === "mn" ? "MN" : "EN"}
        </Link>
      ))}
    </div>
  );
}

function ThemeToggle({ labels }: { labels: { light: string; dark: string; theme: string } }) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const dark = mounted && resolvedTheme === "dark";

  return (
    <button
      onClick={() => setTheme(dark ? "light" : "dark")}
      className="group relative grid size-10 place-items-center overflow-hidden rounded-full border border-white/25 bg-white/10 text-white backdrop-blur transition hover:border-gold hover:text-gold"
      aria-label={`${labels.theme}: ${dark ? labels.light : labels.dark}`}
      title={dark ? labels.light : labels.dark}
    >
      <Sun className={`absolute transition duration-500 ${dark ? "rotate-0 opacity-100" : "-rotate-90 opacity-0"}`} />
      <Moon className={`absolute transition duration-500 ${dark ? "rotate-90 opacity-0" : "rotate-0 opacity-100"}`} />
    </button>
  );
}
