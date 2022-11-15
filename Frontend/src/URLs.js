let URLs = {};

if (process.env.NODE_ENV === "production") {
  URLs = {
    baseURL: "/api",
    socketURL: "https://ridewall.herokuapp.com/api",
  };
} else {
  URLs = {
    baseURL: "http://3.134.116.221:3001",
    socketURL: "http://3.134.116.221:3001",
  };
}

export default URLs;
