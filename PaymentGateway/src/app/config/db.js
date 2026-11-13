import mongoose, { mongo } from "mongoose";
import _config from "./config.js";

export default async function(){
    await mongoose.connect(config.MONGO_URI)
    console.log("connected to mongo DB")
}