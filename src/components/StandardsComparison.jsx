import { stateCrosswalk, alignmentMeta, MI_STANDARDS } from '../data/standards.js'

export default function StandardsComparison({ stateCode, student }) {
  const cw = stateCrosswalk[stateCode]
  if (!cw) {
    return (
      <div className="card">
        <div className="empty">
          No crosswalk loaded for {stateCode} yet. A production version maintains a vetted crosswalk for
          all 50 states, reviewed by curriculum specialists.
        </div>
      </div>
    )
  }
  const align = alignmentMeta[cw.alignment]

  return (
    <>
      <div className="card">
        <div className="cmp-header">
          <h3 style={{ margin: 0 }}>
            {cw.stateName} → Michigan
          </h3>
          <span className={`pill ${align.cls}`}>{align.label}</span>
        </div>
        <p className="card-sub" style={{ marginBottom: 8 }}>
          {cw.standardsName} ({cw.assessmentName}) vs. {MI_STANDARDS.name}
        </p>
        <p style={{ fontSize: 14 }}>{cw.summary}</p>
        {student && (
          <div className="callout ferpa mt12" style={{ marginBottom: 0 }}>
            <b>The point:</b> if {student.firstName} struggles with a topic this month, first ask whether{' '}
            {cw.stateName}'s sequence had even covered it yet. A standards gap is not a skills gap — it
            just needs a targeted catch-up, not an intervention label.
          </div>
        )}
      </div>

      {Object.entries(cw.subjects).map(([subject, s]) => (
        <div className="card subject-block" key={subject}>
          <h3>{subject === 'Math' ? '➗' : subject === 'ELA' ? '📖' : subject === 'Science' ? '🔬' : '🌎'} {subject}</h3>
          <div className="cmp-cols">
            <div className="cmp-col gaps">
              <h4>⚠ May not have covered yet</h4>
              {s.mayNotHaveSeen.length ? <ul>{s.mayNotHaveSeen.map((x, i) => <li key={i}>{x}</li>)}</ul> : <p>Nothing significant.</p>}
            </div>
            <div className="cmp-col ahead">
              <h4>▲ May be ahead on</h4>
              {s.mayBeAhead.length ? <ul>{s.mayBeAhead.map((x, i) => <li key={i}>{x}</li>)}</ul> : <p>Nothing significant.</p>}
            </div>
            <div className="cmp-col terms">
              <h4>🔤 Different names, same ideas</h4>
              {s.terminology.length ? <ul>{s.terminology.map((x, i) => <li key={i}>{x}</li>)}</ul> : <p>Nothing significant.</p>}
            </div>
          </div>
        </div>
      ))}

      <p className="footer-note" style={{ textAlign: 'left', paddingLeft: 4 }}>
        Illustrative comparison for the prototype. A production version would ship a maintained,
        curriculum-specialist-reviewed crosswalk per state, grade, and subject.
      </p>
    </>
  )
}
