import { setEmployeeReducer, uploadFileRequest } from "../reducers/EmployeesReducer";
import { TypesEmployees } from "../sagas/types";

const createAction = (type, payload = null) => ({
    type,
    ...(payload && { payload }),
});

export const getEmployeesAction = (data) =>
    createAction(TypesEmployees.GET_ALL_EMPLOYEES, data);

export const addEmployeeAction = (data, file) =>
    createAction(TypesEmployees.ADD_EMPLOYEE, { employee: data, file: file });

export const editEmployeeAction = (data, file) =>
    createAction(TypesEmployees.EDIT_EMPLOYEE, { employee: data, file: file });

export const deleteEmployeeAction = (data) =>
    createAction(TypesEmployees.DELETE_EMPLOYEE, data);

export const searchEmployeesAction = (data) =>
    createAction(TypesEmployees.SEARCH_EMPLOYEES, data);

export const uploadFileAction = (data) => {
    const formData = new FormData();
    formData.append('file', data);
    return uploadFileRequest(formData)
}

export const setEmployeeAction = (data) => {
    return setEmployeeReducer(data)
}