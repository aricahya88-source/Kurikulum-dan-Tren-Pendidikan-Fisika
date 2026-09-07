# Validation Report — Edu Curicula v1.0

Audit source dilakukan sebelum packaging.

## Hasil

- 45 file TypeScript/TSX: **0 syntax error** melalui TypeScript `transpileModule`.
- 10 file Google Apps Script: **0 syntax error** melalui `node --check` pada salinan JavaScript.
- 53 route pada `Api.gs`: **semua target function ditemukan** di backend.
- Local imports `@/...`: **0 import putus**.
- `npm run lint:content`: **PASS** untuk brand, 16 pertemuan, 7 sesi dipandu mahasiswa, dua tugas analisis, proyek UTS/UAS, aturan tanpa ceramah, dan aset PWA.
- Placeholder storage tetap aman di `StorageConfig.gs`; tidak ada ID Spreadsheet/Drive milik instalasi lain.
- Frontend hanya membutuhkan environment `APPS_SCRIPT_URL`.

## Catatan build

Build Next.js penuh memerlukan dependency npm terpasang. Jalankan `npm install` lalu `npm run build` pada mesin lokal/CI/Vercel. Package menggunakan versi dependency eksplisit di `package.json`.

## Pemeriksaan sebelum deploy backend

Setelah `setupLms()`, jalankan `verifyBackendInstallation()` pada Google Apps Script. Fungsi tersebut memeriksa service utama, storage, seluruh sheet wajib, dan akses folder Drive.
