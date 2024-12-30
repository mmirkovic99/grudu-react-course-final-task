import { API_METHODS, ENDPOINTS } from "../common/constants/api.constants";
import { MESSAGE } from "../common/constants/message.constant";
import { Tweet } from "../common/interfaces/tweet.interface";
import { User } from "../common/interfaces/user.interface";

export const apiService = {
  async getAllUsers() {
    try {
      const response = await fetch(`${ENDPOINTS.USERS}`);
      if (!response.ok) {
        throw new Error(`Error while fetching users: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Failed to fetch users:", error);
      throw error;
    }
  },
  async getUserByUsername(username: string) {
    try {
      const response = await fetch(`${ENDPOINTS.USERS}/${username}`);
      if (!response.ok) {
        throw new Error(
          response.status === 404
            ? MESSAGE.USERNAME_PASSWORD_INVLAID
            : `Error while fetching user: ${response.statusText}`
        );
      }
      return await response.json();
    } catch (error) {
      console.error("Failed to fetch user:", error);
      throw error;
    }
  },
  async saveUser(user: User) {
    try {
      const response = await fetch(`${ENDPOINTS.USERS}`, {
        method: API_METHODS.POST,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });
      if (!response.ok) {
        throw new Error(`Error saving user: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Failed to save user:", error);
      throw error;
    }
  },
  async getAllTweets() {
    try {
      const response = await fetch(`${ENDPOINTS.TWEETS}`);
      if (!response.ok) {
        throw new Error(`Error while fetching tweets: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Failed to fetch tweets:", error);
      throw error;
    }
  },
  async saveTweet(tweet: Tweet) {
    try {
      const response = await fetch(`${ENDPOINTS.TWEETS}`, {
        method: API_METHODS.POST,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(tweet),
      });
      if (!response.ok) {
        throw new Error(`Error while saving tweet: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Failed to save tweet:", error);
      throw error;
    }
  },
};
