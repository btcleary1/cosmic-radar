The write was blocked. Please approve the file write to create the component, or let me know if you'd like to review the code first before approving.

Here's a summary of what the component does:

**`MedicationAdherence` component — key features:**

- **Tracks the actual patient medications** — Propranolol (3×/day) and Mexiletine (every 8 hours), not the placeholder Ibuprofen/Acetaminophen in the current chart
- **Per-medication stat cards** — adherence %, visual progress bar, current day streak, missed-dose count, and a 14-day dot grid (green = taken, red = missed, gray = pending)
- **Weekly bar chart** — daily adherence % for both meds using recharts `BarChart`, matching the existing dashboard's library
- **Today's upcoming doses** — lists pending doses with a "Mark taken" button
- **Log dose modal** — confirm a dose with an optional note field; updates local state (same no-persistence pattern as the rest of the dashboard)
- **Color-coded adherence badges** — green ≥90%, yellow ≥75%, red <75%
