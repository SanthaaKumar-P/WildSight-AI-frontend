import { Download, FileText } from "lucide-react";

interface Props {
  title: string;
  format: string;
  exportedAt: string;
  path: string;
}

export default function ExportCard({
  title,
  format,
  exportedAt,
  path,
}: Props) {
  return (
    <div className="bg-white rounded-2xl shadow border p-6 flex justify-between items-center">

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

      <a
        href={`http://localhost:8080${path}`}
        target="_blank"
        rel="noreferrer"
        className="bg-green-600 text-white rounded-xl p-3 hover:bg-green-700"
      >
        <Download />
      </a>

    </div>
  );
}