Here's my analysis:

## Critical Issues

### 1. Duplicate Project: `cosmic-radar/`
The `cosmic-radar/` directory is a near-complete mirror of the root project:
- Identical `app/` structure (all the same API routes, pages)
- Identical `components/` structure (same files)
- Its own `node_modules/` (wasteful, adds massive disk usage)
- Its own doc files (`DEFI_INTEGRATION.md`, `FIXES_APPLIED.md`, etc.)

**Action**: Determine if this is an old version or separate project. If separate, move it out of this repo entirely. If it's the source of truth, flip the structure. Do not maintain two copies.

### 2. Duplicate API Routes: `api/health` vs `api/health-check`
Two health endpoint folders at:
- `app/api/health/route.ts`
- `app/api/health-check/route.ts`

**Action**: Consolidate into one. Keep `api/health` (standard convention), delete or redirect `api/health-check`.

---

## Misplaced Files

| File | Current Location | Should Be |
|---|---|---|
| `health-home.tsx` | `app/health-home.tsx` | `components/health/` or `app/health/` |
| `page.tsx.bak` | `app/health/dashboard/` | Deleted (no backups in source control) |
| `dashboard_summary.md`, `page_summary.md` | `app/health/dashboard/` | `docs/` or deleted |

---

## Root-Level Clutter (from git status)
Dozens of `tree_chunk_*` files, `project_tree.json`, `structure_chunk_aa.md`, `.clean_structure.md.swp` are polluting the root. These appear to be analysis artifacts from this session.

**Action**: Add to `.gitignore` and delete or move to a `tmp/` folder outside the project.

---

## Summary of Priority Actions

1. **Resolve `cosmic-radar/` duplication** — highest impact, likely removes thousands of files
2. **Delete `page.tsx.bak`** — no backup files in source control
3. **Merge `api/health-check` → `api/health`**
4. **Move `app/health-home.tsx`** to `components/health/`
5. **Clean root of `tree_chunk_*` temp files**, add pattern to `.gitignore`
