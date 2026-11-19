# Instagram Clone

## Run locally

1. Make sure MongoDB is running.
2. Configure `backend/.env` from `backend/.env.example`. Keep your actual `.env` values private.
3. Install dependencies from the repository root and in both app folders:

   ```sh
   npm install
   npm --prefix spotify-clone/my-app install
   npm --prefix spotify-clone/my-app/backend install
   ```

4. Start the frontend and authentication API together from the repository root:

   ```sh
   npm run dev
   ```

The frontend runs on `http://localhost:5173` and proxies `/api` requests to the authentication API on port `5000`.
