const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const RFQ = require('./models/RFQ');
const Quote = require('./models/Quote');
const bcrypt = require('bcryptjs');

dotenv.config();

async function seed(){
  await mongoose.connect(process.env.MONGO_URI||'');
  await User.deleteMany();
  await RFQ.deleteMany();
  await Quote.deleteMany();

  const buyerPwd = await bcrypt.hash('buyer123',10);
  const sellerPwd = await bcrypt.hash('seller123',10);

  const buyer = await User.create({ name:'Buyer Co', email:'buyer@example.com', password:buyerPwd, role:'buyer' });
  const seller1 = await User.create({ name:'Seller One', email:'seller1@example.com', password:sellerPwd, role:'seller' });
  const seller2 = await User.create({ name:'Seller Two', email:'seller2@example.com', password:sellerPwd, role:'seller' });

  const rfq1 = await RFQ.create({ itemName:'Bolt', quantity:100, category:'fasteners', deadline:new Date(Date.now()+86400000), buyerId:buyer._id });
  const rfq2 = await RFQ.create({ itemName:'Nut', quantity:200, category:'fasteners', deadline:new Date(Date.now()+172800000), buyerId:buyer._id });
  const rfq3 = await RFQ.create({ itemName:'Washer', quantity:300, category:'fasteners', deadline:new Date(Date.now()+259200000), buyerId:buyer._id });

  await Quote.create({ rfqId:rfq1._id, sellerId:seller1._id, price:10, deliveryDays:5, comment:'quote1' });
  await Quote.create({ rfqId:rfq1._id, sellerId:seller2._id, price:9, deliveryDays:6, comment:'quote2' });
  await Quote.create({ rfqId:rfq2._id, sellerId:seller1._id, price:20, deliveryDays:3, comment:'quote3' });
  await Quote.create({ rfqId:rfq2._id, sellerId:seller2._id, price:21, deliveryDays:4, comment:'quote4' });
  await Quote.create({ rfqId:rfq3._id, sellerId:seller1._id, price:30, deliveryDays:7, comment:'quote5' });

  console.log('Seed completed');
  await mongoose.disconnect();
}
seed();
