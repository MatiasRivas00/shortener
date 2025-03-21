# URL Shortener Documentation

## Introduction
This project is a URL shortener built using Express, React, Node.js, and MongoDB. It allows users to shorten URLs and track access statistics. You can see the project website [here](https://shortener-jwem.onrender.com/).

## Running the Project Locally
To run this project locally, follow these steps:

1. Clone both the [frontend](https://github.com/MatiasRivas00/shortener-frontend) and [backend](https://github.com/MatiasRivas00/shortener-api) repositories.
2. Each repository contains a `Dockerfile` to build the necessary images.
3. Use the `docker-compose.yml` file provided in the current repository to orchestrate the services.
4. Environment variables are defined in the `.example.env` file. Copy this file and rename it to `.env`, then populate the necessary values.
5. Run the following command to start the application:
   ```sh
   docker-compose up --build
   ```
6. The frontend and backend should now be running in their respective containers. you can enter the page through [localhost:5173](http://localhost:5173/)

## Data Model
The MongoDB model for storing shortened URLs is structured as follows:

| Field       | Type    | Description |
|------------|--------|-------------|
| originalUrl | String | The original URL that is being shortened. Required. |
| shortcode   | String | The unique shortcode used to access the original URL. |
| count       | Number | The number of times the shortcode has been used. Defaults to 0. |
| created     | Date   | The timestamp when the shortcode was created. Expires in 3 days. |

## API Endpoints

| Method | Endpoint               | Description |
|--------|------------------------|-------------|
| GET    | `/:shortcode`          | Redirects to the original URL using the given shortcode. |
| GET    | `/api/shorten/:shortcode` | Retrieves details of a shortened URL. |
| GET    | `/api/shorten/`        | Retrieves a list of all shortened URLs. |
| POST   | `/api/shorten/`        | Creates a new shortened URL. |

## Design Decisions
1. **Storing count within the shortcode document**
   - Since MongoDB is being used, keeping the `count` field within the same document as the `originalUrl` and `shortcode` allows for easy updates and retrieval.

2. **Allowing multiple shortcodes for the same URL**
   - Rather than enforcing uniqueness on `originalUrl`, this decision allows different users to create different shortcodes for the same long URL. This is useful for tracking individual link performance separately.

