import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../redux/store";
import { updateField } from "../redux/interactionSlice";

const InteractionForm = () => {
  const dispatch = useDispatch();
  // Ensure your RootState defines these types properly, especially suggestedFollowUps as string[]
  const data = useSelector((state: RootState) => state.interaction);

  // Keeping handleChange in case you want to allow manual edits later, 
  // but we will set inputs to readOnly to prove the AI works.
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    dispatch(
      updateField({
        field: e.target.name as keyof typeof data,
        value: e.target.value,
      })
    );
  };

  return (
    <div
      style={{
        width: "65%",
        padding: "20px",
        background: "#f3f4f6",
        height: "100vh",
        overflowY: "auto",
      }}
    >
      <h2 style={{ marginBottom: "10px" }}>Log HCP Interaction</h2>

      <div
        style={{
          background: "#fff",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0 0 5px rgba(0,0,0,0.05)",
        }}
      >
        <h4 style={{ marginBottom: "15px" }}>Interaction Details</h4>

        {/* Row 1 */}
        <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
          <div style={{ flex: 1 }}>
            <label>HCP Name</label>
            <input
              name="hcpName"
              placeholder="Search or select HCP..."
              value={data.hcpName || ""}
              onChange={handleChange}
              style={inputStyle}
              readOnly // 🔥 Forces AI usage
            />
          </div>

          <div style={{ flex: 1 }}>
            <label>Interaction Type</label>
            <input
              name="interactionType"
              value={data.interactionType || ""}
              onChange={handleChange}
              style={inputStyle}
              readOnly
            />
          </div>
        </div>

        {/* Row 2 */}
        <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
          <div style={{ flex: 1 }}>
            <label>Date</label>
            <input
              name="date"
              type="date"
              value={data.date || ""}
              onChange={handleChange}
              style={inputStyle}
              readOnly
            />
          </div>

          <div style={{ flex: 1 }}>
            <label>Time</label>
            <input
              name="time"
              type="time"
              value={data.time || ""}
              onChange={handleChange}
              style={inputStyle}
              readOnly
            />
          </div>
        </div>

        {/* Attendees */}
        <div style={{ marginBottom: "10px" }}>
          <label>Attendees</label>
          <input
            name="attendees"
            placeholder="Enter names..."
            value={data.attendees || ""}
            onChange={handleChange}
            style={inputStyle}
            readOnly
          />
        </div>

        {/* Topics */}
        <div style={{ marginBottom: "10px" }}>
          <label>Topics Discussed</label>
          <textarea
            name="topics"
            placeholder="Enter discussion points..."
            value={data.topics || ""}
            onChange={handleChange}
            style={textareaStyle}
            readOnly
          />
        </div>

        {/* Materials - ✅ Now dynamic based on AI input */}
        <div style={boxStyle}>
          <strong>Materials Shared</strong>
          {data.materialsShared ? (
            <p style={{ color: "#000", marginTop: "5px" }}>{data.materialsShared}</p>
          ) : (
            <p style={{ color: "#777", marginTop: "5px" }}>No materials added.</p>
          )}
        </div>

        {/* Samples */}
        <div style={boxStyle}>
          <strong>Samples Distributed</strong>
          {data.samples ? (
            <p style={{ color: "#000", marginTop: "5px" }}>{data.samples}</p>
          ) : (
            <p style={{ color: "#777", marginTop: "5px" }}>No samples added.</p>
          )}
        </div>

        {/* Sentiment */}
        <div style={{ marginTop: "10px" }}>
          <label>Observed HCP Sentiment</label>
          <div style={{ display: "flex", gap: "15px", marginTop: "5px" }}>
            {["Positive", "Neutral", "Negative"].map((val) => (
              <label key={val}>
                <input
                  type="radio"
                  name="sentiment"
                  value={val}
                  checked={data.sentiment === val}
                  readOnly // Prevents manual clicking
                />
                {val}
              </label>
            ))}
          </div>
        </div>

        {/* Outcomes */}
        <div style={{ marginTop: "10px" }}>
          <label>Outcomes</label>
          <textarea
            name="outcomes"
            placeholder="Key outcomes..."
            value={data.outcomes || ""}
            onChange={handleChange}
            style={textareaStyle}
            readOnly
          />
        </div>

        {/* Follow-up */}
        <div style={{ marginTop: "10px" }}>
          <label>Follow-up Actions</label>
          <textarea
            name="followUp"
            placeholder="Next steps..."
            value={data.followUp || ""}
            onChange={handleChange}
            style={textareaStyle}
            readOnly
          />
        </div>

        {/* ✅ AI Suggested Follow-ups (Matches the screenshot) */}
        {data.suggestedFollowUps && data.suggestedFollowUps.length > 0 && (
          <div style={{ marginTop: "15px", fontSize: "14px" }}>
            <strong style={{ color: "#4b5563" }}>AI Suggested Follow-ups:</strong>
            <ul style={{ listStyleType: "none", padding: 0, marginTop: "5px" }}>
              {data.suggestedFollowUps.map((item: str, idx: number) => (
                <li key={idx} style={{ color: "#2563eb", marginBottom: "4px", cursor: "pointer" }}>
                  + {item}
                </li>
              ))}
            </ul>
          </div>
        )}

      </div>
    </div>
  );
};

// styles
const inputStyle = {
  width: "100%",
  padding: "8px",
  borderRadius: "6px",
  border: "1px solid #ccc",
  marginTop: "5px",
  backgroundColor: "#f9fafb", // Slight grey to indicate it is controlled by AI
};

const textareaStyle = {
  ...inputStyle,
  minHeight: "70px",
};

const boxStyle = {
  border: "1px solid #ddd",
  padding: "10px",
  borderRadius: "6px",
  marginTop: "10px",
  background: "#f9fafb",
};

export default InteractionForm;