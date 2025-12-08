import React, { useState } from 'react';
import './index.css';

interface LoginProps {
  type: 'admin';
}

export const Login: React.FC<LoginProps> = ({}) => {
  const [adminId, setId] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {e.preventDefault();};

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="AdminId"
        value={adminId}
        onChange={(e) => setId(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">Login</button>
    </form>
  );
};
