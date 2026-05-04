import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

const schema = {
  users: ["id", "name", "email", "created_at"],
  orders: ["id", "user_id", "amount", "status", "created_at"],
};

export default function TablesDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full">
          Tables
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Database Schema</DialogTitle>
        </DialogHeader>

        <div className="space-y-5 mt-4">
          {Object.entries(schema).map(([table, columns]) => (
            <div key={table} className="border rounded-xl p-4">
              <h3 className="font-semibold text-lg mb-3 capitalize">{table}</h3>

              <div className="flex flex-wrap gap-2">
                {columns.map((col) => (
                  <span
                    key={col}
                    className="px-3 py-1 text-sm rounded-full border"
                  >
                    {col}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
