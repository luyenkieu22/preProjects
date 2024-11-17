import { call, put, takeEvery } from "redux-saga/effects";
import { TypeSalaryIncrease as types } from "./types";
import { toast } from "react-toastify";
import {
    addSalaryIncrease,
    deleteSalaryIncrease,
    editSalaryIncrease,
    getSalaryIncreaseByEmployeeId,
    getSalaryIncreaseById,
    getSalaryIncreaseByLeader,
} from "app/services/SalaryService";
import {
    addSalaryIncreaseReducer,
    deleteSalaryIncreaseReducer,
    editSalaryIncreaseReducer,
    getSalaryIncreaseByEmployeeReducer,
    getSalaryIncreaseByIdReducer,
    getSalaryIncreaseByLeaderReducer,
} from "../reducers/SalaryIncreaseReducer";

function* getSalaryIncreaseByIdSaga(action) {
    const response = yield call(getSalaryIncreaseById, action.payload);
    if (response?.code === 200) {
        yield put(getSalaryIncreaseByIdReducer(response?.data));
    } else {
        toast.error("Đã có lỗi xảy ra khi thực hiện yêu cầu!");
    }
}

function* getSalaryIncreaseByEmployeeSaga(action) {
    const response = yield call(getSalaryIncreaseByEmployeeId, action.payload);
    if (response?.code === 200) {
        yield put(getSalaryIncreaseByEmployeeReducer(response?.data));
    } else {
        toast.error("Đã có lỗi xảy ra khi thực hiện yêu cầu!");
    }
}

function* getSalaryIncreaseByLeaderSaga(action) {
    const response = yield call(getSalaryIncreaseByLeader, action.payload);
    if (response?.code === 200) {
        yield put(getSalaryIncreaseByLeaderReducer(response?.data));
    } else {
        toast.error("Đã có lỗi xảy ra khi thực hiện yêu cầu!");
    }
}

function* addSalaryIncreaseSaga(action) {
    const { data, employeeId } = action.payload;
    const response = yield call(addSalaryIncrease, data, employeeId);
    if (response?.code === 200) {
        yield put(addSalaryIncreaseReducer(response?.data));
        toast.success("Thêm thành công");
    } else {
        toast.error("Thêm thất bại!");
    }
}

function* editSalaryIncreaseSaga(action) {
    const response = yield call(editSalaryIncrease, action.payload);
    if (response?.code === 200) {
        yield put(editSalaryIncreaseReducer(response?.data));
        toast.success("Cập nhật thành công");
    } else {
        toast.error("Cập nhật thất bại!");
    }
}

function* deleteSalaryIncreaseSaga(action) {
    const response = yield call(deleteSalaryIncrease, action.payload);
    if (response?.code === 200) {
        yield put(deleteSalaryIncreaseReducer(action.payload));
        toast.success("Xóa thành công");
    } else {
        toast.error("Xóa thất bại!");
    }
}

function* watchSalaryIncreaseSaga() {
    yield takeEvery(types.GET_SALARY_INCREASE_BY_ID, getSalaryIncreaseByIdSaga);
    yield takeEvery(
        types.GET_SALARY_INCREASE_BY_EMPLOYEE_ID,
        getSalaryIncreaseByEmployeeSaga
    );
    yield takeEvery(
        types.GET_SALARY_INCREASE_BY_LEADER,
        getSalaryIncreaseByLeaderSaga
    );
    yield takeEvery(types.ADD_SALARY_INCREASE, addSalaryIncreaseSaga);
    yield takeEvery(types.EDIT_SALARY_INCREASE, editSalaryIncreaseSaga);
    yield takeEvery(types.DELETE_SALARY_INCREASE, deleteSalaryIncreaseSaga);
}

export default watchSalaryIncreaseSaga;
