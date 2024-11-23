import { TypeLeader } from "../sagas/types";

const createAction = (type, payload = null) => ({
    type,
    ...(payload && { payload }),
});

export const getLeaderAction = () =>
    createAction(TypeLeader.GET_LEADER_ALL);
