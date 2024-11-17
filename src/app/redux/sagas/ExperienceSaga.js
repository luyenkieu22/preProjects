import { call, put, takeEvery } from "redux-saga/effects";
import { TypeExperience as types } from "./types";
import { toast } from "react-toastify";
import {
    addExperience,
    deleteExperience,
    editExperience,
    getExperienceByEmployee,
    getExperienceById,
} from "app/services/ExperienceService";
import {
    addExperienceReducer,
    deleteExperienceReducer,
    editExperienceReducer,
    getExperienceByEmployeeReducer,
    getExperienceByIdReducer,
} from "../reducers/ExperienceReducer";

function* getExperienceByIdSaga(action) {
    const response = yield call(getExperienceById, action.payload);
    if (response?.code === 200) {
        yield put(getExperienceByIdReducer(response?.data));
    } else {
        toast.error("Đã có lỗi xảy ra khi thực hiện yêu cầu!");
    }
}

function* getExperienceByEmployeeSaga(action) {
    const response = yield call(getExperienceByEmployee, action.payload);
    if (response?.code === 200) {
        yield put(getExperienceByEmployeeReducer(response?.data));
    } else {
        console.log("Đã có lỗi xảy ra khi thực hiện yêu cầu!");
    }
}

function* addExperienceSaga(action) {
    const { data, employeeId } = action.payload;
    const response = yield call(addExperience, data, employeeId);
    if (response?.code === 200) {
        yield put(addExperienceReducer(response?.data));
        toast.success("Thêm kinh nghiệm thành công");
    } else {
        toast.error("Thêm kinh nghiệm thất bại!");
    }
}

function* editExperienceSaga(action) {
    const response = yield call(editExperience, action.payload);
    if (response?.code === 200) {
        yield put(editExperienceReducer(response?.data));
        toast.success("Sửa kinh nghiệm thành công");
    } else {
        toast.error("Sửa kinh nghiệm thất bại!");
    }
}

function* deleteExperienceSaga(action) {
    const response = yield call(deleteExperience, action.payload);
    if (response?.code === 200) {
        yield put(deleteExperienceReducer(action.payload));
        toast.success("Xóa kinh nghiệm thành công");
    } else {
        toast.error("Xóa kinh nghiệm thất bại!");
    }
}

function* watchExperienceSaga() {
    yield takeEvery(types.GET_EXPERIENCE_BY_ID, getExperienceByIdSaga);
    yield takeEvery(
        types.GET_EXPERIENCE_BY_EMPLOYEE_ID,
        getExperienceByEmployeeSaga
    );
    yield takeEvery(types.ADD_EXPERIENCE, addExperienceSaga);
    yield takeEvery(types.EDIT_EXPERIENCE, editExperienceSaga);
    yield takeEvery(types.DELETE_EXPERIENCE, deleteExperienceSaga);
}

export default watchExperienceSaga;
