import { Router } from "express";
import { RegisterUser } from "../controller/auth.controller.js";
import { RegisterValidator } from "../validation/auth.validator.js";

const AuthRouter = Router()

AuthRouter.post('/register',RegisterValidator, RegisterUser)


export default AuthRouter