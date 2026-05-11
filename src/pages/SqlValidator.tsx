import { useState } from "react";

import { usePreviewQuery, useExecuteQuery } from "@/hooks/useQueryFlow";

import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

import { Loader2, Copy } from "lucide-react";

import toast from "react-hot-toast";

export default function SqlValidator() {
  const [question, setQuestion] = useState("");

  const [sql, setSql] = useState("");

  const [rows, setRows] = useState<any[]>([]);

  const [error, setError] = useState("");

  const previewMutation = usePreviewQuery();

  const executeMutation = useExecuteQuery();

  const handlePreview = async () => {
    try {
      setError("");
      setRows([]);

      const data = await previewMutation.mutateAsync(question);

      setSql(data.query);

      toast.success("SQL preview generated");
    } catch (error: any) {
      const message =
        error?.response?.data?.message || "Failed to generate SQL preview";

      setError(message);

      toast.error(message);
    }
  };

  const handleExecute = async () => {
    try {
      setError("");

      const data = await executeMutation.mutateAsync(sql);

      setRows(data.rows.data || []);

      toast.success("Query executed successfully");
    } catch (error: any) {
      const message = error?.response?.data?.message || "Execution failed";

      setError(message);

      toast.error(message);
    }
  };

  const columns = rows.length > 0 ? Object.keys(rows[0]) : [];

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Question Input */}
      <Card className="shadow-sm border">
        <CardContent className="p-6 space-y-5">
          <div>
            <h2 className="text-3xl font-bold">AI SQL Validator</h2>

            <p className="text-muted-foreground mt-2">
              Generate, review, and execute SQL queries safely using a
              human-in-the-loop workflow.
            </p>
          </div>

          <Textarea
            className="
              min-h-[140px]
              text-base
              leading-7
            "
            rows={5}
            placeholder="Ask your query in natural language..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />

          {/* Example Prompt Chips */}
          <div className="flex flex-wrap gap-2">
            {["Show all users", "Users created today", "Latest orders"].map(
              (item) => (
                <button
                  key={item}
                  onClick={() => setQuestion(item)}
                  className="
                  text-sm
                  border
                  rounded-full
                  px-3
                  py-1
                  hover:bg-muted
                  transition
                "
                >
                  {item}
                </button>
              ),
            )}
          </div>

          <Button onClick={handlePreview} disabled={previewMutation.isPending}>
            {previewMutation.isPending ? (
              <span className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                Generating...
              </span>
            ) : (
              "Preview SQL"
            )}
          </Button>
        </CardContent>
      </Card>

      {/* SQL Preview */}
      {sql && (
        <Card className="shadow-sm border">
          <CardContent className="p-0">
            {/* Header */}
            <div className="flex items-center justify-between border-b px-5 py-3">
              <div>
                <h3 className="font-semibold text-lg">SQL Preview</h3>

                <p className="text-sm text-muted-foreground">
                  Review and edit before execution
                </p>
              </div>

              <button
                onClick={() => {
                  navigator.clipboard.writeText(sql);

                  toast.success("SQL copied");
                }}
                className="
                  flex items-center gap-1
                  text-sm
                  hover:underline
                "
              >
                <Copy size={14} />
                Copy SQL
              </button>
            </div>

            {/* Editor */}
            <div className="p-5 space-y-2">
              <p className="text-sm text-muted-foreground">Editable SQL</p>

              <Textarea
                rows={10}
                value={sql}
                onChange={(e) => setSql(e.target.value)}
                className="
                  font-mono
                  text-sm
                  leading-6
                  bg-muted/40
                  border-0
                  resize-none
                  focus-visible:ring-1
                "
              />
            </div>

            {/* Footer */}
            <div className="border-t px-5 py-4 flex justify-between items-center">
              <p className="text-sm text-muted-foreground">
                Human-in-the-loop approval required
              </p>

              <Button
                onClick={handleExecute}
                disabled={executeMutation.isPending}
              >
                {executeMutation.isPending ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Executing...
                  </span>
                ) : (
                  "Execute Query"
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Error State */}
      {error && (
        <Card className="border-red-500">
          <CardContent className="p-4">
            <div className="space-y-1">
              <p className="text-red-500 font-semibold">Query Error</p>

              <p className="text-sm text-muted-foreground">{error}</p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Empty State */}
      {!rows.length && !error && (
        <Card>
          <CardContent className="p-10 text-center">
            <h3 className="text-lg font-semibold">No query executed yet</h3>

            <p className="text-muted-foreground mt-2">
              Generate and execute a SQL query to see results.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Results */}
      {rows.length > 0 && (
        <Card className="shadow-sm border">
          <CardContent className="p-6">
            {/* Results Header */}
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="text-xl font-semibold">Query Results</h3>

                <p className="text-sm text-muted-foreground">
                  Returned {rows.length} rows
                </p>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-auto border rounded-xl">
              <table className="w-full text-sm">
                <thead className="bg-muted">
                  <tr>
                    {columns.map((col) => (
                      <th key={col} className="text-left px-3 py-3">
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {rows.map((row, index) => (
                    <tr key={index} className="border-t hover:bg-muted/40">
                      {columns.map((col) => (
                        <td key={col} className="px-3 py-3">
                          {String(row[col])}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
