import mongoose from "mongoose";

const quoteSchema = new mongoose.Schema(
  {
    rfqId: { type: mongoose.Schema.Types.ObjectId, ref: "RFQ", required: true },
    sellerId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    price: { type: Number, required: true },
    deliveryDays: { type: Number, required: true },
    gstIncluded: { type: Boolean, default: false },
    comment: { type: String },
    aiScore: { type: Number, default: 0 },
    isRecommended: { type: Boolean, default: false },
    isLowest: { type: Boolean, default: false },
    status: {
      type: String,
      enum: ["Submitted", "Awarded", "Rejected"],
      default: "Submitted",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Quote", quoteSchema);
