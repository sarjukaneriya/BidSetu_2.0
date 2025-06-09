const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const authRoutes = require('./routes/auth');
const rfqRoutes = require('./routes/rfq');
const quoteRoutes = require('./routes/quote');
const adminRoutes = require('./routes/admin');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/rfq', rfqRoutes);
app.use('/api/quote', quoteRoutes);
app.use('/api/admin', adminRoutes);

app.get('/', (req,res)=>res.send('BidSetu backend'));

mongoose.connect(process.env.MONGO_URI||'')
  .then(()=>{
    app.listen(process.env.PORT||5000, ()=>{
      console.log('Server running');
    });
  })
  .catch(err=>console.error(err));
