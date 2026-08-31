# Reproduction guide

## Requirements
- Node.js 20+ (developed and tested on 24.19.0; anything 20.x or newer should work)
- A DeepSeek API key (or swap `DEEPSEEK_BASE_URL`/`DEEPSEEK_MODEL` in `.env` for any OpenAI-compatible provider)
- Approx. cost for a full 12-case run: **verified from the DeepSeek dashboard**, not estimated. A baseline-only run (`npm run baseline`) cost **$0.05 USD for 95,597 tokens**. The entire day's experimentation; baseline plus all 4 tested stages (run via `solve`); totaled **$0.45 USD for 797,063 tokens across 316 API requests**, a blended rate of ~$0.57/million tokens. Screenshots of both dashboard states are in `agent-trajectories/deepseek-cost-baseline-only.png` and `agent-trajectories/deepseek-cost-full-day-total.png`.
- Approx. runtime: baseline run ≈ 12 minutes (58.6s/case × 12); final solution run (`fact-constraint-context` + `fact-guard-verification`) ≈ 21 minutes (102.9s/case × 12, driven by the repair loop averaging 2.5 rounds/case).

## 1. Setup

### A. Extract the Source Code

Extract the submitted project ZIP archive into a local directory of your choice.

Open your terminal and ensure your current working directory points **directly to the project's root folder** — the exact directory containing `package.json`, `src/`, and `eval/`.

> **Note:** Avoid nested directory confusion if your extraction tool creates an extra wrapper folder.

### B. Verify Node.js Environment

Confirm that **Node.js version 20.x or newer** is active on your system by running:

```bash
node -v
```

### C. Install Dependencies

Run the clean installation command to fetch all required packages:

```bash
npm install
```

> **Note:** If you encounter permissions or lockfile discrepancies, ensure you are using a modern npm version bundled with Node.js 20+.

### D. Configure Environment Variables

Locate the template file named `.env.example` in the project root.

Create a brand-new file in the **exact same directory** and name it `.env`.

> **Important:** Double-check that your text editor or operating system does not secretly append a file extension such as `.env.txt`.

Copy the contents of `.env.example` into your new `.env` file.

Open `.env` and fill in your active API key and configuration settings:

```env
DEEPSEEK_API_KEY=your_actual_deepseek_api_key_here
DEEPSEEK_MODEL=deepseek-v4-flash
```

> **Crucial Model Requirement:** Ensure the model is set strictly to `deepseek-v4-flash`. Legacy model aliases such as `deepseek-chat` or `deepseek-reasoner` have been retired and will cause runtime execution failures.


## 2. Run the baseline (once)

> **For absolute certainty (belt-and-suspenders):** Although `runBaseline()` hardcodes an empty improvements array (`[]`) internally and never reads `src/agent/improvements/index.ts`, a cautious user may want to make the intended state explicit on disk. Before running the baseline, open `src/agent/improvements/index.ts` and set **every** improvement's `enabled` flag to `false`. After the baseline finishes, restore the flags to their desired state for the stages you want to test (e.g., set `factConstraintContext` and `factGuardVerification` back to `enabled: true` for the documented final stage).


```
npm run baseline
```
The baseline never changes stage to stage, so this only needs to run once for the whole project, not once per improvement. Re-running it would actually introduce noise: the LLM call isn't deterministic, so a fresh baseline run every stage would mean comparing each stage against a slightly different yardstick instead of a fixed one. Run it once, keep `eval/results/baseline-only/baseline.json`, and leave it alone.

## 3. For each stage: run the solution
```
npm run solve
```
Runs whichever improvements are currently `enabled: true` in `src/agent/improvements/index.ts`, writes `eval/results/<stage-label>/solution.json` and trajectories to `agent-trajectories/<stage-label>/`, where `<stage-label>` is auto-derived from the enabled improvement ids.

Repeat steps 3 for each stage you want to inspect.

## 4. Run the live UI
```
npm run dev
```
Open `http://localhost:3000` (or check your terminal log to see the particular port if this link fails repeatedly), click "Load an example case," or paste your own job posting and facts, and see the baseline vs. current-solution comparison rendered directly; uses whatever's enabled in `improvements/index.ts` at the time.

## Data
All eval cases are synthetic, defined in `eval/cases/cases.ts`. No real people's data is used.

## Extra
If you experience any unresolved setup issue, consider cloning a fresh copy:
> `git clone <https://github.com/hercjay/Resume-Fact-Guard-AI.git>`

## Versions
- Node: 24.19.0 (20.x+ should also work — nothing here uses anything newer than standard ES2022/Node 20 APIs)
- Model: DeepSeek `deepseek-v4-flash` via the OpenAI-compatible `/chat/completions` endpoint
- Key dependency versions pinned in `package-lock.json`
