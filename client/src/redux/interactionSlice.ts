import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

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
  outcomes: string;
  followUp: string;
  suggestedFollowUps: string[];

  // 🔥 AI flags
  isAiSentiment: boolean;
  insight: string;
  isAiInsight: boolean;
}

export type StringInteractionField = {
  [Field in keyof InteractionState]: InteractionState[Field] extends string
    ? Field
    : never;
}[keyof InteractionState];

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
  outcomes: "",
  followUp: "",
  suggestedFollowUps: [],
  isAiSentiment: false,

  // 🔥 NEW
  insight: "",
  isAiInsight: false,
};

const interactionSlice = createSlice({
  name: "interaction",
  initialState,
  reducers: {
    updateField: (
      state,
      action: PayloadAction<{ field: StringInteractionField; value: string }>
    ) => {
      state[action.payload.field] = action.payload.value;

      if (action.payload.field === "sentiment") {
        state.isAiSentiment = false;
        state.isAiInsight = false; // 🔥 remove insight tag if user overrides
      }
    },

    setAllFields: (
      _state,
      action: PayloadAction<Partial<InteractionState>>
    ) => {
      return {
        ...initialState,
        ...action.payload,
      };
    },

    updateFields: (
      state,
      action: PayloadAction<Partial<InteractionState>>
    ) => {
      return {
        ...state,
        ...action.payload,
      };
    },

    setAiSentiment: (state, action: PayloadAction<boolean>) => {
      state.isAiSentiment = action.payload;
    },

    resetForm: () => initialState,
  },
});

export const {
  updateField,
  setAllFields,
  updateFields,
  setAiSentiment,
  resetForm,
} = interactionSlice.actions;

export default interactionSlice.reducer;