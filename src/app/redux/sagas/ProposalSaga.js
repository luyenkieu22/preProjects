import { call, put, takeEvery } from "redux-saga/effects";
import { TypeProposal as types } from "./types";
import { toast } from "react-toastify";
import { addProposal, deleteProposal, editProposal, getProposalByEmployeeId, getProposalById, getProposalByLeader } from "app/services/ProposalService";
import { addProposalReducer, deleteProposalReducer, editProposalReducer, getProposalByEmployeeReducer, getProposalByIdReducer, getProposalByLeaderReducer } from "../reducers/ProposalReducer";

function* getProposalByIdSaga(action) {
    const response = yield call(getProposalById, action.payload);
    if (response?.code === 200) {
        yield put(getProposalByIdReducer(response?.data));
    } else {
        toast.error("Đã có lỗi xảy ra khi thực hiện yêu cầu!");
    }
}

function* getProposalByEmployeeSaga(action) {
    const response = yield call(getProposalByEmployeeId, action.payload);
    if (response?.code === 200) {
        yield put(getProposalByEmployeeReducer(response?.data));
    } else {
        toast.error("Đã có lỗi xảy ra khi thực hiện yêu cầu!");
    }
}

function* getProposalByLeaderSaga(action) {
    const response = yield call(getProposalByLeader, action.payload);
    if (response?.code === 200) {
        yield put(getProposalByLeaderReducer(response?.data));
    } else {
        toast.error("Đã có lỗi xảy ra khi thực hiện yêu cầu!");
    }
}

function* addProposalSaga(action) {
    const { data, employeeId } = action.payload;
    const response = yield call(addProposal, data, employeeId);
    if (response?.code === 200) {
        yield put(addProposalReducer(response?.data));
        toast.success("Thêm thành công");
    } else {
        toast.error("Thêm thất bại!");
    }
}

function* editProposalSaga(action) {
    const response = yield call(editProposal, action.payload);
    if (response?.code === 200) {
        yield put(editProposalReducer(response?.data));
        toast.success("Cập nhật thành công");
    } else {
        toast.error("Cập nhật thất bại!");
    }
}

function* deleteProposalSaga(action) {
    const response = yield call(deleteProposal, action.payload);
    if (response?.code === 200) {
        yield put(deleteProposalReducer(action.payload));
        toast.success("Xóa thành công");
    } else {
        toast.error("Xóa thất bại!");
    }
}

function* watchProposalSaga() {
    yield takeEvery(types.GET_PROPOSAL_BY_ID, getProposalByIdSaga);
    yield takeEvery(
        types.GET_PROPOSAL_BY_EMPLOYEE_ID,
        getProposalByEmployeeSaga
    );
    yield takeEvery(
        types.GET_PROPOSAL_BY_LEADER,
        getProposalByLeaderSaga
    );
    yield takeEvery(types.ADD_PROPOSAL, addProposalSaga);
    yield takeEvery(types.EDIT_PROPOSAL, editProposalSaga);
    yield takeEvery(types.DELETE_PROPOSAL, deleteProposalSaga);
}

export default watchProposalSaga;
