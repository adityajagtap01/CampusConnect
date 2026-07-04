import jwt from 'jsonwebtoken';
const JWT_SECRET = process.env.JWT_SECRET;
export const authenticate = (req, res, next) => {
  const token = req.cookies.auth_token;

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    //  )
    req.userId = decoded.userId;
    next();
  } catch (err) {
    console.log(err)
    res.status(403).json({ error: 'Token invalid or expired' });
  }
};
