import ApiResponse from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const verifyRole = (role) =>
  asyncHandler(async (req, res, next) => {
    if (!req.user || req.user.userType !== role) {
      return res.status(403).json(new ApiResponse(403, "Access denied"));
    }
    next();
  });

export default verifyRole;
