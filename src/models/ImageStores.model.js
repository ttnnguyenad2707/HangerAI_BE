import { Schema, model } from "mongoose";

const ImageStores = new Schema({
    url: {
        type: String,
        require: true,
    },
    description: {
        type: String,
        default: "",

    }

})

export default model("ImageStores", ImageStores)