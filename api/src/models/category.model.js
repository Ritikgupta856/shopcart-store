import mongoose from "mongoose";

const categorySchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  slug: {
    type:String,
    required: true,
    unique: true
  },

  image: {
    type: String,
    required: true,
  },
},
{
  timestamps:true
}

);

export const Category = mongoose.model("Category", categorySchema);
