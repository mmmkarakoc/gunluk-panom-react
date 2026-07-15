import { useState } from 'react';

function Auth({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isRegister, setIsRegister] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setMessage('');

    const endpoint = isRegister ? 'register' : 'login';

    try {
      const res = await fetch(`http://localhost:3000/${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.error || 'Bir hata oluştu');
        return;
      }

      if (isRegister) {
        setMessage('Kayıt başarılı, şimdi giriş yapabilirsin');
        setIsRegister(false);
      } else {
        localStorage.setItem('token', data.token);
        onLogin(data.token);
      }
    } catch (err) {
      setMessage('Sunucuya bağlanılamadı');
    }
  }

  return (
    <div>
      <h2>{isRegister ? 'Kayıt Ol' : 'Giriş Yap'}</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Şifre"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">{isRegister ? 'Kayıt Ol' : 'Giriş Yap'}</button>
      </form>

      {message && <p>{message}</p>}

      <button onClick={() => setIsRegister(!isRegister)}>
        {isRegister ? 'Zaten hesabım var, giriş yap' : 'Hesabım yok, kayıt ol'}
      </button>
    </div>
  );
}

export default Auth;