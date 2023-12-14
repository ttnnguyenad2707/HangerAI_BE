import { Schema, model } from "mongoose";

const ImageStores = new Schema({
    accountId: {
        type: Schema.Types.ObjectId,
        ref: "Account",
        require: true,
    },
    url: {
        type: String,
        require: true,
    },
    description: {
        type: String,
        default: "",
    },
    deleted: {
        type: Boolean,
        default: false,
    },
    deletedAt: {
        type: Date,
        default: null,
    },



}, { timestamps: true })

export default model("ImageStores", ImageStores)