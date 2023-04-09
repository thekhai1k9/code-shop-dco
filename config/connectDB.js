import mongoose from "mongoose"
import colors from "colors"

const connectDB = async () => {
    try {
        const connects = await mongoose.connect(process.env.MONGO_URL)
        console.log(`Connect to mongodb ${connects.connection.host}`.bgMagenta.white)
    }catch (error) {
        console.log(`Error throw in mongoDB ${error}`.bgRed.white)
        throw(error)
    }
}

export default connectDB