import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface QuizState {
    quizzes: any[];
}

const initialState: QuizState = {
    quizzes: [],
};

const quizSlice = createSlice({
    name: "quizzes",
    initialState,
    reducers: {
        setQuizzes: (state, action: PayloadAction<any[]>) => {
            state.quizzes = action.payload;
        },
        addQuiz: (state, action: PayloadAction<any>) => {
            state.quizzes.push(action.payload);
        },
        updateQuiz: (state, action: PayloadAction<any>) => {
            const index = state.quizzes.findIndex(quiz => quiz._id === action.payload._id);
            if (index !== -1) {
                state.quizzes[index] = action.payload;
            }
        },
        deleteQuiz: (state, action: PayloadAction<string>) => {
            state.quizzes = state.quizzes.filter(quiz => quiz._id !== action.payload);
        },
        publishQuiz: (state, action: PayloadAction<{ quizId: string; isPublished: boolean }>) => {
            const quiz = state.quizzes.find(quiz => quiz._id === action.payload.quizId);
            if (quiz) {
                quiz.isPublished = action.payload.isPublished;
            }
        },
        copyQuiz: (state, action: PayloadAction<any>) => {
            state.quizzes.push(action.payload);
        },
    },
});

export const { setQuizzes, addQuiz, updateQuiz, deleteQuiz, publishQuiz, copyQuiz } = quizSlice.actions;

export default quizSlice.reducer;
