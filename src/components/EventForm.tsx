import { useState } from "react";
import { Check, ArrowLeft, ArrowRight, Sparkles } from "lucide-react";

type Step1 = "Wedding" | "Birthday Party" | "Anniversary Celebration" | "Corporate Event" | "Baby Shower" | "Engagement Ceremony" | "Other";
type Step2 = "Small (20 Guests)" | "Medium (120 Guests)" | "Large (350 Guests)" | "Grand (800+ Guests)";
type VenueType = "Banquet Hall" | "Luxury Hotel" | "Resort" | "Outdoor Lawn" | "Farmhouse" | "Destination Venue";
type VenuePref = "Indoor AC Hall" | "Outdoor Garden" | "Rooftop Venue" | "Poolside Venue";
type Service = "Decoration" | "Catering" | "Photography" | "Videography" | "Entertainment" | "DJ & Music" | "Event Management";
type Theme = "Luxury Gold & White" | "Minimalist Chic" | "Traditional Royal" | "Modern Contemporary" | "Bohemian Garden" | "Custom Theme";
type Budget = "Under ₹50,000" | "₹50,000 – ₹1 Lakh" | "₹1 – ₹5 Lakhs" | "₹5 – ₹10 Lakhs" | "₹10 Lakhs+";

interface FormData {
  eventType: Step1 | "";
  eventScale: Step2 | "";
  venueType: VenueType | "";
  state: string;
  city: string;
  venuePref: VenuePref | "";
  services: Service[];
  theme: Theme | "";
  budget: Budget | "";
  name: string;
  email: string;
  mobile: string;
  special: string;
}

const FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSeBG9Z99wvSa2LhCpiv4Jn_JPPZgB4EkHVkX8fFrz9wHWVqhQ/formResponse";
const ENTRY = {
  eventType: "entry.289190960",
  eventScale: "entry.254991014",
  venueType: "entry.1943864552",
  state: "entry.1615219480",
  city: "entry.1075749376",
  venuePref: "entry.302051936",
  services: "entry.2057504061",
  theme: "entry.898077709",
  budget: "entry.988249148",
  name: "entry.1322247403",
  email: "entry.97917512",
  mobile: "entry.553937548",
  special: "entry.256166594",
};

const eventTypes: Step1[] = ["Wedding", "Birthday Party", "Anniversary Celebration", "Corporate Event", "Baby Shower", "Engagement Ceremony", "Other"];
const scales: Step2[] = ["Small (20 Guests)", "Medium (120 Guests)", "Large (350 Guests)", "Grand (800+ Guests)"];
const venueTypes: VenueType[] = ["Banquet Hall", "Luxury Hotel", "Resort", "Outdoor Lawn", "Farmhouse", "Destination Venue"];
const venuePrefs: VenuePref[] = ["Indoor AC Hall", "Outdoor Garden", "Rooftop Venue", "Poolside Venue"];
const allServices: Service[] = ["Decoration", "Catering", "Photography", "Videography", "Entertainment", "DJ & Music", "Event Management"];
const themes: Theme[] = ["Luxury Gold & White", "Minimalist Chic", "Traditional Royal", "Modern Contemporary", "Bohemian Garden", "Custom Theme"];
const budgets: Budget[] = ["Under ₹50,000", "₹50,000 – ₹1 Lakh", "₹1 – ₹5 Lakhs", "₹5 – ₹10 Lakhs", "₹10 Lakhs+"];

const TOTAL = 7;

export function EventForm() {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [data, setData] = useState<FormData>({
    eventType: "", eventScale: "", venueType: "", state: "", city: "",
    venuePref: "", services: [], theme: "", budget: "",
    name: "", email: "", mobile: "", special: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});

  const update = <K extends keyof FormData>(k: K, v: FormData[K]) => {
    setData((d) => ({ ...d, [k]: v }));
    setErrors((e) => ({ ...e, [k]: undefined }));
  };

  const next = () => setStep((s) => Math.min(TOTAL, s + 1));
  const back = () => setStep((s) => Math.max(1, s - 1));

  const pick = <K extends keyof FormData>(k: K, v: FormData[K]) => {
    update(k, v);
    setTimeout(next, 180);
  };

  const toggleService = (s: Service) => {
    setData((d) => ({
      ...d,
      services: d.services.includes(s) ? d.services.filter((x) => x !== s) : [...d.services, s],
    }));
  };

  const canAdvance = () => {
    if (step === 1) return !!data.eventType;
    if (step === 2) return !!data.eventScale;
    if (step === 3) return !!data.venueType && data.state.trim() && data.city.trim() && !!data.venuePref;
    if (step === 4) return data.services.length > 0;
    if (step === 5) return !!data.theme;
    if (step === 6) return !!data.budget;
    return true;
  };

  const validateFinal = () => {
    const e: Partial<Record<keyof FormData, string>> = {};
    if (data.name.trim().length < 2) e.name = "Please enter your name";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) e.email = "Please enter a valid email address";
    if (!/^[1-9]\d{9}$/.test(data.mobile.trim())) e.mobile = "Please enter a valid 10-digit mobile number";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = () => {
    if (!validateFinal()) return;
    const body = new URLSearchParams();
    body.append(ENTRY.eventType, data.eventType);
    body.append(ENTRY.eventScale, data.eventScale);
    body.append(ENTRY.venueType, data.venueType);
    body.append(ENTRY.state, data.state.trim());
    body.append(ENTRY.city, data.city.trim());
    body.append(ENTRY.venuePref, data.venuePref);
    data.services.forEach((s) => body.append(ENTRY.services, s));
    body.append(ENTRY.theme, data.theme);
    body.append(ENTRY.budget, data.budget);
    body.append(ENTRY.name, data.name.trim());
    body.append(ENTRY.email, data.email.trim());
    body.append(ENTRY.mobile, data.mobile.trim());
    if (data.special.trim()) body.append(ENTRY.special, data.special.trim());

    fetch(FORM_URL, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: body.toString(),
    }).catch(() => {});
    setSubmitted(true);
  };

  if (submitted) {
    const waUrl = "https://wa.me/917007611623?text=Hello%20Confetti%20%26%20Co.%20I%20have%20submitted%20my%20event%20requirements%20and%20would%20like%20to%20discuss%20my%20event.";
    const handleWaClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      window.open(waUrl, "_blank", "noopener,noreferrer");
    };
    return (
      <div className="animate-fade-up rounded-3xl bg-card p-8 text-center shadow-[var(--shadow-card)] sm:p-12">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[color-mix(in_oklab,var(--coral)_20%,transparent)] text-3xl">🎉</div>
        <h3 className="font-display mt-6 text-3xl sm:text-4xl">Thank You!</h3>
        <p className="mt-3 text-muted-foreground">Your event details have been received.<br />We'll connect with you shortly.</p>
        <a
          href={waUrl}
          onClick={handleWaClick}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-primary px-8 py-4 font-medium text-primary-foreground shadow-[var(--shadow-soft)] transition hover:-translate-y-0.5 hover:shadow-[var(--shadow-lift)]"
        >
          Continue to WhatsApp
        </a>
      </div>
    );
  }

  return (
    <div className="rounded-3xl bg-card p-5 shadow-[var(--shadow-card)] sm:p-8">
      {/* Progress */}
      <div className="mb-6 sm:mb-8">
        <div className="flex items-center justify-between text-xs font-medium uppercase tracking-wider text-muted-foreground">
          <span>Step {step} of {TOTAL}</span>
          <span className="text-primary">{Math.round((step / TOTAL) * 100)}%</span>
        </div>
        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-secondary">
          <div className="h-full rounded-full bg-primary transition-all duration-500 ease-out" style={{ width: `${(step / TOTAL) * 100}%` }} />
        </div>
      </div>

      <div key={step} className="animate-step-in">
        {step === 1 && (
          <>
            <StepTitle title="What are you celebrating?" subtitle="Choose the occasion closest to your event." />
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {eventTypes.map((t) => (
                <SelectCard key={t} active={data.eventType === t} onClick={() => pick("eventType", t)}>
                  {t}
                </SelectCard>
              ))}
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <StepTitle title="How grand is the celebration?" subtitle="Approximate guest count helps us scope it perfectly." />
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {scales.map((t) => (
                <SelectCard key={t} active={data.eventScale === t} onClick={() => pick("eventScale", t)}>
                  {t}
                </SelectCard>
              ))}
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <StepTitle title="Where will it happen?" subtitle="Tell us about the venue you have in mind." />
            <div className="mt-6 space-y-5">
              <Field label="Venue Type">
                <div className="grid gap-2 sm:grid-cols-2">
                  {venueTypes.map((t) => (
                    <SelectCard key={t} compact active={data.venueType === t} onClick={() => update("venueType", t)}>{t}</SelectCard>
                  ))}
                </div>
              </Field>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="State">
                  <TextInput value={data.state} onChange={(v) => update("state", v)} placeholder="e.g. Maharashtra" />
                </Field>
                <Field label="City">
                  <TextInput value={data.city} onChange={(v) => update("city", v)} placeholder="e.g. Mumbai" />
                </Field>
              </div>
              <Field label="Venue Preference">
                <div className="grid gap-2 sm:grid-cols-2">
                  {venuePrefs.map((t) => (
                    <SelectCard key={t} compact active={data.venuePref === t} onClick={() => update("venuePref", t)}>{t}</SelectCard>
                  ))}
                </div>
              </Field>
            </div>
          </>
        )}

        {step === 4 && (
          <>
            <StepTitle title="Which services do you need?" subtitle="Select everything we should handle for you." />
            <div className="mt-6 flex flex-wrap gap-2.5">
              {allServices.map((s) => {
                const active = data.services.includes(s);
                return (
                  <button
                    key={s}
                    type="button"
                    onClick={() => toggleService(s)}
                    className={`group inline-flex items-center gap-2 rounded-full border px-5 py-3 text-sm font-medium transition-all duration-200 ${
                      active
                        ? "border-primary bg-[color-mix(in_oklab,var(--coral)_18%,white)] text-foreground shadow-[var(--shadow-soft)]"
                        : "border-border bg-card text-foreground hover:border-primary/50"
                    }`}
                  >
                    <span className={`grid h-4 w-4 place-items-center rounded-full transition ${active ? "bg-primary text-primary-foreground" : "bg-secondary"}`}>
                      {active && <Check className="h-3 w-3" />}
                    </span>
                    {s}
                  </button>
                );
              })}
            </div>
          </>
        )}

        {step === 5 && (
          <>
            <StepTitle title="Pick a theme & style" subtitle="A starting point for the visual direction." />
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {themes.map((t) => (
                <SelectCard key={t} active={data.theme === t} onClick={() => pick("theme", t)} icon={<Sparkles className="h-4 w-4" />}>
                  {t}
                </SelectCard>
              ))}
            </div>
          </>
        )}

        {step === 6 && (
          <>
            <StepTitle title="What's your budget range?" subtitle="An honest range helps us plan beautifully within it." />
            <div className="mt-6 grid gap-3">
              {budgets.map((t) => (
                <SelectCard key={t} active={data.budget === t} onClick={() => pick("budget", t)}>
                  {t}
                </SelectCard>
              ))}
            </div>
          </>
        )}

        {step === 7 && (
          <>
            <StepTitle title="Where can we reach you?" subtitle="Almost done — we'll be in touch within 24 hours." />
            <div className="mt-6 space-y-4">
              <Field label="Full Name" error={errors.name}>
                <TextInput value={data.name} onChange={(v) => update("name", v)} placeholder="Your name" />
              </Field>
              <Field label="Email Address" error={errors.email}>
                <TextInput type="email" value={data.email} onChange={(v) => update("email", v)} placeholder="you@example.com" />
              </Field>
              <Field label="Mobile Number" error={errors.mobile}>
                <div className="flex items-stretch overflow-hidden rounded-2xl border border-input bg-card focus-within:border-primary">
                  <span className="grid place-items-center bg-secondary px-4 text-sm text-muted-foreground">+91</span>
                  <input
                    type="tel"
                    inputMode="numeric"
                    maxLength={10}
                    value={data.mobile}
                    onChange={(e) => update("mobile", e.target.value.replace(/\D/g, ""))}
                    placeholder="10-digit mobile"
                    className="w-full bg-transparent px-4 py-3.5 text-base outline-none"
                  />
                </div>
              </Field>
              <Field label="Special Requests" optional>
                <textarea
                  value={data.special}
                  onChange={(e) => update("special", e.target.value)}
                  rows={3}
                  placeholder="Any specific requirements, themes, or preferences..."
                  className="w-full resize-none rounded-2xl border border-input bg-card px-4 py-3.5 text-base outline-none transition focus:border-primary"
                />
              </Field>
            </div>
          </>
        )}
      </div>

      {/* Nav */}
      <div className="mt-8 flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={back}
          disabled={step === 1}
          className="inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-medium text-muted-foreground transition hover:text-foreground disabled:invisible"
        >
          <ArrowLeft className="h-4 w-4" /> Back
        </button>
        {step < TOTAL ? (
          <button
            type="button"
            onClick={next}
            disabled={!canAdvance()}
            className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-soft)] transition hover:-translate-y-0.5 hover:shadow-[var(--shadow-lift)] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0"
          >
            Continue <ArrowRight className="h-4 w-4" />
          </button>
        ) : (
          <button
            type="button"
            onClick={submit}
            className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-soft)] transition hover:-translate-y-0.5 hover:shadow-[var(--shadow-lift)]"
          >
            Plan My Event <Sparkles className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
}

function StepTitle({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div>
      <h3 className="font-display text-2xl leading-tight sm:text-3xl">{title}</h3>
      <p className="mt-2 text-sm text-muted-foreground sm:text-base">{subtitle}</p>
    </div>
  );
}

function SelectCard({
  children, active, onClick, compact, icon,
}: { children: React.ReactNode; active: boolean; onClick: () => void; compact?: boolean; icon?: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group relative flex items-center justify-between gap-3 rounded-2xl border-2 text-left transition-all duration-200 ${
        compact ? "px-4 py-3 text-sm" : "px-5 py-4 text-base"
      } ${
        active
          ? "border-primary bg-[color-mix(in_oklab,var(--coral)_15%,white)] shadow-[var(--shadow-soft)]"
          : "border-border bg-card hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-[var(--shadow-soft)]"
      }`}
    >
      <span className="flex items-center gap-2.5 font-medium">
        {icon && <span className={`${active ? "text-primary" : "text-muted-foreground"}`}>{icon}</span>}
        {children}
      </span>
      <span className={`grid h-5 w-5 shrink-0 place-items-center rounded-full border transition ${active ? "border-primary bg-primary text-primary-foreground" : "border-border bg-secondary"}`}>
        {active && <Check className="h-3 w-3" />}
      </span>
    </button>
  );
}

function Field({ label, children, error, optional }: { label: string; children: React.ReactNode; error?: string; optional?: boolean }) {
  return (
    <div>
      <label className="mb-1.5 flex items-center justify-between text-xs font-medium uppercase tracking-wider text-muted-foreground">
        <span>{label}</span>
        {optional && <span className="text-[10px] normal-case tracking-normal opacity-70">Optional</span>}
      </label>
      {children}
      {error && <p className="mt-1.5 text-xs font-medium text-destructive">{error}</p>}
    </div>
  );
}

function TextInput({ value, onChange, placeholder, type = "text" }: { value: string; onChange: (v: string) => void; placeholder?: string; type?: string }) {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full rounded-2xl border border-input bg-card px-4 py-3.5 text-base outline-none transition focus:border-primary"
    />
  );
}
