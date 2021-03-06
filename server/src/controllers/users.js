import User from '../models/user';

exports.register = async (req, res) => {
  // Create a new user
  try {
    const user = new User(req.body);
    await user.save();
    await user.generateAuthToken(res);
    res.status(201).send({ user });
  } catch (error) {
    // eslint-disable-next-line
    res.status(400).send(error);
  }
};

exports.login = async (req, res) => {
  // Login a registered user
  try {
    const { email, password } = req.body;
    const user = await User.findByCredentials(email, password);

    if (!user) {
      res
        .status(401)
        .send({ error: 'Login failed! Check authentication credentials' });
    }

    await user.generateAuthToken(req, res);

    res.status(200).send({ user });
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.profile = async (req, res) => {
  // View logged in user profile
  res.send({ user: req.user });
};

exports.update = async (req, res) => {
  const response = await User.updateOne({ _id: req.user._id }, req.body);
  // View logged in user profile
  res.send(response);
};

exports.logout = async (req, res) => {
  // Log user out of the application
  try {
    res.clearCookie('token', { domain: req.headers.host });
    res.status(200).send('User logged out successfully.');
  } catch (error) {
    res.status(500).send(error);
  }
};
