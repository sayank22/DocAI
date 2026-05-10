import { useEffect, useRef, useState } from "react";
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

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      type: "user",
      text: input,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await extractInteraction(input, data);

      const botMessage: Message = {
        type: "bot",
        text: "",
      };

      if (response.tool === "log_interaction") {
        dispatch(setAllFields(response.data));
        botMessage.text = "New interaction logged successfully.";
      } else if (response.tool === "edit_interaction") {
        dispatch(updateFields(response.data));
        botMessage.text =
          "Updated fields: " +
          Object.keys(response.data).join(", ");
      } else if (response.tool === "analyze_interaction") {
        dispatch(
          updateFields({
            ...response.data,
            isAiSentiment: true,
            isAiInsight: true,
          })
        );

        botMessage.text =
          response.data.insight ||
          "Interaction analyzed successfully.";
      } else if (response.tool === "summarize") {
        dispatch(updateFields(response.data));
        botMessage.text = "Summary updated.";
      } else if (response.tool === "followup") {
        dispatch(updateFields(response.data));
        botMessage.text =
          "Follow-up suggestions generated.";
      } else {
        dispatch(updateFields(response.data));
        botMessage.text = "Interaction updated.";
      }

      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      console.error(err);

      setMessages((prev) => [
        ...prev,
        {
          type: "bot",
          text: "Failed to process request. Please try again.",
        },
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
        suggestedFollowUps:
          data.suggestedFollowUps || [],
        insight: data.insight || null,
      };

      const { error } = await supabase
        .from("interactions")
        .insert([payload]);

      if (error) {
        console.error(error.message);
        alert("Failed to save: " + error.message);
      } else {
        alert("Interaction saved successfully!");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div
      style={{
        width: "38%",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        background:
          "linear-gradient(to bottom, #f8fafc, #eef2ff)",
        borderLeft: "1px solid #e5e7eb",
      }}
    >
      {/* HEADER */}
      <div
        style={{
          padding: "20px",
          borderBottom: "1px solid #e5e7eb",
          background: "rgba(255,255,255,0.7)",
          backdropFilter: "blur(12px)",
          position: "sticky",
          top: 0,
          zIndex: 20,
        }}
      >
        <div>
  <h2
    style={{
      margin: 0,
      fontSize: "18px",
      color: "#111827",
    }}
  >
    DocAI Assistant
  </h2>

  <p
    style={{
      margin: "4px 0 0",
      fontSize: "13px",
      color: "#6b7280",
    }}
  >
    AI-powered interaction logging
  </p>
</div>
      </div>

      {/* CHAT AREA */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "24px 18px",
          display: "flex",
          flexDirection: "column",
          gap: "14px",
        }}
      >
        {messages.length === 0 && (
          <div
            style={{
              marginTop: "40px",
              textAlign: "center",
              color: "#6b7280",
            }}
          >
            <div
              style={{
                fontSize: "52px",
                marginBottom: "12px",
              }}
            >
              🩺
            </div>

            <h3
              style={{
                marginBottom: "8px",
                color: "#111827",
              }}
            >
              Start Logging Interactions
            </h3>

            <p
              style={{
                fontSize: "14px",
                lineHeight: 1.6,
              }}
            >
              Describe doctor meetings naturally and
              DocAI will structure the interaction
              automatically.
            </p>
          </div>
        )}

        {messages.map((msg, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              justifyContent:
                msg.type === "user"
                  ? "flex-end"
                  : "flex-start",
            }}
          >
            <div
              style={{
                maxWidth: "82%",
                padding: "14px 16px",
                borderRadius: "18px",
                fontSize: "14px",
                lineHeight: 1.6,
                whiteSpace: "pre-wrap",

                background:
                  msg.type === "user"
                    ? "linear-gradient(135deg,#2563eb,#4f46e5)"
                    : "#ffffff",

                color:
                  msg.type === "user"
                    ? "#ffffff"
                    : "#111827",

                boxShadow:
                  msg.type === "user"
                    ? "0 10px 25px rgba(37,99,235,0.25)"
                    : "0 4px 18px rgba(0,0,0,0.06)",

                border:
                  msg.type === "bot"
                    ? "1px solid #e5e7eb"
                    : "none",
              }}
            >
              {msg.text}
            </div>
          </div>
        ))}

        {isLoading && (
          <div
            style={{
              display: "flex",
              justifyContent: "flex-start",
            }}
          >
            <div
              style={{
                background: "#fff",
                border: "1px solid #e5e7eb",
                borderRadius: "18px",
                padding: "14px 18px",
                boxShadow:
                  "0 4px 18px rgba(0,0,0,0.06)",
                color: "#6b7280",
                fontSize: "14px",
              }}
            >
              Analyzing interaction...
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* INPUT AREA */}
      <div
        style={{
          padding: "18px",
          borderTop: "1px solid #e5e7eb",
          background: "rgba(255,255,255,0.85)",
          backdropFilter: "blur(12px)",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: "12px",
            marginBottom: "12px",
          }}
        >
          <input
            value={input}
            disabled={isLoading}
            placeholder="Describe doctor interaction..."
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) =>
              e.key === "Enter" && handleSend()
            }
            style={{
              flex: 1,
              border: "1px solid #d1d5db",
              borderRadius: "14px",
              padding: "14px 16px",
              fontSize: "14px",
              outline: "none",
              background: "#fff",
            }}
          />

          <button
            onClick={handleSend}
            disabled={isLoading}
            style={{
              border: "none",
              borderRadius: "14px",
              padding: "0 22px",
              background: isLoading
                ? "#9ca3af"
                : "linear-gradient(135deg,#2563eb,#4f46e5)",
              color: "#fff",
              fontWeight: 600,
              cursor: isLoading
                ? "not-allowed"
                : "pointer",
              transition: "0.2s ease",
              boxShadow:
                "0 10px 25px rgba(37,99,235,0.25)",
            }}
          >
            {isLoading ? "..." : "Send"}
          </button>
        </div>

        <button
          onClick={handleSaveToDB}
          disabled={isSaving}
          style={{
            width: "100%",
            border: "none",
            borderRadius: "14px",
            padding: "14px",
            background: isSaving
              ? "#9ca3af"
              : "linear-gradient(135deg,#059669,#10b981)",
            color: "#fff",
            fontWeight: 600,
            fontSize: "14px",
            cursor: isSaving
              ? "not-allowed"
              : "pointer",
            boxShadow:
              "0 10px 25px rgba(16,185,129,0.25)",
          }}
        >
          {isSaving
            ? "Saving..."
            : "Save Interaction"}
        </button>
      </div>
    </div>
  );
};

export default ChatInterface;