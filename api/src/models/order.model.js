import mongoose from "mongoose";

const orderSchema = mongoose.Schema(
 {
    products:{
        type:[{}],
        required:true
    },

    user:{
        type:String,
       
    },
    totalAmount:{
        type:Number,
        required:true,
    }

 },



{
  timestamps:true
}

);

export const Order = mongoose.model("Order", orderSchema);
