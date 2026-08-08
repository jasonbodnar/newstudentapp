import { schools } from '../data/demoData.js'

export default function Layout({ user, route, onNav, onSignOut, onReset, children }) {
  const navItems = user.role === 'student' ? [] : [
    { key: 'home', label: 'Home' },
    { key: 'standards', label: 'Standards Comparison' },
    { key: 'ferpa', label: 'Disclosure Log' },
  ]
  const school = schools[user.school]

  return (
    <div className="app-shell">
      <div className="demo-banner">
        Prototype demo — all students, scores, and notes are fictional. No real student records are stored.
      </div>
      <header className="topbar">
        <div className="logo"><span className="mark">🌉</span> StudentBridge</div>
        <nav>
          {navItems.map((n) => (
            <button
              key={n.key}
              className={route.view === n.key || (n.key === 'home' && route.view === 'student') ? 'active' : ''}
              onClick={() => onNav(n.key)}
            >
              {n.label}
            </button>
          ))}
        </nav>
        <div className="userchip">
          <div className="who">
            <div className="n">{user.name}</div>
            <div className="r">{user.roleLabel} · {school.name}</div>
          </div>
          <div className="avatar">{user.name.replace(/^(Ms\.|Mrs\.|Mr\.|Dr\.)\s*/, '').slice(0, 1)}</div>
          <button className="signout" onClick={onSignOut}>Sign out</button>
        </div>
      </header>
      <main className="main">{children}</main>
      <div className="footer-note">
        StudentBridge prototype · runs inside Clever / ClassLink · demo data only ·{' '}
        <a href="#reset" onClick={(e) => { e.preventDefault(); onReset() }}>reset demo data</a>
        <br />
        {/* Replace these hrefs with the Termly policy URLs once published */}
        <a href="#privacy" onClick={(e) => e.preventDefault()}>Privacy Policy</a>
        {' · '}
        <a href="#terms" onClick={(e) => e.preventDefault()}>Terms of Use</a>
        {' · '}
        <a href="#cookies" onClick={(e) => e.preventDefault()}>Cookie Policy</a>
        <span className="stu-meta"> (coming soon)</span>
      </div>
    </div>
  )
}
