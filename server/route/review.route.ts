import { Router } from "express";
import { isAdmin, isAuthenticated, isTeamMember } from "../middleware/auth";
import { getAllPendingReviews, reviewSubmission, submitReview } from "../controllers/review.controller";

const reviewRouter = Router()



// only for Team Member
reviewRouter.post('/submit-review/:productId', isAuthenticated, isTeamMember, submitReview)


// only for Admin
reviewRouter.put('/review-submission/:reviewId', isAuthenticated, isAdmin, reviewSubmission)
reviewRouter.get('/get-pending-reviews', isAuthenticated, isAdmin, getAllPendingReviews)




export default reviewRouter