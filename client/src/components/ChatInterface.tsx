import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAllFields, updateFields } from "../redux/interactionSlice";
import type { RootState } from "../redux/store";
import { extractInteraction } from "../services/api";
import { supabase } from "../services/supabase";

type Message = {
  type: "user" | "bot";
  text: string;
};

const ChatInterface = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const dispatch = useDispatch();
  const data = useSelector((state: RootState) => state.interaction);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { type: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await extractInteraction(input, data);

      const botMessage: Message = { type: "bot", text: "" };

      if (response.tool === "log_interaction") {
        dispatch(setAllFields(response.data));
        botMessage.text = "New interaction logged ✅";
      } 
      else if (response.tool === "edit_interaction") {
        dispatch(updateFields(response.data));
        botMessage.text = "Updated: " + Object.keys(response.data).join(", ");
      }
      else if (response.tool === "analyze_interaction") {
        dispatch(updateFields({
          ...response.data,
          isAiSentiment: true,
          isAiInsight: true
        }));

        botMessage.text =
          response.data.insight ||
          "The interaction has been analyzed successfully.";
      }
      else if (response.tool === "summarize") {
        dispatch(updateFields(response.data));
        botMessage.text = "Summary updated.";
      }
      else if (response.tool === "followup") {
        dispatch(updateFields(response.data));
        botMessage.text = "Follow-up suggestions updated.";
      }
      else {
        dispatch(updateFields(response.data));
        botMessage.text = "Updated.";
      }

      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        { type: "bot", text: "Error: Failed to process request." },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveToDB = async () => {
    setIsSaving(true);

    try {
      const payload = {
        hcpName: data.hcpName,
        interactionType: data.interactionType,
        date: data.date,
        time: data.time,
        attendees: data.attendees,
        topics: data.topics,
        materialsShared: data.materialsShared,
        samples: data.samples,
        sentiment: data.sentiment,
        outcomes: data.outcomes,
        followUp: data.followUp,
        suggestedFollowUps: data.suggestedFollowUps || [],
        insight: data.insight || null,
      };

      const { error } = await supabase
        .from("interactions")
        .insert([payload]);

      if (error) {
        console.error("Database Error:", error.message);
        alert("Failed to save: " + error.message);
      } else {
        alert("Interaction saved successfully!");
      }
    } catch (err) {
      console.error("Unexpected error:", err);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div
      style={{
        width: "35%",
        height: "100vh",
        borderLeft: "1px solid #ddd",
        display: "flex",
        flexDirection: "column",
        background: "#f9fafb",
      }}
    >
      {/* Header */}
      <div style={{ padding: "16px", borderBottom: "1px solid #eee" }}>
        <h3 style={{ margin: 0 }}>🤖 AI Assistant</h3>
        <p style={{ margin: 0, fontSize: "12px", color: "#666" }}>
          Log interaction via chat
        </p>
      </div>

      {/* Messages */}
      <div style={{ flex: 1, padding: "16px", overflowY: "auto" }}>
        {messages.map((msg, index) => (
          <div
            key={index}
            style={{
              marginBottom: "10px",
              textAlign: msg.type === "user" ? "right" : "left",
            }}
          >
            <div
              style={{
                display: "inline-block",
                padding: "10px",
                borderRadius: "8px",
                background: msg.type === "user" ? "#2563eb" : "#e5e7eb",
                color: msg.type === "user" ? "#fff" : "#000",
                maxWidth: "80%",
              }}
            >
              {msg.text}
            </div>
          </div>
        ))}

        {isLoading && (
          <div style={{ textAlign: "left", marginBottom: "10px" }}>
            <div
              style={{
                display: "inline-block",
                padding: "10px",
                borderRadius: "8px",
                background: "#e5e7eb",
                color: "#666",
              }}
            >
              Thinking...
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div
        style={{
          padding: "12px",
          borderTop: "1px solid #eee",
          display: "flex",
          gap: "8px",
        }}
      >
        <input
          style={{
            flex: 1,
            padding: "10px",
            borderRadius: "6px",
            border: "1px solid #ccc",
          }}
          placeholder="Describe interaction..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          disabled={isLoading}
        />

        <button
          onClick={handleSend}
          disabled={isLoading}
          style={{
            padding: "10px 16px",
            background: isLoading ? "#9ca3af" : "#2563eb",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            cursor: isLoading ? "not-allowed" : "pointer",
          }}
        >
          {isLoading ? "..." : "Log"}
        </button>
      </div>

      {/* Save Button */}
      <div style={{ padding: "12px", borderTop: "1px solid #eee" }}>
        <button
          onClick={handleSaveToDB}
          disabled={isSaving}
          style={{
            padding: "10px 16px",
            background: isSaving ? "#9ca3af" : "#16a34a",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            cursor: isSaving ? "not-allowed" : "pointer",
            width: "100%",
          }}
        >
          {isSaving ? "Saving..." : "Save to DB"}
        </button>
      </div>
    </div>
  );
};

export default ChatInterface;