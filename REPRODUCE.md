# Reproduction guide

## Requirements
- Node.js 20+ (developed and tested on 24.19.0; anything 20.x or newer should work)
- A DeepSeek API key (or swap `DEEPSEEK_BASE_URL`/`DEEPSEEK_MODEL` in `.env` for any OpenAI-compatible provider)
- Approx. cost for a full 12-case run: **verified from the DeepSeek dashboard**, not estimated. A baseline-only run (`npm run baseline`) cost **$0.05 USD for 95,597 tokens**. The entire day's experimentation; baseline plus all 4 tested stages (run via `solve`); totaled **$0.45 USD for 797,063 tokens across 316 API requests**, a blended rate of ~$0.57/million tokens. Screenshots of both dashboard states are in `agent-trajectories/deepseek-cost-baseline-only.png` and `agent-trajectories/deepseek-cost-full-day-total.png`.
- Approx. runtime: baseline run ≈ 12 minutes (58.6s/case × 12); final solution run (`fact-constraint-context` + `fact-guard-verification`) ≈ 21 minutes (102.9s/case × 12, driven by the repair loop averaging 2.5 rounds/case).

## 1. Setup
```
git clone <https://github.com/hercjay/Resume-Fact-Guard-AI.git>
Confirm that your terminal path is pointing to the root of the project (Resume-Fact-Guard-AI)
npm install
Create a .env file in the project's root directory
Copy the content of .env.example file into this new .env file
# edit .env and add your real DEEPSEEK_API_KEY — model should be deepseek-v4-flash
# (the deepseek-chat/deepseek-reasoner aliases were retired and no longer work)
```

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

## Versions
- Node: 24.19.0 (20.x+ should also work — nothing here uses anything newer than standard ES2022/Node 20 APIs)
- Model: DeepSeek `deepseek-v4-flash` via the OpenAI-compatible `/chat/completions` endpoint
- Key dependency versions pinned in `package-lock.json`
