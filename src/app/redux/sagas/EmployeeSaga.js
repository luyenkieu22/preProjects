import { call, put, takeLatest } from "redux-saga/effects";
import { TypesEmployees as types } from "./types";
import ConstantList from "../../appConfig";
import { toast } from "react-toastify";
import {
    addEmployeeReducer,
    deleteEmployeeReducer,
    editEmployeeReducer,
    getAllEmployeesReducer,
    searchEmployeesReducer,
} from "../reducers/EmployeesReducer";
import {
    addEmployee,
    deleteEmployee,
    editEmployee,
    getEmployeeById,
    searchEmployee,
    uploadImage,
} from "app/services/EmployeeService";

function* getEmployeesSaga(action) {
    const response = yield call(getEmployeeById, action.payload);
    if (response?.code === 200) {
        yield put(getAllEmployeesReducer(response?.data));
    } else {
        toast.error("Đã có lỗi xảy ra khi thực hiện yêu cầu!");
    }
}

function* addEmployeeSaga(action) {
    const { employee, file } = action.payload;
    let image = "";
    try {
        if (file) {
            const response = yield call(uploadImage, file);
            if (response?.id) {
                image = ConstantList.API_ENPOINT + `/public/image/${response?.name}`;
            } else {
                toast.error("Thêm ảnh thất bại");
            }
        }
        const response = yield call(addEmployee, { ...employee, image: image });
        if (response?.code === 200) {
            yield put(addEmployeeReducer(response?.data));
            toast.success("Thêm nhân viên thành công");
        } else {
            toast.error("Thêm nhân viên thất bại!");
        }
    } catch (error) {
        toast.error(error.message);
    }
}

function* editEmployeeSaga(action) {
    const { employee, file } = action.payload;
    let image = employee?.image || "";
    try {
        if (file) {
            const response = yield call(uploadImage, file)
            if (response?.id) {
                image = ConstantList.API_ENPOINT + `/public/image/${response?.name}`;
            } else {
                toast.error("Thêm ảnh thất bại");
            }
        }
        const response = yield call(editEmployee, { ...employee, image: image });
        if (response?.code === 200) {
            yield put(editEmployeeReducer(response?.data));
            toast.success("Sửa nhân viên thành công");
        } else {
            toast.error("Sửa nhân viên thất bại!");
        }
    } catch (error) {
        toast.error(error.message)
    }
}

function* deleteEmployeeSaga(action) {
    const response = yield call(deleteEmployee, action.payload);
    if (response?.code === 200) {
        yield put(deleteEmployeeReducer(action.payload));
        toast.success("Xóa nhân viên thành công");
    } else {
        toast.error("Xóa nhân viên thất bại!");
    }
}

function* searchEmployeesSaga(action) {
    const response = yield call(searchEmployee, action.payload);
    if (response?.code === 200) {
        yield put(searchEmployeesReducer(response));
    } else {
        toast.error("Đã có lỗi xảy ra khi thực hiện yêu cầu!");
    }
}

function* watchEmployeeSaga() {
    yield takeLatest(types.GET_ALL_EMPLOYEES, getEmployeesSaga);
    yield takeLatest(types.ADD_EMPLOYEE, addEmployeeSaga);
    yield takeLatest(types.EDIT_EMPLOYEE, editEmployeeSaga);
    yield takeLatest(types.DELETE_EMPLOYEE, deleteEmployeeSaga);
    yield takeLatest(types.SEARCH_EMPLOYEES, searchEmployeesSaga);
}

export default watchEmployeeSaga;
