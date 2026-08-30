"use client";

/** A down-arrow icon, pointing into the file base. */
function DownloadIcon() {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 13 13"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M3 5.2L6.5 8.7L10 5.2"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.5 8.7V10"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <line
        x1="2"
        y1="10.6"
        x2="11"
        y2="10.6"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinecap="round"
      />
    </svg>
  );
}

/**
 * Triggers a client-side download of `content` as a text file named `filename`.
 * Falls back to logging instead of failing silently.
 */
export default function DownloadButton({
  filename,
  content,
  label = "Download",
}: {
  filename: string;
  content: string;
  label?: string;
}) {
  function download() {
    try {
      const blob = new Blob([content], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = filename;
      document.body.append(anchor);
      anchor.click();
      anchor.remove();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Download failed:", err);
    }
  }

  return (
    <button
      type="button"
      className="doc-download"
      onClick={download}
      aria-label={label}
      title={label}
    >
      <span className="doc-action-icon" aria-hidden="true">
        <DownloadIcon />
      </span>
      <span className="doc-action-label">{label}</span>
    </button>
  );
}
