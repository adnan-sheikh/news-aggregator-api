const config = {
  port: process.env.PORT,
  newsApiURL: process.env.NEWS_API_URL,
  secrets: {
    jwt: process.env.JWT_AUTH_KEY,
    newsAPIKey: process.env.NEWS_API_KEY,
  },
};

export default config;
