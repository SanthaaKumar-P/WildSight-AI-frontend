import { Download, FileText } from "lucide-react";
import { downloadReportExport } from "../../services/reportExportService";

interface Props {
  exportId: number;
  title: string;
  format: string;
  exportedAt: string;
}

export default function ExportCard({
  exportId,
  title,
  format,
  exportedAt,
}: Props) {

  const handleDownload = async () => {

    try {

      const blob = await downloadReportExport(exportId);

      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");

      link.href = url;

      link.download = `${title.replace(
        /[^a-zA-Z0-9]/g,
        "_"
      )}.${format.toLowerCase()}`;

      document.body.appendChild(link);

      link.click();

      link.remove();

      window.URL.revokeObjectURL(url);

    } catch (error) {

      console.error(
        "Failed to download report:",
        error
      );

      alert("Failed to download report");

    }
  };


  return (
    <div className="bg-white rounded-2xl shadow border p-6 flex justify-between items-center">

      <div>

        <div className="flex items-center gap-3">

          <div className="bg-red-100 text-red-600 p-3 rounded-xl">
            <FileText size={22} />
          </div>

          <div>

            <h2 className="font-bold text-lg">
              {title}
            </h2>

            <p className="text-gray-500">
              Format : {format}
            </p>

            <p className="text-gray-400 text-sm">
              {new Date(exportedAt).toLocaleDateString()}
            </p>

          </div>

        </div>

      </div>


      <button
        onClick={handleDownload}
        className="
          bg-green-600
          text-white
          rounded-xl
          p-3
          hover:bg-green-700
          transition
        "
        title="Download report"
      >

        <Download size={22} />

      </button>

    </div>
  );
}