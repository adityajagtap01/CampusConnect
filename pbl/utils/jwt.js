import jwt from 'jsonwebtoken';
const JWT_SECRET = '63911494064546ef5ac920c347aa99b56fe6a84c5aad7dda053b864c643c401b';
export const generateToken = (userId) => {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: '1d' });
};
export const verifyToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
};
