# StudentBridge — Student Transition Profiles

**Every new student arrives with a story. StudentBridge makes sure their new school knows it.**

StudentBridge is a prototype web app for intentional student transitions between schools: grade-level
moves (elementary → intermediate → middle), and — the hardest case — mid-year transfers. It is
designed to live *inside* Clever or ClassLink, using the rostering, SSO, and district trust that
already exist in EdTech rather than building yet another standalone system.

## The problem

When a student changes schools, the receiving school typically gets a cumulative folder days or
weeks later — grades and test scores, but almost nothing about the student as a learner. Teachers
start from zero. Mid-year transfers are worst: a student can sit in a classroom for weeks while
records crawl through a records-request process, and if they come from out of state, their
"gaps" may just be a different scope and sequence of standards.

## What the prototype shows

Demo scenario: **Riverside Intermediate School** (grades 5–6, Michigan) receives 4th graders from
**Maple Elementary** and sends 6th graders to **Northview Middle School**.

Four personas (choose at the simulated Clever/ClassLink login):

| Persona | Role | What they do in StudentBridge |
|---|---|---|
| Ms. Alvarez | 4th-grade teacher (sending) | Completes a ~7-minute transition profile per student: reading/math/writing levels, work habits, strengths, and "what works for this student" |
| Mrs. Kowalski | 6th-grade teacher (sending) | Same, for 6th graders leaving for middle school; sends transition packets |
| Mr. Okafor | Counselor (receiving) | Reviews the incoming cohort, attaches state testing (M-STEP) and benchmark data, drives the mid-year transfer workflow and records requests |
| Dr. Patel | Principal | Building-level dashboards: cohort readiness, packet completion, transfer status, FERPA access log |

Key features:

- **Teacher academic profiles** — structured, fast, strengths-based; the "what works" field is the heart of the product.
- **Counselor assessment attachment** — M-STEP results with performance levels, NWEA MAP benchmarks, attendance.
- **NWEA MAP auto-import (simulated)** — a "Connected assessment sources" panel on the counselor dashboard syncs waiting MAP results onto profiles in one click; in production this runs automatically after each testing window via NWEA's partner data integration (API / CDF / Ed-Fi). Because the RIT scale is national, MAP history follows mid-year transfers across districts and states.
- **Student voice** — students complete a short "About Me" survey from their own Clever/ClassLink login (how they feel about the move, what excites or worries them, what they want their new teachers to know, how they learn best). Their answers appear on the profile in a Student Voice tab and on the overview. Log in as Malik to see the student experience.
- **Mid-year transfer workflow** — a five-step checklist (enroll → request records → receive → profile → placement ready) with FERPA basis noted at each step.
- **Out-of-state standards comparison** — when a student arrives from TX/FL/OH/IN, StudentBridge shows how that state's standards differ from Michigan's: what the student may not have seen, where they may be ahead, and terminology differences. *A standards gap is not a skills gap.*
- **FERPA by design** — transfer exception (§99.31(a)(2)) and school-officials exception (§99.31(a)(1)) built into the flows; restricted tier for IEP/504/EL detail; a complete access & disclosure log.

All data is fictional. State persists in `localStorage`; use "reset demo data" in the footer to start over.

## Why Clever / ClassLink

- **Zero new accounts**: staff SSO from the portal they already open daily; roles and rosters sync from the SIS (Clever Secure Sync / ClassLink OneRoster).
- **District trust & procurement**: districts already vet and buy through these ecosystems; StudentBridge fits as an app in the Clever Library / ClassLink App Store, or as an acquisition-ready add-on.
- **Cross-district transfers**: both networks cover a large majority of U.S. districts, which is what makes sending a packet to *another district* feasible — the receiving school is probably on one of them.

## Running locally

```bash
npm install
npm run dev      # local dev server
npm run build    # production build → dist/
```

Deploys on Netlify with the included `netlify.toml` (SPA redirect configured).

## Prototype boundaries (what production adds)

- Real Clever/ClassLink OAuth SSO + rostering sync (OneRoster / Secure Sync APIs)
- A real backend with per-district tenancy, encryption at rest, and retention policies
- Cross-district packet exchange with receiving-school verification
- A vetted, maintained standards crosswalk for all 50 states + DC, reviewed by curriculum specialists
- SIS gradebook import, IEP-system integration (e.g., PowerSchool Special Programs), parent-notification hooks
- District data-privacy agreements (FERPA school-official contracts, state student-privacy laws, Student Privacy Pledge)
