# Portfolio — Wisnu Yumna Yudhanta

Personal portfolio built with Angular 19 (standalone components, SSR) and
Tailwind CSS, deployed on Vercel at <https://portfolio.yum-dev.com>.

## Getting started

```bash
npm ci
cp .env.example .env    # then fill in the Firebase values
npm start               # http://localhost:4200
```

`npm start`, `npm run build`, `npm run watch` and `npm test` each run
`scripts/set-env.js` first, which writes `src/environments/environments.ts`
from environment variables. That file is generated and gitignored — never
edit or commit it. If a variable is missing the build stops and lists what is
needed, instead of producing a broken bundle.

## Configuration

| Variable | Purpose |
| --- | --- |
| `FIREBASE_*` | Realtime Database config for the visitor counter |
| `API_CHATBOT` | Chat endpoint, defaults to the public backend |

The same names must exist in Vercel under Settings → Environment Variables.
See `.env.example` for the full list.

## Layout

```
src/app/
  core/layout/       header, footer, main layout
  core/services/     visitor counter, chatbot client
  features/          home, about, projects, certificates, chatbot
  pages/not-found/   wildcard route
public/assets/       profile photo, project covers, certificates
firebase/            Realtime Database security rules (see its README)
scripts/set-env.js   generates the environment file at build time
```

## Related repositories

- [`api-chatbot-simplify`](https://github.com/niceProg/api-chatbot-simplify) —
  the chat backend behind `API_CHATBOT`. It also holds `my-profile.json`, the
  single source of truth for what the chatbot knows. Update the CV content
  there, not here.

## Notes

- The Firebase web config ships inside the JS bundle by design. Keeping it in
  environment variables only avoids secret scanning alerts; the actual
  protection is the database rules in `firebase/` plus HTTP referrer
  restrictions on the key.
- Deployment is automatic on push to `main`.
