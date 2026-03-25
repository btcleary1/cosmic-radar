## Purpose

`HealthDashboard` is a Next.js client component serving as a **pediatric cardiac emergency monitoring dashboard** for a specific patient (Ethan Alvarez, age 7, suspected Long QT Syndrome). It's designed for caregivers/parents to track, log, and analyze life-threatening cardiac events.

---

## Data Model

Four core domain types:

| Type | Description |
|---|---|
| `CardiacEvent` | Individual cardiac episodes (arrest, arrhythmia, etc.) with vitals, CPR details, medical response, and parent narrative notes |
| `Patient` | Demographics, care team, medications, recent activity, incident reports |
| `DoctorVisit` | Visit records with personal/doctor notes and diagnoses |
| `TrendAnalysis` | Computed metrics: event frequency, severity trend, primary triggers, AI recommendations |

---

## Structure

**State**
- `mounted` — SSR hydration guard
- `showNewEventForm` / `showVisitForm` — modal visibility
- `selectedTimeRange` — filter for `1week | 1month | 3months | 6months`
- `newEvent` — form state for logging a new cardiac event

**Key computed values** (derived inline, not via `useMemo`):
- `filteredCardiacEvents` — filters hardcoded `allCardiacEvents` by time range
- `trendAnalysis` — calculates CPR frequency, severity ratio, primary triggers, and generates a text "AI analysis" string
- `vitalSignsData` — maps events to chart-ready vitals
- `incidentSeverityData` — groups events into Low/Medium/High for pie chart

**UI Sections** (top to bottom):
1. **Header** — patient name, CPR event badge, critical alert badge, AI Analysis button
2. **Time range selector** — 4 buttons filtering all data below
3. **AI Trend Analysis** — computed summary with 4 stat cards
4. **New Event modal** — full form with event details + structured parent notes (before/during/after)
5. **Charts row** — Vital Signs line chart, Medication Adherence bar chart, Incident Severity pie chart
6. **Cardiac Events Timeline** — scrollable list of filtered events with CPR indicators and expandable parent notes
7. **Sidebar** — Patient Overview, Recent Activity, Care Team, Medications, Incident Reports, AI Recommendations

---

## Notable Characteristics

- **No real persistence** — all data is hardcoded; `handleSaveEvent` just fires an `alert()`
- **"AI analysis"** is entirely rule-based string interpolation, not an actual API call
- `handleAnalyzeWithAI` is also just an `alert()` stub
- The `DoctorVisit` interface and `showVisitForm` state are defined but never rendered
