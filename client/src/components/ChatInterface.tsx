import { useState } from "react";
import { useDispatch } from "react-redux";
import { setAllFields } from "../redux/interactionSlice";

const ChatInterface = () => {
  const [input, setInput] = useState("");
  const dispatch = useDispatch();

  const handleSend = () => {
    // 🔥 MOCK AI RESPONSE (replace later with API)
    const mockAIResponse = {
      hcpName: "Dr. Sharma",
      interactionType: "Meeting",
      topics: "Discussed Product X",
      sentiment: "Positive",
      followUp: "Send brochure",
    };

    dispatch(setAllFields(mockAIResponse));
    setInput("");
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