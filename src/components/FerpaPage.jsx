export default function FerpaPage({ user, auditLog }) {
  const canSeeLog = user.role === 'admin' || user.role === 'counselor'

  return (
    <>
      <h1 className="page-title">Privacy &amp; FERPA</h1>
      <p className="page-sub">
        StudentBridge moves education records between schools — which is exactly what FERPA regulates. The
        product is designed so that using it normally <i>is</i> using it compliantly.
      </p>

      <div className="two-col">
        <div className="card">
          <h3>Why no parent consent form is required</h3>
          <p style={{ fontSize: 14 }}>
            FERPA generally requires written consent to share education records — but it provides specific
            exceptions that StudentBridge is built around:
          </p>
          <div className="note-block">
            <div className="nb-label">§99.31(a)(2) — Transfer exception</div>
            Schools may disclose education records, without consent, to officials of another school where
            the student <b>seeks or intends to enroll, or is already enrolled</b>. This covers feeder-school
            transitions (Maple → Riverside → Northview) and mid-year transfers alike. Districts must notify
            parents of this practice in their annual FERPA notification, and parents may request a copy of
            what was sent.
          </div>
          <div className="note-block">
            <div className="nb-label">§99.31(a)(1) — School officials</div>
            Within a school, staff may access records when they have a <b>legitimate educational
            interest</b>. StudentBridge enforces this in software: teachers see their own students; support-plan
            details are limited to counselors, admins, and assigned staff.
          </div>
          <div className="note-block">
            <div className="nb-label">School-official vendor status</div>
            StudentBridge (like Clever and ClassLink themselves) operates as a "school official" under contract:
            the district owns the data, StudentBridge uses it only for the contracted purpose, never sells it or
            uses it for advertising, and deletes it at contract end — consistent with FERPA, Michigan
            student-privacy law, and the Student Privacy Pledge.
          </div>
        </div>

        <div className="card">
          <h3>How the product enforces it</h3>
          <ul style={{ paddingLeft: 20, display: 'grid', gap: 10, fontSize: 14 }}>
            <li><b>Role-based access from rostering.</b> Permissions come from the district's SIS via Clever/ClassLink — nobody hand-manages accounts, so access rights stay current automatically as staff and rosters change.</li>
            <li><b>Data minimization.</b> The transition profile carries what a receiving teacher needs to serve the student — academic levels, assessments, supports, what works — not the entire cumulative file.</li>
            <li><b>Restricted tiers.</b> IEP/504/EL detail is visible only to staff with a direct need; other staff see that a plan exists and who to contact.</li>
            <li><b>Complete audit log.</b> Every view and every disclosure is recorded (who, what, when, under which FERPA basis) — see below. This is also the district's evidence trail for a parent or state audit.</li>
            <li><b>Professional-language guidance.</b> Teacher inputs are structured and framed as part of the education record, which parents may inspect — the form itself coaches factual, strengths-based language.</li>
            <li><b>No student login.</b> Only rostered staff can access StudentBridge; students and families never see other students' data. A future parent portal would show parents only their own child's packet.</li>
          </ul>
        </div>
      </div>

      <div className="card mt16">
        <h3>FERPA access &amp; disclosure log</h3>
        {canSeeLog ? (
          <>
            <p className="card-sub">Newest first. In production this log is exportable and retained per district policy.</p>
            {auditLog.map((e, i) => (
              <div key={i} className="audit-item">
                <div className="ts">{e.ts}</div>
                <div>
                  <div className="a-action">{e.action} — {e.student}</div>
                  <div className="a-detail">{e.user} · {e.detail}</div>
                </div>
              </div>
            ))}
          </>
        ) : (
          <div className="empty">
            The full access log is visible to counselors and administrators. (Your own actions are still
            recorded in it.)
          </div>
        )}
      </div>

      <p className="footer-note" style={{ textAlign: 'left', paddingLeft: 4 }}>
        Prototype note: this page describes the compliance design target. Legal review with the district's
        counsel would precede any production deployment.
      </p>
    </>
  )
}
