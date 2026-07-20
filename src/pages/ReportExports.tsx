import { useEffect, useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { api } from "@/services/api";
import { EmptyState } from "@/components/EmptyState";
import { TableSkeleton } from "@/components/Skeletons";
import { Download, FileText, Clock, CheckCircle2 } from "lucide-react";

interface Item { id: number; reportId?: number; format?: string; status?: string; createdAt?: string; url?: string; downloadUrl?: string; }

export default function ReportExports() {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    api.get("/api/report-exports").then((r) => {
      setItems(Array.isArray(r.data) ? r.data : r.data?.content || []);
    }).catch(() => setItems([])).finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <PageHeader title="Report Exports" subtitle="Download generated report files (PDF, XLSX, CSV)" />
      {loading ? <TableSkeleton /> : items.length === 0 ? (
        <EmptyState title="No exports yet" description="Trigger a report export to see it listed here." icon={<Download className="h-6 w-6" />} />
      ) : (
        <div className="overflow-hidden rounded-2xl border border-border/60 bg-card shadow-soft">
          <table className="min-w-full text-sm">
            <thead className="bg-muted/60 text-xs uppercase text-muted-foreground">
              <tr>
                <th className="px-4 py-3 text-left">ID</th>
                <th className="px-4 py-3 text-left">Report</th>
                <th className="px-4 py-3 text-left">Format</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-left">Created</th>
                <th className="px-4 py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {items.map((i) => (
                <tr key={i.id} className="border-t border-border/60 hover:bg-muted/40">
                  <td className="px-4 py-3 font-mono text-xs">{i.id}</td>
                  <td className="px-4 py-3">Report #{i.reportId ?? "—"}</td>
                  <td className="px-4 py-3"><span className="rounded bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary">{i.format || "PDF"}</span></td>
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center gap-1 text-xs">
                      {i.status === "COMPLETED" || i.status === "READY"
                        ? <><CheckCircle2 className="h-3.5 w-3.5 text-success" /> Ready</>
                        : <><Clock className="h-3.5 w-3.5 text-warning" /> {i.status || "Processing"}</>}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-xs text-muted-foreground">{i.createdAt ? new Date(i.createdAt).toLocaleString() : "—"}</td>
                  <td className="px-4 py-3 text-right">
                    <a href={i.downloadUrl || i.url || "#"} className="inline-flex items-center gap-1 rounded-lg gradient-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground hover:shadow-glow">
                      <Download className="h-3.5 w-3.5" /> Download
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
