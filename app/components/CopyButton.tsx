"use client";

import { useState } from "react";

/** A small, icon-only-label clipboard icon used for the idle state. */
function ClipboardIcon() {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 13 13"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect
        x="2.1"
        y="3"
        width="7.8"
        height="8"
        rx="1.1"
        stroke="currentColor"
        strokeWidth="1.1"
      />
      <path
        d="M3.7 3V1.8a1.2 1.2 0 0 1 2.4 0V3"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinecap="round"
      />
      <line x1="2.1" y1="6.2" x2="8.9" y2="6.2" stroke="currentColor" strokeWidth="0.8" />
    </svg>
  );
}

/** A check mark, shown briefly after a successful copy. */
function CheckIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M3.25 7.25L6 9 10.75 4.75"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** An exclamation-in-circle, shown when copying fails. */
function AlertIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle cx="7" cy="7" r="6" fill="none" stroke="currentColor" strokeWidth="1.1" />
      <path
        d="M7 3.5V7M7 9.5H7.01"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
    </svg>
  );
}

const COPIED_RESET_MS = 2500;

/**
 * Copy-to-clipboard button with a short-lived success/error confirmation.
 *
 * `text` is what gets written to the clipboard. `label` is both the visible
 * purpose (used by screen readers via aria-label) and the native tooltip.
 */
export default function CopyButton({
  text,
  label,
}: {
  text: string;
  label: string;
}) {
  const [status, setStatus] = useState<"idle" | "copied" | "error">("idle");

  async function onCopy() {
    try {
      await navigator.clipboard.writeText(text);
      setStatus("copied");
      setTimeout(() => setStatus("idle"), COPIED_RESET_MS);
    } catch (err) {
      // Surface the failure rather than swallowing it; AGENTS.md forbids silent catches.
      console.error("Copy to clipboard failed:", err);
      setStatus("error");
      setTimeout(() => setStatus("idle"), COPIED_RESET_MS);
    }
  }

  const labelText =
    status === "idle" ? "Copy" : status === "copied" ? "Copied" : "Failed";
  const Icon =
    status === "copied" ? CheckIcon : status === "error" ? AlertIcon : ClipboardIcon;

  return (
    <button
      type="button"
      className={`copy-button copy-${status}`}
      onClick={onCopy}
      aria-label={label}
      aria-live="polite"
      title={label}
    >
      <span className="copy-icon" aria-hidden="true">
        <Icon />
      </span>
      <span className="copy-label">{labelText}</span>
    </button>
  );
}
