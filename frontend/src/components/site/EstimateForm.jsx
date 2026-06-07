import { useState } from "react";
import { toast } from "sonner";
import { Loader2, Send } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { createEstimate } from "@/lib/api";
import { PROJECT_TYPES, BUDGETS, TIMELINES, COMPANY } from "@/data/site";
import { ESTIMATE } from "@/constants/testIds";

const initial = {
  name: "",
  email: "",
  phone: "",
  project_type: "",
  budget: "",
  timeline: "",
  address: "",
  message: "",
};

export const EstimateForm = () => {
  const [form, setForm] = useState(initial);
  const [submitting, setSubmitting] = useState(false);

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.phone || !form.project_type || !form.message) {
      toast.error("Please complete the required fields.");
      return;
    }
    setSubmitting(true);
    try {
      await createEstimate({
        ...form,
        budget: form.budget || null,
        timeline: form.timeline || null,
        address: form.address || null,
      });
      toast.success("Estimate request received. We'll be in touch within 1 business day.");
      setForm(initial);
    } catch (err) {
      const msg = err?.response?.data?.detail || "Could not submit your request. Please try again.";
      toast.error(typeof msg === "string" ? msg : "Submission failed.");
    } finally {
      setSubmitting(false);
    }
  };

  const labelCls = "block uppercase tracking-[0.24em] text-[10px] text-[#9E907F] mb-3 font-sans-r2";
  const inputCls =
    "w-full bg-transparent border-0 border-b border-[#DCD7CE] focus:border-[#1C1C1C] focus:outline-none focus:ring-0 px-0 py-3 text-[#1C1C1C] placeholder-[#9E907F] font-sans-r2 text-base";

  return (
    <section
      id="estimate"
      data-testid={ESTIMATE.section}
      className="relative bg-[#FAF9F6] py-24 md:py-32 border-t border-[#DCD7CE]"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16">
        <div className="md:col-span-5">
          <p className="uppercase tracking-[0.3em] text-[11px] text-[#9E907F] mb-6">05 — Begin</p>
          <h2 className="font-serif-r2 text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-[#1C1C1C] leading-[1.05]">
            Request a free
            <span className="italic block">estimate.</span>
          </h2>
          <p className="mt-8 text-[#595959] text-base md:text-lg leading-relaxed max-w-md">
            Share a few details and we'll respond within one business day with next steps,
            a site-visit window, and a clear scope conversation. No obligations.
          </p>

          <div className="mt-12 space-y-4 border-t border-[#DCD7CE] pt-8">
            <a href={COMPANY.phoneHref} className="block group">
              <p className="uppercase tracking-[0.24em] text-[10px] text-[#9E907F]">Direct line</p>
              <p className="font-serif-r2 text-2xl md:text-3xl text-[#1C1C1C] group-hover:underline underline-offset-4">
                {COMPANY.phone}
              </p>
            </a>
            <a href={COMPANY.emailHref} className="block group">
              <p className="uppercase tracking-[0.24em] text-[10px] text-[#9E907F] mt-6">Email</p>
              <p className="font-serif-r2 text-xl md:text-2xl text-[#1C1C1C] group-hover:underline underline-offset-4 break-all">
                {COMPANY.email}
              </p>
            </a>
          </div>
        </div>

        <form
          data-testid={ESTIMATE.form}
          onSubmit={onSubmit}
          className="md:col-span-7 bg-[#F2EFE9] border border-[#DCD7CE] p-8 md:p-12 lg:p-16 space-y-10"
          noValidate
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <label className={labelCls} htmlFor="r2-name">Name *</label>
              <input
                id="r2-name"
                data-testid={ESTIMATE.name}
                required
                value={form.name}
                onChange={(e) => set("name", e.target.value)}
                className={inputCls}
                placeholder="Your full name"
              />
            </div>
            <div>
              <label className={labelCls} htmlFor="r2-email">Email *</label>
              <input
                id="r2-email"
                data-testid={ESTIMATE.email}
                type="email"
                required
                value={form.email}
                onChange={(e) => set("email", e.target.value)}
                className={inputCls}
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label className={labelCls} htmlFor="r2-phone">Phone *</label>
              <input
                id="r2-phone"
                data-testid={ESTIMATE.phone}
                required
                value={form.phone}
                onChange={(e) => set("phone", e.target.value)}
                className={inputCls}
                placeholder="(719) 000-0000"
              />
            </div>
            <div>
              <label className={labelCls}>Project Type *</label>
              <Select value={form.project_type} onValueChange={(v) => set("project_type", v)}>
                <SelectTrigger
                  data-testid={ESTIMATE.projectType}
                  className="w-full rounded-none border-0 border-b border-[#DCD7CE] focus:ring-0 focus:border-[#1C1C1C] bg-transparent px-0 py-3 h-auto text-[#1C1C1C] font-sans-r2 shadow-none"
                >
                  <SelectValue placeholder="Select a service" />
                </SelectTrigger>
                <SelectContent className="rounded-none">
                  {PROJECT_TYPES.map((p) => (
                    <SelectItem key={p} value={p} className="rounded-none">{p}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className={labelCls}>Budget Range</label>
              <Select value={form.budget} onValueChange={(v) => set("budget", v)}>
                <SelectTrigger
                  data-testid={ESTIMATE.budget}
                  className="w-full rounded-none border-0 border-b border-[#DCD7CE] focus:ring-0 focus:border-[#1C1C1C] bg-transparent px-0 py-3 h-auto text-[#1C1C1C] font-sans-r2 shadow-none"
                >
                  <SelectValue placeholder="Optional" />
                </SelectTrigger>
                <SelectContent className="rounded-none">
                  {BUDGETS.map((b) => (
                    <SelectItem key={b} value={b} className="rounded-none">{b}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className={labelCls}>Timeline</label>
              <Select value={form.timeline} onValueChange={(v) => set("timeline", v)}>
                <SelectTrigger
                  data-testid={ESTIMATE.timeline}
                  className="w-full rounded-none border-0 border-b border-[#DCD7CE] focus:ring-0 focus:border-[#1C1C1C] bg-transparent px-0 py-3 h-auto text-[#1C1C1C] font-sans-r2 shadow-none"
                >
                  <SelectValue placeholder="Optional" />
                </SelectTrigger>
                <SelectContent className="rounded-none">
                  {TIMELINES.map((t) => (
                    <SelectItem key={t} value={t} className="rounded-none">{t}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="md:col-span-2">
              <label className={labelCls} htmlFor="r2-address">Property Address</label>
              <input
                id="r2-address"
                data-testid={ESTIMATE.address}
                value={form.address}
                onChange={(e) => set("address", e.target.value)}
                className={inputCls}
                placeholder="Street, City, State"
              />
            </div>
            <div className="md:col-span-2">
              <label className={labelCls} htmlFor="r2-message">Project Details *</label>
              <textarea
                id="r2-message"
                data-testid={ESTIMATE.message}
                required
                rows={5}
                value={form.message}
                onChange={(e) => set("message", e.target.value)}
                className={`${inputCls} resize-none`}
                placeholder="Tell us about the space, your vision, and any constraints."
              />
            </div>
          </div>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 pt-2">
            <p className="text-xs text-[#9E907F] max-w-md">
              By submitting, you agree to be contacted regarding your project. We never share your information.
            </p>
            <button
              data-testid={ESTIMATE.submit}
              type="submit"
              disabled={submitting}
              className="inline-flex items-center justify-center gap-3 bg-[#1C1C1C] text-[#FAF9F6] hover:bg-[#333] disabled:opacity-60 transition-colors px-10 py-4 uppercase tracking-[0.24em] text-[11px] font-sans-r2"
            >
              {submitting ? (
                <Loader2 className="w-4 h-4 animate-spin" strokeWidth={1.5} />
              ) : (
                <Send className="w-4 h-4" strokeWidth={1.5} />
              )}
              {submitting ? "Sending" : "Send Request"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default EstimateForm;
