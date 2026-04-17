import axios from "axios";

export const extractInteraction = async (text: string) => {
  const res = await axios.post("http://localhost:8000/extract", {
    text,
  });

  return res.data;
};