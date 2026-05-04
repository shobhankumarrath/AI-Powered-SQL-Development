import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface Props {
  onSubmit: (question: string) => void;
  loading: boolean;
  buttonLabel?: string;
}

const prompts = [
  "Show all users",
  "Show orders above 400",
  "Users whose name starts with R",
  "Latest 5 users",
];

export default function QueryForm({
  onSubmit,
  loading,
  buttonLabel = "Generate SQL",
}: Props) {
  const [question, setQuestion] = useState("");

  const submit = () => {
    if (!question.trim()) return;
    onSubmit(question);
  };

  return (
    <div className="space-y-5">
      <Textarea
        rows={6}
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Describe the query you want in plain English..."
      />

      <div className="flex flex-wrap gap-2">
        {prompts.map((item) => (
          <button
            key={item}
            onClick={() => setQuestion(item)}
            className="text-sm px-3 py-1 rounded-full border hover:bg-muted"
          >
            {item}
          </button>
        ))}
      </div>

      <Button onClick={submit} disabled={loading} className="w-full h-11">
        {loading ? "Generating..." : buttonLabel}
      </Button>
    </div>
  );
}
