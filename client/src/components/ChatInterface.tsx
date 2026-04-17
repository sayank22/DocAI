import { useState } from "react";
import { useDispatch } from "react-redux";
import { setAllFields } from "../redux/interactionSlice";
import { extractInteraction } from "../services/api";

const ChatInterface = () => {
  const [input, setInput] = useState("");
  const dispatch = useDispatch();

  const handleSend = async () => {
  const response = await extractInteraction(input);

  dispatch(setAllFields(response));
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