"use client";

type SuggestedQuestionsProps = {
  questions: string[];
  onSelect: (question: string) => void;
};

export function SuggestedQuestions({ questions, onSelect }: SuggestedQuestionsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {questions.map((question) => (
        <button
          key={question}
          type="button"
          onClick={() => onSelect(question)}
          className="rounded-full border border-border bg-surface px-3 py-2 text-left text-xs font-medium text-foreground transition-all duration-200 hover:-translate-y-0.5 hover:border-accent/40 hover:bg-accent-soft hover:text-accent"
        >
          {question}
        </button>
      ))}
    </div>
  );
}
