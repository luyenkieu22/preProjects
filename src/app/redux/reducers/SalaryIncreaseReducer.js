import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    salaryIncrease: [],
    isLoading: false,
    totalElements: 0
};

export const salaryIncreaseSlice = createSlice({
    name: "salaryIncrease",
    initialState,
    reducers: {
        getSalaryIncreaseByIdReducer: (state, action) => {
            state.salaryIncrease = action.payload;
        },

        getSalaryIncreaseByEmployeeReducer: (state, action) => {
            return {
                ...state,
                salaryIncrease: [...action.payload],
                totalElements: action.payload.length,
                isLoading: false
            }
        },

        getSalaryIncreaseByLeaderReducer: (state, action) => {
            return {
                ...state,
                salaryIncrease: [...action.payload],
                totalElements: action.payload.length,
                isLoading: false
            }
        },

        addSalaryIncreaseReducer: (state, action) => {
            return {
                ...state,
                isLoading: true
            }
        },

        editSalaryIncreaseReducer: (state, action) => {
            return {
                ...state,
                isLoading: true
            }
        },

        deleteSalaryIncreaseReducer: (state, action) => {
            return {
                ...state,
                isLoading: true
            }
        },
    },
});

// Action creators are generated for each case reducer function
export const {
    getSalaryIncreaseByIdReducer,
    getSalaryIncreaseByEmployeeReducer,
    getSalaryIncreaseByLeaderReducer,
    addSalaryIncreaseReducer,
    editSalaryIncreaseReducer,
    deleteSalaryIncreaseReducer,
} = salaryIncreaseSlice.actions;

export default salaryIncreaseSlice.reducer;
