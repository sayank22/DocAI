import { useDispatch, useSelector } from "react-redux";
import type { CSSProperties, ChangeEvent } from "react";
import type { RootState } from "../redux/store";
import { updateField } from "../redux/interactionSlice";
import type { StringInteractionField } from "../redux/interactionSlice";

import {
  FiSearch,
  FiMic,
  FiPlus,
  FiSmile,
  FiMeh,
  FiFrown,
  FiStar,
} from "react-icons/fi";

const InteractionForm = () => {
  const dispatch = useDispatch();
  const data = useSelector((state: RootState) => state.interaction);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    dispatch(
      updateField({
        field: e.target.name as StringInteractionField,
        value: e.target.value,
      })
    );
  };

  return (
    <div style={container}>
      <h2 style={{ marginBottom: "15px", color: "#1f2937" }}>Log HCP Interaction</h2>

      <div style={card}>
        {/* Interaction Details Header with Line */}
        <div style={cardHeader}>
          <h4 style={{ margin: 0, color: "#1f2937" }}>Interaction Details</h4>
        </div>

        {/* Row 1: Name & Type */}
        <div style={row}>
          <div style={flexCol}>
            <label style={labelStyle}>HCP Name</label>
            <input
              name="hcpName"
              placeholder="Search or select HCP..."
              value={data.hcpName || ""}
              onChange={handleChange}
              style={inputStyle}
            />
          </div>

          <div style={flexCol}>
            <label style={labelStyle}>Interaction Type</label>
            {/* Select-options with border */}
            <select
              name="interactionType"
              value={data.interactionType || ""}
              style={selectBorder}
              onChange={handleChange}
            >
              <option value="Meeting">Meeting</option>
              <option value="Phone Call">Consult</option>
              <option value="Report Show">Report Show</option>
            </select>
          </div>
        </div>

        {/* Row 2: Date & Time */}
        <div style={row}>
          <div style={flexCol}>
            <label style={labelStyle}>Date</label>
            <input
              type="date"
              name="date"
              value={data.date || ""}
              onChange={handleChange}
              style={inputStyle}
            />
          </div>

          <div style={flexCol}>
            <label style={labelStyle}>Time</label>
            <input
              type="time"
              name="time"
              value={data.time || ""}
              onChange={handleChange}
              style={inputStyle}
            />
          </div>
        </div>

        {/* Attendees */}
        <div style={block}>
          <label style={labelStyle}>Attendees</label>
          <input
            name="attendees"
            placeholder="Enter names or search..."
            value={data.attendees || ""}
            onChange={handleChange}
            style={inputStyle}
          />
        </div>

        {/* Topics */}
        <div style={block}>
          <label style={labelStyle}>Topics Discussed</label>
          <div style={{ position: "relative", width: "100%" }}>
            <textarea
              name="topics"
              placeholder="Enter key discussion points..."
              value={data.topics || ""}
              onChange={handleChange}
              style={{ ...textareaStyle, paddingRight: "35px" }}
            />
            <FiMic style={micIcon} />
          </div>

          <div style={voiceNote}>
            <FiStar style={{ color: "#4b5563" }} />
            Summarize from Voice Note (Requires Consent)
          </div>
        </div>

        {/* Materials Shared */}
        <div style={box}>
          <div style={boxHeader}>
            <span style={labelStyle}>Materials Shared</span>
            <button style={iconBtn}>
              <FiSearch /> Search/Add
            </button>
          </div>
          <p style={mutedText}>
            {data.materialsShared || "No materials added."}
          </p>
        </div>

        {/* Samples Distributed */}
        <div style={box}>
          <div style={boxHeader}>
            <span style={labelStyle}>Samples Distributed</span>
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
  {/* Label + AI Tag */}
  <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
    <label style={labelStyle}>
      Observed/Inferred HCP Sentiment
    </label>

    {data.isAiInsight && data.insight &&(
      <div
    style={{
      fontSize: "13px",
      color: "#374151",
      marginTop: "6px",
      padding: "6px 10px",
      background: "#f3f4f6",
      borderRadius: "6px",
    }}
  >
    {data.insight}
  </div>
    )}
  </div>

  {/* Options */}
  <div style={sentimentRow}>
    {[
      { label: "Positive", icon: <FiSmile />, color: "#16a34a" },
      { label: "Neutral", icon: <FiMeh />, color: "#3b82f6" },
      { label: "Negative", icon: <FiFrown />, color: "#dc2626" },
    ].map((item) => (
      <label
        key={item.label}
        style={{ ...sentimentItem, color: "#4b5563" }}
      >
        <input
          type="radio"
          name="sentiment"
          value={item.label}
          checked={data.sentiment === item.label}
          onChange={handleChange}
        />

        <span
          style={{
            color: item.color,
            display: "flex",
            alignItems: "center",
          }}
        >
          {item.icon}
        </span>

        {item.label}
      </label>
    ))}
  </div>
</div>

        {/* Outcomes */}
        <div style={block}>
          <label style={labelStyle}>Outcomes</label>
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
          <label style={labelStyle}>Follow-up Actions</label>
          <textarea
            name="followUp"
            placeholder="Enter next steps or tasks..."
            value={data.followUp || ""}
            onChange={handleChange}
            style={{...textareaStyle, marginBottom: "8px"}}
          />
          </div>

          {/* AI Suggested Follow-ups */}
<div style={block}>
  <label style={labelStyle}>
    AI Suggested Follow-ups
  </label>

  <div style={{ marginTop: "2px" }}>
    {data.suggestedFollowUps?.length > 0 ? (
      data.suggestedFollowUps.map((item: string, i: number) => (
        <div key={i} style={aiItem}>
          + {item}
        </div>
      ))
    ) : (
      <div style={{ fontSize: "12px", color: "#9ca3af", fontStyle: "italic" }}>
        No suggestions yet
      </div>
    )}
  </div>
</div>

      </div>
    </div>
  );
};

export default InteractionForm;

/* ================= STYLES ================= */

const container: CSSProperties = {
  width: "65%",
  maxWidth: "900px",
  margin: "0 auto",
  overflowY: "auto", 
  padding: "20px",
  background: "#f3f4f6",
  minHeight: "100vh",
  boxSizing: "border-box",
  fontFamily: "system-ui, -apple-system, sans-serif",
};

const card: CSSProperties = {
  background: "#fff",
  padding: "20px",
  borderRadius: "8px",
  border: "1px solid #e5e7eb",
  boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
  boxSizing: "border-box",
};

const cardHeader: CSSProperties = {
  borderBottom: "1px solid #e5e7eb",
  paddingBottom: "10px",
  marginBottom: "20px",
};

const row: CSSProperties = {
  display: "flex",
  gap: "20px",
  marginBottom: "15px",
  flexWrap: "wrap",
};

const flexCol: CSSProperties = {
  flex: 1,
  minWidth: "220px",
  display: "flex",
  flexDirection: "column",
};

const block: CSSProperties = {
  marginBottom: "20px",
  width: "100%",
};

const labelStyle: CSSProperties = {
  fontSize: "13px",
  fontWeight: 600,
  color: "#374151",
  marginBottom: "6px",
  display: "block",
};

const inputStyle: CSSProperties = {
  width: "100%",
  padding: "10px 12px",
  borderRadius: "6px",
  border: "1px solid #d1d5db",
  backgroundColor: "#fff",
  boxSizing: "border-box",
  fontSize: "14px",
  outline: "none",
};

const selectBorder: CSSProperties = {
  width: "100%",
  padding: "10px 12px",
  borderRadius: "6px",
  border: "1px solid #d1d5db",
  backgroundColor: "#fff",
  boxSizing: "border-box",
  fontSize: "14px",
  outline: "none",
  cursor: "pointer",
  color: "#1f2937",
};

const textareaStyle: CSSProperties = {
  ...inputStyle,
  minHeight: "80px",
  resize: "vertical",
};

const micIcon: CSSProperties = {
  position: "absolute",
  right: "12px",
  bottom: "12px",
  color: "#6b7280",
  cursor: "pointer",
};

const voiceNote: CSSProperties = {
  fontSize: "12px",
  fontWeight: 600,
  color: "#4b5563",
  display: "inline-flex", 
  alignItems: "center",
  gap: "6px",
  marginTop: "8px",
  padding: "6px 10px",
  backgroundColor: "#f3f4f6",
  borderRadius: "6px",
  cursor: "pointer",
};

const box: CSSProperties = {
  border: "1px solid #e5e7eb",
  padding: "15px",
  borderRadius: "6px",
  marginBottom: "20px",
  background: "#fff",
  boxSizing: "border-box",
};

const boxHeader: CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "8px",
};

const iconBtn: CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "5px",
  fontSize: "12px",
  fontWeight: 500,
  padding: "6px 12px",
  border: "1px solid #d1d5db",
  borderRadius: "4px",
  background: "#fff",
  cursor: "pointer",
  color: "#374151",
};

const mutedText: CSSProperties = {
  color: "#9ca3af",
  fontSize: "13px",
  margin: 0,
  fontStyle: "italic",
};

const sentimentRow: CSSProperties = {
  display: "flex",
  gap: "24px",
  marginTop: "4px",
  flexWrap: "wrap",
};

const sentimentItem: CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "6px",
  cursor: "pointer",
  fontSize: "14px",
};

const aiItem: CSSProperties = {
  color: "#2563eb",
  fontSize: "13px",
  marginBottom: "2px",
  cursor: "pointer",
  lineHeight: "1.4",
};