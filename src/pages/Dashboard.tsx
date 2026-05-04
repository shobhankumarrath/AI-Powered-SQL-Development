import { useEffect, useState } from "react";
import QueryForm from "@/components/queryForm";
import ResultPanel from "@/components/ResultPanel";
import HistoryPanel from "@/components/HistoryPanel";
import api from "@/services/api";
import { Card, CardContent } from "@/components/ui/card";
import toast from "react-hot-toast";

export default function Dashboard() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [history, setHistory] = useState([]);

  const loadHistory = async () => {
    try {
      const res = await api.get("/api/history");
      setHistory(res.data.history);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadHistory();
  }, []);

  const handleSubmit = async (question: string) => {
    try {
      setLoading(true);

      const res = await api.post("/api/query", {
        question,
      });

      setData(res.data);
      toast.success("Query executed successfully");
      loadHistory();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold tracking-tight">AI SQL Agent</h1>

        <p className="text-muted-foreground text-lg">
          Convert natural language into SQL, validate queries, and inspect data.
        </p>
      </div>

      <Card>
        <CardContent className="p-6">
          <QueryForm
            onSubmit={handleSubmit}
            loading={loading}
            buttonLabel="Generate SQL"
          />
        </CardContent>
      </Card>

      <ResultPanel data={data} loading={loading} />

      <HistoryPanel history={history} onReuse={handleSubmit} />
    </div>
  );
}
