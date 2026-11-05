# Arah desain KTUBA

Ringkasan keputusan visual dan teknis untuk situs ini. Ubah dokumen ini kalau arahnya berubah.

## Identitas
Percetakan dan desain grafis yang bekerja untuk merek, komunitas, dan usaha kecil.
Nada bicara: langsung, percaya diri, tanpa istilah teknis berlebihan.

## Palet
| Peran | Warna | Kode |
|---|---|---|
| Latar utama | kertas hangat | `#FBF8F2` |
| Latar sekunder | kertas tua | `#F4EFE5` |
| Tinta | hampir hitam | `#111314` |
| Aksen aksi | vermillion | `#FF4A1C` |
| Penanda | lime | `#D8F26A` |
| Teks pendukung | abu hangat | `#6B6560` |
| Garis | kertas gelap | `#E2DCCF` |

Vermillion hanya untuk aksi dan penekanan — bukan dekorasi. Lime hanya untuk label kecil dan satu blok ulasan.

## Tipografi
- **Bricolage Grotesque** (variabel, woff2 lokal) untuk judul dan antarmuka. Tracking rapat pada ukuran besar.
- **Instrument Serif italic** untuk satu frasa aksen di setiap judul besar. Tidak dipakai untuk teks panjang.
- Ukuran judul memakai `clamp()` supaya tidak perlu media query tambahan.

## Komposisi
Urutan halaman: header → hero (kolase produk) → ticker → angka → katalog → konfigurator harga → proses → bento → galeri → ulasan → FAQ → CTA → footer.

- Grid 12 kolom tak terlihat, lebar maksimum 1440px.
- Bagian gelap (konfigurator) dan bagian lime (ulasan) memecah ritme halaman terang.
- Bayangan keras (offset, tanpa blur) sebagai pengganti bayangan lembut.
- Kartu 01 "Kenapa KTUBA" memakai foto mesin cetak asli (`assets/dll/mesin-cetak-lebar.jpg`,
  1400×759) yang menempel ke tepi kartu: tanpa bingkai garis, tanpa ruang kosong di atas
  foto. Kartu ini satu-satunya sel bento tanpa border.
- Tombol bantuan WhatsApp melekat di kanan bawah (`fixed`, z-index 85): pil tinta dengan
  ikon lime, hover hijau, hilang saat drawer atau menu seluler terbuka (`body.is-locked`).
  Di layar ≤720px tombol "ke atas" dinaikkan supaya keduanya bertumpuk, tidak bertabrakan.

## Ilustrasi produk
Produk tanpa konfigurasi `foto` memakai ilustrasi CSS murni (`container-type: inline-size`,
satuan `cqw`), bukan gambar. `mockMarkup()` di `script.js` yang memilih jalurnya:
ada `foto` → plate berfoto, tidak ada → ilustrasi CSS. Satu pintu masuk, jadi kartu
katalog, drawer, konfigurator, dan galeri tidak mungkin berbeda.

**Dua keluarga aset, jangan dicampur.**
- `assets/produk/` — foto katalog untuk galeri dan bagian "hasil produksi". Boleh
  menampilkan cetakan contoh, tulisan di kain, latar apa pun.
- `assets/preview/` — plate rekolor: potongan bersih tanpa cetakan, siap diberi warna
  dan tulisan. **Foto di `assets/produk/` tidak pernah dipakai di sini.** Kaos adalah
  buktinya: `assets/produk/kaos.jpeg` memuat tulisan "MERDEKA BELAJAR", sedangkan
  `assets/preview/prev-kaos.jpg` adalah kaos polos yang jadi sumber plate.

## Foto produk yang bisa diwarnai
Lima produk memakai foto asli yang tetap ikut warna pilihan pembeli, tanpa satu pun
file gambar per warna: **mug, kaos, totebag, pin, gantungan kunci**.

**Cara kerjanya.** Tiap plate (10–20 KB WebP) adalah grafik skala abu-abu: kanal alpha
= bentuk benda, nilai terang = lipatan dan bayangan asli. Plate dipakai dua kali pada
elemen yang sama — sebagai `mask-image` (memotong benda dari latarnya) dan sebagai
`background-image` di atas `background-color: var(--tone)` dengan
`background-blend-mode`. Satu elemen, nol aset tambahan per warna.

**Dua blend terpisah.** `--blend` untuk kain, `--blend-cetak` untuk tulisan:
- kain: nada terang → `multiply`; nada gelap (`lumaDari(tone) < 0.42`) → `soft-light`
  (multiply di atas hitam mematikan semua lipatan).
- cetak: `multiply` di nada terang, `normal` di nada gelap. Dulu cetak ikut
  `soft-light` dan hilang sama sekali di atas kain gelap.

**Kenapa bukan three.js.** `assets/3d-models/tshirt-mockup.glb` (5,3 MB) butuh three.js
dan `fetch`, keduanya mati di `file://`.

**Tampilan tiga dimensi.** Bukan tilt dan bukan kilau. Kedalaman datang dari
`drop-shadow` yang mengikuti siluet dan dari lipatan kain di plate itu sendiri — bukan
dari gerakan. Benda **tidak bergerak** saat kursor menunjuk atau saat fokus keyboard
mendarat di kartunya: tidak membesar, tidak terangkat, tidak berputar. Tidak ada ayunan
diam, tidak ada geseran lantai, tidak ada kilau yang mengikuti kursor.

**Ukuran cetak.** `9.6cqw` dihitung dari `.foto-objek`, bukan dari panggungnya, supaya
tulisan tetap sebanding dengan bendanya di katalog maupun di drawer.

**Menambah atau mengganti produk berfoto.** Satu properti di `produk.js`:

```js
foto: {
  src: "assets/preview/mug-plate.webp", // plate, bukan foto asli
  rasio: 1.0624,                        // lebar / tinggi plate
  cetak: { x: 10, y: 32, w: 52, h: 32 } // kotak cetak, % dari plate
}
```

Kotak `cetak` diuji otomatis: untuk setiap produk, kotak itu harus berada di dalam
benda, dan teks 27 px tidak boleh melebihi kotaknya.

**Membuat plate.** Generatornya di luar repo (`gen-plat2.js` di direktori sementara),
karena hanya dipakai saat menyiapkan aset. Resepnya per produk, bukan satu ambang global —
tiap foto punya penyakitnya sendiri:

| produk | latar | ambang | bentuk | lubang |
|---|---|---|---|---|
| mug | putih rata | `dev 0.035` | siluet | `buka` — lubang pegangan |
| kaos | putih rata | `dev` | siluet | `tutup` |
| totebag | bergradasi | digambar tangan | badan + 2 tali | — |
| pin | gradasi halus | `dev 0.025` | `ellipse` | `tutup` |
| gantungan | rata | `dev 0.022` | siluet | `tutup` — akrilik bening |

Empat mode yang tersedia:
- `dasar: "median"` untuk latar rata; `"plane"` untuk latar bergradasi (kuadrat terkecil
  pada cincin tepi, diulang dengan pembuangan pencilan).
- `mode: "dev"` = `|luma - latar| > ambang`; `"terangdev"` = hanya yang lebih terang
  dari latar, sehingga bayangan di bawah benda tidak ikut masuk.
- `lubangBesar: "buka"` mempertahankan lubang besar (lingkar pegangan mug dan tali
  totebag); `"tutup"` mengisi semua lubang (wajah akrilik gantungan selebar latarnya,
  jadi harus diisi).
- `bentuk: "ellipse"` memasang elips pada kotak benda — untuk pin, yang wajahnya
  bergradasi sampai menyatu dengan latar sehingga tidak ada ambang yang bisa
  memisahkannya. Siluetnya bulat, jadi elips justru tepat.

Totebag tidak memakai ambang sama sekali: latarnya berbayang di kiri, terang di pojok
kanan atas, dan ada pita bayangan di bawah — tidak ada model global yang cocok. Bentuk
badan dan dua talinya ditelusuri dari ukuran foto, sedangkan nilai lipatannya tetap
diambil dari foto asli.

## Gerak
- Reveal saat masuk viewport (IntersectionObserver), sekali jalan.
- Ticker berjalan lambat, berhenti saat di-hover.
- Parallax ringan pada kolase hero (desktop saja).
- Drawer masuk dengan translasi, bukan fade.
- Tombol magnetik 5px.
- Foto produk **diam**. Tanpa angkat saat hover, tanpa ayunan diam, tanpa kilau.
- Semua gerak dimatikan di bawah `prefers-reduced-motion: reduce`.

## Header
- Melayang di atas isi: `rgba(251, 248, 242, 0.68)` dengan `backdrop-filter: blur(18px)`.
  Saat digulir jadi `0.8` dan tingginya menyusut 70px → 58px. Tanpa dukungan blur,
  latar dinaikkan ke `0.94` supaya teks tetap terbaca (`@supports not`).
- Menurun → header bergeser ke atas dan hilang. Menaik → kembali. Ambang 8px mencegah
  kedip karena inersia gulir di layar sentuh; di bawah 140px header selalu tampil.
- Klik tautan menu memberi jendela tenang 800ms agar header tidak menyelinap saat
  halaman meluncur ke bagian tujuan.
- Saat header hilang, `body.hdr-hidden` menarik judul sticky di FAQ naik mengisi ruang kosong.
- Fokus keyboard ke dalam header selalu memunculkannya kembali.

## Teknis
- Vanilla HTML/CSS/JS, tanpa build step, tanpa CDN. Berjalan lewat `file://`.
- Font diunduh lokal di `assets/fonts/`.
- Data produk, harga, dan kontak terpusat di `produk.js`.
- Tanpa keranjang: setiap produk dipesan langsung. Tombol "Pesan via WhatsApp"
  di drawer produk dan di konfigurator menyusun satu pesan berisi nama produk,
  jumlah, spesifikasi, dan estimasi harga — lalu membuka `wa.me`.
- Tidak ada state yang disimpan di browser; tidak ada checkout bertahap.
- Warna produk: preset dari `WARNA` di `produk.js` ditambah satu tombol eyedropper yang
  membuka pemilih warna bawaan sistem (tanpa pustaka warna). Drawer dan konfigurator
  memakai `swatchMarkup()` yang sama supaya tidak pernah berbeda. Tombolnya 36px, sama
  dengan swatch preset: diam → lingkaran putus-putus berikon eyedropper; sudah dipilih →
  lingkaran penuh warna itu dengan ikon dibalik. Warna custom disimpan sebagai hex
  langsung di `toneKey`.
- Dua pemilihan tinta, jangan disatukan:
  - `cetakDi(hex)` — tinta **cetakan di atas produk** (latar terang → vermillion,
    latar gelap → kertas). Warna merek, dipakai `fotoMarkup()`.
  - `tintaSwatch(hex)` — ikon **di dalam lingkaran swatch**. Bukan tinta cetak, jadi
    ambil yang paling kontras mentah: tinta di atas warna terang, kertas di atas warna
    gelap. Titik silang kontras sesungguhnya ada di luma ~0.28; ambangnya dibulatkan ke
    0.32. Tanpa ini, vermillion di atas kuning hanya 1,65:1 dan ikonnya tenggelam.

## Yang perlu diganti sebelum tayang
1. `KONTAK.wa` di `produk.js` — nomor WhatsApp asli, hanya angka.
2. `KONTAK.tampil`, `email`, `alamat`, `jam`, `instagram`.
3. Tiga kutipan di bagian ulasan — masih contoh.
4. Foto produk di `assets/produk/` bila sudah tersedia — itu untuk galeri, bukan pratinjau.
   Pratinjau memakai plate di `assets/preview/`. Mengganti foto pratinjau berarti
   membuat plate baru lewat generator lalu memperbarui `foto` di `produk.js`.
5. Tulisan "KTUBA" di atas produk adalah penanda sementara, bukan file — diganti di
   `fotoMarkup()` bila ingin memakai nama toko atau tanpa cetak sama sekali.
6. Plate totebag, pin, dan gantungan dibuat dari foto katalog yang ada. Kalau nanti ada
   foto baru, jalankan ulang generator untuk produk itu saja — resepnya per produk,
   tidak ada ambang yang berlaku umum.
