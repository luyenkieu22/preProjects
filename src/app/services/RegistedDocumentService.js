import axios from "axios";
import ConstantList from "../appConfig";

const API_PATH = ConstantList.API_ENPOINT + "/document-registered";

export const getDocumentByEmployeeId = async (id) => {
    const response = await axios.get(`${API_PATH}`, {params: {employeeId: id}});
    return response?.data;
}

export const createRegistedDocument = async (data, employeeId) => {
    const response = await axios.post(`${API_PATH}`, data, {params: { employeeId: employeeId}});
    return response?.data;
}

export const updateRegistedDocument = async (data) => {
    const response = await axios.put(`${API_PATH}/${data?.id}`, data);
    return response?.data;
}

export const deleteRegistedDocument = async (id) => {
    const response = await axios.delete(`${API_PATH}/${id}`);
    return response?.data;
}
