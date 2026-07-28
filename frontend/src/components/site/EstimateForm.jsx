import { useState } from "react";
import { toast } from "sonner";
import { Loader2, Send, ArrowLeft, ArrowRight, Check } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { createEstimate } from "@/lib/api";
import {
  PROJECT_TYPES, BUDGETS, TIMELINES, COMPANY,
  CONTACT_METHODS, CONTACT_TIMES, PROPERTY_TYPES,
  STYLE_PREFERENCES, HAS_PLANS_OPTIONS, FINANCING_OPTIONS,
  BUDGET_FLEXIBILITY, HEAR_ABOUT_OPTIONS,
} from "@/data/site";
import { ESTIMATE } from "@/constants/testIds";

const initial = {
  // Basic
  name: "", email: "", phone: "",
  preferred_contact: "", best_time_to_contact: "",
  address: "", property_type: "",
  // Project
  project_type: "", project_types: [],
  scope: "", square_footage: "", style_preference: "", has_plans: "",
  // Timeline
  ideal_start_date: "", timeline: "", hard_deadline: "",
  // Budget & Message
  budget: "", financing: "", budget_flexibility: "",
  message: "", hear_about: "",
};

const STEPS = [
  { key: "basic", label: "Basic Info", overline: "01" },
  { key: "project", label: "Project Details", overline: "02" },
  { key: "timeline", label: "Timeline", overline: "03" },
  { key: "budget", label: "Budget & Message", overline: "04" },
];

const labelCls = "block uppercase tracking-[0.24em] text-[10px] text-[#9E907F] mb-3 font-sans-r2";
const inputCls =
  "w-full bg-transparent border-0 border-b border-[#DCD7CE] focus:border-[#1C1C1C] focus:outline-none focus:ring-0 px-0 py-3 text-[#1C1C1C] placeholder-[#9E907F] font-sans-r2 text-base";
const selectTriggerCls =
  "w-full rounded-none border-0 border-b border-[#DCD7CE] focus:ring-0 focus:border-[#1C1C1C] bg-transparent px-0 py-3 h-auto text-[#1C1C1C] font-sans-r2 shadow-none data-[placeholder]:text-[#9E907F]";

const RSelect = ({ value, onChange, options, placeholder, testid }) => (
  <Select value={value} onValueChange={onChange}>
    <SelectTrigger data-testid={testid} className={selectTriggerCls}>
      <SelectValue placeholder={placeholder} />
    </SelectTrigger>
    <SelectContent className="rounded-none">
      {options.map((o) => (
        <SelectItem key={o} value={o} className="rounded-none">{o}</SelectItem>
      ))}
    </SelectContent>
  </Select>
);

export const EstimateForm = () => {
  const [form, setForm] = useState(initial);
  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));
  const toggleProjectType = (t) =>
    setForm((f) => {
      const cur = new Set(f.project_types);
      cur.has(t) ? cur.delete(t) : cur.add(t);
      const arr = Array.from(cur);
      return {
        ...f,
        project_types: arr,
        // Keep project_type in sync with first selected
        project_type: arr[0] || f.project_type,
      };
    });

  const validateStep = () => {
    if (step === 0) {
      if (!form.name || !form.email || !form.phone) {
        toast.error("Please share your name, email, and phone so we can reach you.");
        return false;
      }
    }
    if (step === 1) {
      if (!form.project_type && form.project_types.length === 0) {
        toast.error("Select at least one project type.");
        return false;
      }
    }
    if (step === 3) {
      if (!form.message || form.message.length < 5) {
        toast.error("Add a short description of your project so we can prepare.");
        return false;
      }
    }
    return true;
  };

  const next = () => {
    if (!validateStep()) return;
    setStep((s) => Math.min(s + 1, STEPS.length - 1));
  };
  const back = () => setStep((s) => Math.max(s - 1, 0));

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep()) return;
    if (!form.name || !form.email || !form.phone || !form.project_type || !form.message) {
      toast.error("Please complete the required fields.");
      return;
    }
    setSubmitting(true);
    try {
      const payload = {
        ...form,
        project_types: form.project_types.length ? form.project_types : null,
        budget: form.budget || null,
        timeline: form.timeline || null,
        address: form.address || null,
        preferred_contact: form.preferred_contact || null,
        best_time_to_contact: form.best_time_to_contact || null,
        property_type: form.property_type || null,
        scope: form.scope || null,
        square_footage: form.square_footage || null,
        style_preference: form.style_preference || null,
        has_plans: form.has_plans || null,
        ideal_start_date: form.ideal_start_date || null,
        hard_deadline: form.hard_deadline || null,
        financing: form.financing || null,
        budget_flexibility: form.budget_flexibility || null,
        hear_about: form.hear_about || null,
      };
      await createEstimate(payload);
      toast.success("Estimate request received. We'll be in touch within 1 business day.");
      setForm(initial);
      setStep(0);
    } catch (err) {
      const msg = err?.response?.data?.detail || "Could not submit your request. Please try again.";
      toast.error(typeof msg === "string" ? msg : "Submission failed.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section
      id="estimate"
      data-testid={ESTIMATE.section}
      className="relative bg-[#FAF9F6] py-24 md:py-32 border-t border-[#DCD7CE]"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16">
        {/* Left column */}
        <div className="md:col-span-5">
          <p className="uppercase tracking-[0.3em] text-[11px] text-[#9E907F] mb-6">05 — Begin</p>
          <h2 className="font-serif-r2 text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-[#1C1C1C] leading-[1.05]">
            Project
            <span className="italic block">questionnaire.</span>
          </h2>
          <p className="mt-8 text-[#595959] text-base md:text-lg leading-relaxed max-w-md">
            Four short sections — basic information, project details, timeline, and budget.
            Takes about three minutes. We reply within one business day with next steps.
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

        {/* Right column — questionnaire */}
        <form
          data-testid={ESTIMATE.form}
          onSubmit={onSubmit}
          className="md:col-span-7 bg-[#F2EFE9] border border-[#DCD7CE] p-8 md:p-12 lg:p-14"
          noValidate
        >
          {/* Progress */}
          <div className="grid grid-cols-4 gap-3 mb-10">
            {STEPS.map((s, i) => {
              const done = i < step;
              const active = i === step;
              return (
                <button
                  key={s.key}
                  type="button"
                  data-testid={`estimate-step-${i}`}
                  onClick={() => (i < step ? setStep(i) : null)}
                  className={`text-left border-t-2 pt-3 transition-colors ${
                    active
                      ? "border-[#1C1C1C]"
                      : done
                      ? "border-[#9E907F] cursor-pointer"
                      : "border-[#DCD7CE] cursor-default"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className={`uppercase tracking-[0.24em] text-[10px] ${active ? "text-[#1C1C1C]" : "text-[#9E907F]"}`}>
                      {s.overline}
                    </span>
                    {done && <Check className="w-3 h-3 text-[#9E907F]" strokeWidth={2} />}
                  </div>
                  <div className={`mt-1 text-sm font-sans-r2 ${active ? "text-[#1C1C1C]" : done ? "text-[#595959]" : "text-[#9E907F]"}`}>
                    {s.label}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Step content */}
          {step === 0 && (
            <div data-testid="estimate-step-content-0" className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label className={labelCls} htmlFor="r2-name">Full Name *</label>
                <input id="r2-name" data-testid={ESTIMATE.name} required value={form.name}
                  onChange={(e) => set("name", e.target.value)} className={inputCls}
                  placeholder="Your full name" />
              </div>
              <div>
                <label className={labelCls} htmlFor="r2-email">Email *</label>
                <input id="r2-email" data-testid={ESTIMATE.email} type="email" required value={form.email}
                  onChange={(e) => set("email", e.target.value)} className={inputCls}
                  placeholder="you@example.com" />
              </div>
              <div>
                <label className={labelCls} htmlFor="r2-phone">Phone *</label>
                <input id="r2-phone" data-testid={ESTIMATE.phone} required value={form.phone}
                  onChange={(e) => set("phone", e.target.value)} className={inputCls}
                  placeholder="(719) 000-0000" />
              </div>
              <div>
                <label className={labelCls}>Preferred Contact Method</label>
                <RSelect value={form.preferred_contact} onChange={(v) => set("preferred_contact", v)}
                  options={CONTACT_METHODS} placeholder="Optional" testid="estimate-preferred-contact" />
              </div>
              <div>
                <label className={labelCls}>Best Time to Reach You</label>
                <RSelect value={form.best_time_to_contact} onChange={(v) => set("best_time_to_contact", v)}
                  options={CONTACT_TIMES} placeholder="Optional" testid="estimate-best-time" />
              </div>
              <div>
                <label className={labelCls}>Property Type</label>
                <RSelect value={form.property_type} onChange={(v) => set("property_type", v)}
                  options={PROPERTY_TYPES} placeholder="Optional" testid="estimate-property-type" />
              </div>
              <div className="md:col-span-2">
                <label className={labelCls} htmlFor="r2-address">Property Address</label>
                <input id="r2-address" data-testid={ESTIMATE.address} value={form.address}
                  onChange={(e) => set("address", e.target.value)} className={inputCls}
                  placeholder="Street, City, State" />
              </div>
            </div>
          )}

          {step === 1 && (
            <div data-testid="estimate-step-content-1" className="grid grid-cols-1 gap-8">
              <div>
                <label className={labelCls}>Project Type(s) *</label>
                <p className="text-xs text-[#595959] mb-4 font-sans-r2">Select all that apply.</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {PROJECT_TYPES.map((t) => {
                    const active = form.project_types.includes(t);
                    return (
                      <label
                        key={t}
                        data-testid={`estimate-pt-${t.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
                        className={`flex items-center gap-3 px-4 py-3 border cursor-pointer transition-colors ${
                          active
                            ? "border-[#1C1C1C] bg-[#FAF9F6]"
                            : "border-[#DCD7CE] bg-transparent hover:bg-[#FAF9F6]"
                        }`}
                      >
                        <Checkbox
                          checked={active}
                          onCheckedChange={() => toggleProjectType(t)}
                          className="rounded-none border-[#9E907F] data-[state=checked]:bg-[#1C1C1C] data-[state=checked]:border-[#1C1C1C]"
                        />
                        <span className="text-sm text-[#1C1C1C] font-sans-r2">{t}</span>
                      </label>
                    );
                  })}
                </div>
                {/* hidden legacy field mirror for testid stability */}
                <input type="hidden" data-testid={ESTIMATE.projectType} value={form.project_type} readOnly />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className={labelCls}>Style Preference</label>
                  <RSelect value={form.style_preference} onChange={(v) => set("style_preference", v)}
                    options={STYLE_PREFERENCES} placeholder="Optional" testid="estimate-style" />
                </div>
                <div>
                  <label className={labelCls}>Do you have plans / drawings?</label>
                  <RSelect value={form.has_plans} onChange={(v) => set("has_plans", v)}
                    options={HAS_PLANS_OPTIONS} placeholder="Optional" testid="estimate-has-plans" />
                </div>
                <div>
                  <label className={labelCls} htmlFor="r2-sqft">Approx. Square Footage</label>
                  <input id="r2-sqft" data-testid="estimate-sqft" value={form.square_footage}
                    onChange={(e) => set("square_footage", e.target.value)} className={inputCls}
                    placeholder="e.g. 240 sq ft" />
                </div>
                <div className="md:col-span-2">
                  <label className={labelCls} htmlFor="r2-scope">Scope of Work</label>
                  <textarea id="r2-scope" data-testid="estimate-scope" rows={3} value={form.scope}
                    onChange={(e) => set("scope", e.target.value)} className={`${inputCls} resize-none`}
                    placeholder="Which rooms? What are we changing? Anything already decided?" />
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div data-testid="estimate-step-content-2" className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label className={labelCls} htmlFor="r2-start">Ideal Start Date</label>
                <input id="r2-start" data-testid="estimate-start-date" type="date"
                  value={form.ideal_start_date}
                  onChange={(e) => set("ideal_start_date", e.target.value)} className={inputCls} />
              </div>
              <div>
                <label className={labelCls}>Timeline Flexibility</label>
                <RSelect value={form.timeline} onChange={(v) => set("timeline", v)}
                  options={TIMELINES} placeholder="Optional" testid={ESTIMATE.timeline} />
              </div>
              <div className="md:col-span-2">
                <label className={labelCls} htmlFor="r2-deadline">Hard Deadlines or Events</label>
                <input id="r2-deadline" data-testid="estimate-hard-deadline" value={form.hard_deadline}
                  onChange={(e) => set("hard_deadline", e.target.value)} className={inputCls}
                  placeholder="e.g. baby due in April, hosting Thanksgiving" />
              </div>
            </div>
          )}

          {step === 3 && (
            <div data-testid="estimate-step-content-3" className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label className={labelCls}>Budget Range</label>
                <RSelect value={form.budget} onChange={(v) => set("budget", v)}
                  options={BUDGETS} placeholder="Optional" testid={ESTIMATE.budget} />
              </div>
              <div>
                <label className={labelCls}>Financing Approach</label>
                <RSelect value={form.financing} onChange={(v) => set("financing", v)}
                  options={FINANCING_OPTIONS} placeholder="Optional" testid="estimate-financing" />
              </div>
              <div>
                <label className={labelCls}>Budget Flexibility</label>
                <RSelect value={form.budget_flexibility} onChange={(v) => set("budget_flexibility", v)}
                  options={BUDGET_FLEXIBILITY} placeholder="Optional" testid="estimate-budget-flex" />
              </div>
              <div>
                <label className={labelCls}>How Did You Hear About Us?</label>
                <RSelect value={form.hear_about} onChange={(v) => set("hear_about", v)}
                  options={HEAR_ABOUT_OPTIONS} placeholder="Optional" testid="estimate-hear-about" />
              </div>
              <div className="md:col-span-2">
                <label className={labelCls} htmlFor="r2-message">Anything else we should know? *</label>
                <textarea id="r2-message" data-testid={ESTIMATE.message} required rows={5} value={form.message}
                  onChange={(e) => set("message", e.target.value)} className={`${inputCls} resize-none`}
                  placeholder="Share your vision, any constraints, must-haves, or inspiration links." />
              </div>
            </div>
          )}

          {/* Nav buttons */}
          <div className="mt-12 pt-8 border-t border-[#DCD7CE] flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <button
              type="button"
              onClick={back}
              disabled={step === 0}
              data-testid="estimate-back"
              className="inline-flex items-center gap-2 text-[#1C1C1C] disabled:opacity-30 uppercase tracking-[0.24em] text-[11px] font-sans-r2"
            >
              <ArrowLeft className="w-4 h-4" strokeWidth={1.5} /> Back
            </button>

            <div className="flex items-center gap-4">
              <span className="text-xs text-[#9E907F] uppercase tracking-[0.2em]">
                Step {step + 1} of {STEPS.length}
              </span>
              {step < STEPS.length - 1 ? (
                <button
                  type="button"
                  onClick={next}
                  data-testid="estimate-next"
                  className="inline-flex items-center gap-3 bg-[#1C1C1C] text-[#FAF9F6] hover:bg-[#333] transition-colors px-8 py-4 uppercase tracking-[0.24em] text-[11px] font-sans-r2"
                >
                  Continue <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
                </button>
              ) : (
                <button
                  data-testid={ESTIMATE.submit}
                  type="submit"
                  disabled={submitting}
                  className="inline-flex items-center gap-3 bg-[#1C1C1C] text-[#FAF9F6] hover:bg-[#333] disabled:opacity-60 transition-colors px-10 py-4 uppercase tracking-[0.24em] text-[11px] font-sans-r2"
                >
                  {submitting ? <Loader2 className="w-4 h-4 animate-spin" strokeWidth={1.5} />
                              : <Send className="w-4 h-4" strokeWidth={1.5} />}
                  {submitting ? "Sending" : "Send Request"}
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default EstimateForm;
