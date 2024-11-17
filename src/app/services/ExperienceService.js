import axios from "axios";
import ConstantList from "../appConfig";
const API_PATH_EXPERIENCE = ConstantList.API_ENPOINT + "/experience";

export const getExperienceById = async id => {
    try {
        const url = `${API_PATH_EXPERIENCE}/${id}`;
        const response = await axios.get(url);
        return response?.data;
    } catch (error) {
        console.log(error);
    }
};

export const getExperienceByEmployee = async (employeeId) => {
    try {
        const url = API_PATH_EXPERIENCE;
        const response = await axios.get(url, { params: { employeeId: employeeId } });
        return response?.data;
    } catch (error) {
        console.log(error);
    }
};

export const addExperience = async (data, employeeId) => {
    try {
        const url = API_PATH_EXPERIENCE
        const response = await axios.post(url, data, { params: { employeeId: employeeId } })
        return response?.data
    } catch (error) {
        console.log(error);
    }
};

export const deleteExperience = async id => {
    try {
        const url = `${API_PATH_EXPERIENCE}/${id}`
        const response = await axios.delete(url)
        return response?.data
    } catch (error) {
        console.log(error);
    }
};

export const editExperience = async (data) => {
    try {
        const url = `${API_PATH_EXPERIENCE}/${data.id}`;
        const response = await axios.put(url, data);
        return response?.data
    } catch (error) {
        console.log(error);
    }
};