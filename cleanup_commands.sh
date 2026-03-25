Here are the commands, organized by priority. Review each section before running — the `cosmic-radar/` step especially needs a decision from you.

---

### 1. Clean root temp/artifact files

```bash
cd /home/btcleary1/CascadeProjects/windsurf-project

# Delete all tree_chunk_* and structure_chunk_* files
rm -f tree_chunk_* structure_chunk_*.md project_tree.json

# Delete swap file if it exists
rm -f .clean_structure.md.swp

# Add patterns to .gitignore
cat >> .gitignore << 'EOF'

# Analysis/temp artifacts
tree_chunk_*
structure_chunk_*.md
project_tree.json
*.swp
tmp/
EOF
```

---

### 2. Delete backup file

```bash
rm app/health/dashboard/page.tsx.bak
```

---

### 3. Move misplaced dashboard docs to `docs/`

```bash
mkdir -p docs
mv app/health/dashboard/dashboard_summary.md docs/
mv app/health/dashboard/page_summary.md docs/
```

---

### 4. Move `health-home.tsx` to `components/health/`

```bash
mkdir -p components/health
mv app/health-home.tsx components/health/health-home.tsx
```

> **Note**: After this, search for any imports of `app/health-home` or `@/app/health-home` and update them to `@/components/health/health-home`.

```bash
grep -r "health-home" app/ components/ --include="*.tsx" --include="*.ts" -l
```

---

### 5. Merge `api/health-check` → `api/health`

The `health-check` route has more complete env checks. Write a merged version into `api/health/route.ts`, then delete `api/health-check/`.

```bash
cat > app/api/health/route.ts << 'EOF'
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  const health = {
    status: 'ok',
    timestamp: new Date().toISOString(),
    env: {
      NODE_ENV: process.env.NODE_ENV,
      VERCEL_URL: process.env.VERCEL_URL ? 'Set' : 'Not set',
      CMC_API_KEY: process.env.CMC_API_KEY ? 'Set' : 'Not set',
      DATABASE_URL: process.env.DATABASE_URL ? 'Set' : 'Not set',
      NEXTAUTH_URL: process.env.NEXTAUTH_URL ? 'Set' : 'Not set',
      NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET ? 'Set' : 'Not set',
      NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL ? 'Set' : 'Not set',
      GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID ? 'Set' : 'Not set',
    },
  };

  return NextResponse.json(health);
}
EOF

rm -rf app/api/health-check
```

---

### 6. `cosmic-radar/` — needs your decision first

**Option A** — Move it entirely out of this repo (recommended if it's a separate project):
```bash
mv cosmic-radar/ ~/CascadeProjects/cosmic-radar
```

**Option B** — Delete it (if it's confirmed stale/abandoned):
```bash
rm -rf cosmic-radar/
```

Don't run either until you decide. Check whether it has unique code not present in the root:
```bash
diff -rq --exclude="node_modules" cosmic-radar/app/ app/ 2>/dev/null | head -30
diff -rq --exclude="node_modules" cosmic-radar/components/ components/ 2>/dev/null | head -30
```

---

### 7. Verify `.gitignore` covers `node_modules`

```bash
grep "node_modules" .gitignore
```

It already has `/node_modules` — that's fine for the root. If `cosmic-radar/node_modules` is tracked, that's another reason to move or delete it.

---

Run the `diff` commands in step 6 first and let me know what you find — I can help interpret whether `cosmic-radar/` is safe to remove or move.
