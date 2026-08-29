import type { Improvement } from "../types";
import { requirementMatcherTool } from "./requirementMatcherTool";
import { factConstraintContext } from "./factConstraintContext";


export const IMPROVEMENTS: Improvement[] = [
  { ...requirementMatcherTool, enabled: false },
  { ...factConstraintContext, enabled: true },
];
