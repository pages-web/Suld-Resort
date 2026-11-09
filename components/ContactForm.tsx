"use client";

import { useSearchParams } from "next/navigation";
import { useState, type FormEvent } from "react";
import { CONTACT, getDict, type Locale } from "@/lib/i18n";
import { Arrow } from "./Icons";

export default function ContactForm({ locale }: { locale: Locale }) {
  const d = getDict(locale);
  const t = d.contact.form;
  const sp = useSearchParams();
  const roomParam = sp.get("room");
  const prefilled = !!(sp.get("checkin") || roomParam);
  const roomLabels = { ger: d.booking.rooms.ger, house: d.booking.rooms.house, group: t.groupOption };
  type RoomKey = keyof typeof roomLabels;
  const [room, setRoom] = useState<RoomKey>(roomParam === "house" || roomParam === "group" ? roomParam : "ger");

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>;
    const body = [
      `${t.name}: ${f.name}`,
      `${t.phone}: ${f.phone}`,
      `${t.roomType}: ${roomLabels[f.room as RoomKey] ?? f.room}`,
      `${t.checkin}: ${f.checkin || "-"}`,
      `${t.checkout}: ${f.checkout || "-"}`,
      `${t.adults}: ${f.adults || "-"}`,
      `${t.children}: ${f.children || "0"}`,
      "",
      f.message || "",
    ].join("\n");
    window.location.href = `mailto:${CONTACT.email}?subject=${encodeURIComponent(`${t.subject} — ${f.name}`)}&body=${encodeURIComponent(body)}`;
  };

  const input =
    "w-full rounded-xl border-[1.5px] border-line bg-bg px-4 py-3 text-fg transition outline-none focus:border-forest-500 focus:ring-4 focus:ring-forest-500/15 dark:focus:border-gold dark:focus:ring-gold/15";
  const label = "text-sm font-bold text-forest-800 dark:text-gold-soft";

  return (
    <form id="booking-form" onSubmit={onSubmit} className="scroll-mt-28 rounded-3xl border border-line bg-surface p-[clamp(22px,4vw,40px)] shadow-card transition focus-within:shadow-lift">
      <h3 className="mb-2 text-3xl">{t.title}</h3>
      {prefilled ? (
        <p className="mb-5 rounded-xl bg-gold/15 px-4 py-3 text-sm font-semibold text-wood dark:text-gold">{t.prefilled}</p>
      ) : (
        <p className="mb-5 text-sm text-muted">{t.note}</p>
      )}
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-1.5"><span className={label}>{t.name}</span><input name="name" required autoComplete="name" className={input} /></label>
        <label className="grid gap-1.5"><span className={label}>{t.phone}</span><input name="phone" type="tel" required autoComplete="tel" className={input} /></label>
        <label className="grid gap-1.5 sm:col-span-2">
          <span className={label}>{t.roomType}</span>
          <select name="room" value={room} onChange={(e) => setRoom(e.target.value as RoomKey)} className={input}>
            {(Object.keys(roomLabels) as RoomKey[]).map((k) => (
              <option key={k} value={k}>{roomLabels[k]}</option>
            ))}
          </select>
        </label>
        <label className="grid gap-1.5"><span className={label}>{t.checkin}</span><input name="checkin" type="date" defaultValue={sp.get("checkin") ?? ""} className={input} /></label>
        <label className="grid gap-1.5"><span className={label}>{t.checkout}</span><input name="checkout" type="date" defaultValue={sp.get("checkout") ?? ""} className={input} /></label>
        <label className="grid gap-1.5"><span className={label}>{t.adults}</span><input name="adults" type="number" min={1} defaultValue={sp.get("adults") ?? "2"} className={input} /></label>
        <label className="grid gap-1.5"><span className={label}>{t.children}</span><input name="children" type="number" min={0} defaultValue={sp.get("children") ?? "0"} className={input} /></label>
        <label className="grid gap-1.5 sm:col-span-2"><span className={label}>{t.message}</span><textarea name="message" rows={4} placeholder={t.placeholder} className={input} /></label>
      </div>
      <button type="submit" className="btn btn-green mt-5 w-full">
        <span>{t.submit}</span>
        <Arrow className="arr" />
      </button>
    </form>
  );
}
