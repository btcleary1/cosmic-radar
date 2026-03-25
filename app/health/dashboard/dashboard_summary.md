## Health Dashboard — Project Summary

This is a **pediatric cardiac emergency monitoring dashboard** built with Next.js, React, TypeScript, and Tailwind CSS. It's currently configured around a sample patient (Ethan Alvarez, 7 years old, suspected Long QT Syndrome with cardiac arrest history).

---

### Purpose
Track life-threatening cardiac events in real time, coordinate care, and surface AI-powered clinical recommendations to help prevent sudden cardiac death.

---

### Main Sections

| Section | What it does |
|---|---|
| **Cardiac Events Timeline** | Logs arrhythmia, cardiac arrest, and other events with CPR tracking, vitals, and caregiver notes |
| **AI Trend Analysis** | Calculates event frequency/severity trends and auto-generates clinical recommendations (e.g., ICD consult) |
| **Vital Signs & Charts** | Recharts line, bar, and pie charts for vitals, medication adherence, and severity distribution |
| **Care Team** | Directory of multi-specialist team (cardiologist, critical care, genetic counselor) with messaging |
| **Medications** | Current medications (Propranolol, Mexiletine, Emergency Epinephrine) with dosage/frequency |
| **Incident Reports** | Structured reports with severity/status badges |
| **New Event Modal** | Form for logging new cardiac events including EMS response, defibrillator use, and parent observations |

---

### Key Data Models
- `CardiacEvent` — the most detailed type, covering vitals, CPR details, EMS response, and parent notes
- `TrendAnalysis` — computed metrics: event frequency, severity trend, primary triggers, AI narrative
- `Patient` — wraps care team, medications, recent activity, and incident reports

---

### Notable Features
- **CPR-specific tracking** with animated badges and per-week frequency calculation
- **Time-range filtering** (1w / 1m / 3m / 6m) updating all charts and metrics dynamically
- **Parent/caregiver notes** capturing before/during/after event observations
- **Responsive layout** (mobile to 3-column desktop grid)
- All data is currently hardcoded/mock — no backend integration yet
