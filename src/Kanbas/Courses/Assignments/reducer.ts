import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import * as db from "../../Database";

interface Assignment {
  _id: string;
  title: string;
  course: string;
  description: string;
  points: number;
  dueDate: string;
  availableFrom: string;
  availableUntil: string;
}

interface AssignmentsState {
  assignments: Assignment[];
}

const initialState: AssignmentsState = {
  assignments: db.assignments,
};

const assignmentsSlice = createSlice({
  name: "assignments",
  initialState,
  reducers: {

    setAssignment: (state, action) => {
      state.assignments = action.payload;
    },

    addAssignment: (state, action: PayloadAction<Assignment>) => {
      state.assignments.push({
        ...action.payload,
        _id: new Date().getTime().toString(),
      });
    },
    updateAssignment: (state, action: PayloadAction<Assignment>) => {
      const index = state.assignments.findIndex(
        (assignment) => assignment._id === action.payload._id
      );
      if (index !== -1) {
        state.assignments[index] = action.payload;
      }
    },
    deleteAssignment: (state, action: PayloadAction<string>) => {
      state.assignments = state.assignments.filter(
        (assignment) => assignment._id !== action.payload
      );
    },
  },
});

export const { addAssignment, updateAssignment, deleteAssignment, setAssignment } = assignmentsSlice.actions;
export default assignmentsSlice.reducer;
