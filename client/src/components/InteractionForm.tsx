import { useDispatch, useSelector } from "react-redux";
import type {
  CSSProperties,
  ChangeEvent,
} from "react";

import type { RootState } from "../redux/store";

import {
  updateField,
  type StringInteractionField,
} from "../redux/interactionSlice";

import {
  FiSearch,
  FiMic,
  FiPlus,
  FiSmile,
  FiMeh,
  FiFrown,
  FiStar,
  FiCalendar,
  FiClock,
  FiUser,
} from "react-icons/fi";

import logo from "../assets/logo.png";

const InteractionForm = () => {
  const dispatch = useDispatch();

  const data = useSelector(
    (state: RootState) => state.interaction
  );

  const handleChange = (
    e: ChangeEvent<
      HTMLInputElement |
      HTMLTextAreaElement |
      HTMLSelectElement
    >
  ) => {
    dispatch(
      updateField({
        field:
          e.target
            .name as StringInteractionField,

        value: e.target.value,
      })
    );
  };

  return (
    <div style={container}>
      {/* HEADER */}

      <div style={topHeader}>
  <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: "18px",
    }}
  >
    {/* LOGO */}

    <img
      src={logo}
      alt="DocAI Logo"
      style={{
        width: "130px",
        height: "130px",
        objectFit: "contain",

        filter:
          "drop-shadow(0 10px 20px rgba(37,99,235,0.18))",
      }}
    />

    {/* TEXT */}

    <div>
      <h1 style={pageTitle}>
        HCP Interaction Workspace
      </h1>

      <p style={pageSubTitle}>
        AI-assisted doctor interaction
        logging and CRM automation
      </p>
    </div>
  </div>
</div>

      {/* MAIN CARD */}

      <div style={card}>
        {/* SECTION HEADER */}

        <div style={sectionHeader}>
          <div>
            <h2 style={sectionTitle}>
              Interaction Details
            </h2>

            <p style={sectionDesc}>
              Capture and manage HCP
              interaction data efficiently
            </p>
          </div>
        </div>

        {/* ROW 1 */}

        <div style={row}>
          <div style={field}>
            <label style={label}>
              HCP Name
            </label>

            <div style={inputWrapper}>
              <FiUser style={leftIcon} />

              <input
                name="hcpName"
                placeholder="Search or select HCP..."
                value={data.hcpName || ""}
                onChange={handleChange}
                style={input}
              />
            </div>
          </div>

          <div style={field}>
            <label style={label}>
              Interaction Type
            </label>

            <select
              name="interactionType"
              value={
                data.interactionType || ""
              }
              style={select}
              onChange={handleChange}
            >
              <option value="Meeting">
                Meeting
              </option>

              <option value="Phone Call">
                Consult
              </option>

              <option value="Report Show">
                Report Show
              </option>
            </select>
          </div>
        </div>

        {/* ROW 2 */}

        <div style={row}>
          <div style={field}>
            <label style={label}>
              Date
            </label>

            <div style={inputWrapper}>
              <FiCalendar style={leftIcon} />

              <input
                type="date"
                name="date"
                value={data.date || ""}
                onChange={handleChange}
                style={input}
              />
            </div>
          </div>

          <div style={field}>
            <label style={label}>
              Time
            </label>

            <div style={inputWrapper}>
              <FiClock style={leftIcon} />

              <input
                type="time"
                name="time"
                value={data.time || ""}
                onChange={handleChange}
                style={input}
              />
            </div>
          </div>
        </div>

        {/* ATTENDEES */}

        <div style={block}>
          <label style={label}>
            Attendees
          </label>

          <input
            name="attendees"
            placeholder="Enter attendee names..."
            value={data.attendees || ""}
            onChange={handleChange}
            style={input}
          />
        </div>

        {/* TOPICS */}

        <div style={block}>
          <div style={labelRow}>
            <label style={label}>
              Topics Discussed
            </label>

            <div style={aiBadge}>
              <FiStar size={12} />
              AI Enabled
            </div>
          </div>

          <div style={{ position: "relative" }}>
            <textarea
              name="topics"
              placeholder="Describe discussion points, concerns, feedback, and product conversations..."
              value={data.topics || ""}
              onChange={handleChange}
              style={textarea}
            />

            <FiMic style={micIcon} />
          </div>

          <div style={voiceNote}>
            <FiStar />
            Summarize from voice note
          </div>
        </div>

        {/* MATERIALS */}

        <div style={infoCard}>
          <div style={infoCardHeader}>
            <div>
              <h4 style={infoCardTitle}>
                Materials Shared
              </h4>

              <p style={infoCardSub}>
                PDFs, brochures, reports,
                presentations
              </p>
            </div>

            <button style={actionBtn}>
              <FiSearch />
              Search/Add
            </button>
          </div>

          <p style={placeholderText}>
            {data.materialsShared ||
              "No materials added yet"}
          </p>
        </div>

        {/* SAMPLES */}

        <div style={infoCard}>
          <div style={infoCardHeader}>
            <div>
              <h4 style={infoCardTitle}>
                Samples Distributed
              </h4>

              <p style={infoCardSub}>
                Track products and sample
                distribution
              </p>
            </div>

            <button style={actionBtn}>
              <FiPlus />
              Add Sample
            </button>
          </div>

          <p style={placeholderText}>
            {data.samples ||
              "No samples added yet"}
          </p>
        </div>

        {/* SENTIMENT */}

        <div style={block}>
          <div style={labelRow}>
            <label style={label}>
              HCP Sentiment Analysis
            </label>

            {data.isAiSentiment && (
              <div style={aiAnalysisBadge}>
                AI Generated
              </div>
            )}
          </div>

          {/* AI Insight */}

          {data.isAiInsight &&
            data.insight && (
              <div style={insightCard}>
                <div style={insightTitle}>
                  <FiStar />
                  AI Insight
                </div>

                <p style={insightText}>
                  {data.insight}
                </p>
              </div>
            )}

          {/* Sentiment Options */}

          <div style={sentimentGrid}>
            {[
              {
                label: "Positive",
                icon: <FiSmile />,
                color: "#16a34a",
              },

              {
                label: "Neutral",
                icon: <FiMeh />,
                color: "#2563eb",
              },

              {
                label: "Negative",
                icon: <FiFrown />,
                color: "#dc2626",
              },
            ].map((item) => (
              <label
                key={item.label}
                style={{
                  ...sentimentCard,

                  border:
                    data.sentiment ===
                    item.label
                      ? `2px solid ${item.color}`
                      : "1px solid #e5e7eb",
                }}
              >
                <input
                  type="radio"
                  name="sentiment"
                  value={item.label}
                  checked={
                    data.sentiment ===
                    item.label
                  }
                  onChange={handleChange}
                />

                <div
                  style={{
                    ...sentimentIcon,
                    color: item.color,
                  }}
                >
                  {item.icon}
                </div>

                <span>
                  {item.label}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* OUTCOMES */}

        <div style={block}>
          <label style={label}>
            Outcomes
          </label>

          <textarea
            name="outcomes"
            placeholder="Capture key decisions, commitments, and business outcomes..."
            value={data.outcomes || ""}
            onChange={handleChange}
            style={textarea}
          />
        </div>

        {/* FOLLOW UP */}

        <div style={block}>
          <label style={label}>
            Follow-up Actions
          </label>

          <textarea
            name="followUp"
            placeholder="Next steps, tasks, reminders, or scheduling actions..."
            value={data.followUp || ""}
            onChange={handleChange}
            style={textarea}
          />
        </div>

        {/* AI FOLLOW UPS */}

        <div style={followupCard}>
          <div style={labelRow}>
            <label style={label}>
              AI Suggested Follow-ups
            </label>

            <div style={aiBadge}>
              Smart Suggestions
            </div>
          </div>

          <div style={{ marginTop: 12 }}>
            {data.suggestedFollowUps
              ?.length > 0 ? (
              data.suggestedFollowUps.map(
                (
                  item: string,
                  i: number
                ) => (
                  <div
                    key={i}
                    style={followupItem}
                  >
                    <div
                      style={
                        followupDot
                      }
                    />

                    {item}
                  </div>
                )
              )
            ) : (
              <div style={emptyState}>
                No AI suggestions available
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InteractionForm;

/* ===================== STYLES ===================== */

const container: CSSProperties = {
  width: "62%",
  minHeight: "100vh",
  overflowY: "auto",
  padding: "32px",
  background:
    "linear-gradient(to bottom,#f8fafc,#eef2ff)",
  boxSizing: "border-box",
  fontFamily:
    "Inter, system-ui, sans-serif",
};

const topHeader: CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "28px",
};

const pageTitle: CSSProperties = {
  margin: 0,
  fontSize: "30px",
  fontWeight: 700,
  color: "#111827",
};

const pageSubTitle: CSSProperties = {
  marginTop: "8px",
  color: "#6b7280",
  fontSize: "14px",
};

const card: CSSProperties = {
  background: "rgba(255,255,255,0.8)",
  borderRadius: "24px",
  padding: "32px",
  border: "1px solid #e5e7eb",
  backdropFilter: "blur(12px)",
  boxShadow:
    "0 20px 60px rgba(15,23,42,0.08)",
};

const sectionHeader: CSSProperties = {
  marginBottom: "28px",
};

const sectionTitle: CSSProperties = {
  margin: 0,
  fontSize: "22px",
  fontWeight: 700,
  color: "#111827",
};

const sectionDesc: CSSProperties = {
  marginTop: "8px",
  color: "#6b7280",
  fontSize: "14px",
};

const row: CSSProperties = {
  display: "flex",
  gap: "20px",
  marginBottom: "24px",
  flexWrap: "wrap",
};

const field: CSSProperties = {
  flex: 1,
  minWidth: "240px",
};

const block: CSSProperties = {
  marginBottom: "28px",
};

const label: CSSProperties = {
  display: "block",
  marginBottom: "10px",
  fontSize: "13px",
  fontWeight: 700,
  color: "#374151",
};

const labelRow: CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "10px",
};

const inputWrapper: CSSProperties = {
  position: "relative",
};

const leftIcon: CSSProperties = {
  position: "absolute",
  left: "14px",
  top: "50%",
  transform: "translateY(-50%)",
  color: "#9ca3af",
};

const input: CSSProperties = {
  width: "100%",
  padding: "14px 16px 14px 42px",
  borderRadius: "14px",
  border: "1px solid #dbe3ee",
  background: "#fff",
  fontSize: "14px",
  outline: "none",
  boxSizing: "border-box",
};

const select: CSSProperties = {
  width: "100%",
  padding: "14px 16px",
  borderRadius: "14px",
  border: "1px solid #dbe3ee",
  background: "#fff",
  fontSize: "14px",
  outline: "none",
  cursor: "pointer",
};

const textarea: CSSProperties = {
  width: "100%",
  minHeight: "120px",
  padding: "16px",
  borderRadius: "16px",
  border: "1px solid #dbe3ee",
  background: "#fff",
  fontSize: "14px",
  resize: "vertical",
  outline: "none",
  boxSizing: "border-box",
  lineHeight: 1.7,
};

const micIcon: CSSProperties = {
  position: "absolute",
  right: "18px",
  bottom: "18px",
  color: "#6b7280",
  cursor: "pointer",
};

const aiBadge: CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "6px",
  padding: "6px 12px",
  borderRadius: "999px",
  background: "#eef2ff",
  color: "#4338ca",
  fontSize: "12px",
  fontWeight: 600,
};

const voiceNote: CSSProperties = {
  marginTop: "12px",
  display: "inline-flex",
  alignItems: "center",
  gap: "8px",
  padding: "10px 14px",
  borderRadius: "12px",
  background: "#f8fafc",
  color: "#374151",
  fontSize: "13px",
  fontWeight: 600,
  cursor: "pointer",
};

const infoCard: CSSProperties = {
  border: "1px solid #e5e7eb",
  borderRadius: "18px",
  padding: "20px",
  marginBottom: "24px",
  background: "#fff",
};

const infoCardHeader: CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "14px",
};

const infoCardTitle: CSSProperties = {
  margin: 0,
  fontSize: "16px",
  fontWeight: 700,
  color: "#111827",
};

const infoCardSub: CSSProperties = {
  marginTop: "4px",
  color: "#6b7280",
  fontSize: "13px",
};

const actionBtn: CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "8px",
  border: "none",
  borderRadius: "12px",
  padding: "10px 14px",
  background:
    "linear-gradient(135deg,#eff6ff,#eef2ff)",
  color: "#2563eb",
  fontWeight: 600,
  cursor: "pointer",
};

const placeholderText: CSSProperties = {
  color: "#9ca3af",
  fontStyle: "italic",
  fontSize: "14px",
};

const aiAnalysisBadge: CSSProperties = {
  padding: "6px 10px",
  borderRadius: "999px",
  background: "#dcfce7",
  color: "#166534",
  fontSize: "12px",
  fontWeight: 700,
};

const insightCard: CSSProperties = {
  marginBottom: "18px",
  padding: "18px",
  borderRadius: "18px",
  background:
    "linear-gradient(135deg,#eff6ff,#f5f3ff)",
  border: "1px solid #dbeafe",
};

const insightTitle: CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "8px",
  fontWeight: 700,
  color: "#4338ca",
  marginBottom: "10px",
};

const insightText: CSSProperties = {
  margin: 0,
  color: "#374151",
  lineHeight: 1.7,
  fontSize: "14px",
};

const sentimentGrid: CSSProperties = {
  display: "flex",
  gap: "16px",
  flexWrap: "wrap",
};

const sentimentCard: CSSProperties = {
  flex: 1,
  minWidth: "140px",
  padding: "18px",
  borderRadius: "18px",
  background: "#fff",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "10px",
  cursor: "pointer",
  transition: "0.2s",
};

const sentimentIcon: CSSProperties = {
  fontSize: "24px",
};

const followupCard: CSSProperties = {
  borderRadius: "22px",
  padding: "24px",
  background:
    "linear-gradient(to bottom,#ffffff,#f8fafc)",
  border: "1px solid #e5e7eb",
};

const followupItem: CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "12px",
  padding: "14px 0",
  borderBottom: "1px solid #f1f5f9",
  color: "#374151",
  fontSize: "14px",
};

const followupDot: CSSProperties = {
  width: "8px",
  height: "8px",
  borderRadius: "999px",
  background: "#2563eb",
};

const emptyState: CSSProperties = {
  color: "#9ca3af",
  fontStyle: "italic",
  fontSize: "14px",
};