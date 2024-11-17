import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    certificates: [],
    totalElements: 0,
    isLoading: false,
};

export const certificateSlice = createSlice({
    name: "certificates",
    initialState,
    reducers: {
        getCertificateByIdReducer: (state, action) => {
            state.certificates = action.payload;
        },

        getCertificateByEmployeeReducer: (state, action) => {
            return {
                ...state,
                certificates: [...action.payload],
                totalElements: action.payload.length,
                isLoading: false
            }
        },

        addCertificateReducer: (state, action) => {
            return {
                ...state,
                isLoading: true
            }
        },

        editCertificateReducer: (state, action) => {
            return {
                ...state,
                isLoading: true
            }
        },

        deleteCertificateReducer: (state, action) => {
            return {
                ...state,
                isLoading: true
            }
        },
    },
});

// Action creators are generated for each case reducer function
export const {
    getCertificateByIdReducer,
    getCertificateByEmployeeReducer,
    addCertificateReducer,
    editCertificateReducer,
    deleteCertificateReducer,
} = certificateSlice.actions;

export default certificateSlice.reducer;
