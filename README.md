# Edu Curicula v1.0

**Edu Curicula** adalah LMS/PWA OBE untuk mata kuliah **Kurikulum dan Tren Pendidikan Fisika (PFS125018, 2 SKS)**. Arsitektur mengikuti LMS EduProf/Inovasi Media: Next.js di Vercel, Google Apps Script sebagai backend, Google Sheets sebagai database, Google Drive untuk file, dan TipTap sebagai editor WYSIWYG.

## Fitur utama

- PWA installable di desktop/Android/iOS browser yang mendukung.
- Login NIM/email + PIN; role mahasiswa, dosen, admin.
- Dashboard mahasiswa dan dashboard dosen/admin.
- RPS interaktif 16 pertemuan dan 4 fase learning journey.
- Materi dinamis dari Google Sheets, diedit dosen melalui **WYSIWYG TipTap**.
- **7 Pembelajaran Dipandu Mahasiswa**, kelompok 2 orang; strategi bebas, metode ceramah dilarang sebagai strategi utama.
- **Analisis Kritis 2 Artikel** berbentuk form terstruktur, tanpa upload file.
- **Analisis Program/Kurikulum Pelatihan** berbentuk form terstruktur, tanpa upload file.
- **UTS — Training Needs Analysis & Curriculum Blueprint**, kelompok 4–5 orang.
- **UAS — Final Training Curriculum Design**, kelompok 4–5 orang.
- Workflow proyek: Draft → Submit → Review Dosen → Revisi → Approved → Final Submission → Grade/Feedback.
- Kelompok terpisah untuk sesi dipandu mahasiswa, UTS, dan UAS.
- Gradebook dan feedback dosen.
- Import mahasiswa via Excel.
- Import pembagian kelompok via Excel menggunakan template bawaan.
- Import komentar/nilai dosen via Excel. Komentar dapat diimpor tanpa mengubah nilai.
- Import/export database XLSX.
- Google Drive untuk lampiran submission/proyek.
- Backend verifier `verifyBackendInstallation()` untuk mencegah fungsi Apps Script hilang saat deploy.

## Bobot penilaian

- Pembelajaran Dipandu Mahasiswa: **15%**
- Analisis 2 Artikel: **10%**
- Analisis Program/Kurikulum Pelatihan: **10%**
- UTS Curriculum Blueprint: **25%**
- UAS Final Training Curriculum: **30%**
- Partisipasi: **10%**

## Environment Vercel

Hanya satu environment variable wajib:

```text
APPS_SCRIPT_URL=https://script.google.com/macros/s/XXXXXXXX/exec
```

Set untuk Production, Preview, dan Development.

## Menjalankan lokal

```bash
npm install
npm run dev
```

Build produksi:

```bash
npm run build
```

Salin `.env.example` menjadi `.env.local` untuk development lokal dan isi `APPS_SCRIPT_URL`.

## Struktur backend

Seluruh file pada folder `apps-script/` harus berada dalam satu project Google Apps Script. Jangan hanya menyalin file patch tertentu.

Sebelum deploy Web App jalankan:

```javascript
verifyBackendInstallation()
```

Jika verifikasi berhasil, deploy sebagai Web App dan gunakan URL `/exec` sebagai `APPS_SCRIPT_URL`.
