import { Router } from "express";
import { registerUser, activateUser } from './../controllers/user.controller';

const userRouter = Router()

userRouter.post('/registration', registerUser)
userRouter.post('/activate-user', activateUser)




export default userRouter