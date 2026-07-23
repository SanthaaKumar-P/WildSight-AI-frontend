import { api } from "./api";
import { ReportExport } from "../types/reportExport";

export const getAllReportExports = async () => {
  const { data } = await api.get<ReportExport[]>("/api/report-exports");
  return data;
};

export const getReportExport = async (id: number) => {
  const { data } = await api.get<ReportExport>(`/api/report-exports/${id}`);
  return data;
};

export const createReportExport = async (payload: any) => {
  const { data } = await api.post("/api/report-exports", payload);
  return data;
};

export const updateReportExport = async (
  id: number,
  payload: any
) => {
  const { data } = await api.put(
    `/api/report-exports/${id}`,
    payload
  );

  return data;
};

export const deleteReportExport = async (id: number) => {
  const { data } = await api.delete(
    `/api/report-exports/${id}`
  );

  return data;
};