import { v4 } from "uuid";
import { markerMemStore } from "./marker-mem-store.js";

let comment = [];

export const commentMemStore = {
  async getAllComments() {
    return comment;
  },

  async addComment(comment) {
    comment._id = v4();
    comment.push(comment);
    return comment;
  },

  async getCommentById(id) {
    const list = comment.find((comment) => comment._id === id);
    if (list) {
      list.markers = await markerMemStore.getMarkersByPlacemarkId(list._id);
      return list;
    }
    return null;
  },

  async getUserComments(userid) {
    return comment.filter((comment) => comment.userid === userid);
  },

  async deleteCommentById(id) {
    const index = comment.findIndex((comment) => comment._id === id);
    if (index !== -1) comment.splice(index, 1);
  },

  async deleteAllComments() {
    comment = [];
  },
};