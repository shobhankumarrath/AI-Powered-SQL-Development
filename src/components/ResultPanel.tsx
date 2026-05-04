import { Card, CardContent } from "@/components/ui/card";
import { sqlResponse } from "@/types";
import toast from "react-hot-toast";
import { Copy } from "lucide-react";
interface Props {
  data: sqlResponse | null;
  loading?: boolean;
}

export default function ResultPanel({ data, loading }: Props) {
  if (loading) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <div className="animate-pulse space-y-3">
            <div className="h-4 bg-muted rounded" />
            <div className="h-4 bg-muted rounded" />
            <div className="h-4 bg-muted rounded" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!data) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <h3 className="font-semibold text-lg">Ready to generate SQL</h3>
          <p className="text-muted-foreground mt-2">
            Enter a prompt above and get SQL instantly.
          </p>
        </CardContent>
      </Card>
    );
  }

  const columns = data.rows.length > 0 ? Object.keys(data.rows[0]) : [];

  return (
    <Card>
      <CardContent className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Query Result</h2>

          <span className="px-3 py-1 text-sm rounded-full border">
            {data.count} rows
          </span>
        </div>

        <div>
          <p className="text-sm text-muted-foreground mb-2">Generated SQL</p>
          <button
            onClick={() => {
              navigator.clipboard.writeText(data.query);
              toast.success("SQL copied to clipboard");
            }}
            className="text-sm hover:underline"
          >
            <Copy size={14} />
            Copy
          </button>

          <pre className="bg-muted rounded-xl p-4 text-sm overflow-auto">
            {data.query}
          </pre>
        </div>

        <div className="overflow-auto border rounded-xl">
          <table className="w-full text-sm">
            <thead className="bg-muted">
              <tr>
                {columns.map((col) => (
                  <th key={col} className="text-left px-3 py-2">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {data.rows.map((row, index) => (
                <tr key={index} className="border-t">
                  {columns.map((col) => (
                    <td key={col} className="px-3 py-2">
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
  );
}
