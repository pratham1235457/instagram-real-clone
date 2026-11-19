import { useState } from 'react';
import '/src/index.css';
import { useAuth } from '../auth/useAuth';

const LoginPage = () => {
  const { authError, logIn } = useAuth();
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage('');
    setIsSubmitting(true);
    try {
      await logIn({ identifier, password });
      window.location.assign('/home');
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="main-body">
      <div className="insta-container">
        <div className="insta-box">
          <h1 className="insta-logo">Instagram</h1>
          <p className="welcome-text">Log in to your account</p>
          <form onSubmit={handleSubmit} className="insta-form">
            <input
              type="text"
              name="identifier"
              placeholder="Username, email, or phone"
              value={identifier}
              onChange={(event) => setIdentifier(event.target.value)}
              autoComplete="username"
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              autoComplete="current-password"
              required
            />
            {(errorMessage || authError) && (
              <p className="response-message" role="alert">{errorMessage || authError}</p>
            )}
            <button type="submit" className="insta-btn" disabled={isSubmitting}>
              {isSubmitting ? 'Logging in...' : 'Log in'}
            </button>
          </form>
          <div className="insta-switch-box">
            <p>
              Don&apos;t have an account? <a className="switch-btn" href="/">Sign up</a>
            </p>
          </div>
          <div className="get-app">
            <p>Get the app.</p>
            <div className="app-store-badges">
              <img className="app-store-image" src="/app-store.png" alt="Download on the App Store" />
              <img className="app-store-image" src="/google-play.png" alt="Get it on Google Play" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
