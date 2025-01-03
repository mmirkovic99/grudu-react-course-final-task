export enum API_METHODS {
  GET = "GET",
  POST = "POST",
}

export const API_BASE = "http://localhost:3001";

export const ENDPOINTS = {
  USERS: `${API_BASE}/users`,
  TWEETS: `${API_BASE}/tweets`,
};
