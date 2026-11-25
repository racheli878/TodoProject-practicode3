
import React, { useState } from 'react';
import service from './service';

export default function Register({ onRegister, onBack }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    async function handleSubmit(e) {
        e.preventDefault();
        setError('');
        try {
            await service.register(username, password);
            onRegister();
        }
        catch (err) {
            if (err.response?.status === 409)
                setError('שם המשתמש כבר קיים');
            else
                setError('ההרשמה נכשלה');
        }
    }

    return (
        <form className="card auth-form" onSubmit={handleSubmit}>
            <span className="eyebrow">Todos</span>
            <h2>Create account</h2>
            <p className="auth-subtitle">A calmer way to manage your day.</p>
            <input placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} required />
            <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
            <button type="submit">Create account</button>
            <button type="button" onClick={onBack}>Back to Login</button>
            {error && <p className="auth-error">{error}</p>}
        </form>
    );
}