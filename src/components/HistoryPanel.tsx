import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, RotateCcw } from "lucide-react";
import { HistoryItem } from "@/types";

interface Props {
  history: HistoryItem[];
  onReuse: (question: string) => void;
}

function timeAgo(dateString: string) {
  const diff = (Date.now() - new Date(dateString).getTime()) / 1000;

  const mins = Math.floor(diff / 60);

  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins} min ago`;

  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs} hr ago`;

  const days = Math.floor(hrs / 24);
  return `${days} day ago`;
}

export default function HistoryPanel({ history, onReuse }: Props) {
  const copySQL = async (sql: string) => {
    await navigator.clipboard.writeText(sql);
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Recent History</h2>

          <span className="text-sm text-muted-foreground">
            {history.length} items
          </span>
        </div>

        <div className="space-y-3 max-h-[500px] overflow-auto pr-2">
          {history.map((item) => (
            <div
              key={item.id}
              className="border rounded-xl p-4 space-y-3 hover:bg-muted/40 transition"
            >
              <div className="flex justify-between gap-4">
                <p className="font-medium">{item.question}</p>

                <span className="text-xs text-muted-foreground whitespace-nowrap">
                  {timeAgo(item.created_at)}
                </span>
              </div>

              <pre className="bg-muted p-2 rounded text-xs overflow-auto">
                {item.sql_query}
              </pre>

              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onReuse(item.question)}
                >
                  <RotateCcw className="w-4 h-4 mr-1" />
                  Re-run
                </Button>

                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => copySQL(item.sql_query)}
                >
                  <Copy className="w-4 h-4 mr-1" />
                  Copy SQL
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
