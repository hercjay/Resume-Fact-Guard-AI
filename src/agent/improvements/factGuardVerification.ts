import type { Improvement } from "../types";
import { verifyClaims } from "../../lib/verify";
import { stringifyDraft } from "../../lib/draftFormat";


export const factGuardVerification: Improvement = {
  id: "fact-guard-verification",
  kind: "verification",
  description:
    "After drafting, extracts every concrete claim and checks it against the candidate's ground-truth facts; flags unsupported claims and triggers a repair round.",
  async afterDraft(ctx, draft) {
    const { result, log } = await verifyClaims(stringifyDraft(draft), ctx.facts, {
      onDelta: ctx.stream,
    });
    ctx.trajectory.push(log);

    if (result.fabricatedCount === 0) {
      return { needsRepair: false };
    }

    const violations = result.claims
      .filter((c) => !c.supportedByFactId)
      .map((c) => `- "${c.text}"`)
      .join("\n");

    return {
      needsRepair: true,
      repairInstructions: `The following claims are NOT supported by any candidate fact and must be removed or corrected:\n${violations}`,
    };
  },
};
