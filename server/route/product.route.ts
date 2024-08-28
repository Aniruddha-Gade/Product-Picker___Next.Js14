import { Router } from "express";
import { isAuthenticated } from "../middleware/auth";
import { createProduct, getProducts, getSingleProduct } from "../controllers/product.controller";

const productRouter = Router()


productRouter.post('/create-product', isAuthenticated, createProduct)
productRouter.get('/get-products', isAuthenticated, getProducts)
productRouter.post('/get-single-product', isAuthenticated, getSingleProduct)





export default productRouter