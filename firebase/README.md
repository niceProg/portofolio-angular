# Firebase Realtime Database rules

`database.rules.json` holds the security rules for the `countvisportf` database,
which stores nothing but the visitor counter.

## Data shape

```
visitors/
  count            -> number, total unique visitors
  ips/
    <ip>           -> true, one flag per counted visitor
```

`<ip>` is the visitor IP with dots replaced by underscores
(`src/app/core/services/visitor.service.ts`).

## What the rules allow

| Path | Read | Write |
| --- | --- | --- |
| `/` (anything else) | denied | denied |
| `visitors/count` | anyone | only `count + 1`, or `1` when it does not exist |
| `visitors/ips` (the list) | denied | denied |
| `visitors/ips/<ip>` | anyone, one key at a time | create once, value must be `true` |

Consequences worth knowing:

- The counter can only ever go up by one per write. Nobody can reset it to
  zero, delete it, or jump it to an arbitrary number.
- Visitor IPs cannot be listed. Reading requires knowing the exact key, and
  the only answer is `true` or `null`.
- An already recorded IP cannot be overwritten or deleted.
- Everything outside `visitors/` is denied, so a stray path cannot be used as
  free storage.

## What the rules cannot do

The counter is incremented by the browser, so anyone can replay the same write
with a fresh key and inflate it one step at a time. Rules cannot prevent that;
only moving the increment to a trusted backend can. For a portfolio visit
counter this is usually an acceptable trade-off — the point is that the data
cannot be destroyed or harvested.

## Deploying

Console: Firebase Console -> Realtime Database -> Rules, paste the file, and
use the Rules Playground to try a few paths before publishing.

CLI:

```bash
npx firebase-tools deploy --only database
```

That requires a `firebase.json` pointing at this file:

```json
{ "database": { "rules": "firebase/database.rules.json" } }
```

## Privacy note

Raw IP addresses are personal data. If you would rather not store them, hash
the IP in `visitor.service.ts` before using it as a key (for example SHA-256
via `crypto.subtle.digest`, truncated). The rules here keep working unchanged
as long as the hash is written in hex — adjust the `$ip` pattern if you use a
different alphabet.
