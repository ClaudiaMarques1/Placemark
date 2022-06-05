export const seedData = {
  users: {
    _model: "User",
    homer: {
      firstName: "Homer",
      lastName: "Simpson",
      email: "homer@simpson.com",
      password: "secret"
    },
    marge: {
      firstName: "Marge",
      lastName: "Simpson",
      email: "marge@simpson.com",
      password: "secret"
    },
    bart: {
      firstName: "Bart",
      lastName: "Simpson",
      email: "bart@simpson.com",
      password: "secret"
    }
  },
  placemarks: {
    _model: "Placemark",
    dublin: {
      title: "Dublin Favourites",
      lat: "52.160858",
      lng: "-7.152420",
      userid: "->users.bart"
    },
    cork: {
      title: "Cork Favourites",
      lat: "52.149220",
      lng: "-6.994620",
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

  comments: {
    _model: "Comment",
    adam: {
      title: "Adam Stuart",
      date: "Tue May 31 2022",
      body: "Hello this is my comment from Adam",
    },
    sarah: {
      title: "Sarah Lynch",
      date: "Wed Jun 01 2022",
      body: "Hello this is my comment from Sarah",
    }
  }
};