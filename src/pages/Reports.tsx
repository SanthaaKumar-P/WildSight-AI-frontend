import { useEffect, useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { api } from "@/services/api";
import { EmptyState } from "@/components/EmptyState";
import { TableSkeleton } from "@/components/Skeletons";
import { FileText, Download, Eye, Calendar, Plus } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";

interface Report { id: number; title?: string; name?: string; type?: string; status?: string; createdAt?: string; }

const badge: Record<string, string> = {
  DRAFT: "bg-muted text-muted-foreground",
  PENDING: "bg-warning/15 text-warning",
  APPROVED: "bg-success/10 text-success",
  PUBLISHED: "bg-primary/10 text-primary",
  ARCHIVED: "bg-muted text-muted-foreground",
};

export default function Reports() {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/api/reports").then((r) => {
      setReports(Array.isArray(r.data) ? r.data : r.data?.content || []);
    }).catch(() => setReports([])).finally(() => setLoading(false));
  }, []);

  const exportReport = async (id: number) => {
    try {
      await api.post(`/api/report-exports`, { reportId: id, format: "PDF" });
      toast.success("Export queued");
    } catch { toast.error("Failed to queue export"); }
  };

  return (
    <div>
      <PageHeader
        title="Reports"
        subtitle="Generated biodiversity and monitoring reports"
        actions={
          <button className="inline-flex items-center gap-2 rounded-xl gradient-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-soft hover:shadow-glow">
            <Plus className="h-4 w-4" /> New report
          </button>
        }
      />

      {loading ? <TableSkeleton rows={4} cols={4} /> : reports.length === 0 ? (
        <EmptyState title="No reports yet" description="Generated reports will appear here." icon={<FileText className="h-6 w-6" />} />
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {reports.map((r, i) => (
            <motion.div key={r.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
              className="glass group rounded-2xl p-5 shadow-soft transition hover:-translate-y-0.5 hover:shadow-elegant">
              <div className="flex items-start justify-between">
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-primary/10 text-primary"><FileText className="h-5 w-5" /></div>
                <span className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${badge[String(r.status || "DRAFT").toUpperCase()] || "bg-muted text-muted-foreground"}`}>
                  {r.status || "Draft"}
                </span>
              </div>
              <h3 className="mt-4 font-display text-lg font-semibold">{r.title || r.name || `Report #${r.id}`}</h3>
              <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">{r.type || "Biodiversity monitoring"}</p>
              <div className="mt-3 flex items-center gap-1 text-xs text-muted-foreground">
                <Calendar className="h-3 w-3" /> {r.createdAt ? new Date(r.createdAt).toLocaleDateString() : "Recent"}
              </div>
              <div className="mt-4 flex gap-2">
                <button className="flex-1 rounded-lg border border-border bg-background px-3 py-1.5 text-xs hover:bg-muted">
                  <Eye className="mr-1 inline h-3.5 w-3.5" /> View
                </button>
                <button onClick={() => exportReport(r.id)} className="flex-1 rounded-lg gradient-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground hover:shadow-glow">
                  <Download className="mr-1 inline h-3.5 w-3.5" /> Export
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
