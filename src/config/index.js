const config = {
  port: process.env.PORT,
  newsAPI: {
    url: process.env.NEWS_API_URL_V2,
    key: process.env.NEWS_API_KEY_V2,
  },
  secrets: {
    jwt: process.env.JWT_AUTH_KEY,
  },
};

export default config;
