import { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { Loader2, RefreshCw, Trash2, ArrowLeft, Eye } from "lucide-react";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription,
} from "@/components/ui/dialog";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { listEstimates, updateEstimateStatus, deleteEstimate, estimatesSummary } from "@/lib/api";
import { ADMIN } from "@/constants/testIds";

const STATUSES = ["new", "reviewed", "contacted", "closed"];

const statusStyle = (s) => {
  switch (s) {
    case "new": return "bg-[#1C1C1C] text-[#FAF9F6]";
    case "reviewed": return "bg-[#9E907F] text-[#FAF9F6]";
    case "contacted": return "bg-[#E8E4DB] text-[#1C1C1C] border border-[#1C1C1C]";
    case "closed": return "bg-[#F2EFE9] text-[#595959] border border-[#DCD7CE]";
    default: return "bg-[#F2EFE9] text-[#1C1C1C]";
  }
};

const fmt = (iso) => {
  try {
    const d = new Date(iso);
    return d.toLocaleString(undefined, {
      year: "numeric", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit",
    });
  } catch { return iso; }
};

export default function AdminPage() {
  const [rows, setRows] = useState([]);
  const [summary, setSummary] = useState({ total: 0, new: 0, reviewed: 0, contacted: 0, closed: 0 });
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const [items, s] = await Promise.all([listEstimates(), estimatesSummary()]);
      setRows(items);
      setSummary(s);
    } catch {
      toast.error("Could not load estimates.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  const onStatusChange = async (id, status) => {
    try {
      const updated = await updateEstimateStatus(id, status);
      setRows((prev) => prev.map((r) => (r.id === id ? updated : r)));
      const s = await estimatesSummary();
      setSummary(s);
      toast.success(`Marked as ${status}.`);
    } catch {
      toast.error("Failed to update status.");
    }
  };

  const onDelete = async (id) => {
    try {
      await deleteEstimate(id);
      setRows((prev) => prev.filter((r) => r.id !== id));
      const s = await estimatesSummary();
      setSummary(s);
      toast.success("Estimate deleted.");
    } catch {
      toast.error("Delete failed.");
    }
  };

  return (
    <div data-testid={ADMIN.page} className="min-h-screen bg-[#FAF9F6] text-[#1C1C1C]">
      <header className="border-b border-[#DCD7CE] bg-[#FAF9F6]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-6 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link to="/" className="flex items-center gap-2 text-sm text-[#595959] hover:text-[#1C1C1C]">
              <ArrowLeft strokeWidth={1.5} className="w-4 h-4" /> Back to site
            </Link>
            <div className="hidden sm:block w-px h-6 bg-[#DCD7CE]" />
            <div className="flex items-baseline gap-2">
              <span className="font-serif-r2 text-2xl">R<sup className="text-xs">2</sup></span>
              <span className="uppercase tracking-[0.28em] text-[10px] text-[#595959]">
                Estimate Admin
              </span>
            </div>
          </div>
          <button
            data-testid={ADMIN.refresh}
            onClick={load}
            className="inline-flex items-center gap-2 border border-[#DCD7CE] hover:bg-[#F2EFE9] px-4 py-2 uppercase tracking-[0.2em] text-[10px]"
          >
            <RefreshCw strokeWidth={1.5} className="w-3.5 h-3.5" /> Refresh
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 md:px-12 py-12">
        <div className="mb-10 grid grid-cols-2 md:grid-cols-5 gap-4">
          <SummaryCard label="Total" value={summary.total} testid={ADMIN.summaryTotal} highlight />
          <SummaryCard label="New" value={summary.new} testid={ADMIN.summaryNew} />
          <SummaryCard label="Reviewed" value={summary.reviewed} />
          <SummaryCard label="Contacted" value={summary.contacted} />
          <SummaryCard label="Closed" value={summary.closed} />
        </div>

        <div className="border border-[#DCD7CE] bg-[#FAF9F6]">
          <div className="px-6 py-4 border-b border-[#DCD7CE] flex items-center justify-between">
            <h2 className="font-serif-r2 text-2xl">Estimate Requests</h2>
            {loading && <Loader2 className="w-4 h-4 animate-spin text-[#595959]" />}
          </div>
          <div className="overflow-x-auto">
            <Table data-testid={ADMIN.table}>
              <TableHeader>
                <TableRow className="bg-[#F2EFE9] hover:bg-[#F2EFE9]">
                  <TableHead className="uppercase tracking-[0.2em] text-[10px] text-[#595959]">Date</TableHead>
                  <TableHead className="uppercase tracking-[0.2em] text-[10px] text-[#595959]">Name</TableHead>
                  <TableHead className="uppercase tracking-[0.2em] text-[10px] text-[#595959]">Contact</TableHead>
                  <TableHead className="uppercase tracking-[0.2em] text-[10px] text-[#595959]">Project</TableHead>
                  <TableHead className="uppercase tracking-[0.2em] text-[10px] text-[#595959]">Budget</TableHead>
                  <TableHead className="uppercase tracking-[0.2em] text-[10px] text-[#595959]">Status</TableHead>
                  <TableHead className="uppercase tracking-[0.2em] text-[10px] text-[#595959] text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rows.length === 0 && !loading ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-12 text-[#595959]">
                      No estimate requests yet.
                    </TableCell>
                  </TableRow>
                ) : (
                  rows.map((r) => (
                    <TableRow key={r.id} data-testid={ADMIN.row(r.id)} className="border-[#DCD7CE]">
                      <TableCell className="text-xs text-[#595959] whitespace-nowrap">{fmt(r.created_at)}</TableCell>
                      <TableCell className="font-medium">{r.name}</TableCell>
                      <TableCell className="text-sm">
                        <div>{r.email}</div>
                        <div className="text-xs text-[#595959]">{r.phone}</div>
                      </TableCell>
                      <TableCell className="text-sm">{r.project_type}</TableCell>
                      <TableCell className="text-sm">{r.budget || "—"}</TableCell>
                      <TableCell>
                        <Select value={r.status} onValueChange={(v) => onStatusChange(r.id, v)}>
                          <SelectTrigger
                            data-testid={ADMIN.statusSelect(r.id)}
                            className={`rounded-none border-0 px-3 py-1.5 h-auto uppercase tracking-[0.2em] text-[10px] ${statusStyle(r.status)}`}
                          >
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="rounded-none">
                            {STATUSES.map((s) => (
                              <SelectItem key={s} value={s} className="rounded-none uppercase tracking-[0.2em] text-[10px]">
                                {s}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="inline-flex items-center gap-2">
                          <button
                            data-testid={ADMIN.viewRow(r.id)}
                            onClick={() => setSelected(r)}
                            className="p-2 border border-[#DCD7CE] hover:bg-[#F2EFE9]"
                            aria-label="View"
                          >
                            <Eye strokeWidth={1.5} className="w-4 h-4" />
                          </button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <button
                                data-testid={ADMIN.delete(r.id)}
                                className="p-2 border border-[#DCD7CE] hover:bg-[#F2EFE9]"
                                aria-label="Delete"
                              >
                                <Trash2 strokeWidth={1.5} className="w-4 h-4" />
                              </button>
                            </AlertDialogTrigger>
                            <AlertDialogContent className="rounded-none">
                              <AlertDialogHeader>
                                <AlertDialogTitle className="font-serif-r2">Delete this estimate?</AlertDialogTitle>
                                <AlertDialogDescription>
                                  This permanently removes the request from {r.name}. This action cannot be undone.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel className="rounded-none">Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => onDelete(r.id)}
                                  className="rounded-none bg-[#1C1C1C] text-[#FAF9F6] hover:bg-[#333]"
                                >
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </main>

      <Dialog open={!!selected} onOpenChange={(o) => !o && setSelected(null)}>
        <DialogContent data-testid={ADMIN.detailDialog} className="rounded-none max-w-2xl">
          <DialogHeader>
            <DialogTitle className="font-serif-r2 text-2xl">{selected?.name}</DialogTitle>
            <DialogDescription>{selected && fmt(selected.created_at)}</DialogDescription>
          </DialogHeader>
          {selected && (
            <div className="grid grid-cols-2 gap-4 text-sm mt-2">
              <Field k="Email" v={selected.email} />
              <Field k="Phone" v={selected.phone} />
              <Field k="Project" v={selected.project_type} />
              <Field k="Budget" v={selected.budget || "—"} />
              <Field k="Timeline" v={selected.timeline || "—"} />
              <Field k="Address" v={selected.address || "—"} />
              <div className="col-span-2">
                <p className="uppercase tracking-[0.24em] text-[10px] text-[#9E907F] mb-2">Message</p>
                <p className="text-[#1C1C1C] whitespace-pre-wrap">{selected.message}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

const SummaryCard = ({ label, value, testid, highlight }) => (
  <div
    data-testid={testid}
    className={`p-5 border ${highlight ? "bg-[#1C1C1C] text-[#FAF9F6] border-[#1C1C1C]" : "bg-[#F2EFE9] border-[#DCD7CE] text-[#1C1C1C]"}`}
  >
    <p className={`uppercase tracking-[0.24em] text-[10px] ${highlight ? "text-[#E8E4DB]/70" : "text-[#9E907F]"}`}>
      {label}
    </p>
    <p className="font-serif-r2 text-4xl mt-2 leading-none">{value}</p>
  </div>
);

const Field = ({ k, v }) => (
  <div>
    <p className="uppercase tracking-[0.24em] text-[10px] text-[#9E907F] mb-1">{k}</p>
    <p className="text-[#1C1C1C] break-words">{v}</p>
  </div>
);
