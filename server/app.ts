import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRouter from "./route/user.route";

require("dotenv").config();

export const app = express();

// body parser
app.use(express.json({ limit: "50mb" }));
// cookie parser
app.use(cookieParser());
// cors => cors
app.use(
    cors({
        origin: process.env.ORIGIN,
    })
);



// mount routes
app.use('/api/v1/auth', userRouter)



// Default Route
app.get('/', (req: Request, res: Response,) => {
    // console.log('Your server is up and running..!');
    res.send(`<div>
    <h1>Product Picker Backend</h1>
    <p>This is Default Route</p>
    <p>Everything is OK</p>
    </div>`);
})


// testing route
app.get('/test', (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({
        success: true,
        message: 'API is working'
    })
})


// unknown route
app.all('*', (req: Request, res: Response, next: NextFunction) => {
    const error = new Error(`Route ${req.originalUrl} not found`) as any
    error.statusCode = 404
    next(error)
})


