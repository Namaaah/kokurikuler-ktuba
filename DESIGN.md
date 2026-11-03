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

## Ilustrasi produk
Semua ilustrasi dibuat dengan CSS (`container-type: inline-size`, satuan `cqw`), bukan gambar.
Setiap `.media` menyimpan `<figure>` berisi `.mock` dan komentar `<img>` siap pakai.
Begitu `<img>` dimasukkan, `.media:has(img) .mock` otomatis menyembunyikan ilustrasi — tanpa mengubah CSS.

Foto hasil produksi diletakkan di `assets/produk/` dan dipetakan lewat properti `gambar`
di setiap entri `GALERI` pada `produk.js`. Kartu katalog tetap memakai ilustrasi CSS.

## Gerak
- Reveal saat masuk viewport (IntersectionObserver), sekali jalan.
- Ticker berjalan lambat, berhenti saat di-hover.
- Parallax ringan pada kolase hero (desktop saja).
- Drawer masuk dengan translasi, bukan fade.
- Tombol magnetik 5px.
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
- Warna produk: preset dari `WARNA` di `produk.js` ditambah satu swatch custom yang membuka
  pemilih warna bawaan sistem (tanpa pustaka warna). Drawer dan konfigurator memakai
  `swatchMarkup()` yang sama supaya tidak pernah berbeda. Warna custom disimpan sebagai
  hex langsung di `toneKey`; `cetakDi()` memilih tinta yang tetap terbaca di atasnya
  (latar terang → vermillion, latar gelap → kertas).

## Yang perlu diganti sebelum tayang
1. `KONTAK.wa` di `produk.js` — nomor WhatsApp asli, hanya angka.
2. `KONTAK.tampil`, `email`, `alamat`, `jam`, `instagram`.
3. Tiga kutipan di bagian ulasan — masih contoh.
4. Foto produk di `assets/produk/` bila sudah tersedia.
