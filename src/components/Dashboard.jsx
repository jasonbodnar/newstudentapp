import { schools, studentName } from '../data/demoData.js'
import StudentTable from './StudentTable.jsx'
import TransferChecklist from './TransferChecklist.jsx'

function pct(n, d) {
  return d === 0 ? 0 : Math.round((n / d) * 100)
}

/* ------------------------- Teacher home ------------------------- */
function TeacherHome({ user, students, onOpenStudent, onSendPacket }) {
  const mine = students.filter((s) => s.homeroom === user.name)
  const done = mine.filter((s) => s.teacherProfile?.status === 'complete')
  const destination = user.school === 'maple' ? schools.riverside : schools.northview

  return (
    <>
      <h1 className="page-title">Welcome, {user.name}</h1>
      <p className="page-sub">
        Your class is headed to <b>{destination.name}</b> next year. Complete a short transition profile
        for each student so their new teachers start the year already knowing them.
      </p>

      <div className="stat-row">
        <div className="stat accent-blue"><div className="v">{mine.length}</div><div className="l">Students transitioning</div></div>
        <div className="stat accent-teal"><div className="v">{done.length}/{mine.length}</div><div className="l">Profiles complete</div></div>
        <div className="stat accent-amber"><div className="v">{mine.length - done.length}</div><div className="l">Still to do</div><div className="d">~7 minutes per student</div></div>
      </div>

      <div className="card">
        <div className="list-head">
          <h3>My class → {destination.name}</h3>
          <div style={{ minWidth: 180 }}>
            <div className="progressbar"><i style={{ width: `${pct(done.length, mine.length)}%` }} /></div>
            <div className="stu-meta" style={{ marginTop: 4 }}>{pct(done.length, mine.length)}% complete</div>
          </div>
        </div>
        <StudentTable
          students={mine}
          onOpen={(id) => onOpenStudent(id, 'teacher')}
          extra={{
            header: 'Action',
            render: (s) =>
              s.teacherProfile?.status === 'complete' ? (
                user.school === 'riverside' && s.cohort === 'outgoing' ? (
                  s.packetStatus === 'sent' ? (
                    <span className="pill ok">Packet sent {s.packetSentDate}</span>
                  ) : (
                    <button className="btn subtle small" onClick={() => onSendPacket(s.id)}>Send packet →</button>
                  )
                ) : (
                  <span className="pill ok">Done ✓</span>
                )
              ) : (
                <button className="btn primary small" onClick={() => onOpenStudent(s.id, 'teacher')}>
                  {s.teacherProfile?.status === 'in-progress' ? 'Continue profile' : 'Start profile'}
                </button>
              ),
          }}
        />
      </div>

      <div className="callout ferpa mt16">
        <b>Why this matters:</b> receiving teachers consistently say the most useful part of a transition
        record isn't the grades — it's your two sentences about what works for this student. Grades and
        test scores attach automatically; only you can add the rest.
      </div>
    </>
  )
}

/* ------------------------- Counselor home ------------------------- */
function CounselorHome({ user, students, onOpenStudent, onMarkStep }) {
  const incoming = students.filter((s) => s.cohort === 'incoming')
  const midyear = students.filter((s) => s.cohort === 'midyear-in')
  const outgoing = students.filter((s) => s.cohort === 'outgoing')

  const ready = incoming.filter(
    (s) => s.teacherProfile?.status === 'complete' && s.assessments?.status === 'complete'
  )
  const needsAttention = midyear.filter((s) => !s.transfer?.steps?.placementReady?.done)

  return (
    <>
      <h1 className="page-title">Counselor dashboard</h1>
      <p className="page-sub">
        Everything arriving at and leaving {schools.riverside.name}: the incoming 4th-grade cohort from
        Maple, mid-year transfers, and outgoing 6th graders headed to Northview.
      </p>

      <div className="stat-row">
        <div className="stat accent-blue"><div className="v">{incoming.length}</div><div className="l">Incoming 4th graders</div><div className="d">from {schools.maple.name}</div></div>
        <div className="stat accent-teal"><div className="v">{ready.length}/{incoming.length}</div><div className="l">Fully ready for fall</div><div className="d">profile + testing attached</div></div>
        <div className="stat accent-amber"><div className="v">{needsAttention.length}</div><div className="l">Mid-year transfers in progress</div></div>
        <div className="stat accent-red"><div className="v">{outgoing.filter((s) => s.packetStatus !== 'sent').length}</div><div className="l">Outgoing packets not yet sent</div></div>
      </div>

      {needsAttention.length > 0 && (
        <div className="card">
          <h3>⚠ Mid-year transfers needing action</h3>
          <p className="card-sub">New students are hardest to serve in the gap between enrollment and records. Close that gap fast.</p>
          {needsAttention.map((s) => (
            <div key={s.id} className="fieldset mt12">
              <div className="list-head">
                <div>
                  <span className="stu-name" style={{ cursor: 'pointer' }} onClick={() => onOpenStudent(s.id)}>
                    {studentName(s)}
                  </span>{' '}
                  <span className="stu-meta">Grade {s.grade} · from {s.fromSchoolName} · enrolled {s.enrolledDate}</span>
                </div>
                <button className="btn subtle small" onClick={() => onOpenStudent(s.id, 'transfer')}>Open workflow →</button>
              </div>
              <TransferChecklist student={s} compact onMarkStep={onMarkStep} canAct />
            </div>
          ))}
        </div>
      )}

      <div className="card">
        <div className="list-head">
          <h3>Incoming cohort — 4th graders from Maple Elementary</h3>
          <span className="pill info">{ready.length} of {incoming.length} ready</span>
        </div>
        <StudentTable students={incoming} onOpen={onOpenStudent} />
      </div>

      <div className="card">
        <div className="list-head">
          <h3>Mid-year arrivals this year</h3>
        </div>
        <StudentTable students={midyear} onOpen={onOpenStudent} columns={['from', 'profile', 'mstep', 'flags']} />
      </div>

      <div className="card">
        <div className="list-head">
          <h3>Outgoing 6th graders → {schools.northview.name}</h3>
        </div>
        <StudentTable
          students={outgoing}
          onOpen={onOpenStudent}
          extra={{
            header: 'Packet',
            render: (s) =>
              s.packetStatus === 'sent' ? (
                <span className="pill ok">Sent {s.packetSentDate}</span>
              ) : s.packetStatus === 'ready' ? (
                <span className="pill info">Ready to send</span>
              ) : (
                <span className="pill warn">Waiting on teacher profile</span>
              ),
          }}
        />
      </div>
    </>
  )
}

/* ------------------------- Admin home ------------------------- */
function AdminHome({ students, auditLog, onOpenStudent }) {
  const incoming = students.filter((s) => s.cohort === 'incoming')
  const outgoing = students.filter((s) => s.cohort === 'outgoing')
  const midyear = students.filter((s) => s.cohort === 'midyear-in')

  const incReady = incoming.filter((s) => s.teacherProfile?.status === 'complete' && s.assessments?.status === 'complete').length
  const outSent = outgoing.filter((s) => s.packetStatus === 'sent').length
  const midDone = midyear.filter((s) => s.transfer?.steps?.placementReady?.done).length

  const Bar = ({ n, d }) => (
    <div>
      <div className="progressbar"><i style={{ width: `${pct(n, d)}%` }} /></div>
      <div className="stu-meta" style={{ marginTop: 4 }}>{n} of {d} ({pct(n, d)}%)</div>
    </div>
  )

  return (
    <>
      <h1 className="page-title">Building overview</h1>
      <p className="page-sub">
        Transition readiness for {schools.riverside.name} at a glance — who's coming, who's leaving, and
        whether their information is where it needs to be.
      </p>

      <div className="stat-row">
        <div className="stat accent-blue"><div className="v">{pct(incReady, incoming.length)}%</div><div className="l">Incoming cohort ready</div><div className="d">profile + assessments attached</div></div>
        <div className="stat accent-teal"><div className="v">{pct(outSent, outgoing.length)}%</div><div className="l">Outgoing packets sent</div><div className="d">to Northview Middle</div></div>
        <div className="stat accent-amber"><div className="v">{midyear.length}</div><div className="l">Mid-year transfers this year</div><div className="d">{midDone} fully processed</div></div>
        <div className="stat"><div className="v">{auditLog.length}</div><div className="l">FERPA access-log entries</div><div className="d">every view & disclosure recorded</div></div>
      </div>

      <div className="two-col">
        <div className="card">
          <h3>Incoming — 4th graders (fall)</h3>
          <Bar n={incReady} d={incoming.length} />
          <div className="mt16">
            <StudentTable students={incoming} onOpen={onOpenStudent} columns={['profile', 'mstep']} />
          </div>
        </div>
        <div className="card">
          <h3>Outgoing — 6th graders → Northview</h3>
          <Bar n={outSent} d={outgoing.length} />
          <div className="mt16">
            <StudentTable
              students={outgoing}
              onOpen={onOpenStudent}
              columns={['profile']}
              extra={{
                header: 'Packet',
                render: (s) =>
                  s.packetStatus === 'sent'
                    ? <span className="pill ok">Sent</span>
                    : s.packetStatus === 'ready'
                      ? <span className="pill info">Ready</span>
                      : <span className="pill warn">Blocked</span>,
              }}
            />
          </div>
        </div>
      </div>

      <div className="card mt16">
        <h3>Mid-year transfers</h3>
        <StudentTable students={midyear} onOpen={onOpenStudent} columns={['from', 'profile', 'flags']}
          extra={{
            header: 'Status',
            render: (s) => {
              const steps = Object.values(s.transfer?.steps || {})
              const done = steps.filter((x) => x.done).length
              return s.transfer?.steps?.placementReady?.done
                ? <span className="pill ok">Complete</span>
                : <span className="pill warn">{done}/{steps.length} steps</span>
            },
          }}
        />
      </div>

      <div className="card mt16">
        <h3>Recent FERPA access log</h3>
        <p className="card-sub">Every profile view and disclosure is recorded. Full log under Privacy &amp; FERPA.</p>
        {auditLog.slice(0, 6).map((e, i) => (
          <div key={i} className="audit-item">
            <div className="ts">{e.ts}</div>
            <div>
              <div className="a-action">{e.action} — {e.student}</div>
              <div className="a-detail">{e.user} · {e.detail}</div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default function Dashboard(props) {
  const { user } = props
  if (user.role === 'teacher') return <TeacherHome {...props} />
  if (user.role === 'counselor') return <CounselorHome {...props} />
  return <AdminHome {...props} />
}
