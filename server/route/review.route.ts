import { Router } from "express";
import { isAdmin, isAuthenticated, isTeamMember } from "../middleware/auth";
import { getAllPendingReviews, getProfileStats, reviewSubmission, submitReview } from "../controllers/review.controller";

const reviewRouter = Router()

// for Authenticated user
reviewRouter.get('/get-profile-stats', isAuthenticated, getProfileStats)


// only for Team Member
reviewRouter.post('/submit-review/:productId', isAuthenticated, isTeamMember, submitReview)


// only for Admin
reviewRouter.put('/review-submission/:reviewId', isAuthenticated, isAdmin, reviewSubmission)
reviewRouter.get('/get-pending-reviews', isAuthenticated, isAdmin, getAllPendingReviews)




export default reviewRouter