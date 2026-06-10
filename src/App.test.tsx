import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import App from "./App";
import { questions } from "./quiz";

describe("App", () => {
  it("renders the quiz title and first question", () => {
    render(<App />);

    expect(screen.getByRole("heading", { name: /StudyFit Atlas/i })).toBeInTheDocument();
    expect(screen.getByText(questions[0].prompt)).toBeInTheDocument();
  });

  it("shows a destination result after answering every question", async () => {
    const user = userEvent.setup();
    render(<App />);

    for (const question of questions) {
      await user.click(screen.getByRole("button", { name: question.options[0].label }));
    }

    expect(screen.getByText(/你的留学适配国家/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /重新测试/i })).toBeInTheDocument();
  });
});
