import { useEffect, useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { api } from "@/services/api";
import { EmptyState } from "@/components/EmptyState";
import { TableSkeleton } from "@/components/Skeletons";
import { Bell, CheckCheck } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";

interface N { id: number; title?: string; message?: string; body?: string; read?: boolean; isRead?: boolean; createdAt?: string; type?: string; }

const tint: Record<string, string> = {
  ALERT: "bg-destructive/10 text-destructive",
  WARNING: "bg-warning/15 text-warning",
  INFO: "bg-primary/10 text-primary",
  SUCCESS: "bg-success/10 text-success",
};

export default function Notifications() {
  const [list, setList] = useState<N[]>([]);
  const [loading, setLoading] = useState(true);
  const load = () => {
    setLoading(true);
    api.get("/api/notifications").then((r) => {
      setList(Array.isArray(r.data) ? r.data : r.data?.content || []);
    }).catch(() => setList([])).finally(() => setLoading(false));
  };
  useEffect(load, []);

  const markAll = async () => {
    try {
      await Promise.all(list.filter((n) => !(n.read || n.isRead)).map((n) => api.put(`/api/notifications/${n.id}`, { ...n, read: true, isRead: true })));
      toast.success("All notifications marked as read");
      load();
    } catch { toast.error("Failed to update"); }
  };

  const unread = list.filter((n) => !(n.read || n.isRead)).length;

  return (
    <div>
      <PageHeader
        title="Notifications"
        subtitle={unread ? `${unread} unread` : "You're all caught up"}
        actions={unread > 0 && (
          <button onClick={markAll} className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-card px-3 py-2 text-sm hover:bg-muted">
            <CheckCheck className="h-4 w-4" /> Mark all as read
          </button>
        )}
      />
      {loading ? <TableSkeleton rows={5} cols={2} /> : list.length === 0 ? (
        <EmptyState title="No notifications" icon={<Bell className="h-6 w-6" />} description="System messages and alerts will show up here." />
      ) : (
        <div className="space-y-3">
          {list.map((n, i) => {
            const isUnread = !(n.read || n.isRead);
            return (
              <motion.div key={n.id} initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.03 }}
                className={`glass flex items-start gap-3 rounded-2xl p-4 shadow-soft transition hover:-translate-y-0.5 ${isUnread ? "border-l-4 border-l-primary" : ""}`}>
                <div className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl ${tint[String(n.type || "INFO").toUpperCase()] || "bg-primary/10 text-primary"}`}>
                  <Bell className="h-5 w-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <h4 className="truncate font-semibold">{n.title || "Notification"}</h4>
                    {isUnread && <span className="rounded-full bg-primary px-1.5 py-0.5 text-[10px] font-bold text-primary-foreground">NEW</span>}
                  </div>
                  <p className="text-sm text-muted-foreground">{n.message || n.body || ""}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{n.createdAt ? new Date(n.createdAt).toLocaleString() : ""}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}
