import { useState } from 'react'

export default function Login({ personas, onLogin }) {
  const [stage, setStage] = useState('sso') // 'sso' → 'persona'
  const [provider, setProvider] = useState(null)

  return (
    <div className="login-wrap">
      <div className="login-card">
        <div className="logo-big">
          <span className="mark">🤝</span>
          <h1>HandRail</h1>
        </div>
        <p className="tag">
          Something to hold onto on the way to a new school. HandRail carries every student's story —
          grades, academic levels, state testing, and what actually works for them in a classroom — so
          no one starts over as a stranger.
        </p>

        {stage === 'sso' && (
          <>
            <button className="sso-btn" onClick={() => { setProvider('Clever'); setStage('persona') }}>
              <span className="sso-mark sso-clever">C</span> Log in with Clever
            </button>
            <button className="sso-btn" onClick={() => { setProvider('ClassLink'); setStage('persona') }}>
              <span className="sso-mark sso-classlink">CL</span> Log in with ClassLink
            </button>
            <button className="sso-btn" onClick={() => { setProvider('Google'); setStage('persona') }}>
              <span className="sso-mark sso-google">G</span> Sign in with Google
            </button>
            <p className="login-note">
              No new accounts, no new passwords. Sign in with whatever your district already uses —
              the Clever or ClassLink portal tile, or your school Google account. Rosters, schools, and
              staff roles always sync from your SIS, so everyone lands in the right place automatically.
            </p>
            <p className="login-note" style={{ marginTop: 8 }}>
              <b>Prototype demo</b> — sign-in is simulated and all student data is fictional.
            </p>
          </>
        )}

        {stage === 'persona' && (
          <>
            <button className="back-link" onClick={() => setStage('sso')}>← Back</button>
            <p style={{ fontWeight: 700, marginBottom: 4 }}>
              {provider} single sign-on <span className="pill ok">✓ Connected</span>
            </p>
            <p className="login-note" style={{ textAlign: 'left', marginBottom: 12 }}>
              {provider === 'Google'
                ? 'In production, Google verifies your school account, and HandRail matches it against district rostering to determine your role. For the demo, choose a persona to see their view:'
                : `In production, ${provider} tells HandRail who you are and what role you hold. For the demo, choose a persona to see their view:`}
            </p>
            <div className="persona-list">
              {personas.map((p) => (
                <button key={p.id} className="persona-btn" onClick={() => onLogin(p)}>
                  <span className="avatar">{p.name.replace(/^(Ms\.|Mrs\.|Mr\.|Dr\.)\s*/, '').slice(0, 1)}</span>
                  <span>
                    <span className="pn">{p.name}</span>{' '}
                    <span className="pr">{p.roleLabel}</span>
                    <div className="pd">{p.description}</div>
                  </span>
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
