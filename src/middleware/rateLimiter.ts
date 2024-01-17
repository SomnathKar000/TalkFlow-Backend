import limiter from "express-rate-limit";

const rateLimiter = limiter({
  windowMs: 60 * 1000, // 1 minute
  limit: 6, // 6 requests
  message: "Too many requests, please try again later",
});

export { rateLimiter };
