import { useState } from 'react'
import { studentName, schools, MSTEP_LEVELS, scaleLabel } from '../data/demoData.js'
import { Flags, ProfilePill } from './StudentTable.jsx'
import TeacherProfileForm from './TeacherProfileForm.jsx'
import StandardsComparison from './StandardsComparison.jsx'
import TransferChecklist from './TransferChecklist.jsx'
import { StudentVoiceView, FEELINGS } from './StudentVoice.jsx'

function Dots({ n }) {
  return (
    <span className="dots" title={`${scaleLabel(n)} (${n}/4)`}>
      {[1, 2, 3, 4].map((i) => <i key={i} className={i <= (n || 0) ? 'on' : ''} />)}
    </span>
  )
}

function SkillRow({ label, value }) {
  return (
    <div className="kv">
      <div className="k">{label}</div>
      <div className="v">
        <Dots n={value} /> <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink-soft)' }}>{scaleLabel(value)}</span>
      </div>
    </div>
  )
}

function TeacherProfileView({ profile }) {
  if (!profile || profile.status !== 'complete') {
    return <div className="empty">No teacher profile yet.</div>
  }
  return (
    <>
      <p className="card-sub" style={{ marginTop: 0 }}>
        Completed by {profile.completedBy} on {profile.completedDate}
      </p>

      <div className="fieldset">
        <div className="fs-title">📖 Reading</div>
        <div className="kv-grid">
          <div className="kv"><div className="k">Level</div><div className="v" style={{ fontSize: 13.5 }}>{profile.reading?.level || '—'}</div></div>
          <SkillRow label="Fluency" value={profile.reading?.fluency} />
          <SkillRow label="Comprehension" value={profile.reading?.comprehension} />
        </div>
        {profile.reading?.notes && <div className="note-block"><div className="nb-label">Teacher notes</div>{profile.reading.notes}</div>}
      </div>

      <div className="fieldset mt12">
        <div className="fs-title">➗ Math</div>
        <div className="kv-grid">
          <SkillRow label="Fact fluency / computation" value={profile.math?.fluency} />
          <SkillRow label="Problem solving" value={profile.math?.problemSolving} />
        </div>
        {profile.math?.notes && <div className="note-block"><div className="nb-label">Teacher notes</div>{profile.math.notes}</div>}
      </div>

      <div className="fieldset mt12">
        <div className="fs-title">✏️ Writing</div>
        {profile.writing?.notes ? <div className="note-block" style={{ marginTop: 0 }}>{profile.writing.notes}</div> : <span className="stu-meta">—</span>}
      </div>

      <div className="fieldset mt12">
        <div className="fs-title">🧭 Work habits</div>
        <div className="kv-grid">
          <SkillRow label="Organization" value={profile.workHabits?.organization} />
          <SkillRow label="Focus" value={profile.workHabits?.focus} />
          <SkillRow label="Independence" value={profile.workHabits?.independence} />
          <SkillRow label="Participation" value={profile.workHabits?.participation} />
        </div>
      </div>

      <div className="fieldset mt12">
        <div className="fs-title">⭐ The student behind the data</div>
        {profile.interests && <div className="note-block" style={{ marginTop: 0, borderLeftColor: 'var(--amber)' }}><div className="nb-label">Passions &amp; interests</div>{profile.interests}</div>}
        {profile.strengths && <div className="note-block"><div className="nb-label">Strengths</div>{profile.strengths}</div>}
        {profile.growthAreas && <div className="note-block"><div className="nb-label">Growth areas</div>{profile.growthAreas}</div>}
        {profile.whatWorks && <div className="note-block" style={{ borderLeftColor: 'var(--teal)' }}><div className="nb-label">What works for this student</div>{profile.whatWorks}</div>}
      </div>
    </>
  )
}

function AssessmentsTab({ student }) {
  const a = student.assessments
  return (
    <>
      {a?.outOfState && (
        <div className="callout warn">
          <b>Out-of-state records:</b> {studentName(student)} arrived from{' '}
          {student.fromSchoolName}. Prior results below come from that state's assessment — levels are{' '}
          <b>not directly comparable</b> to M-STEP. See the Standards Comparison tab for what this means
          for instruction.
        </div>
      )}

      {a?.priorAssessments?.length > 0 && (
        <div className="card" style={{ boxShadow: 'none' }}>
          <h3>Prior state assessment results</h3>
          <table className="roster">
            <thead><tr><th>Year</th><th>Grade</th><th>Subject</th><th>Assessment</th><th>Result</th></tr></thead>
            <tbody>
              {a.priorAssessments.map((m, i) => (
                <tr key={i}>
                  <td>{m.year}</td><td>{m.grade}</td><td>{m.subject}</td><td>{m.test}</td>
                  <td><span className="pill info">{m.result}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {a?.mstep?.length > 0 && (
        <div className="card" style={{ boxShadow: 'none' }}>
          <h3>M-STEP (Michigan state assessment)</h3>
          {a.attachedBy && <p className="card-sub">Attached by {a.attachedBy}</p>}
          <table className="roster">
            <thead><tr><th>Year</th><th>Grade</th><th>Subject</th><th>Scale score</th><th>Performance level</th></tr></thead>
            <tbody>
              {a.mstep.map((m, i) => (
                <tr key={i}>
                  <td>{m.year}</td><td>{m.grade}</td><td>{m.subject}</td><td>{m.scaleScore}</td>
                  <td><span className={`pill ${MSTEP_LEVELS[m.level].color}`}>{MSTEP_LEVELS[m.level].name}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {a?.map?.length > 0 && (
        <div className="card" style={{ boxShadow: 'none' }}>
          <h3>NWEA MAP Growth (benchmark)</h3>
          {a.nweaSyncedAt && (
            <p className="card-sub">
              <span className="pill teal">⟳ Auto-imported from NWEA</span>{' '}
              Synced {a.nweaSyncedAt} via the district's NWEA data connection — no manual entry.
            </p>
          )}
          <table className="roster">
            <thead><tr><th>Term</th><th>Subject</th><th>RIT</th><th>Percentile</th></tr></thead>
            <tbody>
              {a.map.map((m, i) => (
                <tr key={i}>
                  <td>{m.term}{m.source === 'nwea' && <span className="stu-meta" title="Imported automatically from NWEA"> ⟳</span>}</td><td>{m.subject}</td><td>{m.rit}</td>
                  <td><span className={`pill ${m.percentile >= 61 ? 'ok' : m.percentile >= 31 ? 'info' : 'warn'}`}>{m.percentile}th</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {a?.attendance && (
        <div className="card" style={{ boxShadow: 'none' }}>
          <h3>Attendance</h3>
          <div className="kv-grid">
            <div className="kv"><div className="k">Rate</div><div className="v">{a.attendance.rate}%</div></div>
            <div className="kv"><div className="k">Absences</div><div className="v">{a.attendance.absences}</div></div>
            <div className="kv"><div className="k">Tardies</div><div className="v">{a.attendance.tardies}</div></div>
          </div>
        </div>
      )}

      {(!a || (a.status === 'pending' && !a.mstep?.length && !a.priorAssessments?.length)) && (
        <div className="empty">Assessment data pending — waiting on records from the sending school.</div>
      )}
    </>
  )
}

function SupportsTab({ student, user }) {
  const s = student.supports
  const canSeeDetail = user.role === 'counselor' || user.role === 'admin'
  const hasAny = s?.iep || s?.plan504 || s?.el || s?.summary

  return (
    <>
      <div className="callout ferpa">
        <b>Restricted section.</b> Support details are limited to staff with a direct educational need
        (counselors, administrators, case managers, and the student's assigned teachers). Access is
        recorded in the FERPA log.
      </div>
      {!hasAny && s?.iep !== null && <div className="empty">No formal support plans on file.</div>}
      {s?.iep === null && <div className="empty">Unknown — awaiting records from sending school.</div>}
      {hasAny && (
        canSeeDetail ? (
          <div className="restricted-box">
            <div className="rb-head">🔒 Support plans &amp; services</div>
            <div style={{ display: 'flex', gap: 6, marginBottom: 10 }}>
              {s.iep && <span className="flag-dot flag-iep">IEP</span>}
              {s.plan504 && <span className="flag-dot flag-504">504 Plan</span>}
              {s.el && <span className="flag-dot flag-el">English Learner</span>}
            </div>
            {s.summary && <p style={{ fontSize: 14 }}>{s.summary}</p>}
          </div>
        ) : (
          <div className="restricted-box">
            <div className="rb-head">🔒 Support plan on file</div>
            <p style={{ fontSize: 14 }}>
              This student has support services on file. As the assigned teacher you'll receive the
              accommodations summary from the case manager; for details before then, contact the counseling
              office. (In production, assigned-teacher access unlocks automatically when rosters sync.)
            </p>
          </div>
        )
      )}
    </>
  )
}

export default function StudentProfile({ student, user, initialTab, onBack, onSaveTeacherProfile, onSendPacket, onMarkStep }) {
  const isMyStudent = student.homeroom === user.name
  const canEditProfile = user.role === 'teacher' && isMyStudent
  const [tab, setTab] = useState(initialTab === 'teacher' && canEditProfile && student.teacherProfile?.status !== 'complete' ? 'edit' : (initialTab || 'overview'))

  const tabs = [
    { key: 'overview', label: 'Overview' },
    { key: 'academics', label: 'Teacher profile' },
    { key: 'assessments', label: 'Assessments' },
    { key: 'voice', label: 'Student voice 💬' },
    { key: 'supports', label: 'Supports 🔒' },
  ]
  if (student.priorState) tabs.push({ key: 'standards', label: `Standards: ${student.priorState} → MI` })
  if (student.cohort === 'midyear-in') tabs.push({ key: 'transfer', label: 'Transfer workflow' })

  const from = student.fromSchoolName || (student.fromSchool ? schools[student.fromSchool].name : '—')
  const to = student.toSchool ? schools[student.toSchool].name : '—'

  return (
    <>
      <button className="back-link" onClick={onBack}>← Back to dashboard</button>
      <div className="profile-head">
        <div className="avatar-lg">{student.firstName[0]}{student.lastName[0]}</div>
        <div style={{ flex: 1 }}>
          <h2>{studentName(student)}</h2>
          <div className="meta">
            Grade {student.grade} · {from} → {to}
            {student.enrolledDate && <> · enrolled {student.enrolledDate}</>}
          </div>
          <div className="flags"><Flags student={student} /></div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div className="stu-meta" style={{ marginBottom: 6 }}>Teacher profile</div>
          <ProfilePill status={student.teacherProfile?.status || 'not-started'} />
        </div>
      </div>

      <div className="tabs">
        {tabs.map((t) => (
          <button key={t.key} className={tab === t.key || (t.key === 'academics' && tab === 'edit') ? 'active' : ''}
            onClick={() => setTab(t.key)}>
            {t.label}
          </button>
        ))}
      </div>

      {tab === 'overview' && (
        <div className="card">
          <h3>At a glance</h3>
          <div className="kv-grid">
            <div className="kv"><div className="k">Transition</div><div className="v" style={{ fontSize: 13.5 }}>{from.split('(')[0].trim()} → {to}</div></div>
            <div className="kv"><div className="k">Teacher profile</div><div className="v"><ProfilePill status={student.teacherProfile?.status || 'not-started'} /></div></div>
            <div className="kv"><div className="k">Assessments</div><div className="v">{student.assessments?.status === 'complete' ? <span className="pill ok">Attached</span> : <span className="pill warn">Pending</span>}</div></div>
            {student.assessments?.attendance && <div className="kv"><div className="k">Attendance</div><div className="v">{student.assessments.attendance.rate}%</div></div>}
          </div>
          {student.teacherProfile?.status === 'complete' && student.teacherProfile.interests && (
            <div className="note-block mt12" style={{ borderLeftColor: 'var(--amber)' }}>
              <div className="nb-label">Passions &amp; interests</div>
              {student.teacherProfile.interests}
            </div>
          )}
          {student.teacherProfile?.status === 'complete' && student.teacherProfile.whatWorks && (
            <div className="note-block mt12" style={{ borderLeftColor: 'var(--teal)' }}>
              <div className="nb-label">What works for {student.firstName} — from {student.teacherProfile.completedBy}</div>
              {student.teacherProfile.whatWorks}
            </div>
          )}
          {student.studentVoice && (
            <div className="note-block mt12" style={{ borderLeftColor: 'var(--violet)' }}>
              <div className="nb-label">
                In {student.firstName}'s own words {FEELINGS[student.studentVoice.feeling]?.emoji} {FEELINGS[student.studentVoice.feeling]?.label.toLowerCase()} about the move
              </div>
              {student.studentVoice.teachersShouldKnow || student.studentVoice.excited}
              {student.studentVoice.nervous && (
                <div className="stu-meta" style={{ marginTop: 4 }}>Nervous about: {student.studentVoice.nervous}</div>
              )}
            </div>
          )}
          {student.priorState && (
            <div className="callout warn mt12" style={{ marginBottom: 0 }}>
              <b>Out-of-state arrival:</b> {student.firstName} comes from a state with different academic
            standards. Check the <b>Standards: {student.priorState} → MI</b> tab before assuming gaps are
              ability-related — they may simply reflect a different scope and sequence.
            </div>
          )}
          {student.cohort === 'outgoing' && (
            <div className="mt12">
              {student.packetStatus === 'sent' ? (
                <span className="pill ok">Transition packet sent to Northview on {student.packetSentDate}</span>
              ) : student.teacherProfile?.status === 'complete' ? (
                (user.role === 'teacher' && isMyStudent) || user.role === 'counselor' || user.role === 'admin' ? (
                  <button className="btn primary" onClick={() => onSendPacket(student.id)}>Send transition packet to Northview →</button>
                ) : null
              ) : (
                <span className="pill warn">Packet blocked — teacher profile incomplete</span>
              )}
            </div>
          )}
        </div>
      )}

      {tab === 'academics' && (
        <div className="card">
          <div className="list-head">
            <h3>Teacher academic profile</h3>
            {canEditProfile && student.teacherProfile?.status === 'complete' && (
              <button className="btn ghost small" onClick={() => setTab('edit')}>Edit</button>
            )}
            {canEditProfile && student.teacherProfile?.status !== 'complete' && (
              <button className="btn primary small" onClick={() => setTab('edit')}>
                {student.teacherProfile?.status === 'in-progress' ? 'Continue profile' : 'Start profile'}
              </button>
            )}
          </div>
          <TeacherProfileView profile={student.teacherProfile} />
        </div>
      )}

      {tab === 'edit' && canEditProfile && (
        <TeacherProfileForm
          student={student}
          onSave={(profile) => { onSaveTeacherProfile(student.id, profile); setTab('academics') }}
          onCancel={() => setTab('academics')}
        />
      )}

      {tab === 'assessments' && <AssessmentsTab student={student} />}
      {tab === 'voice' && (
        <div className="card">
          <h3>Student voice — the "About Me" survey</h3>
          <StudentVoiceView student={student} />
        </div>
      )}
      {tab === 'supports' && <SupportsTab student={student} user={user} />}
      {tab === 'standards' && student.priorState && (
        <StandardsComparison stateCode={student.priorState} student={student} />
      )}
      {tab === 'transfer' && student.cohort === 'midyear-in' && (
        <div className="card">
          <h3>Mid-year transfer workflow</h3>
          <p className="card-sub">
            The goal: no student sits in a classroom for weeks while their story is stuck in a fax queue.
          </p>
          <TransferChecklist
            student={student}
            onMarkStep={onMarkStep}
            canAct={user.role === 'counselor' || user.role === 'admin'}
          />
        </div>
      )}
    </>
  )
}
