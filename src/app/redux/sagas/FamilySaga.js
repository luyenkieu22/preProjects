import { call, put, takeEvery } from "redux-saga/effects";
import { TypeFamily as types } from "./types";
import { toast } from "react-toastify";
import { addFamily, deleteFamily, editFamily, getFamilyByEmployeeId, getFamilyById } from "app/services/FamilyService";
import { addFamilyReducer, deleteFamilyReducer, editFamilyReducer, getFamilyByEmployeeIdReducer, getFamilyByIdReducer } from "app/redux/reducers/FamilyReducer";

function* getFamilyByIdSaga(action) {
    const response = yield call(getFamilyById, action.payload);
    if (response?.code === 200) {
        yield put(getFamilyByIdReducer(response?.data));
    } else {
        toast.error("Đã có lỗi xảy ra khi thực hiện yêu cầu!");
    }
}

function* getFamilyByEmployeeIdSaga(action) {
    const response = yield call(getFamilyByEmployeeId, action.payload);
    if (response?.code === 200) {
        yield put(getFamilyByEmployeeIdReducer(response?.data));
    } else {
        toast.error("Đã có lỗi xảy ra khi thực hiện yêu cầu!");
    }
}

function* addFamilySaga(action) {
    const { data, employeeId } = action.payload;
    const response = yield call(addFamily, data, employeeId);
    if (response?.code === 200) {
        yield put(addFamilyReducer(response?.data));
        toast.success("Thêm người thân thành công");
    } else {
        toast.error("Đã có lỗi xảy ra khi thực hiện yêu cầu!");
    }
}

function* editFamilySaga(action) {
    const response = yield call(editFamily, action.payload);
    if (response?.code === 200) {
        yield put(editFamilyReducer(response?.data));
        toast.success("Sửa người thân thành công");
    } else {
        toast.error("Đã có lỗi xảy ra khi thực hiện yêu cầu!");
    }
}

function* deleteFamilySaga(action) {
    const response = yield call(deleteFamily, action.payload);
    if (response?.code === 200) {
        yield put(deleteFamilyReducer(action.payload));
        toast.success("Xóa người thân thành công");
    } else {
        toast.error("Đã có lỗi xảy ra khi thực hiện yêu cầu!");
    }
}

function* watchFamilySaga() {
    yield takeEvery(types.GET_FAMILY_BY_ID, getFamilyByIdSaga);
    yield takeEvery(
        types.GET_FAMILY_BY_EMPLOYEE_ID,
        getFamilyByEmployeeIdSaga
    );
    yield takeEvery(types.ADD_FAMILY, addFamilySaga);
    yield takeEvery(types.EDIT_FAMILY, editFamilySaga);
    yield takeEvery(types.DELETE_FAMILY, deleteFamilySaga);
}

export default watchFamilySaga;
