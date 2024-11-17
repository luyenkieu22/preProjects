import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    proposal: [],
    isLoading: false,
    totalElements: 0
};

export const proposalSlice = createSlice({
    name: "proposal",
    initialState,
    reducers: {
        getProposalByIdReducer: (state, action) => {
            state.proposal = action.payload;
        },

        getProposalByEmployeeReducer: (state, action) => {
            return {
                ...state,
                proposal: [...action.payload],
                totalElements: action.payload.length,
                isLoading: false
            }
        },

        getProposalByLeaderReducer: (state, action) => {
            return {
                ...state,
                proposal: [...action.payload],
                totalElements: action.payload.length,
                isLoading: false
            }
        },

        addProposalReducer: (state, action) => {
            return {
                ...state,
                isLoading: true
            }
        },

        editProposalReducer: (state, action) => {
            return {
                ...state,
                isLoading: true
            }
        },

        deleteProposalReducer: (state, action) => {
            return {
                ...state,
                isLoading: true
            }
        },
    },
});

// Action creators are generated for each case reducer function
export const {
    getProposalByIdReducer,
    getProposalByEmployeeReducer,
    getProposalByLeaderReducer,
    addProposalReducer,
    editProposalReducer,
    deleteProposalReducer,
} = proposalSlice.actions;

export default proposalSlice.reducer;
