import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    experiences: [],
    isLoading: false,
};

export const experienceSlice = createSlice({
    name: "experiences",
    initialState,
    reducers: {
        getExperienceByIdReducer: (state, action) => {
            state.experiences = action.payload;
        },

        getExperienceByEmployeeReducer: (state, action) => {
            return {
                ...state,
                experiences: [...action.payload],
                isLoading: false
            }
        },

        addExperienceReducer: (state, action) => {
            return {
                ...state,
                isLoading: true
            }
        },

        editExperienceReducer: (state, action) => {
            return {
                ...state,
                isLoading: true
            }
        },

        deleteExperienceReducer: (state, action) => {
            return {
                ...state,
                isLoading: true
            }
        },
    },
});

// Action creators are generated for each case reducer function
export const {
    getExperienceByIdReducer,
    getExperienceByEmployeeReducer,
    addExperienceReducer,
    editExperienceReducer,
    deleteExperienceReducer,
} = experienceSlice.actions;

export default experienceSlice.reducer;
