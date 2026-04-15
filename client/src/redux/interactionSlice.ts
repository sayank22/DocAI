import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface InteractionState {
  hcpName: string;
  interactionType: string;
  date: string;
  time: string;
  topics: string;
  sentiment: string;
  outcomes: string;
  followUp: string;
}

const initialState: InteractionState = {
  hcpName: "",
  interactionType: "",
  date: "",
  time: "",
  topics: "",
  sentiment: "",
  outcomes: "",
  followUp: "",
};

const interactionSlice = createSlice({
  name: "interaction",
  initialState,
  reducers: {
    updateField: (
      state,
      action: PayloadAction<{ field: keyof InteractionState; value: string }>
    ) => {
      state[action.payload.field] = action.payload.value;
    },

    setAllFields: (state, action: PayloadAction<Partial<InteractionState>>) => {
      return { ...state, ...action.payload };
    },

    resetForm: () => initialState,
  },
});

export const { updateField, setAllFields, resetForm } =
  interactionSlice.actions;

export default interactionSlice.reducer;