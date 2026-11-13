import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
    {
        orderId: {
            type: String,
            require: true,
            unique: true
        },
        paymentId: {
            type: String
        },
        signature: {
            type: String
        },
        amount: {
            type: Number,
            require: true
        },
        currency: {
            type: String,
            default: "INR"
        },
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "product",
            required: "true"
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
            required: true
        },
        status: {
            type: String,
            enum: ["pending", "completed", "failed"],
            default: pending
        },
    },
    { timestamps: true }
)

export default mongoose.model("payment", paymentSchema)