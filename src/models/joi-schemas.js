import Joi from "joi";

export const IdSpec = Joi.alternatives().try(Joi.string(), Joi.object()).description("a valid ID");

export const UserCredentialsSpec = Joi.object()
  .keys({
    email: Joi.string().email().example("homer@simpson.com").regex(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/),
    password: Joi.string().example("secret").min(8), // minimum 8 characters
  })
  .label("UserCredentials");

export const UserSpec = UserCredentialsSpec.keys({
  firstName: Joi.string().example("Homer").regex(/^[A-Z][a-z]{2,}$/), // Sanitisation
  lastName: Joi.string().example("Simpson").regex(/^[A-Z][a-z]{2,}$/), // Sanitisation
}).label("UserDetails");

export const UserSpecPlus = UserSpec.keys({
  _id: IdSpec,
  __v: Joi.number(),
}).label("UserDetailsPlus");

export const UserArray = Joi.array().items(UserSpecPlus).label("UserArray");

export const MarkerSpec = Joi.object()
  .keys({
    title: Joi.string().required().example("Favourite Restaurant").min(3).max(100),
    location: Joi.string().required().example("McDonalds").min(3).max(150),
    date: Joi.string().required().example("12/12/2021"),
    placemarkid: IdSpec,
  })
  .label("Marker");

export const MarkerSpecPlus = MarkerSpec.keys({
  _id: IdSpec,
  __v: Joi.number(),
}).label("MarkerPlus");

export const MarkerArraySpec = Joi.array().items(MarkerSpecPlus).label("MarkerArray");

export const PlacemarkSpec = Joi.object()
  .keys({
    title: Joi.string().required().example("Dublin").min(3).max(100),
    userid: IdSpec,
    markers: MarkerArraySpec,
  })
  .label("Placemark");

export const PlacemarkSpecPlus = PlacemarkSpec.keys({
  _id: IdSpec,
  __v: Joi.number(),
}).label("PlacemarkPlus");

export const PlacemarkArraySpec = Joi.array().items(PlacemarkSpecPlus).label("PlacemarkArray");

export const ReviewSpec = Joi.object()
  .keys({
    rating: Joi.string().required().example("5").min(1).max(5),
    comment: Joi.string().required().example("My First Review").max(150),
    placemarkid: IdSpec,
  })
  .label("Review");

export const ReviewSpecPlus = ReviewSpec.keys({
  _id: IdSpec,
  __v: Joi.number(),
}).label("ReviewPlus");

export const ReviewArraySpec = Joi.array().items(ReviewSpecPlus).label("ReviewArray");

export const JwtAuth = Joi.object()
  .keys({
    success: Joi.boolean().example("true").required(),
    token: Joi.string().example("eyJhbGciOiJND.g5YmJisIjoiaGYwNTNjAOhE.gCWGmY5-YigQw0DCBo").required(),
  })
  .label("JwtAuth");