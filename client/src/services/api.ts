import type { RootState } from "../redux/store";

export const extractInteraction = async (
  text: string,
  currentState: RootState["interaction"]
) => {
  const response = await fetch("http://localhost:8000/extract", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text, currentState }),
  });
  return await response.json();
};
