/**
 * Generates src/environtments/environments.ts from environment variables.
 *
 * Runs automatically before `npm start` and `npm run build` (see the
 * prestart/prebuild scripts in package.json), so the generated file never
 * needs to be committed — it is listed in .gitignore.
 *
 * Locally: copy .env.example to .env and fill in the values.
 * On Vercel: set the same names under Settings -> Environment Variables.
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const TARGET = path.join(ROOT, 'src', 'environtments', 'environments.ts');

/** Minimal .env reader so no extra dependency is needed. */
function loadDotEnv() {
  const envPath = path.join(ROOT, '.env');
  if (!fs.existsSync(envPath)) return;

  for (const rawLine of fs.readFileSync(envPath, 'utf8').split('\n')) {
    const line = rawLine.trim();
    if (!line || line.startsWith('#')) continue;

    const separator = line.indexOf('=');
    if (separator === -1) continue;

    const key = line.slice(0, separator).trim();
    const value = line
      .slice(separator + 1)
      .trim()
      .replace(/^['"]|['"]$/g, '');

    if (!(key in process.env)) process.env[key] = value;
  }
}

const REQUIRED = [
  'FIREBASE_API_KEY',
  'FIREBASE_AUTH_DOMAIN',
  'FIREBASE_DATABASE_URL',
  'FIREBASE_PROJECT_ID',
  'FIREBASE_STORAGE_BUCKET',
  'FIREBASE_MESSAGING_SENDER_ID',
  'FIREBASE_APP_ID',
];

loadDotEnv();

const missing = REQUIRED.filter((name) => !process.env[name]);
if (missing.length > 0) {
  console.error(
    '\n[set-env] Missing environment variables:\n' +
      missing.map((name) => `  - ${name}`).join('\n') +
      '\n\nLocal dev: copy .env.example to .env and fill it in.' +
      '\nVercel: add them under Settings -> Environment Variables.\n'
  );
  process.exit(1);
}

const config = {
  production: process.env['NODE_ENV'] === 'production',
  firebase: {
    apiKey: process.env['FIREBASE_API_KEY'],
    authDomain: process.env['FIREBASE_AUTH_DOMAIN'],
    databaseURL: process.env['FIREBASE_DATABASE_URL'],
    projectId: process.env['FIREBASE_PROJECT_ID'],
    storageBucket: process.env['FIREBASE_STORAGE_BUCKET'],
    messagingSenderId: process.env['FIREBASE_MESSAGING_SENDER_ID'],
    appId: process.env['FIREBASE_APP_ID'],
    measurementId: process.env['FIREBASE_MEASUREMENT_ID'] ?? '',
  },
  apiChatbot:
    process.env['API_CHATBOT'] ?? 'https://chatme.documentme.my.id/api/chat',
};

const contents =
  '// GENERATED FILE - do not edit and do not commit.\n' +
  '// Produced by scripts/set-env.js from environment variables.\n' +
  `export const environment = ${JSON.stringify(config, null, 2)};\n`;

fs.mkdirSync(path.dirname(TARGET), { recursive: true });
fs.writeFileSync(TARGET, contents);

console.log('[set-env] wrote src/environtments/environments.ts');
