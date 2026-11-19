import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import { AuthProvider } from './auth/AuthContext'

const currentPath = window.location.pathname;
const isSocialFeed = currentPath === '/home' || currentPath === '/reels';
document.getElementById('root').classList.toggle('homefeed-app', isSocialFeed);
document.body.classList.toggle('homefeed-body', isSocialFeed);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </StrictMode>,
)
