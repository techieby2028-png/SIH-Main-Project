const register = (req, res) => res.json({ message: "User registered" });
const login = (req, res) => res.json({ token: "fake-jwt-token" });
const getMe = (req, res) => res.json({ user: {} });
const logout = (req, res) => res.json({ message: "Logged out" });

module.exports = {
  register,
  login,
  getMe,
  logout,
  registerUser: register,
  loginUser: login,
  authUser: login,
  getUserProfile: getMe
};
