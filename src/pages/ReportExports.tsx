import { useEffect, useMemo, useState } from "react";

import { getAllReportExports } from "../services/reportExportService";

import ExportCard from "../components/reportExport/ExportCard";
import AnalyticsCard from "../components/analytics/AnalyticsCard";

import {
  Download,
  FileText,
  FileSpreadsheet,
  FileArchive,
  Search,
} from "lucide-react";

export default function ReportExports() {
  const [exports, setExports] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [format, setFormat] = useState("ALL");

  useEffect(() => {
    loadExports();
  }, []);

  const loadExports = () => {
    getAllReportExports()
      .then(setExports)
      .catch((err) => console.error(err));
  };

  const totalExports = exports.length;

  const pdfExports = exports.filter(
    (e) => e.exportFormat === "PDF"
  ).length;

  const excelExports = exports.filter(
    (e) => e.exportFormat === "EXCEL"
  ).length;

  const csvExports = exports.filter(
    (e) => e.exportFormat === "CSV"
  ).length;

  const filteredExports = useMemo(() => {
    return exports.filter((exp) => {
      const searchMatch = exp.reportTitle
        .toLowerCase()
        .includes(search.toLowerCase());

      const formatMatch =
        format === "ALL" || exp.exportFormat === format;

      return searchMatch && formatMatch;
    });
  }, [exports, search, format]);

  return (
    <div className="p-8 space-y-8 bg-[#f7faf7] min-h-screen">

      {/* HEADER */}

      <div className="flex justify-between items-center">

        <div>
          <h1 className="text-4xl font-bold">
            Report Exports 📥
          </h1>

          <p className="text-gray-500 mt-2">
            Export generated wildlife reports
          </p>
        </div>

        <button className="bg-green-600 hover:bg-green-700 text-white rounded-xl px-5 py-3 flex items-center gap-2 shadow">
          <Download size={18} />
          Export Center
        </button>

      </div>

      {/* KPI CARDS */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

        <AnalyticsCard
          title="Total Exports"
          value={totalExports}
          icon={<Download size={24} />}
          color="bg-green-600"
        />

        <AnalyticsCard
          title="PDF Files"
          value={pdfExports}
          icon={<FileText size={24} />}
          color="bg-red-500"
        />

        <AnalyticsCard
          title="Excel Files"
          value={excelExports}
          icon={<FileSpreadsheet size={24} />}
          color="bg-green-500"
        />

        <AnalyticsCard
          title="CSV Files"
          value={csvExports}
          icon={<FileArchive size={24} />}
          color="bg-blue-600"
        />

      </div>

      {/* SEARCH + FILTER */}

      <div className="flex flex-col md:flex-row gap-4 justify-between">

        <div className="relative w-full md:w-96">

          <Search
            size={18}
            className="absolute left-3 top-3 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search report..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border pl-10 pr-4 py-3 shadow-sm"
          />

        </div>

        <select
          value={format}
          onChange={(e) => setFormat(e.target.value)}
          className="rounded-xl border px-4 py-3 shadow-sm"
        >
          <option value="ALL">All Formats</option>
          <option value="PDF">PDF</option>
          <option value="EXCEL">EXCEL</option>
          <option value="CSV">CSV</option>
        </select>

      </div>

      {/* EXPORT LIST */}

      <div className="grid gap-5">

        {filteredExports.length > 0 ? (

          filteredExports.map((exp) => (

            <ExportCard
              key={exp.exportId}
              title={exp.reportTitle}
              format={exp.exportFormat}
              exportedAt={exp.exportedAt}
              path={exp.exportPath}
            />

          ))

        ) : (

          <div className="bg-white rounded-2xl shadow p-12 text-center">

            <Download
              size={50}
              className="mx-auto text-gray-400 mb-4"
            />

            <h2 className="text-2xl font-bold">
              No Report Exports Found
            </h2>

            <p className="text-gray-500 mt-2">
              Try changing your search or export filter.
            </p>

          </div>

        )}

      </div>

    </div>
  );
}