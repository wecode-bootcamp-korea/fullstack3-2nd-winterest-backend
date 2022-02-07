import jwt from 'jsonwebtoken';

const validateUser = async (req, res, next) => {
  const token = req.headers.authorization;

  if (token) {
    const { SECRET } = process.env;
    const { id } = jwt.verify(token, SECRET);

    req.userId = id;
  }

  next();
};

export default validateUser;
