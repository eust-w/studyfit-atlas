import { describe, expect, it } from "vitest";
import {
  calculateResult,
  countryProfiles,
  getQuestionById,
  questions,
  rankDestinations
} from "./quiz";

describe("quiz scoring", () => {
  it("recommends Germany for a structured and practical engineering profile", () => {
    const answers = {
      classroom: "systems",
      pace: "steady",
      campus: "focused",
      communication: "direct",
      budget: "value",
      risk: "planned",
      subject: "engineering",
      lifestyle: "independent"
    };

    const result = calculateResult(answers);

    expect(result.profile.id).toBe("germany");
    expect(result.matchPercent).toBeGreaterThanOrEqual(80);
    expect(result.reasons.join(" ")).toContain("结构");
  });

  it("keeps tied scores deterministic by profile order", () => {
    const ranked = rankDestinations({});

    expect(ranked).toHaveLength(countryProfiles.length);
    expect(ranked[0].profile.id).toBe(countryProfiles[0].id);
    expect(ranked.every((entry) => entry.score === 0)).toBe(true);
  });

  it("exposes question metadata and answer labels for the UI", () => {
    const firstQuestion = questions[0];
    const lookup = getQuestionById(firstQuestion.id);

    expect(lookup?.prompt).toBe(firstQuestion.prompt);
    expect(firstQuestion.options).toHaveLength(3);
    expect(firstQuestion.options[0].label.length).toBeGreaterThan(4);
  });
});
