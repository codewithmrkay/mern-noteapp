import mongoose from "mongoose"

export const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Successfully connected to database")
    } catch (error) {
        console.error("error in database connection : ", error)
        process.exit(1)
    }
}