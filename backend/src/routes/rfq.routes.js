import { Router } from "express";
import { postRFQ, submitQuote, getQuotesByRFQ, awardQuote } from "../controllers/rfq.controller.js";
import { verifyUser } from "../middlewares/auth.middleware.js";
import verifyRole from "../middlewares/verifyRole.middleware.js";

const router = Router();

router.post("/", verifyUser, verifyRole("buyer"), postRFQ);
router.post("/quote/:rfqId", verifyUser, verifyRole("seller"), submitQuote);
router.get("/quotes/:rfqId", verifyUser, getQuotesByRFQ);
router.post("/award/:quoteId", verifyUser, verifyRole("buyer"), awardQuote);

export default router;
