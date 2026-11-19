require('dotenv').config();

const cookieParser = require('cookie-parser');
const cors = require('cors');
const express = require('express');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth.cjs');

const app = express();
const port = Number(process.env.PORT) || 5000;
const clientOrigin = process.env.CLIENT_ORIGIN || 'http://localhost:5173';

if (!process.env.MONGO_URI) {
  throw new Error('MONGO_URI is required. Configure backend/.env using backend/.env.example.');
}
if (!process.env.JWT_SECRET || process.env.JWT_SECRET.length < 32) {
  throw new Error('JWT_SECRET must contain at least 32 characters.');
}

app.use(helmet());
app.use(cors({ origin: clientOrigin, credentials: true }));
app.use(express.json({ limit: '10kb' }));
app.use(cookieParser());
app.get('/api/health', (_req, res) => res.json({ status: 'ok' }));
app.use('/api/auth', rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 20,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  skip: (req) => !['/signup', '/login'].includes(req.path),
}), authRoutes);

app.use((error, _req, res, _next) => {
  console.error(error);
  if (error.name === 'ValidationError') {
    return res.status(400).json({ message: 'Please check the submitted account details.' });
  }
  return res.status(500).json({ message: 'Server error. Please try again later.' });
});

async function start() {
  await mongoose.connect(process.env.MONGO_URI);
  app.listen(port, () => {
    console.log(`Authentication API listening on port ${port}`);
  });
}

start().catch((error) => {
  console.error('Could not start the authentication API:', error.message);
  process.exitCode = 1;
});
