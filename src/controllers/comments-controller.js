// import { db } from "../models/db.js";

// export const commentsController = {
//   index: {
//     handler: async (request, h) => {
//       const comments = await db.commentStore.getAllComments();
//       const viewData = {
//         title: "Comments",
//         comments: comments,
//       };

//       return h.view("main", viewData);
//     },
//   },

//   addComment: {
//     handler: async (request, h) => {
//       try {
//         // const loggedInUser = request.auth.credentials;
//         const newComments = {
//           title: request.payload.title,
//           date: new Date(request.payload.date).toDateString(),
//           body: request.payload.body,
//           // userid: loggedInUser._id
//         };
//         console.log(newComments);
//         await db.commentStore.addComment(newComments);
//         return h.redirect(`/`);
//       } catch (error) {
//         console.log(error);
//         return false;
//       }
//     },
//   },
// };
