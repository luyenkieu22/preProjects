import { TypeProposal } from "../sagas/types";

const createAction = (type, payload = null) => ({
    type,
    ...(payload && { payload }),
});

export const getProposalByIdAction = () =>
    createAction(TypeProposal.GET_PROPOSAL_BY_ID);
export const getProposalByEmployeeAction = (data) =>
    createAction(TypeProposal.GET_PROPOSAL_BY_EMPLOYEE_ID, data);
export const getProposalByLeaderAction = (data) =>
    createAction(TypeProposal.GET_PROPOSAL_BY_LEADER, data);
export const addProposalAction = (data, employeeId) =>
    createAction(TypeProposal.ADD_PROPOSAL, { employeeId: employeeId, data: [{ ...data }] });
export const editProposalAction = (data) =>
    createAction(TypeProposal.EDIT_PROPOSAL, data);
export const deleteProposalAction = (data) =>
    createAction(TypeProposal.DELETE_PROPOSAL, data);
