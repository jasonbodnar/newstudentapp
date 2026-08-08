import { studentName, profileStatusMeta, MSTEP_LEVELS } from '../data/demoData.js'
import { stateCrosswalk } from '../data/standards.js'

export function Flags({ student, compact }) {
  const f = []
  if (student.supports?.iep) f.push(<span key="iep" className="flag-dot flag-iep">IEP</span>)
  if (student.supports?.plan504) f.push(<span key="504" className="flag-dot flag-504">504</span>)
  if (student.supports?.el) f.push(<span key="el" className="flag-dot flag-el">EL</span>)
  if (student.priorState)
    f.push(
      <span key="oos" className="flag-dot flag-oos">
        {compact ? student.priorState : `Out-of-state (${stateCrosswalk[student.priorState]?.stateName || student.priorState})`}
      </span>
    )
  return f.length ? <span style={{ display: 'inline-flex', gap: 5, flexWrap: 'wrap' }}>{f}</span> : <span className="stu-meta">—</span>
}

export function ProfilePill({ status }) {
  const m = profileStatusMeta[status] || profileStatusMeta['not-started']
  return <span className={`pill ${m.cls}`}>{m.label}</span>
}

export function MstepMini({ student }) {
  const a = student.assessments
  if (a?.outOfState && (!a.mstep || a.mstep.length === 0)) {
    return <span className="pill warn">No M-STEP (out-of-state)</span>
  }
  if (!a?.mstep?.length) return <span className="pill todo">Pending</span>
  const latestYear = a.mstep[0].year
  const latest = a.mstep.filter((m) => m.year === latestYear)
  return (
    <span style={{ display: 'inline-flex', gap: 5, flexWrap: 'wrap' }}>
      {latest.map((m, i) => (
        <span key={i} className={`pill ${MSTEP_LEVELS[m.level].color}`} title={`${m.subject}: ${MSTEP_LEVELS[m.level].name} (${m.scaleScore})`}>
          {m.subject}: {MSTEP_LEVELS[m.level].name.replace('Partially Proficient', 'Partial').replace('Not Proficient', 'Not Prof.')}
        </span>
      ))}
    </span>
  )
}

export default function StudentTable({ students, onOpen, columns = ['profile', 'mstep', 'flags'], extra }) {
  if (!students.length) return <div className="empty">No students in this group.</div>
  return (
    <table className="roster">
      <thead>
        <tr>
          <th>Student</th>
          {columns.includes('from') && <th>Coming from</th>}
          {columns.includes('profile') && <th>Teacher profile</th>}
          {columns.includes('mstep') && <th>State testing</th>}
          {columns.includes('flags') && <th>Flags</th>}
          {extra && <th>{extra.header}</th>}
        </tr>
      </thead>
      <tbody>
        {students.map((s) => (
          <tr key={s.id} className="clickable" onClick={() => onOpen(s.id)}>
            <td>
              <div className="stu-name">{studentName(s)}</div>
              <div className="stu-meta">Grade {s.grade} · {s.homeroom}</div>
            </td>
            {columns.includes('from') && (
              <td className="stu-meta">{s.fromSchoolName || '—'}</td>
            )}
            {columns.includes('profile') && (
              <td><ProfilePill status={s.teacherProfile?.status || 'not-started'} /></td>
            )}
            {columns.includes('mstep') && <td><MstepMini student={s} /></td>}
            {columns.includes('flags') && <td><Flags student={s} compact /></td>}
            {extra && <td onClick={(e) => e.stopPropagation()}>{extra.render(s)}</td>}
          </tr>
        ))}
      </tbody>
    </table>
  )
}
