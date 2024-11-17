import { TypeProcess } from "../sagas/types";

const createAction = (type, payload = null) => ({
    type,
    ...(payload && { payload }),
});

export const getProcessByIdAction = () =>
    createAction(TypeProcess.GET_PROCESS_BY_ID);
export const getProcessByEmployeeIdAction = (data) =>
    createAction(TypeProcess.GET_PROCESS_BY_EMPLOYEE_ID, data);
export const getProcessByLeaderAction = (data) =>
    createAction(TypeProcess.GET_PROCESS_BY_LEADER, data);
export const addProcessAction = (data, employeeId) =>
    createAction(TypeProcess.ADD_PROCESS, { employeeId: employeeId, data: [{ ...data }] });
export const editProcessAction = (data) =>
    createAction(TypeProcess.EDIT_PROCESS, data);
export const deleteProcessAction = (data) =>
    createAction(TypeProcess.DELETE_PROCESS, data);
