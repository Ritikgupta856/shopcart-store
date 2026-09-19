import mongoose from "mongoose";

let isConnected = false;

const connectDB = async () => {
  if (isConnected) return;

  try {
    await mongoose.connect(process.env.MONGODB_URI);
    isConnected = true;
    console.log("Mongodb connection successfull!!");
  } catch (error) {
    console.log("Error connecting to database", error);
    throw error;
  }
};

export default connectDB;
