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
