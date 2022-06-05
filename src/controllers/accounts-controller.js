import { UserSpec, UserCredentialsSpec } from "../models/joi-schemas.js";
import { db } from "../models/db.js";
import bcrypt from "bcrypt";

const saltRounds = 10;

export const accountsController = {
  index: {
    auth: false,
    handler: async function (request, h) {
      const comments = await db.commentStore.getAllComments();
      const viewData = {
        title: "Welcome to Placemark",
        comments: comments,
      };
      return h.view("main", viewData);
    },
  },
  showSignup: {
    auth: false,
    handler: function (request, h) {
      return h.view("signup-view", { title: "Sign up for Placemark" });
    },
  },
  signup: {
    auth: false,
    validate: {
      payload: UserSpec,
      options: { abortEarly: false },
      failAction: function (request, h, error) {
        return h.view("signup-view", { title: "Sign up error", errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      const user = request.payload;
      user.password = await bcrypt.hash(user.password, saltRounds);
      await db.userStore.addUser(user);
      return h.redirect("/");
    },
  },
  showLogin: {
    auth: false,
    handler: function (request, h) {
      return h.view("login-view", { title: "Login to Placemark" });
    },
  },
  login: {
    auth: false,
    validate: {
      payload: UserCredentialsSpec,
      options: { abortEarly: false },
      failAction: function (request, h, error) {
        return h.view("login-view", { title: "Log in error", errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      const { email, password } = request.payload;
      const user = await db.userStore.getUserByEmail(email);
      const passwordsMatch = await bcrypt.compare(password, user.password);
      if (!user || !passwordsMatch) {
        return h.redirect("/");
      }
      request.cookieAuth.set({ id: user._id });
      return h.redirect("/dashboard");
    },
  },
  logout: {
    handler: function (request, h) {
      request.cookieAuth.clear();
      return h.redirect("/");
    },
  },

  async validate(request, session) {
    const user = await db.userStore.getUserById(session.id);
    if (!user) {
      return { valid: false };
    }
    return { valid: true, credentials: user };
  },

  listComment: {
    auth: false,
    handler: function (request, h) {
      return h.view("list-comments", { title: "List of Comments" });
    },
  },
  addComment: {
    handler: async (request, h) => {
      try {
        const newComments = {
          title: request.payload.title,
          date: new Date().toDateString(),
          body: request.payload.body,
        };
        console.log(newComments);
        await db.commentStore.addComment(newComments);
        return h.redirect("/");
      } catch (error) {
        console.log(error);
        return false;
      }
    },
  },
};

