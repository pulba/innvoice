<p align="center">
  <img src="logo.webp" alt="Pulba Digital" width="120">
</p>

<h1 align="center">Pulba Digital — Invoice</h1>

<p align="center">
  <strong>Invoice digital profesional untuk jasa pembuatan website & undangan digital.</strong><br>
  Ringan, tanpa backend, 100% responsif di smartphone, tablet, & desktop.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white" alt="HTML5">
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white" alt="CSS3">
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black" alt="JavaScript">
  <img src="https://img.shields.io/badge/Cloudflare_Pages-F38020?style=flat-square&logo=cloudflare&logoColor=white" alt="Cloudflare Pages">
  <img src="https://img.shields.io/badge/License-MIT-green?style=flat-square" alt="License">
</p>

---

## ✨ Fitur

| Fitur | Keterangan |
|---|---|
| 📱 **Full Responsive & Mobile First** | Dilengkapi Mobile Tab Nav (`Form Edit` ⟷ `Preview`) & tombol jump interaktif |
| 🔍 **Adaptive A4 Scaling** | Pratinjau invoice A4 otomatis diskalakan proporsional di HP dengan tombol zoom Fit/100% |
| 🧾 **Live Preview** | Perubahan form langsung terlihat di invoice secara realtime |
| 📅 **Auto Invoice Number** | Nomor invoice otomatis mengikuti tanggal invoice yang dipilih |
| 🏷️ **Preset Project** | Pilih jenis project (Website / Undangan / Custom) |
| ➕ **Multi Item** | Tambah & hapus item invoice tanpa batas |
| 💰 **Kalkulasi Otomatis** | Subtotal, diskon, adjustment, grand total dihitung realtime |
| 💾 **Simpan Draft** | Data tersimpan di localStorage browser |
| 🖼️ **Export PNG High-Res** | Download invoice sebagai gambar PNG tajam (2x Retina) |
| 🖨️ **Print Ready** | Layout cetak A4 presisi (210mm x 297mm) via `@media print` |

---

## 🚀 Quick Start

```bash
# Clone repo
git clone https://github.com/pulba/innvoice.git

# Buka langsung di browser
# Tidak perlu install apapun — zero dependency!
```

Cukup buka file `index.html` di browser favorit Anda.

---

## ☁️ Deployment ke Cloudflare Pages

1. Hubungkan repositori GitHub ini ke **Cloudflare Pages**.
2. Pada **Build configuration**:
   - **Framework preset**: `None`
   - **Build command**: *(kosongkan)*
   - **Build output directory**: `/` *(atau kosongkan)*
3. Klik **Save and Deploy**. Website langsung aktif dalam hitungan detik!

---

## 📁 Struktur File

```
innvoice/
├── index.html                             # Halaman utama invoice
├── style.css                              # Stylesheet responsif modern
├── script.js                              # Logika kalkulasi, scaling, & export
├── logo.webp                              # Logo Pulba Digital
├── favicon.png                            # Favicon browser tab
└── README.md                              # Dokumentasi
```

---

## 🛠️ Tech Stack

- **HTML5** — Struktur semantik
- **CSS3** — CSS Variables, modern grid, flexbox, adaptive scaling
- **JavaScript (Vanilla)** — Kalkulasi, auto-scaling, state management
- **Google Fonts** — Roboto
- **html2canvas** — Export invoice ke PNG (CDN)
- **jsPDF** — PDF support (CDN)

---

## 📄 License

MIT — bebas digunakan dan dimodifikasi.

---

<p align="center">
  Dibuat dengan ❤️ oleh <strong>Pulba Digital</strong>
</p>
