
import { NextFunction, Request, Response } from 'express';
import User from '../models/user.model';
import ErrorHandler from './../utils/ErrorHandler';
import { catchAsyncError } from './../utils/catchAsyncError';
import jwt, { JwtPayload, Secret } from 'jsonwebtoken'
import sendMail from './../utils/sendMail';
import path from 'path';
import ejs from 'ejs';
import optGenerator from 'otp-generator';




// =========================== REGISTER USER ===========================
interface IRagistrationBody {
    name: string,
    email: string,
    accountType: string,
    password: string,
}

export const registerUser = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, email, accountType, password } = req.body

        // validate data
        if (!name || !email || !password || !accountType) {
            return next(new ErrorHandler('All fields are required', 400, "Error while registering user"))
        }

        // check user already exist or not
        const isUserAlreadyExist = await User.findOne({ email })
        if (isUserAlreadyExist) {
            return next(new ErrorHandler('User already exist', 400, "Error while registering user"))
        }

        // create user data
        const user: IRagistrationBody = {
            name,
            email,
            password,
            accountType,
        }
 
        // create token and OTP
        const activationToken = createActivationToken(user)
        const activationCode = activationToken.activationCode

        // send otp through email 
        const emailData = { user: { name: user.name, accountType: user.accountType }, activationCode }
        const html = await ejs.renderFile(path.join(__dirname, "../mails/activation-mail.ejs"), emailData)


        try {
            await sendMail({
                email: email,
                subject: "Activate your account on 'Product Picker' Platform",
                template: html,
                emailData
            })

            // send success message
            res.status(201).json({
                success: true,
                activationToken: activationToken.token,
                message: `Please check your email : ${email} to activate your account`
            })
        } catch (error) {
            console.log(`Error while sending email to user with email : ${email} => `, error)
            return next(new ErrorHandler(error.message, 400, "Error while registering user"))
        }

    } catch (error: any) {
        return next(new ErrorHandler(error.message, 400, "Error while registering user"))
    }
})




// =========================== CREATE ACTIVATION TOKEN (JWT TOKEN) ===========================
interface IActivationToken {
    token: string,
    activationCode: string
}

export const createActivationToken = (user: any): IActivationToken => {

    // generate Otp
    const activationCode = optGenerator.generate(4, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false
    })

    const token = jwt.sign(
        {
            user,
            activationCode
        },
        process.env.ACTIVATION_SECRET as Secret,
        {
            expiresIn: "5m"
        }
    );

    return { token, activationCode };
};

