import axios from "axios";
import ConstantList from "../appConfig";
const API_PATH_SALARY = ConstantList.API_ENPOINT + "/salary-increase";

export const getSalaryIncreaseById = async id => {
    try {
        const url = `${API_PATH_SALARY}/${id}`;
        const response = await axios.get(url);
        return response?.data;
    } catch (error) {
        console.log(error);
    }
};

export const getSalaryIncreaseByEmployeeId = async (id) => {
    try {
        const url = API_PATH_SALARY;
        const response = await axios.get(url, { params: { employeeId: id } });
        return response?.data;
    } catch (error) {
        console.log(error);
    }
};

export const getSalaryIncreaseByLeader = async () => {
    try {
        const url = `${API_PATH_SALARY}/current-leader`
        const response = await axios.get(url);
        return response?.data;
    } catch (error) {
        console.log(error);
    }
};

export const addSalaryIncrease = async (data, employeeId) => {
    try {
        const url = API_PATH_SALARY
        const response = await axios.post(url, data, { params: { employeeId: employeeId } })
        return response?.data
    } catch (error) {
        console.log(error);
    }
};

export const deleteSalaryIncrease = async id => {
    try {
        const url = `${API_PATH_SALARY}/${id}`
        const response = await axios.delete(url)
        return response?.data
    } catch (error) {
        console.log(error);
    }
};

export const editSalaryIncrease = async (data) => {
    try {
        const url = `${API_PATH_SALARY}/${data.id}`;
        const response = await axios.put(url, data);
        return response?.data
    } catch (error) {
        console.log(error);
    }
};