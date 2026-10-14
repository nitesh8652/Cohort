import mongoose from "mongoose";


const cartSchema = new mongoose.Schema({

    products:[
        {
            product:{
                type:mongoose.Schema.Types.ObjectId,
                required:true
            },
            quantity:{
                type:Number,
                default:1,
                min:1
            },
            size:{
                type:String,
                enum: [ "XS","S","M","L",'XXL','XL']
            }
        }
    ],
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users",
        required:true
    }

})


const cardModel = mongoose.model("carts", cartSchema)
export default cardModel