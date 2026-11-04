/* ============================================================
   KTUBA — PUSAT DATA
   ------------------------------------------------------------
   Ini satu-satunya file yang perlu kamu ubah untuk mengganti
   produk, harga, pilihan bahan, dan kontak.

   ATURAN HARGA
   - `mulai`  : harga dasar per unit (Rp), sebelum tambahan opsi
   - `opsi[]` : grup pilihan. `d` = tambahan harga per unit (Rp)
   - `diskon` : potongan otomatis berdasarkan jumlah
   Total dihitung: (mulai + semua tambahan) x qty, lalu dipotong diskon.
   ============================================================ */

/* ------------------------------------------------------------
   1. KONTAK  ←  WAJIB DIGANTI SEBELUM DIPAKAI
   ------------------------------------------------------------ */
const KONTAK = {
  // Nomor WhatsApp, HANYA ANGKA, tanpa +, spasi, atau tanda hubung.
  // Contoh: 6281234567890  (08xx menjadi 628xx)
  wa: "6281234567890",
  tampil: "+62 812-3456-7890",
  email: "halo@ktuba.id",
  alamat: "Jl. Contoh No. 00, Kota Kamu",
  jam: "Senin–Sabtu · 08.00–17.00 WIB",
  instagram: "@ktuba.id",
  sejak: "2019",
};

/* ------------------------------------------------------------
   2. PALET WARNA PRODUK
   `hex`   = warna benda pada ilustrasi
   `print` = warna hasil cetak di atas benda tersebut
   ------------------------------------------------------------ */
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

/* ------------------------------------------------------------
   3. KATEGORI (urutannya mengikuti tab filter)
   ------------------------------------------------------------ */
const KATEGORI = [
  { id: "semua", label: "Semua" },
  { id: "merch", label: "Merchandise" },
  { id: "cetak", label: "Cetak" },
  { id: "desain", label: "Desain" },
];

/* ------------------------------------------------------------
   4. KATALOG PRODUK
   `mock` menentukan bentuk ilustrasi: mug | kaos | tote | pin |
   gantungan | dokumen | spanduk | desain
   ------------------------------------------------------------ */
const PRODUK = [
  {
    id: "mug",
    nama: "Mug Custom",
    kategori: "merch",
    mock: "mug",
    tag: "Paling dicari",
    ringkas: "Keramik 11 oz. Cetakan tahan microwave dan dishwasher.",
    mulai: 25000,
    unit: "pcs",
    moq: 1,
    warna: ["putih", "hitam", "vermillion", "lime", "navy"],
    ukuran: null,
    opsi: [
      {
        nama: "Bahan",
        pilihan: [
          { t: "Keramik putih", d: 0 },
          { t: "Keramik hitam", d: 3500 },
          { t: "Enamel", d: 9000 },
        ],
      },
      {
        nama: "Area cetak",
        pilihan: [
          { t: "1 sisi", d: 0 },
          { t: "Full wrap", d: 6000 },
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
    tag: null,
    ringkas: "Sablon plastisol, warna pekat, tidak mudah pecah.",
    mulai: 65000,
    unit: "pcs",
    moq: 1,
    warna: ["putih", "hitam", "navy", "sage", "vermillion"],
    ukuran: ["S", "M", "L", "XL", "XXL"],
    opsi: [
      {
        nama: "Bahan",
        pilihan: [
          { t: "Cotton Combed 30s", d: 0 },
          { t: "Cotton Combed 24s", d: 5000 },
          { t: "Dry-fit", d: 9000 },
        ],
      },
      {
        nama: "Teknik",
        pilihan: [
          { t: "Sablon plastisol", d: 0 },
          { t: "DTF", d: 4000 },
          { t: "Bordir", d: 12000 },
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
    ringkas: "Cetak outdoor tahan hujan, mata ayam siap pasang.",
    mulai: 25000,
    unit: "pcs",
    moq: 1,
    warna: ["putih", "vermillion", "navy", "hitam", "lime"],
    ukuran: null,
    opsi: [
      {
        nama: "Bahan",
        pilihan: [
          { t: "Flexi China", d: 0 },
          { t: "Flexi Korea", d: 8000 },
          { t: "Albatros", d: 12000 },
        ],
      },
      {
        nama: "Ukuran",
        pilihan: [
          { t: "2 × 1 m", d: 0 },
          { t: "3 × 1 m", d: 9000 },
          { t: "4 × 1 m", d: 18000 },
          { t: "5 × 1 m", d: 27000 },
        ],
      },
    ],
    diskon: [{ min: 5, potong: 0.07 }, { min: 10, potong: 0.12 }],
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

/* ------------------------------------------------------------
   5. GALERI HASIL — pakai id produk + keterangan
   ------------------------------------------------------------ */
const GALERI = [
  { produk: "kaos", gambar: "kaos.jpeg", label: "Kaos komunitas · 48 pcs", warna: "navy" },
  { produk: "mug", gambar: "3-mug.jpg", label: "Mug kafe · 60 pcs", warna: "putih" },
  { produk: "totebag", gambar: "tothebag.jpeg", label: "Totebag seminar · 120 pcs", warna: "natural" },
  { produk: "spanduk", gambar: "banner.jpeg", label: "Spanduk toko · 4 × 1 m", warna: "vermillion" },
  { produk: "pin", gambar: "pin.jpg", label: "Pin acara · 250 pcs", warna: "lime" },
  { produk: "gantungan", gambar: "gantungan-kunci.jpg", label: "Gantungan suvenir · 100 pcs", warna: "hitam" },
  { gambar: "stempel.jpg", label: "Stempel" },
  { gambar: "krudung.jpg", label: "Kerudung" },
];

/* ------------------------------------------------------------
   6. ANIMASI ANGKA — dihitung oleh script.js
   ------------------------------------------------------------ */
const STATS = [
  { angka: 1240, suffix: "+", label: "Pesanan selesai" },
  { angka: 3, suffix: " hari", label: "Rata-rata pengerjaan" },
  { angka: 1, suffix: " pcs", label: "Minimum order" },
  { angka: 8, suffix: " jenis", label: "Layanan cetak & desain" },
];
