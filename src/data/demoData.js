// ---------------------------------------------------------------------------
// DEMO DATA ONLY — every student, score, and note in this file is fictional.
// The prototype runs entirely in the browser with no real student records.
// ---------------------------------------------------------------------------

export const schools = {
  maple: {
    id: 'maple',
    name: 'Maple Elementary School',
    grades: 'K–4',
    district: 'Cedar Ridge Community Schools',
    state: 'MI',
  },
  riverside: {
    id: 'riverside',
    name: 'Riverside Intermediate School',
    grades: '5–6',
    district: 'Cedar Ridge Community Schools',
    state: 'MI',
  },
  northview: {
    id: 'northview',
    name: 'Northview Middle School',
    grades: '7–8',
    district: 'Cedar Ridge Community Schools',
    state: 'MI',
  },
}

// Demo personas — in production these accounts come from Clever/ClassLink SSO
// and rostering, so nobody creates or manages accounts inside this app.
export const personas = [
  {
    id: 'alvarez',
    name: 'Ms. Alvarez',
    fullName: 'Maria Alvarez',
    role: 'teacher',
    roleLabel: '4th Grade Teacher',
    school: 'maple',
    description:
      'Sending teacher at Maple Elementary. Completes transition profiles for 4th graders headed to Riverside Intermediate.',
  },
  {
    id: 'kowalski',
    name: 'Mrs. Kowalski',
    fullName: 'Anne Kowalski',
    role: 'teacher',
    roleLabel: '6th Grade Teacher',
    school: 'riverside',
    description:
      'Sending teacher at Riverside. Completes transition profiles for 6th graders headed to Northview Middle School.',
  },
  {
    id: 'okafor',
    name: 'Mr. Okafor',
    fullName: 'David Okafor',
    role: 'counselor',
    roleLabel: 'School Counselor',
    school: 'riverside',
    description:
      'Counselor at Riverside. Reviews the incoming 4th-grade cohort, attaches state testing data, and manages mid-year transfer records.',
  },
  {
    id: 'malik',
    name: 'Malik',
    fullName: 'Malik Turner',
    role: 'student',
    roleLabel: 'Student',
    school: 'maple',
    studentId: 's02',
    description:
      'Student view — a 4th grader at Maple headed to Riverside. Completes a short "About Me" survey that becomes part of his transition profile.',
  },
  {
    id: 'destiny',
    name: 'Destiny',
    fullName: 'Destiny Carver',
    role: 'student',
    roleLabel: 'Student',
    school: 'riverside',
    studentId: 's21',
    description:
      'Student view — a 5th grader who transferred to Riverside mid-year. Her two-week check-in is due: one tap from her portal tile, a few quick questions.',
  },
  {
    id: 'patel',
    name: 'Dr. Patel',
    fullName: 'Sunita Patel',
    role: 'admin',
    roleLabel: 'Principal',
    school: 'riverside',
    description:
      'Principal at Riverside. Sees completion dashboards for incoming and outgoing cohorts, mid-year transfers, and the FERPA access log.',
  },
]

// M-STEP performance levels (Michigan state assessment)
export const MSTEP_LEVELS = {
  1: { name: 'Not Proficient', color: 'level-1' },
  2: { name: 'Partially Proficient', color: 'level-2' },
  3: { name: 'Proficient', color: 'level-3' },
  4: { name: 'Advanced', color: 'level-4' },
}

const SCALE_4 = ['', 'Emerging', 'Developing', 'Consistent', 'Strength']
export const scaleLabel = (n) => SCALE_4[n] || '—'

// ---------------------------------------------------------------------------
// Students
// cohort: 'incoming'    → 4th graders at Maple, arriving at Riverside in fall
//         'outgoing'    → 6th graders at Riverside, leaving for Northview
//         'midyear-in'  → transferring INTO Riverside mid-year
// ---------------------------------------------------------------------------

export const initialStudents = [
  // ---------------- Incoming 4th graders (Maple → Riverside) ----------------
  {
    id: 's01',
    firstName: 'Ava',
    lastName: 'Brooks',
    grade: 4,
    cohort: 'incoming',
    fromSchool: 'maple',
    toSchool: 'riverside',
    homeroom: 'Ms. Alvarez',
    teacherProfile: {
      status: 'complete',
      completedBy: 'Ms. Alvarez',
      completedDate: '2026-05-12',
      reading: {
        level: 'Lexile 820L (above grade level)',
        fluency: 4,
        comprehension: 4,
        notes:
          'Voracious reader — finished the entire Percy Jackson series this year. Ready for literature circles with rich discussion.',
      },
      math: {
        fluency: 3,
        problemSolving: 4,
        notes:
          'Strong conceptual thinker. Multi-digit multiplication is solid; division fact recall is still building.',
      },
      writing: {
        notes:
          'Writes well-organized paragraphs with strong voice. Working on revising rather than "one-and-done" drafts.',
      },
      workHabits: { organization: 4, focus: 4, independence: 4, participation: 3 },
      interests: 'Greek mythology (thanks, Percy Jackson), soccer, and creative writing — she runs a lunchtime story club.',
      strengths: 'Curious, self-directed, strong leader in small groups.',
      growthAreas: 'Can be reluctant to share in whole-class discussion.',
      whatWorks:
        'Give her a role (discussion leader, recorder). Thrives on choice reading and open-ended problems.',
    },
    assessments: {
      status: 'complete',
      attachedBy: 'Maple counselor (via record exchange)',
      mstep: [
        { year: '2025–26', grade: 4, subject: 'ELA', scaleScore: 1442, level: 4 },
        { year: '2025–26', grade: 4, subject: 'Math', scaleScore: 1421, level: 3 },
        { year: '2024–25', grade: 3, subject: 'ELA', scaleScore: 1338, level: 4 },
        { year: '2024–25', grade: 3, subject: 'Math', scaleScore: 1315, level: 3 },
      ],
      map: [
        { term: 'Spring 2026', subject: 'Reading', rit: 214, percentile: 88 },
        { term: 'Spring 2026', subject: 'Math', rit: 209, percentile: 74 },
      ],
      attendance: { rate: 97, absences: 5, tardies: 1 },
    },
    supports: { iep: false, plan504: false, el: false, summary: null },
    studentVoice: {
      completedDate: '2026-05-20',
      feeling: 4,
      excited: "The bigger library! And getting to switch classes — it feels more grown up.",
      nervous: "Getting lost trying to find my classroom on the first day.",
      teachersShouldKnow: "I love picking my own books. Reading logs where we all read the same thing are boring for me.",
      proudOf: "I wrote a 40-page story this year and read it to the class.",
      learnBest: ['A quiet space', 'Working alone', 'With one partner'],
      favoriteSubjects: ['Reading', 'Writing'],
    },
    priorState: null,
  },
  {
    id: 's02',
    firstName: 'Malik',
    lastName: 'Turner',
    grade: 4,
    cohort: 'incoming',
    fromSchool: 'maple',
    toSchool: 'riverside',
    homeroom: 'Ms. Alvarez',
    teacherProfile: {
      status: 'complete',
      completedBy: 'Ms. Alvarez',
      completedDate: '2026-05-14',
      reading: {
        level: 'Lexile 560L (approaching grade level)',
        fluency: 2,
        comprehension: 3,
        notes:
          'Comprehension outpaces decoding — understands read-alouds at a high level. Made a full year of growth with Tier 2 reading support; keep it going.',
      },
      math: {
        fluency: 3,
        problemSolving: 3,
        notes: 'Solid across the board. Enjoys math and volunteers to explain thinking at the board.',
      },
      writing: {
        notes: 'Great ideas, but getting them on paper is effortful. Graphic organizers help a lot.',
      },
      workHabits: { organization: 2, focus: 3, independence: 3, participation: 4 },
      interests: 'Basketball above all — knows every Pistons stat. Also loves cooking with his grandmother.',
      strengths: 'Positive, resilient, great sense of humor, strong mental math.',
      growthAreas: 'Organization — desk, folder, and backpack systems need external structure.',
      whatWorks:
        'Seat near the front. A weekly folder clean-out routine. He responds extremely well to specific, private praise.',
    },
    assessments: {
      status: 'complete',
      attachedBy: 'Maple counselor (via record exchange)',
      mstep: [
        { year: '2025–26', grade: 4, subject: 'ELA', scaleScore: 1389, level: 2 },
        { year: '2025–26', grade: 4, subject: 'Math', scaleScore: 1413, level: 3 },
        { year: '2024–25', grade: 3, subject: 'ELA', scaleScore: 1281, level: 2 },
        { year: '2024–25', grade: 3, subject: 'Math', scaleScore: 1309, level: 3 },
      ],
      map: [
        { term: 'Spring 2026', subject: 'Reading', rit: 196, percentile: 38 },
        { term: 'Spring 2026', subject: 'Math', rit: 205, percentile: 62 },
      ],
      attendance: { rate: 94, absences: 10, tardies: 4 },
    },
    supports: {
      iep: false,
      plan504: false,
      el: false,
      summary: 'Tier 2 reading intervention (decoding/fluency), 3×/week since January. Recommend continuing in 5th.',
    },
    priorState: null,
  },
  {
    id: 's03',
    firstName: 'Sofia',
    lastName: 'Nguyen',
    grade: 4,
    cohort: 'incoming',
    fromSchool: 'maple',
    toSchool: 'riverside',
    homeroom: 'Ms. Alvarez',
    teacherProfile: {
      status: 'complete',
      completedBy: 'Ms. Alvarez',
      completedDate: '2026-05-13',
      reading: {
        level: 'Lexile 700L (at grade level)',
        fluency: 3,
        comprehension: 3,
        notes: 'Steady, on-grade-level reader. Prefers nonfiction — animals and space especially.',
      },
      math: {
        fluency: 4,
        problemSolving: 4,
        notes:
          'Strongest math student in my class. Finished our accelerated track packet; would benefit from an advanced math group in 5th.',
      },
      writing: { notes: 'Concise and accurate; working on elaboration and detail.' },
      workHabits: { organization: 4, focus: 4, independence: 4, participation: 2 },
      interests: 'Space and astronomy, origami, and chess — taught half the class to play this year.',
      strengths: 'Exceptional quantitative reasoning; meticulous work.',
      growthAreas: 'Very quiet — will not ask for help even when she needs it.',
      whatWorks:
        'Check in privately rather than calling on her cold. Pair with one trusted partner before group work.',
    },
    assessments: {
      status: 'complete',
      attachedBy: 'Maple counselor (via record exchange)',
      mstep: [
        { year: '2025–26', grade: 4, subject: 'ELA', scaleScore: 1418, level: 3 },
        { year: '2025–26', grade: 4, subject: 'Math', scaleScore: 1456, level: 4 },
        { year: '2024–25', grade: 3, subject: 'ELA', scaleScore: 1312, level: 3 },
        { year: '2024–25', grade: 3, subject: 'Math', scaleScore: 1352, level: 4 },
      ],
      map: [
        { term: 'Spring 2026', subject: 'Reading', rit: 205, percentile: 63 },
        { term: 'Spring 2026', subject: 'Math', rit: 223, percentile: 96 },
      ],
      attendance: { rate: 99, absences: 2, tardies: 0 },
    },
    supports: { iep: false, plan504: false, el: false, summary: null },
    priorState: null,
  },
  {
    id: 's04',
    firstName: 'Jayden',
    lastName: 'Miller',
    grade: 4,
    cohort: 'incoming',
    fromSchool: 'maple',
    toSchool: 'riverside',
    homeroom: 'Ms. Alvarez',
    teacherProfile: {
      status: 'complete',
      completedBy: 'Ms. Alvarez',
      completedDate: '2026-05-15',
      reading: {
        level: 'Lexile 480L (below grade level)',
        fluency: 2,
        comprehension: 2,
        notes:
          'Reading is hard work for Jayden, and he knows it. Decoding multisyllabic words is the biggest barrier. He shines with audiobooks paired with text.',
      },
      math: {
        fluency: 2,
        problemSolving: 3,
        notes:
          'Understands concepts when they are concrete/visual. Word problems are tough because of the reading load — read them aloud and he does fine.',
      },
      writing: { notes: 'Dictation and speech-to-text unlock much stronger ideas than handwriting shows.' },
      workHabits: { organization: 3, focus: 2, independence: 2, participation: 3 },
      interests: 'Anything with an engine — dirt bikes, tractors, how things work. Also fishing with his dad and LEGO builds.',
      strengths: 'Kind, hard-working, mechanically gifted — the class expert on anything hands-on.',
      growthAreas: 'Confidence. He shuts down if he feels singled out about reading.',
      whatWorks:
        'Never ask him to read aloud unrehearsed. Preview texts, use audio supports, and celebrate effort privately. His IEP accommodations genuinely work when used consistently.',
    },
    assessments: {
      status: 'complete',
      attachedBy: 'Maple counselor (via record exchange)',
      mstep: [
        { year: '2025–26', grade: 4, subject: 'ELA', scaleScore: 1362, level: 1 },
        { year: '2025–26', grade: 4, subject: 'Math', scaleScore: 1391, level: 2 },
        { year: '2024–25', grade: 3, subject: 'ELA', scaleScore: 1259, level: 1 },
        { year: '2024–25', grade: 3, subject: 'Math', scaleScore: 1288, level: 2 },
      ],
      map: [
        { term: 'Spring 2026', subject: 'Reading', rit: 186, percentile: 14 },
        { term: 'Spring 2026', subject: 'Math', rit: 198, percentile: 41 },
      ],
      attendance: { rate: 95, absences: 8, tardies: 2 },
    },
    supports: {
      iep: true,
      plan504: false,
      el: false,
      summary:
        'IEP — Specific Learning Disability (reading). Accommodations: audio texts, extended time, reduced reading load on assessments, speech-to-text for writing. Annual review scheduled Oct 2026. Case manager: J. Whitfield.',
    },
    studentVoice: {
      completedDate: '2026-05-22',
      feeling: 2,
      excited: "STEM class and recess. I heard 5th grade builds rockets.",
      nervous: "Reading out loud in front of kids I don't know.",
      teachersShouldKnow: "Please don't call on me to read out loud without letting me practice first. I'm really good at building and fixing things.",
      proudOf: "I fixed my neighbor's bike chain and brakes all by myself.",
      learnBest: ['Hands-on projects', 'Moving around', 'Extra time to finish'],
      favoriteSubjects: ['Science', 'Math', 'PE'],
    },
    priorState: null,
  },
  {
    id: 's05',
    firstName: 'Harper',
    lastName: 'Lindqvist',
    grade: 4,
    cohort: 'incoming',
    fromSchool: 'maple',
    toSchool: 'riverside',
    homeroom: 'Ms. Alvarez',
    teacherProfile: { status: 'not-started' },
    assessments: {
      status: 'complete',
      attachedBy: 'Maple counselor (via record exchange)',
      mstep: [
        { year: '2025–26', grade: 4, subject: 'ELA', scaleScore: 1408, level: 3 },
        { year: '2025–26', grade: 4, subject: 'Math', scaleScore: 1404, level: 3 },
        { year: '2024–25', grade: 3, subject: 'ELA', scaleScore: 1305, level: 3 },
        { year: '2024–25', grade: 3, subject: 'Math', scaleScore: 1301, level: 3 },
      ],
      map: [
        { term: 'Spring 2026', subject: 'Reading', rit: 203, percentile: 57 },
        { term: 'Spring 2026', subject: 'Math', rit: 202, percentile: 55 },
      ],
      attendance: { rate: 98, absences: 4, tardies: 0 },
    },
    supports: { iep: false, plan504: false, el: false, summary: null },
    priorState: null,
  },
  {
    id: 's06',
    firstName: 'Omar',
    lastName: 'Hassan',
    grade: 4,
    cohort: 'incoming',
    fromSchool: 'maple',
    toSchool: 'riverside',
    homeroom: 'Ms. Alvarez',
    teacherProfile: { status: 'not-started' },
    assessments: {
      status: 'pending',
      attachedBy: null,
      mstep: [
        { year: '2024–25', grade: 3, subject: 'ELA', scaleScore: 1294, level: 2 },
        { year: '2024–25', grade: 3, subject: 'Math', scaleScore: 1322, level: 3 },
      ],
      map: [
        { term: 'Winter 2026', subject: 'Reading', rit: 194, percentile: 34 },
        { term: 'Winter 2026', subject: 'Math', rit: 207, percentile: 68 },
      ],
      attendance: { rate: 96, absences: 7, tardies: 3 },
    },
    supports: {
      iep: false,
      plan504: false,
      el: true,
      summary:
        'English Learner — WIDA overall 3.8 (expanding). Exited from pull-out ESL this spring; monitor status for two years per state policy.',
    },
    priorState: null,
  },

  // ---------------- Outgoing 6th graders (Riverside → Northview) ----------------
  {
    id: 's11',
    firstName: 'Ella',
    lastName: 'Fitzgerald',
    grade: 6,
    cohort: 'outgoing',
    fromSchool: 'riverside',
    toSchool: 'northview',
    homeroom: 'Mrs. Kowalski',
    packetStatus: 'sent',
    packetSentDate: '2026-06-02',
    teacherProfile: {
      status: 'complete',
      completedBy: 'Mrs. Kowalski',
      completedDate: '2026-05-20',
      reading: {
        level: 'Lexile 1010L (above grade level)',
        fluency: 4,
        comprehension: 4,
        notes: 'Ready for advanced ELA. Strong analytical writer.',
      },
      math: {
        fluency: 3,
        problemSolving: 3,
        notes: 'On track for Pre-Algebra readiness. Ratios and proportional reasoning are solid.',
      },
      writing: { notes: 'Excellent essayist; cite-evidence habits are well established.' },
      workHabits: { organization: 3, focus: 4, independence: 4, participation: 4 },
      interests: 'Theater (lead in the spring musical), historical fiction, and debate — she watches mock trial videos for fun.',
      strengths: 'Debate-team ready — articulate and well-read.',
      growthAreas: 'Perfectionism; can spiral on timed tasks.',
      whatWorks: 'Clear rubrics up front. Remind her a first draft is allowed to be rough.',
    },
    assessments: {
      status: 'complete',
      attachedBy: 'Mr. Okafor',
      mstep: [
        { year: '2025–26', grade: 6, subject: 'ELA', scaleScore: 1634, level: 4 },
        { year: '2025–26', grade: 6, subject: 'Math', scaleScore: 1615, level: 3 },
        { year: '2024–25', grade: 5, subject: 'ELA', scaleScore: 1528, level: 4 },
        { year: '2024–25', grade: 5, subject: 'Math', scaleScore: 1511, level: 3 },
      ],
      map: [
        { term: 'Spring 2026', subject: 'Reading', rit: 228, percentile: 90 },
        { term: 'Spring 2026', subject: 'Math', rit: 222, percentile: 72 },
      ],
      attendance: { rate: 98, absences: 4, tardies: 1 },
    },
    supports: { iep: false, plan504: false, el: false, summary: null },
    priorState: null,
  },
  {
    id: 's12',
    firstName: 'Carlos',
    lastName: 'Reyes',
    grade: 6,
    cohort: 'outgoing',
    fromSchool: 'riverside',
    toSchool: 'northview',
    homeroom: 'Mrs. Kowalski',
    packetStatus: 'ready',
    teacherProfile: {
      status: 'complete',
      completedBy: 'Mrs. Kowalski',
      completedDate: '2026-05-28',
      reading: {
        level: 'Lexile 880L (at grade level)',
        fluency: 3,
        comprehension: 3,
        notes: 'Reads at grade level; loves graphic novels and sports biographies.',
      },
      math: {
        fluency: 2,
        problemSolving: 2,
        notes:
          'Fraction operations remain shaky and it is affecting ratio work. Recommend a math support block in 7th — he made real progress in our Tier 2 group this spring.',
      },
      writing: { notes: 'Improving. Needs sentence starters and structure for longer pieces.' },
      workHabits: { organization: 2, focus: 3, independence: 2, participation: 3 },
      interests: 'Soccer and FIFA, sneaker design — he sketches custom shoes in his free time and knows the whole history of Air Jordans.',
      strengths: 'Great teammate, natural mentor to younger students, strong verbal reasoning.',
      growthAreas: 'Math confidence and homework completion.',
      whatWorks:
        'Homework started in class with a check-in before he leaves. Positive calls home have been game-changing for motivation.',
    },
    assessments: {
      status: 'complete',
      attachedBy: 'Mr. Okafor',
      mstep: [
        { year: '2025–26', grade: 6, subject: 'ELA', scaleScore: 1601, level: 3 },
        { year: '2025–26', grade: 6, subject: 'Math', scaleScore: 1568, level: 2 },
        { year: '2024–25', grade: 5, subject: 'ELA', scaleScore: 1502, level: 3 },
        { year: '2024–25', grade: 5, subject: 'Math', scaleScore: 1477, level: 2 },
      ],
      map: [
        { term: 'Spring 2026', subject: 'Reading', rit: 216, percentile: 55 },
        { term: 'Spring 2026', subject: 'Math', rit: 209, percentile: 33 },
      ],
      attendance: { rate: 93, absences: 12, tardies: 6 },
    },
    supports: {
      iep: false,
      plan504: false,
      el: false,
      summary: 'Tier 2 math intervention Jan–Jun 2026. Recommend continued support block at Northview.',
    },
    priorState: null,
  },
  {
    id: 's13',
    firstName: 'Zoe',
    lastName: 'Washington',
    grade: 6,
    cohort: 'outgoing',
    fromSchool: 'riverside',
    toSchool: 'northview',
    homeroom: 'Mrs. Kowalski',
    packetStatus: 'blocked',
    teacherProfile: { status: 'in-progress', completedBy: 'Mrs. Kowalski' },
    assessments: {
      status: 'complete',
      attachedBy: 'Mr. Okafor',
      mstep: [
        { year: '2025–26', grade: 6, subject: 'ELA', scaleScore: 1622, level: 3 },
        { year: '2025–26', grade: 6, subject: 'Math', scaleScore: 1640, level: 4 },
        { year: '2024–25', grade: 5, subject: 'ELA', scaleScore: 1519, level: 3 },
        { year: '2024–25', grade: 5, subject: 'Math', scaleScore: 1540, level: 4 },
      ],
      map: [
        { term: 'Spring 2026', subject: 'Reading', rit: 221, percentile: 70 },
        { term: 'Spring 2026', subject: 'Math', rit: 231, percentile: 92 },
      ],
      attendance: { rate: 97, absences: 5, tardies: 2 },
    },
    supports: {
      iep: false,
      plan504: true,
      el: false,
      summary: '504 Plan — ADHD. Preferential seating, movement breaks, chunked assignments, extended time.',
    },
    priorState: null,
  },
  {
    id: 's14',
    firstName: 'Liam',
    lastName: "O'Connor",
    grade: 6,
    cohort: 'outgoing',
    fromSchool: 'riverside',
    toSchool: 'northview',
    homeroom: 'Mrs. Kowalski',
    packetStatus: 'blocked',
    teacherProfile: { status: 'not-started' },
    assessments: {
      status: 'complete',
      attachedBy: 'Mr. Okafor',
      mstep: [
        { year: '2025–26', grade: 6, subject: 'ELA', scaleScore: 1590, level: 2 },
        { year: '2025–26', grade: 6, subject: 'Math', scaleScore: 1605, level: 3 },
        { year: '2024–25', grade: 5, subject: 'ELA', scaleScore: 1495, level: 2 },
        { year: '2024–25', grade: 5, subject: 'Math', scaleScore: 1508, level: 3 },
      ],
      map: [
        { term: 'Spring 2026', subject: 'Reading', rit: 211, percentile: 43 },
        { term: 'Spring 2026', subject: 'Math', rit: 217, percentile: 58 },
      ],
      attendance: { rate: 91, absences: 15, tardies: 8 },
    },
    supports: { iep: false, plan504: false, el: false, summary: null },
    priorState: null,
  },

  // ---------------- Mid-year transfers INTO Riverside ----------------
  {
    id: 's21',
    firstName: 'Destiny',
    lastName: 'Carver',
    grade: 5,
    cohort: 'midyear-in',
    fromSchool: null,
    fromSchoolName: 'Whitmer Elementary (Toledo, OH)',
    toSchool: 'riverside',
    homeroom: 'Unassigned',
    enrolledDate: '2026-01-12',
    checkIn: { dueDate: '2026-01-26', status: 'due' },
    studentVoice: {
      completedDate: '2026-01-22',
      feeling: 3,
      excited: "Making new friends. I've moved before so I know how to do this part.",
      nervous: "Being behind in math because we moved in the middle of a unit. I don't want kids to think I'm not smart.",
      teachersShouldKnow: "This is my third school in three years. I'm okay, but it helps when a teacher checks in with me the first week.",
      proudOf: "Being brave. Moving is hard and I keep doing it.",
      learnBest: ['With one partner', 'Seeing examples first'],
      favoriteSubjects: ['Writing', 'Art'],
    },
    priorState: 'OH',
    transfer: {
      steps: {
        enrolled: { done: true, date: '2026-01-12' },
        recordsRequested: { done: true, date: '2026-01-12' },
        recordsReceived: { done: true, date: '2026-01-16' },
        profileReceived: { done: true, date: '2026-01-16' },
        placementReady: { done: true, date: '2026-01-20' },
      },
    },
    teacherProfile: {
      status: 'complete',
      completedBy: 'Sending teacher (Whitmer Elem., via StudentBridge exchange)',
      completedDate: '2026-01-15',
      reading: {
        level: 'DRA 40 / ~Lexile 650L (at grade level)',
        fluency: 3,
        comprehension: 3,
        notes: 'Solid reader. Was in our top guided-reading group.',
      },
      math: {
        fluency: 3,
        problemSolving: 2,
        notes:
          'Computation is strong. Multi-step word problems were our current focus when she left — mid-unit on adding fractions with unlike denominators.',
      },
      writing: { notes: 'Organized writer, loves personal narrative.' },
      workHabits: { organization: 3, focus: 3, independence: 3, participation: 3 },
      interests: 'Art (especially manga-style drawing), volleyball, and animals — she volunteers at a shelter and wants to be a vet.',
      strengths: 'Adapts quickly, makes friends easily, strong self-advocate.',
      growthAreas: 'This is her third school in three years — watch for gaps from moving mid-unit.',
      whatWorks: 'A buddy on day one and a predictable routine. She will tell you what she needs if you ask.',
    },
    assessments: {
      status: 'complete',
      attachedBy: 'Mr. Okafor',
      outOfState: true,
      priorAssessments: [
        { year: '2024–25', grade: 4, subject: 'ELA', test: "Ohio State Test (OST)", result: 'Proficient (712)' },
        { year: '2024–25', grade: 4, subject: 'Math', test: "Ohio State Test (OST)", result: 'Accomplished (684)' },
      ],
      mstep: [],
      map: [{ term: 'Winter 2026 (local screener)', subject: 'Reading', rit: 207, percentile: 61 },
            { term: 'Winter 2026 (local screener)', subject: 'Math', rit: 210, percentile: 66 }],
      attendance: { rate: 95, absences: 8, tardies: 1 },
    },
    supports: { iep: false, plan504: false, el: false, summary: null },
  },
  {
    id: 's22',
    firstName: 'Mateo',
    lastName: 'Vega',
    grade: 6,
    cohort: 'midyear-in',
    fromSchool: null,
    fromSchoolName: 'Lakewood Elementary (Dallas, TX)',
    toSchool: 'riverside',
    homeroom: 'Unassigned',
    enrolledDate: '2026-02-03',
    priorState: 'TX',
    checkIn: {
      dueDate: '2026-02-17',
      status: 'completed',
      completedDate: '2026-02-19',
      responses: {
        overall: 2,
        friends: 'Not yet',
        classes: 'Too hard',
        adultNote: "Math is really different here. I don't want to ask questions in front of everyone.",
      },
    },
    transfer: {
      steps: {
        enrolled: { done: true, date: '2026-02-03' },
        recordsRequested: { done: true, date: '2026-02-03' },
        recordsReceived: { done: true, date: '2026-02-10' },
        profileReceived: { done: false },
        placementReady: { done: false },
      },
    },
    teacherProfile: { status: 'not-started' },
    assessments: {
      status: 'complete',
      attachedBy: 'Mr. Okafor',
      outOfState: true,
      priorAssessments: [
        { year: '2024–25', grade: 5, subject: 'ELA (Reading)', test: 'STAAR', result: 'Meets Grade Level' },
        { year: '2024–25', grade: 5, subject: 'Math', test: 'STAAR', result: 'Approaches Grade Level' },
        { year: '2024–25', grade: 5, subject: 'Science', test: 'STAAR', result: 'Meets Grade Level' },
      ],
      mstep: [],
      map: [],
      attendance: { rate: 92, absences: 6, tardies: 2 },
    },
    supports: {
      iep: false,
      plan504: false,
      el: true,
      summary:
        'EL services in Texas (TELPAS Advanced). Michigan WIDA screener scheduled. Family speaks Spanish at home; interpreter requested for conferences.',
    },
  },
  {
    id: 's23',
    firstName: 'Brianna',
    lastName: 'Sokolov',
    grade: 5,
    cohort: 'midyear-in',
    fromSchool: null,
    fromSchoolName: 'Pine Trails Elementary (Orlando, FL)',
    toSchool: 'riverside',
    homeroom: 'Unassigned',
    enrolledDate: '2026-03-18',
    priorState: 'FL',
    transfer: {
      steps: {
        enrolled: { done: true, date: '2026-03-18' },
        recordsRequested: { done: true, date: '2026-03-18' },
        recordsReceived: { done: false },
        profileReceived: { done: false },
        placementReady: { done: false },
      },
    },
    teacherProfile: { status: 'not-started' },
    assessments: {
      status: 'pending',
      attachedBy: null,
      outOfState: true,
      priorAssessments: [],
      mstep: [],
      map: [],
      attendance: null,
    },
    supports: { iep: null, plan504: null, el: null, summary: 'Unknown — awaiting records from sending school.' },
  },
]

// Seed FERPA access log (every disclosure/view is recorded)
export const initialAuditLog = [
  {
    ts: '2026-06-02 09:14',
    user: 'Mrs. Kowalski (Teacher, Riverside)',
    action: 'Sent transition packet',
    student: 'Ella Fitzgerald',
    detail: 'Disclosed to Northview Middle School under FERPA §99.31(a)(2) (transfer exception)',
  },
  {
    ts: '2026-05-28 14:02',
    user: 'Mr. Okafor (Counselor, Riverside)',
    action: 'Attached assessment data',
    student: 'Carlos Reyes',
    detail: 'M-STEP 2025–26 results added to transition profile',
  },
  {
    ts: '2026-03-18 10:45',
    user: 'Mr. Okafor (Counselor, Riverside)',
    action: 'Records request sent',
    student: 'Brianna Sokolov',
    detail: 'Request to Pine Trails Elementary (Orlando, FL) — FERPA transfer exception, no consent required',
  },
  {
    ts: '2026-02-19 15:12',
    user: 'Mateo Vega (Student)',
    action: 'Two-week check-in completed',
    student: 'Mateo Vega',
    detail: 'Responses flagged for follow-up — routed to homeroom teacher and counselor automatically',
  },
  {
    ts: '2026-02-10 08:30',
    user: 'Mr. Okafor (Counselor, Riverside)',
    action: 'Records received',
    student: 'Mateo Vega',
    detail: 'STAAR results + enrollment records from Lakewood Elementary (Dallas, TX)',
  },
]

// ---------------------------------------------------------------------------
// Simulated NWEA MAP Growth integration.
// In production, StudentBridge connects to NWEA as an authorized data partner
// (partner API / Comprehensive Data File / Ed-Fi) under the district's existing
// data-sharing agreement, and results land on profiles automatically after each
// testing window. These are the results "waiting in NWEA" for the demo's
// one-click sync. Because the RIT scale is national, MAP history follows a
// student across districts and states — including mid-year transfers.
export const nweaPending = {
  s06: {
    // Omar's spring window results — the missing piece keeping him "pending"
    rows: [
      { term: 'Spring 2026', subject: 'Reading', rit: 199, percentile: 42, source: 'nwea' },
      { term: 'Spring 2026', subject: 'Math', rit: 211, percentile: 74, source: 'nwea' },
    ],
    markComplete: true,
    note: 'Spring 2026 window results',
  },
  s22: {
    // Mateo tested with MAP in Dallas — same RIT scale, directly comparable
    rows: [
      { term: 'Fall 2025 (Dallas ISD)', subject: 'Reading', rit: 213, percentile: 52, source: 'nwea' },
      { term: 'Fall 2025 (Dallas ISD)', subject: 'Math', rit: 207, percentile: 37, source: 'nwea' },
    ],
    markComplete: true,
    note: 'Prior-district MAP history (both districts test with NWEA)',
  },
  s23: {
    rows: [
      { term: 'Fall 2025 (Orange County, FL)', subject: 'Reading', rit: 201, percentile: 48, source: 'nwea' },
      { term: 'Fall 2025 (Orange County, FL)', subject: 'Math', rit: 199, percentile: 43, source: 'nwea' },
    ],
    markComplete: false, // paper records from FL still outstanding
    note: 'Prior-district MAP history — arrived before her paper records did',
  },
}

export const studentName = (s) => `${s.firstName} ${s.lastName}`

export const profileStatusMeta = {
  complete: { label: 'Complete', cls: 'ok' },
  'in-progress': { label: 'In progress', cls: 'warn' },
  'not-started': { label: 'Not started', cls: 'todo' },
}
