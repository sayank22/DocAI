import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

// ✅ Added the missing fields to match the UI and AI tool outputs
interface InteractionState {
  hcpName: string;
  interactionType: string;
  date: string;
  time: string;
  attendees: string;
  topics: string;
  materialsShared: string;
  samples: string;
  sentiment: string;
  interestLevel: string;
  outcomes: string;
  followUp: string;
  suggestedFollowUps: string[]; // specifically typed as an array for mapping
}

const initialState: InteractionState = {
  hcpName: "",
  interactionType: "",
  date: "",
  time: "",
  attendees: "",
  topics: "",
  materialsShared: "",
  samples: "",
  sentiment: "",
  interestLevel: "",
  outcomes: "",
  followUp: "",
  suggestedFollowUps: [],
};

const interactionSlice = createSlice({
  name: "interaction",
  initialState,
  reducers: {
    // Single field update (manual/debug use)
    updateField: (
      state,
      action: PayloadAction<{ field: keyof InteractionState; value: any }>
    ) => {
      state[action.payload.field] = action.payload.value;
    },

    // FULL overwrite (used for log_interaction)
    setAllFields: (
      state,
      action: PayloadAction<Partial<InteractionState>>
    ) => {
      return { ...initialState, ...action.payload };
    },

    // 🔥 PARTIAL update (used for edit_interaction, summarize, sentiment, followup)
    updateFields: (
      state,
      action: PayloadAction<Partial<InteractionState>>
    ) => {
      return { ...state, ...action.payload };
    },

    // reset
    resetForm: () => initialState,
  },
});

export const { updateField, setAllFields, updateFields, resetForm } =
  interactionSlice.actions;

export default interactionSlice.reducer;