import { Router } from "express";
import { isAdmin, isAuthenticated, isTeamMember } from "../middleware/auth";
import { reviewSubmission, submitReview } from "../controllers/review.controller";

const reviewRouter = Router()



// only for Team Member
reviewRouter.post('/submit-review/:productId', isAuthenticated, isTeamMember, submitReview)


// only for Admin
reviewRouter.put('/review-submission/:reviewId', isAuthenticated, isAdmin, reviewSubmission)




export default reviewRouter