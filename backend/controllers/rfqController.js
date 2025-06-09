const RFQ = require('../models/RFQ');
const User = require('../models/User');
const cloudinary = require('../config/cloudinary');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.example.com',
  port: 587,
  auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS }
});

async function postRFQ(req,res){
  const { itemName,quantity,category,deadline } = req.body;
  let fileUrl = '';
  if(req.file){
    const result = await cloudinary.uploader.upload(req.file.path);
    fileUrl = result.secure_url;
  }
  const rfq = await RFQ.create({ itemName,quantity,category,deadline,fileUrl,buyerId:req.user.id });

  // notify sellers by email (simplified)
  const sellers = await User.find({ role:'seller' });
  sellers.forEach(s => transporter.sendMail({
    to:s.email,
    subject:'New RFQ',
    text:`A new RFQ has been posted in ${category}`
  }));

  res.json(rfq);
}

async function getRFQs(req,res){
  const rfqs = await RFQ.find();
  res.json(rfqs);
}

async function awardRFQ(req,res){
  const { id } = req.params;
  const rfq = await RFQ.findByIdAndUpdate(id,{ status:'awarded' },{ new:true });
  res.json(rfq);
}

module.exports={ postRFQ,getRFQs,awardRFQ };
