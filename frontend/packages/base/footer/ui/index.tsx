import { useState, useRef, useEffect } from 'react';
import { Login } from '@app/base';
import './index.css';

export function Footer() {
    const [showLogin, setShowLogin] = useState(false);
    const loginRef = useRef<HTMLDivElement>(null);
    const handleToggleLogin = () => setShowLogin(true);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (loginRef.current && !loginRef.current.contains(e.target as Node)) {
        setShowLogin(false);
      }
    };

    if (showLogin) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showLogin]);

  return (
    <div className="footer">
      {showLogin && (
        <div ref={loginRef}>
          <Login type="admin" />
        </div>
      )}

      {!showLogin && (
        <span
          onClick={handleToggleLogin}
          className="login"
        >
          Admin login
        </span>
      )}

      <p>nacho@email.com</p>
      <p>+46 77 77 77</p>
    </div>
  );
}
