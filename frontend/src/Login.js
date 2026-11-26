
import React, { useState } from 'react';
import service from './service';

export default function Login({ onLogin, onRegister }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      const { token } = await service.login(username, password);
      localStorage.setItem('token', token);
      onLogin();
    }
    catch {
      setError('שם משתמש או סיסמה שגויים');
    }
    finally {
      setSubmitting(false);
    }
  }

  return (
    <form className="card auth-form" onSubmit={handleSubmit}>
      <span className="eyebrow">Todos</span>
      <h2>Welcome back</h2>
      <p className="auth-subtitle">Sign in to continue to your tasks.</p>
      <input placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} required />
      <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
      <button type="submit" disabled={submitting}>Sign in</button>
      <button type="button" onClick={onRegister}>Create an account</button>
      {error && <p className="auth-error">{error}</p>}
    </form>
  );
}