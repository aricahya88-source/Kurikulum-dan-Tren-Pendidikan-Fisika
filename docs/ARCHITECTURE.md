# Arsitektur Edu Curicula

Frontend: Next.js 15 + React 19 + TypeScript, deploy di Vercel dan installable sebagai PWA.

Backend: Google Apps Script Web App. Frontend menggunakan route server `/api/gas` sebagai proxy sehingga URL Apps Script disimpan di environment `APPS_SCRIPT_URL`.

Database: Google Sheets.

File storage: Google Drive.

Rich content: TipTap WYSIWYG untuk materi dan project plan.

Workflow utama: autentikasi → learning journey 16 minggu → tugas terstruktur → project planning/review → final submission → gradebook/feedback.
