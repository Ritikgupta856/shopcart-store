import dotenv from 'dotenv'
import mongoose from 'mongoose'

dotenv.config({
    path:'./env'
})

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log('Mongodb connection successfull!!')
    } catch (error) {
        console.log('Error connecting to database',error)
        process.exit(1)
    }
}


export default connectDB;

