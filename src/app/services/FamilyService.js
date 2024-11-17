import axios from "axios";
import ConstantList from "../appConfig";
const API_PATH_FAMILY = ConstantList.API_ENPOINT + "/employee-family";

export const getFamilyById = async id => {
    try {
        const url = `${API_PATH_FAMILY}/${id}`;
        const response = await axios.get(url);
        return response?.data;
    } catch (error) {
        console.log(error);
    }
};

export const getFamilyByEmployeeId = async (id) => {
    try {
        const url = API_PATH_FAMILY;
        const response = await axios.get(url, { params: { employeeId: id } });
        return response?.data;
    } catch (error) {
        console.log(error);
    }
};

export const addFamily = async (data, employeeId) => {
    try {
        const url = API_PATH_FAMILY
        const response = await axios.post(url, data, { params: { employeeId: employeeId } })
        return response?.data
    } catch (error) {
        console.log(error);
    }
};

export const deleteFamily = async id => {
    try {
        const url = `${API_PATH_FAMILY}/${id}`
        const response = await axios.delete(url)
        return response?.data
    } catch (error) {
        console.log(error);
    }
};

export const editFamily = async (data) => {
    try {
        const url = `${API_PATH_FAMILY}/${data.id}`;
        const response = await axios.put(url, data);
        return response?.data
    } catch (error) {
        console.log(error);
    }
};