import { Router } from "express";
import { registerUser, activateUser, loginUser, logoutUser, updateAccessToken, getUserInfo } from './../controllers/user.controller';
import { isAuthenticated } from "../middleware/auth";

const userRouter = Router()

userRouter.post('/registration', registerUser)
userRouter.post('/activate-user', activateUser)
userRouter.post('/login', loginUser)
userRouter.get('/logout', isAuthenticated, logoutUser)
userRouter.get('/refresh-token', updateAccessToken)
userRouter.get('/userinfo', isAuthenticated, getUserInfo)



export default userRouter