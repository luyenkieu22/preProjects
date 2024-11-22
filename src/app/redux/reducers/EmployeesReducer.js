import { createSlice } from "@reduxjs/toolkit";
import { TypesEmployees } from "../sagas/types";

const initialState = {
    employees: [],
    employee: {},
    totalElements: 0,
    isLoading: false,
    file: null

};

export const employeesSlice = createSlice({
    name: "employees",
    initialState,
    reducers: {
        getAllEmployeesReducer: (state, action) => {
            state.employees = action.payload;
            state.totalElements = action.payload.totalElements
            state.employee = { ...action.payload }
        },

        searchEmployeesReducer: (state, action) => {
            state.employees = action.payload;
            state.totalElements = action.payload.totalElements
            state.isLoading = false;
            state.file = null
        },

        addEmployeeReducer: (state, action) => {
            return {
                ...state,
                employee: { ...action.payload },
                isLoading: true
            }
        },

        editEmployeeReducer: (state, action) => {
            return {
                ...state,
                employee: { ...action.payload },
                isLoading: true
            }
        },

        deleteEmployeeReducer: (state, action) => {
            return {
                ...state,
                isLoading: true
            }
        },

        uploadFileRequest: (state, action) => {
            state.file = action.payload;
        },

        setEmployeeReducer: (state, action) => {
            return {
                ...state,
                employee: { ...action.payload },
            }
        },
    },
});

// Action creators are generated for each case reducer function
export const {
    getAllEmployeesReducer,
    searchEmployeesReducer,
    addEmployeeReducer,
    editEmployeeReducer,
    deleteEmployeeReducer,
    uploadFileRequest,
    setEmployeeReducer
} = employeesSlice.actions;

export default employeesSlice.reducer;
