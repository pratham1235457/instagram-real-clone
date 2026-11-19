const jwt = require('jsonwebtoken');

const COOKIE_NAME = 'instagram_session';

function requireAuth(req, res, next) {
  const token = req.cookies?.[COOKIE_NAME];
  if (!token) {
    return res.status(401).json({ message: 'Authentication required.' });
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.authUserId = payload.sub;
    return next();
  } catch {
    return res.status(401).json({ message: 'Session expired. Please log in again.' });
  }
}

module.exports = { COOKIE_NAME, requireAuth };
