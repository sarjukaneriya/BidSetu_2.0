const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

async function register(req,res){
  const { name,email,password,role } = req.body;
  const hashed = await bcrypt.hash(password,10);
  const user = await User.create({ name,email,password:hashed,role });
  res.json(user);
}

async function login(req,res){
  const { email,password } = req.body;
  const user = await User.findOne({ email });
  if(!user) return res.status(400).json({ message:'Invalid' });
  const match = await bcrypt.compare(password,user.password);
  if(!match) return res.status(400).json({ message:'Invalid' });
  const token = jwt.sign({ id:user._id, role:user.role },process.env.JWT_SECRET,{ expiresIn:'1d' });
  res.json({ token, user:{id:user._id,name:user.name,role:user.role} });
}

module.exports={ register, login };
