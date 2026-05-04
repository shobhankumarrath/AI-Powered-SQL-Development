import { Home, Database, History, Settings, LogOut } from "lucide-react";

import { useNavigate } from "react-router-dom";
import TablesDialog from "./TablesDialogues";
import toast from "react-hot-toast";

export default function Sidebar() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    toast.success("Logged out successfully");
    navigate("/login");
  };

  return (
    <aside className="w-64 border-r h-screen p-4 flex flex-col justify-between">
      <div>
        <h2 className="text-2xl font-bold mb-8">AI SQL Agent</h2>

        <nav className="space-y-2">
          <div onClick={() => navigate("/dashboard")} className="menu-item">
            <Home size={18} />
            <span>Dashboard</span>
          </div>

          <div onClick={() => navigate("/sql-validator")} className="menu-item">
            <Database size={18} />
            <span>SQL Validator</span>
          </div>

          <div onClick={() => navigate("/history")} className="menu-item">
            <History size={18} />
            <span>History</span>
          </div>

          <TablesDialog />
        </nav>
      </div>

      <div className="border-t pt-4 space-y-3">
        <div>
          <p className="font-medium">{user.name}</p>
          <p className="text-sm text-muted-foreground">{user.email}</p>
        </div>

        <div onClick={logout} className="menu-item text-red-500">
          <LogOut size={18} />
          <span>Logout</span>
        </div>
      </div>
    </aside>
  );
}
