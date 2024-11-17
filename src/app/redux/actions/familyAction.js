import { TypeFamily } from "../sagas/types";

const createAction = (type, payload = null) => ({
    type,
    ...(payload && { payload }),
});

export const getFamilyByIdAction = (data) =>
    createAction(TypeFamily.GET_FAMILY_BY_ID, data);
export const getFamilyByEmployeeIdAction = (data) =>
    createAction(TypeFamily.GET_FAMILY_BY_EMPLOYEE_ID, data);
export const addFamilyAction = (data, employeeId) =>
    createAction(TypeFamily.ADD_FAMILY, { employeeId: employeeId, data: [{ ...data }] });
export const editFamilyAction = (data) =>
    createAction(TypeFamily.EDIT_FAMILY, data);
export const deleteFamilyAction = (data) =>
    createAction(TypeFamily.DELETE_FAMILY, data);
