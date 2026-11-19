import { useEffect } from 'react';
import { useAuth } from './auth/useAuth';
import HomeFeed from './components/HomeFeed';
import LoginPage from './components/LoginPage';
import Reels from './components/Reels';
import SignUp from './components/SignUp';

const currentPath = window.location.pathname;

function App() {
  const { user, loading } = useAuth();
  const isProtectedRoute = currentPath === '/home' || currentPath === '/reels';
  const shouldRedirectToHome = Boolean(user && !isProtectedRoute && currentPath !== '/login');
  const shouldRedirectToLogin = Boolean(!loading && !user && isProtectedRoute);

  useEffect(() => {
    if (shouldRedirectToHome) window.location.replace('/home');
    if (shouldRedirectToLogin) window.location.replace('/login');
  }, [shouldRedirectToHome, shouldRedirectToLogin]);

  if (loading || shouldRedirectToHome || shouldRedirectToLogin) {
    return <div className="flex min-h-screen items-center justify-center bg-black text-sm text-white">Checking your session...</div>;
  }

  if (currentPath === '/login') return <LoginPage />;
  if (currentPath === '/home') return <HomeFeed />;
  if (currentPath === '/reels') return <Reels />;
  return <SignUp />;
}

export default App;
