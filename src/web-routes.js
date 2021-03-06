import { accountsController } from "./controllers/accounts-controller.js";
import { dashboardController } from "./controllers/dashboard-controller.js";
import { aboutController } from "./controllers/about-controller.js";
import { placemarkController } from "./controllers/placemark-controller.js";
import { markerController } from "./controllers/marker-controller.js";
import { reviewController } from "./controllers/review-controller.js"; // Using the review controller to link /addreview to AddReview function in Controller

export const webRoutes = [
  { method: "GET", path: "/", config: accountsController.index },
  { method: "GET", path: "/signup", config: accountsController.showSignup },
  { method: "GET", path: "/login", config: accountsController.showLogin },
  { method: "GET", path: "/logout", config: accountsController.logout },
  { method: "POST", path: "/register", config: accountsController.signup },
  { method: "POST", path: "/authenticate", config: accountsController.login },
  { method: "GET", path: "/loginoauth", config: accountsController.loginOauth }, // OAuth GitHub function in Accounts Controller linking function to button.

  { method: "GET", path: "/about", config: aboutController.index },

  { method: "GET", path: "/dashboard", config: dashboardController.index },
  { method: "POST", path: "/dashboard/addplacemark", config: dashboardController.addPlacemark },
  { method: "GET", path: "/dashboard/deleteplacemark/{id}", config: dashboardController.deletePlacemark },

  { method: "GET", path: "/placemark/{id}", config: placemarkController.index },
  { method: "POST", path: "/placemark/{id}/addmarker", config: placemarkController.addMarker },
  { method: "GET", path: "/placemark/{id}/deletemarker/{markerid}", config: placemarkController.deleteMarker },
  { method: "POST", path: "/placemark/{id}/addreview", config: reviewController.addReview }, // Adding AddReview to Placemark Page

  { method: "GET", path: "/marker/{id}/editmarker/{markerid}", config: markerController.index },
  { method: "POST", path: "/marker/{id}/updatemarker/{markerid}", config: markerController.update },

  { method: "GET", path: "/{param*}", handler: { directory: { path: "./public" } }, options: { auth: false } },
];