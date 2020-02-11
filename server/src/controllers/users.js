import User from '../models/user';

exports.register = async (req, res) => {
  // Create a new user

  try {
    const user = new User(req.body);
    await user.save();
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (error) {
    // eslint-disable-next-line
    console.log(error);
    res.status(400).send(error);
  }
};

exports.login = async (req, res) => {
  // Login a registered user
  try {
    const { email, password } = req.body;
    const user = await User.findByCredentials(email, password);

    if (!user) {
      return res
        .status(401)
        .send({ error: 'Login failed! Check authentication credentials' });
    }

    const token = await user.generateAuthToken();
    res.send({ user, token });
    return undefined;
  } catch (error) {
    res.status(400).send(error);
    return undefined;
  }
};

exports.profile = async (req, res) => {
  // View logged in user profile
  res.send({ user: req.user });
};

exports.logout = async (req, res) => {
  // Log user out of the application
  try {
    req.user.tokens = req.user.tokens.filter(
      (token) => token.token !== req.token,
    );
    await req.user.save();
    res.send();
    return undefined;
  } catch (error) {
    res.status(500).send(error);
    return undefined;
  }
};

exports.logoutAll = async (req, res) => {
  // Log user out of all devices
  try {
    req.user.tokens.splice(0, req.user.tokens.length);
    await req.user.save();
    res.send();
  } catch (error) {
    res.status(500).send(error);
  }
};