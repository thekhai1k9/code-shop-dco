import express from "express"
import { 
    registerController, 
    loginController, 
    forgotPasswordController,
    //test controller
    testController,
} from "../controllers/authController.js"
import {requireSignIn, isAdmin} from "../middlewares/authMiddleware.js"

const router  = express.Router()

//router============================>>>>

//REGISTER or METHOD POST
router.post('/register', registerController)

///LOGIN or METHOD POST
router.post('/login', loginController)

//Forgot passwrod =====================================>
router.post('/forgot-password', forgotPasswordController)

//TEST ROUTES
router.get('/test', requireSignIn, isAdmin, testController)


//Protedted route auth=================================>
router.get("/user-auth", requireSignIn, (req, res) => {
    res.status(200).send({ ok: true })
})



export default router