# Petunjuk Pemasangan Edu Curicula v1.0

## 1. Buat storage baru

Buat:

1. satu Google Spreadsheet kosong;
2. satu folder Google Drive kosong.

Salin ID keduanya.

## 2. Buat project Google Apps Script

Buat project Apps Script baru. Salin **seluruh file** dari folder `apps-script/`:

- Api.gs
- BackendVerify.gs
- Config.gs
- Db.gs
- DriveService.gs
- Security.gs
- Services.gs
- Setup.gs
- StorageConfig.gs
- Web.gs
- appsscript.json

Pada `StorageConfig.gs`, isi:

```javascript
var LMS_STORAGE_CONFIG = {
  SPREADSHEET_ID: 'ID_SPREADSHEET_ANDA',
  ROOT_FOLDER_ID: 'ID_FOLDER_DRIVE_ANDA'
};
```

## 3. Jalankan setup

Run:

```javascript
setupLms()
```

Berikan permission Google saat diminta. Setup otomatis membuat seluruh sheet, header, 16 pertemuan, materi awal, aktivitas, folder Drive, dan akun admin awal.

Execution log akan menampilkan login admin `ADMIN` serta PIN sementara.

## 4. Verifikasi backend

Setelah setup selesai, run:

```javascript
verifyBackendInstallation()
```

Target hasil:

```text
Backend lengkap dan siap dideploy.
```

Jika ada sheet yang hilang, jalankan `repairLms()` lalu verifikasi kembali.

## 5. Deploy Apps Script

Deploy → New deployment → Web app.

- Execute as: **Me**
- Who has access: sesuaikan kebijakan institusi; frontend membutuhkan akses ke endpoint Web App.

Salin URL yang berakhiran `/exec`.

## 6. Deploy frontend ke GitHub + Vercel

Upload seluruh folder Edu Curicula ke repository GitHub.

Di Vercel:

1. Import repository.
2. Framework: Next.js.
3. Tambahkan Environment Variable:

```text
APPS_SCRIPT_URL = URL_WEB_APP_APPS_SCRIPT_ANDA
```

4. Deploy.

Tidak diperlukan `NEXT_PUBLIC_APPS_SCRIPT_URL`.

## 7. Struktur kelompok

Di menu **Kelola → Kelompok**:

- `STUDENT_LED`: tepat **2 mahasiswa**, pertemuan 3, 4, 9, 10, 11, 12, atau 13.
- `UTS_BLUEPRINT`: **4–5 mahasiswa**.
- `UAS_CURRICULUM`: **4–5 mahasiswa**.

Kelompok UTS dan UAS boleh sama atau berbeda. Menu ini mendukung penyusunan manual maupun **Import Excel** memakai `public/templates/import-groups.xlsx`.

## 8. Tugas tanpa upload

`ARTICLE_ANALYSIS` dan `PROGRAM_ANALYSIS` menggunakan form terstruktur. Mahasiswa tidak mengunggah PDF/Word; jawaban disimpan sebagai submission terstruktur dan tetap dapat dinilai, dikomentari, serta direvisi.

## 9. Import komentar dosen melalui Excel

Kelola → Gradebook → pilih aktivitas → **Export untuk Komentar**.

Isi kolom komentar pada Excel, lalu **Import Komentar / Nilai**. Kolom komentar wajib, nilai opsional. Jika nilai dikosongkan, nilai yang sudah ada tidak diubah.

## 10. WYSIWYG

Kelola → Kelola Materi. Materi 16 pertemuan dapat diedit menggunakan TipTap WYSIWYG tanpa mengubah source code.

## Catatan penting

- Gunakan Spreadsheet baru untuk instalasi pertama.
- Jangan menjalankan `setupLms()` berulang kali pada database produksi kecuali Anda memahami seed/upsert yang dilakukan.
- Untuk perbaikan struktur setelah instalasi gunakan `repairLms()`.
- Setelah mengubah Apps Script, buat **New version** pada deployment Web App agar perubahan aktif.
