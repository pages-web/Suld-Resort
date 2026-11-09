"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { getDict, type Locale } from "@/lib/i18n";
import { Arrow, Bed, Calendar, ChevronDown, Close, Minus, Pin, Plus, Users } from "./Icons";

type Room = "ger" | "house";
type Pop = null | "room" | "guest";

const iso = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
const addDays = (s: string, n: number) => {
  const d = new Date(s + "T00:00:00");
  d.setDate(d.getDate() + n);
  return iso(d);
};
const nightsBetween = (a: string, b: string) => Math.round((+new Date(b + "T00:00:00") - +new Date(a + "T00:00:00")) / 86400000);

function formatDate(s: string, locale: Locale) {
  if (!s) return "—";
  const d = new Date(s + "T00:00:00");
  if (locale === "en") return d.toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" });
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, "0")}.${String(d.getDate()).padStart(2, "0")}`;
}

export default function BookingBar({ locale }: { locale: Locale }) {
  const t = getDict(locale).booking;
  const router = useRouter();
  const [visible, setVisible] = useState(true);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [room, setRoom] = useState<Room | null>(null);
  const [adults, setAdults] = useState(0);
  const [children, setChildren] = useState(0);
  const [pop, setPop] = useState<Pop>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const inRef = useRef<HTMLInputElement>(null);
  const outRef = useRef<HTMLInputElement>(null);

  // Dates are set on the client to avoid a server/client timezone mismatch.
  useEffect(() => {
    const today = iso(new Date());
    setCheckIn(today);
    setCheckOut(addDays(today, 1));
  }, []);

  useEffect(() => {
    if (!pop) return;
    const onDown = (e: MouseEvent) => {
      if (!barRef.current?.contains(e.target as Node)) setPop(null);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setPop(null);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [pop]);

  const openPicker = (r: React.RefObject<HTMLInputElement | null>) => {
    setPop(null);
    const el = r.current;
    if (!el) return;
    try {
      el.showPicker();
    } catch {
      el.focus();
      el.click();
    }
  };

  const onCheckIn = (v: string) => {
    if (!v) return;
    setCheckIn(v);
    if (!checkOut || checkOut <= v) setCheckOut(addDays(v, 1));
  };

  const reserve = () => {
    const q = new URLSearchParams({ checkin: checkIn, checkout: checkOut });
    if (room) q.set("room", room);
    if (adults) q.set("adults", String(adults));
    if (children) q.set("children", String(children));
    router.push(`/${locale}/contact?${q.toString()}#booking-form`);
  };

  if (!visible) {
    return (
      <div className="container-x relative z-20 -mt-20 flex justify-center">
        <button onClick={() => setVisible(true)} className="btn btn-gold animate-pop !px-7 !py-4 shadow-card">
          <Calendar /> <span>{t.open}</span>
        </button>
      </div>
    );
  }

  const nights = checkIn && checkOut ? nightsBetween(checkIn, checkOut) : 0;

  return (
    <div className="container-x relative z-20 -mt-40 sm:-mt-32 lg:-mt-24">
      <div
        ref={barRef}
        className="relative animate-pop rounded-[28px] bg-surface p-4 text-fg shadow-lift ring-1 ring-black/5 sm:p-5 lg:rounded-full lg:py-6 lg:pr-6 lg:pl-12 dark:ring-white/10"
      >
        <button
          onClick={() => setVisible(false)}
          aria-label={getDict(locale).common.close}
          className="absolute -top-3 -right-2 z-10 grid size-11 place-items-center rounded-full bg-surface text-fg shadow-card ring-1 ring-black/5 transition duration-300 hover:rotate-90 hover:bg-coral hover:text-white lg:-top-4 lg:-right-3 dark:ring-white/10"
        >
          <Close />
        </button>

        <div className="grid grid-cols-2 gap-x-3 gap-y-2 lg:grid-cols-[1fr_1fr_1fr_1fr_auto] lg:items-center lg:gap-6">
          {/* Check-in */}
          <Field label={t.checkIn} icon={<Calendar />} value={formatDate(checkIn, locale)} onClick={() => openPicker(inRef)}>
            <input
              ref={inRef}
              type="date"
              value={checkIn}
              min={iso(new Date())}
              onChange={(e) => onCheckIn(e.target.value)}
              className="pointer-events-none absolute bottom-0 left-0 h-0 w-full opacity-0"
              tabIndex={-1}
              aria-label={t.checkIn}
            />
          </Field>

          {/* Check-out */}
          <Field
            label={t.checkOut}
            hint={nights > 0 ? t.nights(nights) : undefined}
            icon={<Pin />}
            value={formatDate(checkOut, locale)}
            onClick={() => openPicker(outRef)}
          >
            <input
              ref={outRef}
              type="date"
              value={checkOut}
              min={checkIn ? addDays(checkIn, 1) : undefined}
              onChange={(e) => e.target.value && setCheckOut(e.target.value)}
              className="pointer-events-none absolute bottom-0 left-0 h-0 w-full opacity-0"
              tabIndex={-1}
              aria-label={t.checkOut}
            />
          </Field>

          {/* Room */}
          <Field
            label={t.room}
            icon={<Bed />}
            value={room ? t.rooms[room] : t.addRoom}
            placeholder={!room}
            open={pop === "room"}
            onClick={() => setPop(pop === "room" ? null : "room")}
          >
            {pop === "room" && (
              <Popover>
                {(["ger", "house"] as Room[]).map((r) => (
                  <button
                    key={r}
                    onClick={() => {
                      setRoom(r);
                      setPop(null);
                    }}
                    className={`group flex w-full items-center gap-3 rounded-2xl p-2 text-left transition hover:bg-alt ${room === r ? "bg-alt ring-2 ring-gold" : ""}`}
                  >
                    <Image
                      src={r === "ger" ? "/assets/img/p04.jpg" : "/assets/img/p20.jpg"}
                      alt=""
                      width={64}
                      height={64}
                      className="size-14 rounded-xl object-cover transition duration-500 group-hover:scale-105"
                    />
                    <span className="font-semibold">{t.rooms[r]}</span>
                  </button>
                ))}
              </Popover>
            )}
          </Field>

          {/* Guests */}
          <Field
            label={t.guest}
            icon={<Users />}
            value={adults + children ? t.guestsSummary(adults, children) : t.addGuest}
            placeholder={!(adults + children)}
            open={pop === "guest"}
            onClick={() => {
              if (pop !== "guest" && adults === 0) setAdults(2);
              setPop(pop === "guest" ? null : "guest");
            }}
          >
            {pop === "guest" && (
              <Popover align="right">
                <Stepper label={t.adults} hint={t.adultsHint} value={adults} min={1} onChange={setAdults} />
                <Stepper label={t.children} hint={t.childrenHint} value={children} min={0} onChange={setChildren} />
                <button onClick={() => setPop(null)} className="btn btn-green mt-2 w-full !py-2.5">
                  {t.done}
                </button>
              </Popover>
            )}
          </Field>

          <button
            onClick={reserve}
            className="btn col-span-2 mt-2 bg-coral !px-9 !py-4 text-lg text-white hover:bg-coral-dark lg:col-span-1 lg:mt-0"
          >
            <span>{t.reserve}</span>
            <Arrow className="arr" />
          </button>
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  hint,
  icon,
  value,
  placeholder,
  open,
  onClick,
  children,
}: {
  label: string;
  hint?: string;
  icon: ReactNode;
  value: string;
  placeholder?: boolean;
  open?: boolean;
  onClick: () => void;
  children?: ReactNode;
}) {
  return (
    <div className="relative rounded-2xl p-2 transition-colors hover:bg-alt lg:rounded-none lg:p-0 lg:hover:bg-transparent">
      <div className="mb-2 flex items-baseline justify-between gap-2 lg:mb-3">
        <span className="text-base font-medium lg:text-[1.35rem]">{label}</span>
        {hint && <span className="text-xs font-semibold text-wood dark:text-gold">{hint}</span>}
      </div>
      <button type="button" onClick={onClick} aria-expanded={open} className="group flex w-full items-center gap-3 text-left">
        <span className="hidden text-fg/80 transition group-hover:text-wood sm:inline dark:group-hover:text-gold [&_svg]:size-5 lg:[&_svg]:size-7">{icon}</span>
        <span className={`min-w-0 flex-1 truncate text-sm sm:text-base lg:text-[1.2rem] ${placeholder ? "text-muted" : ""}`}>{value}</span>
        <span
          className={`grid size-7 flex-none place-items-center rounded-full bg-[#cfcfcf] text-white transition duration-300 group-hover:bg-gold lg:size-10 dark:bg-line ${
            open ? "rotate-180 bg-gold" : ""
          }`}
        >
          <ChevronDown className="size-4 lg:size-5" />
        </span>
      </button>
      {children}
    </div>
  );
}

function Popover({ children, align = "left" }: { children: ReactNode; align?: "left" | "right" }) {
  return (
    <div
      className={`absolute top-full z-30 mt-3 w-72 max-w-[85vw] animate-pop rounded-3xl bg-surface p-3 text-fg shadow-lift ring-1 ring-black/5 dark:ring-white/10 ${
        align === "right" ? "right-0" : "left-0"
      }`}
    >
      {children}
    </div>
  );
}

function Stepper({ label, hint, value, min, onChange }: { label: string; hint: string; value: number; min: number; onChange: (n: number) => void }) {
  const btn =
    "grid size-9 place-items-center rounded-full border border-line transition hover:border-gold hover:bg-gold hover:text-forest-900 disabled:pointer-events-none disabled:opacity-35";
  return (
    <div className="flex items-center justify-between gap-3 border-b border-line px-2 py-3 last-of-type:border-0">
      <div>
        <div className="font-semibold">{label}</div>
        <div className="text-xs text-muted">{hint}</div>
      </div>
      <div className="flex items-center gap-3">
        <button className={btn} onClick={() => onChange(value - 1)} disabled={value <= min} aria-label={`${label} −`}>
          <Minus className="size-4" />
        </button>
        <span className="w-5 text-center font-bold tabular-nums">{value}</span>
        <button className={btn} onClick={() => onChange(value + 1)} disabled={value >= 20} aria-label={`${label} +`}>
          <Plus className="size-4" />
        </button>
      </div>
    </div>
  );
}
