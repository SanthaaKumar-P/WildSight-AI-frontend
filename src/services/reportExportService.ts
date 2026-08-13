import { api } from "./api";
import { ReportExport } from "../types/reportExport";


// ============================================================
// GET ALL REPORT EXPORTS
// ============================================================

export const getAllReportExports = async (): Promise<ReportExport[]> => {

  const response = await api.get<ReportExport[]>(
    "/api/report-exports"
  );

  return response.data;
};


// ============================================================
// GET EXPORT BY ID
// ============================================================

export const getReportExport = async (
  id: number
): Promise<ReportExport> => {

  const response = await api.get<ReportExport>(
    `/api/report-exports/${id}`
  );

  return response.data;
};


// ============================================================
// CREATE REPORT EXPORT
// ============================================================

export const createReportExport = async (
  payload: {
    reportId: number;
    exportFormat: string;
    exportPath?: string;
  }
): Promise<ReportExport> => {

  const response = await api.post<ReportExport>(
    "/api/report-exports",
    payload
  );

  return response.data;
};


// ============================================================
// UPDATE EXPORT
// ============================================================

export const updateReportExport = async (
  id: number,
  payload: any
): Promise<ReportExport> => {

  const response = await api.put<ReportExport>(
    `/api/report-exports/${id}`,
    payload
  );

  return response.data;
};


// ============================================================
// DELETE EXPORT
// ============================================================

export const deleteReportExport = async (
  id: number
): Promise<void> => {

  await api.delete(
    `/api/report-exports/${id}`
  );
};


// ============================================================
// DOWNLOAD EXPORT
// ============================================================

export const downloadReportExport = async (
  id: number
): Promise<Blob> => {

  const response = await api.get(
    `/api/report-exports/${id}/download`,
    {
      responseType: "blob",
    }
  );

  return response.data;
};