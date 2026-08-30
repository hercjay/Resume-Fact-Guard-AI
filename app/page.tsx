"use client";

import { useCallback, useEffect, useReducer, useRef, useState } from "react";
import { EXAMPLE_CASE } from "./lib/exampleCase";
import RunConsole, { type RunPhase, type RunStep } from "./components/RunConsole";
import type { AgentEvent, DocumentResult, GenerateResponse } from "../src/lib/agentEvents";
import { stringifyDraft } from "../src/lib/draftFormat";
import CopyButton from "./components/CopyButton";
import DownloadButton from "./components/DownloadButton";

const FLUSH_INTERVAL_MS = 70;

export default function Home() {
  const [jobTitle, setJobTitle] = useState("");
  const [company, setCompany] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [factsText, setFactsText] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<GenerateResponse | null>(null);
  const [mobileTab, setMobileTab] = useState<"baseline" | "solution">("solution");

  const [phase, setPhase] = useState<RunPhase>("idle");
  const [formOpen, setFormOpen] = useState(true);
  const [startedAt, setStartedAt] = useState<number | null>(null);
  const [finishedMs, setFinishedMs] = useState<number | undefined>(undefined);
  const [totalStepsHint, setTotalStepsHint] = useState(9);

  const stepsRef = useRef<RunStep[]>([]);
  const [, repaint] = useReducer((n: number) => n + 1, 0);
  const flushTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  const runAnchorRef = useRef<HTMLDivElement | null>(null);
  const resultsRef = useRef<HTMLDivElement | null>(null);

  const flush = useCallback((immediate: boolean) => {
    if (immediate) {
      if (flushTimer.current) {
        clearTimeout(flushTimer.current);
        flushTimer.current = null;
      }
      repaint();
      return;
    }
    if (flushTimer.current) return;
    flushTimer.current = setTimeout(() => {
      flushTimer.current = null;
      repaint();
    }, FLUSH_INTERVAL_MS);
  }, []);

  useEffect(() => {
    return () => {
      if (flushTimer.current) clearTimeout(flushTimer.current);
      abortRef.current?.abort();
    };
  }, []);

  function loadExample() {
    setJobTitle(EXAMPLE_CASE.jobTitle);
    setCompany(EXAMPLE_CASE.company);
    setJobDescription(EXAMPLE_CASE.jobDescription);
    setFactsText(EXAMPLE_CASE.facts.join("\n"));
    setResult(null);
    setError(null);
    setPhase("idle");
    stepsRef.current = [];
    flush(true);
  }

  function scrollTo(ref: React.RefObject<HTMLElement | null>) {
    requestAnimationFrame(() => {
      ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  function applyEvent(event: AgentEvent) {
    switch (event.type) {
      case "run-start":
        setTotalStepsHint(event.totalStepsHint);
        setStartedAt(event.startedAt);
        break;

      case "step-start":
        stepsRef.current = [
          ...stepsRef.current,
          {
            id: event.stepId,
            lane: event.lane,
            label: event.label,
            detail: event.detail,
            kind: event.kind,
            streams: event.streams,
            status: "running",
            raw: "",
          },
        ];
        flush(true);
        break;

      case "step-delta":
        stepsRef.current = stepsRef.current.map((s) =>
          s.id === event.stepId ? { ...s, raw: s.raw + event.text } : s
        );
        flush(false);
        break;

      case "step-reset":
        stepsRef.current = stepsRef.current.map((s) =>
          s.id === event.stepId ? { ...s, raw: "" } : s
        );
        flush(true);
        break;

      case "step-done":
        stepsRef.current = stepsRef.current.map((s) =>
          s.id === event.stepId
            ? {
                ...s,
                status: event.status === "warn" ? "warn" : "ok",
                summary: event.summary,
                elapsedMs: event.elapsedMs,
                tokens: event.tokens,
              }
            : s
        );
        flush(true);
        break;

      case "result":
        setResult(event.payload);
        setMobileTab("solution");
        break;

      case "error":
        setError(event.message);
        break;
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setError(null);
    setResult(null);
    setFinishedMs(undefined);
    setStartedAt(Date.now());
    stepsRef.current = [];
    flush(true);
    setPhase("running");
    setFormOpen(false);
    scrollTo(runAnchorRef);

    const runBegan = Date.now();

    try {
      const facts = factsText
        .split("\n")
        .map((f) => f.trim())
        .filter(Boolean);

      const res = await fetch("/api/generate/stream", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jobTitle, company, jobDescription, facts }),
        signal: controller.signal,
      });

      if (!res.ok || !res.body) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || `Request failed (${res.status}).`);
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const frames = buffer.split("\n\n");
        buffer = frames.pop() ?? "";

        for (const frame of frames) {
          for (const line of frame.split("\n")) {
            if (!line.startsWith("data:")) continue;
            const payload = line.slice(5).trim();
            if (!payload) continue;
            try {
              applyEvent(JSON.parse(payload) as AgentEvent);
            } catch (err) {
              console.warn("Ignored an unreadable progress frame:", err);
            }
          }
        }
      }

      setFinishedMs(Date.now() - runBegan);
      setPhase((current) => (current === "error" ? current : "done"));
      scrollTo(resultsRef);
    } catch (err: any) {
      if (err?.name === "AbortError") {
        setPhase("error");
        setFinishedMs(Date.now() - runBegan);
        return;
      }
      setError(err?.message || "Something went wrong.");
      setPhase("error");
      setFinishedMs(Date.now() - runBegan);
    } finally {
      // Any step still marked running was cut short with the connection.
      stepsRef.current = stepsRef.current.map((s) =>
        s.status === "running" ? { ...s, status: "warn", summary: "Interrupted" } : s
      );
      flush(true);
    }
  }

  function cancelRun() {
    abortRef.current?.abort();
  }

  const running = phase === "running";
  const inputSummary = [jobTitle || "Untitled role", company].filter(Boolean).join(" @ ");
  const factCount = factsText.split("\n").filter((f) => f.trim()).length;

  return (
    <div className="shell">
      <div className="folder-tab">
        <span className="case-number">Case File</span>
        <span>Resume Fact-Guard AI</span>
      </div>

      <header className={`hero ${phase === "idle" ? "" : "compact"}`}>
        <h1>Every claim, checked before you send it.</h1>
        <p className="dek">
          Tailors a resume summary and cover letter to a tech-industry job posting, for
          software engineers, designers, and other technical/product roles, then audits
          every sentence against what&apos;s actually true, and rewrites out anything it can&apos;t
          verify. Compare it against a plain single-prompt baseline to see exactly what
          the audit catches.
        </p>
      </header>

      {!formOpen && (
        <div className="intake-summary">
          <div className="intake-summary-text">
            <span className="intake-summary-label">Intake</span>
            <strong>{inputSummary}</strong>
            <span className="intake-summary-meta">
              {factCount} fact{factCount === 1 ? "" : "s"} on record
            </span>
          </div>
          <div className="intake-summary-actions">
            {running && (
              <button type="button" className="text-link danger" onClick={cancelRun}>
                Stop the run
              </button>
            )}
            <button type="button" className="text-link" onClick={() => setFormOpen(true)}>
              Edit inputs
            </button>
          </div>
        </div>
      )}

      {formOpen && (
        <form className="dossier" onSubmit={handleSubmit}>
          <p className="dossier-label">Intake &mdash; your background &amp; the role</p>

          <div className="field-grid">
            <div className="field">
              <label htmlFor="jobTitle">Job title</label>
              <input
                id="jobTitle"
                type="text"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                placeholder="Senior Frontend Engineer"
                required
              />
            </div>
            <div className="field">
              <label htmlFor="company">Company</label>
              <input
                id="company"
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="Acme Inc."
              />
            </div>

            <div className="field span-2">
              <label htmlFor="jobDescription">Job description</label>
              <textarea
                id="jobDescription"
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="Paste the job posting text here..."
                required
              />
            </div>

            <div className="field span-2">
              <label htmlFor="facts">Your real facts, one per line</label>
              <textarea
                id="facts"
                value={factsText}
                onChange={(e) => setFactsText(e.target.value)}
                placeholder={"3 years as a frontend engineer using React and TypeScript\nRebuilt the checkout flow, reduced load time from 4.2s to 1.1s\nMentored 2 junior engineers over 18 months"}
                required
              />
              <div className="hint">
                Only what&apos;s written here will ever be claimed, nothing outside this list.
              </div>
            </div>
          </div>

          <div className="form-actions">
            <button className="stamp-button" type="submit" disabled={running}>
              {running ? "Running..." : "Generate & Verify"}
            </button>
            <button className="text-link" type="button" onClick={loadExample}>
              Load an example case
            </button>
            {phase !== "idle" && (
              <button className="text-link" type="button" onClick={() => setFormOpen(false)}>
                Hide these fields
              </button>
            )}
          </div>
        </form>
      )}

      {error && <div className="error-banner">{error}</div>}

      <div ref={runAnchorRef} />

      {phase !== "idle" && (
        <RunConsole
          steps={stepsRef.current}
          phase={phase}
          startedAt={startedAt}
          finishedMs={finishedMs}
          totalStepsHint={totalStepsHint}
          onJumpToResults={result ? () => scrollTo(resultsRef) : undefined}
        />
      )}

      {result && (
        <div className="case-file" ref={resultsRef}>
          {result.requirementMatches.length > 0 && (
            <div className="match-strip">
              {result.requirementMatches.map((m) => (
                <span key={m.requirement} className={`match-chip ${m.matched ? "matched" : "gap"}`}>
                  <span className="dot" />
                  {m.requirement}
                  {m.matched ? "" : " — gap"}
                </span>
              ))}
            </div>
          )}

          <div className="tab-toggle">
            <button
              type="button"
              className={mobileTab === "baseline" ? "active" : ""}
              onClick={() => setMobileTab("baseline")}
            >
              Baseline
            </button>
            <button
              type="button"
              className={mobileTab === "solution" ? "active" : ""}
              onClick={() => setMobileTab("solution")}
            >
              Verified
            </button>
          </div>

          <div className="documents">
            <DocumentCard
              side="baseline"
              title="Simple baseline"
              sub="Single prompt, no audit"
              data={result.baseline}
              hideOnMobile={mobileTab !== "baseline"}
            />
            <div className="tear-divider" aria-hidden="true" />
            <DocumentCard
              side="solution"
              title="Fact-guarded solution"
              sub="Audited & repaired"
              data={result.solution}
              hideOnMobile={mobileTab !== "solution"}
            />
          </div>
        </div>
      )}
    </div>
  );
}

function slugify(str: string): string {
  return str
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
}

function DocumentCard({
  side,
  title,
  sub,
  data,
  hideOnMobile,
}: {
  side: "baseline" | "solution";
  title: string;
  sub: string;
  data: DocumentResult;
  hideOnMobile: boolean;
}) {
  const clean = data.fabricatedCount === 0;
  const filename = `${slugify(title)}.txt`;
  const downloadContent = stringifyDraft({
    resumeSummary: data.resumeSummary,
    coverLetter: data.coverLetter,
  });
  return (
    <div className={`document ${hideOnMobile ? "hide-on-mobile" : ""}`} data-side={side}>
      <div className="document-head">
        <div>
          <p className="doc-title">{title}</p>
          <p className="doc-sub">{sub}</p>
        </div>
        <div className="document-head-end">
                    <DownloadButton
            filename={filename}
            content={downloadContent}
            label="Download"
          />
          <span className={`stamp ${clean ? "clean" : "flagged"}`}>
            {clean ? "Verified" : `${data.fabricatedCount} unsupported`}
          </span>
        </div>
      </div>

      <div className="document-section">
        <div className="section-head">
          <h4>Resume summary</h4>
          <CopyButton text={data.resumeSummary} label="Copy resume summary" />
        </div>
        <p className="body-text">{data.resumeSummary}</p>
      </div>

      <div className="document-section">
        <div className="section-head">
          <h4>Cover letter</h4>
          <CopyButton text={data.coverLetter} label="Copy cover letter" />
        </div>
        <p className="body-text">{data.coverLetter}</p>
      </div>

      {data.claims.length > 0 && (
        <div className="document-section">
          <h4>Fact check ({data.totalClaims} claims)</h4>
          <ul className="claim-list">
            {data.claims.map((c, i) => (
              <li className="claim-item" key={i}>
                <span className={`claim-mark ${c.supportedByFactId ? "verified" : "unverified"}`}>
                  {c.supportedByFactId ? "✓" : "!"}
                </span>
                <span className="claim-text">
                  {c.text}
                  <span className="claim-source">
                    {c.supportedByFactId ? `Traced to fact ${c.supportedByFactId}` : "Not traceable to any given fact"}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {side === "solution" && (
        <div className="document-meta">Repair iterations used: {data.iterations}</div>
      )}
    </div>
  );
}
