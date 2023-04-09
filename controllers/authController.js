import userModel from "../models/userModel.js"
import {hashPassword, comparePassword} from "../helpers/authHelper.js"
import JWT from "jsonwebtoken"

export const registerController =  async (req, res) => {
    try {
        const {name, email, password, phone, address} = req.body
        
        //validations
        if(!name) {
            return res.send({message: 'Please required is name!'})
        }
        if(!email) {
            return res.send({message: 'Please required is email!'})
        }
        if(!password) {
            return res.send({message: 'Please required is password!'})
        }
        if(!phone) {
            return res.send({message: 'Please required is phone!'})
        }
        if(!address) {
            return res.send({message: 'Please required is address!'})
        }

        //connect db => kiểm tra user hiện tại
        const exisitingUser = await userModel.findOne({email})
        if(exisitingUser) {
            return res.status(200).send({
                success: true,
                message: "Already Register please login!"
            })
        }

        //register user
        const hashedPassword = await hashPassword(password)

        //save data user
        const user = await new userModel({name, email, phone, address, password: hashedPassword }).save()

        res.status(201).send({
            success: true,
            message: "User Register Successfully.",
            user
        })

    }catch (error) {
        console.log("Error message registerController====", error)
        res.status(500).send({
            success: false,
            message: "Error in Registeration",
            error
        })
    }
}


///method POST login==============================================================>
export const loginController =  async (req, res) => {
    try {
        const {email, password} = req.body

        //validation
        if(!email || !password) {
            return res.status(404).send({
                success: false,
                message: "Invalid userName or password. Required!"
            })
        } 

        //check user
        const user = await userModel.findOne({email})

        if(!user) {
            return res.status(404).send({
                success: false,
                message: "Email is not registed."
            })
        }

        //compere password/ ss password
        const match = await comparePassword(password, user.password)

        if(!match) {
            return res.status(200).send({
                success: false,
                message: "Invalid password."
            })
        }

        //get token
        const token = await JWT.sign({_id: user._id}, process.env.JWT_SECRET, {expiresIn: "7d"})
        res.status(200).send({
            success: true,
            message: "Login successfully",
            user: {
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address
            },
            token
        })


    }catch {
        console.log("Error message loginController ====>", error)
        res.status(500).send({
            success : false,
            message: 'Error login!',
            error
        })
    }
}


//forgot Password================================================>
export const forgotPasswordController =  async (req, res) => {
    try {
        const {email, answer, newPassword} = req.body

        if(!email) {res.status(400).send({message: "Email is required"})}
        if(!answer) {res.status(400).send({message: "Answer is required"})}
        if(!newPassword) {res.status(400).send({message: "New password is required"})}

        //check email user , answer
        const user = await userModel.findOne({email , answer})
        //validation
        if(!user) {
            return res.status(404).send({
                success: false,
                message: "Wrong emal or Aanswer"
            })
        }

        const hashedNewPassWord = await hashPassword(newPassword)
        await userModel.findByIdAndUpdate(user._id, {password: hashedNewPassWord})
        res.status(200).send({
            success: true,
            message: "Password reset Succesfully."
        })

    } catch (error) {
        console.log("This is message err=====>", e)
        res.status(500).send({
            success: false,
            message: "Something went wrong.",
            error
        })
        throw(error)
    }
}

//testController=================================================>
export const testController = async (req, res) => {
    res.send("ok protected!!!")
}


