import Mongoose from "mongoose";

const { Schema } = Mongoose;

const commentSchema = new Schema({
  title: String,
  date: String,
  body: String,
  userid: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  commentid: {
    type: Schema.Types.ObjectId,
    ref: "Comment",
  },
});

export const Comment = Mongoose.model("Comment", commentSchema);
