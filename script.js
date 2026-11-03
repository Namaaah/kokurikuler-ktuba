/* ============================================================
   KTUBA — script.js
   Vanilla JS, tanpa dependensi.
   Modul: pemesanan WhatsApp, drawer, konfigurator,
   filter katalog, marquee, counter, scroll-reveal.
   ============================================================ */

(function () {
  "use strict";

  /* ── helper ─────────────────────────────────────────────── */
  const qs = (s, c = document) => c.querySelector(s);
  const qsa = (s, c = document) => Array.from(c.querySelectorAll(s));
  const rp = (n) => "Rp " + Math.round(n || 0).toLocaleString("id-ID");
  const HEX = /^#[0-9a-f]{6}$/i;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const D = () => (typeof PRODUK !== "undefined" ? PRODUK : []);
  const W = () => (typeof WARNA !== "undefined" ? WARNA : {});
  const K = () => (typeof KONTAK !== "undefined" ? KONTAK : { wa: "6281234567890", email: "halo@ktuba.id" });

  /* Observer reveal — dibuat sekali, malas, supaya bisa dipanggil
     dari modul mana pun tanpa urutan inisialisasi. */
  let ioReveal = null;
  function observeReveals() {
    if (!ioReveal) {
      ioReveal = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (!e.isIntersecting) return;
            e.target.classList.add("is-in");
            ioReveal.unobserve(e.target);
          });
        },
        { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
      );
    }
    qsa(".reveal:not(.is-in)").forEach((el) => ioReveal.observe(el));
  }


  /* ══════════════════════ 1. HARGA ══════════════════════ */
  function hitungSatuan(p, opsiIdx) {
    let satuan = p.mulai;
    (p.opsi || []).forEach((g, i) => {
      const j = opsiIdx[i] === undefined ? 0 : opsiIdx[i];
      if (g.pilihan && g.pilihan[j]) satuan += g.pilihan[j].d || 0;
    });
    return satuan;
  }

  function hitungTotal(p, opsiIdx, qty) {
    const satuan = hitungSatuan(p, opsiIdx);
    let pot = 0;
    (p.diskon || []).forEach((d) => {
      if (qty >= d.min) pot = Math.max(pot, d.potong);
    });
    const raw = satuan * qty * (1 - pot);
    return Math.round(raw / 100) * 100;
  }

  function diskonAktif(p, qty) {
    let best = null;
    (p.diskon || []).forEach((d) => {
      if (qty >= d.min && (!best || d.potong > best.potong)) best = d;
    });
    return best;
  }

  function diskonBerikut(p, qty) {
    return (p.diskon || [])
      .filter((d) => d.min > qty)
      .sort((a, b) => a.min - b.min)[0] || null;
  }

  function labelVarian(p, opsiIdx, toneKey, ukuran) {
    const out = [];
    const w = W()[toneKey];
    if (w) out.push(w.nama);
    else if (HEX.test(toneKey || "")) out.push("Custom " + toneKey.toUpperCase());
    if (ukuran) out.push("Ukuran " + ukuran);
    (p.opsi || []).forEach((g, i) => {
      const j = opsiIdx[i] === undefined ? 0 : opsiIdx[i];
      if (g.pilihan && g.pilihan[j]) out.push(g.pilihan[j].t);
    });
    return out;
  }

  /* ══════════════════════ 2. PESAN PESANAN ══════════════════════ */
  /* Rangkaian teks yang dikirim ke WhatsApp. Satu pesanan, satu pesan. */
  function pesanPesanan(p, opsiIdx, toneKey, ukuran, qty) {
    const baris = [
      `Halo KTUBA, saya mau pesan ${p.nama}.`,
      "",
      `Jumlah: ${qty} ${p.unit}`,
    ];

    const varian = labelVarian(p, opsiIdx, toneKey, ukuran);
    if (varian.length) baris.push(`Spesifikasi: ${varian.join(" · ")}`);

    baris.push(`Estimasi harga: ${rp(hitungTotal(p, opsiIdx, qty))}`);
    baris.push("", "Mohon konfirmasi total akhir dan waktu pengerjaannya. Terima kasih.");

    return baris.join("\n");
  }

  function bukaWhatsApp(teks) {
    window.open(waHref(teks), "_blank", "noopener");
  }

  /* ══════════════════════ 3. ILUSTRASI ══════════════════════ */
  const MOCK_INNER = {
    mug: '<span class="p p--handle"></span><span class="p p--print">KTUBA</span>',
    kaos: '<span class="p p--body"></span><span class="p p--collar"></span><span class="p p--print">K</span>',
    tote: '<span class="p p--handle p--handle--l"></span><span class="p p--handle p--handle--r"></span><span class="p p--print">KT</span>',
    pin: '<span class="p p--print">K</span>',
    gantungan: '<span class="p p--ring"></span><span class="p p--print">KTUBA</span>',
    dokumen:
      '<span class="p p--sheet p--sheet--b"></span><span class="p p--sheet p--sheet--c"></span><span class="p p--sheet"></span><span class="p p--lines"></span><span class="p p--block"></span>',
    spanduk:
      '<span class="p p--eye p--eye--1"></span><span class="p p--eye p--eye--2"></span><span class="p p--eye p--eye--3"></span><span class="p p--eye p--eye--4"></span><span class="p p--print">KTUBA</span>',
    desain: '<span class="p p--a"></span><span class="p p--b"></span><span class="p p--c"></span><span class="p p--d"></span>',
  };

  function mockMarkup(mockId, tone, print) {
    const inner = MOCK_INNER[mockId] || MOCK_INNER.pin;
    return `<div class="mock" style="--tone:${tone};--print:${print}"><div class="scene"><div class="obj obj--${mockId}">${inner}</div></div></div>`;
  }

  /* Warna bisa berupa kunci di WARNA atau kode hex langsung (warna custom). */

  /* Warna tinta cetak yang tetap terbaca di atas warna apa pun:
     latar terang → vermillion, latar gelap → kertas. */
  function cetakDi(hex) {
    const n = parseInt(hex.slice(1), 16);
    const r = (n >> 16) & 255;
    const g = (n >> 8) & 255;
    const b = n & 255;
    const luma = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
    return luma > 0.56 ? "#FF4A1C" : "#FBF8F2";
  }

  function toneOf(key) {
    const w = W()[key];
    if (w) return { tone: w.hex, print: w.print };
    if (HEX.test(key || "")) return { tone: key, print: cetakDi(key) };
    const d = W().putih || { hex: "#FCFBF7", print: "#FF4A1C" };
    return { tone: d.hex, print: d.print };
  }

  /* Swatch preset + tombol custom. Dipakai drawer produk & konfigurator. */
  function swatchMarkup(keys, aktif) {
    const custom = HEX.test(aktif || "");
    const preset = keys
      .filter((k) => W()[k])
      .map(
        (k) =>
          `<button type="button" class="swatch${k === aktif ? " is-active" : ""}" style="--sw:${W()[k].hex}" data-tone="${k}" aria-label="Warna ${W()[k].nama}" title="${W()[k].nama}"></button>`
      )
      .join("");

    const nilai = W()[aktif] ? W()[aktif].hex : custom ? aktif : "#4A7AB8";
    const labelCustom = custom
      ? "Ubah warna custom " + aktif.toUpperCase()
      : "Pilih warna sendiri";

    return (
      preset +
      `<span class="swatch-custom-wrap"><button type="button" class="swatch swatch--custom${custom ? " is-active" : ""}" style="--sw:${custom ? aktif : "#FF4A1C"}" data-custom-color aria-label="${labelCustom}" title="${labelCustom}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M12 3.25a8.75 8.75 0 1 0 0 17.5h1.12a2.1 2.1 0 0 0 1.46-3.61 1.1 1.1 0 0 1 .78-1.89h1.16A4.23 4.23 0 0 0 20.75 11C20.75 6.72 16.83 3.25 12 3.25Z"></path><circle cx="7.5" cy="11" r="1" fill="#FF4A1C" stroke="none"></circle><circle cx="10.5" cy="7.5" r="1" fill="#D8F26A" stroke="none"></circle><circle cx="15" cy="7.8" r="1" fill="#6B6560" stroke="none"></circle><circle cx="16.5" cy="12" r="1" fill="#E2DCCF" stroke="none"></circle><circle cx="14.6" cy="16.1" r="1.25" fill="var(--sw)" stroke="none"></circle></svg></button><input class="swatch-custom-input" type="color" value="${nilai}" tabindex="-1" aria-hidden="true"></span>`
    );
  }

  function openCustomColorPicker(button) {
    const input = button.nextElementSibling;
    if (!(input instanceof HTMLInputElement) || input.type !== "color") {
      throw new Error("Input warna custom tidak ditemukan.");
    }
    input.click();
  }

  /* ══════════════════════ 4. HEADER & KONTAK ══════════════════════ */
  const hdr = qs("#hdr");
  const burger = qs("#burger");
  const mobileNav = qs("#mobileNav");

  /* Sembunyi saat menurun, muncul saat menaik. Ambang 8px mencegah
     header berkedip karena scroll inersia di layar sentuh. */
  let lastY = window.scrollY;
  let bebasSampai = 0; // jendela tenang setelah lompat ke anchor

  function setHidden(on) {
    hdr.classList.toggle("is-hidden", on);
    document.body.classList.toggle("hdr-hidden", on);
  }

  function onScroll() {
    if (!hdr) return;
    const y = window.scrollY;
    const delta = y - lastY;

    hdr.classList.toggle("is-stuck", y > 16);

    if (Date.now() < bebasSampai) {
      lastY = y;
      return;
    }

    if (delta > 8 && y > 140) setHidden(true);
    else if (delta < -8 || y <= 140) setHidden(false);

    lastY = y;
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // lompat ke bagian lewat menu: header tidak ikut menyelinap saat meluncur
  qsa('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", () => {
      bebasSampai = Date.now() + 800;
      if (hdr) setHidden(false);
    });
  });

  // keyboard: kalau fokus masuk ke header, header wajib kelihatan
  if (hdr)
    hdr.addEventListener("focusin", () => {
      bebasSampai = Date.now() + 400;
      setHidden(false);
    });

  function closeMobileNav() {
    if (!burger || !mobileNav) return;
    burger.setAttribute("aria-expanded", "false");
    mobileNav.classList.remove("is-open");
    document.body.classList.remove("is-locked");
    setTimeout(() => {
      if (burger.getAttribute("aria-expanded") === "false") mobileNav.hidden = true;
    }, 240);
  }

  if (burger && mobileNav) {
    burger.addEventListener("click", () => {
      const isOpen = burger.getAttribute("aria-expanded") === "true";
      burger.setAttribute("aria-expanded", String(!isOpen));
      if (isOpen) {
        closeMobileNav();
      } else {
        mobileNav.hidden = false;
        document.body.classList.add("is-locked");
        requestAnimationFrame(() => {
          if (burger.getAttribute("aria-expanded") !== "true") return;
          mobileNav.classList.add("is-open");
        });
      }
    });
    qsa("a", mobileNav).forEach((a) => a.addEventListener("click", closeMobileNav));
  }

  // Isi data kontak ke seluruh halaman
  qsa("[data-kontak]").forEach((el) => {
    const val = K()[el.dataset.kontak];
    if (val) el.textContent = val;
  });
  qsa("[data-sejak]").forEach((el) => (el.textContent = K().sejak || "2019"));

  const waHref = (text) =>
    `https://wa.me/${K().wa}?text=${encodeURIComponent(text)}`;

  qsa("[data-wa-link]").forEach((a) => {
    a.href = waHref("Halo KTUBA, saya mau tanya soal layanan cetak dan desain.");
    a.target = "_blank";
    a.rel = "noopener";
  });
  qsa("[data-email-link]").forEach((a) => {
    a.href = `mailto:${K().email}?subject=${encodeURIComponent("Tanya layanan KTUBA")}`;
  });

  const elTahun = qs("#tahun");
  if (elTahun) elTahun.textContent = new Date().getFullYear();

  const elNavKontak = qs("#mobileNavKontak");
  if (elNavKontak) elNavKontak.textContent = `${K().tampil} · ${K().jam}`;

  /* ══════════════════════ 5. TICKER ══════════════════════ */
  const tickerTrack = qs("#tickerTrack");
  if (tickerTrack) {
    const nama = D().map((p) => p.nama.toUpperCase());
    const set = [...nama, ...nama];
    tickerTrack.innerHTML = set
      .map((n) => `<span class="ticker-item"><span>${n}</span><i>✦</i></span>`)
      .join("");
  }

  /* ══════════════════════ 6. STATS ══════════════════════ */
  const statsList = qs("#statsList");
  if (statsList && typeof STATS !== "undefined") {
    statsList.innerHTML = STATS.map(
      (s) =>
        `<li><strong><span class="count" data-target="${s.angka}">0</span>${s.suffix}</strong><p>${s.label}</p></li>`
    ).join("");

    const ioNum = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          const el = e.target;
          const target = parseInt(el.dataset.target, 10);
          if (reduce) {
            el.textContent = target.toLocaleString("id-ID");
          } else {
            const t0 = performance.now();
            const dur = 1100;
            const step = (t) => {
              const prog = Math.min((t - t0) / dur, 1);
              const eased = 1 - Math.pow(1 - prog, 3);
              el.textContent = Math.floor(target * eased).toLocaleString("id-ID");
              if (prog < 1) requestAnimationFrame(step);
            };
            requestAnimationFrame(step);
          }
          ioNum.unobserve(el);
        });
      },
      { threshold: 0.4 }
    );
    qsa(".count", statsList).forEach((c) => ioNum.observe(c));
  }

  /* ══════════════════════ 7. KOLASE HERO ══════════════════════ */
  (function collage() {
    const slots = { collageA: 0, collageB: 1, collageC: 2 };
    const p = D();
    Object.entries(slots).forEach(([id, idx]) => {
      const host = qs("#" + id);
      const prod = p[idx];
      if (!host || !prod) return;
      const key = prod.warna ? prod.warna[0] : "putih";
      const t = toneOf(key);
      host.innerHTML = mockMarkup(prod.mock, t.tone, t.print);
    });

    const col = qs("#collage");
    if (!col || reduce || !window.matchMedia("(min-width: 901px)").matches) return;

    const cards = qsa(".float-card", col);
    const base = cards.map((c) => (c.classList.contains("float-card--a") ? -6 : c.classList.contains("float-card--b") ? 4 : -2));

    col.addEventListener("mousemove", (e) => {
      col.classList.add("is-moving");
      const r = col.getBoundingClientRect();
      const dx = (e.clientX - r.left - r.width / 2) / r.width;
      const dy = (e.clientY - r.top - r.height / 2) / r.height;
      cards.forEach((c, i) => {
        const d = parseFloat(c.dataset.depth || "10");
        c.style.transform = `translate(${(dx * d).toFixed(2)}px, ${(dy * d).toFixed(2)}px) rotate(${base[i]}deg)`;
      });
    });

    col.addEventListener("mouseleave", () => {
      col.classList.remove("is-moving");
      cards.forEach((c, i) => (c.style.transform = `rotate(${base[i]}deg)`));
    });
  })();

  /* ══════════════════════ 8. KATALOG ══════════════════════ */
  const filterBar = qs("#filterBar");
  const catalogGrid = qs("#catalogGrid");
  let activeCat = "semua";

  const LABEL_KAT = { merch: "Merchandise", cetak: "Cetak", desain: "Desain" };

  function renderCatalog() {
    if (!catalogGrid) return;
    const list = D().filter((p) => activeCat === "semua" || p.kategori === activeCat);

    catalogGrid.innerHTML = list
      .map((p, i) => {
        const key = (p.warna && p.warna[0]) || "putih";
        const t = toneOf(key);
        return `
        <article class="card reveal" style="--d:${i * 55}ms">
          <button class="card-hit" type="button" data-open="${p.id}" aria-label="Lihat detail ${p.nama}">
            <div class="media">
              ${mockMarkup(p.mock, t.tone, t.print)}
              <!-- FOTO PRODUK: hapus .mock di atas, ganti dengan baris berikut
              <img src="assets/produk/${p.id}.jpg" alt="${p.nama} custom KTUBA">
              -->
            </div>
          </button>
          <div class="card-body">
            <div class="card-top">
              <span class="card-cat">${LABEL_KAT[p.kategori] || ""}</span>
              ${p.tag ? `<span class="card-tag">${p.tag}</span>` : ""}
            </div>
            <h3 class="card-title">${p.nama}</h3>
            <p class="card-desc">${p.ringkas}</p>
            <div class="card-foot">
              <div class="card-price">
                <small>Mulai</small>
                <span>${rp(p.mulai)} <em>/ ${p.unit}</em></span>
              </div>
              <button class="card-add" type="button" data-open="${p.id}" aria-label="Pesan ${p.nama}">+</button>
            </div>
          </div>
        </article>`;
      })
      .join("");

    observeReveals();
  }

  if (filterBar && typeof KATEGORI !== "undefined") {
    filterBar.innerHTML = KATEGORI.map((k, i) => {
      const n = D().filter((p) => k.id === "semua" || p.kategori === k.id).length;
      return `<button class="filter-btn${i === 0 ? " is-active" : ""}" type="button" role="tab"
        aria-selected="${i === 0}" data-cat="${k.id}">${k.label} <span>${n}</span></button>`;
    }).join("");

    filterBar.addEventListener("click", (e) => {
      const btn = e.target.closest(".filter-btn");
      if (!btn) return;
      activeCat = btn.dataset.cat;
      qsa(".filter-btn", filterBar).forEach((b) => {
        const on = b === btn;
        b.classList.toggle("is-active", on);
        b.setAttribute("aria-selected", String(on));
      });
      renderCatalog();
    });
  }

  // Satu delegasi global untuk membuka drawer produk
  document.addEventListener("click", (e) => {
    const trigger = e.target.closest("[data-open]");
    if (trigger) {
      e.preventDefault();
      openDrawer(trigger.dataset.open);
    }
  });

  renderCatalog();

  /* ══════════════════════ 9. DRAWER ══════════════════════ */
  const scrim = qs("#scrim");
  const drawer = qs("#drawer");
  let lastFocus = null;
  let openPanel = null;

  function trapFocus(e) {
    if (e.key !== "Tab" || !openPanel) return;
    const f = qsa(
      'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])',
      openPanel
    ).filter((el) => el.offsetParent !== null);
    if (!f.length) return;
    const first = f[0];
    const last = f[f.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }

  function openPanelFn(el, focusEl) {
    if (!el) return;
    if (openPanel && openPanel !== el) closePanelFn(openPanel, true);
    lastFocus = document.activeElement;
    openPanel = el;
    el.hidden = false;
    document.body.classList.add("is-locked");

    if (scrim) {
      scrim.hidden = false;
      scrim.classList.add("is-open");
    }

    // paksa flush gaya supaya transisi benar-benar berjalan
    void el.offsetHeight;
    void (scrim && scrim.offsetHeight);

    el.classList.add("is-open");
    if (focusEl) focusEl.focus();

    document.removeEventListener("keydown", trapFocus);
    document.addEventListener("keydown", trapFocus);
  }

  function closePanelFn(el, silent) {
    if (!el) return;
    el.classList.remove("is-open");
    if (openPanel === el) openPanel = null;
    document.removeEventListener("keydown", trapFocus);

    if (!openPanel) {
      document.body.classList.remove("is-locked");
      if (scrim) scrim.classList.remove("is-open");
    }

    setTimeout(() => {
      if (el.classList.contains("is-open")) return;
      el.hidden = true;
      if (scrim && !qs(".drawer.is-open")) scrim.hidden = true;
    }, 340);

    if (!silent && lastFocus && lastFocus.focus) lastFocus.focus();
  }

  function onEsc(e) {
    if (e.key !== "Escape") return;
    if (mobileNav && burger && burger.getAttribute("aria-expanded") === "true") {
      closeMobileNav();
      return;
    }
    if (openPanel) closePanelFn(openPanel);
  }
  document.addEventListener("keydown", onEsc);

  if (scrim) {
    scrim.addEventListener("click", () => {
      if (openPanel) closePanelFn(openPanel);
    });
  }

  // — state drawer produk —
  const drawerEls = {
    media: qs("#drawerMedia"),
    title: qs("#drawerTitle"),
    desc: qs("#drawerDesc"),
    from: qs("#drawerFrom"),
    unit: qs("#drawerUnit"),
    kicker: qs("#drawerKicker"),
    warna: qs("#drawerWarna"),
    opsi: qs("#drawerOpsi"),
    ukuranField: qs("#drawerUkuranField"),
    ukuran: qs("#drawerUkuran"),
    qty: qs("#drawerQty"),
    qtyInput: qs("#drawerQtyInput"),
    disc: qs("#drawerDisc"),
    total: qs("#drawerTotal"),
    order: qs("#drawerOrder"),
    close: qs("#drawerClose"),
  };

  let st = null; // { p, toneKey, opsi, ukuran, qty }

  function clampQty(v) {
    const min = (st && st.p.moq) || 1;
    const n = Math.max(min, Math.floor(Number(v) || min));
    return n;
  }

  function paintDrawer() {
    if (!st) return;
    const { p } = st;
    const t = toneOf(st.toneKey);
    drawerEls.media.innerHTML = mockMarkup(p.mock, t.tone, t.print);
    drawerEls.total.textContent = rp(hitungTotal(p, st.opsi, st.qty));

    const dis = diskonAktif(p, st.qty);
    const next = diskonBerikut(p, st.qty);
    if (dis) {
      drawerEls.disc.textContent = `Diskon ${Math.round(dis.potong * 100)}% aktif untuk ${st.qty} ${p.unit}.`;
    } else if (next) {
      drawerEls.disc.textContent = `Tambah ${next.min - st.qty} ${p.unit} lagi → diskon ${Math.round(next.potong * 100)}%.`;
    } else {
      drawerEls.disc.textContent = "";
    }
  }

  function openDrawer(id) {
    const p = D().find((x) => x.id === id);
    if (!p || !drawer) return;

    st = {
      p,
      toneKey: (p.warna && p.warna[0]) || "putih",
      opsi: (p.opsi || []).map(() => 0),
      ukuran: p.ukuran ? p.ukuran[0] : null,
      qty: p.moq || 1,
    };

    drawerEls.title.textContent = p.nama;
    drawerEls.desc.textContent = p.ringkas;
    drawerEls.from.textContent = rp(p.mulai);
    drawerEls.unit.textContent = "/ " + p.unit;
    drawerEls.kicker.textContent = LABEL_KAT[p.kategori] || "Detail produk";
    drawerEls.qtyInput.value = st.qty;

    // warna
    drawerEls.warna.innerHTML = swatchMarkup(p.warna || [], st.toneKey);

    drawerEls.warna.onclick = (e) => {
      const b = e.target.closest("[data-tone]");
      if (b) {
        st.toneKey = b.dataset.tone;
        drawerEls.warna.innerHTML = swatchMarkup(p.warna || [], st.toneKey);
        paintDrawer();
        return;
      }

      const customButton = e.target.closest("[data-custom-color]");
      if (customButton) openCustomColorPicker(customButton);
    };

    // warna custom — input berjalan selama pemilih warna digeser
    drawerEls.warna.oninput = (e) => {
      const inp = e.target.closest('input[type="color"]');
      if (!inp) return;
      const button = inp.previousElementSibling;
      st.toneKey = inp.value;
      button.style.setProperty("--sw", inp.value);
      button.title = "Ubah warna custom " + inp.value.toUpperCase();
      button.setAttribute("aria-label", button.title);
      qsa(".swatch", drawerEls.warna).forEach((x) => x.classList.toggle("is-active", x === button));
      paintDrawer();
    };

    // opsi
    drawerEls.opsi.innerHTML = (p.opsi || [])
      .map(
        (g, gi) => `
        <div class="field field--dark">
          <span class="field-label">${g.nama}</span>
          <div class="chip-row" data-group="${gi}">
            ${(g.pilihan || [])
              .map(
                (o, oi) =>
                  `<button type="button" class="chip${oi === 0 ? " is-active" : ""}" data-oi="${oi}">${o.t}${
                    o.d > 0 ? `<em>+${rp(o.d)}</em>` : ""
                  }</button>`
              )
              .join("")}
          </div>
        </div>`
      )
      .join("");

    drawerEls.opsi.onclick = (e) => {
      const chip = e.target.closest(".chip");
      if (!chip) return;
      const row = chip.parentElement;
      const gi = Number(row.dataset.group);
      const oi = Number(chip.dataset.oi);
      st.opsi[gi] = oi;
      qsa(".chip", row).forEach((x) => x.classList.toggle("is-active", x === chip));
      paintDrawer();
    };

    // ukuran
    if (p.ukuran && p.ukuran.length) {
      drawerEls.ukuranField.hidden = false;
      drawerEls.ukuran.innerHTML = p.ukuran
        .map(
          (u, i) =>
            `<button type="button" class="chip${i === 0 ? " is-active" : ""}" data-uk="${u}">${u}</button>`
        )
        .join("");
      drawerEls.ukuran.onclick = (e) => {
        const chip = e.target.closest("[data-uk]");
        if (!chip) return;
        st.ukuran = chip.dataset.uk;
        qsa(".chip", drawerEls.ukuran).forEach((x) => x.classList.toggle("is-active", x === chip));
      };
    } else {
      drawerEls.ukuranField.hidden = true;
      drawerEls.ukuran.innerHTML = "";
    }

    // jumlah
    drawerEls.qty.onclick = (e) => {
      const b = e.target.closest("[data-step]");
      if (!b) return;
      st.qty = clampQty(st.qty + Number(b.dataset.step));
      drawerEls.qtyInput.value = st.qty;
      paintDrawer();
    };
    drawerEls.qtyInput.onchange = () => {
      st.qty = clampQty(drawerEls.qtyInput.value);
      drawerEls.qtyInput.value = st.qty;
      paintDrawer();
    };

    // pesan via WhatsApp
    drawerEls.order.onclick = () => {
      if (!st || !st.p) return;
      const teks = pesanPesanan(st.p, st.opsi, st.toneKey, st.ukuran, st.qty);
      bukaWhatsApp(teks);
    };

    paintDrawer();
    openPanelFn(drawer, drawerEls.close);
  }

  if (drawerEls.close) drawerEls.close.addEventListener("click", () => closePanelFn(drawer));

  /* ══════════════════════ 10. KONFIGURATOR ══════════════════════ */
  (function konfigurator() {
    const root = qs("#konfigProduk");
    if (!root) return;

    const els = {
      produk: qs("#konfigProduk"),
      warna: qs("#konfigWarna"),
      opsi: qs("#konfigOpsi"),
      ukuranField: qs("#konfigUkuranField"),
      ukuran: qs("#konfigUkuran"),
      qty: qs("#konfigQty"),
      qtyInput: qs("#konfigQtyInput"),
      media: qs("#konfigMedia"),
      badge: qs("#konfigBadge"),
      total: qs("#konfigTotal"),
      detail: qs("#konfigDetail"),
      add: qs("#konfigOrder"),
    };

    const first = D()[0];
    if (!first) return;

    const kst = {
      p: first,
      toneKey: (first.warna && first.warna[0]) || "putih",
      opsi: (first.opsi || []).map(() => 0),
      ukuran: first.ukuran ? first.ukuran[0] : null,
      qty: 1,
    };

    function paint() {
      const { p } = kst;
      const t = toneOf(kst.toneKey);
      const satuan = hitungSatuan(p, kst.opsi);
      const total = hitungTotal(p, kst.opsi, kst.qty);
      const dis = diskonAktif(p, kst.qty);

      els.media.innerHTML = mockMarkup(p.mock, t.tone, t.print);
      els.badge.textContent = p.nama;
      els.total.textContent = rp(total);

      const parts = [`${rp(satuan)} × ${kst.qty} ${p.unit}`];
      if (dis) parts.push(`diskon ${Math.round(dis.potong * 100)}%`);
      els.detail.textContent = parts.join(" · ");

      els.qtyInput.value = kst.qty;
    }

    function paintProduk() {
      els.produk.innerHTML = D()
        .map(
          (p) =>
            `<button type="button" class="chip${p.id === kst.p.id ? " is-active" : ""}" data-pid="${p.id}">${p.nama}</button>`
        )
        .join("");
    }

    function paintWarna() {
      els.warna.innerHTML = swatchMarkup(kst.p.warna || [], kst.toneKey);
    }

    function paintOpsi() {
      els.opsi.innerHTML = (kst.p.opsi || [])
        .map(
          (g, gi) => `
          <div class="field">
            <span class="field-label">${g.nama}</span>
            <div class="chip-row" data-group="${gi}">
              ${(g.pilihan || [])
                .map(
                  (o, oi) =>
                    `<button type="button" class="chip${kst.opsi[gi] === oi ? " is-active" : ""}" data-oi="${oi}">${o.t}${
                      o.d > 0 ? `<em>+${rp(o.d)}</em>` : ""
                    }</button>`
                )
                .join("")}
            </div>
          </div>`
        )
        .join("");

      if (kst.p.ukuran && kst.p.ukuran.length) {
        els.ukuranField.hidden = false;
        els.ukuran.innerHTML = kst.p.ukuran
          .map(
            (u) =>
              `<button type="button" class="chip${kst.ukuran === u ? " is-active" : ""}" data-uk="${u}">${u}</button>`
          )
          .join("");
      } else {
        els.ukuranField.hidden = true;
        els.ukuran.innerHTML = "";
      }
    }

    function syncProduct(p) {
      kst.p = p;
      kst.toneKey = (p.warna && p.warna[0]) || "putih";
      kst.opsi = (p.opsi || []).map(() => 0);
      kst.ukuran = p.ukuran ? p.ukuran[0] : null;
      kst.qty = Math.max(1, p.moq || 1);
      paintProduk();
      paintWarna();
      paintOpsi();
      paint();
    }

    els.produk.addEventListener("click", (e) => {
      const b = e.target.closest("[data-pid]");
      if (!b) return;
      const p = D().find((x) => x.id === b.dataset.pid);
      if (p) syncProduct(p);
    });

    els.warna.addEventListener("click", (e) => {
      const b = e.target.closest("[data-tone]");
      if (b) {
        kst.toneKey = b.dataset.tone;
        paintWarna();
        paint();
        return;
      }

      const customButton = e.target.closest("[data-custom-color]");
      if (customButton) openCustomColorPicker(customButton);
    });

    // warna custom — input berjalan selama pemilih warna digeser
    els.warna.addEventListener("input", (e) => {
      const inp = e.target.closest('input[type="color"]');
      if (!inp) return;
      const button = inp.previousElementSibling;
      kst.toneKey = inp.value;
      button.style.setProperty("--sw", inp.value);
      button.title = "Ubah warna custom " + inp.value.toUpperCase();
      button.setAttribute("aria-label", button.title);
      qsa(".swatch", els.warna).forEach((x) => x.classList.toggle("is-active", x === button));
      paint();
    });

    els.opsi.addEventListener("click", (e) => {
      const chip = e.target.closest(".chip");
      if (!chip) return;
      const row = chip.parentElement;
      const gi = Number(row.dataset.group);
      kst.opsi[gi] = Number(chip.dataset.oi);
      qsa(".chip", row).forEach((x) => x.classList.toggle("is-active", x === chip));
      paint();
    });

    els.ukuran.addEventListener("click", (e) => {
      const chip = e.target.closest("[data-uk]");
      if (!chip) return;
      kst.ukuran = chip.dataset.uk;
      qsa(".chip", els.ukuran).forEach((x) => x.classList.toggle("is-active", x === chip));
    });

    els.qty.addEventListener("click", (e) => {
      const b = e.target.closest("[data-step]");
      if (!b) return;
      const min = kst.p.moq || 1;
      kst.qty = Math.max(min, kst.qty + Number(b.dataset.step));
      paint();
    });

    els.qtyInput.addEventListener("change", () => {
      const min = kst.p.moq || 1;
      kst.qty = Math.max(min, Math.floor(Number(els.qtyInput.value) || min));
      paint();
    });

    els.add.addEventListener("click", () => {
      const teks = pesanPesanan(kst.p, kst.opsi, kst.toneKey, kst.ukuran, kst.qty);
      bukaWhatsApp(teks);
    });

    paintProduk();
    paintWarna();
    paintOpsi();
    paint();
  })();

  /* ══════════════════════ 11. GALERI ══════════════════════ */
  const galeriGrid = qs("#galeriGrid");
  if (galeriGrid && typeof GALERI !== "undefined") {
    galeriGrid.innerHTML = GALERI.map((g, i) => {
      const p = D().find((x) => x.id === g.produk);
      if (!g.gambar && !p) return "";
      const t = p ? toneOf(g.warna || (p.warna && p.warna[0]) || "putih") : null;
      return `
        <figure class="g-cell reveal" style="--d:${i * 45}ms">
          <div class="media">
            ${
              g.gambar
                ? `<img src="assets/produk/${g.gambar}" alt="${g.label}" loading="lazy" decoding="async">`
                : mockMarkup(p.mock, t.tone, t.print)
            }
          </div>
          <figcaption>${g.label}</figcaption>
        </figure>`;
    }).join("");
  }

  /* ══════════════════════ 12. REVEAL ══════════════════════ */
  // Tandai elemen statis sebagai reveal
  qsa(".sec-head, .hero-copy > *, .cta-inner > *, .card-ulasan, .bento-cell, .faq-item").forEach((el, i) => {
    el.classList.add("reveal");
    el.style.setProperty("--d", (i % 6) * 50 + "ms");
  });
  observeReveals();

  const steps = qs("#steps");
  const stepsFill = qs("#stepsFill");
  if (steps && stepsFill) {
    new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            stepsFill.style.transform = "scaleX(1)";
          }
        });
      },
      { threshold: 0.35 }
    ).observe(steps);
  }

  /* ══════════════════════ 13. MAGNETIC ══════════════════════ */
  if (!reduce && window.matchMedia("(min-width: 901px)").matches) {
    qsa(".btn--ink, .btn--accent, .btn--paper").forEach((btn) => {
      btn.addEventListener("mousemove", (e) => {
        const r = btn.getBoundingClientRect();
        const x = (e.clientX - r.left - r.width / 2) / r.width;
        const y = (e.clientY - r.top - r.height / 2) / r.height;
        btn.style.transform = `translate(${(x * 5).toFixed(2)}px, ${(y * 5).toFixed(2)}px)`;
      });
      btn.addEventListener("mouseleave", () => {
        btn.style.transform = "";
      });
    });
  }

  /* ══════════════════════ 14. BOOT ══════════════════════ */
  /* Reveal awal sudah dipanggil di modul 12. */
})();
