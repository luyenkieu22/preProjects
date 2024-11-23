import { call, put, takeEvery } from "redux-saga/effects";
import { TypeLeader as types } from "./types";
import { toast } from "react-toastify";
import { getAllLeader } from "app/services/LeaderService";
import { getLeaderReducer } from "../reducers/LeaderReducer";

function* getLeaderSaga(action) {
    const response = yield call(getAllLeader, action.payload);
    if (response?.code === 200) {
        yield put(getLeaderReducer(response?.data));
    } else {
        toast.error("Đã có lỗi xảy ra khi thực hiện yêu cầu!");
    }
}

function* watchLeaderSaga() {
    yield takeEvery(types.GET_LEADER_ALL, getLeaderSaga);
}

export default watchLeaderSaga;