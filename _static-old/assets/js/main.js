/* Suld Resort — shared header, footer and interactions */
(function () {
  const PHONE = "85750235";
  const PHONE2 = "86110235";
  const EMAIL = "suldresort@gmail.com";
  const FB = "https://www.facebook.com/suldresort";

  const icons = {
    phone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z"/></svg>',
    mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 6L2 7"/></svg>',
    pin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="3"/></svg>',
    fb: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M14 8V6c0-.9.6-1 1-1h3V1h-4c-3.3 0-4 2.4-4 4v3H7v4h3v11h4V12h3.4l.6-4z"/></svg>',
    ig: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg>',
    clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>',
    arrow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
    menu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M3 6h18M3 12h18M3 18h18"/></svg>',
    close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg>',
  };
  window.SULD_ICONS = icons;

  const page = document.body.dataset.page || "home";
  const links = [
    ["home", "index.html", "Нүүр"],
    ["about", "about.html", "Бидний тухай"],
    ["accommodation", "accommodation.html", "Байр"],
    ["location", "location.html", "Байршил"],
    ["contact", "contact.html", "Холбоо барих"],
  ];

  /* ---------- Header ---------- */
  const header = document.createElement("header");
  header.className = "site-header" + (document.body.dataset.header === "static" ? " is-static" : "");
  header.innerHTML = `
    <div class="container nav">
      <a class="brand" href="index.html" aria-label="Сүлд Ресорт — нүүр">
        <img src="assets/img/logo.jpg" alt="Сүлд Ресорт лого">
        <span><b>Suld Resort</b><small>Terelj</small></span>
      </a>
      <button class="menu-btn" aria-label="Цэс" aria-expanded="false">${icons.menu}</button>
      <ul class="nav-links">
        ${links.map(([k, href, label]) => `<li><a href="${href}" class="${k === page ? "active" : ""}">${label}</a></li>`).join("")}
        <li><a class="nav-cta" href="tel:${PHONE}">Захиалах</a></li>
      </ul>
    </div>`;
  document.body.prepend(header);

  const menuBtn = header.querySelector(".menu-btn");
  const nav = header.querySelector(".nav-links");
  menuBtn.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    menuBtn.innerHTML = open ? icons.close : icons.menu;
    menuBtn.setAttribute("aria-expanded", open);
  });

  const onScroll = () => header.classList.toggle("is-solid", window.scrollY > 40);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---------- Footer ---------- */
  const footer = document.createElement("footer");
  footer.className = "site-footer";
  footer.innerHTML = `
    <div class="container">
      <div class="footer-grid">
        <div>
          <a class="brand" href="index.html">
            <img src="assets/img/logo.jpg" alt="">
            <span><b>Suld Resort</b><small>Terelj</small></span>
          </a>
          <p>Горхи-Тэрэлжийн үзэсгэлэнт байгалийн дунд орших амралтын газар. Гэр бүл, найз нөхөд, хамт олонтойгоо мартагдашгүй дурсамж бүтээгээрэй.</p>
          <div class="socials">
            <a href="${FB}" target="_blank" rel="noopener" aria-label="Facebook">${icons.fb}</a>
            <a href="tel:${PHONE}" aria-label="Утас">${icons.phone}</a>
            <a href="mailto:${EMAIL}" aria-label="И-мэйл">${icons.mail}</a>
          </div>
        </div>
        <div>
          <h4>Цэс</h4>
          <ul>${links.map(([, href, label]) => `<li><a href="${href}">${label}</a></li>`).join("")}</ul>
        </div>
        <div>
          <h4>Байр</h4>
          <ul>
            <li><a href="accommodation.html#ger">Хэсэгт цомцог гэр</a></li>
            <li><a href="accommodation.html#house">Мини хаус</a></li>
            <li><a href="index.html#gallery">Зургийн цомог</a></li>
            <li><a href="index.html#videos">Видео</a></li>
          </ul>
        </div>
        <div>
          <h4>Холбоо барих</h4>
          <ul>
            <li class="fi">${icons.phone}<a href="tel:${PHONE}">8575 0235</a></li>
            <li class="fi">${icons.phone}<a href="tel:${PHONE2}">8611 0235</a></li>
            <li class="fi">${icons.mail}<a href="mailto:${EMAIL}">${EMAIL}</a></li>
            <li class="fi">${icons.pin}<span>Налайх дүүргийн 6-р хороо, Горхи-Тэрэлжийн байгалийн цогцолборт газар</span></li>
            <li class="fi">${icons.clock}<span>24/7 нээлттэй</span></li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        <span>© ${new Date().getFullYear()} Сүлд Ресорт · Suld Resort Terelj</span>
        <span>Бүх эрх хуулиар хамгаалагдсан</span>
      </div>
    </div>`;
  document.body.append(footer);

  /* ---------- Floating call ---------- */
  const fab = document.createElement("a");
  fab.className = "fab-call";
  fab.href = "tel:" + PHONE;
  fab.setAttribute("aria-label", "Залгах 8575 0235");
  fab.innerHTML = icons.phone;
  document.body.append(fab);

  /* ---------- Hero slideshow (with dots) ---------- */
  const slides = [...document.querySelectorAll(".hero-slides img")];
  const dotsWrap = document.querySelector(".hero-dots");
  if (slides.length) {
    let i = 0, timer;
    const dots = slides.map((_, n) => {
      if (!dotsWrap) return null;
      const d = document.createElement("button");
      d.setAttribute("aria-label", `Зураг ${n + 1}`);
      d.addEventListener("click", () => { go(n); restart(); });
      dotsWrap.append(d);
      return d;
    });
    const go = (n) => {
      slides[i].classList.remove("on"); dots[i]?.classList.remove("on");
      i = (n + slides.length) % slides.length;
      slides[i].classList.add("on"); dots[i]?.classList.add("on");
    };
    const restart = () => { clearInterval(timer); if (slides.length > 1) timer = setInterval(() => go(i + 1), 6000); };
    // preload the next images so slides never pop in blurry
    slides.slice(1).forEach((img) => { const pre = new Image(); pre.src = img.currentSrc || img.src; });
    go(0); restart();
  }

  /* ---------- Icons on buttons ---------- */
  document.querySelectorAll(".btn, .card-link").forEach((b) => {
    const t = b.textContent.trim();
    if (b.getAttribute("href")?.startsWith("tel:") && !b.querySelector("svg")) {
      b.innerHTML = icons.phone + "<span>" + t.replace(/^☎\s*/, "") + "</span>";
    } else if (t.endsWith("→")) {
      b.innerHTML = "<span>" + t.replace(/\s*→$/, "") + "</span>" + '<i class="arr">' + icons.arrow + "</i>";
    } else if (b.href?.includes("m.me")) {
      b.insertAdjacentHTML("afterbegin", '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.5 2 2 6.1 2 11.2c0 2.9 1.4 5.5 3.7 7.2V22l3.4-1.9c.9.3 1.9.4 2.9.4 5.5 0 10-4.1 10-9.2S17.5 2 12 2zm1 12.4-2.5-2.7-5 2.7 5.5-5.8 2.6 2.7 4.9-2.7-5.5 5.8z"/></svg>');
    }
  });

  /* ---------- Stagger children of grids ---------- */
  document.querySelectorAll(".features, .cards, .values, .events, .steps, .stats, .room-photos, .videos").forEach((g) =>
    [...g.children].forEach((c, n) => c.style.setProperty("--d", n * 110 + "ms"))
  );

  /* ---------- Count-up numbers ---------- */
  const countUp = (el) => {
    const end = parseFloat(el.dataset.count), suf = el.dataset.suffix || "", dec = String(end).includes(".") ? 1 : 0;
    const t0 = performance.now(), dur = 1400;
    const step = (t) => {
      const p = Math.min((t - t0) / dur, 1), e = 1 - Math.pow(1 - p, 3);
      el.textContent = (end * e).toFixed(dec) + suf;
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  /* ---------- Reveal on scroll ---------- */
  const io = "IntersectionObserver" in window
    ? new IntersectionObserver((entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); e.target.querySelectorAll("[data-count]").forEach(countUp); const tgt = e.target; setTimeout(() => tgt.style.setProperty("--d", "0ms"), 1800); io.unobserve(e.target); } }), { threshold: 0.12 })
    : null;
  document.querySelectorAll(".reveal").forEach((el) => (io ? io.observe(el) : el.classList.add("in")));

  /* ---------- Lightbox ---------- */
  const zoomables = [...document.querySelectorAll("[data-zoom]")];
  if (zoomables.length) {
    const lb = document.createElement("div");
    lb.className = "lightbox";
    lb.innerHTML = `<button class="lb-btn lb-close" aria-label="Хаах">×</button>
      <button class="lb-btn lb-prev" aria-label="Өмнөх">‹</button>
      <img alt="">
      <button class="lb-btn lb-next" aria-label="Дараах">›</button>`;
    document.body.append(lb);
    const img = lb.querySelector("img");
    let idx = 0;
    const show = (n) => {
      idx = (n + zoomables.length) % zoomables.length;
      const src = zoomables[idx].querySelector("img");
      img.src = src.src; img.alt = src.alt;
    };
    zoomables.forEach((b, n) => b.addEventListener("click", () => { show(n); lb.classList.add("open"); }));
    lb.querySelector(".lb-close").onclick = () => lb.classList.remove("open");
    lb.querySelector(".lb-prev").onclick = () => show(idx - 1);
    lb.querySelector(".lb-next").onclick = () => show(idx + 1);
    lb.addEventListener("click", (e) => { if (e.target === lb) lb.classList.remove("open"); });
    document.addEventListener("keydown", (e) => {
      if (!lb.classList.contains("open")) return;
      if (e.key === "Escape") lb.classList.remove("open");
      if (e.key === "ArrowLeft") show(idx - 1);
      if (e.key === "ArrowRight") show(idx + 1);
    });
  }

  /* ---------- Facebook reels: click to load ---------- */
  document.querySelectorAll(".video[data-reel]").forEach((v) => {
    v.addEventListener("click", () => {
      const href = encodeURIComponent(`https://www.facebook.com/reel/${v.dataset.reel}/`);
      v.innerHTML = `<iframe src="https://www.facebook.com/plugins/video.php?href=${href}&show_text=false&autoplay=true&width=320" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share" allowfullscreen title="Suld Resort видео"></iframe>`;
    }, { once: true });
  });

  /* ---------- Contact form → e-mail ---------- */
  const form = document.querySelector("#booking-form");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const d = Object.fromEntries(new FormData(form));
      const body = [
        `Нэр: ${d.name}`,
        `Утас: ${d.phone}`,
        `Байрны төрөл: ${d.room}`,
        `Ирэх өдөр: ${d.checkin || "-"}`,
        `Гарах өдөр: ${d.checkout || "-"}`,
        `Хүний тоо: ${d.guests || "-"}`,
        "",
        d.message || "",
      ].join("\n");
      window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent("Захиалгын хүсэлт — " + d.name)}&body=${encodeURIComponent(body)}`;
    });
  }
})();
