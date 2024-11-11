import axios from "axios";

const API_URL = "http://127.0.0.1:8000/deals/";

export const fetchDeals = async () => {
  try {
    const response = await axios.get(API_URL);
    // Return the deals array from the response
    return response.data.deals; // This accesses the 'deals' key in your response
  } catch (error) {
    console.error("Error fetching deals:", error);
    throw error; // Rethrow error for handling in component
  }
};
