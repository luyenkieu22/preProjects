import axios from "axios";
import ConstantList from "../appConfig";
const API_PATH_EMPLOYEE = ConstantList.API_ENPOINT + "/employee";

export const searchEmployee = async (data) => {
    try {
        const url = API_PATH_EMPLOYEE + "/search";
        const response = await axios.get(url, { params: { ...data } });
        return response?.data;
    } catch (error) {
        console.log(error);
    }
};

export const getEmployeeById = async id => {
    try {
        const url = `${API_PATH_EMPLOYEE}/${id}`;
        const response = await axios.get(url);
        return response?.data;
    } catch (error) {
        console.log(error);
    }
};

export const addEmployee = async (data) => {
    try {
        const url = API_PATH_EMPLOYEE
        const response = await axios.post(url, data)
        return response?.data
    } catch (error) {
        console.log(error);
    }
};

export const deleteEmployee = async id => {
    try {
        const url = `${API_PATH_EMPLOYEE}/${id}`
        const response = await axios.delete(url)
        return response?.data
    } catch (error) {
        console.log(error);
    }
};

export const editEmployee = async (data) => {
    try {
        const url = `${API_PATH_EMPLOYEE}/${data?.id}`;
        const response = await axios.put(url, data);
        return response?.data
    } catch (error) {
        console.log(error);
    }
};

export const uploadImage = async (data) => {
    try {
        const url = `${API_PATH_EMPLOYEE}/upload-image`;
        const response = await axios.post(url, data);
        return response?.data
    } catch (error) {
        console.log(error);
    }
};