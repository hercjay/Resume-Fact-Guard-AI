"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { formatDuration, toReadable } from "../lib/streamText";
import type { RunLane } from "../../src/lib/agentEvents";

export type StepStatus = "running" | "ok" | "warn";

export interface RunStep {
  id: string;
  lane: RunLane;
  label: string;
  detail?: string;
  kind?: string;
  streams?: boolean;
  status: StepStatus;
  raw: string;
  summary?: string;
  elapsedMs?: number;
  tokens?: number;
}

export type RunPhase = "idle" | "running" | "done" | "error";

const LANE_LABEL: Record<RunLane, string> = {
  baseline: "Baseline",
  solution: "Fact-guarded",
  audit: "Final audit",
};

/** Rotating colour commentary, so a long run never looks like a frozen page. */
const FLAVOR_LINES = [
  "Reading the posting line by line...",
  "Both drafts are being written at once, one guarded, one not.",
  "The baseline gets no constraints on purpose. That is the whole experiment.",
  "Every sentence will have to name the fact it came from.",
  "Nothing outside your fact list is allowed into the final draft.",
  "The auditor is strict: “led a team” needs a fact that says you led a team.",
  "Unsupported claims get sent back for a rewrite, not quietly softened.",
  "Counting how many claims the plain prompt invented...",
  "Gaps get stated honestly instead of papered over.",
  "Cross-checking each claim against the facts you actually gave.",
  "Two full passes, so the comparison stays fair.",
  "Numbers only survive if you supplied the number.",
  "Tallying the receipts on every remaining sentence...",
  "Almost there, the final audit runs on both drafts.",
];

function useElapsed(startedAt: number | null, phase: RunPhase, frozen?: number) {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    if (phase !== "running" || startedAt === null) return;
    const id = setInterval(() => setNow(Date.now()), 100);
    return () => clearInterval(id);
  }, [phase, startedAt]);

  if (frozen !== undefined) return frozen;
  if (startedAt === null) return 0;
  return Math.max(0, now - startedAt);
}

function useFlavor(phase: RunPhase) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (phase !== "running") return;
    const id = setInterval(() => setIndex((i) => (i + 1) % FLAVOR_LINES.length), 3200);
    return () => clearInterval(id);
  }, [phase]);

  return FLAVOR_LINES[index];
}

export default function RunConsole({
  steps,
  phase,
  startedAt,
  finishedMs,
  totalStepsHint,
  onJumpToResults,
}: {
  steps: RunStep[];
  phase: RunPhase;
  startedAt: number | null;
  finishedMs?: number;
  totalStepsHint: number;
  onJumpToResults?: () => void;
}) {
  const logRef = useRef<HTMLDivElement | null>(null);
  const panelRef = useRef<HTMLElement | null>(null);
  const stickToBottom = useRef(true);
  const [expanded, setExpanded] = useState(true);
  const [offScreen, setOffScreen] = useState(false);

  const elapsed = useElapsed(startedAt, phase, phase === "running" ? undefined : finishedMs);
  const flavor = useFlavor(phase);

  const done = steps.filter((s) => s.status !== "running").length;
  const active = steps.find((s) => s.status === "running");
  const totalTokens = steps.reduce((sum, s) => sum + (s.tokens ?? 0), 0);
  const progress = phase === "done" ? 1 : Math.min(0.94, done / Math.max(totalStepsHint, done + 1));

  // Collapse the trace once the real documents are on screen; it stays one click away.
  useEffect(() => {
    if (phase === "done") setExpanded(false);
    if (phase === "running") setExpanded(true);
  }, [phase]);

  // Keep the newest line in view, unless the reader deliberately scrolled up to read.
  useLayoutEffect(() => {
    const el = logRef.current;
    if (!el || !stickToBottom.current) return;
    el.scrollTop = el.scrollHeight;
  });

  // The panel is tall; when it scrolls out of sight a compact bar keeps the status visible.
  useEffect(() => {
    const el = panelRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(([entry]) => setOffScreen(!entry.isIntersecting), {
      threshold: 0.08,
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  function handleScroll() {
    const el = logRef.current;
    if (!el) return;
    stickToBottom.current = el.scrollHeight - el.scrollTop - el.clientHeight < 32;
  }

  function scrollToPanel() {
    panelRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  const laneOrder: RunLane[] = ["baseline", "solution", "audit"];
  const headline =
    phase === "running" ? "Run in progress" : phase === "done" ? "Run complete" : "Run stopped";

  return (
    <>
      <section className={`run-panel ${phase}`} ref={panelRef} aria-live="polite">
        <div className="run-head">
          <div className="run-head-top">
            <p className="run-title">
              <span className={`run-dot ${phase}`} aria-hidden="true" />
              {headline}
            </p>
            <p className="run-stats">
              <span>{formatDuration(elapsed)}</span>
              <span className="sep" aria-hidden="true">/</span>
              <span>
                {done} step{done === 1 ? "" : "s"}
              </span>
              {totalTokens > 0 && (
                <>
                  <span className="sep" aria-hidden="true">/</span>
                  <span>{totalTokens.toLocaleString()} tokens</span>
                </>
              )}
            </p>
          </div>

          <div
            className="run-bar"
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(progress * 100)}
          >
            <span className="run-bar-fill" style={{ width: `${progress * 100}%` }} />
          </div>

          <div className="run-lanes">
            {laneOrder.map((lane) => {
              const laneSteps = steps.filter((s) => s.lane === lane);
              const laneActive = laneSteps.some((s) => s.status === "running");
              const state = laneActive ? "active" : laneSteps.length ? "settled" : "idle";
              return (
                <span key={lane} className={`lane-pill ${lane} ${state}`}>
                  <span className="lane-mark" aria-hidden="true" />
                  {LANE_LABEL[lane]}
                  <span className="lane-count">{laneSteps.length || "0"}</span>
                </span>
              );
            })}
          </div>

          {phase === "running" && <p className="run-flavor" key={flavor}>{flavor}</p>}

          {phase !== "running" && (
            <div className="run-foot">
              <button type="button" className="text-link" onClick={() => setExpanded((v) => !v)}>
                {expanded ? "Hide the run trace" : `Show the run trace (${steps.length} steps)`}
              </button>
              {onJumpToResults && (
                <button type="button" className="text-link" onClick={onJumpToResults}>
                  Jump to the documents
                </button>
              )}
            </div>
          )}
        </div>

        {expanded && (
          <div className="run-log" ref={logRef} onScroll={handleScroll}>
            {steps.length === 0 && <p className="run-empty">Waking the model up...</p>}
            {steps.map((step) => (
              <StepRow key={step.id} step={step} live={step.status === "running"} />
            ))}
          </div>
        )}
      </section>

      {phase === "running" && offScreen && (
        <button type="button" className="run-peek" onClick={scrollToPanel}>
          <span className="run-dot running" aria-hidden="true" />
          <span className="peek-text">{active ? active.label : "Working..."}</span>
          <span className="peek-meta">{formatDuration(elapsed)}</span>
          <span className="peek-bar">
            <span style={{ width: `${progress * 100}%` }} />
          </span>
        </button>
      )}
    </>
  );
}

const STREAM_TAIL_CHARS = 700;

function tail(text: string): string {
  if (text.length <= STREAM_TAIL_CHARS) return text;
  return `...${text.slice(-STREAM_TAIL_CHARS)}`;
}

function StepRow({ step, live }: { step: RunStep; live: boolean }) {
  const view = toReadable(step.raw);
  const showStream = live && Boolean(step.streams) && view.text.length > 0;

  return (
    <article className={`step ${step.status} ${live ? "live" : ""}`} data-lane={step.lane}>
      <span className={`step-mark ${step.status}`} aria-hidden="true">
        {step.status === "running" ? "" : step.status === "warn" ? "!" : "✓"}
      </span>

      <div className="step-body">
        <p className="step-label">
          <span className={`step-lane ${step.lane}`}>{LANE_LABEL[step.lane]}</span>
          {step.label}
          {step.kind && <span className="step-kind">{step.kind}</span>}
        </p>

        {step.detail && <p className="step-detail">{step.detail}</p>}

        {showStream && (
          <pre className={`step-stream ${view.raw ? "is-raw" : ""}`}>
            <span className="stream-inner">
              {tail(view.text)}
              <span className="caret" aria-hidden="true" />
            </span>
          </pre>
        )}

        {step.status !== "running" && (step.summary || step.elapsedMs !== undefined) && (
          <p className="step-summary">
            {step.summary}
            {step.elapsedMs !== undefined && (
              <span className="step-meta">
                {formatDuration(step.elapsedMs)}
                {step.tokens ? ` / ${step.tokens.toLocaleString()} tokens` : ""}
              </span>
            )}
          </p>
        )}
      </div>
    </article>
  );
}
