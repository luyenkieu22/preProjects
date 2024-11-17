import { TypeCertificates } from "../sagas/types";

const createAction = (type, payload = null) => ({
    type,
    ...(payload && { payload }),
});

export const getCertificateByIdAction = () =>
    createAction(TypeCertificates.GET_CERTIFICATE_BY_ID);
export const getCertificateByEmployeeAction = (data) =>
    createAction(TypeCertificates.GET_CERTIFICATE_BY_EMPLOYEE, data);
export const addCertificateAction = (data, employeeId) =>
    createAction(TypeCertificates.ADD_CERTIFICATE, { employeeId: employeeId, data: [{ ...data }] });
export const editCertificateAction = (data) =>
    createAction(TypeCertificates.EDIT_CERTIFICATE, data);
export const deleteCertificateAction = (data) =>
    createAction(TypeCertificates.DELETE_CERTIFICATE, data);
