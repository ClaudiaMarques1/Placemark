export const seedData = {
  users: {
    _model: "User",
    homer: {
      firstName: "Homer",
      lastName: "Simpson",
      email: "homer@simpson.com",
      password: "$2a$10$HnapEWWKQQ0.0Ft33nXxtuJ0fsmd9ywYswEzT4C.6Ul5y6cOU.UEa"
    },
    marge: {
      firstName: "Marge",
      lastName: "Simpson",
      email: "marge@simpson.com",
      password: "$2a$10$D3TWK8MSAh63Lhk4gIFSJ.ekM368J88qJRUYSbuBfzffex6B0dFwK"
    },
    bart: {
      firstName: "Bart",
      lastName: "Simpson",
      email: "bart@simpson.com",
      password: "$2a$10$39uXZMw.03wSG4LslS7nSO6gVFEBjAfPSn3NR.SFSmKqV2fSE46BC"
    }
  },
  placemarks: {
    _model: "Placemark",
    dublin: {
      title: "Dublin Favourites",
      userid: "->users.bart"
    },
    cork: {
      title: "Cork Favourites",
      userid: "->users.bart"
    }
  },
  markers: {
    _model: "Marker",
    marker_1: {
      title: "Favourite Restaurant",
      location: "McDonalds",
      date: "Sun Dec 12 2021",
      placemarkid: "->placemarks.dublin"
    },
    marker_2: {
      title: "Favourite Gym",
      location: "F1T",
      date: "Sun Dec 15 2022",
      placemarkid: "->placemarks.cork"
    },
  },

  reviews: {
    _model: "Review",
    review_1: {
      comment: "This is my first review from Bart",
      rating: "5",
      userid: "->users.bart",
      placemarkid: "->placemarks.dublin"
    },
    review__2: {
      comment: "This is my second review from Bart",
      rating: "4",
      userid: "->users.bart",
      placemarkid: "->placemarks.dublin"
    },
  },
};