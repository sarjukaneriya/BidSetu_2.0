import mongoose from "mongoose";

const rfqSchema = new mongoose.Schema(
  {
    itemName: { type: String, required: true },
    category: { type: String, required: true },
    quantity: { type: Number, required: true },
    unit: { type: String, required: true },
    deadline: { type: Date, required: true },
    location: { type: String, required: true },
    fileUrl: { type: String },
    status: { type: String, enum: ["Open", "Awarded"], default: "Open" },
    buyerId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

export default mongoose.model("RFQ", rfqSchema);
