import { useDispatch, useSelector } from "react-redux";
import type { ChangeEvent } from "react";

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
  FiZap,
} from "react-icons/fi";

// import logo from "../assets/logo.png";

const sentimentOptions = [
  { label: "Positive", icon: <FiSmile />, color: "text-emerald-600" },
  { label: "Neutral", icon: <FiMeh />, color: "text-blue-600" },
  { label: "Negative", icon: <FiFrown />, color: "text-red-600" },
];

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
    <div className="box-border min-h-screen w-[62%] overflow-y-auto bg-[radial-gradient(circle_at_top,_rgba(191,219,254,0.4),_transparent_48%),linear-gradient(180deg,_#f8fafc_0%,_#eef2ff_100%)] p-8 font-sans">
      <div className="mb-7 flex items-center gap-[18px]">
        {/* <img
          src={logo}
          alt="DocAI Logo"
          className="h-[130px] w-[130px] object-contain drop-shadow-[0_10px_20px_rgba(37,99,235,0.18)]"
        /> */}

        <div>
          <h1 className="m-0 text-[30px] font-bold text-slate-900">Log HCP Interaction</h1>
          <p className="mt-2 text-[14px] text-slate-500">
            AI-assisted doctor interaction logging and CRM automation
          </p>
        </div>
      </div>

      <div className="rounded-[24px] border border-slate-200/80 bg-white/80 p-8 shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur-xl">
        <div className="mb-7">
          <h2 className="m-0 text-[22px] font-bold text-slate-900">Interaction Details</h2>
          <p className="mt-2 text-[14px] text-slate-500">
            Capture and manage HCP interaction data efficiently
          </p>
        </div>

        <div className="mb-6 flex flex-wrap gap-5">
          <div className="min-w-[240px] flex-1">
            <label className="mb-2.5 block text-[13px] font-bold text-slate-700">
              HCP Name
            </label>

            <div className="relative">
              <FiUser className="pointer-events-none absolute left-[14px] top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                name="hcpName"
                placeholder="Search or select HCP..."
                value={data.hcpName || ""}
                onChange={handleChange}
                className="w-full rounded-[14px] border border-slate-200 bg-white py-[14px] pl-[42px] pr-[16px] text-[14px] text-slate-700 outline-none shadow-sm"
              />
            </div>
          </div>

          <div className="min-w-[240px] flex-1">
            <label className="mb-2.5 block text-[13px] font-bold text-slate-700">
              Interaction Type
            </label>

            <select
              name="interactionType"
              value={data.interactionType || ""}
              onChange={handleChange}
              className="w-full cursor-pointer rounded-[14px] border border-slate-200 bg-white px-[16px] py-[14px] text-[14px] text-slate-700 outline-none shadow-sm"
            >
              <option value="Meeting">Meeting</option>
              <option value="Phone Call">Consult</option>
              <option value="Report Show">Report Show</option>
            </select>
          </div>
        </div>

        <div className="mb-6 flex flex-wrap gap-5">
          <div className="min-w-[240px] flex-1">
            <label className="mb-2.5 block text-[13px] font-bold text-slate-700">
              Date
            </label>

            <div className="relative">
              <FiCalendar className="pointer-events-none absolute left-[14px] top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="date"
                name="date"
                value={data.date || ""}
                onChange={handleChange}
                className="w-full rounded-[14px] border border-slate-200 bg-white py-[14px] pl-[42px] pr-[16px] text-[14px] text-slate-700 outline-none shadow-sm"
              />
            </div>
          </div>

          <div className="min-w-[240px] flex-1">
            <label className="mb-2.5 block text-[13px] font-bold text-slate-700">
              Time
            </label>

            <div className="relative">
              <FiClock className="pointer-events-none absolute left-[14px] top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="time"
                name="time"
                value={data.time || ""}
                onChange={handleChange}
                className="w-full rounded-[14px] border border-slate-200 bg-white py-[14px] pl-[42px] pr-[16px] text-[14px] text-slate-700 outline-none shadow-sm"
              />
            </div>
          </div>
        </div>

        <div className="mb-7">
          <label className="mb-2.5 block text-[13px] font-bold text-slate-700">
            Attendees
          </label>

          <input
            name="attendees"
            placeholder="Enter attendee names..."
            value={data.attendees || ""}
            onChange={handleChange}
            className="w-full rounded-[14px] border border-slate-200 bg-white px-[16px] py-[14px] text-[14px] text-slate-700 outline-none shadow-sm"
          />
        </div>

        <div className="mb-7">
          <div className="mb-2.5 flex items-center justify-between">
            <label className="text-[13px] font-bold text-slate-700">Topics Discussed</label>
            <div className="inline-flex items-center gap-[6px] rounded-full bg-indigo-50 px-[12px] py-[6px] text-[12px] font-semibold text-indigo-700">
              <FiStar size={12} />
              AI Enabled
            </div>
          </div>

          <div className="relative">
            <textarea
              name="topics"
              placeholder="Describe discussion points, concerns, feedback, and product conversations..."
              value={data.topics || ""}
              onChange={handleChange}
              className="min-h-[120px] w-full resize-y rounded-[16px] border border-slate-200 bg-white px-[16px] py-[16px] pr-[48px] text-[14px] leading-7 text-slate-700 outline-none shadow-sm"
            />
            <FiMic className="absolute bottom-[18px] right-[18px] cursor-pointer text-slate-500" />
          </div>

          <div className="mt-3 inline-flex items-center gap-2 rounded-[12px] border border-slate-200 bg-slate-50 px-[14px] py-[10px] text-[13px] font-semibold text-slate-600">
            <FiStar /> Summarize from voice note
          </div>
        </div>

        <div className="mb-6 rounded-[18px] border border-slate-200 bg-white p-5">
          <div className="mb-3.5 flex items-center justify-between">
            <div>
              <h4 className="m-0 text-[16px] font-bold text-slate-900">Materials Shared</h4>
              <p className="mt-1 text-[13px] text-slate-500">
                PDFs, brochures, reports, presentations
              </p>
            </div>

            <button className="inline-flex items-center gap-2 rounded-[12px] bg-blue-50 px-[14px] py-[10px] font-semibold text-blue-700">
              <FiSearch /> Search/Add
            </button>
          </div>

          <p className="text-[14px] italic text-slate-400">
            {data.materialsShared || "No materials added yet"}
          </p>
        </div>

        <div className="mb-6 rounded-[18px] border border-slate-200 bg-white p-5">
          <div className="mb-3.5 flex items-center justify-between">
            <div>
              <h4 className="m-0 text-[16px] font-bold text-slate-900">Samples Distributed</h4>
              <p className="mt-1 text-[13px] text-slate-500">
                Track products and sample distribution
              </p>
            </div>

            <button className="inline-flex items-center gap-2 rounded-[12px] bg-blue-50 px-[14px] py-[10px] font-semibold text-blue-700">
              <FiPlus /> Add Sample
            </button>
          </div>

          <p className="text-[14px] italic text-slate-400">
            {data.samples || "No samples added yet"}
          </p>
        </div>

        <div className="mb-7">
          <div className="mb-2.5 flex items-center justify-between">
            <label className="text-[13px] font-bold text-slate-700">
              HCP Sentiment Analysis
            </label>

            {data.isAiSentiment && (
              <div className="rounded-full bg-emerald-100 px-[10px] py-[6px] text-[12px] font-bold text-emerald-700">
                AI Generated
              </div>
            )}
          </div>

          {data.isAiInsight && data.insight && (
            <div className="mb-4 rounded-[18px] border border-blue-200 bg-gradient-to-r from-blue-50 to-violet-50 p-[18px]">
              <div className="mb-2.5 flex items-center gap-2 font-bold text-indigo-700">
                <FiStar /> AI Insight
              </div>
              <p className="m-0 text-[14px] leading-7 text-slate-600">{data.insight}</p>
            </div>
          )}

          <div className="flex flex-wrap gap-4">
            {sentimentOptions.map((item) => {
              const isSelected = data.sentiment === item.label;

              return (
                <label
                  key={item.label}
                  className={`flex min-w-[140px] flex-1 cursor-pointer flex-col items-center gap-[10px] rounded-[18px] border px-[18px] py-[18px] text-sm font-semibold text-slate-700 transition ${
                    isSelected
                      ? "border-blue-500 bg-blue-50 shadow-sm"
                      : "border-slate-200 bg-white"
                  }`}
                >
                  <input
                    type="radio"
                    name="sentiment"
                    value={item.label}
                    checked={isSelected}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  <div className={`text-[24px] ${item.color}`}>{item.icon}</div>
                  <span>{item.label}</span>
                </label>
              );
            })}
          </div>
        </div>

        <div className="mb-7">
          <label className="mb-2.5 block text-[13px] font-bold text-slate-700">Outcomes</label>
          <textarea
            name="outcomes"
            placeholder="Capture key decisions, commitments, and business outcomes..."
            value={data.outcomes || ""}
            onChange={handleChange}
            className="min-h-[120px] w-full resize-y rounded-[16px] border border-slate-200 bg-white px-[16px] py-[16px] text-[14px] leading-7 text-slate-700 outline-none shadow-sm"
          />
        </div>

        <div className="mb-7">
          <label className="mb-2.5 block text-[13px] font-bold text-slate-700">Follow-up Actions</label>
          <textarea
            name="followUp"
            placeholder="Next steps, tasks, reminders, or scheduling actions..."
            value={data.followUp || ""}
            onChange={handleChange}
            className="min-h-[120px] w-full resize-y rounded-[16px] border border-slate-200 bg-white px-[16px] py-[16px] text-[14px] leading-7 text-slate-700 outline-none shadow-sm"
          />
        </div>

        <div className="rounded-[22px] border border-slate-200 bg-gradient-to-b from-white to-slate-50 p-6">
          <div className="mb-4 flex items-center justify-between">
            <label className="text-[13px] font-bold uppercase tracking-wide text-slate-700">
              AI Suggested Follow-ups
            </label>

            <div className="inline-flex items-center gap-[6px] rounded-full bg-indigo-50 px-[12px] py-[6px] text-[12px] font-semibold text-indigo-700">
              <FiZap size={12} /> AI Suggestions
            </div>
          </div>

          <div className="mt-3 space-y-3">
            {data.suggestedFollowUps?.length > 0 ? (
              data.suggestedFollowUps.map((item: string, i: number) => (
                <div key={i} className="flex items-center gap-3 border-b border-slate-100 pb-3 text-[14px] text-slate-600 last:border-b-0 last:pb-0">
                  <div className="h-2.5 w-2.5 shrink-0 rounded-full bg-blue-600" />
                  {item}
                </div>
              ))
            ) : (
              <div className="text-[14px] italic text-slate-400">No AI suggestions available</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InteractionForm;
