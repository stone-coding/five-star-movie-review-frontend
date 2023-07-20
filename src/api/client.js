import axios from "axios";

// https://fivestarback-rdyov.ondigitalocean.app/api/movie/top-rated
const client = axios.create({
  baseURL: "https://fivestarback-rdyov.ondigitalocean.app/api",
});

export default client;
