import { Comment } from "./comment.js";

export const commentMongoStore = {
  async getAllComments() {
    const comments = await Comment.find().lean();
    return comments;
  },

  async getCommentById(id) {
    if (id) {
      const comment = await Comment.findOne({ _id: id }).lean();
      return comment;
    }
    return null;
  },

  async getCommentsByPlacemarkId(placemarkId) {
    if (placemarkId) {
      const comments = await Comment.find({ placemarkid: placemarkId }).lean();
      return comments;
    }
    return null;
  },

  async addComment(comment) {
    const newComments = new Comment(comment);
    const commentObj = await newComments.save();
    return this.getCommentById(commentObj._id);
  },

  // async getUserComments(id) {
  //   const comment = await Comment.find({ userid: id }).lean();
  //   return comment;
  // },

  async deleteCommentById(id) {
    try {
      await Comment.deleteOne({ _id: id });
    } catch (error) {
      console.log("bad id");
    }
  },

  async deleteAllComments() {
    await Comment.deleteMany({});
  },
};
