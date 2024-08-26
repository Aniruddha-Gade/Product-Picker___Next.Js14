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