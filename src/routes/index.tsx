import { createFileRoute } from "@tanstack/react-router";
import { EventForm } from "@/components/EventForm";
import { Calendar, Users, MapPin, Star, Sparkles, HeartHandshake, Palette, ShieldCheck, Instagram, MessageCircle } from "lucide-react";
import p1 from "@/assets/portfolio-1.jpg";
import p2 from "@/assets/portfolio-2.jpg";
import p3 from "@/assets/portfolio-3.jpg";
import p4 from "@/assets/portfolio-4.jpg";
import p5 from "@/assets/portfolio-5.jpg";
import p6 from "@/assets/portfolio-6.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Confetti & Co. — Luxury Event Planning in India" },
      { name: "description", content: "From intimate gatherings to grand celebrations, we plan every detail — weddings, parties and corporate events with editorial elegance." },
      { property: "og:title", content: "Confetti & Co. — Luxury Event Planning" },
      { property: "og:description", content: "Tell us about your celebration and let us plan every detail." },
      { property: "og:image", content: p1 },
      { name: "twitter:image", content: p1 },
    ],
  }),
  component: Home,
});

const stats = [
  { icon: Calendar, value: "500+", label: "Events Planned" },
  { icon: Users, value: "50,000+", label: "Guests Hosted" },
  { icon: MapPin, value: "25+", label: "Cities Served" },
  { icon: Star, value: "4.9", label: "Average Rating" },
];

const portfolio = [
  { img: p1, title: "Royal Wedding", city: "Jaipur", guests: "500 Guests", theme: "Luxury Gold & White", ratio: "aspect-[4/5]" },
  { img: p2, title: "Poolside Engagement", city: "Goa", guests: "200 Guests", theme: "Modern Contemporary", ratio: "aspect-square" },
  { img: p3, title: "Corporate Leadership Summit", city: "Delhi", guests: "350 Guests", theme: "Minimalist Chic", ratio: "aspect-[4/5]" },
  { img: p4, title: "Luxury Birthday Gala", city: "Noida", guests: "150 Guests", theme: "Custom Theme", ratio: "aspect-[3/4]" },
  { img: p5, title: "Bohemian Baby Shower", city: "Lucknow", guests: "75 Guests", theme: "Bohemian Garden", ratio: "aspect-square" },
  { img: p6, title: "Traditional Anniversary", city: "Agra", guests: "120 Guests", theme: "Traditional Royal", ratio: "aspect-[4/5]" },
];

const features = [
  { icon: HeartHandshake, title: "Personalized Planning", desc: "Every celebration is tailored to your requirements, taste and story." },
  { icon: ShieldCheck, title: "Trusted Vendor Network", desc: "Reliable partners and premium services we've worked with for years." },
  { icon: Palette, title: "Creative Event Design", desc: "Beautiful concepts and thoughtful execution from mood board to moment." },
  { icon: Sparkles, title: "Stress-Free Coordination", desc: "We manage every detail so you can simply enjoy the celebration." },
];

const testimonials = [
  { name: "Priya & Karan", quote: "Confetti & Co. transformed our wedding into something truly special. Every detail was beautifully executed." },
  { name: "Rhea Kapoor", quote: "The planning process was seamless and the team was incredibly supportive throughout." },
  { name: "Arjun Mehta", quote: "Excellent organization, beautiful décor, and flawless execution." },
  { name: "Nisha Sharma", quote: "The team exceeded our expectations and created a celebration we'll never forget." },
];

function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <header className="absolute inset-x-0 top-0 z-10">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-8">
          <Logo />
          <a href="#form" className="hidden rounded-full border border-foreground/20 px-5 py-2 text-sm font-medium transition hover:border-primary hover:text-primary sm:inline-flex">
            Plan My Event
          </a>
        </div>
      </header>

      {/* Hero — form first */}
      <section id="form" className="relative overflow-hidden px-5 pb-16 pt-24 sm:px-8 sm:pt-32">
        <Petals />
        <div className="mx-auto max-w-[760px] text-center">
          <div className="animate-fade-up mx-auto inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-xs uppercase tracking-[0.18em] text-muted-foreground">
            <Sparkles className="h-3 w-3 text-primary" /> Bespoke Event Planning
          </div>
          <h1 className="animate-fade-up font-display mt-6 text-[2.5rem] leading-[1.05] tracking-tight sm:text-6xl md:text-7xl" style={{ animationDelay: "60ms" }}>
            Your Celebration<br />
            <span className="italic text-primary">Starts Here.</span>
          </h1>
          <p className="animate-fade-up mx-auto mt-5 max-w-[560px] text-base text-muted-foreground sm:text-lg" style={{ animationDelay: "120ms" }}>
            From small gatherings to grand celebrations, we're here to plan every detail.
          </p>

          <div className="animate-fade-up mt-10 text-left" style={{ animationDelay: "180ms" }}>
            <EventForm />
          </div>

          <p className="mt-6 text-xs text-muted-foreground">⏱ Takes under 90 seconds · We respond within 24 hours</p>
        </div>
      </section>

      {/* Trust */}
      <section className="px-5 py-12 sm:px-8 sm:py-16">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-5">
          {stats.map((s) => (
            <div key={s.label} className="rounded-2xl border border-border bg-card p-5 text-center transition hover:-translate-y-0.5 hover:shadow-[var(--shadow-soft)] sm:p-7">
              <s.icon className="mx-auto h-5 w-5 text-primary" strokeWidth={1.5} />
              <div className="font-display mt-3 text-2xl sm:text-4xl">{s.value}</div>
              <div className="mt-1 text-xs uppercase tracking-wider text-muted-foreground sm:text-sm">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Portfolio */}
      <section className="px-5 py-16 sm:px-8 sm:py-24">
        <div className="mx-auto max-w-6xl">
          <SectionHead overline="Portfolio" title="Moments We've Brought To Life" sub="A glimpse into the celebrations we've had the privilege of planning." />
          <div className="mt-12 columns-1 gap-4 sm:columns-2 sm:gap-5 lg:columns-3">
            {portfolio.map((p) => (
              <figure key={p.title} className="group mb-4 break-inside-avoid overflow-hidden rounded-3xl bg-card shadow-[var(--shadow-card)] sm:mb-5">
                <div className={`overflow-hidden ${p.ratio}`}>
                  <img src={p.img} alt={p.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]" />
                </div>
                <figcaption className="p-5">
                  <h3 className="font-display text-xl">{p.title} in {p.city}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{p.guests} · {p.theme}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Why */}
      <section className="bg-secondary px-5 py-16 sm:px-8 sm:py-24">
        <div className="mx-auto max-w-6xl">
          <SectionHead overline="Why Confetti & Co." title="Designed With Care, Delivered With Calm" sub="A planning experience that feels as elegant as the celebration itself." />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
            {features.map((f) => (
              <div key={f.title} className="rounded-3xl bg-card p-7 transition hover:-translate-y-1 hover:shadow-[var(--shadow-card)]">
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[color-mix(in_oklab,var(--coral)_18%,white)] text-primary">
                  <f.icon className="h-5 w-5" strokeWidth={1.6} />
                </div>
                <h3 className="font-display mt-5 text-xl">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="px-5 py-16 sm:px-8 sm:py-24">
        <div className="mx-auto max-w-6xl">
          <SectionHead overline="Kind Words" title="Loved By Families, Couples & Brands" sub="Stories from celebrations we've had the privilege of planning." />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 sm:gap-5">
            {testimonials.map((t) => (
              <figure key={t.name} className="rounded-3xl border border-border bg-card p-7 transition hover:-translate-y-0.5 hover:shadow-[var(--shadow-soft)]">
                <div className="flex gap-0.5 text-primary">
                  {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}
                </div>
                <blockquote className="font-display mt-4 text-xl leading-snug">"{t.quote}"</blockquote>
                <figcaption className="mt-5 text-sm font-medium uppercase tracking-wider text-muted-foreground">— {t.name}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-5 py-16 sm:px-8 sm:py-24">
        <div className="relative mx-auto max-w-5xl overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-[color-mix(in_oklab,var(--coral)_25%,white)] via-[var(--cream)] to-[color-mix(in_oklab,var(--primary)_10%,white)] p-10 text-center sm:p-20">
          <Sparkles className="mx-auto h-6 w-6 text-primary" strokeWidth={1.5} />
          <h2 className="font-display mt-4 text-4xl leading-tight sm:text-6xl">Ready To Start <span className="italic">Planning?</span></h2>
          <p className="mx-auto mt-5 max-w-xl text-base text-muted-foreground sm:text-lg">
            Share your event details and let us help create a celebration that feels uniquely yours.
          </p>
          <a href="#form" className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-primary px-8 py-4 font-semibold text-primary-foreground shadow-[var(--shadow-soft)] transition hover:-translate-y-0.5 hover:shadow-[var(--shadow-lift)]">
            Plan My Event <Sparkles className="h-4 w-4" />
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card px-5 py-12 sm:px-8">
        <div className="mx-auto grid max-w-6xl gap-10 sm:grid-cols-3">
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              A boutique event studio crafting elegant, intentional celebrations across India.
            </p>
          </div>
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Explore</h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li><a href="#form" className="hover:text-primary">Plan My Event</a></li>
              <li><a href="#" className="hover:text-primary">Portfolio</a></li>
              <li><a href="#" className="hover:text-primary">Testimonials</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Connect</h4>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <a href="https://wa.me/917007611623" className="inline-flex items-center gap-2 hover:text-primary">
                  <MessageCircle className="h-4 w-4" /> WhatsApp · +91 70076 11623
                </a>
              </li>
              <li>
                <a href="https://instagram.com" className="inline-flex items-center gap-2 hover:text-primary">
                  <Instagram className="h-4 w-4" /> @confettiandco
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mx-auto mt-10 max-w-6xl border-t border-border pt-6 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} Confetti & Co. — Crafted with care.
        </div>
      </footer>
    </div>
  );
}

function Logo() {
  return (
    <a href="#" className="inline-flex items-center gap-2">
      <span className="grid h-9 w-9 place-items-center rounded-full bg-primary text-primary-foreground">
        <Sparkles className="h-4 w-4" />
      </span>
      <span className="font-display text-xl tracking-tight">
        Confetti <span className="italic text-primary">&</span> Co.
      </span>
    </a>
  );
}

function SectionHead({ overline, title, sub }: { overline: string; title: string; sub: string }) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <div className="text-xs font-medium uppercase tracking-[0.22em] text-primary">{overline}</div>
      <h2 className="font-display mt-3 text-3xl leading-tight sm:text-5xl">{title}</h2>
      <p className="mx-auto mt-4 max-w-xl text-base text-muted-foreground">{sub}</p>
    </div>
  );
}

function Petals() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute -left-32 -top-24 h-72 w-72 rounded-full bg-[color-mix(in_oklab,var(--coral)_35%,transparent)] blur-3xl" />
      <div className="absolute -right-24 top-40 h-80 w-80 rounded-full bg-[color-mix(in_oklab,var(--primary)_18%,transparent)] blur-3xl" />
    </div>
  );
}
