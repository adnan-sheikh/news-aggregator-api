# News Aggregator API

## Overview

This project is a RESTful API built using Node.js and Express.js that allows users to fetch news articles based on their preferences. It includes user registration, login, and the ability to set and update news preferences. Additionally, it also includes getting news article details, users can mark the article as read and favorite, retrieve all read and favorite articles. The API integrates with the [World News API](https://worldnewsapi.com/) for fetching news articles. All network calls to this external API is cached for faster response times. All cache keys are updated in background at regular intervals.

## Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/adnan-sheikh/news-aggregator-api.git
   ```

2. Install dependencies:

   ```bash
   cd news-aggregator-api
   npm install
   ```

3. Set up environment variables:

   Create a `.env` file in the project root and add the following:

   ```env
   PORT=3000
   NEWS_API_URL_V2="https://api.worldnewsapi.com"
   NEWS_API_KEY_V2="your_api_key"
   JWT_AUTH_KEY="a_super_secret_key"
   ```

   Replace both `NEWS_API_KEY_V2` and `JWT_AUTH_KEY` with your keys

4. Run the application:

   ```bash
   npm start
   ```

   The API will be accessible at `http://localhost:3000` for registration and login, and `http://localhost:3000/api/v1` for other endpoints.

## API Endpoints

### User Registration

**Endpoint:** `POST /register`

**Request Body:**

```json
{
  "username": "example_user",
  "password": "securepassword"
}
```

**Response body:**

```json
{
  "id": "4da53050-8785-4266-99ae-bbb259d628f5",
  "username": "example_user",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVC"
}
```

This `token` needs to be saved by the client, for further access to different endpoints.

### User Login

**Endpoint:** `POST /login`

Login have same request and response bodies.

### Create User Preferences

**Endpoint:** `POST /api/v1/preferences`

_Requires authentication._

**Request Body:**

```json
{
  "source-countries": "us",
  "language": "en",
  "authors": "John Doe"
}
```

Note: `source-countries` and `language` are required. `authors` is also optional and can be either single value or comma-separated multiple values. Even multiple source-countries can be specified as comma-separated values.

Example:

```json
{
  "source-countries": "us,ca,gb",
  "language": "en"
}
```

Note: `source-countries` must follow ISO 3166, and `language` must follow ISO 6391.

### Get User Preferences

**Endpoint:** `GET /api/v1/preferences`

_Requires authentication._

### Update User Preferences

**Endpoint:** `PUT /api/v1/preferences`

_Requires authentication._

Request and Response body same as `POST /api/v1/preferences`

### Fetch News Articles

**Endpoint:** `GET /api/v1/news`

_Requires authentication._

### Fetch Article Details

**Endpoint:** `GET /api/v1/news/:id`

_Requires authentication._

### Mark Article as Read

**Endpoint:** `POST /api/v1/news/:id/read`

_Requires authentication._

### Mark Article as Favorite

**Endpoint:** `POST /api/v1/news/:id/favorite`

_Requires authentication._

### Get All Read Articles

**Endpoint:** `GET /api/v1/news/read`

_Requires authentication._

### Get All Favorite Articles

**Endpoint:** `GET /api/v1/news/favorites`

_Requires authentication._

### Search News Articles

**Endpoint:** `GET /api/v1/news/search/:keyword`

_Requires authentication._

## Extensions

### In-Memory Caching

The API implements in-memory caching for external API calls to reduce the load on the World News API.

### Auto-Login on Registration

Upon successful registration, the user is automatically logged in, i.e the token is sent after registration too, because we're not doing any multi-factor auth as of now.

### Logging & Error Handling

Errors are logged to a `main.error.log` file under `/src/logs` directory for monitoring and debugging.

Error responses to the client are sent in the form of:

```json
{
  "error": "Something went wront"
}
```

When validating inputs, muliple errors are sent to the client in the form of:

```json
[
  {
    "location": "source-countries",
    "message": "this field cannot be empty!"
  },
  {
    "location": "language",
    "message": "Invalid language. It must follow ISO 6391"
  }
]
```

### Background Cache Update

The server updates the cache in the background at regular intervals to simulate real-time updates.
