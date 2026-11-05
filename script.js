(function () {
  "use strict";

  const qs = (s, c = document) => c.querySelector(s);
  const qsa = (s, c = document) => Array.from(c.querySelectorAll(s));
  const rp = (n) => language === "en"
    ? "IDR " + Math.round(n || 0).toLocaleString("en-US")
    : "Rp " + Math.round(n || 0).toLocaleString("id-ID");
  const HEX = /^#[0-9a-f]{6}$/i;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const EN_TEXT = {
    "Lewati ke konten": "Skip to content",
    "KTUBA, kembali ke atas": "KTUBA, back to top",
    "Navigasi utama": "Main navigation",
    "Navigasi seluler": "Mobile navigation",
    "Layanan": "Services", "Harga": "Pricing", "Proses": "Process", "Hasil": "Work", "FAQ": "FAQ",
    "Chat WhatsApp": "Chat on WhatsApp", "Buka menu": "Open menu",
    "Percetakan & desain grafis · sejak": "Printing & graphic design · since",
    "Cetak yang bikin": "Print that makes",
    "orang minta": "people ask for",
    "satu lagi.": "one more.",
    "Merchandise custom, dokumen, spanduk, sampai desain grafis komersial. Dikerjakan dengan mesin cetak skala industri — dan bisa mulai dari satu buah.": "Custom merchandise, documents, banners, and commercial graphic design. Produced on industrial-scale printing equipment, with orders starting from just one piece.",
    "Lihat layanan": "Explore services", "Hitung harga": "Get a quote",
    "MOQ 1 pcs": "Minimum order: 1 piece", "Revisi desain gratis": "Free design revisions", "Kirim seluruh Indonesia": "Shipping across Indonesia",
    "Angka singkat KTUBA": "KTUBA at a glance",
    "Layanan KTUBA": "KTUBA services",
    "Tiga belas cara": "Thirteen ways",
    "membuat idemu": "to turn your idea into a",
    "benda.": "real object.",
    "Pilih produknya, lihat estimasi harganya, lalu pesan langsung ke WhatsApp. Tidak perlu daftar akun.": "Choose a product, check the estimated price, then order directly on WhatsApp. No account needed.",
    "Filter kategori": "Filter by category",
    "Harga di atas adalah estimasi awal sebelum pilihan bahan dan jumlah. Angka final dikonfirmasi lewat WhatsApp.": "Prices shown are starting estimates before material and quantity options. The final price is confirmed via WhatsApp.",
    "Hitung cepat": "Quick estimate", "Berapa totalnya?": "What's the total?",
    "Ubah bahan, warna, dan jumlah — harga serta ilustrasinya ikut berubah.": "Change the material, color, and quantity—the price and preview update with your choices.",
    "Produk": "Product", "Warna": "Color", "Ukuran": "Size", "Jumlah": "Quantity", "Jumlah pesanan": "Order quantity",
    "Catatan: warna yang dipilih hanya mengubah ilustrasi pratinjau, bukan warna desain atau cetakan akhir.": "Note: the selected color changes the product preview only, not the final design or print color.",
    "Kurangi jumlah": "Decrease quantity", "Tambah jumlah": "Increase quantity",
    "Estimasi": "Estimate", "Perkiraan total": "Estimated total", "Pesan via WhatsApp": "Order on WhatsApp",
    "Alur kerja": "How it works", "Dari file mentah": "From your first idea",
    "ke": "to",
    "tangan orang.": "something in your hands.",
    "Empat langkah, tanpa jalan buntu. Setiap tahap kamu tahu posisinya.": "Four clear steps, with updates at every stage.",
    "Kirim ide": "Send your idea", "Bisa file jadi, sketsa, atau cuma cerita. Kami bantu rapikan.": "Send a finished file, a sketch, or just describe what you have in mind. We'll help refine it.",
    "Approve desain": "Approve the design", "Kamu terima mockup dan estimasi harga sebelum apa pun dicetak.": "You'll receive a mockup and price estimate before anything goes to print.",
    "Produksi": "Production", "Masuk mesin cetak industri. Rata-rata 1–3 hari kerja.": "Your order goes to our industrial printers. Production usually takes 1–3 business days.",
    "Kirim": "Delivery", "Dikemas aman, dikirim ke alamat atau diambil di tempat.": "Packed securely, then shipped to you or ready for pickup.",
    "Kenapa KTUBA": "Why KTUBA", "Perbedaan yang": "A difference",
    "kamu": "you", "rasakan.": "can feel.",
    "Mesin industri, bukan printer rumahan": "Industrial printers, not home printers",
    "Warna lebih rata, hasil lebih konsisten, dan kapasitas besar tetap selesai cepat. Satu pesanan atau seribu, mesinnya sama.": "More even color, consistent results, and fast turnaround at scale. One order or a thousand, the same professional equipment does the work.",
    "Mulai dari 1 pcs": "Orders from 1 piece", "Tidak perlu memesan banyak cuma untuk coba desain.": "No need to order in bulk just to try out a design.",
    "File kamu aman": "Your files stay yours", "Desain tidak dipakai ulang tanpa izin tertulis.": "Your design is never reused without written permission.",
    "Garansi cetak ulang": "Reprint guarantee", "Hasil meleset dari approval? Kami cetak ulang.": "If the print doesn't match the approved proof, we'll reprint it.",
    "Desain dibantu": "Design support", "Tidak punya file siap cetak? Tim kami bisa membuatkan dari nol.": "Don't have a print-ready file? Our team can create one from scratch.",
    "Lihat jasa desain": "Explore design services",
    "Hasil produksi": "Our work", "Yang sudah": "Made by us",
    "kami": "and",
    "cetak.": "printed.",
    "Dokumentasi hasil cetak dan produk yang sudah diproduksi.": "A selection of printed work and finished products.",
    "Kata pelanggan": "Customer stories", "Mereka sudah": "They've seen",
    "pegang": "the",
    "hasilnya.": "results.",
    "Pesan mug buat reuni, awalnya ragu soal warna. Eh ternyata hasilnya persis banget sama yang di mockup, bahkan lebih bagus aslinya. Temen-temen pada nanya pesan di mana haha.": "I ordered mugs for a reunion and was unsure about the colors. They came out exactly like the mockup—actually even better in person. Everyone asked where I ordered them.",
    "Mug custom · 40 pcs · reuni SMA": "Custom mugs · 40 pieces · high school reunion",
    "Logo saya cuma foto dari HP, resolusinya jelek. Tapi timnya langsung bilang oke, dibenerin dulu tanpa nambah biaya. Spanduk jadinya bagus, ga keliatan kalau sumbernya foto HP wkwk.": "My logo was just a low-resolution phone photo. The team fixed it at no extra cost, and the banner turned out great—you'd never know the source was a phone photo.",
    "Spanduk + kaos · UMKM kuliner": "Banner + T-shirts · food business",
    "Salah pilih ukuran totebag, itu salah saya sendiri. Tapi begitu lapor, langsung diproses ulang tanpa drama. Sorenya udah beres. Sekarang kalau ada kebutuhan cetak pasti balik sini lagi.": "I chose the wrong tote bag size—that was my mistake. When I let them know, they reprinted it right away. It was ready that afternoon. I'll definitely come back for future print jobs.",
    "Totebag custom · 120 pcs · seminar": "Custom tote bags · 120 pieces · seminar",
    "Bergabung bersama ratusan pelanggan yang sudah percayakan cetaknya ke KTUBA.": "Join hundreds of customers who trust KTUBA with their printing.",
    "Pertanyaan": "Questions", "Sebelum": "Before",
    "memesan.": "you order.",
    "Berapa minimum order?": "What is the minimum order?",
    "Minimum pesanan tergantung produk dan satuannya. Mug custom mulai 6 pcs; produk lain mulai 1 unit. Satu paket foto pas berisi minimal 4 lembar.": "Minimum orders depend on the product and its listed unit. Custom mugs start at 6 pieces; other products start at 1 unit. One ID photo package contains at least 4 prints.",
    "Berapa lama prosesnya?": "How long does production take?",
    "Rata-rata 1–3 hari kerja setelah desain disetujui. Cetak dokumen bisa selesai hari yang sama. Untuk jumlah besar di atas 100 pcs atau finishing khusus, kami kabari estimasi pastinya sebelum produksi.": "Production usually takes 1–3 business days after design approval. Document printing may be ready the same day. For orders over 100 pieces or special finishing, we'll confirm the timeline before production.",
    "Format file apa yang dibutuhkan?": "What file formats do you accept?",
    "Paling ideal PDF, AI, atau PNG transparan dengan resolusi minimal 300 dpi. Kalau yang ada cuma foto logo dari HP, kirim saja — kami bantu rapikan jadi file siap cetak tanpa biaya tambahan.": "PDF, AI, or transparent PNG at 300 dpi or higher work best. If you only have a photo of your logo, send it over—we can prepare a print-ready file at no extra cost.",
    "Bisa revisi desain?": "Can I request design revisions?",
    "Bisa. Sebelum produksi, kamu akan menerima mockup untuk disetujui. Revisi desain gratis sampai kamu setuju. Setelah produksi jalan, perubahan tidak bisa dilakukan karena bahan sudah terpotong.": "Yes. We'll send you a mockup for approval before production. Design revisions are free until you approve it. Once production begins, changes aren't possible because the material may already be cut.",
    "Bagaimana pengiriman dan pembayarannya?": "What are the delivery and payment options?",
    "Pengiriman ke seluruh Indonesia lewat ekspedisi rekanan, atau ambil langsung di tempat. Pembayaran 50% di awal sebagai DP, sisanya setelah produksi selesai dan sebelum dikirim.": "We ship throughout Indonesia with our courier partners, or you can pick up your order. A 50% deposit is due upfront, with the balance payable after production and before delivery.",
    "Mulai sekarang": "Get started", "Ide kamu,": "Your idea,",
    "jadi nyata.": "made real.",
    "Kirim kebutuhanmu lewat WhatsApp. Kami balas dengan estimasi harga dan waktu pengerjaan yang jelas.": "Tell us what you need on WhatsApp. We'll reply with a clear price estimate and turnaround time.",
    "Alamat": "Address", "Lihat di Google Maps ↗": "View on Google Maps ↗", "Jam buka": "Business hours",
    "Percetakan dan desain grafis. Merchandise custom, cetak dokumen, media promosi, dan visual komersial.": "Printing and graphic design. Custom merchandise, document printing, promotional materials, and commercial visuals.",
    "Kontak": "Contact", "Mug & kaos custom": "Custom mugs & T-shirts", "Totebag, pin, gantungan": "Tote bags, pins & keychains", "Cetak dokumen": "Document printing", "Spanduk & banner": "Banners & signage", "Desain grafis": "Graphic design",
    "Google Maps ↗": "Google Maps ↗", "Kembali ke atas ↑": "Back to top ↑", "Seluruh hak cipta.": "All rights reserved.", "KTUBA. Seluruh hak cipta.": "KTUBA. All rights reserved.",
    "Detail produk": "Product details", "Tutup detail produk": "Close product details", "Mulai": "From", "Total": "Total",
    "Semua": "All", "Cetak": "Print", "Desain": "Design", "Paling dicari": "Popular",
    "Mug Custom": "Custom Mug", "Kaos Custom": "Custom T-shirt", "Totebag Custom": "Custom Tote Bag", "Pin Peniti": "Button Pin", "Gantungan Kunci": "Keychain", "Cetak Dokumen": "Document Printing", "Spanduk & Banner": "Banner & Signage", "Sticker Vinyl": "Vinyl Sticker", "Jilbab Custom": "Custom Hijab", "Kalender Dinding": "Wall Calendar", "Kalender Meja": "Desk Calendar", "Brosur": "Brochure", "Jasa Foto Pas": "ID Photo Printing", "Desain Grafis": "Graphic Design",
    "Coating full color, tahan microwave dan dishwasher.": "Full-color coating, microwave- and dishwasher-safe.",
    "Katun 24s atau 30s, DTF custom ukuran A4. S–XL dan XXL jumbo.": "24s or 30s cotton with custom A4 DTF printing. Sizes S–XL and XXL.",
    "Kanvas tebal, jahitan ganda, tali kuat untuk beban harian.": "Heavy canvas, double stitching, and sturdy straps for everyday use.",
    "Pin press dengan permukaan laminasi doff, aman untuk suvenir.": "Pressed pin with a matte laminated finish, ideal for souvenirs.",
    "Akrilik potong laser, ring besi anti karat.": "Laser-cut acrylic with a rust-resistant metal ring.",
    "Laserdruk rapi, staples atau jilid, siap kumpul besok.": "Clean laser printing, stapled or bound, ready for tomorrow.",
    "Banner indoor Flexy 280 GSM. Tahan dan cerah, per meter persegi.": "Bright, durable 280 GSM indoor Flexy banner, priced per square meter.",
    "Bahan vinyl, berwarna cerah, tahan air. Tersedia A4 dan A3.": "Bright, water-resistant vinyl, available in A4 and A3.",
    "Bahan Polino, ukuran 115 cm, cetak DTF full color.": "115 cm Polino fabric with full-color DTF printing.",
    "Art Paper 120 gr ukuran A3, 13 lembar, warna, klem siap gantung.": "13 full-color A3 sheets on 120 gsm art paper, with a hanging clip.",
    "Ivory 260 gr ukuran A5, 6 lembar, warna, spiral berdiri rapi.": "Six full-color A5 sheets on 260 gsm ivory stock with a standing spiral binding.",
    "A4, bolak-balik, warna. Harga per rim (500 lembar).": "Full-color, double-sided A4. Priced per ream (500 sheets).",
    "Foto pas 3×4 dan 4×6, cetak minimal 4 lembar per paket.": "ID photos in 3×4 and 4×6 cm sizes. Minimum 4 prints per package.",
    "File siap cetak, termasuk revisi dan hak pakai penuh.": "Print-ready files, revisions, and full usage rights included.",
    "Area cetak": "Print area", "Bahan": "Material", "Teknik cetak": "Printing method", "Diameter": "Diameter", "Sisi": "Sides", "Kertas": "Paper", "Tinta": "Ink", "Finishing": "Finishing", "Spesifikasi": "Specifications", "Paket": "Package", "Tingkat revisi": "Revision level",
    "Hitam putih": "Black and white", "Warna": "Color", "Tanpa jilid": "Unbound", "Jilid lakban": "Tape binding", "Kanvas tebal": "Heavy canvas", "Kanvas press": "Pressed canvas", "Akrilik doff": "Matte acrylic", "Akrilik bening": "Clear acrylic", "Logo saja": "Logo only", "Logo + 3 turunan": "Logo + 3 variations", "Brand kit lengkap": "Complete brand kit", "Revisi tanpa batas": "Unlimited revisions", "Revisi": "Revisions",
    "Pesanan selesai": "Orders completed", "Rata-rata pengerjaan": "Average turnaround", "Minimum order": "Minimum order", "Layanan cetak & desain": "Print & design services",
    "Putih": "White", "Hitam": "Black",
    "Senin–Jumat · 08.00–15.00 WIB": "Monday–Friday · 08:00–15:00 WIB",
    "0851-9124-1410 · Senin–Jumat · 08.00–15.00 WIB": "0851-9124-1410 · Monday–Friday · 08:00–15:00 WIB",
    "Kaos komunitas · 48 pcs": "Community T-shirts · 48 pieces", "Mug kafe · 60 pcs": "Cafe mugs · 60 pieces", "Totebag seminar · 120 pcs": "Seminar tote bags · 120 pieces", "Spanduk toko · 4 × 1 m": "Store banner · 4 × 1 m", "Pin acara · 250 pcs": "Event pins · 250 pieces", "Gantungan suvenir · 100 pcs": "Souvenir keychains · 100 pieces", "Stempel": "Stamp", "Kerudung": "Hijab",
    "Diskon ": "Discount ", " aktif untuk ": " active for ", "Tambah ": "Add ", " lagi → diskon ": " more → discount ", "Lihat produk ": "View ", "Pesan ": "Order ", "Warna ": "Color ", "Ubah warna custom ": "Choose custom color ", "Pilih warna sendiri": "Choose a custom color", "Custom ": "Custom ", "Ukuran ": "Size ",
    "ukuran.": "size.", "pcs": "pieces", "lembar": "sheets", "paket": "packages", "layanan": "services", "hari": "days", "jenis": "types", "5 dari 5 bintang": "5 out of 5 stars",
    "/ pcs": "/ pieces", "/ lembar": "/ sheets", "/ rim": "/ ream", "/ paket": "/ package", "/ m2": "/ m²",
    "Full color coating": "Full-color coating", "1 sisi": "1 side", "2 sisi": "2 sides",
    "Katun Combed 30s (S–XL)": "30s combed cotton (S–XL)", "Katun Combed 30s (XXL Jumbo)": "30s combed cotton (XXL)", "Katun Combed 24s (S–XL)": "24s combed cotton (S–XL)", "Katun Combed 24s (XXL Jumbo)": "24s combed cotton (XXL)",
    "Sablon plastisol": "Plastisol screen printing", "Bordir": "Embroidery", "Blacu": "Unbleached cotton", "Akrilik": "Acrylic", "Karet": "Rubber", "Hitam putih": "Black and white", "Tanpa jilid": "Unbound", "Jilid lakban": "Tape binding", "Akrilik doff": "Matte acrylic", "Akrilik bening": "Clear acrylic",
    "HVS 70 gsm": "70 gsm HVS paper", "HVS 80 gsm": "80 gsm HVS paper", "Art paper 120 gsm": "120 gsm art paper", "Flexy 280 GSM (indoor)": "280 GSM Flexy (indoor)", "Flexi Korea (outdoor)": "Korean Flexi (outdoor)", "Albatros (outdoor premium)": "Albatros (premium outdoor)", "A4 (Rp 10.000/lembar)": "A4 (IDR 10,000/sheet)", "A3 (Rp 20.000/lembar)": "A3 (IDR 20,000/sheet)", "Polino 115 cm + DTF": "115 cm Polino + DTF",
    "A3 · Art Paper 120 gr · 13 lembar · klem": "A3 · 120 gsm art paper · 13 sheets · hanging clip", "A5 · Ivory 260 gr · 6 lembar · spiral": "A5 · 260 gsm ivory · 6 sheets · spiral binding", "A4 bolak-balik · full color": "A4 double-sided · full color", "3×4 (min. 4 lembar)": "3×4 cm (min. 4 prints)", "4×6 (min. 4 lembar)": "4×6 cm (min. 4 prints)", "3×4 + 4×6 combo": "3×4 + 4×6 combo", "Logo saja": "Logo only", "Logo + 3 turunan": "Logo + 3 variations", "Brand kit lengkap": "Complete brand kit", "2× revisi": "2 revisions"
  };

  const EN_UPPER_TEXT = Object.fromEntries(Object.entries(EN_TEXT).map(([source, translated]) => [source.toUpperCase(), translated.toUpperCase()]));
  const originalText = new WeakMap();
  const originalAttributes = new WeakMap();
  let language = "id";
  const normalizeText = (value) => value.trim().replace(/\s+/g, " ");

  function translateValue(value) {
    const key = normalizeText(value);
    if (EN_TEXT[key]) return EN_TEXT[key];
    if (key === key.toUpperCase() && EN_UPPER_TEXT[key]) return EN_UPPER_TEXT[key];
    const patterns = [
      [/^Lihat detail (.+)$/, (match) => `View details for ${translateValue(match[1])}`],
      [/^Lihat produk (.+)$/, (match) => `View ${translateValue(match[1])}`],
      [/^Pesan (.+)$/, (match) => `Order ${translateValue(match[1])}`],
      [/^Warna (.+)$/, (match) => translateValue(match[1])],
      [/^Ubah warna custom (.+)$/, (match) => `Choose custom color ${match[1]}`],
      [/^Ukuran (.+)$/, (match) => `Size ${match[1]}`],
      [/^Custom (#[0-9A-F]{6})$/i, (match) => `Custom ${match[1]}`],
      [/^Diskon (\d+)% aktif untuk (\d+) (.+)\.$/, (match) => `A ${match[1]}% discount applies to ${match[2]} ${translateValue(match[3])}.`],
      [/^Tambah (\d+) (.+) lagi → diskon (\d+)%\.$/, (match) => `Add ${match[1]} ${translateValue(match[2])} to get a ${match[3]}% discount.`],
      [/^Rp ([\d.]+)$/, (match) => `IDR ${Number(match[1].replaceAll(".", "")).toLocaleString("en-US")}`],
      [/^(\d+) (pcs|lembar|paket|layanan)$/, (match) => `${match[1]} ${{ pcs: "pieces", lembar: "sheets", paket: "packages", layanan: "services" }[match[2]]}`],
      [/^(\d+) hari kerja$/, (match) => `${match[1]} business days`],
    ];
    for (const [pattern, replacement] of patterns) {
      const match = key.match(pattern);
      if (match) return replacement(match);
    }
    return value;
  }

  function applyLanguage(nextLanguage) {
    language = nextLanguage;
    document.documentElement.lang = language;
    const toggle = qs("#langToggle");
    if (toggle) {
      toggle.textContent = language === "id" ? "EN" : "ID";
      toggle.setAttribute("aria-pressed", String(language === "en"));
      toggle.setAttribute("aria-label", language === "id" ? "Switch language to English" : "Ganti bahasa ke Indonesia");
      toggle.title = language === "id" ? "Switch to English" : "Ganti ke Bahasa Indonesia";
    }
    document.title = language === "en" ? "KTUBA — Custom printing & graphic design" : "KTUBA — Cetak merchandise & desain grafis";
    const description = qs('meta[name="description"]');
    if (description) description.content = language === "en"
      ? "KTUBA — Custom printing and graphic design. Mugs, T-shirts, tote bags, pins, keychains, document printing, banners, and commercial design. From one piece, produced with professional equipment."
      : "KTUBA — percetakan dan desain grafis. Mug, kaos, totebag, pin, gantungan kunci custom, cetak dokumen, spanduk, dan desain komersial. Mulai dari 1 pcs, dikerjakan mesin cetak skala industri.";

    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    let node;
    while ((node = walker.nextNode())) {
      if (!originalText.has(node)) originalText.set(node, node.nodeValue);
      const source = originalText.get(node);
      const leading = source.match(/^\s*/)[0];
      const trailing = source.match(/\s*$/)[0];
      const content = normalizeText(source);
      const translated = language === "en" ? translateValue(content) : source;
      const result = language === "en" ? leading + translated + trailing : source;
      if (node.nodeValue !== result) node.nodeValue = result;
    }

    const translatableAttributes = ["aria-label", "title", "placeholder", "alt"];
    document.body.querySelectorAll("*").forEach((element) => {
      translatableAttributes.forEach((attribute) => {
        if (!element.hasAttribute(attribute)) return;
        let values = originalAttributes.get(element);
        if (!values) {
          values = {};
          originalAttributes.set(element, values);
        }
        if (!(attribute in values)) values[attribute] = element.getAttribute(attribute);
        const source = values[attribute];
        element.setAttribute(attribute, language === "en" ? translateValue(source) : source);
      });
    });
    if (toggle) {
      toggle.textContent = language === "id" ? "EN" : "ID";
      toggle.setAttribute("aria-label", language === "id" ? "Switch language to English" : "Switch language to Indonesian");
      toggle.title = language === "id" ? "Switch to English" : "Switch to Indonesian";
    }
  }

  const languageObserver = new MutationObserver((mutations) => {
    if (language !== "en") return;
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (node.nodeType === Node.TEXT_NODE) {
          if (!originalText.has(node)) originalText.set(node, node.nodeValue);
          const value = originalText.get(node);
          const leading = value.match(/^\s*/)[0];
          const trailing = value.match(/\s*$/)[0];
          node.nodeValue = leading + translateValue(normalizeText(value)) + trailing;
        } else if (node.nodeType === Node.ELEMENT_NODE) {
          const walker = document.createTreeWalker(node, NodeFilter.SHOW_TEXT);
          let child;
          while ((child = walker.nextNode())) {
            if (!originalText.has(child)) originalText.set(child, child.nodeValue);
            const value = originalText.get(child);
            const leading = value.match(/^\s*/)[0];
            const trailing = value.match(/\s*$/)[0];
            const translated = translateValue(normalizeText(value));
            if (child.nodeValue !== leading + translated + trailing) child.nodeValue = leading + translated + trailing;
          }
          [node, ...node.querySelectorAll("*")].forEach((element) => {
            ["aria-label", "title", "placeholder", "alt"].forEach((attribute) => {
              if (!element.hasAttribute(attribute)) return;
              let values = originalAttributes.get(element);
              if (!values) { values = {}; originalAttributes.set(element, values); }
              if (!(attribute in values)) values[attribute] = element.getAttribute(attribute);
              element.setAttribute(attribute, translateValue(values[attribute]));
            });
          });
        }
      });
    });
  });
  languageObserver.observe(document.body, { childList: true, subtree: true });
  applyLanguage("id");
  qs("#langToggle")?.addEventListener("click", () => applyLanguage(language === "id" ? "en" : "id"));

  const toTop = qs("#toTop");
  if (toTop) {
    const updateToTop = () => toTop.classList.toggle("is-visible", window.scrollY > 360);
    window.addEventListener("scroll", updateToTop, { passive: true });
    updateToTop();
  }

  const D = () => (typeof PRODUK !== "undefined" ? PRODUK : []);
  const W = () => (typeof WARNA !== "undefined" ? WARNA : {});
  const K = () => (typeof KONTAK !== "undefined" ? KONTAK : { wa: "6285191241410", email: "halo@ktuba.id" });

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
    if (w) out.push(language === "en" ? translateValue(w.nama) : w.nama);
    else if (HEX.test(toneKey || "")) out.push((language === "en" ? "Custom " : "Custom ") + toneKey.toUpperCase());
    if (ukuran) out.push(language === "en" ? `Size ${ukuran}` : "Ukuran " + ukuran);
    (p.opsi || []).forEach((g, i) => {
      const j = opsiIdx[i] === undefined ? 0 : opsiIdx[i];
      if (g.pilihan && g.pilihan[j]) out.push(language === "en" ? translateValue(g.pilihan[j].t) : g.pilihan[j].t);
    });
    return out;
  }

  function pesanPesanan(p, opsiIdx, toneKey, ukuran, qty) {
    if (language === "en") {
      const variant = labelVarian(p, opsiIdx, toneKey, ukuran);
      const lines = [`Hello KTUBA, I'd like to order ${translateValue(p.nama)}.`, "", `Quantity: ${qty} ${translateValue(p.unit)}`];
      if (variant.length) lines.push(`Specifications: ${variant.join(" · ")}`);
      lines.push(`Estimated price: ${rp(hitungTotal(p, opsiIdx, qty))}`, "", "Please confirm the final total and turnaround time. Thank you.");
      return lines.join("\n");
    }
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

  const MOCK_INNER = {
    mug: '<span class="p p--handle"></span><span class="p p--print">KTUBA</span>',
    kaos: '<span class="p p--body"></span><span class="p p--collar"></span><span class="p p--print">K</span>',
    kerudung: '<span class="p p--fold"></span><span class="p p--print">KT</span>',
    tote: '<span class="p p--handle p--handle--l"></span><span class="p p--handle p--handle--r"></span><span class="p p--print">KT</span>',
    pin: '<span class="p p--print">K</span>',
    gantungan: '<span class="p p--ring"></span><span class="p p--print">KTUBA</span>',
    dokumen:
      '<span class="p p--sheet p--sheet--b"></span><span class="p p--sheet p--sheet--c"></span><span class="p p--sheet"></span><span class="p p--lines"></span><span class="p p--block"></span>',
    spanduk:
      '<span class="p p--eye p--eye--1"></span><span class="p p--eye p--eye--2"></span><span class="p p--eye p--eye--3"></span><span class="p p--eye p--eye--4"></span><span class="p p--print">KTUBA</span>',
    desain: '<span class="p p--a"></span><span class="p p--b"></span><span class="p p--c"></span><span class="p p--d"></span>',
  };

  function mockMarkup(p, tone, print) {
    if (p && p.foto) return fotoMarkup(p.foto, tone, print);
    const mockId = p && p.mock;
    const inner = MOCK_INNER[mockId] || MOCK_INNER.pin;
    return `<div class="mock" style="--tone:${tone};--print:${print}"><div class="scene"><div class="obj obj--${mockId}">${inner}</div></div></div>`;
  }

  function fotoMarkup(f, tone, print) {
    const c = f.cetak || { x: 33, y: 46, w: 34, h: 26 };
    const url = `url('${f.src}')`;

    const gelap = lumaDari(tone) < 0.42;
    return `<div class="foto" style="--tone:${tone};--print:${print};--img:${url};--rasio:${f.rasio || 0.8}">
      <div class="foto-lantai" aria-hidden="true"></div>
      <div class="foto-panggung">
        <div class="foto-objek" style="--cx:${c.x}%;--cy:${c.y}%;--cw:${c.w}%;--ch:${c.h}%;--blend:${gelap ? "soft-light" : "multiply"};--blend-cetak:${gelap ? "normal" : "multiply"}">
          <span class="foto-cetak" aria-hidden="true">KTUBA</span>
        </div>
      </div>
    </div>`;
  }

  function lumaDari(hex) {
    const n = parseInt(hex.slice(1), 16);
    const r = (n >> 16) & 255;
    const g = (n >> 8) & 255;
    const b = n & 255;
    return (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
  }

  function cetakDi(hex) {
    return lumaDari(hex) > 0.56 ? "#FF4A1C" : "#FBF8F2";
  }

  function tintaSwatch(hex) {
    return lumaDari(hex) > 0.32 ? "#111314" : "#FBF8F2";
  }

  function toneOf(key) {
    const w = W()[key];
    if (w) return { tone: w.hex, print: w.print };
    if (HEX.test(key || "")) return { tone: key, print: cetakDi(key) };
    const d = W().putih || { hex: "#FCFBF7", print: "#FF4A1C" };
    return { tone: d.hex, print: d.print };
  }

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
    const swWarna = custom ? aktif : "#FF4A1C";
    const labelCustom = custom
      ? "Ubah warna custom " + aktif.toUpperCase()
      : "Pilih warna sendiri";

    const ikon =
      `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">` +
      `<path d="m2 22 1-1h3l9-9"/>` +
      `<path d="M3 21v-3l9-9"/>` +
      `<path d="m15 6 3.4-3.4a2.1 2.1 0 1 1 3 3L18 9l.4.4a2.1 2.1 0 1 1-3 3l-3.8-3.8a2.1 2.1 0 1 1 3-3l.4.4Z"/>` +
      `</svg>`;

    return (
      preset +
      `<span class="swatch-custom-wrap"><button type="button" class="swatch swatch--custom${custom ? " is-active" : ""}" style="--sw:${swWarna};--sw-ink:${tintaSwatch(swWarna)}" data-custom-color aria-label="${labelCustom}" title="${labelCustom}">${ikon}</button><input class="swatch-custom-input" type="color" value="${nilai}" tabindex="-1" aria-hidden="true"></span>`
    );
  }

  function openCustomColorPicker(button) {
    const input = button.nextElementSibling;
    if (!(input instanceof HTMLInputElement) || input.type !== "color") {
      throw new Error("Input warna custom tidak ditemukan.");
    }
    input.click();
  }

  const hdr = qs("#hdr");
  const burger = qs("#burger");
  const mobileNav = qs("#mobileNav");

  let lastY = window.scrollY;
  let bebasSampai = 0;

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

  qsa('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", () => {
      bebasSampai = Date.now() + 800;
      if (hdr) setHidden(false);
    });
  });

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

  qsa("[data-kontak]").forEach((el) => {
    const val = K()[el.dataset.kontak];
    if (val) el.textContent = val;
  });
  qsa("[data-sejak]").forEach((el) => (el.textContent = K().sejak || "2023"));

  const waHref = (text) =>
    `https://wa.me/${K().wa}?text=${encodeURIComponent(text)}`;

  qsa("[data-wa-link]").forEach((a) => {
    a.href = waHref(language === "en"
      ? "Hello KTUBA, I have a question about printing and design services."
      : "Halo KTUBA, saya mau tanya soal layanan cetak dan desain.");
    a.target = "_blank";
    a.rel = "noopener";
  });
  qs("#langToggle")?.addEventListener("click", () => {
    const message = language === "en"
      ? "Hello KTUBA, I have a question about printing and design services."
      : "Halo KTUBA, saya mau tanya soal layanan cetak dan desain.";
    qsa("[data-wa-link]").forEach((a) => { a.href = waHref(message); });
  });
  qsa("[data-email-link]").forEach((a) => {
    a.href = `mailto:${K().email}?subject=${encodeURIComponent("Tanya layanan KTUBA")}`;
  });
  qsa("[data-maps-link]").forEach((a) => {
    if (K().maps) a.href = K().maps;
  });

  const elTahun = qs("#tahun");
  if (elTahun) elTahun.textContent = new Date().getFullYear();

  const elNavKontak = qs("#mobileNavKontak");
  if (elNavKontak) elNavKontak.textContent = `${K().tampil} · ${K().jam}`;

  const tickerTrack = qs("#tickerTrack");
  if (tickerTrack) {
    const nama = D().map((p) => p.nama.toUpperCase());
    const set = [...nama, ...nama];
    tickerTrack.innerHTML = set
      .map((n) => `<span class="ticker-item"><span>${n}</span><i>✦</i></span>`)
      .join("");
    const ticker = tickerTrack.closest(".ticker");
    if (ticker && "IntersectionObserver" in window) {
      new IntersectionObserver(([entry]) => {
        ticker.classList.toggle("is-in-view", entry.isIntersecting);
      }).observe(ticker);
    } else {
      ticker?.classList.add("is-in-view");
    }
  }

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

  (function collage() {

    const heroFotos = [
      { src: "assets/produk/kaos.jpeg",    alt: "Kaos custom KTUBA" },
      { src: "assets/produk/optimized/3-mug.jpg", alt: "Mug custom KTUBA" },
      { src: "assets/produk/totebag-head.png", alt: "Totebag custom KTUBA" },
    ];
    ["collageA", "collageB", "collageC"].forEach((id, i) => {
      const host = qs("#" + id);
      if (!host) return;
      const f = heroFotos[i];
      const loading = i === 0 ? 'fetchpriority="high"' : 'loading="lazy"';
      host.innerHTML = `<img src="${f.src}" alt="${f.alt}" decoding="async" ${loading} style="width:100%;height:100%;object-fit:cover;display:block;">`;
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
              ${mockMarkup(p, t.tone, t.print)}

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

  document.addEventListener("click", (e) => {
    const trigger = e.target.closest("[data-open]");
    if (trigger) {
      e.preventDefault();
      openDrawer(trigger.dataset.open);
    }
  });

  renderCatalog();

  const scrim = qs("#scrim");
  const drawer = qs("#drawer");
  let lastFocus = null;
  let openPanel = null;
  let drawerBackEntry = false;

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

    void el.offsetHeight;
    void (scrim && scrim.offsetHeight);

    el.classList.add("is-open");
    if (focusEl) focusEl.focus();

    document.removeEventListener("keydown", trapFocus);
    document.addEventListener("keydown", trapFocus);
  }

  function closePanelFn(el, silent, fromHistory = false) {
    if (!el) return;
    el.classList.remove("is-open");
    if (openPanel === el) openPanel = null;
    document.removeEventListener("keydown", trapFocus);

    if (el === drawer && drawerBackEntry) {
      drawerBackEntry = false;
      if (!fromHistory) window.history.back();
    }

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

  window.addEventListener("popstate", () => {
    if (!drawerBackEntry) return;
    drawerBackEntry = false;
    if (openPanel === drawer) closePanelFn(drawer, true, true);
  });

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

  let st = null;

  function clampQty(v) {
    const min = (st && st.p.moq) || 1;
    const n = Math.max(min, Math.floor(Number(v) || min));
    return n;
  }

  function paintDrawer() {
    if (!st) return;
    const { p } = st;
    const t = toneOf(st.toneKey);
    drawerEls.media.innerHTML = mockMarkup(p, t.tone, t.print);
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

    drawerEls.warna.oninput = (e) => {
      const inp = e.target.closest('input[type="color"]');
      if (!inp) return;
      const button = inp.previousElementSibling;
      st.toneKey = inp.value;
      button.style.setProperty("--sw", inp.value);
      button.style.setProperty("--sw-ink", tintaSwatch(inp.value));
      button.title = "Ubah warna custom " + inp.value.toUpperCase();
      button.setAttribute("aria-label", button.title);
      qsa(".swatch", drawerEls.warna).forEach((x) => x.classList.toggle("is-active", x === button));
      paintDrawer();
    };

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

    drawerEls.order.onclick = () => {
      if (!st || !st.p) return;
      const teks = pesanPesanan(st.p, st.opsi, st.toneKey, st.ukuran, st.qty);
      bukaWhatsApp(teks);
    };

    paintDrawer();
    if (!drawerBackEntry) {
      const state = window.history.state;
      window.history.pushState(
        { ...(state && typeof state === "object" ? state : {}), ktubaProductDrawer: true },
        "",
        window.location.href
      );
      drawerBackEntry = true;
    }
    openPanelFn(drawer, drawerEls.close);
  }

  if (drawerEls.close) drawerEls.close.addEventListener("click", () => closePanelFn(drawer));

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

      els.media.innerHTML = mockMarkup(p, t.tone, t.print);
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

    els.warna.addEventListener("input", (e) => {
      const inp = e.target.closest('input[type="color"]');
      if (!inp) return;
      const button = inp.previousElementSibling;
      kst.toneKey = inp.value;
      button.style.setProperty("--sw", inp.value);
      button.style.setProperty("--sw-ink", tintaSwatch(inp.value));
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
                : mockMarkup(p, t.tone, t.print)
            }
          </div>
          <figcaption>${g.label}</figcaption>
        </figure>`;
    }).join("");
  }

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

})();
