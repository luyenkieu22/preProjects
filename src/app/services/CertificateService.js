import axios from "axios";
import ConstantList from "../appConfig";
const API_PATH_CERTIFICATE = ConstantList.API_ENPOINT + "/certificate";

export const getCertificateById = async id => {
    try {
        const url = `${API_PATH_CERTIFICATE}/${id}`;
        const response = await axios.get(url);
        return response?.data;
    } catch (error) {
        console.log(error);
    }
};

export const getCertificateByEmployee = async (employeeId) => {
    try {
        const url = API_PATH_CERTIFICATE;
        const response = await axios.get(url, { params: { employeeId: employeeId } });
        return response?.data;
    } catch (error) {
        console.log(error);
    }
};

export const addCertificate = async (data, employeeId) => {
    try {
        const url = API_PATH_CERTIFICATE
        const response = await axios.post(url, data, { params: { employeeId: employeeId } })
        return response?.data
    } catch (error) {
        console.log(error);
    }
};

export const deleteCertificate = async id => {
    try {
        const url = `${API_PATH_CERTIFICATE}/${id}`
        const response = await axios.delete(url)
        return response?.data
    } catch (error) {
        console.log(error);
    }
};

export const editCertificate = async (data) => {
    try {
        const url = `${API_PATH_CERTIFICATE}/${data.id}`;
        const response = await axios.put(url, data);
        return response?.data
    } catch (error) {
        console.log(error);
    }
};