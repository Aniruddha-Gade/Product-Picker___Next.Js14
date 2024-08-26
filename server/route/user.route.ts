import { Router } from "express";
import { registerUser, activateUser, loginUser } from './../controllers/user.controller';

const userRouter = Router()

userRouter.post('/registration', registerUser)
userRouter.post('/activate-user', activateUser)
userRouter.post('/login', loginUser)




export default userRouter