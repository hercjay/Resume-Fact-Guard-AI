import type { Improvement } from "../types";
import { requirementMatcherTool } from "./requirementMatcherTool";
import { factConstraintContext } from "./factConstraintContext";
import { factGuardVerification } from "./factGuardVerification";
import { cumulativeRepairMemory } from "./cumulativeRepairMemory";


export const IMPROVEMENTS: Improvement[] = [
  { ...requirementMatcherTool, enabled: false },
  { ...factConstraintContext, enabled: true },
  { ...factGuardVerification, enabled: true },
  { ...cumulativeRepairMemory, enabled: true },
];
