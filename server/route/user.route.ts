import { Router } from "express";
import { registerUser, activateUser, loginUser, logoutUser } from './../controllers/user.controller';
import { isAuthenticated } from "../middleware/auth";

const userRouter = Router()

userRouter.post('/registration', registerUser)
userRouter.post('/activate-user', activateUser)
userRouter.post('/login', loginUser)
userRouter.get('/logout', isAuthenticated, logoutUser)




export default userRouter