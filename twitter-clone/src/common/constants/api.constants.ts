export enum API_METHODS {
  GET = "GET",
  POST = "POST",
  DELETE = "DELETE",
  PATCH = "PATCH",
  HEAD = "HEAD",
  OPTIONS = "OPTIONS",
  TRACE = "TRACE",
  CONNECT = "CONNECT",
}

export const API_BASE = "http://localhost:3000";

export const ENDPOINTS = {
  USERS: `${API_BASE}/users`,
  TWEETS: `${API_BASE}/tweets`,
};
