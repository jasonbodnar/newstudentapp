import { useState } from 'react'

export default function DisclosureLog({ user, auditLog }) {
  const canSeeLog = user.role === 'admin' || user.role === 'counselor'
  const [filter, setFilter] = useState('')

  const q = filter.trim().toLowerCase()
  const entries = q
    ? auditLog.filter((e) =>
        [e.student, e.action, e.user, e.detail].some((v) => v && v.toLowerCase().includes(q))
      )
    : auditLog

  return (
    <>
      <h1 className="page-title">Disclosure log</h1>
      <p className="page-sub">
        Every profile view, record import, and disclosure to another school is recorded here — who,
        what, when, and the FERPA basis for the access. This log is the district's evidence trail for a
        parent request or state audit. In production it is exportable and retained per district policy.
      </p>

      <div className="card">
        {canSeeLog ? (
          <>
            <div className="list-head">
              <h3>All activity</h3>
              <div className="form-row" style={{ minWidth: 260 }}>
                <input
                  type="text"
                  placeholder="Filter by student, staff, or action…"
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                />
              </div>
            </div>
            {entries.length ? (
              entries.map((e, i) => (
                <div key={i} className="audit-item">
                  <div className="ts">{e.ts}</div>
                  <div>
                    <div className="a-action">{e.action} — {e.student}</div>
                    <div className="a-detail">{e.user} · {e.detail}</div>
                  </div>
                </div>
              ))
            ) : (
              <div className="empty">No entries match "{filter}".</div>
            )}
          </>
        ) : (
          <div className="empty">
            The full disclosure log is visible to counselors and administrators. (Your own actions are
            still recorded in it.)
          </div>
        )}
      </div>
    </>
  )
}
