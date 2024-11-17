import { TypeExperience } from "../sagas/types";

const createAction = (type, payload = null) => ({
    type,
    ...(payload && { payload }),
});

export const getExperienceByIdAction = () =>
    createAction(TypeExperience.GET_EXPERIENCE_BY_ID);
export const getExperienceByEmployeeAction = (data) =>
    createAction(TypeExperience.GET_EXPERIENCE_BY_EMPLOYEE_ID, data);
export const addExperienceAction = (data, employeeId) =>
    createAction(TypeExperience.ADD_EXPERIENCE, { employeeId: employeeId, data: [{ ...data }] });
export const editExperienceAction = (data) =>
    createAction(TypeExperience.EDIT_EXPERIENCE, data);
export const deleteExperienceAction = (data) =>
    createAction(TypeExperience.DELETE_EXPERIENCE, data);
