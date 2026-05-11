import { useEffect, useState } from "react";

import api from "@/services/api";

import { Card, CardContent } from "@/components/ui/card";

import { Copy } from "lucide-react";

import toast from "react-hot-toast";

interface HistoryItem {
  id: number;
  question: string;
  sql_query: string;
  created_at: string;
}

export default function History() {
  const [history, setHistory] = useState<HistoryItem[]>([]);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const loadHistory = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await api.get("/api/history");

      setHistory(res.data.history || []);
    } catch (error: any) {
      const message =
        error?.response?.data?.message || "Failed to load history";

      setError(message);

      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadHistory();
  }, []);

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Query History</h1>

        <p className="text-muted-foreground">Previously executed queries</p>
      </div>

      {loading && (
        <Card>
          <CardContent className="p-6">Loading history...</CardContent>
        </Card>
      )}

      {error && (
        <Card className="border-red-500">
          <CardContent className="p-4">
            <p className="text-red-500">{error}</p>
          </CardContent>
        </Card>
      )}

      {!loading &&
        history.map((item) => (
          <Card key={item.id}>
            <CardContent className="p-6 space-y-3">
              <div className="flex justify-between">
                <p className="font-medium">{item.question}</p>

                <p className="text-sm text-muted-foreground">
                  {new Date(item.created_at).toLocaleString()}
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <p className="text-sm text-muted-foreground">SQL Query</p>

                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(item.sql_query);

                      toast.success("SQL copied");
                    }}
                    className="flex items-center gap-1 text-sm hover:underline"
                  >
                    <Copy size={14} />
                    Copy
                  </button>
                </div>

                <pre className="flex items-center gap-1 text-sm hover:text-primary transition">
                  {item.sql_query}
                </pre>
              </div>
            </CardContent>
          </Card>
        ))}
    </div>
  );
}
