import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { Arrow, Phone } from "./Icons";

/** Inner-page hero with background photo and breadcrumb. */
export function PageHero({ img, title, text, home, homeHref }: { img: string; title: string; text: string; home: string; homeHref: string }) {
  return (
    <section className="relative grid min-h-[58vh] items-end overflow-hidden text-white">
      <Image src={img} alt="" fill priority quality={90} sizes="100vw" className="object-cover object-[center_65%]" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a1912]/35 to-[#0a1912]/85" />
      <div className="container-x relative z-10 pt-36 pb-14">
        <div className="mb-2.5 animate-hero-in text-sm text-gold-soft">
          <Link href={homeHref} className="hover:text-gold">{home}</Link> / {title}
        </div>
        <h1 className="mb-3 animate-hero-in text-[clamp(2.6rem,6vw,4.6rem)] [animation-delay:.1s]">{title}</h1>
        <p className="max-w-[60ch] animate-hero-in text-lg text-[#e2ebe4] [animation-delay:.2s]">{text}</p>
      </div>
    </section>
  );
}

export function CallButton({ phone, label, className = "btn-gold" }: { phone: string; label: string; className?: string }) {
  return (
    <a className={`btn ${className}`} href={`tel:${phone}`}>
      <Phone className="animate-ring" />
      <span>{label}</span>
    </a>
  );
}

export function ArrowLink({ href, children, className = "btn-green" }: { href: string; children: ReactNode; className?: string }) {
  return (
    <Link className={`btn ${className}`} href={href}>
      <span>{children}</span>
      <Arrow className="arr" />
    </Link>
  );
}

export function IconBadge({ children }: { children: ReactNode }) {
  return (
    <div className="mb-4 grid size-12.5 place-items-center rounded-[14px] bg-gold/15 text-wood transition duration-500 group-hover:scale-110 group-hover:-rotate-8 group-hover:bg-gold group-hover:text-forest-900 dark:text-gold [&_svg]:size-6.5">
      {children}
    </div>
  );
}
