import dotenv from "dotenv"
import express from "express"
import morgan from "morgan" 
import colors from "colors"
import connectDB from "./config/connectDB.js"
import authRoutes from "./routes/authRoute.js"
import cors from "cors"


//config dotenv
dotenv.config()

///connect database
connectDB()

//rest obj
const app = express()

//middlewares
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))


//routes
app.use("/api/v1/auth", authRoutes)

//rest api
app.get('/', (req, res) => {
    return res.send("1234 alo")
})



//PORT 9999 || 8888
const PORT = process.env.PORT || 8888;

app.listen( PORT, () => {
    console.log(`server running ${process.env.DEV_MODE} onport: ${PORT}`.bgCyan.white)
})