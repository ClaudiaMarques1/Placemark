import { UserSpec, UserCredentialsSpec } from "../models/joi-schemas.js";
import { db } from "../models/db.js";
import bcrypt from "bcrypt"; //Library Import for Hash and Salting Password. Encrypts the passwords

const saltRounds = 10; //this in fact means a cost factor, it monitors how long is needed to calculate a BCrypt hash password.

export const accountsController = {
  index: {
    auth: false,
    handler: async function (request, h) {
      const viewData = {
        title: "Welcome to Placemark",
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
      user.password = await bcrypt.hash(user.password, saltRounds); // this turns the password the user inputs into a hash password in the database.
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
      const passwordsMatch = await bcrypt.compare(password, user.password); // comparing to the password created in Register
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

  loginOauth: { // This is the OAuth Login function that creates a new user using their Github Name and Email to Register and then uses those credentials to sign-in
    auth: "github-oauth",
    handler: async function (request, h) {
      if (request.auth.isAuthenticated) {
        console.log(request.auth.credentials)
        const Name = request.auth.credentials.profile.displayName.split(" ");
        const newUser = {
          firstName: Name[0],
          lastName: Name[1],
          email: request.auth.credentials.profile.email
        };
        const user = await db.userStore.addUser(newUser);
        request.cookieAuth.set({ id: user._id });
        return h.redirect("/dashboard");
      }
      return h.redirect("/");
    },
  },
};

