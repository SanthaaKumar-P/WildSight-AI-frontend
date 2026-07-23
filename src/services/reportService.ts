import { api } from "./api";
import { Report } from "../types/report";


export const getReports = async (): Promise<Report[]> => {

    const response = await api.get("/api/reports");

    return response.data;

};



export const createReport = async (data:any) => {

    const response = await api.post(
        "/api/reports",
        data
    );

    return response.data;

};



export const getReportById = async(id:number)=>{

    const response = await api.get(
        `/api/reports/${id}`
    );

    return response.data;

};



export const deleteReport = async(id:number)=>{

    await api.delete(
        `/api/reports/${id}`
    );

};