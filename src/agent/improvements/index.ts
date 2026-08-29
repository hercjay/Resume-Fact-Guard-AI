import type { Improvement } from "../types";
import { requirementMatcherTool } from "./requirementMatcherTool";


export const IMPROVEMENTS: Improvement[] = [
  { ...requirementMatcherTool, enabled: false },
];
