import { useState } from 'react'

export default function Login({ personas, onLogin }) {
  const [stage, setStage] = useState('sso') // 'sso' → 'persona'
  const [provider, setProvider] = useState(null)

  return (
    <div className="login-wrap">
      <div className="login-card">
        <div className="logo-big">
          <span className="mark">🌉</span>
          <h1>StudentBridge</h1>
        </div>
        <p className="tag">
          Every new student arrives with a story. StudentBridge makes sure their new school knows it — grades,
          academic levels, state testing, and what actually works for them in a classroom.
        </p>

        {stage === 'sso' && (
          <>
            <button className="sso-btn" onClick={() => { setProvider('Clever'); setStage('persona') }}>
              <span className="sso-mark sso-clever">C</span> Log in with Clever
            </button>
            <button className="sso-btn" onClick={() => { setProvider('ClassLink'); setStage('persona') }}>
              <span className="sso-mark sso-classlink">CL</span> Log in with ClassLink
            </button>
            <p className="login-note">
              StudentBridge lives inside your district's existing Clever or ClassLink portal — one click from the
              dashboard staff already use every day. No new accounts, no new passwords. Rosters, schools,
              and staff roles sync automatically from your SIS.
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
              In production, {provider} tells StudentBridge who you are and what role you hold. For the demo,
              choose a persona to see their view:
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
