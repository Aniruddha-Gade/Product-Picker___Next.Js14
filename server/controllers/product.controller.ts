import { NextFunction, Request, Response } from 'express';
import { catchAsyncError } from "../utils/catchAsyncError";
import ErrorHandler from "../utils/ErrorHandler";
import ProductModel from '../models/product.model';




// =========================== CREATE PRODUCT ===========================
interface ICreateProductBody {
    title: string;
    description: string;
    images: string[];
    price: string;
}

export const createProduct = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {

        // get data
        const { title, description, images, price } = req.body as ICreateProductBody;
        const createdBy = req.user?._id;

        // Validate required fields
        if (!title || !description || !images || !price) {
            return next(new ErrorHandler('title, description, images, price are fields required', 400, "Error while creating product"));
        }

        // Create a new product
        const product = await ProductModel.create({
            title,
            description,
            images,
            price,
            createdBy
        });

        // send success response
        res.status(201).json({
            success: true,
            message: "Product created successfully",
            product
        });

    } catch (error) {
        return next(new ErrorHandler(error.message, 400, "Error while creating product"));
    }
});




// =========================== GET PRODUCTS ===========================
export const getProducts = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {


        const createdBy = req.user?._id;

        // Find user's products
        const products = await ProductModel.find({ createdBy });

        // send success response
        res.status(201).json({
            success: true,
            products,
            message: "Product fetched successfully",
        });

    } catch (error) {
        return next(new ErrorHandler(error.message, 400, "Error while fetching product"));
    }
});





// =========================== GET SINGLE PRODUCT ===========================
export const getSingleProduct = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {

        const createdBy = req.user?._id;
        const productId = req.body.id

        // Find user's products
        const product = await ProductModel.findById(productId, { createdBy });

        // send success response
        res.status(201).json({
            success: true,
            product,
            message: "Product found successfully",
        });

    } catch (error) {
        return next(new ErrorHandler(error.message, 400, "Error while creating product"));
    }
});

