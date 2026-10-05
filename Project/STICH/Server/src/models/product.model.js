import mongoose from 'mongoose'

const productSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,

    },
    images: {
        type: [{
            type: String
        }],
        validate: {
            validator: images => images.length <= 5,
            message: "Aproduct has almost 5 images "
        }
    },
    price: {
        amount: {
            type: Number,
            required: true
        },
        currency: {
            type: String,
            enum: ["INR", "USD"],
            default: "INR"
        }
    },
    clothInfo: [

        {
            size: {
                type: String,
                enum: ["XS", "S", "M", "L", "XL", "XXL"],
                required: true
            },
    
            stock: {
                type: Number,
                min: 0,
                default: 0
            }
        }
    ],
    seller:{
        type:mongoose.Types.ObjectId,
        ref:"users",
        required:true
    }
})