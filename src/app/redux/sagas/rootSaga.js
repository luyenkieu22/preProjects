import { all } from "redux-saga/effects";
import watchEmployeeSaga from "./EmployeeSaga";
import watchCertificateSaga from "./CertificateSaga";
import watchFamilySaga from "./FamilySaga";
import watchExperienceSaga from "./ExperienceSaga";
import watchSalaryIncreaseSaga from "./SalaryIncreaseSaga";
import watchProcessSaga from "./ProcessSaga";
import watchProposalSaga from "./ProposalSaga";

export function* rootSaga() {
    yield all([
        watchEmployeeSaga(),
        watchCertificateSaga(),
        watchFamilySaga(),
        watchExperienceSaga(),
        watchSalaryIncreaseSaga(),
        watchProcessSaga(),
        watchProposalSaga(),
    ]);
}
