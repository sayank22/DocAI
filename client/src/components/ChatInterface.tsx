import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAllFields, updateFields } from "../redux/interactionSlice";
import type { RootState } from "../redux/store";
import { extractInteraction } from "../services/api";
import { supabase } from "../services/supabase";
import { MdSmartToy } from "react-icons/md";

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
    <div className="flex h-screen w-[38%] flex-col border-l border-slate-200 bg-gradient-to-b from-slate-50 to-slate-100">
      {/* HEADER */}
      <div className="sticky top-0 z-20 border-b border-slate-200 bg-white/70 p-5 backdrop-blur-xl">
        <div>
          <div className="flex items-center gap-2">
  <MdSmartToy size={24} className="text-indigo-600" />
  <h2 className="m-0 text-lg font-semibold text-slate-900">
    AI Assistant
  </h2>
</div>
          <p className="mt-1 text-xs text-slate-500">
            Log Interaction via chat
          </p>
        </div>
      </div>

      {/* CHAT AREA */}
      <div className="flex flex-1 flex-col gap-4 overflow-y-auto px-5 py-6">
        {messages.length === 0 && (
          <div className="mt-10 text-center text-slate-500">
            <div className="mb-3 text-5xl">🩺</div>
            <h3 className="mb-2 text-xl font-semibold text-slate-900">
              Start Logging Interactions
            </h3>
            <p className="text-sm leading-6">
              Describe doctor meetings naturally and DocAI will structure the interaction automatically.
            </p>
          </div>
        )}

        {messages.map((msg, index) => (
          <div
            key={index}
            className={
              msg.type === "user"
                ? "flex justify-end"
                : "flex justify-start"
            }
          >
            <div
              className={`max-w-[82%] whitespace-pre-wrap rounded-[18px] px-4 py-3 text-sm leading-6 ${
                msg.type === "user"
                  ? "bg-gradient-to-br from-sky-600 to-indigo-600 text-white shadow-[0_10px_25px_rgba(37,99,235,0.25)]"
                  : "bg-white text-slate-900 border border-slate-200 shadow-[0_4px_18px_rgba(0,0,0,0.06)]"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="rounded-[18px] border border-slate-200 bg-white px-5 py-4 text-sm text-slate-500 shadow-[0_4px_18px_rgba(0,0,0,0.06)]">
              Analyzing interaction...
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* INPUT AREA */}
      <div className="border-t border-slate-200 bg-white/90 p-5 backdrop-blur-xl">
        <div className="mb-3 flex gap-3">
          <input
            value={input}
            disabled={isLoading}
            placeholder="Describe doctor interaction..."
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            className="flex-1 rounded-[14px] border border-slate-300 bg-white px-4 py-4 text-sm outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-200 disabled:cursor-not-allowed disabled:bg-slate-100"
          />

          <button
            onClick={handleSend}
            disabled={isLoading}
            className={`rounded-[14px] px-6 text-sm font-semibold text-white transition disabled:cursor-not-allowed ${
              isLoading
                ? "bg-slate-400"
                : "bg-gradient-to-br from-sky-600 to-indigo-600 shadow-[0_10px_25px_rgba(37,99,235,0.25)]"
            }`}
          >
            {isLoading ? "..." : "Send"}
          </button>
        </div>

        <button
          onClick={handleSaveToDB}
          disabled={isSaving}
          className={`w-full rounded-[14px] px-4 py-4 text-sm font-semibold text-white transition disabled:cursor-not-allowed ${
            isSaving
              ? "bg-slate-400"
              : "bg-gradient-to-br from-emerald-600 to-emerald-500 shadow-[0_10px_25px_rgba(16,185,129,0.25)]"
          }`}
        >
          {isSaving ? "Saving..." : "Save Interaction"}
        </button>
      </div>
    </div>
  );
};

export default ChatInterface;