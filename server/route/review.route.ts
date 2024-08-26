import { Router } from "express";
import { isAuthenticated, isTeamMember } from "../middleware/auth";
import { submitReview } from "../controllers/review.controller";

const reviewRouter = Router()



// only for Team Member
reviewRouter.post('/submit-review/:productId', isAuthenticated, isTeamMember, submitReview)





export default reviewRouter