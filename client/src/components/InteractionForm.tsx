import { useDispatch, useSelector } from "react-redux";
import type { CSSProperties } from "react";
import type { RootState } from "../redux/store";
import { updateField } from "../redux/interactionSlice";

import {
  FiSearch,
  FiMic,
  FiPlus,
  FiSmile,
  FiMeh,
  FiFrown,
  FiClock,
  FiStar,
} from "react-icons/fi";

const InteractionForm = () => {
  const dispatch = useDispatch();
  const data = useSelector((state: RootState) => state.interaction);

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
    <div style={container}>
      <h2 style={{ marginBottom: "10px" }}>Log HCP Interaction</h2>

      <div style={card}>
        <h4 style={{ marginBottom: "15px" }}>Interaction Details</h4>

        {/* Row 1 */}
        <div style={row}>
          <div style={{ flex: 1 }}>
            <label>HCP Name</label>
            <input
              name="hcpName"
              placeholder="Search or select HCP..."
              value={data.hcpName || ""}
              onChange={handleChange}
              style={inputStyle}
            />
          </div>

          {/*Interaction Type With Dropdown Options*/}
          <div style={{ flex: 1 }}>
            <label>Interaction Type</label>
            <select
              name="interactionType"
              value={data.interactionType || ""}
              style={inputStyle}
              onChange={handleChange}
            >
              <option value="">Select type...</option>
              <option value="Meeting">Meeting</option>
              <option value="Phone Call">Consult</option>
              <option value="Phone Call">Report Show</option>
            </select>
          </div>
        </div>

        {/* Row 2 */}
        {/* Date */}
        <div style={row}>
          <div style={{ flex: 1 }}>
            <label>Date</label>
            <input
              type="date"
              name="date"
              value={data.date || ""}
              onChange={handleChange}
              style={inputStyle}
            />
          </div>

          {/* Time */}
          <div style={{ flex: 1 }}>
            <label>Time</label>
            <input
              type="time"
              name="time"
              value={data.time || ""}
              onChange={handleChange}
              style={{ ...inputStyle }}
            />
            <FiClock style={clockIcon} />
          </div>
        </div>

        {/* Attendees */}
        <div style={block}>
          <label>Attendees</label>
          <input
            name="attendees"
            placeholder="Enter names or search..."
            value={data.attendees || ""}
            onChange={handleChange}
            style={inputStyle}
          />
        </div>

        {/* Topics */}
<div style={{ ...block }}>
  <label>Topics Discussed</label>
  
  {/* 1. Add a wrapper div with position: relative */}
  <div style={{ position: "relative", width: "100%" }}>
    <textarea
      name="topics"
      placeholder="Enter key discussion points..."
      value={data.topics || ""}
      onChange={handleChange}
      style={{ 
        ...textareaStyle, 
        width: "100%", 
      }}
    />

    <FiMic 
      style={{ 
        ...micIcon,
        position: "absolute",
        bottom: "15px", 
        right: "15px",
        cursor: "pointer", 
      }} 
    />
  </div>

  {/* Voice note */}
  <div style={voiceNote}>
    <FiStar />
    Summarize from Voice Note (Requires Consent)
  </div>
</div>

        {/* Materials */}
        <div style={box}>
          <div style={boxHeader}>
            <strong>Materials Shared</strong>
            <button style={iconBtn}>
              <FiSearch /> Search/Add
            </button>
          </div>

          <p style={mutedText}>
            {data.materialsShared || "No materials added."}
          </p>
        </div>

        {/* Samples */}
        <div style={box}>
          <div style={boxHeader}>
            <strong>Samples Distributed</strong>
            <button style={iconBtn}>
              <FiPlus /> Add Sample
            </button>
          </div>

          <p style={mutedText}>
            {data.samples || "No samples added."}
          </p>
        </div>

        {/* Sentiment */}
        <div style={block}>
          <label>Observed/Inferred HCP Sentiment</label>

          <div style={sentimentRow}>
            {[
              { label: "Positive", icon: <FiSmile />, color: "#16a34a" },
              { label: "Neutral", icon: <FiMeh />, color: "#f59e0b" },
              { label: "Negative", icon: <FiFrown />, color: "#dc2626" },
            ].map((item) => (
              <label key={item.label} style={{ ...sentimentItem, color: item.color }}>
                <input
                  type="radio"
                  name="sentiment"
                  value={item.label}
                  checked={data.sentiment === item.label}
                  onChange={handleChange}
                />
                {item.icon}
                {item.label}
              </label>
            ))}
          </div>
        </div>
        
        {/* Interest Level */}
        <div style={block}>
  <label>Doctor Interest Level</label>

  <div style={sentimentRow}>
    {["High", "Medium", "Low"].map((level) => (
      <label key={level} style={sentimentItem}>
        <input
          type="radio"
          name="interestLevel"
          value={level}
          checked={data.interestLevel === level}
          onChange={handleChange}
        />
        {level}
      </label>
    ))}
  </div>
</div>

        {/* Outcomes */}
        <div style={block}>
          <label>Outcomes</label>
          <textarea
            name="outcomes"
            placeholder="Key outcomes or agreements..."
            value={data.outcomes || ""}
            onChange={handleChange}
            style={textareaStyle}
          />
        </div>

        {/* Follow up */}
        <div style={block}>
          <label>Follow-up Actions</label>
          <textarea
            name="followUp"
            placeholder="Enter next steps or tasks..."
            value={data.followUp || ""}
            onChange={handleChange}
            style={textareaStyle}
          />
        </div>

        {/* AI Suggestions */}
        {data.suggestedFollowUps?.length > 0 && (
          <div style={aiBox}>
            <strong style={{ color: "#4b5563" }}>
              AI Suggested Follow-ups:
            </strong>

            <ul style={aiList}>
              {data.suggestedFollowUps.map((item: string, i: number) => (
                <li key={i} style={aiItem}>
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

export default InteractionForm;





/* ================= STYLES ================= */

const container: CSSProperties = {
  width: "65%",
  padding: "20px",
  background: "#f3f4f6",
  height: "100vh",
  overflowY: "auto",
};

const card = {
  background: "#fff",
  padding: "20px",
  borderRadius: "10px",
  boxShadow: "0 0 6px rgba(0,0,0,0.05)",
};

const row = {
  display: "flex",
  gap: "10px",
  marginBottom: "10px",
};

const block = {
  marginBottom: "10px",
};

const inputStyle = {
  width: "100%",
  padding: "8px",
  borderRadius: "6px",
  border: "1px solid #d1d5db",
  marginTop: "5px",
  backgroundColor: "#f9fafb",
};

const textareaStyle = {
  ...inputStyle,
  minHeight: "80px",
};

const micIcon = {
  position: "absolute" as const,
  right: "10px",
  bottom: "38px",
  color: "#6b7280",
};

const clockIcon = {
  position: "absolute" as const,
  right: "10px",
  top: "36px",
  color: "#6b7280",
};

const voiceNote = {
  fontSize: "13px",
  color: "#6b7280",
  display: "flex",
  alignItems: "center",
  gap: "6px",
  marginTop: "6px",
  cursor: "pointer",
};

const box = {
  border: "1px solid #e5e7eb",
  padding: "10px",
  borderRadius: "6px",
  marginTop: "10px",
  background: "#f9fafb",
};

const boxHeader = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const iconBtn = {
  display: "flex",
  alignItems: "center",
  gap: "5px",
  fontSize: "12px",
  padding: "4px 8px",
  border: "1px solid #d1d5db",
  borderRadius: "6px",
  background: "#fff",
  cursor: "pointer",
};

const mutedText = {
  color: "#6b7280",
  marginTop: "5px",
};

const sentimentRow = {
  display: "flex",
  gap: "20px",
  marginTop: "8px",
};

const sentimentItem = {
  display: "flex",
  alignItems: "center",
  gap: "6px",
  cursor: "pointer",
};

const aiBox = {
  marginTop: "15px",
};

const aiList = {
  listStyle: "none",
  padding: 0,
  marginTop: "5px",
};

const aiItem = {
  color: "#2563eb",
  marginBottom: "4px",
  cursor: "pointer",
};