import RFQ from "../models/rfq.model.js";
import Quote from "../models/quote.model.js";
import scoreQuote from "../utils/aiQuoteScorer.js";
import ApiResponse from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.USER_EMAIL,
    pass: process.env.USER_PASSWORD,
  },
});

export const postRFQ = asyncHandler(async (req, res) => {
  const { itemName, category, quantity, unit, deadline, location, fileUrl } = req.body;
  const rfq = await RFQ.create({
    itemName,
    category,
    quantity,
    unit,
    deadline,
    location,
    fileUrl,
    buyerId: req.user._id,
  });

  // notify all sellers (simplified)
  try {
    await transporter.sendMail({
      from: process.env.USER_EMAIL,
      to: process.env.USER_EMAIL,
      subject: "New RFQ posted",
      text: `RFQ ${rfq.itemName} has been posted.`,
    });
  } catch (e) {
    console.error(e);
  }

  res.status(201).json(new ApiResponse(201, "RFQ created", rfq));
});

export const getMyRFQs = asyncHandler(async (req, res) => {
  const rfqs = await RFQ.find({ buyerId: req.user._id });
  res.json(new ApiResponse(200, "My RFQs", rfqs));
});

export const getOpenRFQs = asyncHandler(async (req, res) => {
  const rfqs = await RFQ.find({ status: "Open" });
  res.json(new ApiResponse(200, "Open RFQs", rfqs));
});

export const submitQuote = asyncHandler(async (req, res) => {
  const { price, deliveryDays, gstIncluded, comment } = req.body;
  const { rfqId } = req.params;

  const quote = await Quote.create({
    rfqId,
    sellerId: req.user._id,
    price,
    deliveryDays,
    gstIncluded,
    comment,
  });

  const rfq = await RFQ.findById(rfqId);
  if (rfq) {
    await transporter.sendMail({
      from: process.env.USER_EMAIL,
      to: process.env.USER_EMAIL,
      subject: "Quote Submitted",
      text: `A new quote has been submitted for RFQ ${rfq.itemName}.`,
    });
  }

  res.status(201).json(new ApiResponse(201, "Quote submitted", quote));
});

export const getQuotesByRFQ = asyncHandler(async (req, res) => {
  const { rfqId } = req.params;
  const quotes = await Quote.find({ rfqId }).populate("sellerId", "fullName email");
  if (!quotes) {
    return res.status(404).json(new ApiResponse(404, "No quotes"));
  }
  const lowest = Math.min(...quotes.map((q) => q.price));
  let bestScore = Infinity;
  quotes.forEach((q) => {
    const score = scoreQuote(q.price, q.deliveryDays, 5);
    q.aiScore = score;
    q.isLowest = q.price === lowest;
    if (score < bestScore) bestScore = score;
  });
  quotes.forEach((q) => {
    q.isRecommended = q.aiScore === bestScore;
  });
  res.json(new ApiResponse(200, "Quotes", quotes));
});

export const awardQuote = asyncHandler(async (req, res) => {
  const { quoteId } = req.params;
  const quote = await Quote.findById(quoteId).populate("sellerId", "email fullName");
  if (!quote) return res.status(404).json(new ApiResponse(404, "Quote not found"));

  quote.status = "Awarded";
  await quote.save();
  await Quote.updateMany({ rfqId: quote.rfqId, _id: { $ne: quoteId } }, { status: "Rejected" });
  await RFQ.findByIdAndUpdate(quote.rfqId, { status: "Awarded" });

  try {
    await transporter.sendMail({
      from: process.env.USER_EMAIL,
      to: quote.sellerId.email,
      subject: "RFQ Awarded",
      text: `Congratulations ${quote.sellerId.fullName}, your quote has been awarded.`,
    });
  } catch (e) {
    console.error(e);
  }

  res.json(new ApiResponse(200, "Quote awarded", quote));
});
