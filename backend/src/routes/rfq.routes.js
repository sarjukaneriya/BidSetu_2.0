import { Router } from "express";

import { postRFQ, submitQuote, getQuotesByRFQ, awardQuote, getOpenRFQs, getMyRFQs } from "../controllers/rfq.controller.js";

import { verifyUser } from "../middlewares/auth.middleware.js";
import verifyRole from "../middlewares/verifyRole.middleware.js";

const router = Router();

router.post("/", verifyUser, verifyRole("buyer"), postRFQ);

router.get("/mine", verifyUser, verifyRole("buyer"), getMyRFQs);
router.get("/open", verifyUser, verifyRole("seller"), getOpenRFQs);
router.post("/quote/:rfqId", verifyUser, verifyRole("seller"), submitQuote);
router.get("/quotes/:rfqId", verifyUser, getQuotesByRFQ);
router.post("/award/:quoteId", verifyUser, verifyRole("buyer"), awardQuote);

export default router;
