import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://lakshaybansal44:lakshay3048@cluster0.xetni5u.mongodb.net/food-delivery').then(()=>console.log("DB Connected"));

}