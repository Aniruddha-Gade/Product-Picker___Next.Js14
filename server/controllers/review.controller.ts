import { NextFunction, Request, Response } from "express";
import ProductModel from "../models/product.model";
import { catchAsyncError } from "../utils/catchAsyncError";
import ErrorHandler from "../utils/ErrorHandler";
import ReviewModel from './../models/review.model';




// =========================== SUBMIT REVIEW ===========================
export const submitReview = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { productId } = req.params;
        const { updatedFields } = req.body;
        const userId = req.user._id;

        // Check if the product exists
        const product = await ProductModel.findById(productId);
        if (!product) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }

        // Create a new review entry with status as 'pending'
        const newReview = await ReviewModel.create({
            productId: product._id,
            updatedFields,
            submittedBy: userId,
            // status: 'pending'
        });


        return res.status(201).json({
            message: 'Review submitted for approval',
            review: newReview
        });
    }
    catch (error) {
        return next(new ErrorHandler(error.message, 400, "Error while submit review"));
    }
});




// =========================== REVIEW SUBMISSION ===========================
interface IReviewSubmission {
    status: string,
}

export const reviewSubmission = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { reviewId } = req.params;
        const { status } = req.body as IReviewSubmission;  // 'pending' | 'approved' | 'rejected'
        const adminId = req.user?._id;

        // validate data
        if (!reviewId || !status) {
            return next(new ErrorHandler('reviewId and status fields are required', 400, "Error while product review submission"))
        }

        const review = await ReviewModel.findById(reviewId);
        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }

        if (status === 'approved') {
            // Update the product with the approved changes and set status to 'approved'
            await ProductModel.findByIdAndUpdate(
                review.productId,
                { ...review.updatedFields, status: 'approved' }
            );
        }

        review.status = status;
        review.reviewedBy = adminId;
        await review.save();

        return res.status(200).json({
            message: `Review ${status}`,
            review
        });
    } catch (error) {
        return next(new ErrorHandler(error.message, 400, "Error while product review submission"));
    }
});




// =========================== SUBMIT REVIEW ===========================
export const getAllPendingReviews = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {

        // find reviews with 'pending' mark
        const pendingReviews = await ReviewModel.find({
            status: 'pending'
        })
            .populate('submittedBy', 'name email')
            .populate('productId', 'title');



        return res.status(201).json({
            message: 'All pending reviews fetched successfully',
            pendingReviews
        });
    }
    catch (error) {
        return next(new ErrorHandler(error.message, 400, "Error while submit review"));
    }
});




// =========================== GET PROFILE STATS ===========================
interface AdminStats {
    approvedReviews: number;
    rejectedReviews: number;
    pendingReviews: number;
    totalReviews: number;
}

interface TeamMemberStats {
    approvedRequests: number;
    rejectedRequests: number;
    totalReviews: number;
}

type ProfileStats = AdminStats | TeamMemberStats;


export const getProfileStats = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.user._id
        const userRole = req.user?.accountType

        let stats: ProfileStats;

        // Fetch stats for admin
        if (userRole === 'Admin') {
            const totalReviews = await ReviewModel.countDocuments({ reviewedBy: userId })
            const approvedReviews = await ReviewModel.countDocuments({ reviewedBy: userId, status: 'approved' })
            const rejectedReviews = await ReviewModel.countDocuments({ reviewedBy: userId, status: 'rejected' })
            const pendingReviews = await ReviewModel.countDocuments({ status: 'pending' })

            stats = {
                totalReviews,
                approvedReviews,
                rejectedReviews,
                pendingReviews,
            };
            // Fetch stats for team member
        } else if (userRole === 'Team member') {
            const totalReviews = await ReviewModel.countDocuments({ submittedBy: userId })
            const approvedRequests = await ReviewModel.countDocuments({ submittedBy: userId, status: 'approved' })
            const rejectedRequests = await ReviewModel.countDocuments({ submittedBy: userId, status: 'rejected' })
            const pendingReviews = await ReviewModel.countDocuments({ submittedBy: userId, status: 'pending' })

            stats = {
                totalReviews,
                approvedRequests,
                rejectedRequests,
                pendingReviews
            };
        } else {
            return res.status(403).json({ message: 'Unauthorized access' })
        }

        // send suceess response
        return res.status(200).json({
            success: true,
            stats,
            message: "Profile stats fetched successfully"
        });
    }
    catch (error) {
        return next(new ErrorHandler(error.message, 400, "Error while submit review"));
    }
});