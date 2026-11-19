const bcrypt = require('bcryptjs');
const express = require('express');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('../models/User.cjs');
const { COOKIE_NAME, requireAuth } = require('../middleware/requireAuth.cjs');

const router = express.Router();
const SESSION_DURATION_MS = 7 * 24 * 60 * 60 * 1000;

function cookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: SESSION_DURATION_MS,
    path: '/',
  };
}

function publicUser(user) {
  return {
    id: user._id.toString(),
    emailOrPhone: user.emailOrPhone,
    fullName: user.fullName,
    username: user.username,
    avatarUrl: user.avatarUrl,
  };
}

function setSessionCookie(userId, res) {
  const token = jwt.sign({ sub: userId }, process.env.JWT_SECRET, { expiresIn: '7d' });
  res.cookie(COOKIE_NAME, token, cookieOptions());
}

function normalizeEmailOrPhone(value) {
  const input = value.trim();
  if (input.includes('@')) return input.toLowerCase();
  return input.replace(/[^\d+]/g, '');
}

function isValidEmailOrPhone(value) {
  if (value.includes('@')) return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  return /^\+?\d{7,15}$/.test(value);
}

router.post('/signup', async (req, res, next) => {
  try {
    const { emailOrPhone, fullName, username, password } = req.body || {};
    if (![emailOrPhone, fullName, username, password].every((value) => typeof value === 'string')) {
      return res.status(400).json({ message: 'Please complete all signup fields.' });
    }

    const rawContact = emailOrPhone.trim();
    if (!rawContact.includes('@') && !/^[+\d\s().-]+$/.test(rawContact)) {
      return res.status(400).json({ message: 'Enter a valid email address or phone number.' });
    }
    const normalizedContact = normalizeEmailOrPhone(emailOrPhone);
    const normalizedUsername = username.trim().toLowerCase();
    const normalizedFullName = fullName.trim();

    if (!isValidEmailOrPhone(normalizedContact)) {
      return res.status(400).json({ message: 'Enter a valid email address or phone number.' });
    }
    if (!/^[a-z0-9._]{3,30}$/.test(normalizedUsername)) {
      return res.status(400).json({ message: 'Username must be 3–30 characters (letters, numbers, dots, underscores).' });
    }
    if (!normalizedFullName || normalizedFullName.length > 100) {
      return res.status(400).json({ message: 'Full name must be between 1 and 100 characters.' });
    }
    if (password.length < 8 || password.length > 128) {
      return res.status(400).json({ message: 'Password must be between 8 and 128 characters.' });
    }

    const existingUser = await User.findOne({
      $or: [{ emailOrPhone: normalizedContact }, { username: normalizedUsername }],
    }).lean();
    if (existingUser) {
      const field = existingUser.username === normalizedUsername ? 'username' : 'email or phone';
      return res.status(409).json({ message: `That ${field} is already registered.` });
    }

    const passwordHash = await bcrypt.hash(password, 12);
    const user = await User.create({
      emailOrPhone: normalizedContact,
      fullName: normalizedFullName,
      username: normalizedUsername,
      passwordHash,
    });
    setSessionCookie(user.id, res);
    return res.status(201).json({ user: publicUser(user) });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ message: 'That username or email/phone is already registered.' });
    }
    return next(error);
  }
});

router.post('/login', async (req, res, next) => {
  try {
    const { identifier, password } = req.body || {};
    if (typeof identifier !== 'string' || typeof password !== 'string' || !identifier.trim() || !password) {
      return res.status(400).json({ message: 'Enter your username/email/phone and password.' });
    }

    const normalizedIdentifier = identifier.trim().toLowerCase();
    const user = await User.findOne({
      $or: [
        { emailOrPhone: normalizeEmailOrPhone(identifier) },
        { username: normalizedIdentifier },
      ],
    }).select('+passwordHash');
    if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
      return res.status(401).json({ message: 'Invalid username/email/phone or password.' });
    }

    setSessionCookie(user.id, res);
    return res.json({ user: publicUser(user) });
  } catch (error) {
    return next(error);
  }
});

router.get('/me', requireAuth, async (req, res, next) => {
  try {
    if (!mongoose.isValidObjectId(req.authUserId)) {
      return res.status(401).json({ message: 'Invalid session.' });
    }
    const user = await User.findById(req.authUserId).lean();
    if (!user) return res.status(401).json({ message: 'Account no longer exists.' });
    return res.json({ user: publicUser(user) });
  } catch (error) {
    return next(error);
  }
});

router.post('/logout', (_req, res) => {
  res.clearCookie(COOKIE_NAME, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
  });
  return res.json({ message: 'Logged out.' });
});

module.exports = router;
