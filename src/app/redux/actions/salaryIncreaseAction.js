import { TypeSalaryIncrease } from "../sagas/types";

const createAction = (type, payload = null) => ({
    type,
    ...(payload && { payload }),
});

export const getSalaryIncreaseByIdAction = () =>
    createAction(TypeSalaryIncrease.GET_SALARY_INCREASE_BY_ID);
export const getSalaryIncreaseByEmployeeAction = (data) =>
    createAction(TypeSalaryIncrease.GET_SALARY_INCREASE_BY_EMPLOYEE_ID, data);
export const getSalaryIncreaseByLeaderAction = (data) =>
    createAction(TypeSalaryIncrease.GET_SALARY_INCREASE_BY_LEADER, data);
export const addSalaryIncreaseAction = (data, employeeId) =>
    createAction(TypeSalaryIncrease.ADD_SALARY_INCREASE, { employeeId: employeeId, data: [{ ...data }] });
export const editSalaryIncreaseAction = (data) =>
    createAction(TypeSalaryIncrease.EDIT_SALARY_INCREASE, data);
export const deleteSalaryIncreaseAction = (data) =>
    createAction(TypeSalaryIncrease.DELETE_SALARY_INCREASE, data);
