import { runAgentPipeline, type PipelineOptions } from "./pipeline";
import { IMPROVEMENTS } from "./improvements/index";
import type { EvalCase } from "../lib/types";

export async function runSolution(evalCase: EvalCase, options: PipelineOptions = {}) {
  return runAgentPipeline(evalCase, IMPROVEMENTS, { lane: "solution", ...options });
}
