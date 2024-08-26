import { Router } from "express";
import { isAuthenticated } from "../middleware/auth";
import { createProduct } from "../controllers/product.controller";

const productRouter = Router()


productRouter.post('/create-product', isAuthenticated, createProduct)





export default productRouter