import JWT from "jsonwebtoken"
import userModel from "../models/userModel.js"

//protected token======================================>>>>
export const requireSignIn = async (req, res, next) => {
    try {        
        //decode token database
        const decode = JWT.verify(req.headers.authorization, process.env.JWT_SECRET)
        req.user = decode
        //True -> call this func next() -> handle  chức năng tt
        next()
    }catch (error) {
        console.log("Error =====>", error)
    }  
}

//example admin  access =============================================>
export const isAdmin = async (req, res, next) => {
    try {
        const user = await userModel.findById(req.user._id)

        if(user.role !== 1) {
            return res.status(401).send({
                success: false,
                message: "UnAuthorized not Access"
            })
        } else {
            //True => call funct next() => handle chức năng tiếp theo
            next()
        }

    }catch (error) {
        console.log("Error=======", error)
        res.status(401).send({
            success: false,
            message: "Error  is not admin",
            error
        })
    }
}

