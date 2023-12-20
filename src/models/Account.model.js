import { Schema, Types, model } from "mongoose";


const Account = new Schema({
    name: {
        type: String,
        default: null,

    },

    email: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 50,
        unique: true
    },
    phone: {
        type: String,
        minlength: 10,
        default: null,

    },
    avatar: {
        type: String,
        default: null,
    },
    password: {
        type: String,
        // required: true,
        minlength: 8,
    },
    provider: {
        type: String,
        default: "register"
    },
    admin: {
        type: Boolean,
        default: false,
    },
    levelAccount: {
        type: String,
        enum: ["Lite", "Pro", "Premium"],
        default: "Lite"
    },
    credit :{
        type: Number,
        default: 5,
    },
    lastReset: {
        type: Date,
        default: Date.now
    },
    status: {
        type: Boolean,
        default: true,
    },
    refreshToken: {
        type: String,
        default: null,

    },
    passwordResetCode: {
        type: Schema.Types.ObjectId,
        default: null,
        ref: "PasswordResetCode",
    },
    imageStores: [{
        type: Schema.Types.ObjectId,
        default: null,
        ref: "ImageStores",
    }]
}, { timestamps: true });
export default model("Account", Account)