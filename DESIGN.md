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

Foto asli diletakkan di `assets/produk/` dengan nama sesuai `id` produk, misalnya `mug.jpg`.

## Gerak
- Reveal saat masuk viewport (IntersectionObserver), sekali jalan.
- Ticker berjalan lambat, berhenti saat di-hover.
- Parallax ringan pada kolase hero (desktop saja).
- Drawer masuk dengan translasi, bukan fade.
- Tombol magnetik 5px.
- Semua gerak dimatikan di bawah `prefers-reduced-motion: reduce`.

## Teknis
- Vanilla HTML/CSS/JS, tanpa build step, tanpa CDN. Berjalan lewat `file://`.
- Font diunduh lokal di `assets/fonts/`.
- Data produk, harga, dan kontak terpusat di `produk.js`.
- Tanpa keranjang: setiap produk dipesan langsung. Tombol "Pesan via WhatsApp"
  di drawer produk dan di konfigurator menyusun satu pesan berisi nama produk,
  jumlah, spesifikasi, dan estimasi harga — lalu membuka `wa.me`.
- Tidak ada state yang disimpan di browser; tidak ada checkout bertahap.

## Yang perlu diganti sebelum tayang
1. `KONTAK.wa` di `produk.js` — nomor WhatsApp asli, hanya angka.
2. `KONTAK.tampil`, `email`, `alamat`, `jam`, `instagram`.
3. Tiga kutipan di bagian ulasan — masih contoh.
4. Foto produk di `assets/produk/` bila sudah tersedia.
