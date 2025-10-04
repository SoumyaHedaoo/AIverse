import { clerkClient } from "@clerk/express";
import { expressAsyncHandler } from "../utils/expressAsyncHandler";
import { ApiError } from "../utils/apiError";
import { PREMIUM_PLAN } from "../constant";

/**
 * A middleware that check user status , userPlan , userFreeUsage and inject it in req.body object
 * 
 * @param {req , res , next}
 * @returns {promise<void>}
 * @throws {error} : 404 when user not logged in 
 * 
 */

const userAccessMiddleware = expressAsyncHandler(async (req, res, next) => {
  const { userId, has } = req.auth();
  const hasPremiumPlan = has({ plan: PREMIUM_PLAN });
  const user = await clerkClient.users.getUser(userId);

  if (!user) {
    throw new ApiError(404, "User not logged in");
  }

  req.user = user;

  const freeUsage = typeof user.privateMetadata?.free_usage === "number" ? user.privateMetadata.free_usage : 0;

  if (!hasPremiumPlan && freeUsage > 0) {
    req.free_usage = freeUsage;
  } else {
    // Reset free usage to 0 if plan is premium or no free usage left
    await clerkClient.users.updateUserMetadata(userId, {
      privateMetadata: { free_usage: 0 },
    });
    req.free_usage = 0;
  }

  req.plan = hasPremiumPlan ? PREMIUM_PLAN : "free";

  next();
});

export { userAccessMiddleware };
