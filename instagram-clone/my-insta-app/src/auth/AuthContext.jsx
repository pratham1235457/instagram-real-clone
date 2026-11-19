import { useEffect, useState } from 'react';
import { AuthContext } from './auth-context';

async function requestAuth(path, options = {}) {
  let response;
  try {
    response = await fetch(`/api/auth${path}`, {
      ...options,
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });
  } catch {
    throw new Error('Cannot connect to the authentication server. Start the backend and check your Atlas setup.');
  }

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    const error = new Error(data.message || 'Authentication request failed.');
    error.status = response.status;
    throw error;
  }
  return data;
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState('');

  useEffect(() => {
    let active = true;

    requestAuth('/me')
      .then((data) => {
        if (active) setUser(data.user);
      })
      .catch((error) => {
        if (active && error.status !== 401) setAuthError(error.message);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  const signUp = async (formData) => {
    setAuthError('');
    const data = await requestAuth('/signup', {
      method: 'POST',
      body: JSON.stringify(formData),
    });
    setUser(data.user);
    return data.user;
  };

  const logIn = async (formData) => {
    setAuthError('');
    const data = await requestAuth('/login', {
      method: 'POST',
      body: JSON.stringify(formData),
    });
    setUser(data.user);
    return data.user;
  };

  const logOut = async () => {
    await requestAuth('/logout', { method: 'POST' });
    setUser(null);
  };

  const value = {
    user,
    loading,
    authError,
    signUp,
    logIn,
    logOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
