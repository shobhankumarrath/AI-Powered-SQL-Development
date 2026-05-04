import { Card, CardContent } from "@/components/ui/card";

export default function DashboardHome() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold">Welcome, {user.name || "User"}</h1>

        <p className="text-muted-foreground mt-2">
          Manage queries, inspect history, and generate SQL faster.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">Queries Today</CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">Saved History</CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">Active Session</CardContent>
        </Card>
      </div>
    </div>
  );
}
