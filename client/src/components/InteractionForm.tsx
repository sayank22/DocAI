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

  // Kept intact in case internal AI state changes need it, but manual interaction is blocked below
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
          <p className="mt-2 text-[14px] text-slate-700">
            AI-assisted doctor interaction logging and CRM automation
          </p>
        </div>
      </div>

      <div className="rounded-[24px] border border-slate-200/80 bg-white/80 p-8 shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur-xl">
        <div className="mb-7">
          <h2 className="m-0 text-[22px] font-bold text-slate-900">Interaction Details</h2>
          <p className="mt-2 text-[14px] text-slate-700">
            Capture and manage HCP interaction data efficiently (Managed by AI Assistant)
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
                disabled
                name="hcpName"
                placeholder="Search or select HCP"
                value={data.hcpName || ""}
                onChange={handleChange}
                className="w-full rounded-[14px] border border-slate-600 bg-slate-50/50 py-[14px] pl-[42px] pr-[16px] text-[14px] text-slate-700 outline-none shadow-sm cursor-not-allowed"
              />
            </div>
          </div>

          <div className="min-w-[240px] flex-1">
            <label className="mb-2.5 block text-[13px] font-bold text-slate-700">
              Interaction Type
            </label>

            <select
              disabled
              name="interactionType"
              value={data.interactionType || ""}
              onChange={handleChange}
              className="w-full rounded-[14px] border border-slate-600 bg-slate-50/50 px-[16px] py-[14px] text-[14px] text-slate-700 outline-none shadow-sm cursor-not-allowed appearance-none"
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
                disabled
                type="date"
                name="date"
                value={data.date || ""}
                onChange={handleChange}
                className="w-full rounded-[14px] border border-slate-600 bg-slate-50/50 py-[14px] pl-[42px] pr-[16px] text-[14px] text-slate-700 outline-none shadow-sm cursor-not-allowed"
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
                disabled
                type="time"
                name="time"
                value={data.time || ""}
                onChange={handleChange}
                className="w-full rounded-[14px] border border-slate-600 bg-slate-50/50 py-[14px] pl-[42px] pr-[16px] text-[14px] text-slate-700 outline-none shadow-sm cursor-not-allowed"
              />
            </div>
          </div>
        </div>

        <div className="mb-7">
          <label className="mb-2.5 block text-[13px] font-bold text-slate-700">
            Attendees
          </label>

          <input
            disabled
            name="attendees"
            placeholder="Enter names or search..."
            value={data.attendees || ""}
            onChange={handleChange}
            className="w-full rounded-[14px] border border-slate-600 bg-slate-50/50 px-[16px] py-[14px] text-[14px] text-slate-700 outline-none shadow-sm cursor-not-allowed"
          />
        </div>

        <div className="mb-7">
          <div className="mb-2.5 flex items-center justify-between">
            <label className="text-[13px] font-bold text-slate-700">Topics Discussed</label>
          </div>

          <div className="relative">
            <textarea
              disabled
              name="topics"
              placeholder="Enter key discussion points ..."
              value={data.topics || ""}
              onChange={handleChange}
              className="min-h-[120px] w-full resize-none rounded-[16px] border border-slate-600 bg-slate-50/50 px-[16px] py-[16px] pr-[48px] text-[14px] leading-7 text-slate-700 outline-none shadow-sm cursor-not-allowed"
            />
            <FiMic className="absolute bottom-[18px] right-[18px] text-slate-400 pointer-events-none" />
          </div>

          <div className="mt-3 inline-flex items-center gap-2 rounded-[14px] border border-slate-600 bg-slate-100/50 px-[14px] py-[10px] text-[13px] font-semibold text-slate-900 cursor-not-allowed">
            <FiStar /> Summarize from voice note (Requires Consent)
          </div>
        </div>

<div className="mb-2.5 flex items-center justify-between">
            <label className="text-[13px] font-bold text-slate-700">Materials Shared/Samples Distributed</label>
          </div>
        <div className="mb-6 rounded-[18px] border border-slate-600 bg-slate-50/30 p-5">
          <div className="mb-3.5 flex items-center justify-between">
            <div>
              <h4 className="m-0 text-[14px] font-bold text-slate-700">Materials Shared</h4>
            </div>

            <div className="inline-flex items-center gap-2 rounded-xl bg-slate-100 px-3.5 py-2.5 text-[13px] font-semibold text-slate-400 cursor-not-allowed">
              <FiSearch /> Search/Add
            </div>
          </div>

          <p className="text-[14px] italic text-slate-700">
            {data.materialsShared || "No materials extracted yet"}
          </p>
        </div>

        <div className="mb-6 rounded-[18px] border border-slate-600 bg-slate-50/30 p-5">
          <div className="mb-3.5 flex items-center justify-between">
            <div>
              <h4 className="m-0 text-[14px] font-bold text-slate-700">Samples Distributed</h4>
            </div>

            <div className="inline-flex items-center gap-2 rounded-[12px] bg-slate-100 px-[14px] py-[10px] text-[13px] font-semibold text-slate-400 cursor-not-allowed">
              <FiPlus /> Add Sample
            </div>
          </div>

          <p className="text-[14px] italic text-slate-700">
            {data.samples || "No samples extracted yet"}
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
                  className={`flex min-w-35 flex-1 flex-col items-center gap-2.5 rounded-[18px] border px-4.5 py-4.5 text-sm font-semibold transition cursor-not-allowed ${
                    isSelected
                      ?  "bg-blue-50/60 text-blue-700 shadow-sm"
                      : " bg-slate-50/30 text-slate-400"
                  }`}
                >
                  <input
                    disabled
                    type="radio"
                    name="sentiment"
                    value={item.label}
                    checked={isSelected}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  <div className={`text-[24px] ${isSelected ? item.color : "text-slate-300"}`}>{item.icon}</div>
                  <span>{item.label}</span>
                </label>
              );
            })}
          </div>
        </div>

        <div className="mb-7">
          <label className="mb-2.5 block text-[13px] font-bold text-slate-700">Outcomes</label>
          <textarea
            disabled
            name="outcomes"
            placeholder="Key outcomes or agreements..."
            value={data.outcomes || ""}
            onChange={handleChange}
            className="min-h-[120px] w-full resize-none rounded-2xl border border-slate-200 bg-slate-50/50 px-2xl py-2xl text-[14px] leading-7 text-slate-700 outline-none shadow-sm cursor-not-allowed"
          />
        </div>

        <div className="mb-7">
          <label className="mb-2.5 block text-[13px] font-bold text-slate-700">Follow-up Actions</label>
          <textarea
            disabled
            name="followUp"
            placeholder="Enter next steps or tasks..."
            value={data.followUp || ""}
            onChange={handleChange}
            className="min-h-30 w-full resize-none rounded-2xl border border-slate-200 bg-slate-50/50 px-2xl py-2xl text-[14px] leading-7 text-slate-700 outline-none shadow-sm cursor-not-allowed"
          />
        </div>

        <div className="rounded-[22px] border border-slate-200 bg-linear-to-b from-white to-slate-50 p-6">
          <div className="mb-4 flex items-center justify-between">
            <label className="text-[13px] font-bold uppercase tracking-wide text-slate-700">
              AI Suggested Follow-ups
            </label>

            <div className="inline-flex items-center gap-1.5 rounded-full bg-indigo-50 px-3 py-1.5 text-[12px] font-semibold text-indigo-700">
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