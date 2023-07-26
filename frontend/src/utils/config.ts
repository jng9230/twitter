const env = process.env.REACT_APP_ENVIRONMENT;
console.log(env)
const API_BASE = env === "production.remote" ? "INSERT_SERVER_URL_HERE" : "http://localhost:5000"
const config = {
    API_BASE: API_BASE,
    DEFAULT_PROFILE_IMG : "https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png",
}

export { config }