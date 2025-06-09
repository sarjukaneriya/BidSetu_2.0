const User = require('../models/User');
const { postRFQ } = require('./rfqController');
const { submitQuote } = require('./quoteController');

async function getUsers(req,res){
  const users = await User.find();
  res.json(users);
}

async function banUser(req,res){
  const { id } = req.params;
  await User.findByIdAndDelete(id);
  res.json({ message:'User deleted' });
}

module.exports = { getUsers, banUser, postRFQ, submitQuote };
