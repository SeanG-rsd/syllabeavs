// Base URL of the backend API.
// `next dev` runs with NODE_ENV=development, so local work hits the local backend;
// production builds (including `fly deploy`) hit the live API.
// Set NEXT_PUBLIC_API_URL to override either one.
export const API_URL =
  process.env.NEXT_PUBLIC_API_URL ??
  (process.env.NODE_ENV === "production"
    ? "https://api.syllabeavs.com"
    : "http://localhost:8000");
