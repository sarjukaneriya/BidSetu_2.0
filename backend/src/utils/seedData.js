import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "../models/user.model.js";
import RFQ from "../models/rfq.model.js";
import Quote from "../models/quote.model.js";
import connectDB from "../db/index.js";

dotenv.config({ path: "../env" });

const seed = async () => {
  await connectDB();

  await User.deleteMany({});
  await RFQ.deleteMany({});
  await Quote.deleteMany({});

  const buyer = await User.create({
    fullName: "Buyer One",
    email: "buyer@test.com",
    password: "password",
    userType: "buyer",
  });

  const seller1 = await User.create({
    fullName: "Seller A",
    email: "seller1@test.com",
    password: "password",
    userType: "seller",
  });
  const seller2 = await User.create({
    fullName: "Seller B",
    email: "seller2@test.com",
    password: "password",
    userType: "seller",
  });

  const rfq1 = await RFQ.create({
    itemName: "Steel Bolt",
    category: "Hardware",
    quantity: 1000,
    unit: "pcs",
    deadline: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    location: "Pune",
    buyerId: buyer._id,
  });

  const rfq2 = await RFQ.create({
    itemName: "Copper Wire",
    category: "Electrical",
    quantity: 500,
    unit: "kg",
    deadline: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
    location: "Mumbai",
    buyerId: buyer._id,
  });

  const rfq3 = await RFQ.create({
    itemName: "Plastic Gear",
    category: "Mechanical",
    quantity: 200,
    unit: "pcs",
    deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    location: "Delhi",
    buyerId: buyer._id,
  });

  await Quote.create({ rfqId: rfq1._id, sellerId: seller1._id, price: 10, deliveryDays: 5, gstIncluded: true });
  await Quote.create({ rfqId: rfq1._id, sellerId: seller2._id, price: 9, deliveryDays: 6, gstIncluded: false, status: "Awarded" });
  await Quote.create({ rfqId: rfq2._id, sellerId: seller1._id, price: 20, deliveryDays: 4, gstIncluded: true });
  await Quote.create({ rfqId: rfq2._id, sellerId: seller2._id, price: 18, deliveryDays: 5, gstIncluded: true });
  await Quote.create({ rfqId: rfq3._id, sellerId: seller1._id, price: 30, deliveryDays: 7, gstIncluded: false });

  console.log("Seed data inserted");
  mongoose.connection.close();
};

seed();
