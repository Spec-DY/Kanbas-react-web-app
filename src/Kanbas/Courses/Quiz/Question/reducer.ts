import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface QuestionState {
  questions: any[];
}

const initialState: QuestionState = {
  questions: [],
};

const questionSlice = createSlice({
  name: "questions",
  initialState,
  reducers: {
    setQuestions: (state, action: PayloadAction<any[]>) => {
      state.questions = action.payload;
    },
    addQuestion: (state, action: PayloadAction<any>) => {
      state.questions.push(action.payload);
    },
    updateQuestion: (state, action: PayloadAction<any>) => {
      const index = state.questions.findIndex(q => q._id === action.payload._id);
      if (index !== -1) {
        state.questions[index] = action.payload;
      }
    },
    deleteQuestion: (state, action: PayloadAction<string>) => {
      state.questions = state.questions.filter(q => q._id !== action.payload);
    },
  },
});

export const { setQuestions, addQuestion, updateQuestion, deleteQuestion } = questionSlice.actions;

export default questionSlice.reducer;
