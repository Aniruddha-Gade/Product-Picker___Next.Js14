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
