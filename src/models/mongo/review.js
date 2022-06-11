import Mongoose from "mongoose";

const { Schema } = Mongoose;

const reviewSchema = new Schema({
    rating: Number,
    comment: String,
    userid: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    placemarkid: {
        type: Schema.Types.ObjectId,
        ref: "Placemark",
    },
});

export const Review = Mongoose.model("Review", reviewSchema);