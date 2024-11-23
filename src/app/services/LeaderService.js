import axios from "axios";
import ConstantList from "../appConfig";
const API_PATH_LEADER = ConstantList.API_ENPOINT + "/leader";

export const getAllLeader = async () => {
    try {
        const response = await axios.get(`${API_PATH_LEADER}`);
        return response?.data;
    } catch (error) {
        console.log(error);
    }
};
