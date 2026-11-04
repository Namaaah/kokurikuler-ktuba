const KONTAK = {

  wa: "6285191241410",
  tampil: "0851-9124-1410",
  email: "halo@ktuba.id",
  alamat: "Jl. Parangtritis No. KM. 11, Dukuh, Sabdodadi, Kec. Bantul, Kabupaten Bantul, DIY 55715",
  maps: "https://maps.google.com/?q=SMK+Negeri+1+Bantul,+Jl.+Parangtritis+KM+11,+Sabdodadi,+Bantul,+DIY",
  jam: "Senin\u2013Jumat \u00B7 08.00\u201315.00 WIB",
  instagram: "@ktubadigital",
  sejak: "2023",
};

const WARNA = {
  putih: { nama: "Putih", hex: "#FCFBF7", print: "#FF4A1C" },
  natural: { nama: "Natural", hex: "#EFE9DC", print: "#111314" },
  hitam: { nama: "Hitam", hex: "#23262A", print: "#FBF8F2" },
  vermillion: { nama: "Vermillion", hex: "#FF4A1C", print: "#FBF8F2" },
  navy: { nama: "Navy", hex: "#2E4A7D", print: "#D8F26A" },
  lime: { nama: "Lime", hex: "#D8F26A", print: "#111314" },
  sage: { nama: "Sage", hex: "#9CAF95", print: "#111314" },
  kraft: { nama: "Kraft", hex: "#C89B6A", print: "#111314" },
};

const KATEGORI = [
  { id: "semua", label: "Semua" },
  { id: "merch", label: "Merchandise" },
  { id: "cetak", label: "Cetak" },
  { id: "desain", label: "Desain" },
];

const PRODUK = [
  {
    id: "mug",
    nama: "Mug Custom",
    kategori: "merch",
    mock: "mug",

    foto: {
      src: "assets/preview/mug-plate.webp",
      rasio: 1.0838,
      cetak: { x: 11, y: 34, w: 48, h: 28 },
    },
    tag: "Paling dicari",
    ringkas: "Coating full color, tahan microwave dan dishwasher.",
    mulai: 17500,
    unit: "pcs",
    moq: 6,
    warna: ["putih", "hitam", "vermillion", "lime", "navy"],
    ukuran: null,
    opsi: [
      {
        nama: "Area cetak",
        pilihan: [
          { t: "Full color coating", d: 0 },
          { t: "Full wrap", d: 5000 },
        ],
      },
    ],
    diskon: [
      { min: 12, potong: 0.05 },
      { min: 24, potong: 0.1 },
      { min: 50, potong: 0.18 },
    ],
  },
  {
    id: "kaos",
    nama: "Kaos Custom",
    kategori: "merch",
    mock: "kaos",

    foto: {
      src: "assets/preview/kaos-plate.webp",
      rasio: 0.8602,
      cetak: { x: 31, y: 44, w: 38, h: 24 },
    },
    tag: null,
    ringkas: "Katun 24s atau 30s, DTF custom ukuran A4. S–XL dan XXL jumbo.",
    mulai: 60000,
    unit: "pcs",
    moq: 1,
    warna: ["putih", "hitam", "navy", "sage", "vermillion"],
    ukuran: ["S", "M", "L", "XL", "XXL"],
    opsi: [
      {
        nama: "Bahan",
        pilihan: [
          { t: "Katun Combed 30s (S–XL)", d: 0 },
          { t: "Katun Combed 30s (XXL Jumbo)", d: 10000 },
          { t: "Katun Combed 24s (S–XL)", d: 10000 },
          { t: "Katun Combed 24s (XXL Jumbo)", d: 20000 },
        ],
      },
      {
        nama: "Teknik cetak",
        pilihan: [
          { t: "DTF A4", d: 0 },
          { t: "Sablon plastisol", d: 0 },
          { t: "Bordir", d: 15000 },
        ],
      },
    ],
    diskon: [
      { min: 12, potong: 0.06 },
      { min: 24, potong: 0.12 },
      { min: 50, potong: 0.2 },
    ],
  },
  {
    id: "totebag",
    nama: "Totebag Custom",
    kategori: "merch",
    mock: "tote",
    foto: {
      src: "assets/preview/totebag-plate.webp",
      rasio: 0.5841,
      cetak: { x: 18, y: 68, w: 60, h: 22 },
    },
    tag: null,
    ringkas: "Kanvas tebal, jahitan ganda, tali kuat untuk beban harian.",
    mulai: 30000,
    unit: "pcs",
    moq: 1,
    warna: ["natural", "kraft", "hitam", "vermillion", "sage"],
    ukuran: null,
    opsi: [
      {
        nama: "Bahan",
        pilihan: [
          { t: "Blacu", d: 0 },
          { t: "Kanvas tebal", d: 7000 },
          { t: "Kanvas press", d: 11000 },
        ],
      },
      {
        nama: "Area cetak",
        pilihan: [
          { t: "1 sisi", d: 0 },
          { t: "2 sisi", d: 5000 },
        ],
      },
    ],
    diskon: [
      { min: 12, potong: 0.05 },
      { min: 24, potong: 0.1 },
      { min: 50, potong: 0.18 },
    ],
  },
  {
    id: "pin",
    nama: "Pin Peniti",
    kategori: "merch",
    mock: "pin",
    foto: {
      src: "assets/preview/pin-plate.webp",
      rasio: 1.003,
      cetak: { x: 28, y: 40, w: 44, h: 18 },
    },
    tag: null,
    ringkas: "Pin press dengan permukaan laminasi doff, aman untuk suvenir.",
    mulai: 5000,
    unit: "pcs",
    moq: 10,
    warna: ["putih", "hitam", "vermillion", "lime", "navy"],
    ukuran: null,
    opsi: [
      {
        nama: "Bahan",
        pilihan: [
          { t: "Pin press", d: 0 },
          { t: "Akrilik", d: 3500 },
        ],
      },
      {
        nama: "Diameter",
        pilihan: [
          { t: "44 mm", d: 0 },
          { t: "58 mm", d: 1500 },
        ],
      },
    ],
    diskon: [
      { min: 50, potong: 0.08 },
      { min: 100, potong: 0.15 },
      { min: 250, potong: 0.22 },
    ],
  },
  {
    id: "gantungan",
    nama: "Gantungan Kunci",
    kategori: "merch",
    mock: "gantungan",
    foto: {
      src: "assets/preview/gantungan-plate.webp",
      rasio: 1.0088,
      cetak: { x: 38, y: 55, w: 50, h: 22 },
    },
    tag: null,
    ringkas: "Akrilik potong laser, ring besi anti karat.",
    mulai: 7500,
    unit: "pcs",
    moq: 10,
    warna: ["putih", "hitam", "vermillion", "lime", "navy"],
    ukuran: null,
    opsi: [
      {
        nama: "Bahan",
        pilihan: [
          { t: "Akrilik doff", d: 0 },
          { t: "Akrilik bening", d: 3000 },
          { t: "Karet", d: 2500 },
        ],
      },
      {
        nama: "Sisi",
        pilihan: [
          { t: "1 sisi", d: 0 },
          { t: "2 sisi", d: 2500 },
        ],
      },
    ],
    diskon: [
      { min: 50, potong: 0.08 },
      { min: 100, potong: 0.15 },
      { min: 250, potong: 0.22 },
    ],
  },
  {
    id: "dokumen",
    nama: "Cetak Dokumen",
    kategori: "cetak",
    mock: "dokumen",
    tag: null,
    ringkas: "Laserdruk rapi, staples atau jilid, siap kumpul besok.",
    mulai: 500,
    unit: "lembar",
    moq: 10,
    warna: ["putih"],
    ukuran: null,
    opsi: [
      {
        nama: "Kertas",
        pilihan: [
          { t: "HVS 70 gsm", d: 0 },
          { t: "HVS 80 gsm", d: 300 },
          { t: "Art paper 120 gsm", d: 900 },
        ],
      },
      {
        nama: "Tinta",
        pilihan: [
          { t: "Hitam putih", d: 0 },
          { t: "Warna", d: 1500 },
        ],
      },
      {
        nama: "Finishing",
        pilihan: [
          { t: "Tanpa jilid", d: 0 },
          { t: "Staples", d: 200 },
          { t: "Jilid lakban", d: 1500 },
        ],
      },
    ],
    diskon: [
      { min: 100, potong: 0.05 },
      { min: 500, potong: 0.1 },
    ],
  },
  {
    id: "spanduk",
    nama: "Spanduk & Banner",
    kategori: "cetak",
    mock: "spanduk",
    tag: null,
    ringkas: "Banner indoor Flexy 280 GSM. Tahan dan cerah, per meter persegi.",
    mulai: 20000,
    unit: "m2",
    moq: 1,
    warna: ["putih", "vermillion", "navy", "hitam", "lime"],
    ukuran: null,
    opsi: [
      {
        nama: "Bahan",
        pilihan: [
          { t: "Flexy 280 GSM (indoor)", d: 0 },
          { t: "Flexi Korea (outdoor)", d: 8000 },
          { t: "Albatros (outdoor premium)", d: 12000 },
        ],
      },
      {
        nama: "Ukuran",
        pilihan: [
          { t: "1 m²", d: 0 },
          { t: "2 m² (2×1 m)", d: 20000 },
          { t: "3 m² (3×1 m)", d: 40000 },
          { t: "4 m² (4×1 m)", d: 60000 },
        ],
      },
    ],
    diskon: [{ min: 5, potong: 0.07 }, { min: 10, potong: 0.12 }],
  },
  {
    id: "sticker",
    nama: "Sticker Vinyl",
    kategori: "cetak",
    mock: "dokumen",
    tag: null,
    ringkas: "Bahan vinyl, berwarna cerah, tahan air. Tersedia A4 dan A3.",
    mulai: 10000,
    unit: "lembar",
    moq: 1,
    warna: ["putih"],
    ukuran: null,
    opsi: [
      {
        nama: "Ukuran",
        pilihan: [
          { t: "A4 (Rp 10.000/lembar)", d: 0 },
          { t: "A3 (Rp 20.000/lembar)", d: 10000 },
        ],
      },
    ],
    diskon: [
      { min: 20, potong: 0.05 },
      { min: 50, potong: 0.1 },
    ],
  },
  {
    id: "jilbab",
    nama: "Jilbab Custom",
    kategori: "merch",
    mock: "kerudung",
    tag: null,
    ringkas: "Bahan Polino, ukuran 115 cm, cetak DTF full color.",
    mulai: 40000,
    unit: "pcs",
    moq: 1,
    warna: ["putih", "hitam", "navy", "sage"],
    ukuran: null,
    opsi: [
      {
        nama: "Bahan",
        pilihan: [
          { t: "Polino 115 cm + DTF", d: 0 },
        ],
      },
    ],
    diskon: [
      { min: 12, potong: 0.05 },
      { min: 24, potong: 0.1 },
    ],
  },
  {
    id: "kalender-dinding",
    nama: "Kalender Dinding",
    kategori: "cetak",
    mock: "dokumen",
    tag: null,
    ringkas: "Art Paper 120 gr ukuran A3, 13 lembar, warna, klem siap gantung.",
    mulai: 25000,
    unit: "pcs",
    moq: 1,
    warna: ["putih"],
    ukuran: null,
    opsi: [
      {
        nama: "Spesifikasi",
        pilihan: [
          { t: "A3 · Art Paper 120 gr · 13 lembar · klem", d: 0 },
        ],
      },
    ],
    diskon: [
      { min: 10, potong: 0.05 },
      { min: 50, potong: 0.12 },
    ],
  },
  {
    id: "kalender-meja",
    nama: "Kalender Meja",
    kategori: "cetak",
    mock: "dokumen",
    tag: null,
    ringkas: "Ivory 260 gr ukuran A5, 6 lembar, warna, spiral berdiri rapi.",
    mulai: 50000,
    unit: "pcs",
    moq: 1,
    warna: ["putih"],
    ukuran: null,
    opsi: [
      {
        nama: "Spesifikasi",
        pilihan: [
          { t: "A5 · Ivory 260 gr · 6 lembar · spiral", d: 0 },
        ],
      },
    ],
    diskon: [
      { min: 10, potong: 0.05 },
      { min: 50, potong: 0.12 },
    ],
  },
  {
    id: "brosur",
    nama: "Brosur",
    kategori: "cetak",
    mock: "dokumen",
    tag: null,
    ringkas: "A4, bolak-balik, warna. Harga per rim (500 lembar).",
    mulai: 800000,
    unit: "rim",
    moq: 1,
    warna: ["putih"],
    ukuran: null,
    opsi: [
      {
        nama: "Ukuran",
        pilihan: [
          { t: "A4 bolak-balik · full color", d: 0 },
        ],
      },
    ],
    diskon: [
      { min: 2, potong: 0.05 },
      { min: 5, potong: 0.1 },
    ],
  },
  {
    id: "foto-pas",
    nama: "Jasa Foto Pas",
    kategori: "cetak",
    mock: "dokumen",
    tag: null,
    ringkas: "Foto pas 3×4 dan 4×6, cetak minimal 4 lembar per paket.",
    mulai: 25000,
    unit: "paket",
    moq: 1,
    warna: ["putih"],
    ukuran: null,
    opsi: [
      {
        nama: "Ukuran",
        pilihan: [
          { t: "3×4 (min. 4 lembar)", d: 0 },
          { t: "4×6 (min. 4 lembar)", d: 0 },
          { t: "3×4 + 4×6 combo", d: 0 },
        ],
      },
    ],
    diskon: [],
  },
  {
    id: "desain",
    nama: "Desain Grafis",
    kategori: "desain",
    mock: "desain",
    tag: null,
    ringkas: "File siap cetak, termasuk revisi dan hak pakai penuh.",
    mulai: 150000,
    unit: "paket",
    moq: 1,
    warna: ["vermillion", "navy", "lime", "hitam"],
    ukuran: null,
    opsi: [
      {
        nama: "Paket",
        pilihan: [
          { t: "Logo saja", d: 0 },
          { t: "Logo + 3 turunan", d: 100000 },
          { t: "Brand kit lengkap", d: 250000 },
        ],
      },
      {
        nama: "Tingkat revisi",
        pilihan: [
          { t: "2× revisi", d: 0 },
          { t: "Revisi tanpa batas", d: 75000 },
        ],
      },
    ],
    diskon: [],
  },
];

const GALERI = [
  { produk: "kaos", gambar: "kaos.jpeg", label: "Kaos komunitas · 48 pcs", warna: "navy" },
  { produk: "spanduk", gambar: "banner.jpeg", label: "Spanduk toko · 4 × 1 m", warna: "vermillion" },
  { produk: "mug", gambar: "optimized/3-mug.jpg", label: "Mug kafe · 60 pcs", warna: "putih" },
  { produk: "totebag", gambar: "tothebag.jpeg", label: "Totebag seminar · 120 pcs", warna: "natural" },
  { produk: "pin", gambar: "optimized/pin.jpg", label: "Pin acara · 250 pcs", warna: "lime" },
  { produk: "gantungan", gambar: "optimized/gantungan-kunci.jpg", label: "Gantungan suvenir · 100 pcs", warna: "hitam" },
  { gambar: "optimized/stempel.jpg", label: "Stempel" },
  { gambar: "optimized/krudung.jpg", label: "Kerudung" },
];

const STATS = [
  { angka: 1240, suffix: "+", label: "Pesanan selesai" },
  { angka: 3, suffix: " hari", label: "Rata-rata pengerjaan" },
  { angka: 1, suffix: " pcs", label: "Minimum order" },
  { angka: 13, suffix: " jenis", label: "Layanan cetak & desain" },
];
