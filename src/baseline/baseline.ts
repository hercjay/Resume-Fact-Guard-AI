import { runAgentPipeline, type PipelineOptions } from "../agent/pipeline";
import type { EvalCase } from "../lib/types";


export async function runBaseline(evalCase: EvalCase, options: PipelineOptions = {}) {
  const { output, logs } = await runAgentPipeline(evalCase, [], { lane: "baseline", ...options });
  return { output, logs };
}
