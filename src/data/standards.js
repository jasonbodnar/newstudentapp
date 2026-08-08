// ---------------------------------------------------------------------------
// State standards crosswalk (illustrative).
// Michigan uses the Michigan K-12 Academic Standards (Common Core–aligned).
// When a student arrives from another state, this module summarizes how that
// state's standards differ so receiving teachers know what the student has
// likely seen, not seen, or learned under a different name.
//
// NOTE: The comparisons below are representative examples for the prototype.
// A production version would license/maintain a vetted crosswalk per state,
// grade, and subject, reviewed by curriculum specialists.
// ---------------------------------------------------------------------------

export const MI_STANDARDS = {
  name: 'Michigan K-12 Academic Standards',
  basis: 'Common Core–aligned (ELA & Math), Michigan Science Standards (NGSS-based)',
}

export const stateCrosswalk = {
  OH: {
    stateName: 'Ohio',
    standardsName: "Ohio's Learning Standards",
    assessmentName: 'Ohio State Tests (OST)',
    alignment: 'high',
    alignmentLabel: 'High alignment with Michigan',
    summary:
      "Ohio's Learning Standards are Common Core–based, like Michigan's. Scope and sequence are very similar in ELA and Math, so most students transition with few standards-related gaps. Watch pacing differences within the year rather than missing topics.",
    subjects: {
      Math: {
        mayNotHaveSeen: [
          'Little to none at the standards level — content coverage is nearly identical grade-by-grade.',
          'Mid-year movers may have left before a unit Michigan classrooms already finished (order of units varies by district, not by state).',
        ],
        mayBeAhead: [
          'Some Ohio districts introduce fluency benchmarks slightly earlier in grades 4–5.',
        ],
        terminology: [
          'Ohio uses "Ohio\'s Learning Standards" codes (e.g., 5.NF.1) that map one-to-one to Michigan\'s Common Core codes.',
        ],
      },
      ELA: {
        mayNotHaveSeen: [
          'Minimal differences — writing genres and reading standards match Michigan closely.',
        ],
        mayBeAhead: ['Cursive is required in Ohio elementary; Michigan leaves it to districts.'],
        terminology: ['Ohio uses "Reading Informational/Literary" labels identical to Michigan.'],
      },
      'Social Studies': {
        mayNotHaveSeen: [
          'Ohio 4th grade centers on Ohio history and government; Michigan history/geography from our 3rd–4th grade sequence will be new.',
        ],
        mayBeAhead: [],
        terminology: [],
      },
    },
  },

  TX: {
    stateName: 'Texas',
    standardsName: 'Texas Essential Knowledge and Skills (TEKS)',
    assessmentName: 'STAAR',
    alignment: 'low',
    alignmentLabel: 'Significant differences from Michigan',
    summary:
      'Texas never adopted the Common Core; the TEKS have a noticeably different sequence in Math and a different structure in ELA. Expect real, specific gaps AND areas where the student is ahead. A short local placement check in math is strongly recommended.',
    subjects: {
      Math: {
        mayNotHaveSeen: [
          'Grade 5–6 TEKS sequence division of fractions differently — a new 6th grader may not have divided fractions by fractions yet (Michigan expects this by end of 6th).',
          'Michigan (Common Core) emphasizes multiple strategies and visual models (area models, tape diagrams, number lines); Texas students often learned the standard algorithm only and may find "show your thinking with a model" unfamiliar.',
          'Statistical questions and distributions (6.SP) appear later/lighter in TEKS grade 6.',
        ],
        mayBeAhead: [
          'TEKS include a Personal Financial Literacy strand every year (budgets, credit, taxes) — Michigan has no elementary equivalent.',
          'Texas pushes standard algorithms earlier (e.g., multiplication algorithm mastered by grade 4), so computation fluency is often strong.',
          'Data representations (dot plots, stem-and-leaf) start earlier in TEKS.',
        ],
        terminology: [
          '"Strip diagram" (TX) = "tape diagram / bar model" (MI).',
          'STAAR "Meets Grade Level" ≈ M-STEP "Proficient"; "Masters" ≈ "Advanced" (approximate, not an official concordance).',
        ],
      },
      ELA: {
        mayNotHaveSeen: [
          'Michigan\'s tight "cite textual evidence" routines (RL/RI standards) are structured differently in TEKS — students may need explicit modeling of evidence-based short responses.',
          'Research/inquiry expectations are organized differently; collaborative research projects may be new.',
        ],
        mayBeAhead: [
          'TEKS teach genre-specific author\'s craft explicitly and early; students often analyze author\'s purpose confidently.',
          'Spelling patterns/word study remain an explicit strand longer in Texas.',
        ],
        terminology: [
          'TEKS "Response Skills" and "Multiple Genres" strands cover what Michigan splits into Reading Literature vs. Informational Text.',
        ],
      },
      Science: {
        mayNotHaveSeen: [
          'Michigan follows NGSS-based standards (science & engineering practices, phenomena-driven units); Texas TEKS are more content-recall oriented — engineering design tasks may be unfamiliar.',
        ],
        mayBeAhead: ['STAAR Science in grade 5 means recent, test-level review of grade 3–5 content.'],
        terminology: ['NGSS practice language ("develop a model", "construct an explanation") will be new.'],
      },
    },
  },

  FL: {
    stateName: 'Florida',
    standardsName: 'Florida B.E.S.T. Standards',
    assessmentName: 'FAST (Florida Assessment of Student Thinking)',
    alignment: 'moderate',
    alignmentLabel: 'Moderate differences from Michigan',
    summary:
      'Florida replaced Common Core with the B.E.S.T. Standards in 2020. Math is re-sequenced in places and ELA takes a different approach to text selection and writing. Gaps are real but narrower than Texas; check fraction/decimal sequencing in math and evidence-based writing in ELA.',
    subjects: {
      Math: {
        mayNotHaveSeen: [
          'B.E.S.T. shifts some fraction-operation expectations across grades 4–6 — verify where the student is in adding/subtracting unlike denominators (Michigan: grade 5).',
          'Michigan\'s emphasis on multiple representations/strategies may be lighter for B.E.S.T. students (Florida deliberately re-centered standard algorithms).',
        ],
        mayBeAhead: [
          'Standard algorithms are benchmarked earlier under B.E.S.T. — computation is often fluent.',
          'B.E.S.T. includes explicit "Mathematical Thinking & Reasoning" standards students can articulate.',
        ],
        terminology: [
          'Florida codes look like MA.5.NSO.2.1 — they do not map one-to-one to Michigan\'s CC codes.',
          'FAST reports Levels 1–5; Level 3 ≈ on grade level (M-STEP Proficient is a stricter cut in some grades).',
        ],
      },
      ELA: {
        mayNotHaveSeen: [
          'B.E.S.T. de-emphasizes cold-read evidence tasks in favor of studied classic texts — Michigan-style cold passages with evidence citation may need practice.',
        ],
        mayBeAhead: [
          'Strong exposure to classic/canonical literature via the B.E.S.T. book lists.',
          'Explicit civics-integrated reading in Florida elementary grades.',
        ],
        terminology: ['"Benchmarks" (FL) = "standards" (MI); Florida\'s writing modes align loosely with Michigan\'s.'],
      },
    },
  },

  IN: {
    stateName: 'Indiana',
    standardsName: 'Indiana Academic Standards',
    assessmentName: 'ILEARN',
    alignment: 'moderate',
    alignmentLabel: 'Mostly aligned with Michigan',
    summary:
      'Indiana withdrew from Common Core but its replacement standards remain similar in structure and sequence. Expect small pacing differences rather than large gaps.',
    subjects: {
      Math: {
        mayNotHaveSeen: ['Minor re-sequencing in grades 5–6 geometry and statistics.'],
        mayBeAhead: ['Computational fluency benchmarks are comparable or slightly earlier.'],
        terminology: ['ILEARN proficiency levels map roughly onto M-STEP levels.'],
      },
      ELA: {
        mayNotHaveSeen: ['Media literacy standards differ modestly.'],
        mayBeAhead: [],
        terminology: [],
      },
    },
  },
}

export const alignmentMeta = {
  high: { label: 'High alignment', cls: 'align-high' },
  moderate: { label: 'Moderate differences', cls: 'align-mod' },
  low: { label: 'Significant differences', cls: 'align-low' },
}
