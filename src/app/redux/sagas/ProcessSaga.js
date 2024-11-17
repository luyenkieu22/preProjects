import { call, put, takeEvery } from "redux-saga/effects";
import { TypeProcess as types } from "./types";
import { toast } from "react-toastify";
import { addProcess, deleteProcess, editProcess, getProcessByEmployeeId, getProcessById, getProcessByLeader } from "app/services/ProcessService";
import { addProcessReducer, deleteProcessReducer, editProcessReducer, getProcessByEmployeeReducer, getProcessByIdReducer, getProcessByLeaderReducer } from "../reducers/ProcessReducer";

function* getProcessByIdSaga(action) {
    const response = yield call(getProcessById, action.payload);
    if (response?.code === 200) {
        yield put(getProcessByIdReducer(response?.data));
    } else {
        toast.error("Đã có lỗi xảy ra khi thực hiện yêu cầu!");
    }
}

function* getProcessByEmployeeSaga(action) {
    const response = yield call(getProcessByEmployeeId, action.payload);
    if (response?.code === 200) {
        yield put(getProcessByEmployeeReducer(response?.data));
    } else {
        toast.error("Đã có lỗi xảy ra khi thực hiện yêu cầu!");
    }
}

function* getProcessByLeaderSaga(action) {
    const response = yield call(getProcessByLeader, action.payload);
    if (response?.code === 200) {
        yield put(getProcessByLeaderReducer(response?.data));
    } else {
        toast.error("Đã có lỗi xảy ra khi thực hiện yêu cầu!");
    }
}

function* addProcessSaga(action) {
    const { data, employeeId } = action.payload;
    const response = yield call(addProcess, data, employeeId);
    if (response?.code === 200) {
        yield put(addProcessReducer(response?.data));
        toast.success("Thêm thành công");
    } else {
        toast.error("Thêm thất bại!");
    }
}

function* editProcessSaga(action) {
    const response = yield call(editProcess, action.payload);
    if (response?.code === 200) {
        yield put(editProcessReducer(response?.data));
        toast.success("Cập nhật thành công");
    } else {
        toast.error("Cập nhật thất bại!");
    }
}

function* deleteProcessSaga(action) {
    const response = yield call(deleteProcess, action.payload);
    if (response?.code === 200) {
        yield put(deleteProcessReducer(action.payload));
        toast.success("Xóa thành công");
    } else {
        toast.error("Xóa thất bại!");
    }
}

function* watchProcessSaga() {
    yield takeEvery(types.GET_PROCESS_BY_ID, getProcessByIdSaga);
    yield takeEvery(
        types.GET_PROCESS_BY_EMPLOYEE_ID,
        getProcessByEmployeeSaga
    );
    yield takeEvery(
        types.GET_PROCESS_BY_LEADER,
        getProcessByLeaderSaga
    );
    yield takeEvery(types.ADD_PROCESS, addProcessSaga);
    yield takeEvery(types.EDIT_PROCESS, editProcessSaga);
    yield takeEvery(types.DELETE_PROCESS, deleteProcessSaga);
}

export default watchProcessSaga;
