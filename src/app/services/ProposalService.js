import axios from "axios";
import ConstantList from "../appConfig";
const API_PATH_PROPOSAL = ConstantList.API_ENPOINT + "/proposal";

export const getProposalById = async id => {
    try {
        const url = `${API_PATH_PROPOSAL}/${id}`;
        const response = await axios.get(url);
        return response?.data;
    } catch (error) {
        console.log(error);
    }
};

export const getProposalByEmployeeId = async (id) => {
    try {
        const url = API_PATH_PROPOSAL;
        const response = await axios.get(url, { params: { employeeId: id } });
        return response?.data;
    } catch (error) {
        console.log(error);
    }
};

export const getProposalByLeader = async () => {
    try {
        const url = `${API_PATH_PROPOSAL}/current-leader`
        const response = await axios.get(url);
        return response?.data;
    } catch (error) {
        console.log(error);
    }
};

export const addProposal = async (data, employeeId) => {
    try {
        const url = API_PATH_PROPOSAL
        const response = await axios.post(url, data, { params: { employeeId: employeeId } })
        return response?.data
    } catch (error) {
        console.log(error);
    }
};

export const deleteProposal = async id => {
    try {
        const url = `${API_PATH_PROPOSAL}/${id}`
        const response = await axios.delete(url)
        return response?.data
    } catch (error) {
        console.log(error);
    }
};

export const editProposal = async (data) => {
    try {
        const url = `${API_PATH_PROPOSAL}/${data.id}`;
        const response = await axios.put(url, data);
        return response?.data
    } catch (error) {
        console.log(error);
    }
};