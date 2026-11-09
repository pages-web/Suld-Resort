import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import "../globals.css";
import Providers from "@/components/Providers";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Phone } from "@/components/Icons";
import { CONTACT, getDict, isLocale, locales } from "@/lib/i18n";

const serif = Cormorant_Garamond({
  subsets: ["latin", "cyrillic"],
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
});
const sans = Manrope({ subsets: ["latin", "cyrillic"], variable: "--font-manrope" });

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const m = getDict(lang).meta;
  return {
    title: { default: m.title, template: `%s | Suld Resort` },
    description: m.description,
    alternates: { languages: { mn: "/mn", en: "/en" } },
    openGraph: { title: m.title, description: m.description, images: ["/assets/img/hero/hero-1.jpg"] },
  };
}

export default async function LangLayout({ children, params }: { children: React.ReactNode; params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const d = getDict(lang);

  return (
    <html lang={lang} suppressHydrationWarning className={`${serif.variable} ${sans.variable}`}>
      <body>
        <Providers>
          <Header locale={lang} />
          <main>{children}</main>
          <Footer locale={lang} />
          <a
            href={`tel:${CONTACT.phone}`}
            aria-label={`${d.common.call} ${CONTACT.phoneDisplay}`}
            className="fixed right-4.5 bottom-4.5 z-40 grid size-14.5 animate-pulse-gold place-items-center rounded-full bg-gold text-forest-900 shadow-card transition duration-300 hover:scale-110 hover:-rotate-10"
          >
            <Phone className="size-6.5" />
          </a>
        </Providers>
      </body>
    </html>
  );
}
