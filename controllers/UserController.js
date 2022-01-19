import userService from '../services/userService';

const signUp = async (req, res) => {
  try {
    const { email, password, name } = req.body;
    const REQUIRED_KEYS = { email, password, name };
    for (let key in REQUIRED_KEYS) {
      if (!REQUIRED_KEYS[key]) {
        return res.status(409).json({ message: 'KEY_ERROR' });
      }
    }

    await userService.signUp(email, password, name);

    const accessToken = await userService.signIn(email, password);
    return res
      .status(201)
      .json({ message: 'CREATE_SUCCESS', token: accessToken });
  } catch (err) {
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const REQUIRED_KEYS = { email, password };
    for (let key in REQUIRED_KEYS) {
      if (!REQUIRED_KEYS[key]) {
        return res.status(409).json({ message: 'KEY_ERROR' });
      }
    }

    const accessToken = await userService.signIn(email, password);
    return res
      .status(201)
      .json({ message: 'LOGIN_SUCCESS', token: accessToken });
  } catch (err) {
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

export default { signUp, signIn };
