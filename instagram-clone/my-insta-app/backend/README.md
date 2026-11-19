# Authentication API

This Express API stores users in MongoDB and uses an HTTP-only JWT cookie for sessions. Passwords are hashed with bcrypt before they are stored.

## Local setup

1. Install MongoDB Community Server and make sure its Windows service is running.
2. Copy `.env.example` to `.env` in this folder. The example connects to `mongodb://127.0.0.1:27017/instagram-clone`.
3. Set `JWT_SECRET` to a random secret of at least 32 characters. Keep `.env` private; never commit it or send it in chat.
4. Install and start the API from this folder:

   ```powershell
   npm install
   npm run dev
   ```

5. In another terminal, start the Vite app from `../`:

   ```powershell
   npm run dev
   ```

The Vite development server proxies `/api` requests to `http://localhost:5000`. Authentication routes are `POST /api/auth/signup`, `POST /api/auth/login`, `GET /api/auth/me`, and `POST /api/auth/logout`. MongoDB creates the `instagram-clone` database and its users collection when the first account is registered.

## Session behavior

The session cookie is HTTP-only, same-site, and valid for seven days. In production it is marked secure, so serve the application over HTTPS. This demo does not include email/phone verification, password reset, or social login.
