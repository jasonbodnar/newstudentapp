import { useEffect, useMemo, useState } from 'react'
import { initialStudents, initialAuditLog, personas, studentName, nweaPending } from './data/demoData.js'
import Login from './components/Login.jsx'
import Layout from './components/Layout.jsx'
import Dashboard from './components/Dashboard.jsx'
import StudentProfile from './components/StudentProfile.jsx'
import DisclosureLog from './components/DisclosureLog.jsx'
import StandardsExplorer from './components/StandardsExplorer.jsx'
import StudentSurveyPage, { CheckInSurveyPage, checkInFlags } from './components/StudentVoice.jsx'

const STORE_KEY = 'bridge-demo-v1'

function loadStore() {
  try {
    const raw = localStorage.getItem(STORE_KEY)
    if (raw) {
      const parsed = JSON.parse(raw)
      if (parsed.students && parsed.auditLog) return parsed
    }
  } catch {
    /* fall through to fresh demo data */
  }
  return { students: initialStudents, auditLog: initialAuditLog }
}

function nowStamp() {
  const d = new Date()
  const pad = (n) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`
}

export default function App() {
  const [user, setUser] = useState(null)
  const [route, setRoute] = useState({ view: 'home' })
  const [store, setStore] = useState(loadStore)
  const [toast, setToast] = useState(null)
  // keeps the check-in thank-you screen mounted after submission flips it to 'completed'
  const [checkInJustDone, setCheckInJustDone] = useState(false)

  const { students, auditLog } = store

  useEffect(() => {
    try {
      localStorage.setItem(STORE_KEY, JSON.stringify(store))
    } catch {
      /* storage full or unavailable — demo continues in memory */
    }
  }, [store])

  useEffect(() => {
    if (!toast) return
    const t = setTimeout(() => setToast(null), 3200)
    return () => clearTimeout(t)
  }, [toast])

  const showToast = (msg) => setToast(msg)

  const addLog = (entry) =>
    setStore((s) => ({ ...s, auditLog: [{ ts: nowStamp(), ...entry }, ...s.auditLog] }))

  const userLabel = (u) =>
    `${u.name} (${u.roleLabel.includes('Teacher') ? 'Teacher' : u.roleLabel}, ${u.school === 'maple' ? 'Maple' : 'Riverside'})`

  const openStudent = (id, tab) => {
    const s = students.find((x) => x.id === id)
    if (s && user) {
      addLog({
        user: userLabel(user),
        action: 'Viewed transition profile',
        student: studentName(s),
        detail: 'Access under FERPA §99.31(a)(1) — school official with legitimate educational interest',
      })
    }
    setRoute({ view: 'student', studentId: id, tab: tab || 'overview' })
  }

  const updateStudent = (id, updater) =>
    setStore((s) => ({
      ...s,
      students: s.students.map((st) => (st.id === id ? updater(st) : st)),
    }))

  const saveTeacherProfile = (id, profile) => {
    const s = students.find((x) => x.id === id)
    updateStudent(id, (st) => ({
      ...st,
      teacherProfile: {
        ...profile,
        status: 'complete',
        completedBy: user.name,
        completedDate: new Date().toISOString().slice(0, 10),
      },
    }))
    addLog({
      user: userLabel(user),
      action: 'Completed transition profile',
      student: studentName(s),
      detail: 'Teacher academic profile saved',
    })
    showToast(`Transition profile saved for ${studentName(s)} ✓`)
  }

  const sendPacket = (id) => {
    const s = students.find((x) => x.id === id)
    updateStudent(id, (st) => ({
      ...st,
      packetStatus: 'sent',
      packetSentDate: new Date().toISOString().slice(0, 10),
    }))
    addLog({
      user: userLabel(user),
      action: 'Sent transition packet',
      student: studentName(s),
      detail: 'Disclosed to Northview Middle School under FERPA §99.31(a)(2) (transfer exception)',
    })
    showToast(`Transition packet sent to Northview for ${studentName(s)} ✓`)
  }

  const markTransferStep = (id, stepKey) => {
    const s = students.find((x) => x.id === id)
    updateStudent(id, (st) => ({
      ...st,
      transfer: {
        ...st.transfer,
        steps: {
          ...st.transfer.steps,
          [stepKey]: { done: true, date: new Date().toISOString().slice(0, 10) },
        },
      },
    }))
    const labels = {
      recordsRequested: 'Records request sent',
      recordsReceived: 'Records received',
      profileReceived: 'Transition profile received',
      placementReady: 'Placement marked ready',
    }
    addLog({
      user: userLabel(user),
      action: labels[stepKey] || 'Transfer step updated',
      student: studentName(s),
      detail: 'Mid-year transfer workflow',
    })
    showToast(`${labels[stepKey] || 'Updated'} — ${studentName(s)}`)
  }

  const saveStudentVoice = (id, voice) => {
    const s = students.find((x) => x.id === id)
    updateStudent(id, (st) => ({
      ...st,
      studentVoice: { ...voice, completedDate: new Date().toISOString().slice(0, 10) },
    }))
    addLog({
      user: `${studentName(s)} (Student)`,
      action: 'About Me survey completed',
      student: studentName(s),
      detail: 'Student voice responses added to their own transition profile',
    })
    showToast('Survey saved ✓')
  }

  const saveCheckIn = (id, responses) => {
    const s = students.find((x) => x.id === id)
    const flags = checkInFlags(responses)
    updateStudent(id, (st) => ({
      ...st,
      checkIn: {
        ...st.checkIn,
        status: 'completed',
        completedDate: new Date().toISOString().slice(0, 10),
        responses,
      },
    }))
    addLog({
      user: `${studentName(s)} (Student)`,
      action: 'Two-week check-in completed',
      student: studentName(s),
      detail: flags.length
        ? `Responses flagged for follow-up (${flags.join('; ')}) — routed to homeroom teacher and counselor automatically`
        : 'Responses routed to homeroom teacher and counselor automatically',
    })
    showToast('Check-in saved ✓')
    setCheckInJustDone(true)
  }

  const syncNwea = () => {
    const today = new Date().toISOString().slice(0, 10)
    const affected = students.filter((s) => nweaPending[s.id] && !s.assessments?.nweaSyncedAt)
    if (!affected.length) {
      showToast('NWEA MAP Growth — already up to date')
      return
    }
    setStore((s) => ({
      ...s,
      students: s.students.map((st) => {
        const pending = nweaPending[st.id]
        if (!pending || st.assessments?.nweaSyncedAt) return st
        return {
          ...st,
          assessments: {
            ...st.assessments,
            status: pending.markComplete ? 'complete' : st.assessments.status,
            map: [...(st.assessments.map || []), ...pending.rows],
            nweaSyncedAt: today,
          },
        }
      }),
    }))
    affected.forEach((st) => {
      addLog({
        user: userLabel(user),
        action: 'Assessment data imported',
        student: studentName(st),
        detail: `NWEA MAP Growth API sync — ${nweaPending[st.id].note}. School-official vendor integration; no manual entry.`,
      })
    })
    showToast(`NWEA sync complete — MAP results imported for ${affected.length} student${affected.length > 1 ? 's' : ''} ✓`)
  }

  const resetDemo = () => {
    localStorage.removeItem(STORE_KEY)
    setStore({ students: initialStudents, auditLog: initialAuditLog })
    setRoute({ view: 'home' })
    showToast('Demo data reset ✓')
  }

  const signOut = () => {
    setUser(null)
    setRoute({ view: 'home' })
    setCheckInJustDone(false)
  }

  const selectedStudent = useMemo(
    () => (route.view === 'student' ? students.find((s) => s.id === route.studentId) : null),
    [route, students]
  )

  if (!user) {
    return <Login personas={personas} onLogin={(p) => { setUser(p); setRoute({ view: 'home' }) }} />
  }

  if (user.role === 'student') {
    const me = students.find((s) => s.id === user.studentId)
    // A due check-in takes over the student's view — one tap from the portal
    // tile, answer, done. Otherwise they see their About Me survey.
    const checkInDue = (me.checkIn && me.checkIn.status !== 'completed') || checkInJustDone
    return (
      <Layout user={user} route={route} onNav={() => {}} onSignOut={signOut} onReset={resetDemo}>
        {checkInDue
          ? <CheckInSurveyPage student={me} onSave={saveCheckIn} />
          : <StudentSurveyPage student={me} onSave={saveStudentVoice} />}
        {toast && <div className="toast">{toast}</div>}
      </Layout>
    )
  }

  return (
    <Layout user={user} route={route} onNav={(view) => setRoute({ view })} onSignOut={signOut} onReset={resetDemo}>
      {route.view === 'home' && (
        <Dashboard
          user={user}
          students={students}
          auditLog={auditLog}
          onOpenStudent={openStudent}
          onSendPacket={sendPacket}
          onMarkStep={markTransferStep}
          onSyncNwea={syncNwea}
        />
      )}
      {route.view === 'student' && selectedStudent && (
        <StudentProfile
          student={selectedStudent}
          user={user}
          initialTab={route.tab}
          onBack={() => setRoute({ view: 'home' })}
          onSaveTeacherProfile={saveTeacherProfile}
          onSendPacket={sendPacket}
          onMarkStep={markTransferStep}
        />
      )}
      {route.view === 'ferpa' && <DisclosureLog user={user} auditLog={auditLog} />}
      {route.view === 'standards' && <StandardsExplorer />}
      {toast && <div className="toast">{toast}</div>}
    </Layout>
  )
}
