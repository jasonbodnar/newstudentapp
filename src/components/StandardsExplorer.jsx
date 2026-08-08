import { useState } from 'react'
import { stateCrosswalk } from '../data/standards.js'
import StandardsComparison from './StandardsComparison.jsx'

export default function StandardsExplorer() {
  const codes = Object.keys(stateCrosswalk)
  const [code, setCode] = useState('TX')

  return (
    <>
      <h1 className="page-title">Standards comparison</h1>
      <p className="page-sub">
        When a student arrives from out of state, their "gaps" are often just a different scope and
        sequence. Pick the state a student is coming from to see how its standards line up with
        Michigan's — what they may not have seen, where they may be ahead, and which terms differ.
      </p>
      <div className="card" style={{ marginBottom: 18 }}>
        <div className="form-row" style={{ maxWidth: 420 }}>
          <label>Student is arriving from…</label>
          <select value={code} onChange={(e) => setCode(e.target.value)}>
            {codes.map((c) => (
              <option key={c} value={c}>{stateCrosswalk[c].stateName} — {stateCrosswalk[c].standardsName}</option>
            ))}
          </select>
          <span className="hint">Prototype includes {codes.length} states; production would cover all 50 + DC.</span>
        </div>
      </div>
      <StandardsComparison stateCode={code} />
    </>
  )
}
