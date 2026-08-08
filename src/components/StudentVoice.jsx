import { useState } from 'react'
import { studentName, schools } from '../data/demoData.js'

export const FEELINGS = {
  4: { emoji: '😄', label: 'Excited!' },
  3: { emoji: '🙂', label: 'Mostly excited' },
  2: { emoji: '😐', label: 'A mix of both' },
  1: { emoji: '😟', label: 'Pretty nervous' },
}

export const LEARN_OPTIONS = [
  'Working alone',
  'With one partner',
  'In a small group',
  'Hands-on projects',
  'Moving around',
  'A quiet space',
  'Seeing examples first',
  'Extra time to finish',
]

export const SUBJECT_OPTIONS = ['Reading', 'Writing', 'Math', 'Science', 'Social Studies', 'Art', 'Music', 'PE']

/* ---------- two-week check-in ---------- */

export const CHECKIN_OVERALL = {
  4: { emoji: '😄', label: 'Great!' },
  3: { emoji: '🙂', label: 'Pretty good' },
  2: { emoji: '😐', label: 'Okay, I guess' },
  1: { emoji: '😟', label: 'Not so good' },
}

export function checkInFlags(responses) {
  if (!responses) return []
  const flags = []
  if (responses.overall <= 2) flags.push('Not feeling good about school yet')
  if (responses.friends === 'Not yet') flags.push('No friend group yet')
  if (responses.classes === 'Too hard') flags.push('Classes feel too hard')
  if (responses.classes === 'Too easy') flags.push('Classes feel too easy')
  if (responses.adultNote?.trim()) flags.push('Left a note for an adult')
  return flags
}

/* ---------- read-only view, shown to staff on the profile ---------- */
export function StudentVoiceView({ student }) {
  const v = student.studentVoice
  if (!v) {
    return (
      <div className="empty">
        {student.firstName} hasn't completed the "About Me" survey yet. Students complete it from their
        own Clever/ClassLink login — about 5 minutes, done in class or at home.
      </div>
    )
  }
  const f = FEELINGS[v.feeling]
  return (
    <>
      <div className="callout ferpa">
        <b>In {student.firstName}'s own words.</b> Completed {v.completedDate}. Students know their
        answers are shared with their new teachers — that's the point.
      </div>
      <div className="kv-grid" style={{ marginBottom: 12 }}>
        <div className="kv">
          <div className="k">How I feel about my new school</div>
          <div className="v">{f ? `${f.emoji} ${f.label}` : '—'}</div>
        </div>
        <div className="kv">
          <div className="k">I learn best…</div>
          <div className="v" style={{ fontSize: 13, fontWeight: 600 }}>{v.learnBest?.length ? v.learnBest.join(' · ') : '—'}</div>
        </div>
        <div className="kv">
          <div className="k">Favorite subjects</div>
          <div className="v" style={{ fontSize: 13, fontWeight: 600 }}>{v.favoriteSubjects?.length ? v.favoriteSubjects.join(' · ') : '—'}</div>
        </div>
      </div>
      {v.excited && <div className="note-block" style={{ borderLeftColor: 'var(--green)' }}><div className="nb-label">What I'm excited about</div>{v.excited}</div>}
      {v.nervous && <div className="note-block" style={{ borderLeftColor: 'var(--amber)' }}><div className="nb-label">What makes me nervous</div>{v.nervous}</div>}
      {v.teachersShouldKnow && <div className="note-block" style={{ borderLeftColor: 'var(--brand)' }}><div className="nb-label">What I want my new teachers to know</div>{v.teachersShouldKnow}</div>}
      {v.proudOf && <div className="note-block" style={{ borderLeftColor: 'var(--violet)' }}><div className="nb-label">Something I'm proud of</div>{v.proudOf}</div>}
    </>
  )
}

/* ---------- check-in results, shown to staff on the profile ---------- */
export function CheckInView({ student }) {
  const c = student.checkIn
  if (!c) {
    return (
      <div className="empty" style={{ paddingTop: 8, paddingBottom: 8 }}>
        No check-in scheduled yet. Check-ins are queued automatically two weeks after a student's first
        day at their new school.
      </div>
    )
  }
  if (c.status !== 'completed') {
    return (
      <div className="callout warn" style={{ marginBottom: 0 }}>
        <b>Check-in due.</b> Scheduled {c.dueDate} (two weeks after the first day). The student answers
        from their own portal tile — one tap, under a minute.
      </div>
    )
  }
  const r = c.responses
  const flags = checkInFlags(r)
  const o = CHECKIN_OVERALL[r.overall]
  return (
    <>
      {flags.length > 0 && (
        <div className="callout warn">
          <b>⚑ Flagged for follow-up:</b> {flags.join(' · ')}. Routed to the homeroom teacher and
          counselor automatically.
        </div>
      )}
      <div className="kv-grid" style={{ marginBottom: 12 }}>
        <div className="kv">
          <div className="k">How school is going</div>
          <div className="v">{o ? `${o.emoji} ${o.label}` : '—'}</div>
        </div>
        <div className="kv">
          <div className="k">Friends to sit with at lunch?</div>
          <div className="v">{r.friends || '—'}</div>
        </div>
        <div className="kv">
          <div className="k">How the classes feel</div>
          <div className="v">{r.classes || '—'}</div>
        </div>
      </div>
      {r.adultNote && (
        <div className="note-block" style={{ borderLeftColor: 'var(--amber)' }}>
          <div className="nb-label">Note for a teacher or counselor</div>
          {r.adultNote}
        </div>
      )}
      <p className="stu-meta" style={{ marginTop: 8 }}>Completed {c.completedDate}</p>
    </>
  )
}

/* ---------- the check-in itself, shown to the logged-in student ---------- */
export function CheckInSurveyPage({ student, onSave }) {
  const [saved, setSaved] = useState(false)
  const [form, setForm] = useState({ overall: 0, friends: '', classes: '', adultNote: '' })
  const school = student.toSchool ? schools[student.toSchool].name : 'your new school'
  const weeks = 'a couple of weeks'

  if (saved) {
    return (
      <div className="survey-wrap">
        <div className="card survey-card" style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 52 }}>💪</div>
          <h2 style={{ margin: '8px 0' }}>Got it — thanks, {student.firstName}!</h2>
          <p style={{ color: 'var(--ink-soft)', maxWidth: 420, margin: '0 auto' }}>
            Your teachers and counselor can see your answers. If anything felt hard, someone will check
            in with you — you don't have to figure out a new school all by yourself.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="survey-wrap">
      <div className="card survey-card">
        <h2 style={{ marginBottom: 4 }}>Hey {student.firstName}! 👋</h2>
        <p style={{ color: 'var(--ink-soft)', marginBottom: 18 }}>
          You've been at <b>{school}</b> for {weeks} now. Three quick questions — takes less than a
          minute.
        </p>
        <div className="form-grid">
          <div className="form-row">
            <label className="survey-q">How is your new school going so far?</label>
            <div className="emoji-picker">
              {[4, 3, 2, 1].map((n) => (
                <button key={n} type="button" className={form.overall === n ? 'sel' : ''}
                  onClick={() => setForm((f) => ({ ...f, overall: n }))}>
                  <span className="em">{CHECKIN_OVERALL[n].emoji}</span>
                  {CHECKIN_OVERALL[n].label}
                </button>
              ))}
            </div>
          </div>
          <div className="form-row">
            <label className="survey-q">Have you found friends to sit with at lunch?</label>
            <div className="chip-picker">
              {['Yes!', 'Kind of', 'Not yet'].map((o) => (
                <button key={o} type="button" className={form.friends === o ? 'sel' : ''}
                  onClick={() => setForm((f) => ({ ...f, friends: o }))}>{o}</button>
              ))}
            </div>
          </div>
          <div className="form-row">
            <label className="survey-q">How are your classes feeling?</label>
            <div className="chip-picker">
              {['Too easy', 'Just right', 'Too hard'].map((o) => (
                <button key={o} type="button" className={form.classes === o ? 'sel' : ''}
                  onClick={() => setForm((f) => ({ ...f, classes: o }))}>{o}</button>
              ))}
            </div>
          </div>
          <div className="form-row">
            <label className="survey-q">Anything you want a teacher or counselor to know? <span className="hint">(optional)</span></label>
            <textarea value={form.adultNote}
              placeholder="Big or small — an adult will read this."
              onChange={(e) => setForm((f) => ({ ...f, adultNote: e.target.value }))} />
          </div>
          <div>
            <button className="btn primary" disabled={!form.overall || !form.friends || !form.classes}
              onClick={() => { onSave(student.id, form); setSaved(true) }}>
              Send my answers →
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ---------- the survey itself, shown to the logged-in student ---------- */
export default function StudentSurveyPage({ student, onSave }) {
  const existing = student.studentVoice
  const [saved, setSaved] = useState(false)
  const [form, setForm] = useState(() => ({
    feeling: existing?.feeling || 0,
    excited: existing?.excited || '',
    nervous: existing?.nervous || '',
    teachersShouldKnow: existing?.teachersShouldKnow || '',
    proudOf: existing?.proudOf || '',
    learnBest: existing?.learnBest || [],
    favoriteSubjects: existing?.favoriteSubjects || [],
  }))

  const toggle = (key, value) =>
    setForm((f) => ({
      ...f,
      [key]: f[key].includes(value) ? f[key].filter((x) => x !== value) : [...f[key], value],
    }))

  const newSchool = student.toSchool ? schools[student.toSchool].name : 'your new school'
  const canSubmit = form.feeling > 0

  if (saved) {
    return (
      <div className="survey-wrap">
        <div className="card survey-card" style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 52 }}>🎉</div>
          <h2 style={{ margin: '8px 0' }}>Thanks, {student.firstName}!</h2>
          <p style={{ color: 'var(--ink-soft)', maxWidth: 420, margin: '0 auto 16px' }}>
            Your answers were added to your profile. Your new teachers at {newSchool} will read them
            before your first day — so you won't be starting as a stranger.
          </p>
          <button className="btn subtle" onClick={() => setSaved(false)}>Change my answers</button>
        </div>
      </div>
    )
  }

  return (
    <div className="survey-wrap">
      <div className="card survey-card">
        <h2 style={{ marginBottom: 4 }}>Hi {student.firstName}! 👋</h2>
        <p style={{ color: 'var(--ink-soft)', marginBottom: 6 }}>
          Next year you're going to <b>{newSchool}</b>. Your new teachers want to get to know you
          before you even walk in. This takes about 5 minutes — there are no wrong answers.
        </p>
        <p className="stu-meta" style={{ marginBottom: 18 }}>
          Your answers are shared with the adults at your new school who will be helping you.
        </p>

        <div className="form-grid">
          <div className="form-row">
            <label className="survey-q">How do you feel about going to your new school?</label>
            <div className="emoji-picker">
              {[4, 3, 2, 1].map((n) => (
                <button
                  key={n}
                  type="button"
                  className={form.feeling === n ? 'sel' : ''}
                  onClick={() => setForm((f) => ({ ...f, feeling: n }))}
                >
                  <span className="em">{FEELINGS[n].emoji}</span>
                  {FEELINGS[n].label}
                </button>
              ))}
            </div>
          </div>

          <div className="form-row">
            <label className="survey-q">What are you most excited about?</label>
            <textarea
              value={form.excited}
              placeholder="New friends? A subject? Sports? Lunch? Anything counts."
              onChange={(e) => setForm((f) => ({ ...f, excited: e.target.value }))}
            />
          </div>

          <div className="form-row">
            <label className="survey-q">Is there anything that makes you nervous or worried?</label>
            <textarea
              value={form.nervous}
              placeholder="Lots of kids feel nervous about something — getting lost, harder work, making friends…"
              onChange={(e) => setForm((f) => ({ ...f, nervous: e.target.value }))}
            />
          </div>

          <div className="form-row">
            <label className="survey-q">What do you want your new teachers to know about you?</label>
            <textarea
              value={form.teachersShouldKnow}
              placeholder="This goes straight to them. What should they know so school goes great for you?"
              onChange={(e) => setForm((f) => ({ ...f, teachersShouldKnow: e.target.value }))}
            />
          </div>

          <div className="form-row">
            <label className="survey-q">What's something you're really good at or proud of?</label>
            <textarea
              value={form.proudOf}
              placeholder="In school or outside of school — brag a little!"
              onChange={(e) => setForm((f) => ({ ...f, proudOf: e.target.value }))}
            />
          </div>

          <div className="form-row">
            <label className="survey-q">How do you learn best? <span className="hint">(pick as many as you want)</span></label>
            <div className="chip-picker">
              {LEARN_OPTIONS.map((o) => (
                <button key={o} type="button" className={form.learnBest.includes(o) ? 'sel' : ''} onClick={() => toggle('learnBest', o)}>
                  {o}
                </button>
              ))}
            </div>
          </div>

          <div className="form-row">
            <label className="survey-q">Favorite subjects? <span className="hint">(pick as many as you want)</span></label>
            <div className="chip-picker">
              {SUBJECT_OPTIONS.map((o) => (
                <button key={o} type="button" className={form.favoriteSubjects.includes(o) ? 'sel' : ''} onClick={() => toggle('favoriteSubjects', o)}>
                  {o}
                </button>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <button
              className="btn primary"
              disabled={!canSubmit}
              onClick={() => { onSave(student.id, form); setSaved(true) }}
            >
              {existing ? 'Update my answers' : 'Send to my new school'} →
            </button>
            {!canSubmit && <span className="hint" style={{ color: 'var(--ink-faint)', fontSize: 12.5 }}>Pick how you're feeling first — everything else is optional.</span>}
          </div>
        </div>
      </div>
    </div>
  )
}
