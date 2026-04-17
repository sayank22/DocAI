import { useState } from "react";
import { useDispatch } from "react-redux";
import { setAllFields } from "../redux/interactionSlice";
import { extractInteraction } from "../services/api";

const ChatInterface = () => {
  const [input, setInput] = useState("");
  const dispatch = useDispatch();

  const handleSend = async () => {
  try {
    const response = await extractInteraction(input);

    console.log("AI Response:", response);

    if (
      response.tool === "log_interaction" ||
      response.tool === "edit_interaction"
    ) {
      // ✅ Fill form
      dispatch(setAllFields(response.data));
    } else if (response.tool === "summarize") {
      alert("Summary:\n" + response.summary);
    } else if (response.tool === "sentiment") {
      alert("Sentiment: " + response.sentiment);
    } else if (response.tool === "followup") {
      alert("Follow-up: " + response.followUp);
    }

    setInput("");
  } catch (err) {
    console.error(err);
  }
};

  return (
    <div style={{ width: "50%", padding: "20px" }}>
      <h2>AI Assistant</h2>

      <textarea
        placeholder="Describe interaction..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <button onClick={handleSend}>Send</button>
    </div>
  );
};

export default ChatInterface;