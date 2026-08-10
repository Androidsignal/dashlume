import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  Smartphone,
  Sparkles,
  Flame,
  Radio,
  Mic,
  Bot,
  ListChecks,
  Network,
  ShieldCheck,
  History,
  AlertTriangle,
  Wrench,
} from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { assetUrl } from "@/lib/asset";
import logo from "@/assets/dashlume-logo.png.asset.json";
import shotSignIn from "@/assets/home.png.asset.json";
import shotHome from "@/assets/home-1.png.asset.json";
import shotLobby from "@/assets/edit_-2.png.asset.json";
import shotCall from "@/assets/edit_-3.png.asset.json";
import shotGrid from "@/assets/edit_-5.png.asset.json";
import shotChat from "@/assets/edit_-4.png.asset.json";
import shotSummary from "@/assets/edit_-1.png.asset.json";
import shotProfile from "@/assets/edit.png.asset.json";

const PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=com.dash.lume&pcampaignid=web_share";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "DashLume — AI Video Meetings" },
      {
        name: "description",
        content:
          "DashLume is a next-generation video calling and meeting assistant powered by real-time AI.",
      },
      { property: "og:title", content: "DashLume — AI Video Meetings" },
      {
        property: "og:description",
        content:
          "DashLume is a next-generation video calling and meeting assistant powered by real-time AI.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const features = [
  {
    icon: Mic,
    title: "Real-time transcription",
    body: "Every voice in the room is streamed to Deepgram and turned into an accurate live transcript within seconds of speech.",
  },
  {
    icon: Bot,
    title: "AI assistant in the call",
    body: "Mention the assistant in chat to ask questions about the conversation, explain concepts, translate, or brainstorm — grounded in what was just said.",
  },
  {
    icon: ListChecks,
    title: "Summaries & action items",
    body: "When the meeting ends, the full transcript becomes a clean summary and an extracted list of who owes what.",
  },
  {
    icon: Network,
    title: "SFU-grade calling",
    body: "A self-hosted mediasoup SFU with STUN/TURN fallback keeps multi-party video stable on real mobile networks.",
  },
  {
    icon: ShieldCheck,
    title: "Resilient by design",
    body: "ICE state monitoring, reconnect feedback and abandoned-room cleanup so dropped calls come back instead of dying.",
  },
  {
    icon: History,
    title: "Meeting history",
    body: "Every hosted meeting is stored with its transcript, summary and action items — searchable long after the call.",
  },
];

const stats = [
  { value: "1.8s", label: "AI response latency" },
  { value: "2.3s", label: "Transcript latency" },
  { value: "6-char", label: "Shareable meeting codes" },
  { value: "24/7", label: "Room health sweeps" },
];

const flow = [
  { step: "01", title: "Start or join", body: "Create a meeting instantly or join with a six-character code." },
  { step: "02", title: "Add the assistant", body: "One tap adds the AI as a participant and starts transcription." },
  { step: "03", title: "Talk normally", body: "Ask it anything mid-call from the chat panel while the call keeps running." },
  { step: "04", title: "Get the recap", body: "Hang up and find the summary and action items in your history." },
];

const stack = [
  { icon: Smartphone, name: "Flutter", body: "One cross-platform codebase for iOS and Android with native-feel UI." },
  { icon: Sparkles, name: "AI", body: "Live transcription, in-call assistant answers, summaries and action items." },
  { icon: Flame, name: "Firebase", body: "Auth, Firestore, storage and push notifications for meeting history." },
  { icon: Radio, name: "WebRTC", body: "Low-latency peer media with an SFU and STUN/TURN fallback." },
];

const fixes = [
  {
    broke: "Second participant joined and saw a black tile.",
    fixed: "Renegotiated the peer connection on every new producer instead of only on the first join.",
  },
  {
    broke: "Calls died silently on mobile data handoff.",
    fixed: "Added ICE connection-state monitoring with automatic restart and a visible reconnecting state.",
  },
  {
    broke: "Transcripts arrived out of order and duplicated lines.",
    fixed: "Keyed each utterance by speaker + start timestamp and merged interim results before commit.",
  },
  {
    broke: "Rooms stayed alive forever after everyone left.",
    fixed: "A periodic sweep closes abandoned rooms and releases SFU transports.",
  },
  {
    broke: "AI replies blocked the chat while generating.",
    fixed: "Streamed the response into a placeholder message so the call and chat stay interactive.",
  },
  {
    broke: "Echo when two phones sat in the same room.",
    fixed: "Enabled acoustic echo cancellation and auto-gain on the native audio track constraints.",
  },
];

const overviewScreens = [
  { src: assetUrl(shotLobby), title: "Lobby", caption: "Check camera and mic before you walk in." },
  { src: assetUrl(shotSignIn), title: "Sign in", caption: "Email or Google, straight into your workspace." },
  { src: assetUrl(shotHome), title: "Home", caption: "Create a meeting or join with a code." },
  { src: assetUrl(shotCall), title: "In call", caption: "Full-bleed video with quick controls." },
  { src: assetUrl(shotGrid), title: "Multi-party", caption: "Stacked participant tiles with host badges." },
  { src: assetUrl(shotChat), title: "AI in chat", caption: "Mention the assistant and get an answer in the thread." },
  { src: assetUrl(shotSummary), title: "Recap", caption: "Summary, action items and full transcript — saved automatically." },
  { src: assetUrl(shotProfile), title: "Profile", caption: "Manage your account details in a tap." },
];

function OverviewSlideshow() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setActive((i) => (i + 1) % overviewScreens.length);
    }, 2600);
    return () => clearInterval(id);
  }, []);

  const current = overviewScreens[active] as (typeof overviewScreens)[number];

  return (
    <figure className="surface-card card-lift overflow-hidden p-8 hover:-translate-y-1">
      <div className="relative mx-auto aspect-[9/19.5] w-full max-w-[240px] overflow-hidden rounded-2xl border border-border">
        {overviewScreens.map((s, i) => (
          <img
            key={s.title}
            src={s.src}
            alt={`DashLume ${s.title} screen`}
            loading={i === 0 ? "eager" : "lazy"}
            className="absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-in-out"
            style={{ opacity: i === active ? 1 : 0 }}
          />
        ))}
        <span className="pointer-events-none absolute left-3 top-3 rounded-full bg-background/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.15em] text-foreground backdrop-blur">
          {current.title}
        </span>
      </div>
      <figcaption className="mt-6 text-sm text-muted-foreground">{current.caption}</figcaption>
      <div className="mt-4 flex justify-center gap-1.5">
        {overviewScreens.map((s, i) => (
          <button
            key={s.title}
            type="button"
            aria-label={`Show ${s.title} screen`}
            onClick={() => setActive(i)}
            className="h-1.5 rounded-full transition-all duration-300"
            style={{
              width: i === active ? 22 : 6,
              background: i === active ? "var(--color-primary)" : "var(--color-muted-foreground)",
              opacity: i === active ? 1 : 0.4,
            }}
          />
        ))}
      </div>
    </figure>
  );
}

function Index() {
  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-50 border-b border-border/60 bg-background/70 backdrop-blur-xl">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <a href="#top" className="flex items-center gap-2.5">
            <img src={assetUrl(logo)} alt="DashLume logo" className="h-11 w-11" />
            <span className="flex flex-col leading-none">
              <span className="font-display text-lg font-bold tracking-tight">DashLume</span>
              <span className="mt-0.5 text-[10px] font-medium uppercase tracking-[0.22em] text-muted-foreground">
                AI Video Meetings
              </span>
            </span>
          </a>
          <div className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
            <a href="#overview" className="transition-colors hover:text-foreground">Overview</a>
            <a href="#features" className="transition-colors hover:text-foreground">Features</a>
            <a href="#inside" className="transition-colors hover:text-foreground">Inside the app</a>
            <a href="#stack" className="transition-colors hover:text-foreground">Tech stack</a>
            <a href="#fixes" className="transition-colors hover:text-foreground">What broke</a>
          </div>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <a
              href={PLAY_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-hero rounded-full px-5 py-2.5 text-sm font-semibold transition-transform hover:brightness-110 hover:-translate-y-0.5"
            >
              Get the app
            </a>
          </div>
        </nav>
      </header>

      <main id="top">
        {/* Hero */}
        <section className="hero-glow relative overflow-hidden">
          <div className="mx-auto grid max-w-6xl items-center gap-14 px-6 pb-24 pt-20 md:grid-cols-2 md:pt-28">
            <div className="animate-rise">
              <span className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/60 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
                Live on Google Play
              </span>
              <h1 className="mt-6 font-display text-5xl font-bold leading-[1.05] md:text-6xl">
                Meetings that <span className="gradient-text">remember</span> themselves.
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
                DashLume is a next-generation video calling and meeting assistant powered by
                real-time AI — live transcription, an assistant in the call, and a summary waiting
                the moment you hang up.
              </p>
              <div className="mt-9 flex flex-wrap gap-3">
                <a
                  href={PLAY_STORE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-hero rounded-full px-7 py-3.5 text-sm font-semibold hover:-translate-y-0.5"
                >
                  Download on Google Play
                </a>
                <a
                  href="#inside"
                  className="rounded-full border border-border bg-secondary/50 px-7 py-3.5 text-sm font-semibold text-foreground transition-all hover:-translate-y-0.5 hover:bg-secondary"
                >
                  See it in action
                </a>
              </div>
              <dl className="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-4">
                {stats.map((s) => (
                  <div key={s.label}>
                    <dt className="font-display text-2xl font-bold text-foreground">{s.value}</dt>
                    <dd className="mt-1 text-xs leading-snug text-muted-foreground">{s.label}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="relative flex justify-center">
              <div
                className="absolute inset-x-10 top-10 -z-10 h-[75%] rounded-[3rem] blur-3xl"
                style={{ background: "var(--gradient-primary)", opacity: 0.35 }}
              />
              <img
                src={assetUrl(shotCall)}
                alt="DashLume in a two-person video call with live transcription running"
                loading="eager"
                className="animate-float w-[280px] rounded-[2.2rem] border border-border shadow-[var(--shadow-elegant)]"
              />
            </div>
          </div>
        </section>

        {/* Overview */}
        <section id="overview" className="mx-auto max-w-6xl px-6 py-24">
          <div className="grid gap-12 md:grid-cols-[1.2fr_1fr]">
            <div>
              <h2 className="font-display text-4xl font-bold md:text-5xl">Product overview</h2>
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                DashLume turns an ordinary video call into a record that works for you. Start a
                meeting in one tap or join with a six-character code, and the app handles the rest:
                media flows through a self-hosted WebRTC SFU, speech is transcribed live, and an AI
                participant sits in the chat ready to answer questions about what was just said.
              </p>
              <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
                The moment you hang up, the transcript is condensed into a summary and a list of
                action items, then stored in your meeting history — searchable weeks later. It is
                built as a single Flutter codebase for Android and iOS, backed by Firebase for auth,
                data and notifications, so the whole experience stays fast on real mobile networks
                rather than only on office Wi-Fi.
              </p>
              <div className="mt-8 flex flex-wrap gap-3 text-sm">
                {["Live transcription", "In-call AI", "Auto summaries", "Meeting history", "Multi-party video"].map(
                  (t) => (
                    <span
                      key={t}
                      className="rounded-full border border-border bg-secondary/50 px-4 py-1.5 text-muted-foreground"
                    >
                      {t}
                    </span>
                  ),
                )}
              </div>
            </div>
            <OverviewSlideshow />
          </div>
        </section>

        {/* Features */}
        <section id="features" className="border-y border-border bg-secondary/25 py-24">
          <div className="mx-auto max-w-6xl px-6">
            <h2 className="max-w-2xl font-display text-4xl font-bold md:text-5xl">
              Everything a call needs, and the part everyone forgets.
            </h2>
            <p className="mt-4 max-w-xl text-muted-foreground">
              Built on raw WebRTC and a self-hosted SFU, with Deepgram for speech and Gemini for
              reasoning.
            </p>
            <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {features.map((f) => (
                <article key={f.title} className="surface-card card-lift p-7 hover:-translate-y-1.5">
                  <div
                    className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl text-primary-foreground"
                    style={{ background: "var(--gradient-primary)" }}
                  >
                    <f.icon size={20} />
                  </div>
                  <h3 className="font-display text-lg font-semibold">{f.title}</h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">{f.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* How it works */}
        <section id="how" className="py-24">
          <div className="mx-auto max-w-6xl px-6">
            <h2 className="font-display text-4xl font-bold md:text-5xl">Four taps, start to recap</h2>
            <ol className="mt-12 grid gap-6 md:grid-cols-4">
              {flow.map((f) => (
                <li key={f.step} className="surface-card card-lift p-7 hover:-translate-y-1.5">
                  <span className="gradient-text font-display text-3xl font-bold">{f.step}</span>
                  <h3 className="mt-4 font-display text-lg font-semibold">{f.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Inside the app */}
        <section id="inside" className="border-y border-border bg-secondary/25 py-24">
          <div className="mx-auto max-w-6xl px-6">
            <h2 className="font-display text-4xl font-bold md:text-5xl">Inside the app</h2>
            <p className="mt-4 max-w-xl text-muted-foreground">
              Real screens from the build running on a physical device.
            </p>
            <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { src: assetUrl(shotSignIn), title: "Sign in", body: "Email or Google, straight into your workspace." },
                { src: assetUrl(shotHome), title: "Home", body: "Create a meeting or join with a code." },
                { src: assetUrl(shotLobby), title: "Lobby", body: "Check camera and mic before you walk in." },
                { src: assetUrl(shotCall), title: "In call", body: "Full-bleed video with quick controls." },
                { src: assetUrl(shotGrid), title: "Multi-party", body: "Stacked participant tiles with host badges." },
                { src: assetUrl(shotChat), title: "AI in chat", body: "Mention the assistant and get an answer in the thread." },
                { src: assetUrl(shotSummary), title: "Recap", body: "Summary, action items and full transcript." },
                { src: assetUrl(shotProfile), title: "Profile", body: "Manage your account details in a tap." },
              ].map((s) => (
                <figure key={s.title} className="surface-card card-lift overflow-hidden p-6 hover:-translate-y-1.5">
                  <img
                    src={s.src}
                    alt={`DashLume ${s.title} screen`}
                    loading="lazy"
                    className="mx-auto w-full max-w-[240px] rounded-2xl border border-border transition-transform duration-300 hover:scale-[1.03]"
                  />
                  <figcaption className="mt-6">
                    <h3 className="font-display text-base font-semibold">{s.title}</h3>
                    <p className="mt-1.5 text-sm text-muted-foreground">{s.body}</p>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        {/* Tech stack */}
        <section id="stack" className="py-24">
          <div className="mx-auto max-w-6xl px-6">
            <h2 className="font-display text-4xl font-bold md:text-5xl">Built with</h2>
            <p className="mt-4 max-w-xl text-muted-foreground">
              A lean, production-ready stack behind every call.
            </p>
            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {stack.map((t) => (
                <article key={t.name} className="surface-card card-lift p-7 hover:-translate-y-1.5">
                  <div
                    className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl text-primary-foreground"
                    style={{ background: "var(--gradient-primary)" }}
                  >
                    <t.icon size={22} />
                  </div>
                  <h3 className="font-display text-lg font-semibold">{t.name}</h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">{t.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Slogan */}
        <section className="px-6 pb-4">
          <blockquote className="hero-glow mx-auto max-w-4xl rounded-[2.5rem] border border-border px-8 py-16 text-center">
            <p className="font-display text-2xl font-semibold leading-snug md:text-3xl">
              “Nothing here is marked done on a clean compile. It is done when it works on two phones
              in the same room.”
            </p>
          </blockquote>
        </section>

        {/* What broke, what fixed it */}
        <section id="fixes" className="mx-auto max-w-6xl px-6 py-24">
          <h2 className="font-display text-4xl font-bold md:text-5xl">What broke, and what fixed it</h2>
          <p className="mt-4 max-w-xl text-muted-foreground">
            Real bugs from real devices, and the change that actually solved each one.
          </p>
          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {fixes.map((f) => (
              <article key={f.broke} className="surface-card card-lift p-7 hover:-translate-y-1.5">
                <div className="flex gap-3">
                  <AlertTriangle size={18} className="mt-0.5 shrink-0 text-destructive" />
                  <p className="font-display text-base font-semibold">{f.broke}</p>
                </div>
                <div className="mt-4 flex gap-3 border-t border-border pt-4">
                  <Wrench size={18} className="mt-0.5 shrink-0 text-primary" />
                  <p className="text-sm leading-relaxed text-muted-foreground">{f.fixed}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section id="cta" className="px-6 pb-28">
          <div className="hero-glow mx-auto max-w-5xl overflow-hidden rounded-[2.5rem] border border-border px-8 py-20 text-center">
            <img src={assetUrl(logo)} alt="" aria-hidden="true" className="animate-float mx-auto h-20 w-20" />
            <h2 className="mt-8 font-display text-4xl font-bold md:text-5xl">
              Stop taking notes in your own meetings.
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-muted-foreground">
              Install DashLume and get the assistant, transcripts and summaries on your next call.
            </p>
            <a
              href={PLAY_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-hero mt-9 inline-flex rounded-full px-8 py-4 text-sm font-semibold hover:-translate-y-0.5 hover:brightness-110"
            >
              Get it on Google Play
            </a>
          </div>
        </section>
      </main>

      <footer className="border-t border-border py-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 text-sm text-muted-foreground sm:flex-row">
          <div className="flex items-center gap-2.5">
            <img src={assetUrl(logo)} alt="" aria-hidden="true" className="h-9 w-9" />
            <span className="flex flex-col leading-none">
              <span className="font-display font-semibold text-foreground">DashLume</span>
              <span className="mt-0.5 text-[9px] font-medium uppercase tracking-[0.22em] text-muted-foreground">
                AI Video Meetings
              </span>
            </span>
          </div>
          <p className="text-center">
            Developed by{" "}
            <span className="font-semibold text-foreground">Chandresh Vithani</span> ·{" "}
            <a
              href="https://www.dashstack.tech"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-foreground underline underline-offset-4 transition-colors hover:text-primary"
            >
              DashStack Infotech (www.dashstack.tech)
            </a>
          </p>
          <p>© {new Date().getFullYear()} DashLume</p>
        </div>
      </footer>
    </div>
  );
}
