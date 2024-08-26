import { Router } from "express";
import { registerUser, activateUser, loginUser, logoutUser } from './../controllers/user.controller';

const userRouter = Router()

userRouter.post('/registration', registerUser)
userRouter.post('/activate-user', activateUser)
userRouter.post('/login', loginUser)
userRouter.get('/logout', logoutUser)




export default userRouter