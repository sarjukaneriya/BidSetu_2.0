const Quote = require('../models/Quote');
const RFQ = require('../models/RFQ');
const { scoreQuotes } = require('../utils/aiQuoteScorer');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.example.com',
  port: 587,
  auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS }
});

async function submitQuote(req,res){
  const { rfqId,price,deliveryDays,comment } = req.body;
  let quote = await Quote.findOne({ rfqId,sellerId:req.user.id });
  if(quote) return res.status(400).json({ message:'Already submitted' });
  quote = await Quote.create({ rfqId,sellerId:req.user.id,price,deliveryDays,comment });

  const rfq = await RFQ.findById(rfqId).populate('buyerId');
  transporter.sendMail({ to: rfq.buyerId.email, subject:'New Quote', text:'A new quote was submitted.' });
  res.json(quote);
}

async function getByRFQ(req,res){
  const { id } = req.params;
  let quotes = await Quote.find({ rfqId:id });
  quotes = scoreQuotes(quotes);
  if(quotes.length){
    const lowest = quotes.reduce((a,b)=>a.price<b.price?a:b);
    quotes = quotes.map(q=>({...q.toObject(),isLowest:q.id===lowest.id}));
  }
  res.json(quotes);
}

module.exports={ submitQuote,getByRFQ };
