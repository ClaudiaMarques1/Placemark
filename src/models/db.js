import { userMemStore } from "./mem/user-mem-store.js";
import { placemarkMemStore } from "./mem/placemark-mem-store.js";
import { markerMemStore } from "./mem/marker-mem-store.js";
import { commentMemStore } from "./mem/comment-mem-store.js";
import { userJsonStore } from "./json/user-json-store.js";
import { placemarkJsonStore } from "./json/placemark-json-store.js";
import { markerJsonStore } from "./json/marker-json-store.js";
import { userMongoStore } from "./mongo/user-mongo-store.js";
import { placemarkMongoStore } from "./mongo/placemark-mongo-store.js";
import { markerMongoStore } from "./mongo/marker-mongo-store.js";
import { connectMongo } from "./mongo/connect.js";
import { commentMongoStore } from "./mongo/comment-mongo-store.js";

export const db = {
  userStore: null,
  placemarkStore: null,
  markerStore: null,
  commentStore: null,

  init(storeType) {
    switch (storeType) {
      case "json":
        this.userStore = userJsonStore;
        this.placemarkStore = placemarkJsonStore;
        this.markerStore = markerJsonStore;
        break;
      case "mongo":
        this.userStore = userMongoStore;
        this.placemarkStore = placemarkMongoStore;
        this.markerStore = markerMongoStore;
        this.commentStore = commentMongoStore;
        connectMongo();
        break;
      default:
        this.userStore = userMemStore;
        this.placemarkStore = placemarkMemStore;
        this.markerStore = markerMemStore;
        this.commentStore = commentMemStore;
    }
  }
};
