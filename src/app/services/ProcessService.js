import axios from "axios";
import ConstantList from "../appConfig";
const API_PATH_PROCESS = ConstantList.API_ENPOINT + "/process";

export const getProcessById = async id => {
    try {
        const url = `${API_PATH_PROCESS}/${id}`;
        const response = await axios.get(url);
        return response?.data;
    } catch (error) {
        console.log(error);
    }
};

export const getProcessByEmployeeId = async (id) => {
    try {
        const url = API_PATH_PROCESS;
        const response = await axios.get(url, { params: { employeeId: id } });
        return response?.data;
    } catch (error) {
        console.log(error);
    }
};

export const getProcessByLeader = async () => {
    try {
        const url = `${API_PATH_PROCESS}/current-leader`
        const response = await axios.get(url);
        return response?.data;
    } catch (error) {
        console.log(error);
    }
};

export const addProcess = async (data, employeeId) => {
    try {
        const url = API_PATH_PROCESS
        const response = await axios.post(url, data, { params: { employeeId: employeeId } })
        return response?.data
    } catch (error) {
        console.log(error);
    }
};

export const deleteProcess = async id => {
    try {
        const url = `${API_PATH_PROCESS}/${id}`
        const response = await axios.delete(url)
        return response?.data
    } catch (error) {
        console.log(error);
    }
};

export const editProcess = async (data) => {
    try {
        const url = `${API_PATH_PROCESS}/${data.id}`;
        const response = await axios.put(url, data);
        return response?.data
    } catch (error) {
        console.log(error);
    }
};