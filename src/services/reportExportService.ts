import { api } from "./api";
import { ReportExport } from "../types/reportExport";



export const getReportExports = async():Promise<ReportExport[]>=>{


    const response = await api.get(
        "/api/report-exports"
    );


    return response.data;

};




export const createReportExport = async(data:any)=>{


    const response = await api.post(
        "/api/report-exports",
        data
    );


    return response.data;


};




export const deleteReportExport = async(id:number)=>{


    await api.delete(
        `/api/report-exports/${id}`
    );


};