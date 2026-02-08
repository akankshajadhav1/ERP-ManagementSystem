const User = require("../models/Users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// register
exports.register = async (req, res) => {
  const { name, email, password, role } = req.body;

  const hashed = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashed,
    role: role || "user"
  });

  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  res.json({ user, token });
};

// login
exports.login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ msg: "User not found" });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(400).json({ msg: "Wrong password" });

  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  res.json({ token, user: { _id: user._id, name: user.name, email: user.email, role: user.role } });
};

// get all users
exports.getUsers = async (req, res) => {
  const users = await User.find().select("-password");
  res.json(users);
}
  ;

// delete user
exports.deleteUser = async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
}
  ;
// update user role
exports.updateUserRole = async (req, res) => {
  const { id } = req.params;
  const { role } = req.body;

  const user = await User.findByIdAndUpdate(
    id,
    { role },
    { new: true }
  ).select("-password");

  res.json(user);
}
  ;

