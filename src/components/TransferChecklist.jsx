const STEP_DEFS = [
  {
    key: 'enrolled',
    label: 'Student enrolled',
    note: 'Family completed enrollment. Student appears in the SIS and syncs to StudentBridge via Clever/ClassLink rostering.',
  },
  {
    key: 'recordsRequested',
    label: 'Records requested from sending school',
    note: 'FERPA §99.31(a)(2) lets the sending school release records to a school where the student is enrolling — no parent consent required (parents are notified per district policy).',
  },
  {
    key: 'recordsReceived',
    label: 'Records received',
    note: 'Transcript/report cards, state assessment results, attendance, and any IEP/504/EL documentation.',
  },
  {
    key: 'profileReceived',
    label: 'Transition profile received or built',
    note: 'If the sending school uses StudentBridge, their teacher profile arrives digitally. Otherwise the counselor builds one from records + a quick call to the sending school.',
  },
  {
    key: 'placementReady',
    label: 'Placement ready — teachers notified',
    note: "Homeroom, groups, and supports are set. The student's new teachers can see the profile before day one.",
  },
]

export default function TransferChecklist({ student, onMarkStep, canAct, compact }) {
  const steps = student.transfer?.steps || {}
  // first not-done step is the only one actionable, to keep the flow honest
  const firstOpen = STEP_DEFS.find((d) => !steps[d.key]?.done)?.key

  return (
    <div className="steps" style={compact ? { marginTop: 10 } : undefined}>
      {STEP_DEFS.map((d, i) => {
        const st = steps[d.key] || { done: false }
        return (
          <div key={d.key} className={`step ${st.done ? 'done' : ''}`}>
            <div className="rail">
              <div className="dot">{st.done ? '✓' : i + 1}</div>
              {i < STEP_DEFS.length - 1 && <div className="bar" />}
            </div>
            <div>
              <div className="st-label">
                {d.label}{' '}
                {st.done && st.date && <span className="st-date">· {st.date}</span>}
                {!st.done && canAct && d.key === firstOpen && d.key !== 'enrolled' && (
                  <button className="btn subtle small" style={{ marginLeft: 10 }} onClick={() => onMarkStep(student.id, d.key)}>
                    Mark done
                  </button>
                )}
              </div>
              {!compact && <div className="st-note">{d.note}</div>}
            </div>
          </div>
        )
      })}
    </div>
  )
}
