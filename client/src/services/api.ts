import type { RootState } from "../redux/store";

export const extractInteraction = async (
  text: string,
  currentState: RootState["interaction"]
) => {
  // add localhost url with .env variable
  const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:8000";
  const response = await fetch(`${baseUrl}/extract`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text, currentState }),
  });
  return await response.json();
};
