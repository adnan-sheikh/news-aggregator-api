const config = {
  port: process.env.PORT,
  newsAPI: {
    url: process.env.NEWS_API_URL,
    key: process.env.NEWS_API_KEY,
  },
  secrets: {
    jwt: process.env.JWT_AUTH_KEY,
  },
};

export default config;
