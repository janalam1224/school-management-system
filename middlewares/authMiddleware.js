import jwt from 'jsonwebtoken';

export const requireAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if(!authHeader || !authHeader.startsWith("Bearer ")){
    return res.status(401).json({ message: "Token not found" });
  }
  const token = authHeader.split(' ')[1];
  const decoded = jwt.verify(token, process.env.SECRET_KEY);
  req.user = decoded;
  next();
}

export const generateToken = (userData) => {
  return jwt.sign(userData, process.env.SECRET_KEY, {expiresIn:process.env.EXPIRES_JWT_IN });
}