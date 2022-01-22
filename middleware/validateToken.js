import jwt from 'jsonwebtoken';

const validateToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const { SECRET } = process.env;
    const { id } = jwt.verify(token, SECRET);

    req.userId = id;
    next();
  } catch (err) {
    next(err);
    res.status(400).json({ message: 'VALIDATE_ERROR' });
  }
};

export default validateToken;
