import { useState } from 'react'
import { studentName } from '../data/demoData.js'

const SCALE = [
  { v: 1, label: 'Emerging' },
  { v: 2, label: 'Developing' },
  { v: 3, label: 'Consistent' },
  { v: 4, label: 'Strength' },
]

function ScalePicker({ value, onChange }) {
  return (
    <div className="scale-picker">
      {SCALE.map((s) => (
        <button key={s.v} type="button" className={value === s.v ? 'sel' : ''} onClick={() => onChange(s.v)}>
          {s.label}
        </button>
      ))}
    </div>
  )
}

export default function TeacherProfileForm({ student, onSave, onCancel }) {
  const existing = student.teacherProfile?.status === 'complete' ? student.teacherProfile : null
  const [form, setForm] = useState(() => ({
    reading: { level: '', fluency: 0, comprehension: 0, notes: '', ...(existing?.reading || {}) },
    math: { fluency: 0, problemSolving: 0, notes: '', ...(existing?.math || {}) },
    writing: { notes: '', ...(existing?.writing || {}) },
    workHabits: { organization: 0, focus: 0, independence: 0, participation: 0, ...(existing?.workHabits || {}) },
    interests: existing?.interests || '',
    strengths: existing?.strengths || '',
    growthAreas: existing?.growthAreas || '',
    whatWorks: existing?.whatWorks || '',
  }))

  const set = (path, value) => {
    setForm((f) => {
      const next = structuredClone(f)
      const keys = path.split('.')
      let obj = next
      for (let i = 0; i < keys.length - 1; i++) obj = obj[keys[i]]
      obj[keys[keys.length - 1]] = value
      return next
    })
  }

  const requiredDone =
    form.reading.fluency && form.reading.comprehension && form.math.fluency &&
    form.math.problemSolving && form.whatWorks.trim().length > 0

  return (
    <div className="card">
      <h3>Transition profile — {studentName(student)}</h3>
      <p className="card-sub">
        About 7 minutes. Write what you'd tell {student.firstName}'s next teacher over coffee — factual,
        specific, and strengths-based. This becomes part of the education record and is visible to the
        receiving school (and to parents on request), so keep it professional and objective.
      </p>

      <div className="form-grid">
        <div className="fieldset">
          <div className="fs-title">📖 Reading</div>
          <div className="form-grid">
            <div className="form-row">
              <label>Current reading level <span className="hint">(Lexile, F&amp;P, DRA — whatever your building uses)</span></label>
              <input type="text" value={form.reading.level} placeholder="e.g., Lexile 640L (at grade level)"
                onChange={(e) => set('reading.level', e.target.value)} />
            </div>
            <div className="form-row"><label>Fluency *</label><ScalePicker value={form.reading.fluency} onChange={(v) => set('reading.fluency', v)} /></div>
            <div className="form-row"><label>Comprehension *</label><ScalePicker value={form.reading.comprehension} onChange={(v) => set('reading.comprehension', v)} /></div>
            <div className="form-row">
              <label>Reading notes</label>
              <textarea value={form.reading.notes} placeholder="What is this student like as a reader? What are they into?"
                onChange={(e) => set('reading.notes', e.target.value)} />
            </div>
          </div>
        </div>

        <div className="fieldset">
          <div className="fs-title">➗ Math</div>
          <div className="form-grid">
            <div className="form-row"><label>Fact fluency / computation *</label><ScalePicker value={form.math.fluency} onChange={(v) => set('math.fluency', v)} /></div>
            <div className="form-row"><label>Problem solving *</label><ScalePicker value={form.math.problemSolving} onChange={(v) => set('math.problemSolving', v)} /></div>
            <div className="form-row">
              <label>Math notes</label>
              <textarea value={form.math.notes} placeholder="Strengths, current unit, anything still building…"
                onChange={(e) => set('math.notes', e.target.value)} />
            </div>
          </div>
        </div>

        <div className="fieldset">
          <div className="fs-title">✏️ Writing</div>
          <div className="form-row">
            <label>Writing notes</label>
            <textarea value={form.writing.notes} placeholder="Voice, organization, stamina, what helps…"
              onChange={(e) => set('writing.notes', e.target.value)} />
          </div>
        </div>

        <div className="fieldset">
          <div className="fs-title">🧭 Work habits</div>
          <div className="form-grid">
            <div className="form-row"><label>Organization</label><ScalePicker value={form.workHabits.organization} onChange={(v) => set('workHabits.organization', v)} /></div>
            <div className="form-row"><label>Focus</label><ScalePicker value={form.workHabits.focus} onChange={(v) => set('workHabits.focus', v)} /></div>
            <div className="form-row"><label>Independence</label><ScalePicker value={form.workHabits.independence} onChange={(v) => set('workHabits.independence', v)} /></div>
            <div className="form-row"><label>Participation</label><ScalePicker value={form.workHabits.participation} onChange={(v) => set('workHabits.participation', v)} /></div>
          </div>
        </div>

        <div className="fieldset">
          <div className="fs-title">⭐ The student behind the data</div>
          <div className="form-grid">
            <div className="form-row">
              <label>Passions &amp; interests <span className="hint">(the fastest way for a new teacher to connect on day one)</span></label>
              <textarea value={form.interests} placeholder="What lights this student up? Sports, animals, art, gaming, music, robotics, a topic they can't stop talking about…"
                onChange={(e) => set('interests', e.target.value)} />
            </div>
            <div className="form-row">
              <label>Strengths</label>
              <textarea value={form.strengths} placeholder="What is this student great at — academically or otherwise?"
                onChange={(e) => set('strengths', e.target.value)} />
            </div>
            <div className="form-row">
              <label>Growth areas</label>
              <textarea value={form.growthAreas} placeholder="Stated factually and kindly — what should the next teacher keep building?"
                onChange={(e) => set('growthAreas', e.target.value)} />
            </div>
            <div className="form-row">
              <label>What works for this student * <span className="hint">(the single most valuable field in StudentBridge)</span></label>
              <textarea value={form.whatWorks} placeholder="Seating, routines, motivators, things to avoid — the practical playbook."
                onChange={(e) => set('whatWorks', e.target.value)} />
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <button className="btn primary" disabled={!requiredDone} onClick={() => onSave(form)}>
            Save transition profile
          </button>
          <button className="btn ghost" onClick={onCancel}>Cancel</button>
          {!requiredDone && <span className="hint" style={{ fontSize: 12.5, color: 'var(--ink-faint)' }}>Required: the four skill scales + "What works".</span>}
        </div>
      </div>
    </div>
  )
}
