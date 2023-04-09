import bcrypt from "bcrypt"


//Hash password
export const hashPassword = async (password) => {
    try {
        const saltRound = 10
        const hashedPassword = await bcrypt.hash(password, saltRound)
        return hashedPassword
    }catch (error){
        console.log("Error message ====", error)
        throw(error)
    }
}


export  const comparePassword = async (password, hashedPassword) => {
    //So sánh mật khẩu BcryptJS
    return bcrypt.compare(password, hashedPassword)
}