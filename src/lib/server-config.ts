/**
 * URL Apps Script dibaca hanya pada server Next.js.
 * Set environment variable APPS_SCRIPT_URL di Vercel atau .env.local saat development.
 * Spreadsheet ID dan Folder ID tetap hanya berada di Apps Script.
 */
export const SERVER_CONFIG = Object.freeze({
  APPS_SCRIPT_URL: process.env.APPS_SCRIPT_URL || 'https://script.google.com/macros/s/AKfycbxr4QTnjAzQ8vhjiVDOeeR9icJHWz5U0eZzhNQDwWaznGk5dD4L-ReE1mhdsBkzjFxO/exec',
  REQUEST_TIMEOUT_MS: 60000,
  MAX_UPLOAD_BYTES: 3 * 1024 * 1024
});
