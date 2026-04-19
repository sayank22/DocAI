// services/api.ts
import axios from "axios";

export const extractInteraction = async (text, currentState) => {
  const response = await fetch("http://localhost:8000/extract", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text, currentState }), 
  });
  return await response.json();
};